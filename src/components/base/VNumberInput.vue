<script lang="ts" setup generic="Opts extends FactoryArg">
import type { InputMask, FactoryArg } from 'imask'
import { IMaskComponent } from 'vue-imask'
import { useVFieldContext } from '/@src/composable/useVFieldContext'

const imaskInput = IMaskComponent

const modelValue = defineModel<any>({
  default: '',
})

const inputMask = shallowRef<InputMask<Opts>>()

const { field, id } = useVFieldContext({
  create: false,
  help: 'VInput',
})

const internal = computed({
  get() {
    if (field?.value) {
      return field.value.value
    }
    else {
      return modelValue.value
    }
  },
  set(value: any) {
    if (field?.value) {
      field.value.setValue(value)
    }
    modelValue.value = value
  },
})

onUnmounted(() => {
  if (inputMask.value) {
    inputMask.value.destroy()
    inputMask.value = undefined
  }
})

defineExpose({
  inputMask,
})
</script>

<template>
  <imask-input
    :id="id"
    v-model:typed="internal"
    class="input v-input right"
    :name="id"
    :mask="Number"
    :thousands-separator="'.'"
    :lazy="true"
  />
</template>
<style lang="scss">
.right {
  text-align: right;
}
</style>
