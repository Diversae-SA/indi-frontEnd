<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useForm, ErrorMessage } from 'vee-validate'
import { boolean, string, z as zod } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'
import { useLaravelError } from '/@src/composable/useLaravelError'
import { useUserSession } from '/@src/stores/userSession'
import { authenticateUser } from '/@src/services/modules/user/accounts'
import { catchFieldError } from '/@src/utils/api/catchFieldError'

const darkMode = useDarkmode()
const router = useRouter()
const route = useRoute()
const notify = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string
const isLoading = ref(false)
const { t } = useI18n()

const validationSchema = toTypedSchema(
  zod.object({
    email: string({
      required_error: t('auth.errors.email.required'),
    })
      .email(t('auth.errors.email.format')),
    password: string({
      required_error: t('auth.errors.password.required'),
    }),
    remember: boolean().optional()
  })
)

const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    remember: false,
  },
});

async function onLogin(values: any) {
  if (!isLoading.value) {
    isLoading.value = true

    try {
      await authenticateUser('/login', values)

      if (redirect) {
        await router.push(redirect)
      } else {
        await router.push('/app')
      }
      notify.dismissAll()
      notify.success(`${t('auth.logged-in')}, ${userSession.user!.name}`)
    } catch (err: any) {
      catchFieldError(err, setFieldError)
      notify.error(useLaravelError(err))
    } finally {
      isLoading.value = false
    }
  }
}
const submitHandler = handleSubmit(onLogin)

onMounted(async () => {
  if(userSession.isLoggedIn){
    await router.push('/app')
  }
})

useHead({
  title: 'BENITECH | SEGDOC',
})
</script>

<template>
  <div class="auth-wrapper-inner is-single">
    <!--Fake navigation-->
    <div class="auth-nav">
      <div class="left" />
      <div class="center">
        <RouterLink
          to="/"
          class="header-item"
        >
          <AnimatedLogo
            width="420"
            height="70"
          />
        </RouterLink>
      </div>
      <div class="right">
        <label
          class="dark-mode ml-auto"
          tabindex="0"
          role="button"
          @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
        >
          <input
            data-cy="dark-mode-toggle"
            type="checkbox"
            :checked="!darkMode.isDark"
            @change="darkMode.onChange"
          >
          <span />
        </label>
      </div>
    </div>

    <!--Single Centered Form-->
    <div class="single-form-wrap">
      <div class="inner-wrap">
        <!--Form Title-->
        <div class="auth-head">
          <h2>Sistema de Gestión de Expedientes</h2>
          <p>Por favor inicia sesión en tu cuenta</p>
        </div>

        <!--Form-->
        <div class="form-card">
          <form @submit.prevent="submitHandler">
            <div class="login-form">
              <!-- Username -->

              <VField id="email">
                <VControl icon="feather:user">
                  <VInput
                    type="email"
                    class="input"
                    :placeholder="t('auth.placeholder.email')"
                    autocomplete="email"
                    :disabled="isSubmitting"
                  />
                  <ErrorMessage
                    class="help is-danger"
                    name="email"
                  />
                </VControl>
              </VField>

              <!-- Password -->
              <VField id="password">
                <VControl icon="feather:lock">
                  <VInput
                    type="password"
                    class="input"
                    :placeholder="t('auth.placeholder.password')"
                    autocomplete="email"
                    :disabled="isSubmitting"
                  />
                  <ErrorMessage
                    class="help is-danger"
                    name="password"
                  />
                </VControl>
              </VField>

              <!-- Submit -->
              <div class="login">
                <VButton
                  :loading="isLoading"
                  type="submit"
                  color="primary"
                  bold
                  fullwidth
                  raised
                >
                  Iniciar Sesion
                </VButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
