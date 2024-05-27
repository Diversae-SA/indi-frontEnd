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
const OptionsDistricts = ref<Array<{ value: number, label: string }>>([])
const districtEnable = ref<boolean>(true)

const getDataUpdate = async () => {
  try {
    await $fetch(`/organizations/${params.id}`).then(function (res) {
      findDepartmentByDistrict(res.district.id)
      selectDepartment()
      setValues({
        ruc: res.ruc,
        name: res.name,
        district_id: res.district.id,
        address: res.address,
        email: res.email,
        phone: res.phone,
      })
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
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
    ruc: string().nullish(),
    name: string({
      required_error: 'Ingrese el nombre de la organización',
    }),
    district_id: number({
      required_error: 'Seleccione un distrito',
      invalid_type_error: 'Seleccione un distrito',
    }),
    address: string().nullish(),
    email: string().nullish(),
    phone: string().nullish(),
  }),
)
interface OrganizationForm {
  ruc: string | null
  name: string
  department_id: number | null
  district_id: number | null
  address: string
  email: string | null
  phone: string | null
}
const { values, handleSubmit, setFieldError, setFieldValue, setValues } = useForm<OrganizationForm>({
  validationSchema,
})

// -------------Guardar los Datos ----------------------------
const onSubmit = handleSubmit(async (values) => {
  await submitHandler(
    'organizations',
    values,
    params.id,
    false,
    setFieldError,
    '/communities/organizations',
  )
})

onMounted(async () => {
  try {
    OptionsDepartments.value = (await $fetch('departments')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
      districts: result.districts.map((district: any) => ({
        value: district.id, label: district.name,
      })),
    }))
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
        label: 'Comunidades Indigenas',
      },
      {
        label: 'Lista de Organizaciones',
        to: '/communities/organizations',
      },
      {
        label: 'Nueva Organización',
      },
    ]"
  />
  <form class="form-layout is-stacked" @submit.prevent="onSubmit">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Nueva Organización</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                to="/communities/organizations"
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
            <!------------- RUC --------------------------->
            <div class="column is-6">
              <VField id="ruc" label="Número de RUC">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <!------------- Razon Social --------------------------->
            <div class="column is-12">
              <VField id="name" label="Razón Social">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="name" />
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
            <!------------- Email --------------------->
            <div class="column is-6">
              <VField id="email" label="Correo Electrónico">
                <VControl>
                  <VInput type="text"/>
                </VControl>
              </VField>
            </div>
            <!------------- Numero de Inscripción --------------------------->
            <div class="column is-6">
              <VField id="phone" label="Número de Telefono">
                <VControl>
                  <VInput type="text" />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
