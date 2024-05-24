<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { useFetch } from '/@src/composable/useFetch'
import { onMounted, ref } from 'vue'
import type { RouteParamValue } from 'vue-router'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { toTypedSchema } from '@vee-validate/zod'
import { string, number, z as zod } from 'zod'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'

const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const route = useRoute()
const params = route.params as RouteParams

interface RouteParams { id?: string }
interface Department {
  value: number
  label: string
}
const optionDepartment = ref<
  Array<Department>
>([])

interface DistrictForm {
  name: string
  code: string
  department_id: number
}

const getDataUpdate = async (idValue: string | RouteParamValue[]) => {
  try {
    await $fetch(`/districts/${idValue}`).then(function (res) {
      setFieldValue('name', res.name)
      setFieldValue('code', res.code)
      setFieldValue('department_id', res.department_id)
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

const validationSchema = toTypedSchema(
  zod.object({
    name: string({ required_error: 'El campo no puede estar vacio' }),
    department_id: number({ required_error: 'El campo no puede estar vacio' }),
  }),
)

const { values, handleSubmit, isSubmitting, setFieldError, setFieldValue } = useForm<DistrictForm>({
  validationSchema,
})

onMounted(async () => {
  try {
    optionDepartment.value = (await $fetch('departments')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
    }))
    if (params.id) {
      await getDataUpdate(params.id)
    }
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

// -------------Save or Update ----------------------------
const onSubmit = handleSubmit(async () => {
  await submitHandler('districts', values, params.id, false, setFieldError, '/tool/districts')
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
        label: 'Panel Principal',
        hideLabel: true,
        icon: 'feather:home',
        to: '/app',
      },
      {
        label: 'Lista Distritos',
        to: '/tool/districts',
      },
      {
        label: 'Registrar Distrito',
      },
    ]"
  />

  <form
    class="form-layout is-stacked"
    @submit.prevent="onSubmit"
  >
    <div class="form-outer">
      <div
        :class="[isStuck && 'is-stuck']"
        class="form-header stuck-header"
      >
        <div class="form-header-inner">
          <div class="left">
            <h3 v-if="!params.id">
              Registrar nuevo Distrito
            </h3>
            <h3 v-else>
              Editar Distrito
            </h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                to="/tool/districts"
                icon="lnir lnir-arrow-left rem-100"
                light
                dark-outlined
                :disabled="isSubmitting"
              >
                Cancel
              </VButton>
              <VButton
                v-if="params.id"
                type="submit"
                color="primary"
                raised
              >
                Actualizar
              </VButton>
              <VButton
                v-else
                type="submit"
                color="primary"
                raised
              >
                Guardar
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <div class="form-section">
          <div class="columns is-multiline">
            <div class="column is-12">
              <!-- -------------------- Nombre ----------------------------- -->
              <VField
                id="name"
                label="Nombre"
              >
                <VControl>
                  <VInput class="input" />
                  <ErrorMessage
                    class="help is-danger"
                    name="name"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-12">
              <!-- -------------------- Codigo --------------------------- -->
              <VField
                id="code"
                label="Código"
              >
                <VControl>
                  <VInput class="input" />
                </VControl>
              </VField>
            </div>
            <div class="column is-12">
              <!-- -------------------- Departamento ----------------------- -->
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
                    :options="optionDepartment"
                    @input="setFieldValue('department_id', $event)"
                  />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
