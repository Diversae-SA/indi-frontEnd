<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useNotyf } from '/@src/composable/useNotyf'
import { useFetch } from '/@src/composable/useFetch'
import pdfMake from 'pdfmake/build/pdfmake'
import logo from '/@src/assets/illustrations/logo/logo_indi.png'
import Vfs_fonts from 'pdfmake/build/vfs_fonts'
import { useUserSession } from '/@src/stores/userSession'
(<any>pdfMake).addVirtualFileSystem(Vfs_fonts)
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, boolean, number, z as zod, array } from 'zod'
import { createLoadingTask, VuePdf } from 'vue3-pdfjs'
import type { PDFDocumentProxy } from 'pdfjs-dist'

const notify = useNotyf()
const route = useRoute()
const $fetch = useFetch()
const userSession = useUserSession()
interface RouteParams { id?: string }
const params = route.params as RouteParams
const logoDataUrl = ref()
const optionDepartments = ref()

const columnMov = [
  {
    data: 'created_at',
    title: 'Fecha',
    render: function (data, type) {
      if (type === 'display' || type === 'filter') {
        const date = new Date(data)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${day}-${month}-${year} ${hours}:${minutes}`
      }
      return data
    },
  },
]
const loading = ref(false)
const nro_expediente = ref('')

const optionMov = [
  { label: 'Salida', value: 1 },
  { label: 'Gestion', value: 2 },
  { label: 'Finiquito', value: 3 },
]

const optionGestion = [
  { label: 'Comentar', value: 1 },
  { label: 'Responder', value: 2 },
  { label: 'Providenciar', value: 3 },
  { label: 'Adjuntar Documentos', value: 4 },
  { label: 'Cambiar/Asignar Plazo', value: 5 },
  { label: 'Cambiar/Asignar Prioridad', value: 6 },
  { label: 'Asignar Responsable', value: 7 },
]

interface ExpedienteForm {
  id: string
  path_file_all: string
  path_file_portada: string
  type_file: string
  nro_expediente: string
  name: string
  recurrente: string
  created_at: Date
  departamento: string
  type_procedure: string
  prioridad: string
  date_end: string | null
  userName: string
  movimientos: []
}
const expedienteData = ref<ExpedienteForm>(<ExpedienteForm>{})
async function searchDocument() {
  try {
    await $fetch(`/expedientes/${params.id}`).then(function (res) {
      expedienteData.value = {
        id: res.id,
        path_file_all: res.path_file_all,
        path_file_portada: res.path_file_portada,
        type_file: res.type_file.name,
        nro_expediente: res.nro_expediente,
        name: res.name,
        recurrente: res.recurrente,
        created_at: res.created_at,
        departamento: res.departamento ? res.departamento.name : '',
        type_procedure: res.type_procedure,
        prioridad: res.prioridad,
        date_end: res.date_end,
        userName: res.user.name,
        movimientos: [],
      }
    })
  }
  catch (err: any) {
    notify.error('Numero de Expediente no encontrado')
  }
}

function formatDate(dateString: string, hour: boolean): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return hour ? `${day}-${month}-${year} ${hours}:${minutes}` : `${day}-${month}-${year}`
}

// ---------------------------------- Descargar archivo full -----------------------------
function openFile(url: string) {
  // Suponiendo que la URL base es el origen de la API, por ejemplo: 'https://mi-api.com/'
  const baseURL = 'http://localhost:8081/'
  const fileURL = baseURL + url

  // Abre el archivo en una nueva pestaña
  window.open(fileURL, '_blank')
}

// ---------------------------------- Adjuntar Archivos ----------------------------------
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

onMounted(async () => {
  try {
    if (params.id) {
      await searchDocument()
    }
    optionDepartments.value = (await $fetch('departamentos')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
    }))
    const reader = new FileReader()
    reader.onload = (e: any) => {
      logoDataUrl.value = e.target.result
    }
    fetch(logo)
      .then(res => res.blob())
      .then((blob) => {
        reader.readAsDataURL(blob)
      })
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

// -------------Save or Update -----------------------------------------------------------
interface userForm {
  type_mov: number
  type_action: number
  profile_path: string | null
  people_id: number
  name: string | null
  email: string
  password: string
  roles: []
  active: boolean
}

const validationSchema = toTypedSchema(
  zod.object({
    type_mov: number({ required_error: 'Seleccione un tipo de movimiento' }),
    name: string({
      required_error: 'Nombre de usuario no puede estar vacio',
    }).min(3, { message: 'El nombre debe contener como mínimo 3 letras' }),
    email: string({
      required_error: 'Nombre de usuario no puede estar vacio',
    }).email('Nombre de usuario no puede estar vacio'),
    profile_path: string().nullish(),
    roles: array(number()).nullish(),
    active: boolean().nullish(),
  }),
)

const { values, handleSubmit, isSubmitting, setFieldError, setFieldValue } = useForm<userForm>({
  validationSchema,
})
const onSubmit = handleSubmit(async () => {
  console.log(values)
})

const addFiles = ref(false)
const dependencia = ref(false)
const gestion = ref(false)
function showitems() {
  dependencia.value = false
  addFiles.value = false
  gestion.value = false
  if (values.type_mov == 1) {
    dependencia.value = true
  } else if (values.type_mov == 2) {
    gestion.value = true
    addFiles.value = true
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
        label: 'Detalle de Expediente',
      },
      {
        label: 'Movimiento de Expediente',
      }
    ]"
  />

  <div class="columns is-multiline">
    <div class="column is-4">
      <VCard radius="regular">
        <h3 class="title is-5 mb-2">
          EXP. {{ expedienteData.nro_expediente }}
        </h3>
        <hr>
        <p>Datos Generales</p>
        <hr>
        <!-- -------- Asunto ------------------------ -->
        <div class="row-inline">
          <p>Asunto:</p>
          <p class="subtitle is-6">
            {{ expedienteData.name }}
          </p>
        </div>
        <!-- -------- Recurrente -------------------- -->
        <div class="row-inline">
          <p>Recurrente:</p>
          <p class="subtitle is-6">
            {{ expedienteData.recurrente }}
          </p>
        </div>
        <!-- -------- Fecha -------------------- -->
        <div class="row-inline">
          <p>Fecha:</p>
          <p class="subtitle is-6">
            {{ formatDate(expedienteData.created_at, true) }}
          </p>
        </div>
        <!-- -------- Dependencia Origen -------------------- -->
        <div class="row-inline">
          <p>Dependencia de Origen:</p>
          <p class="subtitle is-6">
            {{ expedienteData.departamento }}
          </p>
        </div>
        <!-- -------- Tipo de Tramite -------------------- -->
        <div class="row-inline">
          <p>Tipo de Tramite:</p>
          <p class="subtitle is-6">
            {{ expedienteData.type_procedure }}
          </p>
        </div>

        <!-- -------- Usuario Responsable -------------------- -->
        <div class="row-inline">
          <p>Usuario Responsable:</p>
          <p class="subtitle is-6">
            {{ expedienteData.userName }}
          </p>
        </div>

        <!-- -------- Documento Completo -------------------- -->
        <div class="row-inline">
          <a @click.prevent="openFile('storage/'+expedienteData.path_file_all)">
            <i class="fas fa-file-pdf" aria-hidden="true" />Expediente Completo</a>
        </div>
      </VCard>
    </div>
    <div class="column is-8">
      <form
        class="form-layout is-stacked"
        @submit.prevent="onSubmit"
      >
        <div class="form-outer">
          <div
            :class="[isStuck && 'is-stuck']"
            class="form-header stuck-header"
          >
            <div class="form-header-inner">
              <div class="left">
                <h3>
                  Agregar movimiento al Expediente
                </h3>
              </div>
              <div class="right">
                <div class="buttons">
                  <VButton
                    :to="'/expediente/expediente_details/view/'+params.id"
                    icon="lnir lnir-arrow-left rem-100"
                    light
                    dark-outlined
                    :disabled="isSubmitting"
                  >
                    Cancel
                  </VButton>
                  <VButton
                    type="submit"
                    color="primary"
                    raised
                  >
                    Agregar
                  </VButton>
                </div>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div class="form-section">
              <!-- --------------------- Tipo de Movimiento --------------------------- -->
              <VField
                id="people_id"
                label="Tipo de movimiento"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    :model-value="values.type_mov"
                    placeholder="Seleccione un tipo de movimiento"
                    :close-on-select="true"
                    :searchable="true"
                    :options="optionMov"
                    @select="showitems"
                    @input="setFieldValue('type_mov', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="people_id" />
                </VControl>
              </VField>
              <!-- --------------------- Tipo de Accion --------------------------- -->
              <VField
                v-if="gestion"
                id="type_action"
                label="Tipo de Accion"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    :model-value="values.type_action"
                    placeholder="Seleccione un tipo de accion"
                    :close-on-select="true"
                    :searchable="true"
                    :options="optionGestion"
                    @select="showitems"
                    @input="setFieldValue('type_action', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="type_action" />
                </VControl>
              </VField>
              <!------------- Adjunto Documento ------------------------------------------->
              <div v-if="addFiles" class="column is-12">
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
              <!------------- Dependencia ------------------------------------------->
              <VField
                v-if="dependencia"
                id="external_entity_id"
                label="Dependencia"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.dependencie"
                    :close-on-select="true"
                    :searchable="true"
                    :options="optionDepartments"
                    @input="setFieldValue('external_entity_id', $event)"
                  />
                </VControl>
              </VField>
              <VField id="observation" label="Observación/Comentario">
                <VControl>
                  <VInput type="text" />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss">
@import '/src/scss/abstracts/all';

.card-menu {
  padding: 10px !important;
}
.buttons, .button {
  margin-bottom: 0 !important;
}
.row-inline {
  display: flex;
  align-items: center;
  padding: 5px;
}
.is-dark .row-inline p {
  color: var(--dark-dark-text);
}

.subtitle {
  padding: 3px 4px 2px 5px;
}

.is-dark .subtitle {
  color: var(--dark--color-invert) !important;
}

.column {
  padding: 10px 5px 0 10px !important;
  hr {
    margin: 8px 0;
  }
}
.row-table {
  padding: 2px;
}

.card-inner{
  padding-top: 5px !important;
}

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
