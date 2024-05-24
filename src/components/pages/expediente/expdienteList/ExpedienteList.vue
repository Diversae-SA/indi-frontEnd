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
  { data: 'id', title: 'ID' },
  { data: 'nro_exp', title: 'Nro Exp', typeSearch: 'input' },
  { data: 'date', title: 'Fecha', typeSearch: 'input' },
  { data: 'date', title: 'Dependencia Origen.', typeSearch: 'input' },
  { data: 'date', title: 'Titulo/Asunto', typeSearch: 'input' },
  { data: 'date', title: 'Recurrente', typeSearch: 'input' },
  { data: 'date', title: 'Tipo Movimiento', typeSearch: 'input' },
  { data: 'date', title: 'Fecha Movimiento', typeSearch: 'input' },
  { data: 'date', title: 'Dependencia Destino', typeSearch: 'input' },
  { data: 'date', title: 'Archivo Adjunto', typeSearch: 'input' },
]
const idData = ref(null)
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'edit', permission: 'externalEntities edit' },
  { button: 'delete', permission: 'externalEntities delete' },
]

const handleEdit = (id: number) => {
  router.push({ path: '/tool/externalEntity/update/' + id })
}
const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}
async function DeletedItem() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    const res = await api.delete(`/expedientes/${idData.value}`)
    modalDeleted.value = false
    updateTableEvent.value = true
    emit('updateTable')
    if (res.status == 200) {
      notify.success(`Datos eliminados Correctamente!`)
    } else {
      notify.error(res.data.message)
    }
  } catch (err: any) {
    modalDeleted.value = false
    notify.error(formatError(err))
  }
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
    @edit="handleEdit"
    @delete="handleDelete"
  />
  <VModal
    title="Eliminar Datos"
    :open="modalDeleted"
    size="small"
    actions="center"
    @close="modalDeleted = false"
  >
    <template #content>
      <VPlaceholderSection
        title="¿Eliminar Registro? "
        subtitle="Los cambios ya no se podran revertir!"
      />
    </template>
    <template #action>
      <VButton color="danger" raised @click="DeletedItem()">Eliminar</VButton>
    </template>
  </VModal>
</template>
