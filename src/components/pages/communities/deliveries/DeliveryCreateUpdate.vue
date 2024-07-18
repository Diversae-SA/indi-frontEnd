<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, number, z as zod } from 'zod'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'
import { useFetch } from '/@src/composable/useFetch'
import { GoogleMap, Marker } from 'vue3-google-map'

const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const route = useRoute()
interface RouteParams { id?: string }
const params = route.params as RouteParams
interface Community {
  value: number
  label: string
  location: { lat: number, lng: number }
}
const optionsCommunities = ref<Array<Community>>([])
const draggableMaps = ref(true)

const columnBenefits = [
  { data: 'index', title: 'id' },
  { data: 'name', title: 'Beneficio' },
  { data: 'info', title: 'Detalle' },
  { data: 'quantity', title: 'Cantidad' },
]
const buttonTableSingle = [
  { button: 'delete', permission: 'full' },
]
const isOpenAdditional = ref(false)

// -------------------------- Add Data Additional -------------------------------
interface Details {
  index: number
  type_benefit_id: number
  name: string
  info?: string
  quantity?: number
  images?: []
}
let globalIndexCounter = 0
// const listBenefits = ref<Details[]>([])
const addItemAdditional = (additional: Details) => {
  const newIndex = globalIndexCounter++
  values.deliveryDetails.push({
    index: newIndex,
    type_benefit_id: additional.type_benefit_id,
    name: additional.name,
    info: additional.info,
    quantity: additional.quantity ?? 0,
  })
  isOpenAdditional.value = false
}
const deleteItemAdditional = (id: number) => {
  values.deliveryDetails = values.deliveryDetails.filter(i => i.index !== id)
}

const selectCommunity = () => {
  const result = optionsCommunities.value.find((option: Community) => option.value === values.community_id)
  setFieldValue('lat', result ? result.location.lat : 0)
  setFieldValue('lng', result ? result.location.lng : 0)
}

const validationSchema = toTypedSchema(
  zod.object({
    community_id: number({
      required_error: 'Seleccione una Comunidad',
      invalid_type_error: 'Seleccione una Comunidad',
    }),
    date: string({
      required_error: 'Ingrese la fecha de entrega',
    }),
    lng: number(),
    lat: number(),
  }),
)

interface DataForm {
  community_id: number
  date: string
  lat: number
  lng: number
  deliveryDetails: Details[]
}
const { values, handleSubmit, setFieldError, setFieldValue, setValues } = useForm<DataForm>({
  validationSchema,
  initialValues: {
    lat: parseFloat('-25.292584'),
    lng: parseFloat('-57.578603'),
  },
})

// -------------Guardar los Datos ----------------------------
const onSubmit = handleSubmit(async () => {
  await submitHandler(
    'deliveries',
    values,
    params.id,
    false,
    setFieldError,
    '/communities/deliveries',
  )
})

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

const getDataUpdate = async () => {
  try {
    await $fetch(`/communities/${params.id}`).then(function (res) {
      setValues({
        community_id: res.community_id,
        date: res.date,
        lat: parseFloat(res.lat),
        lng: parseFloat(res.lng),
      })
      res.deliveryDetails.forEach((item: any) => {
        const newIndex = globalIndexCounter++
        listBenefits.value.push({
          index: newIndex,
          type_benefit_id: item.type_benefit_id,
          name: item.type_benefit.name,
          info: item.info,
          quantity: item.quantity,
          images: item.images,
        })
      })
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

interface ImageFile {
  file: File | null
  currentImageUrl: string
  path: string | null
  imageDimension: {
    width: number
    height: number
  }
}
const imageSelect = ref<ImageFile[]>([])
const currentImageUrl = ref('')
const onFileSelect = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const files = Array.from(input.files)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileURL = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        imageSelect.value.push({
          file: file,
          path: null,
          currentImageUrl: fileURL,
          imageDimension: {
            width: img.width,
            height: img.height,
          },
        })
      }
      img.src = fileURL
    }
  }
}
const removeFile = (): void => {
  // selectedFile.value = null
  // imageDimensions.value = null
  currentImageUrl.value = ''
  // setFieldValue('profile_path', '')
}

onMounted(async () => {
  try {
    optionsCommunities.value = (await $fetch('communities')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
      location: { lat: parseFloat(result.lat), lng: parseFloat(result.lng) },
    }))
    await getUserLocation()
    if (params.id) {
      await getDataUpdate()
    }
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

function handleMarkerClick(event: any) {
  setFieldValue('lat', event.latLng.lat())
  setFieldValue('lng', event.latLng.lng())
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
        label: 'Lista de Entregas',
        to: '/communities/deliveries'
      },
      {
        label: 'Nueva Entrega'
      },
    ]"
  />
  <form class="form-layout is-stacked" @submit.prevent="onSubmit">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Nueva Entrega</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                to="/communities/deliveries"
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
              <GoogleMap
                ref="mapRef"
                api-key="AIzaSyDDmEp9TeBUWtHMkgMukAGf8_nnaDFC3HU"
                style="width: 100%; height: 200px"
                :center="{ lat: values.lat, lng: values.lng }"
                :zoom="11"
                :street-view-control="false"
                :map-type-control="false"
              >
                <Marker
                  :options="{ position: { lat: values.lat, lng: values.lng }, draggable: draggableMaps }"
                  @dragend="handleMarkerClick"
                />
              </GoogleMap>
            </div>
          </div>
          <div class="columns is-multiline">
            <!------------- Community ------------------------>
            <div class="column is-12">
              <VField
                id="community_id"
                label="Comunidad"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    placeholder="Seleccione una comunidad"
                    :model-value="values.community_id"
                    :close-on-select="true"
                    :searchable="true"
                    :options="optionsCommunities"
                    @input="setFieldValue('community_id', $event)"
                    @select="selectCommunity"
                  />
                </VControl>
                <ErrorMessage class="help is-danger" name="community_id" />
              </VField>
            </div>
            <!------------- Lista de Datos Adicionales ------------------------>
            <div class="column is-12">
              <hr>
              <div class="list-flex-toolbar flex-list-v1">
                <h3>Lista de Beneficios</h3>
                <VButtons>
                  <VButton
                    color="info"
                    icon="fas fa-plus"
                    @click="isOpenAdditional = true"
                  >
                    Agregar Beneficios
                  </VButton>
                </VButtons>
              </div>
              <VDataTableSingle
                :column-id="'index'"
                :columns="columnBenefits"
                :model-value="listBenefits"
                :button-table="buttonTableSingle"
                @delete="deleteItemAdditional"
              />
            </div>
            <!------------- Adjunto Documento ------------------------------------------->
            <div class="column is-12">
              <!------------- Adjuntar Archivos ------------------->
              <div class="column is-3">
                <VField grouped>
                  <VControl>
                    <div class="file">
                      <label class="file-label">
                        <input
                          class="file-input"
                          accept="image/*,"
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
              <div class="columns is-multiline">
                <div class="column is-12">
                  <div class="form-section-output">
                    <div
                      v-for="(image, index) in imageSelect"
                      :key="index"
                      class="pdf-view"
                    >
                      <VIconButton
                        class="btn-delete-pdf"
                        icon="feather:trash-2"
                        color="danger"
                        @click.prevent="removeFile(index)"
                      />
                      <VPhotosSwipe
                        thumbnail-radius="5"
                        :items="[
                          {
                            src: image.currentImageUrl,
                            thumbnail: image.currentImageUrl,
                            w: image.imageDimension.width,
                            h: image.imageDimension.height,
                          },
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  <!-- Modal - Add Additional -->
  <AddBenefits
    :is-open="isOpenAdditional"
    @close="isOpenAdditional = false"
    @add-additional="addItemAdditional"
  />
</template>
<style lang="scss" scoped>
.pdf-view {
  width: 200px;
  cursor: pointer;
  margin: 5px;
}
.btn-delete-pdf{
  position: absolute;
  z-index: 100;
  margin: 5px;
}
.form-section-output {
  display: flex;
  flex-wrap: wrap;

  .items-label {
    width: 100%;
  }
}
</style>
