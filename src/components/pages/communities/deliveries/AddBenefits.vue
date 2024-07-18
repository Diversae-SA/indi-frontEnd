<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, useForm } from 'vee-validate'
import { string, number, z as zod } from 'zod'
import { useFetch } from '/@src/composable/useFetch'

export interface VBreadcrumbsProps { isOpen: boolean }
const $fetch = useFetch()
const props = withDefaults(defineProps<VBreadcrumbsProps>(), {})
const optionsBenefits = ref<
  Array<{
    value: number
    label: string
  }>
>([])

const validationSchema = toTypedSchema(
  zod.object({
    type_benefit_id: number({
      required_error: 'Los datos no pueden ser Null',
    }),
    name: string().nullish(),
    info: string({
      required_error: 'Los datos no pueden ser Null',
    }),
    quantity: number().nullish(),
  }),
)

interface Additional {
  type_benefit_id: number
  name: string
  info: string
  quantity: number
}

const { values, handleSubmit, setFieldValue } = useForm<Additional>({
  validationSchema,
})

const selectData = () => {
  optionsBenefits.value.filter(function (item) {
    if (item.value == values.type_benefit_id) {
      setFieldValue('name', item.label)
    }
  })
}

onMounted(async () => {
  try {
    optionsBenefits.value = (await $fetch('type_benefits')).data.map((result: any) => ({
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
              id="type_benefit_id"
              label="Tipo de Beneficios"
              class="is-autocomplete-select"
            >
              <VControl icon="feather:search">
                <VMultiselect
                  placeholder="Seleccione una dato Adicional"
                  :model-value="values.type_benefit_id"
                  :close-on-select="true"
                  :searchable="true"
                  :options="optionsBenefits"
                  @select="selectData"
                  @input="setFieldValue('type_benefit_id', $event)"
                />
                <ErrorMessage class="help is-danger" name="type_benefit_id" />
              </VControl>
            </VField>
          </div>
          <div class="column is-12">
            <VField id="info" label="Detalle/Descripción">
              <VControl>
                <VInput class="input" />
                <ErrorMessage class="help is-danger" name="info" />
              </VControl>
            </VField>
          </div>
          <div class="column is-3">
            <VField id="quantity" label="Cantidad">
              <VControl>
                <VNumberInput class="input" />
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
