<script setup lang="ts">
import { usePanels } from '/@src/stores/panels'
import { useUserSession } from '/@src/stores/userSession'
import { useFetch } from '/@src/composable/useFetch'

type TabId = 'entities' | 'period'

const panels = usePanels()
const activeTab = ref<TabId>('entities')
const $fetch = useFetch()
const periods = ref()
const dependencies = ref()
const userSession = useUserSession()
const router = useRouter()

/* api.get('periods').then((result) => {
  if (result.data !== null && result.data !== undefined && result.data.length !== 0) {
    periods.value = result.data
    if (!userSession.period) {
      userSession.setPeriod(periods.value[0].id)
    }
  }
}) */

onMounted(async () => {
  try {
    await $fetch('getDependenciesToUser').then(function (result) {
      dependencies.value = result
      if (!userSession.setEntity) {
        userSession.setEntity(dependencies.value[0].id)
      }
    })
  }
  catch (error) {
    console.error('Error al cargar las dependencias del usuario', error)
  }
})

const changeEntity = (id: any) => {
  userSession.setEntity(id)
  router.push(router.currentRoute.value.fullPath)
  location.reload()
}

const changePeriod = (id: any) => {
  userSession.setPeriod(id)
  router.push(router.currentRoute.value.fullPath)
  location.reload()
}
</script>

<template>
  <div
    id="activity-panel"
    :class="[panels.active === 'activity' && 'is-active']"
    class="right-panel-wrapper is-activity"
  >
    <div
      class="panel-overlay"
      tabindex="0"
      @keydown.space.prevent="panels.close()"
      @click="panels.close()"
    />

    <div class="right-panel">
      <div class="right-panel-head">
        <h3>Ajustes Globales</h3>
        <a
          class="close-panel"
          tabindex="0"
          @keydown.space.prevent="panels.close()"
          @click="panels.close()"
        >
          <i
            aria-hidden="true"
            class="iconify"
            data-icon="feather:chevron-right"
          />
        </a>
      </div>
      <div class="tabs-wrapper is-triple-slider is-squared">
        <div class="tabs-inner">
          <div class="tabs">
            <ul>
              <li :class="[activeTab === 'entities' && 'is-active']">
                <a
                  tabindex="0"
                  @keydown.space.prevent="activeTab = 'entities'"
                  @click="activeTab = 'entities'"
                ><span>Dependencias</span></a>
              </li>
              <!--              <li :class="[activeTab === 'period' && 'is-active']">-->
              <!--                <a-->
              <!--                  tabindex="0"-->
              <!--                  @keydown.space.prevent="activeTab = 'period'"-->
              <!--                  @click="activeTab = 'period'"-->
              <!--                ><span>Periodo</span></a>-->
              <!--              </li>-->
              <li class="tab-naver" />
            </ul>
          </div>
        </div>

        <div class="right-panel-body">
          <div
            id="projects-side-tab"
            class="tab-content"
            :class="[activeTab === 'entities' && 'is-active']"
          >
            <!--Team Member-->
            <div
              v-for="entity in dependencies"
              :key="entity.id"
              class="team-card"
            >
              <div class="meta">
                <span>{{ entity.name }}</span>
                <span v-if="entity.id == userSession.entity" class="active">Activo</span>
              </div>
              <a class="link" @click="changeEntity(entity.id)">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:arrow-right"
                />
              </a>
            </div>
          </div>

          <div
            id="period-side-tab"
            class="tab-content"
            :class="[activeTab === 'period' && 'is-active']"
          >
            <!--Period-->
            <div
              v-for="period in periods"
              :key="period.id"
              class="project-card"
            >
              <div class="project-inner">
                <div class="meta">
                  <span>
                    {{ period.name }}
                  </span>
                  <span>
                    {{ period.date_start }} /
                    {{ period.date_end }}
                  </span>
                  <span v-if="period.id == userSession.period" class="active">
                    Activo
                  </span>
                </div>
                <a class="link" @click="changePeriod(period.id)">
                  <i
                    aria-hidden="true"
                    class="iconify"
                    data-icon="feather:arrow-right"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/scss/abstracts/all';

.active {
  color: var(--primary) !important;
}

.right-panel-wrapper {
  &.is-activity {
    .right-panel {
      .right-panel-head {
        padding: 0 30px;
      }

      .right-panel-body {
        padding: 0 30px;
        height: calc(100% - 55px);

        .team-card {
          @include vuero-s-card;

          display: flex !important;
          align-items: center;
          padding: 16px !important;
          margin-bottom: 16px;

          .meta {
            margin-left: 12px;

            span {
              display: block;

              &:first-child {
                color: var(--dark-text);
                font-weight: 500;
              }

              &:nth-child(2) {
                color: var(--light-text);
                font-size: 0.9rem;

                svg {
                  height: 12px;
                  width: 12px;
                  stroke-width: 1.4px;
                }
              }
            }
          }

          .link {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            height: 34px;
            width: 34px;
            background: var(--white);
            border: 1px solid var(--fade-grey-dark-3);
            border-radius: var(--radius-rounded);
            transition: all 0.3s; // transition-all test

            &:hover {
              border-color: var(--primary);
              box-shadow: var(--light-box-shadow);

              svg {
                color: var(--primary);
              }
            }

            svg {
              height: 16px;
              width: 16px;
              color: var(--light-text);
            }
          }
        }

        .project-card {
          @include vuero-s-card;

          padding: 16px !important;
          margin-bottom: 16px;

          .project-inner {
            display: flex;
            align-items: center;

            .project-avatar {
              display: block;
              height: 38px;
              width: 38px;
              border-radius: 12px;
            }

            .meta {
              margin-left: 12px;

              span {
                display: block;

                &:first-child {
                  color: var(--dark-text);
                  font-family: var(--font-alt);
                  font-size: 0.9rem;
                  font-weight: 600;
                }

                &:nth-child(2) {
                  font-family: var(--font);
                  font-size: 0.9rem;
                }
              }
            }

            .link {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: auto;
              height: 34px;
              width: 34px;
              background: var(--white);
              border: 1px solid var(--fade-grey-dark-3);
              border-radius: var(--radius-rounded);
              transition: color 0.3s, background-color 0.3s, border-color 0.3s,
                height 0.3s, width 0.3s;

              &:hover,
              &:focus {
                border-color: var(--primary);
                box-shadow: var(--light-box-shadow);

                svg {
                  color: var(--primary);
                }
              }

              svg {
                height: 16px;
                width: 16px;
                color: var(--light-text);
              }
            }
          }

          .project-foot {
            margin-top: 12px;

            .progress {
              margin-bottom: 10px;
              margin-top: 18px;
            }

            .foot-stats {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;

              span {
                font-family: var(--font);
                color: var(--light-text);
              }
            }
          }
        }

        .icon-timeline {
          margin-top: 30px;

          .timeline-item {
            position: relative;
            display: flex;
            padding-bottom: 30px;

            &::after {
              content: '';
              position: absolute;
              top: 36px;
              left: 18px;
              width: 1px;
              height: calc(100% - 36px);
              border-left: 1px solid var(--fade-grey-dark-3);
            }

            .timeline-icon {
              position: relative;
              height: 36px;
              width: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: var(--white);
              border: 1px solid var(--fade-grey-dark-3);
              border-radius: var(--radius-rounded);
              color: var(--light-text);
              box-shadow: var(--light-box-shadow);

              &::after {
                content: '';
                position: absolute;
                top: 17px;
                left: 40px;
                width: 20px;
                height: 1px;
                border-top: 1px solid var(--fade-grey-dark-3);
              }

              img {
                display: block;
                height: 28px;
                width: 28px;
                border-radius: var(--radius-rounded);
              }

              svg {
                height: 16px;
                width: 16px;
                stroke-width: 1.6px;
              }
            }

            .timeline-content {
              margin-left: 34px;
              line-height: 1.2;

              p {
                font-size: 0.95rem;
                font-family: var(--font-alt);
              }

              span {
                font-size: 0.85rem;
                color: var(--light-text);
              }
            }
          }
        }
      }

      .tabs-wrapper {
        height: calc(100% - 60px);

        .tabs-inner {
          .tabs {
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
    }
  }
}

.is-dark {
  .right-panel-wrapper {
    &.is-activity {
      .right-panel-body {
        .team-card,
        .project-card {
          @include vuero-card--dark;

          background: var(--dark-sidebar-light-2) !important;
          border-color: var(--dark-sidebar-light-8) !important;
        }

        .team-card,
        .project-card .project-inner {
          .meta {
            span {
              &:first-child {
                color: var(--dark-dark-text);
              }
            }
          }

          .link {
            background: var(--dark-sidebar-light-6) !important;
            border-color: var(--dark-sidebar-light-12) !important;

            &:hover,
            &:focus {
              border-color: var(--primary) !important;

              svg {
                color: var(--primary) !important;
              }
            }
          }
        }

        .icon-timeline {
          .timeline-item {
            &::after {
              border-color: var(--dark-sidebar-light-12) !important;
            }

            .timeline-icon {
              background: var(--dark-sidebar-light-6) !important;
              border-color: var(--dark-sidebar-light-12) !important;

              &::after {
                border-color: var(--dark-sidebar-light-12) !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
