<script setup lang="ts">
import { hasPermission } from '/@src/utils/permissions'
import { formatError } from '/@src/composable/useError'
import { useApi } from '/@src/composable/useApi'
import { useNotyf } from '/@src/composable/useNotyf'

const api = useApi()
const notify = useNotyf()
const router = useRouter()
const modalDeleted = ref(false)
const columns = [
  { data: 'id', title: 'ID', visible: false },
  { data: 'ci', title: 'CI' },
  { data: 'name', title: 'Nombre' },
  { data: 'last_name', title: 'Apellido' },
  { data: 'functionary.departamento.name', title: 'Dependencia Origen' },
  {
    data: 'departamentos',
    // id: 'functionaries.departamentos',
    title: 'Dependencias Asignadas',
    orderable: false,
    searchable: false,
    typeSearch: 'input',
    render: function (data: any, type: any) {
      let rolHtml = ''
      if (data.length > 0) {
        data.forEach((permission: any) => {
          if (type === 'display') {
            rolHtml = rolHtml + '&nbsp;<small class="tag is-primary is-rounded">' + permission.name + '</small>'
          }
        })
      }
      return rolHtml
    },
  },
]
const idData = ref(null)
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'edit', permission: 'dependencies edit' },
  { button: 'delete', permission: 'dependencies delete' },
]
const updateTableEvent = ref(false)

const handleEdit = (id: number) => {
  router.push('/tool/dependencies/update/' + id)
}

const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}

async function DeleteItem() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    const res = await api.delete(`/dependencies/${idData.value}`)
    modalDeleted.value = false
    updateTableEvent.value = true
    emit('updateTable')
    if (res.status == 200) {
      notify.success(`Datos eliminados Correctamente!`)
    }
    else {
      notify.error(res.data.message)
    }
  }
  catch (err: any) {
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
        label: 'Panel Principal',
        hideLabel: true,
        icon: 'feather:home',
        to: '/app',
      },
      {
        label: 'Lista Denpendencias',
      },
    ]"
  />

  <div
    v-if="hasPermission('dependencies create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        to="/tool/dependencies/create"
        color="primary"
        icon="fas fa-plus"
      >
        Asignar Dependencia
      </VButton>
    </VButtons>
  </div>

  <DataTableWrapper
    :columns="columns"
    server-side-url="dependencies"
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
<style lang="scss">
.tags .tag {
  margin-bottom: 0.5rem;
}
</style>
