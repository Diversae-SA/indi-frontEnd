<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, number, z as zod } from 'zod'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'
import { useFetch } from '/@src/composable/useFetch'

const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const OptionsDepartments = ref<
  Array<{
    value: number
    label: string
    districts: Array<{ value: number, label: string }>
  }>
>([])
const optionsOrganizations = ref<
  Array<{
    value: number
    label: string
  }>
>([])
const OptionsDistricts = ref<Array<{ value: number, label: string }>>([])
const districtEnable = ref<boolean>(true)
const center = {
  lat: parseFloat('-25.292584'),
  lng: parseFloat('-57.578603'),
}
const mapOptions = {
  center,
  zoom: 11,
  streetViewControl: false,
  mapTypeControl: false,
}
const mapDiv = ref<HTMLElement | null>(null)
declare var google: any
let marker: google.maps.Marker | null = null
const draggableMaps = ref(true)
const columnPeople = [
  { data: 'ci', title: 'Nro CI' },
  { data: 'name', title: 'Nombre' },
  { data: 'last_name', title: 'Nombre' },
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
const columnAdditional = [
  { data: 'name', title: 'Dato Adicional' },
  { data: 'info', title: 'Información' },
]
const buttonTableSingle = [
  { button: 'delete', permission: 'full' },
]
const isOpenPeople = ref(false)
const isOpenAdditional = ref(false)

// -------------------------- Add Data Additional -------------------------------
interface Additional {
  index: number
  additional_id: number
  name: string
  info: string
}
let globalIndexCounter = 0
const listAdditional = ref<Additional[]>([])
const addItemAdditional = (additional: Additional) => {
  const newIndex = globalIndexCounter++
  listAdditional.value.push({
    index: newIndex,
    additional_id: additional.additional_id,
    name: additional.name,
    info: additional.info,
  })
  isOpenAdditional.value = false
}
const deleteItemAdditional = (id: number) => {
  listAdditional.value = listAdditional.value.filter(i => i.index !== id)
}

// -------------------------- Add People -------------------------------
interface People {
  ci: string
  name: string
  last_name: string
  date_birth: Date
  gender: string
}
const listPeople = ref<People[]>([])
const addItemPeople = (people: People) => {
  const ciSet = new Set(listPeople.value.map((person: People) => person.ci))
  if (ciSet.has(people.ci)) {
    notify.error('El registro ya ha sido Agregado')
  }
  else {
    listPeople.value.push({
      ci: people.ci,
      name: people.name,
      last_name: people.last_name,
      date_birth: people.date_birth,
      gender: people.gender,
    })
    isOpenPeople.value = false
  }
}
const deleteItemPeople = (id: string) => {
  listPeople.value.filter(function (item, index) {
    if (item.ci == id) {
      listPeople.value.splice(index, 1)
    }
  })
}

interface Department {
  value: number
  label: string
  districts?: Array<{
    value: number
    label: string
  }>
}
const selectDepartment = () => {
  const department = OptionsDepartments.value.find(
    (element: Department) => element.value === values.department_id,
  )
  if (department && department.districts) {
    districtEnable.value = false
    OptionsDistricts.value = department.districts
  }
}
const findDepartmentByDistrict = (districtValue: number) => {
  const department = OptionsDepartments.value.find(
    dept =>
      dept.districts
      && dept.districts.some(district => district.value === districtValue),
  )
  setFieldValue('department_id', department ? department.value : null)
  districtEnable.value = false
}
const desSelect = () => {
  setFieldValue('district_id', null)
  districtEnable.value = true
}

const validationSchema = toTypedSchema(
  zod.object({
    name: string({
      required_error: 'Ingrese el nombre de comunidad',
    }),
    town: string().nullish(),
    name_leader: string({
      required_error: 'Ingrese el nombre del lider',
    }),
    resolution_number: string().nullish(),
    phone: string({
      required_error: 'Ingrese el numero de Celular',
    }),
    superficie: number().nullish(),
    organization_id: number({
      required_error: 'Seleccione una Organización/Asociación',
      invalid_type_error: 'Seleccione una Organización/Asociación',
    }),
    district_id: number({
      required_error: 'Seleccione un distrito',
      invalid_type_error: 'Seleccione un distrito',
    }),
    address: string({
      required_error: 'Ingrese la dirección de la comunidad',
    }),
    nro_decreto: string().nullish(),
    family_size: number({
      required_error: 'Seleccione un distrito',
      invalid_type_error: 'Seleccione un distrito',
    }),
    date_document: string().nullish(),
    lng: number(),
    lat: number(),
  }),
)
interface DataForm {
  name: string
  town: string
  name_leader: string
  resolution_number?: string | null
  phone: string
  superficie?: number | null
  organization_id: number
  department_id: number
  district_id: number
  address: string
  nro_decreto: string
  family_size: number
  date_document: string
  lng: number
  lat: number
  additional_data: Additional[]
  people: People[]
}
const { values, handleSubmit, setFieldError, setFieldValue, setValues } = useForm<DataForm>({
  validationSchema,
})

// -------------Guardar los Datos ----------------------------
const onSubmit = handleSubmit(async () => {
  setFieldValue('additional_data', listAdditional.value)
  setFieldValue('people', listPeople.value)
  await submitHandler(
    'communities',
    values,
    params.id,
    false,
    setFieldError,
    '/communities',
  )
})

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
function getUserLocation(): Promise<google.maps.LatLngLiteral> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setFieldValue('lat', position.coords.latitude)
              setFieldValue('lng', position.coords.longitude)
              const userLatLng: google.maps.LatLngLiteral = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
              resolve(userLatLng)
            },
            (error) => {
              reject(error)
            },
          )
        }
        else if (result.state === 'denied') {
          reject(new Error('El usuario negó el permiso de geolocalización.'))
        }
      })
    }
    else {
      reject(new Error('La geolocalización no está disponible en este navegador.'))
    }
  })
}
function createMarker(map: google.maps.Map, position: google.maps.LatLngLiteral) {
  const marker = new google.maps.Marker({
    position: position,
    map: map,
    draggable: draggableMaps.value,
  })

  google.maps.event.addListener(
    marker,
    'dragend',
    function (event: { latLng: google.maps.LatLng }) {
      setFieldValue('lat', event.latLng.lat())
      setFieldValue('lng', event.latLng.lng())
    },
  )
  return marker
}

const getDataUpdate = async () => {
  try {
    await $fetch(`/communities/${params.id}`).then(function (res) {
      const map = new google.maps.Map(mapDiv.value, mapOptions)
      const locations = {
        lat: parseFloat(res.lat),
        lng: parseFloat(res.lng),
      }
      createMarker(map, locations)
      map.setCenter(locations)
      findDepartmentByDistrict(res.district.id)
      selectDepartment()
      setValues({
        name: res.name,
        town: res.town,
        name_leader: res.name_leader,
        phone: res.phone,
        resolution_number: res.resolution_number,
        nro_decreto: res.nro_decreto,
        department_id: res.district.department_id,
        district_id: res.district_id,
        address: res.address,
        superficie: res.superficie,
        family_size: res.family_size,
        date_document: res.date_document,
        organization_id: res.organization_id,
      })
      res.additional_data.forEach((item) => {
        const newIndex = globalIndexCounter++
        listAdditional.value.push({
          index: newIndex,
          additional_id: item.id,
          name: item.name,
          info: item.pivot.info,
        })
      })
      res.people.forEach((item) => {
        listPeople.value.push({
          ci: item.ci,
          name: item.name,
          last_name: item.last_name,
          date_birth: item.date_birth,
          gender: item.gender,
        })
      })
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

onMounted(async () => {
  try {
    OptionsDepartments.value = (await $fetch('departments')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
      districts: result.districts.map((district: any) => ({
        value: district.id, label: district.name,
      })),
    }))
    optionsOrganizations.value = (await $fetch('organizations')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
    }))
    await loadGoogleMapsApi()
    if (mapDiv.value) {
      const map = new google.maps.Map(mapDiv.value, mapOptions)
      getUserLocation()
        .then((userLatLng) => {
          marker = createMarker(map, userLatLng)
          map.setCenter(userLatLng)
        })
        .catch((error) => {
          console.error('Error al obtener la ubicación del usuario:', error)
          marker = createMarker(map, center)
          map.setCenter(center)
        })
      if (draggableMaps.value) {
        map.addListener('click', function (event: { latLng: any }) {
          if (marker) {
            marker.setMap(null)
          }
          setFieldValue('lat', event.latLng.lat())
          setFieldValue('lng', event.latLng.lng())
          marker = createMarker(map, event.latLng)
        })
      }
    }
    else {
      console.error('the element maps no está disposable.')
    }
    if (params.id) {
      await getDataUpdate()
    }
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

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
        label: 'Lista de Comunidades Indígenas',
        to: '/communities',
      },
      {
        label: 'Nueva Comunidades Indígenas',
      },
    ]"
  />
  <form class="form-layout is-stacked" @submit.prevent="onSubmit">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Nueva Comunidad Indígena</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                to="/communities"
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
            <!------------- MAPA --------------------------->
            <div class="column is-12">
              <h4>Ubicación Geografica</h4>
              <div ref="mapDiv" style="width: 100%; height: 200px" />
            </div>
          </div>
          <div class="columns is-multiline">
            <!------------- Nombre de la Comunidad  ------------->
            <div class="column is-6">
              <VField id="name" label="Nombre de la comunidad">
                <VControl>
                  <VInput type="text" />
                  <ErrorMessage class="help is-danger" name="name" />
                </VControl>
              </VField>
            </div>
            <!------------- Pueblo al que pertenece --------------------------->
            <div class="column is-6">
              <VField id="town" label="Pueblo al que pertenece">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="town" />
                </VControl>
              </VField>
            </div>
            <!------------- Lideres --------------------------->
            <div class="column is-12">
              <VField id="name_leader" label="Nombre de los Lideres">
                <VControl>
                  <VInput type="text" />
                  <ErrorMessage class="help is-danger" name="name_leader" />
                </VControl>
              </VField>
            </div>
            <!------------- Contacto --------------------------->
            <div class="column is-6">
              <VField id="phone" label="Numero de Celular">
                <VControl>
                  <VInput type="text" />
                  <ErrorMessage class="help is-danger" name="phone" />
                </VControl>
              </VField>
            </div>
            <!------------- Numero de Resolucion --------------------------->
            <div class="column is-3">
              <VField id="resolution_number" label="Numero de Resolución">
                <VControl>
                  <VInput type="text" />
                  <ErrorMessage class="help is-danger" name="resolution_number" />
                </VControl>
              </VField>
            </div>
            <!------------- Decreto de Pers. Jurídica --------------------------->
            <div class="column is-3">
              <VField id="nro_decreto" label="Decreto de Pers. Jurídica">
                <VControl>
                  <VInput type="text" />
                  <ErrorMessage class="help is-danger" name="nro_decreto" />
                </VControl>
              </VField>
            </div>
            <!------------- Departamento ------------------------>
            <div class="column is-6">
              <VField
                id="department_id"
                label="Departamento"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    placeholder="Seleccione un Departamento"
                    :model-value="values.department_id"
                    :close-on-select="true"
                    :searchable="true"
                    :options="OptionsDepartments"
                    @input="setFieldValue('department_id', $event)"
                    @select="selectDepartment"
                    @deselect="desSelect"
                    @clear="desSelect"
                  />
                </VControl>
              </VField>
            </div>
            <!------------- Distrito ---------------------------->
            <div class="column is-6">
              <VField
                id="district_id"
                label="Distrito"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    :model-value="values.district_id"
                    placeholder="Seleccione un Distrito"
                    :disabled="districtEnable"
                    :close-on-select="true"
                    :searchable="true"
                    :options="OptionsDistricts"
                    @input="setFieldValue('district_id', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="district_id" />
                </VControl>
              </VField>
            </div>
            <!------------- Dirección --------------------------->
            <div class="column is-12">
              <VField id="address" label="Dirección">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
            <!------------- Superficies --------------------->
            <div class="column is-4">
              <VField id="superficie" label="Cantidad de Superficie (Has)">
                <VControl>
                  <VNumberInput type="text" />
                </VControl>
              </VField>
            </div>
            <!------------- Numero de Familias --------------------------->
            <div class="column is-4">
              <VField id="family_size" label="Número de Familias">
                <VControl>
                  <VNumberInput type="text" />
                </VControl>
              </VField>
            </div>
            <!------------- Documentacion --------------------------->
            <div class="column is-4">
              <VField id="date_document" label="Documentación">
                <VControl>
                  <VInput class="input" type="text" />
                </VControl>
              </VField>
            </div>
            <!------------- Organización ------------------------>
            <div class="column is-12">
              <VField
                id="organization_id"
                label="Organización/Asociación"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    placeholder="Seleccione una Organización/Asociación"
                    :model-value="values.organization_id"
                    :close-on-select="true"
                    :searchable="true"
                    :options="optionsOrganizations"
                    @input="setFieldValue('organization_id', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="organization_id" />
                </VControl>
              </VField>
            </div>
            <!------------- Lista de Datos Adicionales ------------------------>
            <div class="column is-12">
              <hr>
              <div class="list-flex-toolbar flex-list-v1">
                <h3>Lista de Datos Adicionales</h3>
                <VButtons>
                  <VButton
                    color="info"
                    icon="fas fa-plus"
                    @click="isOpenAdditional = true"
                  >Agregar dato adicional</VButton>
                </VButtons>
              </div>
              <VDataTableSingle
                :column-id="'index'"
                :columns="columnAdditional"
                :model-value="listAdditional"
                :button-table="buttonTableSingle"
                @delete="deleteItemAdditional"
              />
            </div>
            <!------------- Lista de Personas / Miembros ------------------------>
            <div class="column is-12">
              <hr>
              <div class="list-flex-toolbar flex-list-v1">
                <h3>Lista de personas/miembros de la Comunidad</h3>
                <VButtons>
                  <VButton
                    color="info"
                    icon="fas fa-plus"
                    @click="isOpenPeople = true"
                  >
                    Agregar Personas
                  </VButton>
                </VButtons>
              </div>
              <VDataTable
                :column-id="'ci'"
                :columns="columnPeople"
                :model-value="listPeople"
                :button-table="buttonTableSingle"
                @delete="deleteItemPeople"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  <!-- Modal - Add Additional -->
  <AddAdditional
    :is-open="isOpenAdditional"
    @close="isOpenAdditional = false"
    @add-additional="addItemAdditional"
  />
  <!-- Modal - Add People -->
  <AddPeople
    :is-open="isOpenPeople"
    @close="isOpenPeople = false"
    @add-people="addItemPeople"
  />
</template>
