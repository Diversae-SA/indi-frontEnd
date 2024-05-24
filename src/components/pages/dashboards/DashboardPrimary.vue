<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserSession } from '/@src/stores/userSession'
import ApexChart from 'vue3-apexcharts'
import { useSalesSparksCharts } from '/@src/data/widgets/charts/salesSparksChart'

const userSession = useUserSession()
const { t } = useI18n()
const router = useRouter()
const { spark1, spark2, spark3, spark4 } = useSalesSparksCharts()

const name = userSession.user!.name
const profile = import.meta.env.VITE_API_BASE_URL + '/storage/' + userSession.user!.profile_path

const handleKeydown = (event: KeyboardEvent) => {
  if (event.altKey && event.key === 'n') {
    handleNew()
  }
  if (event.altKey && event.key === 'g') {
    alert('documento Entrante')
  }
  if (event.altKey && event.key === 'l') {
    alert('documento Saliente')
  }
}

const handleNew = () => {
  router.push('/expediente/expediente_list/create')
}

const hoy = new Date()
const calendarAttributes = ref([
  {
    key: 'hoy',
    highlight: {
      backgroundColor: '#ffecb3',
    },
    dates: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()),
  },
])

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
})
</script>

<template>
  <div class="personal-dashboard personal-dashboard-v1">
    <!--Personal Dashboard V1-->
    <!--Header-->
    <div class="dashboard-header">
      <VAvatar :picture="profile ?? '/images/avatars/svg/vuero-1.svg'" size="large" />
      <div class="start">
        <h3>{{ t('auth.logged-in') }}, {{ name }}</h3>
        <p>INDI - Instituto Paraguayo Del Indigena </p>
      </div>
    </div>

    <!--Body-->
    <div class="dashboard-body">
      <div class="columns is-multiline">
        <!--Card-->
        <div class="column is-12">
          <div class="dashboard-card">
            <div class="quick-stats">
              <div class="quick-stats-inner">
                <!--Stat-->
                <div class="quick-stat new-document">
                  <VBlock
                    title="NUEVO"
                    subtitle="Atajos - Alt+N"
                    center
                    m-responsive
                    t-responsive
                    @click="handleNew"
                  >
                    <template #icon>
                      <i class="lnir lnir-write" aria-hidden="true"></i>
                    </template>
                  </VBlock>
                </div>

                <!--Stat-->
                <div class="quick-stat in-document">
                  <VBlock
                    title="ENTRADA"
                    subtitle="Atajos - Alt+G"
                    center
                    m-responsive
                    t-responsive
                  >
                    <template #icon>
                      <i class="lnir lnir-down-arrow-box" aria-hidden="true"></i>
                    </template>
                  </VBlock>
                </div>

                <!--Stat-->
                <div class="quick-stat out-document">
                  <VBlock
                    title="SALIDA"
                    subtitle="Atajos - Alt+L"
                    center
                    m-responsive
                    t-responsive
                  >
                    <template #icon>
                      <i class="lnir lnir-top-arrow-box" aria-hidden="true"></i>
                    </template>
                  </VBlock>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--Card-->
<!--        <div class="column is-4">-->
<!--          <div class="dashboard-card">-->

<!--          </div>-->
<!--        </div>-->

        <!--Card-->
        <div class="column is-12">
          <div class="dashboard-card">
            <div class="cta-content">
              <div class="columns is-multiline">
                <div class="column is-3">
                  <div class="spark-tile">
                    <ApexChart
                      id="spark1"
                      :height="spark1.chart.height"
                      :type="spark1.chart.type"
                      :series="spark1.series"
                      :options="spark1"
                    />
                  </div>
                </div>
                <div class="column is-3">
                  <div class="spark-tile">
                    <ApexChart
                      id="spark2"
                      :height="spark2.chart.height"
                      :type="spark2.chart.type"
                      :series="spark2.series"
                      :options="spark2"
                    />
                  </div>
                </div>
                <div class="column is-3">
                  <div class="spark-tile">
                    <ApexChart
                      id="spark3"
                      :height="spark3.chart.height"
                      :type="spark3.chart.type"
                      :series="spark3.series"
                      :options="spark3"
                    />
                  </div>
                </div>
                <div class="column is-3">
                  <div class="spark-tile">
                    <ApexChart
                      id="spark4"
                      :height="spark4.chart.height"
                      :type="spark4.chart.type"
                      :series="spark4.series"
                      :options="spark4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Card-->
        <div class="column is-4">
          <VCalendar
            expanded
            :attributes="calendarAttributes"
          />
        </div>
        <!--Card-->
        <div class="column is-4">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/scss/abstracts/all';

.is-navbar {
  .personal-dashboard {
    margin-top: 30px;
  }
}

.personal-dashboard-v1 {
  .dashboard-header {
    display: flex;
    align-items: center;
    font-family: var(--font);
    margin-bottom: 30px;

    .start {
      margin-inline-start: 12px;

      h3 {
        font-family: var(--font-alt);
        font-weight: 600;
        font-size: 1.3rem;
        color: var(--dark-text);
      }
    }

    .end {
      margin-inline-start: auto;
      display: flex;
      justify-content: flex-end;

      .button {
        margin-inline-start: 10px;
      }
    }
  }

  .dashboard-body {
    .dashboard-card {
      @include vuero-s-card;

      font-family: var(--font);

      > h4,
      .ApexCharts-title-text {
        font-family: var(--font-alt);
        font-size: 1rem;
        font-weight: 600;
        color: var(--dark-text);
        margin-bottom: 12px;
      }

      .quick-stats {
        .quick-stats-inner {
          display: flex;
          margin-inline-start: -8px;
          margin-inline-end: -8px;

          .quick-stat {
            width: calc(50% - 16px);
            padding: 40px 20px;
            margin: 8px;
            border-radius: var(--radius-large);
            cursor: pointer;
            transition: all 0.3s; // transition-all test

            .flex-meta {
              span {
                color: var(--dark--color-invert);
                &:first-child {
                  font-size: 1.4rem;
                  font-weight: 600;
                }
              }
            }
            .media-flex-center i{
              color: var(--dark--color-invert);
              font-size: 3em;
            }

          }
          .new-document {
            background-color: var(--facebook);
          }

          .in-document {
            background-color: var(--success--dark-color);
          }

          .out-document {
            background-color: var(--danger--dark-color);
          }
        }
      }
    }

    .dashboard-card {
      &.is-upgrade {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary-light-8);
        border-color: var(--primary-light-8);
        padding: 20px 40px;
        min-height: 320px;
        border-radius: var(--radius-large);
        box-shadow: var(--primary-box-shadow);

        .lnil,
        .lnir {
          position: absolute;
          bottom: 1rem;
          inset-inline-end: 1rem;
          font-size: 4rem;
          opacity: 0.3;
        }

        .cta-content {
          text-align: center;

          h4 {
            font-family: var(--font-alt);
            font-weight: 600;
            font-size: 1.2rem;
            color: var(--smoke-white);
            margin-bottom: 8px;
          }
        }

        .link {
          display: block;
          font-family: var(--font-alt);
          font-weight: 500;
          margin-top: 0.5rem;

          &:hover,
          &:focus {
            color: var(--smoke-white);
            opacity: 0.6;
          }
        }
      }

      &.is-gauge {
        position: relative;

        .people {
          position: absolute;
          top: 80px;
          inset-inline-start: 0;
          inset-inline-end: 0;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          z-index: 5;

          .v-avatar {
            margin: 0 4px;
          }
        }
      }
    }
  }
}

.is-dark {
  .personal-dashboard-v1 {
    .dashboard-header {
      .start {
        h3 {
          color: var(--dark-dark-text);
        }
      }
    }

    .dashboard-body {
      .dashboard-card {
        @include vuero-card--dark;

        &.is-upgrade {
          background: var(--primary);
          border-color: var(--primary);
          box-shadow: var(--primary-box-shadow);
        }

        .quick-stats {
          .quick-stats-inner {
            .quick-stat {
              border: 1px solid var(--dark-sidebar-light-12);

              .media-flex-center {
                i {
                  color: var(--dark-dark-text);
                }
                .flex-meta {
                  span {
                    color: var(--dark-dark-text);
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

@media only screen and (width <= 767px) {
  .personal-dashboard-v1 {
    .dashboard-header {
      text-align: center;
      flex-direction: column;

      .start {
        margin: 10px auto;
      }

      .end {
        margin: 0;
        justify-content: space-between;
      }
    }

    .dashboard-body {
      .dashboard-card {
        .quick-stats {
          .quick-stats-inner {
            .quick-stat {
              padding: 20px;

              .media-flex-center {
                flex-direction: column;

                .flex-meta {
                  margin: 10px 0;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: landscape) {
  .personal-dashboard-v1 {
    .dashboard-body {
      .dashboard-card {
        .quick-stats {
          .quick-stats-inner {
            .quick-stat {
              padding: 20px;

              .media-flex-center {
                flex-direction: column;

                .flex-meta {
                  margin: 2px 0 0;
                  text-align: center;
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
