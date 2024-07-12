<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, number, date, z as zod } from 'zod'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'
import { useFetch } from '/@src/composable/useFetch'
import { useUserSession } from '/@src/stores/userSession'
import { createLoadingTask, VuePdf } from 'vue3-pdfjs'
import { type PDFDocumentProxy } from 'pdfjs-dist'
import { useNotyf } from '/@src/composable/useNotyf'

const userSession = useUserSession()
const notify = useNotyf()
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
const external = ref(false)
const tagsPrioridad = [
  { value: 'Baja', label: 'Baja' },
  { value: 'Media', label: 'Media' },
  { value: 'Alta', label: 'Alta' },
]
const typeProcedure = [
  { value: 'Fisico', label: 'Físico' },
  { value: 'Digital', label: 'Digital' },
]
const getDataUpdate = async () => {
  try {
    await $fetch(`/external-entities/${params.id}`).then(function (res) {
      setValues({
        name: res.name,
        // abbreviation: res.abbreviation,
      })
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

const validationSchema = toTypedSchema(
  zod.object({
    departamento_id: number(),
    type_file_id: number({
      required_error: 'Ingrese el tipo de Expediente',
      invalid_type_error: 'Ingrese el tipo de Expediente',
    }),
    external_entity_id: number().nullish(),
    external_nro_expediente: string().nullish(),
    name: string({
      required_error: 'Ingrese el Titulo o Asunto del Expediente',
    }),
    prioridad: string({
      required_error: 'Seleccione el tipo de Prioridad',
      invalid_type_error: 'Seleccione el tipo de Prioridad',
    }),
    date_end: date().nullish(),
    recurrente: string({
      required_error: 'El campo no puede estar vacio',
    }),
    recurrente_email: string().nullish(),
    recurrente_phone: string().nullish(),
    type_procedure: string({
      required_error: 'Selecione el tipo de trámite',
      invalid_type_error: 'Selecione el tipo de trámite',
    }),
  }),
)
interface ExpedienteForm {
  departamento_id: number
  type_file_id: number
  external_entity_id: number | null
  external_nro_expediente: string | null
  name: string
  prioridad: string | null
  date_end: Date | null
  recurrente: string
  recurrente_email: string | null
  recurrente_phone: string | null
  type_procedure: string | null
  sheet_quantity: number | null
  digital_document: boolean | null
  observation: string | null
}
const { values, handleSubmit, setFieldError, setFieldValue, setValues } = useForm<ExpedienteForm>({
  validationSchema,
  initialValues: {
    prioridad: 'Media',
    type_procedure: 'Fisico',
    // type_file_id: null,
    external_entity_id: null,
    external_nro_expediente: null,
    // name: 'Solicitud de vacaciones',
    date_end: new Date(),
    //recurrente: 'Alver Romero',
    //recurrente_email: 'alver.romero@gmail.com',
    //recurrente_phone: '0992353343',
    sheet_quantity: 0,
    digital_document: false,
    observation: '',
  },
})

// -------------Guardar los Datos --------------------------------------------------------
const onSubmit = handleSubmit(async () => {
  const formData = new FormData()
  const form = ref(false)
  if (params.id) {
    formData.append('_method', 'PUT')
    form.value = true
  }
  // Crear un objeto para los archivos
  const filesObject: { [key: string]: File } = {}
  selectedFiles.value.forEach((file, index) => {
    filesObject[`file_${index + 1}`] = file
  })

  // Agregar los archivos como JSON al formData
  formData.append('files', JSON.stringify(Object.keys(filesObject)))
  // Agregar cada archivo al formData
  Object.keys(filesObject).forEach((key) => {
    formData.append(key, filesObject[key])
  })

  formData.append('data', JSON.stringify(values))
  await submitHandler(
    'expedientes',
    formData,
    params.id,
    form.value,
    setFieldError,
    '/expediente/expediente_list',
  )
})

onMounted(async () => {
  try {
    setFieldValue('departamento_id', parseInt(userSession.entity))
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
      await getDataUpdate()
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

// -------------------- Add Files --------------------------------------------------------
const selectedFiles = ref<File[]>([])
const pdfSrc = ref<string | null>(null)
const namePdfView = ref('')
const MAX_TOTAL_SIZE = 20 * 1024 * 1024
const currentTotalSize = ref(0)

const onFileSelect = (event: Event & { target: { files: FileList } }): void => {
  const files: FileList = event.target.files as FileList
  const newFiles: File[] = Array.from(files)

  // Filtrar los archivos para evitar duplicados y comprobar el tamaño
  const filteredFiles: File[] = newFiles.filter((newFile) => {
    console.log('filtrando documentos')
    // Comprobar si el archivo ya está en la lista
    const isDuplicate = selectedFiles.value.some(file => file.name === newFile.name && file.size === newFile.size)

    if (isDuplicate) {
      notify.error(`El archivo ${newFile.name} ya ha sido adjuntado.`)
      return false
    }

    const newSize = currentTotalSize.value + newFile.size
    if (newSize > MAX_TOTAL_SIZE) {
      notify.error(`Agregar el archivo ${newFile.name} excede el límite de 20 MB.`)
      return false
    }
    return true
  })

  // Agregar los archivos filtrados a la lista de archivos seleccionados
  selectedFiles.value.push(...filteredFiles)

  // Calcular el tamaño total actual de los archivos seleccionados
  currentTotalSize.value = selectedFiles.value.reduce((total, file) => total + file.size, 0)

  // Actualizar la fuente del PDF si hay archivos seleccionados
  if (selectedFiles.value.length > 0) {
    pdfSrc.value = URL.createObjectURL(selectedFiles.value[0])
  }
  else {
    pdfSrc.value = null
  }
  event.target.value = ''
}
const removeFile = (index: number): void => {
  selectedFiles.value.splice(index, 1)
  currentTotalSize.value = selectedFiles.value.reduce((total, file) => total + file.size, 0)
}

const pdfViewOpen = ref(false)
const numOfPages = ref(0)
const allowedTypes = ['application/pdf']

function getPathPdf(index: number) {
  return URL.createObjectURL(selectedFiles.value[index])
}

const openPdfViewer = async (index: number) => {
  const selectedFile = selectedFiles.value[index]
  if (selectedFile && allowedTypes.includes(selectedFile.type)) {
    pdfSrc.value = URL.createObjectURL(selectedFile)
    namePdfView.value = selectedFile.name
    numOfPages.value = 0
    const loadingTask = ref<PDFLoadingTask | null>(null)

    loadingTask.value = createLoadingTask(pdfSrc.value)
    loadingTask.value.promise.then((pdf: PDFDocumentProxy) => {
      numOfPages.value = pdf.numPages
    })
  }
  pdfViewOpen.value = true
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
        label: 'INDI',
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
                type="submit"
                color="primary"
                raised
              >
                {{ params.id ? 'Actualizar' : 'Guardar' }}
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <div class="form-section">
          <div class="columns is-multiline">
            <!------------- Type Expedientes -------------------------------------------->
            <div class="column is-8">
              <VField
                id="type_file_id"
                label="*Tipo de expediente"
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
            <!------------- Documentos Externo ------------------------------------------>
            <div class="column is-4">
              <VField>
                <VControl>
                  <VSwitchSegment
                    v-model="external"
                    label-true=""
                    label-false="Expediente Externo"
                    color="primary"
                  />
                </VControl>
              </VField>
            </div>
          </div>
          <!------------- Entidad Externa ----------------------------------------------->
          <div v-if="external" class="columns is-multiline">
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
              <VField id="external_nro_expediente" label="Nro. Expediente (Externo)">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <!------------- Título/Asunto  ---------------------------------------------->
            <div class="column is-12">
              <VField id="name" label="*Título/Asunto">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="name" />
                </VControl>
              </VField>
            </div>
            <!------------- Recurrente -------------------------------------------------->
            <div class="column is-12">
              <VField id="recurrente" label="*Recurrente">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="recurrente" />
                </VControl>
              </VField>
            </div>
            <!------------- Email del Recurrente ---------------------------------------->
            <div class="column is-6">
              <VField id="recurrente_email" label="Email del recurrente">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
            <!------------- Phone del Recurrente ---------------------------------------->
            <div class="column is-6">
              <VField id="recurrente_phone" label="Celular del recurrente">
                <VControl>
                  <VInput type="text" />
                </VControl>
              </VField>
            </div>
            <div class="column is-12">
              <hr>
            </div>
            <!------------- Pioridad ---------------------------------------------------->
            <div class="column is-4">
              <VField
                id="prioridad"
                label="*Prioridad"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.prioridad"
                    :close-on-select="true"
                    :searchable="true"
                    :options="tagsPrioridad"
                    @input="setFieldValue('prioridad', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="prioridad" />
                </VControl>
              </VField>
            </div>
            <!------------- Fecha de finiquito ------------------------------------------>
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
            <!------------- Tipo de Documento ------------------------------------------->
            <div class="column is-4">
              <VField
                id="type_procedure"
                label="*Tipo de trámite"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.type_procedure"
                    :close-on-select="true"
                    :searchable="true"
                    :options="typeProcedure"
                    @input="setFieldValue('type_procedure', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="type_procedure" />
                </VControl>
              </VField>
            </div>
            <!------------- Documentos Digital/Fisico ----------------------------------->
            <div class="column is-4">
              <VField id="digital_document">
                <VControl>
                  <VSwitchSegment
                    label-true=""
                    label-false="Generar Documento Digital"
                    color="primary"
                  />
                </VControl>
              </VField>
            </div>
            <!------------- Adjunto Documento ------------------------------------------->
            <div v-if="!values.digital_document" class="column is-12">
              <!------------- Adjuntar Archivos ------------------->
              <div class="column is-3">
                <VField grouped>
                  <VControl>
                    <div class="file">
                      <label class="file-label">
                        <input
                          class="file-input"
                          accept="application/pdf"
                          type="file"
                          name="resume"
                          multiple
                          @change.prevent="onFileSelect"
                        >
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-cloud-upload-alt" />
                          </span>
                          <span class="file-label">Agregar Archivos</span>
                        </span>
                      </label>
                    </div>
                  </VControl>
                </VField>
              </div>
              <div class="column is-3">
                <p v-if="currentTotalSize > 0">
                  Total: {{ (currentTotalSize / (1024 * 1024)).toFixed(1) }} Mb
                </p>
              </div>
              <div class="columns is-multiline">
                <div class="column is-12">
                  <div class="form-section-output">
                    <div
                      v-for="(file, index) in selectedFiles"
                      :key="file.name + file.size"
                      class="pdf-view"
                    >
                      <VIconButton
                        class="btn-delete-pdf"
                        icon="feather:trash-2"
                        color="danger"
                        outlined
                        @click.prevent="removeFile(index)"
                      />
                      <VuePdf
                        v-if="selectedFiles.length > 0"
                        :key="index"
                        :src="getPathPdf(index)"
                        :page="1"
                        @click.prevent="openPdfViewer(index)"
                      />
                      <span class="items-label">{{ file.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!------------- Cantidad de Fojas ------------------------------------------->
            <div v-if="!values.digital_document" class="column is-6">
              <VField id="sheet_quantity" label="Cant. inicial de fojas">
                <VControl>
                  <VNumberInput type="text" />
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
            <!------------- Observación ------------------------------------------------->
            <div class="column is-12">
              <hr>
              <VField id="observation" label="Observación">
                <VControl>
                  <VInput type="text" />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  <VModal
    :title="namePdfView"
    :open="pdfViewOpen"
    size="big"
    @close="pdfViewOpen = false"
  >
    <template #content>
      <div v-if="pdfSrc">
        <VuePdf
          v-for="page in numOfPages"
          :key="page"
          :src="pdfSrc"
          :page="page"
        />
      </div>
    </template>
  </VModal>
</template>
<style lang="scss" scoped>
.pdf-view {
  padding: 10px;
  width: 200px;
  height: fit-content;
  background: var(--placeholder);
  border-radius: 8px;
  margin: 5px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: var(--font), serif;
  font-size: 0.9rem;
}
.btn-delete-pdf{
  position: absolute;
  z-index: 100;
  margin-left: 142px;
}
.form-section-output {
  display: flex;
  flex-wrap: wrap;

  .items-label {
    width: 100%;
  }
}
.modal-card-body {
  background-color: var(--placeholder) !important;
}
</style>
