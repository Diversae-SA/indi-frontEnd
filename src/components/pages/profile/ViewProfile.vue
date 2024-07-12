<script setup lang="ts">
import { useUserSession } from '/@src/stores/userSession'
import { ErrorMessage, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { string, boolean, number, z as zod, array } from 'zod'
import { useI18n } from 'vue-i18n'
import { useFetch } from '/@src/composable/useFetch'
import { useSubmitHandler } from '/@src/composable/useSubmitHandler'

const { t } = useI18n()
const $fetch = useFetch()
const { submitHandler } = useSubmitHandler()
const userSession = useUserSession()

const selectedFile = ref<File | null>(null)
const imageDimensions = ref()
const currentImageUrl = ref('')
const editable = ref(true)
const isOpenStore = ref(false)
const smallFormOpen = ref(false)

// TODO - calcular la dimension se repite, verificar y limpiar el codigo
const onFileSelect = (event: Event): void => {
  const input = event.target as HTMLInputElement
  if (input && input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
    // creo la url
    currentImageUrl.value = URL.createObjectURL(input.files[0])

    // Crear un objeto URL para el archivo seleccionado
    const fileURL = URL.createObjectURL(input.files[0])
    setFieldValue('profile_path', fileURL)

    // Crear un nuevo objeto de imagen y cargar la imagen
    const img = new Image()
    img.onload = () => {
      // Aquí tienes acceso a las dimensiones de la imagen
      const width = img.width
      const height = img.height
      imageDimensions.value = { width, height }
      URL.revokeObjectURL(fileURL)
    }
    img.src = fileURL
  }
  else {
    selectedFile.value = null
  }
}

const removeFile = (): void => {
  selectedFile.value = null
  imageDimensions.value = null
  currentImageUrl.value = ''
  setFieldValue('profile_path', '')
}

function formattedNumber(valueNumber: string | null | undefined): string {
  if (valueNumber === null || valueNumber === undefined) {
    return ''
  }
  const numberValue = Number(valueNumber)
  if (isNaN(numberValue)) {
    return ''
  }
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 0 }).format(numberValue)
}

function activeEdit() {
  editable.value = !editable.value
}

const validationSchema = toTypedSchema(
  zod.object({
    nickname: string({
      required_error: 'Nombre de usuario no puede estar vacio',
    }).min(3, { message: 'El nombre debe contener como mínimo 3 letras' }),
    emailUser: string({
      required_error: t('auth.errors.email.required'),
    }).email(t('auth.errors.email.format')),
    profile_path: string().nullish(),
    ...(!smallFormOpen.value
      ? {
          password_old: string({
            required_error: t('auth.errors.password.required'),
          }).min(8, t('auth.errors.password.length')),
          password: string({
            required_error: t('auth.errors.password.required'),
          })
            .min(8, t('auth.errors.password.length')),
          password_confirmation: string({
            required_error: t('auth.errors.passwordCheck.match'),
          }),
        }
      : {
          password: string().nullish(),
        }
    ),
  })
    .refine((data) => {
      if (data.password) {
        return data.password === data.password_confirmation
      }
      /* else if (!smallFormOpen.value) {
        return data.password === data.password_confirmation
      } */
      return true
    }, {
      message: t('auth.errors.passwordCheck.match'),
      path: ['password_confirmation'],
    }),
)
interface userForm {
  id: number
  profile_path: string | null
  ci: string
  name: string
  last_name: string
  date_birth: string
  gender: string
  nationality: string
  address: string
  email: string
  phone: string
  department: string
  district: string
  nickname: string
  emailUser: string
  password_old: string
  password: string
  password_confirmation: string
  departamento: string
  departamentos: []
  roles: []
  active: boolean
}
const { values, handleSubmit, isSubmitting, setFieldError, setFieldValue, setValues } = useForm<userForm>({
  validationSchema,
})

const onSubmit = handleSubmit(async () => {
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append(`image`, selectedFile.value ?? 'null')
  formData.append('data', JSON.stringify(values))
  await submitHandler('updateProfile', formData, values.id, true, setFieldError, '/profile')
  editable.value = true
  isOpenStore.value = false
})

const onSubmitPassword = handleSubmit(async () => {
  const result = await submitHandler('updatePassword', values, values.id, false, setFieldError, '/profile')
  if (result) {
    smallFormOpen.value = false
  }
})

onMounted(async () => {
  try {
    await $fetch('getProfile').then(function (res) {
      setValues({
        id: res.id,
        ci: formattedNumber(res.ci),
        name: res.name,
        last_name: res.last_name,
        date_birth: res.date_birth,
        gender: res.gender,
        nationality: res.nationality,
        address: res.address,
        email: res.email,
        phone: res.phone,
        department: res.district.department.name,
        district: res.district.name,
        departamento: res.functionary.departamento.name,
        departamentos: res.departamentos,
        roles: res.user.roles,
        nickname: res.user.name,
        profile_path: res.user.profile_path,
        emailUser: res.user.email,
      })
      if (res.user.profile_path) {
        currentImageUrl.value = import.meta.env.VITE_API_BASE_URL + '/storage/' + res.user.profile_path
        const img = new Image()
        img.onload = () => {
          const width = img.width
          const height = img.height
          imageDimensions.value = { width, height }
        }
        img.src = currentImageUrl.value
      }
    })
  }
  catch (error) {
    console.error('Error al cargar los datos', error)
  }
})

</script>

<template>
  <div class="profile-wrapper">
    <div class="profile-body">
      <div class="columns">
        <div class="column is-8">
          <div class="profile-card">
            <div class="columns">
              <div class="column is-3">
                <p>Foto de Perfil</p>
                <div
                  v-if="!currentImageUrl"
                  class="image-container"
                >
                  <img
                    src="/src/assets/illustrations/images/ImageNotFound.png"
                    alt=""
                  >
                </div>
                <VPhotosSwipe
                  v-if="imageDimensions"
                  thumbnail-radius="5"
                  :items="[
                    {
                      src: currentImageUrl,
                      thumbnail: currentImageUrl,
                      w: imageDimensions.width,
                      h: imageDimensions.height,
                    },
                  ]"
                />
                <VField
                  v-if="!currentImageUrl && !editable"
                  grouped
                >
                  <VControl>
                    <div class="file is-primary">
                      <label class="file-label">
                        <input
                          class="file-input"
                          accept="image/*,"
                          type="file"
                          name="resume"
                          @change="onFileSelect"
                        >
                        <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-cloud-upload-alt" />
                          </span>
                          <span class="file-label" />
                        </span>
                      </label>
                    </div>
                  </VControl>
                </VField>
                <VIconButton
                  v-else
                  v-show="!editable"
                  color="danger"
                  light
                  raised
                  circle
                  icon="feather:x"
                  @click="removeFile"
                />
              </div>
              <div class="column is-8">
                <div class="profile-card-section">
                  <div class="section-title">
                    <h4>Datos Generales</h4>
                  </div>
                  <div class="section-content">
                    <p class="description">
                      Nro CI: <span>{{ values.ci }}</span>
                    </p>
                    <p class="description">
                      Nombre: <span>{{ values.name }}</span>
                    </p>
                    <p class="description">
                      Apellido: <span>{{ values.last_name }}</span>
                    </p>
                    <p class="description">
                      Fecha de Nacimiento: <span>{{ values.date_birth }}</span>
                    </p>
                    <p class="description">
                      Sexo: <span>{{ values.gender }}</span>
                    </p>
                    <p class="description">
                      Nacionalidad: <span>{{ values.nationality }}</span>
                    </p>
                    <p class="description">
                      Departamento: <span>{{ values.department }}</span>
                    </p>
                    <p class="description">
                      Distrito: <span>{{ values.district }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-card-section">
              <div class="section-title">
                <h4>Datos Editables</h4>
                <i
                  v-if="editable"
                  aria-hidden="true"
                  class="lnil lnil-pencil btn-ico"
                  @click.prevent="activeEdit"
                />
                <i
                  v-else
                  aria-hidden="true"
                  class="lnil lnil-save btn-ico"
                  @click="isOpenStore = true"
                />
              </div>
              <div class="section-content">
                <!-- -------------- Nickname ----------------------------------------- -->
                <VField
                  id="nickname"
                  label="Nombre de Usuario"
                >
                  <VControl icon="feather:user">
                    <VInput
                      type="text"
                      class="input"
                      :disabled="isSubmitting || editable"
                    />
                    <ErrorMessage
                      class="help is-danger"
                      name="nickname"
                    />
                  </VControl>
                </VField>
                <!-- -------------- Email User --------------------------------------- -->
                <VField
                  id="emailUser"
                  label="Correo Electrónico de Acceso"
                >
                  <VControl icon="feather:mail">
                    <VInput
                      type="email"
                      class="input"
                      autocomplete="email"
                      :disabled="isSubmitting || editable"
                    />
                    <ErrorMessage
                      class="help is-danger"
                      name="emailUser"
                    />
                  </VControl>
                </VField>
                <!-- -------------- Address ------------------------------------------ -->
                <VField
                  id="address"
                  label="Dirección"
                >
                  <VControl icon="feather:map">
                    <VInput
                      type="text"
                      class="input"
                      :disabled="isSubmitting || editable"
                    />
                    <ErrorMessage
                      class="help is-danger"
                      name="address"
                    />
                  </VControl>
                </VField>
                <!-- -------------- Email -------------------------------------------- -->
                <VField
                  id="email"
                  label="Correo Electrónico Personal"
                >
                  <VControl icon="feather:mail">
                    <VInput
                      type="email"
                      class="input"
                      autocomplete="email"
                      :disabled="isSubmitting || editable"
                    />
                    <ErrorMessage
                      class="help is-danger"
                      name="email"
                    />
                  </VControl>
                </VField>
                <!-- -------------- Phone -------------------------------------------- -->
                <VField
                  id="phone"
                  label="Número de Celular"
                >
                  <VControl icon="feather:phone">
                    <VInput
                      type="text"
                      class="input"
                      autocomplete="phone"
                      :disabled="isSubmitting || editable"
                    />
                  </VControl>
                </VField>
              </div>
            </div>
            <div class="profile-card-section">
              <div class="section-title">
                <h4>Cambiar de Contraseña</h4>
                <i
                  aria-hidden="true"
                  class="lnil lnil-pencil btn-ico"
                  @click.prevent="smallFormOpen = true"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <!--Notifications-->
          <div class="profile-card">
            <div class="profile-card-section no-padding">
              <div class="section-title">
                <h4>Dependencia/Departamento</h4>
              </div>
              <div class="section-content">
                <div class="network-notifications">
                  <h3 class="dark-inverted">
                    - {{ values.departamento }}
                  </h3>
                  <p v-for="department in values.departamentos" :key="department">
                    - {{ department.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!--Tools-->
          <div class="profile-card">
            <div class="profile-card-section no-padding">
              <div class="section-title">
                <h4>Roles</h4>
              </div>
              <div class="section-content">
                <div class="tools-wrapper">
                  <p v-for="rol in values.roles" :key="rol">
                    - {{ rol.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <VModal
    :open="isOpenStore"
    title=""
    size="small"
    actions="center"
    noscroll
    noclose
    @close="isOpenStore = false"
  >
    <template #content>
      <VPlaceholderSection
        title="Guardar Cambios"
        subtitle="Estas seguro/a de guardar los nuevos cambios?"
      />
    </template>
    <template #action>
      <VButton
        color="primary"
        raised
        @click.prevent="onSubmit"
      >
        Guardar
      </VButton>
    </template>
  </VModal>
  <VModal
    is="form"
    :open="smallFormOpen"
    title="Cambiar Contraseña"
    size="small"
    actions="right"
    noclose
    @submit.prevent="smallFormOpen = false"
    @close="smallFormOpen = false"
  >
    <template #content>
      <div class="modal-form">
        <!-- --------------- Contraseña Actual ---------------------- -->
        <VField id="password_old" label="Contraseña Actual">
          <VControl icon="feather:lock">
            <VInput
              type="password"
              class="input"
              :disabled="isSubmitting"
            />
            <ErrorMessage
              class="help is-danger"
              name="password_old"
            />
          </VControl>
        </VField>
        <!-- --------------- Contraseña Nueva ---------------------- -->
        <VField id="password" label="Contraseña nueva">
          <VControl icon="feather:lock">
            <VInput
              type="password"
              class="input"
              :disabled="isSubmitting"
            />
            <ErrorMessage
              class="help is-danger"
              name="password"
            />
          </VControl>
        </VField>
        <!-- --------------- Contraseña Confirmar ---------------------- -->
        <VField id="password_confirmation" label="Repite la Contraseña Nueva">
          <VControl icon="feather:lock">
            <VInput
              type="password"
              class="input"
              :disabled="isSubmitting"
            />
            <ErrorMessage
              class="help is-danger"
              name="password_confirmation"
            />
          </VControl>
        </VField>
      </div>
    </template>
    <template #action>
      <VButton
        type="submit"
        color="primary"
        raised
        @click.prevent="onSubmitPassword"
      >
        Cambiar
      </VButton>
    </template>
  </VModal>
</template>

<style lang="scss">
@import '/src/scss/abstracts/all';
@import '/src/scss/components/profile-stats';

.btn-ico {
  cursor: pointer;
}

.is-navbar {
  .profile-wrapper {
    margin-top: 30px;
  }
}

.my-gallery {
  max-width: 200px;
}

.image-container {
  max-width: 200px;
}

.profile-wrapper {
  max-width: 1040px;
  margin: 0 auto;

  .profile-header {
    text-align: center;

    > img {
      display: block;
      margin: 0 auto;
      max-width: 300px;
    }

    .v-avatar {
      margin: 0 auto 12px;
    }

    .anim-icon {
      margin-bottom: 12px;
    }

    .title {
      margin-bottom: 6px;
    }

    p {
      font-size: 1rem;
      max-width: 540px;
      margin: 0 auto;
      line-height: 1.3;
    }
  }

  .profile-body {
    padding: 10px 0 20px;

    .profile-card {
      @include vuero-s-card;

      padding: 30px;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .profile-card-section {
        padding-bottom: 20px;

        &:not(:last-child) {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--fade-grey-dark-4);
        }

        &.no-padding {
          padding-bottom: 0;
        }

        .section-title {
          display: flex;
          align-items: center;
          margin-bottom: 12px;

          h4 {
            font-family: var(--font-alt);
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
            color: var(--dark-text);
            margin-inline-end: 6px;
          }

          i {
            color: var(--primary);
          }

          .action-link {
            position: relative;
            top: -2px;
            margin-inline-start: auto;
            text-transform: uppercase;
            font-size: 0.8rem;
          }

          .control {
            margin-inline-start: auto;

            .form-switch {
              transform: scale(0.8);
            }
          }
        }

        .section-content {
          .description {
            font-size: 0.95rem;
            span {
              font-weight: 500;
            }
          }

          .experience-wrapper {
            display: flex;
            flex-wrap: wrap;
            margin-inline-start: -8px;
            margin-inline-end: -8px;

            .experience-item {
              display: flex;
              align-items: center;
              width: calc(50% - 16px);
              margin: 8px;

              img {
                display: block;
                width: 50px;
                min-width: 50px;
                height: 50px;
                border-radius: var(--radius-rounded);
                border: 1px solid var(--fade-grey-dark-4);
              }

              .meta {
                margin-inline-start: 10px;

                > span {
                  font-family: var(--font);
                  display: block;

                  &:first-child {
                    font-family: var(--font-alt);
                    font-weight: 600;
                    color: var(--dark-text);
                    font-size: 0.85rem;
                  }

                  &:nth-child(2),
                  &:nth-child(3) {
                    font-size: 0.85rem;
                    color: var(--light-text);

                    i {
                      position: relative;
                      top: -2px;
                      font-size: 4px;
                      margin: 0 6px;
                    }
                  }

                  &:nth-child(3) {
                    color: var(--primary);
                  }

                  span {
                    display: inline-block;
                  }
                }
              }
            }
          }

          .languages-wrapper {
            display: flex;
            flex-wrap: wrap;
            margin-inline-start: -8px;
            margin-inline-end: -8px;

            .languages-item {
              display: flex;
              align-items: center;
              width: calc(50% - 16px);
              margin: 8px;

              .icon-wrap {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                min-width: 50px;
                height: 50px;

                img {
                  position: absolute;
                  top: 50%;
                  inset-inline-start: 50%;
                  transform: translate(-50%, -50%);
                  display: block;
                  width: 32px;
                  min-width: 32px;
                  height: 32px;
                  border-radius: var(--radius-rounded);
                  border: 1px solid var(--fade-grey-dark-4);
                }
              }

              .meta {
                margin-inline-start: 10px;

                > span {
                  display: block;
                  font-family: var(--font);

                  &:first-child {
                    font-family: var(--font-alt);
                    font-weight: 600;
                    color: var(--dark-text);
                    font-size: 0.9rem;
                  }

                  &:nth-child(2) {
                    font-size: 0.85rem;
                    color: var(--light-text);
                  }

                  span {
                    display: inline-block;
                  }
                }
              }
            }
          }

          .skills-wrapper {
            .skills-item {
              display: flex;
              align-items: center;

              &:not(:last-child) {
                margin-bottom: 16px;
              }

              .icon-wrap {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 42px;
                min-width: 42px;
                height: 42px;
                border-radius: var(--radius-rounded);
                border: 1px solid var(--primary);

                &.has-icon {
                  background: var(--fade-grey-light-2);
                  border: 1px solid var(--fade-grey-dark-3);
                  color: var(--light-text);

                  i {
                    font-size: 1.4rem;
                  }
                }

                img {
                  display: block;
                  width: 34px;
                  min-width: 34px;
                  height: 34px;
                  border-radius: var(--radius-rounded);
                  border: 1px solid var(--fade-grey-dark-4);
                }

                .count {
                  position: absolute;
                  bottom: 0;
                  inset-inline-end: -4px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 22px;
                  height: 22px;
                  border-radius: var(--radius-rounded);
                  background: var(--white);
                  border: 1px solid var(--primary);

                  span {
                    font-family: var(--font);
                    font-weight: 500;
                    font-size: 0.75rem;
                  }
                }
              }

              .skill-info {
                font-family: var(--font);
                margin-inline-start: 12px;
                line-height: 1.3;

                span {
                  display: block;

                  &:first-child {
                    font-family: var(--font-alt);
                    font-weight: 600;
                    color: var(--dark-text);
                    font-size: 0.9rem;
                  }

                  &:nth-child(2) {
                    font-size: 0.9rem;
                    color: var(--light-text);
                  }
                }
              }

              .people {
                margin-inline-start: auto;
                display: flex;
                justify-content: flex-end;

                .v-avatar {
                  margin: 0 4px;
                }
              }
            }
          }

          .recommendations-wrapper {
            display: flex;
            flex-wrap: wrap;
            margin-inline-start: -8px;
            margin-inline-end: -8px;

            .recommendations-item {
              width: calc(50% - 16px);
              margin: 8px;
              background: var(--fade-grey-light-3);
              text-align: center;
              padding: 30px 20px;
              border-radius: var(--radius);

              > .v-avatar {
                display: block;
                margin: 0 auto 8px;
              }

              h3 {
                font-size: 1rem;
                font-family: var(--font-alt);
                font-weight: 600;
                color: var(--dark-text);
                margin-bottom: 8px;
              }

              p {
                font-size: 0.85rem;
                margin-bottom: 16px;
              }

              .meta {
                span {
                  display: block;

                  &:first-child {
                    font-weight: 600;
                    font-family: var(--font-alt);
                    font-size: 0.95rem;
                    color: var(--primary);
                  }

                  &:nth-child(2) {
                    font-size: 0.9rem;
                    color: var(--light-text);
                  }
                }
              }
            }
          }

          .network-notifications {
            h3 {
              font-family: var(--font-alt);
              font-size: 0.9rem;
              margin-bottom: 6px;
            }

            p {
              font-size: 0.9rem;
              max-width: 480px;
            }
          }

          .tools-wrapper {
            padding-top: 12px;

            .tools-item {
              display: flex;
              align-items: center;
              margin-bottom: 16px;

              &:last-child {
                margin-bottom: 0;
              }

              .icon-wrap {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                min-width: 50px;
                height: 50px;

                img {
                  position: absolute;
                  top: 50%;
                  inset-inline-start: 50%;
                  transform: translate(calc(var(--transform-direction) * -50%), -50%);
                  display: block;
                  width: 32px;
                  min-width: 32px;
                  height: 32px;
                  border-radius: var(--radius-rounded);
                  border: 1px solid transparent;
                }
              }

              .meta {
                margin-inline-start: 10px;

                > span {
                  display: block;
                  font-family: var(--font);

                  &:first-child {
                    font-family: var(--font-alt);
                    font-weight: 600;
                    color: var(--dark-text);
                    font-size: 0.9rem;
                  }

                  &:nth-child(2) {
                    font-size: 0.85rem;
                    color: var(--light-text);
                  }

                  span {
                    display: inline-block;
                  }
                }
              }
            }
          }

          .people-wrapper {
            padding-top: 12px;

            .people-item {
              display: flex;
              align-items: center;
              margin-bottom: 16px;

              &:last-child {
                margin-bottom: 0;
              }

              .meta {
                margin-inline-start: 10px;

                > span {
                  display: block;
                  font-family: var(--font);

                  &:first-child {
                    font-family: var(--font-alt);
                    font-weight: 600;
                    color: var(--dark-text);
                    font-size: 0.9rem;
                  }

                  &:nth-child(2) {
                    font-size: 0.85rem;
                    color: var(--light-text);
                  }

                  span {
                    display: inline-block;
                  }
                }
              }
            }
          }

          .more-button {
            padding-top: 16px;

            .button {
              min-width: 180px;
              font-family: var(--font);
              text-transform: uppercase;
              font-size: 0.8rem;
              font-weight: 500;
              margin: 0 auto;
              color: var(--light-text);
            }
          }
        }
      }
    }
  }
}

.is-dark {
  .profile-wrapper {
    .profile-header {
      .v-avatar {
        .badge {
          border-color: var(--dark-sidebar-light-6);
        }
      }
    }

    .profile-body {
      .profile-card {
        @include vuero-card--dark;

        .profile-card-section {
          border-color: var(--dark-sidebar-light-12);

          .section-title {
            h4 {
              color: var(--dark-dark-text);
            }

            i {
              color: var(--primary);
            }
          }

          .section-content {
            .icon-wrap {
              > img {
                border-color: var(--dark-sidebar-light-12) !important;
              }
            }

            .experience-wrapper {
              .experience-item {
                > img {
                  border-color: var(--dark-sidebar-light-12);
                }

                .meta {
                  > span {
                    &:nth-child(3) {
                      color: var(--primary);
                    }
                  }
                }
              }
            }

            .skills-wrapper {
              .skills-item {
                .icon-wrap {
                  border-color: var(--primary) !important;

                  &.has-icon,
                  &.has-img {
                    background: var(--dark-sidebar-light-2) !important;
                    border-color: var(--dark-sidebar-light-12) !important;
                  }
                }

                .people {
                  .v-avatar {
                    &:last-child {
                      .is-fake {
                        background: var(--dark-sidebar-light-2);
                        border: 1px solid var(--dark-sidebar-light-12);
                      }
                    }
                  }
                }
              }
            }

            .recommendations-wrapper {
              .recommendations-item {
                background: var(--dark-sidebar-light-2);
                border-color: var(--dark-sidebar-light-12);

                .meta {
                  span {
                    &:first-child {
                      color: var(--primary);
                    }
                  }
                }
              }
            }

            .more-button {
              .button {
                background: var(--dark-sidebar-light-2);
                border-color: var(--dark-sidebar-light-12);
              }
            }
          }
        }
      }
    }
  }

  .icon-wrap,
  .icon-wrap.is-placeholder {
    background: var(--dark-sidebar-light-2) !important;
    border-color: var(--dark-sidebar-light-12) !important;
  }
}

@media only screen and (width <= 767px) {
  .profile-wrapper {
    .profile-body {
      .profile-card {
        padding: 20px;

        .profile-card-section {
          .section-content {
            .experience-wrapper,
            .languages-wrapper,
            .recommendations-wrapper {
              .experience-item,
              .languages-item,
              .recommendations-item {
                width: calc(100% - 16px);
              }
            }

            .skills-wrapper {
              .skills-item {
                .people {
                  .v-avatar {
                    &:not(:last-child) {
                      display: none !important;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
