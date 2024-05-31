<script setup lang="ts">
import { hasPermission } from '/@src/utils/permissions'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'

const { deleteHandler } = useSubmitHandler()
const router = useRouter()
const modalDeleted = ref(false)
const columns = [
  { data: 'id', title: 'ID', visible: false },
  { data: 'people.ci', title: 'Nro CI' },
  { data: 'people.name', title: 'Nombre' },
  { data: 'people.last_name', title: 'Apellido' },
  { data: 'people.date_birth', title: 'Fecha de Nacimiento', visible: false },
  { data: 'people.gender', title: 'Sexo' },
  { data: 'people.nationality', title: 'Nacionalidad', visible: false },
  { data: 'people.address', title: 'Dirección', visible: false },
  { data: 'people.email', title: 'Email' },
  { data: 'people.phone', title: 'Celular' },
  { data: 'community.name', title: 'Comunidad' },
  { data: 'community.town', title: 'Pueblo' },
]
const idData = ref()
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'edit', permission: 'functionaries edit' },
  { button: 'delete', permission: 'functionaries delete' },
]
const updateTableEvent = ref(false)

const handleEdit = (id: number) => {
  router.push('/communities/community_members/update/' + id)
}

const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}
async function DeleteItem() {
  updateTableEvent.value = false
  emit('updateTable')
  await deleteHandler('community_members', idData.value)
  modalDeleted.value = false
  updateTableEvent.value = true
  emit('updateTable')
}

</script>

<template>
  <VBreadcrumb
    with-icons
    separator="bullet"
    :items="[
      {
        label: 'Panel Principal',
        hideLabel: true,
        icon: 'feather:home',
        to: '/app',
      },
      {
        label: 'Comunidades Indigenas',
      },
      {
        label: 'Lista de Miembros de Comunidad',
      },
    ]"
  />

  <div
    v-if="hasPermission('functionaries create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        to="/communities/community_members/create"
        color="primary"
        icon="fas fa-plus"
      >
        Nuevo
      </VButton>
    </VButtons>
  </div>
  <DataTableWrapper
    :columns="columns"
    server-side-url="community_members"
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
      <VButton
        color="danger"
        raised
        @click.prevent="DeleteItem"
      >
        Eliminar
      </VButton>
    </template>
  </VModal>
</template>
