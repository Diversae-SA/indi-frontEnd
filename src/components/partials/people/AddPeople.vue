<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, useForm } from 'vee-validate'
import { string, date, z as zod } from 'zod'

export interface VBreadcrumbsProps {
  isOpen: boolean
}

const props = withDefaults(defineProps<VBreadcrumbsProps>(), {})
const loadingCI = ref(false)

const validationSchema = toTypedSchema(
  zod.object({
    ci: string({
      required_error: 'Ingrese el numero de CI',
    }).min(1, 'Ingrese el numero de CI'),
    name: string({
      required_error: 'Los datos no pueden ser Null',
    }),
    last_name: string({
      required_error: 'Los datos no pueden ser Null',
    }),
    date_birth: date({
      required_error: 'Los datos no pueden ser Null',
      invalid_type_error: 'Los datos no pueden ser Null',
    }),
    gender: string({
      required_error: 'Los datos no pueden ser Null',
    }),
  }),
)

interface People {
  ci: string
  name: string
  last_name: string
  date_birth: string
  gender: string
}

const { values, handleSubmit } = useForm<People>({
  validationSchema,
})

const emits = defineEmits<{
  (e: 'addPeople', values: any): void
}>()

const onSubmit = handleSubmit(async () => {
  emits('addPeople', values)
})
</script>

<template>
  <VModal
    title="Agregar Participante"
    :open="props.isOpen"
    size="medium"
    actions="center"
    noscroll
    noclose
  >
    <template #content>
      <form class="modal-form" @submit.prevent="onSubmit">
        <div class="columns is-multiline">
          <div class="column is-6">
            <VField
              id="ci"
              label="Numero de CI"
              addons
            >
              <VControl expanded :loading="loadingCI">
                <VInput
                  class="input"
                  placeholder="Ingrese el numero de CI"
                  onclick="this.select()"
                />
                <ErrorMessage class="help is-danger" name="ci" />
              </VControl>
              <!--              <VControl>-->
              <!--                <VButton-->
              <!--                  color="primary"-->
              <!--                  :disabled="loadingCI"-->
              <!--                  @click.prevent="getPeopleCi"-->
              <!--                >-->
              <!--                  Buscar-->
              <!--                </VButton>-->
              <!--              </VControl>-->
            </VField>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column is-6">
            <VField id="name" label="Nombre">
              <VControl>
                <VInput class="input" autocomplete="off" />
                <ErrorMessage class="help is-danger" name="name" />
              </VControl>
            </VField>
          </div>
          <div class="column is-6">
            <VField id="last_name" label="Apellido">
              <VControl>
                <VInput class="input" />
                <ErrorMessage class="help is-danger" name="last_name" />
              </VControl>
            </VField>
          </div>
          <div class="column is-6">
            <VField id="date_birth" label="Fecha de Nacimiento">
              <VControl>
                <VDate class="input" />
                <ErrorMessage class="help is-danger" name="date_birth" />
              </VControl>
            </VField>
          </div>
          <div class="column is-6">
            <VField
              id="gender"
              label="Sexo"
            >
              <VControl>
                <VRadio
                  id="gender1"
                  value="M"
                  label="Masculino"
                  color="primary"
                  square
                />
                <VRadio
                  id="gender2"
                  value="F"
                  label="Femenino"
                  color="primary"
                  square
                />
                <ErrorMessage class="help is-danger" name="gender" />
              </VControl>
            </VField>
          </div>
        </div>
      </form>
    </template>
    <template #action>
      <VButton
        color="primary"
        raised
        @click.prevent="onSubmit"
      >
        Agregar
      </VButton>
    </template>
  </VModal>
</template>
