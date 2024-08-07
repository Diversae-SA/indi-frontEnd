<script setup lang="ts">
import type { SidebarTheme } from '/@src/components/navigation/desktop/Sidebar.vue'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { usePanels } from '/@src/stores/panels'
// import { hasPermission } from '/@src/utils/permissions'
const props = withDefaults(
  defineProps<{
    theme?: SidebarTheme
    defaultSidebar?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSidebar: 'dashboard',
    theme: 'default',
  },
)

const viewWrapper = useViewWrapper()
const route = useRoute()
const nameSubside = route.path
const firstSegment = ref(nameSubside.split('/')[1])
// console.log(firstSegment)
const panels = usePanels()
const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = firstSegment.value == 'profile' ? ref(false) : ref(true) // props.openOnMounted
const activeMobileSubsidebar = ref(firstSegment) // props.defaultSidebar
switchSidebar(firstSegment.value)

function switchSidebar(id: string) {
  if (id === activeMobileSubsidebar.value) {
    // isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
    activeMobileSubsidebar.value = id
  }
  else {
    isDesktopSidebarOpen.value = id != 'profile'
    activeMobileSubsidebar.value = id
  }
}

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  viewWrapper.setPushed(isDesktopSidebarOpen.value ?? false)
})
watch(
  () => route.fullPath,
  () => {
    const nameSubside = route.path
    const firstSegment = nameSubside.split('/')[1]
    isMobileSidebarOpen.value = false
    switchSidebar(firstSegment)
    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  },
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay" />

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink
          to="/app"
          class="navbar-item is-brand"
        >
          <AnimatedLogo
            width="240px"
            height="50px"
          />
        </RouterLink>

        <div class="brand-end">
          <!-- <NotificationsMobileDropdown />-->
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li>
          <RouterLink to="app">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:home"
            />
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a href="#">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:settings"
            />
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <Transition name="slide-x">
      <DashboardsMobileSubsidebar
        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'app'"
      />
    </Transition>

    <Sidebar
      :theme="props.theme"
      :is-open="isDesktopSidebarOpen"
    >
      <template #links>
        <!-- Dashboards -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'app' && 'is-active']"
            data-content="Dashboards"
            tabindex="0"
            role="button"
            @keydown.space.prevent="switchSidebar('app')"
            @click="switchSidebar('app')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:home"
            />
            <p>PANEL</p>
          </a>
        </li>
        <!-- Expedientes -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'expediente' && 'is-active']"
            data-content="Expedientes"
            tabindex="0"
            role="button"
            @keydown.space.prevent="switchSidebar('expediente')"
            @click="switchSidebar('expediente')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:trello"
            />
            <p>EXPEDIENTES</p>
          </a>
        </li>
        <!-- REGISTRO DE COMUNIDADES INDÍGENAS -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'communities' && 'is-active']"
            data-content="Comunidades Indigenas"
            tabindex="0"
            role="button"
            @keydown.space.prevent="switchSidebar('communities')"
            @click="switchSidebar('communities')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:users"
            />
            <p>COMUNIDADES INDÍGENAS</p>
          </a>
        </li>
        <!-- Datos Generales -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'tool' && 'is-active']"
            data-content="Ajustes"
            tabindex="0"
            role="button"
            @keydown.space.prevent="switchSidebar('tool')"
            @click="switchSidebar('tool')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:tool"
            />
            <p>AJUSTES</p>
          </a>
        </li>
      </template>
      <template #bottom-links>
        <!-- Settings -->
        <li class="is-hidden-touch">
          <a
            :class="[activeMobileSubsidebar === 'setting' && 'is-active']"
            data-content="Setting"
            tabindex="0"
            role="button"
            @keydown.space.prevent="switchSidebar('setting')"
            @click="switchSidebar('setting')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:settings"
            />
          </a>
        </li>
        <UserProfileDropdown up />
      </template>
    </Sidebar>

    <Transition name="slide-x">
      <DashboardsSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'app'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>
    <Transition name="slide-x">
      <ToolSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'tool'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>
    <Transition name="slide-x">
      <ExpedienteSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'expediente'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>
    <Transition name="slide-x">
      <CommunitySubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'communities'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>
    <Transition name="slide-x">
      <SettingSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'setting'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>
    <ActivityPanel />
    <VViewWrapper>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot />
        </template>
        <VPageContent
          v-else
          class="is-relative"
        >
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div v-if="firstSegment == 'profile'" />
            <div
              v-else
              class="vuero-hamburger nav-trigger push-resize"
              tabindex="0"
              role="button"
              @keydown.space.prevent="isDesktopSidebarOpen = !isDesktopSidebarOpen"
              @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
            >
              <span class="menu-toggle has-chevron">
                <span
                  :class="[isDesktopSidebarOpen && 'active']"
                  class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i
                      aria-hidden="true"
                      class="icon-line-top"
                    />
                    <i
                      aria-hidden="true"
                      class="icon-line-center"
                    />
                    <i
                      aria-hidden="true"
                      class="icon-line-bottom"
                    />
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">
                {{ viewWrapper.pageTitle }}
              </h1>
            </div>

            <Toolbar class="desktop-toolbar">
              <!--<ToolbarNotification />-->
              <a
                class="toolbar-link right-panel-trigger"
                aria-label="View activity panel"
                tabindex="0"
                role="button"
                @keydown.space.prevent="panels.setActive('activity')"
                @click="panels.setActive('activity')"
              >
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:grid"
                />
              </a>
            </Toolbar>
          </div>

          <slot />
        </VPageContent>
      </VPageContentWrapper>
    </VViewWrapper>
  </div>
</template>
<style lang="scss">
.main-sidebar {
  background-color: var(--placeholder-light-10);
}

.main-sidebar .sidebar-inner .icon-menu li a {
  position: absolute;
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--light-text);
  text-transform: uppercase;
  text-align: center;
  width: 80px;
  transition: opacity 0.3s;
}
</style>
