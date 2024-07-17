<script setup lang="ts">
import { useFetch } from '/@src/composable/useFetch'
import { hasPermission } from '/@src/utils/permissions'
import { handleError } from '/@src/composable/useLaravelError'
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, ErrorMessage } from 'vee-validate'
import { string, z as zod } from 'zod'
import { catchFieldError } from '/@src/utils/api/catchFieldError'

const $fetch = useFetch()
const { t } = useI18n()
const notify = useNotyf()
const isLoading = ref(false)
const modalDeleted = ref(false)
const modalNew = ref(false)
const updateData = ref(false)
const columns = [
  { data: 'id', title: 'ID', visible: false },
  { data: 'name', title: 'Nombre del Dato' },
  { data: 'info', title: 'Información' },
]
const idData = ref()
const emit = defineEmits(['updateTable'])
const buttonTable = [
  { button: 'edit', permission: 'additional_data edit' },
  { button: 'delete', permission: 'additional_data delete' },
]
const updateTableEvent = ref(false)

interface Department {
  name: string
  info: string
}

const validationSchema = toTypedSchema(
  zod.object({
    info: string().nullish(),
    name: string({
      required_error: 'El campo no puede estar vacio',
    }),
  }),
)

const { values, handleSubmit, isSubmitting, setFieldError, setFieldValue } = useForm<Department>({
  validationSchema,
})

async function onStore() {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      updateTableEvent.value = false
      emit('updateTable')
      const method = updateData.value ? 'PUT' : 'POST'
      const url = updateData.value ? '/additional_data/' + idData.value : '/additional_data'
      await $fetch(url, { method: method, body: values })
      modalNew.value = false
      updateTableEvent.value = true
      emit('updateTable')
      notify.dismissAll()
      notify.success('Dato registrado con éxito!')
    }
    catch (err: any) {
      catchFieldError(err, setFieldError)
      notify.error(handleError(err))
    }
    finally {
      isLoading.value = false
    }
  }
}
const submitHandler = handleSubmit(onStore)

function handleNew() {
  updateData.value = false
  modalNew.value = true
}

async function handleEdit(id: number) {
  idData.value = id
  await $fetch('additional_data/' + id).then((result: Department) => {
    setFieldValue('name', result.name)
    setFieldValue('info', result.info)
    updateData.value = true
    modalNew.value = true
  })
}

function handleDelete(data: any) {
  idData.value = data
  modalDeleted.value = true
}

async function DeletedTraining() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    await $fetch(`/additional_data/${idData.value}`, { method: 'DELETE' })
    modalDeleted.value = false
    updateTableEvent.value = true
    emit('updateTable')
    notify.dismissAll()
    notify.success(`${t('response.json.success.delete')}`)
  }
  catch (err: any) {
    modalDeleted.value = false
    notify.error(handleError(err))
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
        label: 'Comunidades Indigenas',
      },
      {
        label: 'Lista de Datos Adicionales',
      },
    ]"
  />

  <div
    v-if="hasPermission('additional_data create')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        color="primary"
        icon="fas fa-plus"
        @click="handleNew"
      >
        Nuevo Dato Adicional
      </VButton>
    </VButtons>
  </div>

  <DataTableWrapper
    :columns="columns"
    server-side-url="additional_data"
    :update-table-event="updateTableEvent"
    :button-table="buttonTable"
    @edit="handleEdit"
    @delete="handleDelete"
  />

  <VModal
    is="form"
    :open="modalNew"
    :title="updateData ? 'Actualizar Dato Adicional' : 'Registrar nuevo Dato Adicional'"
    size="small"
    actions="right"
    :noclose="true"
    @close="modalNew = false"
  >
    <template #content>
      <div class="modal-form">
        <div class="columns is-multiline">
          <div class="column is-12">
            <VField
              id="name"
              label="Nombre para el Dato Adicional"
            >
              <VControl icon="feather:file-text">
                <VInput
                  type="text"
                  class="input"
                  :disabled="isSubmitting"
                />
                <ErrorMessage
                  class="help is-danger"
                  name="name"
                />
              </VControl>
            </VField>
          </div>
          <div class="column is-12">
            <VField
              id="info"
              label="Información Adicional"
            >
              <VControl icon="feather:file-text">
                <VInput
                  type="text"
                  class="input"
                  :disabled="isSubmitting"
                />
              </VControl>
            </VField>
          </div>
        </div>
      </div>
    </template>
    <template #action>
      <VButton
        :loading="isLoading"
        type="submit"
        color="primary"
        raised
        @click.prevent="submitHandler"
      >
        Guardar
      </VButton>
    </template>
  </VModal>

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
        @click="DeletedTraining"
      >
        Eliminar
      </VButton>
    </template>
  </VModal>
</template>
