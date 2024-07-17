<script setup lang="ts">
import { useUserSession } from '/@src/stores/userSession'
import { useNotyf } from '/@src/composable/useNotyf'
import { handleError } from '/@src/composable/useLaravelError'
import { useApi } from '/@src/composable/useApi'

const userSession = useUserSession()
const api = useApi()
const router = useRouter()
const notify = useNotyf()
const isLoading = ref(false)

const name = userSession.user!.name
const email = userSession.user!.email
const profile = import.meta.env.VITE_API_BASE_URL + '/storage/' + userSession.user!.profile_path
async function logout() {
  if (!isLoading.value) {
    isLoading.value = true

    try {
      await api.post('logout').then(function () {
        userSession.logoutUser()
        router.push('/')
      })
    }
    catch (err: any) {
      notify.error(handleError(err))
    }
    finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <VDropdown
    right
    spaced
    class="user-dropdown profile-dropdown"
  >
    <template #button="{ toggle }">
      <a
        role="button"
        tabindex="0"
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @keydown.space.prevent="toggle"
        @click="toggle"
      >
        <VAvatar :picture="profile ?? '/images/avatars/svg/vuero-1.svg'" />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <VAvatar
          size="large"
          :picture="profile ?? '/images/avatars/svg/vuero-1.svg'"
        />

        <div class="meta">
          <span>{{ name }}</span>
          <span>{{ email }}</span>
        </div>
      </div>

      <RouterLink
        to="/profile"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <i
            aria-hidden="true"
            class="lnil lnil-user-alt"
          />
        </div>
        <div class="meta">
          <span>Perfil</span>
          <span>Detalle de su perfil</span>
        </div>
      </RouterLink>

      <div class="dropdown-item is-button">
        <VButton
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="logout"
        >
          Cerrar Sesión
        </VButton>
      </div>
    </template>
  </VDropdown>
</template>
