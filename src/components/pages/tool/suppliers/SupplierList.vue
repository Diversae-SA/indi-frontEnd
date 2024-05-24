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
  { data: 'ruc', title: 'RUC', typeSearch: 'input' },
  { data: 'name', title: 'Razón Social', typeSearch: 'input' },
  { data: 'district.department.name', title: 'Departamento', orderable: false, searchable: false },
  { data: 'district.name', name: 'district.name', title: 'Distrito', orderable: false, searchable: false },
  { data: 'address', title: 'Dirección', visible: false, typeSearch: 'input' },
  { data: 'email', title: 'Correo Electronico', typeSearch: 'input' },
  { data: 'phone', title: 'Telefono', typeSearch: 'input' },
]
const idData = ref(null)
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'edit', permission: 'suppliers edit' },
  { button: 'delete', permission: 'suppliers delete' },
]

const handleEdit = (id: number) => {
  router.push({ path: '/tool/suppliers/update/' + id })
}
const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}
async function DeletedItem() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    const res = await api.delete(`/suppliers/${idData.value}`)
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
        label: 'Lista de Proveedores',
      },
    ]"
  />
  <div
    v-if="hasPermission('externalEntities create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        to="/tool/suppliers/create"
        color="primary"
        icon="fas fa-plus"
      >
        Nuevo Proveedor
      </VButton>
    </VButtons>
  </div>
  <DataTableWrapper
    :columns="columns"
    server-side-url="suppliers"
    :update-table-event="updateTableEvent"
    :button-table="buttonTable"
    :search-columns="true"
    :move-column="true"
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
