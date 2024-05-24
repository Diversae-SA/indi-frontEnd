<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, number, date, z as zod } from 'zod'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'
import { useFetch } from '/@src/composable/useFetch'

const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const tagsTypeFile = ref()
const tagsExternalEntity = ref()
const tagsTypeData = ref()
const externo = ref(false)
const document_digital = ref(false)

const tagsPrioridad = [
  { value: 'Baja', label: 'Baja' },
  { value: 'Media', label: 'Media' },
  { value: 'Alta', label: 'Alta' },
]
const getDataUpdate = async () => {
  try {
    await $fetch(`/external-entities/${params.id}`).then(function (res) {
      setValues({
        name: res.name,
        abbreviation: res.abbreviation,
      })
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

const validationSchema = toTypedSchema(
  zod.object({
    type_file_id: number({
      required_error: 'Ingrese el tipo de Expediente',
      invalid_type_error: 'Ingrese el tipo de Expediente',
    }),
    name: string({
      required_error: 'Ingrese el Titulo o Asunto del Expediente',
    }),
    prioridad: string().nullish(),
    date_end: date().nullish(),
    recurrente: string({
      required_error: 'El campo no puede estar vacio',
    }),
    recurrente_email: string().nullish(),
    recurrente_phone: string().nullish(),
  }),
)
interface ExpedienteForm {
  type_file_id: number
  external_entity_id: number | null
  nro_expediente: string | null
  name: string
  prioridad: string | null
  date_end: Date | null
  recurrente: string
  recurrente_email: string | null
  recurrente_phone: string | null
}
const { values, handleSubmit, setFieldError, setFieldValue, setValues } = useForm<ExpedienteForm>({
  validationSchema,
})

// -------------Guardar los Datos ----------------------------
const onSubmit = handleSubmit(async () => {
  await submitHandler(
    'expedientes',
    values,
    params.id,
    false,
    setFieldError,
    '/expediente/expediente_list',
  )
})

onMounted(async () => {
  try {
    tagsTypeFile.value = (await $fetch('type_files')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
      typeData: result.type_data,
    }))
    tagsExternalEntity.value = (await $fetch('external-entities')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
    }))
    if (params.id) {
      await getDataUpdate(params.id)
    }
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

const selectTypeFile = () => {
  const item = tagsTypeFile.value.find(
    (element: any) => element.value === values.type_file_id,
  )
  if (item && item.typeData) {
    tagsTypeData.value = item.typeData
  }
}

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <VBreadcrumb
    with-icons
    separator="bullet"
    :items="[
      {
        label: 'Vuero',
        hideLabel: true,
        icon: 'feather:home',
        to: '/app',
      },
      {
        label: 'Lista de Expedientes',
        to: '/expediente/expediente_list',
      },
      {
        label: 'Nuevo Expediente',
      },
    ]"
  />
  <form class="form-layout is-stacked" @submit.prevent="onSubmit">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Nuevo Expediente</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                to="/expediente/expediente_list"
                light
                dark-outlined
              >
                Cancel
              </VButton>
              <VButton
                v-if="params.id"
                type="submit"
                color="primary"
                raised
              >
                Actualizar
              </VButton>
              <VButton
                v-else
                type="submit"
                color="primary"
                raised
              >
                Guardar
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <div class="form-section">
          <div class="columns is-multiline">
            <!------------- Type Expedientes --------------------------->
            <div class="column is-8">
              <VField
                id="type_file_id"
                label="Tipo de expediente"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.type_file_id"
                    :close-on-select="true"
                    :searchable="true"
                    :options="tagsTypeFile"
                    @select="selectTypeFile"
                    @input="setFieldValue('type_file_id', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="type_file_id" />
                </VControl>
              </VField>
            </div>
            <!------------- Documentos Externo --------------------------->
            <div class="column is-4">
              <VField>
                <VControl>
                  <VSwitchSegment
                    v-model="externo"
                    label-true=""
                    label-false="Expediente Externo"
                    color="primary"
                  />
                </VControl>
              </VField>
            </div>
          </div>
          <!------------- Entidad Externa --------------------------->
          <div v-if="externo" class="columns is-multiline">
            <div class="column is-8">
              <VField
                id="external_entity_id"
                label="Entidad (Externo)"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.external_entity_id"
                    :close-on-select="true"
                    :searchable="true"
                    :options="tagsExternalEntity"
                    @input="setFieldValue('external_entity_id', $event)"
                  />
                </VControl>
              </VField>
            </div>

            <!------------- numero de expediente externo --------------->
            <div class="column is-4">
              <VField id="nro_expediente" label="Nro. Expediente (Externo)">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <!------------- Título/Asunto  --------------------------->
            <div class="column is-12">
              <VField id="name" label="Título/Asunto">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="name" />
                </VControl>
              </VField>
            </div>
            <!------------- Pioridad --------------------------->
            <div class="column is-3">
              <VField
                id="prioridad"
                label="Prioridad"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.prioridad"
                    :close-on-select="true"
                    :searchable="true"
                    :options="tagsPrioridad"
                    @input="setFieldValue('prioridad', $event)"
                  />
                </VControl>
              </VField>
            </div>
            <!------------- Fecha de finiquito --------------------------->
            <div class="column is-4">
              <VField
                id="date_end"
                label="Fecha maxima para el Finiquito"
              >
                <VControl>
                  <VDate class="input" />
                  <ErrorMessage
                    class="help is-danger"
                    name="date_end"
                  />
                </VControl>
              </VField>
            </div>
            <!------------- Recurrente --------------------------->
            <div class="column is-12">
              <VField id="recurrente" label="Recurrente">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="recurrente" />
                </VControl>
              </VField>
            </div>
            <!------------- Email del Recurrente ------------------>
            <div class="column is-6">
              <VField id="recurrente_email" label="Email del recurrente">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
            <!------------- Phone del Recurrente -------------------->
            <div class="column is-6">
              <VField id="recurrente_phone" label="Celular del recurrente">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
            <!------------- Documentos Digital/Fisico --------------------------->
            <div class="column is-4">
              <VField>
                <VControl>
                  <VSwitchSegment
                    v-model="document_digital"
                    label-true=""
                    label-false="Generar Documento Digital"
                    color="primary"
                  />
                </VControl>
              </VField>
            </div>
            <!------------- Adjunto Documento --------------------------->
            <div v-if="!document_digital" class="column is-12">
              <VField grouped>
                <VControl>
                  <div class="file has-name">
                    <label class="file-label">
                      <input
                        class="file-input"
                        type="file"
                        name="resume"
                      >
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-cloud-upload-alt" />
                        </span>
                        <span class="file-label"> Adjuntar PDF… </span>
                      </span>
                      <span class="file-name light-text" />
                    </label>
                  </div>
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <hr>
              <p>Información especifica del tipo de Expediente</p>
              <br>
              <div
                v-for="(item, index) in tagsTypeData"
                :key="item"
                class="columns is-multiline"
              >
                <div class="column is-8">
                  <VField :id="'name'+index" :label="item.name">
                    <VControl>
                      <VInput type="text" placeholder="" />
                    </VControl>
                  </VField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
