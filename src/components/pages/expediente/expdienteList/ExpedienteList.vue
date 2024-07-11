<script setup lang="ts">
import { useApi } from '/@src/composable/useApi'
import { useNotyf } from '/@src/composable/useNotyf'
import { formatError } from '/@src/composable/useError'
import { hasPermission } from '/@src/utils/permissions'

const api = useApi()
const notify = useNotyf()
const router = useRouter()
const modalDeleted = ref(false)
const updateTableEvent = ref(false)
const columns = [
  { data: 'id', title: 'ID', visible: false },
  { data: 'nro_expediente', title: 'Nro Exp', typeSearch: 'input' },
  {
    data: 'created_at',
    title: 'Fecha',
    render: function (data, type) {
      if (type === 'display' || type === 'filter') {
        const date = new Date(data)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      }
      return data
    },
    typeSearch: 'input'
  },
  { data: 'departamento.name', title: 'Dependencia Origen.', typeSearch: 'input' },
  { data: 'name', title: 'Titulo/Asunto', typeSearch: 'input' },
  { data: 'recurrente', title: 'Recurrente', typeSearch: 'input' },
  { data: 'type_file.name', title: 'Tipo de Documento', typeSearch: 'input', visible: false },
  { data: 'deleted_at', title: 'Tipo de Movimiento', typeSearch: 'input' },
  { data: 'deleted_at', title: 'Fecha de Movimiento', typeSearch: 'input' },
  { data: 'deleted_at', title: 'Dependencia Destino', typeSearch: 'input', visible: false },
  { data: 'deleted_at', title: 'Archivo Adjunto', typeSearch: 'input', visible: false },
]
const idData = ref(null)
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'view', permission: 'full' },
]

const handleView = (id: number) => {
  router.push({ path: '/expediente/expediente_details/view/' + id })
}

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
      },
    ]"
  />
  <div
    v-if="hasPermission('externalEntities create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        to="/expediente/expediente_list/create"
        color="primary"
        icon="fas fa-plus"
      >
        Nuevo Expediente
      </VButton>
    </VButtons>
  </div>
  <DataTableWrapper
    :columns="columns"
    server-side-url="expedientes"
    :update-table-event="updateTableEvent"
    :button-table="buttonTable"
    @view="handleView"
  />
</template>
