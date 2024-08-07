<script setup lang="ts">
import { useApi } from '/@src/composable/useApi'
import { useNotyf } from '/@src/composable/useNotyf'
import { formatError } from '/@src/composable/useError'
import { hasPermission } from '/@src/utils/permissions'
import { useFetch } from '/@src/composable/useFetch'

const api = useApi()
const $fetch = useFetch()
const notify = useNotyf()
const router = useRouter()
const modalDeleted = ref(false)
const updateTableEvent = ref(false)
const columns = [
  { data: 'id', title: 'ID', visible: false },
  { data: 'community.name', title: 'Comunidad', typeSearch: 'input' },
  { data: 'community.district.department.name', title: 'Departamento', typeSearch: 'input' },
  { data: 'community.district.name', title: 'Distrito', typeSearch: 'input' },
  { data: 'user.name', title: 'Usuario', typeSearch: 'input' },
  { data: 'date', title: 'Fecha de Entrega', typeSearch: 'input' },
  { data: 'lat', title: 'Latitud', visible: false, typeSearch: 'input' },
  { data: 'lng', title: 'Longitud', visible: false, typeSearch: 'input' },
]
const idData = ref(null)
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'view', permission: 'full' },
  { button: 'edit', permission: 'deliveries edit' },
  { button: 'delete', permission: 'deliveries delete' },
]
const modalView = ref(false)
const columnPeople = [
  { data: 'ci', title: 'Nro CI' },
  { data: 'name', title: 'Nombre' },
  { data: 'last_name', title: 'Apellido' },
  {
    data: 'date_birth',
    title: 'Fecha de Nacimiento',
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
  },
  { data: 'gender', title: 'Sexo' },
]
interface People {
  ci: string
  name: string
  last_name: string
  date_birth: string
  gender: string
}
const listPeople = ref<People[]>([])
const community = ref()
const mapDiv = ref<HTMLElement | null>(null)
declare var google: any
const draggableMaps = ref(true)

const handleView = async (id: number) => {
  // await $fetch(`/communities/${id}`).then(async function (res) {
  //   community.value = res
  //   modalView.value = true
  //   listPeople.value = []
  //   await nextTick()
  //   if (mapDiv.value) {
  //     const locations = {
  //       lat: parseFloat(res.lat),
  //       lng: parseFloat(res.lng),
  //     }
  //     const mapOptions = {
  //       locations,
  //       zoom: 11,
  //       streetViewControl: false,
  //       mapTypeControl: false,
  //     }
  //     const map = new google.maps.Map(mapDiv.value, mapOptions)
  //     createMarker(map, locations)
  //     map.setCenter(locations)
  //   }
  //   res.people.forEach((people: any) => {
  //     listPeople.value.push({
  //       ci: people.ci,
  //       name: people.name,
  //       last_name: people.last_name,
  //       date_birth: people.date_birth,
  //       gender: people.gender,
  //     })
  //   })
  // })
  // listPeople.value = [...listPeople.value]
}
const handleEdit = (id: number) => {
  router.push({ path: 'communities/deliveries/update/' + id })
}
const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}
async function DeletedItem() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    const res = await api.delete(`/communities/${idData.value}`)
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

const loadGoogleMapsApi = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDDmEp9TeBUWtHMkgMukAGf8_nnaDFC3HU`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject()
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await loadGoogleMapsApi()
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
        label: 'Lista de Entregas',
      },
    ]"
  />
  <div
    v-if="hasPermission('deliveries create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        to="/communities/deliveries/create"
        color="primary"
        icon="fas fa-plus"
      >
        Nueva Entrega
      </VButton>
    </VButtons>
  </div>
  <DataTableWrapper
    :columns="columns"
    server-side-url="deliveries"
    :update-table-event="updateTableEvent"
    :button-table="buttonTable"
    :search-columns="true"
    :move-column="true"
    @view="handleView"
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
        @click="DeletedItem()"
      >
        Eliminar
      </VButton>
    </template>
  </VModal>
  <VModal
    title="Comunidad Indígena"
    :open="modalView"
    size="big"
    actions="center"
    @close="modalView = false"
  >
    <template #content>
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="row-inline">
            <p>Nombre de la Comunidad:</p>
            <p class="subtitle is-6">
              {{ community.name }}
            </p>
          </div>
          <div class="row-inline">
            <p>Pueblo:</p>
            <p class="subtitle is-6">
              {{ community.town }}
            </p>
          </div>
          <div class="row-inline">
            <p>Departamento:</p>
            <p class="subtitle is-6">
              {{ community.district.department.name }}
            </p>
          </div>
          <div class="row-inline">
            <p>Distrito:</p>
            <p class="subtitle is-6">
              {{ community.district.name }}
            </p>
          </div>
          <div class="row-inline">
            <p>Dirección:</p>
            <p class="subtitle is-6">
              {{ community.address }}
            </p>
          </div>
          <div class="row-inline">
            <p>Lideres:</p>
            <p class="subtitle is-6">
              {{ community.name_leader }}
            </p>
          </div>
          <div class="row-inline">
            <p>Número de Celular:</p>
            <p class="subtitle is-6">
              {{ community.phone }}
            </p>
          </div>
          <hr>
          <div class="row-inline">
            <p>Numero de Resolución:</p>
            <p class="subtitle is-6">
              {{ community.resolution_number }}
            </p>
          </div>
          <div class="row-inline">
            <p>Decreto:</p>
            <p class="subtitle is-6">
              {{ community.nro_decreto }}
            </p>
          </div>
          <div class="row-inline">
            <p>Cantidad de Familia:</p>
            <p class="subtitle is-6">
              {{ community.family_size }}
            </p>
          </div>
          <div class="row-inline">
            <p>Superficie en Has:</p>
            <p class="subtitle is-6">
              {{ community.superficie + ' Has.' }}
            </p>
          </div>
          <div class="row-inline">
            <p>Documento:</p>
            <p class="subtitle is-6">
              {{ community.date_document }}
            </p>
          </div>
          <hr>
        </div>
        <div class="column is-6">
          <h4>Ubicación Geográfica</h4>
          <div ref="mapDiv" style="width: 100%; height: 200px" />
        </div>
        <div class="column is-6">
          <div class="row-inline">
            <p>Organizacion RUC:</p>
            <p class="subtitle is-6">
              {{ community.organization.ruc }}
            </p>
          </div>
          <div class="row-inline">
            <p>Organización/Asociación</p>
            <p class="subtitle is-6">
              {{ community.organization.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-12">
          <hr>
          <p v-if="community.additional_data.length > 0">
            Datos Adicionales
          </p>
          <table>
            <tbody>
            <tr v-for="item in community.additional_data" :key="item.id">
              <td class="row-table">
                {{ item.name + ': ' }}
              </td>
              <td class="row-table">
                {{ item.pivot.info }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-12">
          <hr>
          <p>Lista de Personas/Miembros</p>
          <VDataTable
            v-if="community.people.length > 0"
            :columns="columnPeople"
            :model-value="listPeople"
          />
        </div>
      </div>
    </template>
    <template #action />
  </VModal>
</template>
<style lang="scss">
.row-inline {
  display: flex;
  align-items: center;
}
.subtitle {
  padding: 3px 6px 1px 6px;
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
</style>
