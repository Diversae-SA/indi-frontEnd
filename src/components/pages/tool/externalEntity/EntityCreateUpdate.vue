<script setup lang="ts">
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, z as zod } from 'zod'
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
const getDataUpdate = async () => {
  try {
    await $fetch(`/external-entities/${params.id}`).then(function (res) {
      setValues({
        name: res.name,
        abbreviation: res.abbreviation,
      })
    })
  }
  catch (err: any) {
    catchFieldError(err, setFieldError)
  }
}

const validationSchema = toTypedSchema(
  zod.object({
    name: string({
      required_error: 'Ingrese la Denominación',
    }),
    abbreviation: string().nullish(),
  }),
)
interface EntityForm {
  name: string
  abbreviation: string
}
const { values, handleSubmit, setFieldError, setValues } = useForm<EntityForm>({
  validationSchema,
})

// -------------Guardar los Datos ----------------------------
const onSubmit = handleSubmit(async () => {
  await submitHandler(
    'external-entities',
    values,
    params.id,
    false,
    setFieldError,
    '/tool/externalEntity',
  )
})

onMounted(async () => {
  if (params.id) {
    await getDataUpdate()
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
        label: 'Lista de Entidades Externas',
        to: '/tool/externalEntity',
      },
      {
        label: 'Nueva Entidad Externa',
      },
    ]"
  />
  <form class="form-layout is-stacked" @submit.prevent="onSubmit">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Nueva Entidad</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                to="/tool/externalEntity"
                light
                dark-outlined
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
            <!------------- Denominacion --------------------------->
            <div class="column is-6">
              <VField id="name" label="Nombre de la Entidad">
                <VControl>
                  <VInput type="text" placeholder="" />
                  <ErrorMessage class="help is-danger" name="name" />
                </VControl>
              </VField>
            </div>
            <!------------- Abreviacion --------------------------->
            <div class="column is-4">
              <VField id="abbreviation" label="Abreviación">
                <VControl>
                  <VInput type="text" placeholder="" />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
