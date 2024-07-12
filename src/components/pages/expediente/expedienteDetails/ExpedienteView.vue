<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import { useNotyf } from '/@src/composable/useNotyf'
import { useFetch } from '/@src/composable/useFetch'
import pdfMake from 'pdfmake/build/pdfmake'
import logo from '/@src/assets/illustrations/logo/logo_indi.png'
import Vfs_fonts from 'pdfmake/build/vfs_fonts'
import { useUserSession } from '/@src/stores/userSession'
(<any>pdfMake).addVirtualFileSystem(Vfs_fonts)

const notify = useNotyf()
const route = useRoute()
const router = useRouter()
const $fetch = useFetch()
const userSession = useUserSession()
interface RouteParams { id?: string }
const params = route.params as RouteParams
const logoDataUrl = ref()

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

function addMov() {
  router.push({ path: '/expediente/expediente_mov/' + params.id })
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

onMounted(async () => {
  try {
    if (params.id) {
      await searchDocument()
    }
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
    ]"
  />

  <div v-if="!params.id" class="columns is-multiline">
    <!--Card-->
    <div class="column is-12">
      <VCard radius="regular">
        <div class="column is-6">
          <VField
            label="Numero de Expediente"
            addons
          >
            <VControl expanded :loading="loading">
              <VInput
                v-model="nro_expediente"
                class="input"
                placeholder="Ingrese el numero de Expediente"
                onclick="this.select()"
              />
            </VControl>
            <VControl>
              <VButton
                color="primary"
                :disabled="loading"
                @click.prevent="searchDocument"
              >
                Buscar
              </VButton>
            </VControl>
          </VField>
        </div>
      </VCard>
    </div>
  </div>
  <div v-else class="columns is-multiline">
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
      <div class="column is-12">
        <VCard class="card-menu" radius="regular">
          <div class="is-flex is-justify-content-space-between is-align-items-center">
            <VButtons>
              <VIconButton
                v-tooltip="'Agragar movimiento al Expediente'"
                color="primary"
                icon="lucide:plus"
                @click.prevent="addMov"
              />
            </VButtons>
            <FlexTableDropdown @view="openFile('storage/'+expedienteData.path_file_portada)" />
          </div>
        </VCard>
      </div>
      <div class="column is-12">
        <VCard radius="regular">
          <div class="card-head">
            <p class="title is-6 mb-2">
              <i class="lnir lnir-switch" aria-hidden="true" />
              Resumen de Movimientos
            </p>
          </div>

          <div class="card-inner">
            <VDataTableSingle
              :columns="columnMov"
            />
          </div>
        </VCard>
      </div>
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

</style>
