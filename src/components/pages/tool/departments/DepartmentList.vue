<script setup lang="ts">
import { useApi } from '/@src/composable/useApi'
import { hasPermission } from '/@src/utils/permissions'
import { useLaravelError } from '/@src/composable/useLaravelError'
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, ErrorMessage } from 'vee-validate'
import { string, z as zod } from 'zod'
import { catchFieldError } from '/@src/utils/api/catchFieldError'

const api = useApi()
const { t } = useI18n()
const notify = useNotyf()
const isLoading = ref(false)
const router = useRouter()
const modalDeleted = ref(false)
const modalNew = ref(false)
const columns = [
  { data: 'id', title: 'ID', visible: false},
  { data: 'name', title: 'Nombre del Departamento' },
  { data: 'code', title: 'Código' },
]
const idData = ref(null)
const emit = defineEmits(['updateTable'])
const showButtons = ['edit','delete']
const updateTableEvent = ref(false)

interface Department {
  name: string,
  code: string,
}

const validationSchema = toTypedSchema(
  zod.object({
    code: string({
      required_error: 'Ingrese el codigo del Departamento',
    }),
    name: string({
      required_error: 'El campo no puede estar vacio',
    }),
  })
)

const { values, handleSubmit, isSubmitting, setFieldError } = useForm<Department>({
  validationSchema,
});

async function onStore(values: any) {
  if (!isLoading.value) {
    isLoading.value = true

    try {
      updateTableEvent.value = false
      emit('updateTable')
      await api.post('/departments', values)
      modalNew.value = false
      updateTableEvent.value = true
      emit('updateTable')
      notify.dismissAll()
      notify.success('Dato registrado con éxito!')
    } catch (err: any) {
      catchFieldError(err, setFieldError)
      notify.error(useLaravelError(err))
    } finally {
      isLoading.value = false
    }
  }
}
const submitHandler = handleSubmit(onStore)

const handleEdit = (id: number) => {
  router.push({
    name: '/setting/profile-settings',
    params: { id },
  })
}

const handleDelete = (data: any) => {
  idData.value = data
  modalDeleted.value = true
}

async function DeletedTraining() {
  try {
    updateTableEvent.value = false
    emit('updateTable')
    await api.delete(`/departments/${idData.value}`)
    modalDeleted.value = false
    updateTableEvent.value = true
    emit('updateTable')
    notify.dismissAll()
    notify.success(`${t('response.json.success.delete')}`)
  } catch (err: any) {
    modalDeleted.value = false
    notify.error(useLaravelError(err))
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
        label: 'Ajustes',
      },
      {
        label: 'Lista de Departamentos',
      },
    ]"
  />

  <div
    v-if="hasPermission('program create users')"
    class="list-flex-toolbar flex-list-v1"
  >
    <VButtons>
      <VButton
        color="primary"
        icon="fas fa-plus"
        @click="modalNew = true"
      >
        Nuevo Departamento
      </VButton>
    </VButtons>
  </div>

  <DataTableWrapper
    :columns="columns"
    server-side-url="departments"
    :update-table-event="updateTableEvent"
    :show-buttons="showButtons"
    @edit="handleEdit"
    @delete="handleDelete"
  />

  <VModal
    is="form"
    :open="modalNew"
    title="Registrar nuevo Departamento"
    size="small"
    actions="right"
    @submit.prevent="modalNew = false"
    @close="modalNew = false"
  >
    <template #content>
      <div class="modal-form">
        <VField
          id="code"
          label="Codigo del Departamento"
        >
          <VControl icon="feather:code">
            <VInput
              v-model="values.code"
              type="text"
              class="input"
              :disabled="isSubmitting"
            />
            <ErrorMessage
              class="help is-danger"
              name="code"
            />
          </VControl>
        </VField>
        <VField
          id="name"
          label="Nombre del Departamento"
        >
          <VControl icon="feather:file-text">
            <VInput
              v-model="values.name"
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
