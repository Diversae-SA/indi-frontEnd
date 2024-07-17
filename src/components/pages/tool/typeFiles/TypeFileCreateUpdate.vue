<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import type { RouteParamValue } from 'vue-router'
import { catchFieldError } from '/@src/utils/api/catchFieldError'
import { toTypedSchema } from '@vee-validate/zod'
import { string, z as zod } from 'zod'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'
import { useFetch } from '/@src/composable/useFetch'

const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const route = useRoute()
const tagsTypeData = ref()
const params = route.params as RouteParams

interface RouteParams { id?: string }
interface dataForm {
  name: string
  abbreviation: string | null
  type_info: string | null
  type_data: object
}

const getDataUpdate = async (idValue: string | RouteParamValue[]) => {
  try {
    await $fetch(`/type_files/${idValue}`).then(function (res) {
      setFieldValue('name', res.name)
      setFieldValue('abbreviation', res.abbreviation)
      setFieldValue('type_info', res.type_info)
      setFieldValue('type_data', res.type_data.map((result: any) => result.id))
      if (res.type_info !== null) {
        internal.value = true
      }
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

const validationSchema = toTypedSchema(
  zod.object({
    name: string({
      required_error: 'Nombre de usuario no puede estar vacio',
    }).min(3, { message: 'El nombre debe contener como mínimo 3 letras' }),
  }),
)

const { values, handleSubmit, isSubmitting, setFieldError, setFieldValue } = useForm<dataForm>({
  validationSchema,
})

onMounted(async () => {
  try {
    tagsTypeData.value = (await $fetch('type_data')).data.map((result: any) => ({
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

const internal = ref(false)
watch(
  [() => internal.value],
  ([newValue]) => {
    if (newValue) {
      setFieldValue('type_info', 'INTERNO')
    }
    else {
      setFieldValue('type_info', null)
    }
  },
)

// -------------Save or Update ----------------------------
const onSubmit = handleSubmit(async () => {
  await submitHandler('type_files', JSON.stringify(values), params.id, false, setFieldError, '/tool/type_files')
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
        label: 'Lista de Tipos de Expedientes',
        to: '/tool/type_files',
      },
      {
        label: 'Crear Tipo de Expediente',
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
              Registrar Tipo de Expediente
            </h3>
            <h3 v-else>
              Editar Tipo de Expediente
            </h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                to="/tool/type_files"
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
            <div class="column is-6">
              <VField
                id="name"
                label="Nombre del Expediente"
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
            <div class="column is-6">
              <VField>
                <VControl>
                  <VSwitchSegment
                    v-model="internal"
                    label-true=""
                    label-false="Expediente Interno"
                    color="primary"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField
                id="abbreviation"
                label="Prefijo"
              >
                <VControl>
                  <VInput class="input" />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField
                label="Lista de tipos de Datos"
              >
                <VControl>
                  <VMultiselect
                    :model-value="values.type_data"
                    placeholder="Agrega los permisos"
                    :close-on-select="false"
                    :searchable="true"
                    :mode="'tags'"
                    :options="tagsTypeData"
                    @input="setFieldValue('type_data', $event)"
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
