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
  { data: 'name', title: 'Tipo de Expediente' },
  { data: 'abbreviation', title: 'Prefijo' },
  { data: 'type_info', title: 'Tipo de Origen' },
  {
    data: 'type_data',
    title: 'Tipos de Datos',
    typeSearch: 'input',
    render: function (data: any, type: any) {
      let rolHtml = ''
      if (data.length > 0) {
        data.forEach((typeData: any) => {
          if (type === 'display') {
            rolHtml = rolHtml + '&nbsp;<small class="tag is-primary is-rounded">' + typeData.name + '</small>'
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
  { button: 'edit', permission: 'type_files edit' },
  { button: 'delete', permission: 'type_files delete' },
]
const updateTableEvent = ref(false)

const handleEdit = (id: number) => {
  router.push('/tool/type_files/update/' + id)
}

const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}

async function DeleteItem() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    const res = await api.delete(`/type_files/${idData.value}`)
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
        label: 'Lista de Tipos de Expedientes',
      },
    ]"
  />

  <div
    v-if="hasPermission('roles create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        to="/tool/type_files/create"
        color="primary"
        icon="fas fa-plus"
      >
        Nuevo Tipo de Expediente
      </VButton>
    </VButtons>
  </div>

  <DataTableWrapper
    :columns="columns"
    server-side-url="type_files"
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
