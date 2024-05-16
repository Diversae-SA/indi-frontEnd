<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import type { RouteParamValue } from 'vue-router'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { toTypedSchema } from '@vee-validate/zod'
import { number, z as zod } from 'zod'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'
import { useFetch } from '/@src/composable/useFetch'
import { ref } from 'vue'

const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const route = useRoute()
const optionFunctionaries = ref([])
const optionOrganizationChart = ref([])
const params = route.params as RouteParams

interface RouteParams { id?: string }

interface userForm {
  people_id: number | null
  department: object
}

const getDataUpdate = async (idValue: string | RouteParamValue[]) => {
  try {
    await $fetch(`/dependencies/${idValue}`).then(function (res) {
      setFieldValue('people_id', res.id)
      setFieldValue('department', res.departamentos.map((permission: any) => permission.id))
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

const validationSchema = toTypedSchema(
  zod.object({
    people_id: number({
      required_error: 'Seleccione un funcionario',
    }),
  }),
)

const { values, handleSubmit, isSubmitting, setFieldError, setFieldValue } = useForm<userForm>({
  validationSchema,
})

onMounted(async () => {
  try {
    optionOrganizationChart.value = (await $fetch('departamentos')).data.map((result: any) => ({
      value: result.id,
      label: result.name,
    }))
    optionFunctionaries.value = (await $fetch('getPeopleToFunctionary')).map((result: any) => ({
      value: result.id,
      label: result.ci + ' - ' + result.name + ', ' + result.last_name,
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
  await submitHandler('dependencies', JSON.stringify(values), params.id, false, setFieldError, '/tool/dependencies')
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
        label: 'Lista de Dependencias',
        to: '/tool/dependencies',
      },
      {
        label: 'Asignar Dependencias',
      },
    ]"
  />

  <form
    class="form-layout is-stacked"
    @submit.prevent="onSubmit"
  >
    <div class="form-outer">
      <div
        class="form-header stuck-header"
      >
        <div class="form-header-inner">
          <div class="left">
            <h3 v-if="!params.id">
              Asignar Dependencia a Funcionario
            </h3>
            <h3 v-else>
              Editar Dependencia a Funcionario
            </h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                to="/tool/dependencies"
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
              <!-- --------------------- Responsable --------------------------- -->
              <VField
                id="people_id"
                label="Funcionario"
                class="is-autocomplete-select"
              >
                <VControl icon="feather:search">
                  <VMultiselect
                    :model-value="values.people_id"
                    placeholder="Seleccione un funcionario"
                    :disabled="!!params.id"
                    :close-on-select="true"
                    :searchable="true"
                    :options="optionFunctionaries"
                    @input="setFieldValue('people_id', $event)"
                  />
                  <ErrorMessage class="help is-danger" name="people_id" />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField
                label="Lista de Dependencias"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.department"
                    placeholder="Asigna las dependencias"
                    :close-on-select="false"
                    :searchable="true"
                    :mode="'tags'"
                    :options="optionOrganizationChart"
                    @input="setFieldValue('department', $event)"
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
