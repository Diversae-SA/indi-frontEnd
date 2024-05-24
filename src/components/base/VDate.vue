<script setup lang="ts">
import { useVFieldContext } from '/@src/composable/useVFieldContext'
import { ref } from 'vue'

export interface VInputProps {
  raw?: boolean
  trueValue?: boolean
  falseValue?: boolean
  mode?:string
  ico?:string
  disabled?:boolean
}

const modelValue = defineModel<any>({
  default: '',
})
const props = withDefaults(defineProps<VInputProps>(), {
  modelValue: '',
  trueValue: true,
  falseValue: false,
  mode: '',
  ico: 'lucide:calendar',
  disabled:false,
})

const { field, id } = useVFieldContext({
  create: false,
  help: 'VInput',
})

const internal = computed({
  get() {
    return field?.value ? field.value.value : modelValue.value
  },
  set(value: any) {
    if (field?.value) {
      field.value.setValue(value)
    }
    modelValue.value = value
  },
})

const popover = ref({
  visibility: 'click',
  placement: 'right',
})

const classes = computed(() => {
  return props.raw ? [] : ['input', 'v-input']
})
</script>
<template>
  <VDatePicker
    v-model="internal"
    color="green"
    trim-weeks
    :mode="props.mode"
    :hideTimeHeader="true"
    is24hr
    :popover="popover"
  >
    <template #default="{ inputValue, inputEvents }">
      <VField>
        <VControl :icon="props.ico">
          <input
            :id="id"
            :class="classes"
            type="text"
            autocomplete="bday"
            :name="id"
            :true-value="props.trueValue"
            :false-value="props.falseValue"
            @change="field?.handleChange"
            @blur="field?.handleBlur"
            :value="inputValue"
            v-on="inputEvents"
            :disabled="props.disabled"
          >
        </VControl>
      </VField>
    </template>
  </VDatePicker>
</template>
