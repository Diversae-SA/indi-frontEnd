<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, useForm } from 'vee-validate'
import { string, number, z as zod } from 'zod'
import { useFetch } from '/@src/composable/useFetch'

export interface VBreadcrumbsProps {
  isOpen: boolean
}

const $fetch = useFetch()
const props = withDefaults(defineProps<VBreadcrumbsProps>(), {})
const optionsAdditionals = ref<
  Array<{
    value: number
    label: string
  }>
>([])

const validationSchema = toTypedSchema(
  zod.object({
    additional_id: number({
      required_error: 'Los datos no pueden ser Null',
    }),
    name: string().nullish(),
    info: string({
      required_error: 'Los datos no pueden ser Null',
    }),
  }),
)

interface Additional {
  additional_id: number
  name: string
  info: string
}

const { values, handleSubmit, setFieldValue } = useForm<Additional>({
  validationSchema,
})

const selectData = () => {
  optionsAdditionals.value.filter(function (item) {
    if (item.value == values.additional_id) {
      setFieldValue('name', item.label)
    }
  })
}

onMounted(async () => {
  try {
    optionsAdditionals.value = (await $fetch('additional_data')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
    }))
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

const emits = defineEmits<{
  (e: 'addAdditional', values: any): void
}>()

const onSubmit = handleSubmit(async () => {
  emits('addAdditional', values)
})
</script>

<template>
  <VModal
    title="Agregar Datos Adicionales"
    :open="props.isOpen"
    size="medium"
    actions="center"
    noscroll
    noclose
  >
    <template #content>
      <form class="modal-form" @submit.prevent="onSubmit">
        <div class="columns is-multiline">
          <!------------- Dato Adicional ------------------------>
          <div class="column is-12">
            <VField
              id="organization_id"
              label="Dato Adicional"
              class="is-autocomplete-select"
            >
              <VControl icon="feather:search">
                <VMultiselect
                  placeholder="Seleccione una dato Adicional"
                  :model-value="values.additional_id"
                  :close-on-select="true"
                  :searchable="true"
                  :options="optionsAdditionals"
                  @select="selectData"
                  @input="setFieldValue('additional_id', $event)"
                />
                <ErrorMessage class="help is-danger" name="additional_id" />
              </VControl>
            </VField>
          </div>
          <div class="column is-6">
            <VField id="info" label="Información del dato adicional">
              <VControl>
                <VInput class="input" />
                <ErrorMessage class="help is-danger" name="info" />
              </VControl>
            </VField>
          </div>
        </div>
      </form>
    </template>
    <template #action>
      <VButton
        color="primary"
        raised
        @click.prevent="onSubmit"
      >
        Agregar
      </VButton>
    </template>
  </VModal>
</template>
