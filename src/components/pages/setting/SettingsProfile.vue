<script setup lang="ts">
import { useUserSession } from '/@src/stores/userSession'

const useSession = useUserSession()

const username = useSession.user!.name

</script>

<template>
  <div class="profile-wrapper">
    <div class="profile-header has-text-centered">
      <VAvatar
        size="xl"
        picture="/images/avatars/svg/vuero-1.svg"
        badge="/images/icons/flags/united-states-of-america.svg"
      />

      <h3 class="title is-4 is-narrow">
        {{ username }}
      </h3>
      <p class="light-text">
        Hey everyone, Iam a product manager from New York and Iam looking for new
        opportunities in the software business.
      </p>
      <div class="profile-stats">
        <div class="profile-stat">
          <i
            aria-hidden="true"
            class="lnil lnil-users-alt"
          />
          <span>500+ Relations</span>
        </div>
        <div class="separator" />
        <div class="profile-stat">
          <i
            aria-hidden="true"
            class="lnil lnil-checkmark-circle"
          />
          <span>78 Projects</span>
        </div>
        <div class="separator" />
        <div class="socials">
          <a><i
            aria-hidden="true"
            class="fab fa-facebook-f"
          /></a>
          <a><i
            aria-hidden="true"
            class="fab fa-twitter"
          /></a>
          <a><i
            aria-hidden="true"
            class="fab fa-linkedin-in"
          /></a>
        </div>
      </div>
    </div>

    <div class="profile-body">
      <div class="settings-section">
        <RouterLink
          to="/"
          class="settings-box"
        >
          <div class="edit-icon">
            <i
              aria-hidden="true"
              class="lnil lnil-pencil"
            />
          </div>

          <VIconWrap
            dark="6"
            icon="lnil lnil-apartment"
          />

          <span>Company</span>
          <h3>Manage Company</h3>
        </RouterLink>
        <RouterLink
          to="/setting/profile-settings/users"
          permission="program users"
          class="settings-box"
        >
          <div class="edit-icon">
            <i
              aria-hidden="true"
              class="lnil lnil-pencil"
            />
          </div>
          <VIconWrap
            dark="6"
            icon="lnil lnil-users"
          />
          <span>Usuarios</span>
          <h3>Lista de Usuarios</h3>
        </RouterLink>
        <RouterLink
          to="/setting/profile-settings/users"
          permission="program users"
          class="settings-box"
        >
          <div class="edit-icon">
            <i
              aria-hidden="true"
              class="lnil lnil-pencil"
            />
          </div>

          <VIconWrap
            dark="6"
            icon="lnil lnil-briefcase-alt"
          />

          <span>Projects</span>
          <h3>Project Settings</h3>
        </RouterLink>
        <RouterLink
          to="/setting/profile-settings/users"
          permission="program users"
          class="settings-box"
        >
          <div class="edit-icon">
            <i
              aria-hidden="true"
              class="lnil lnil-pencil"
            />
          </div>
          <VIconWrap
            dark="6"
            icon="lnil lnil-lock-alt-1"
          />
          <span>Roles</span>
          <h3>Gestión de Permisos</h3>
        </RouterLink>
        <a class="settings-box">
          <div class="edit-icon">
            <i
              aria-hidden="true"
              class="lnil lnil-pencil"
            />
          </div>

          <VIconWrap
            dark="6"
            icon="lnil lnil-cogs"
          />

          <span>Preferencias</span>
          <h3>Ajustes Generales</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';
@import '/@src/scss/components/profile-stats';

.profile-wrapper {
  .profile-body {
    .settings-section {
      display: flex;
      flex-wrap: wrap;
      max-width: 880px;
      margin: 0 auto;

      .settings-box {
        position: relative;
        width: calc(20% - 16px);
        background: var(--white);
        text-align: center;
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        border: 1px solid var(--fade-grey-dark-3);
        transition: all 0.3s; // transition-all test
        cursor: pointer;

        &:hover,
        &:focus {
          border-color: var(--primary);
          box-shadow: var(--light-box-shadow);

          .edit-icon {
            opacity: 1;
            pointer-events: all;
          }

          .icon-wrap {
            i {
              color: var(--primary);
            }
          }

          h3 {
            color: var(--primary);
          }
        }

        &.is-active {
          .icon-wrap {
            i {
              color: var(--primary);
            }
          }

          h3 {
            color: var(--primary);
          }
        }

        .edit-icon {
          position: absolute;
          top: 6px;
          inset-inline-start: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 18px;
          width: 18px;
          border-radius: var(--radius-rounded);
          background: var(--fade-grey-light-3);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s; // transition-all test

          i {
            font-size: 0.8rem;
          }
        }

        .icon-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          background: none !important;
          border: none;
          box-shadow: none;
          height: 52px;
          width: 100%;

          i {
            font-size: 2.7rem;
            color: var(--light-text-light-12);
            margin-bottom: 4px;
            transition: color 0.3s;
          }

          img {
            display: block;
            max-width: 90px;
          }
        }

        span {
          text-align: center;
          display: block;
          text-transform: uppercase;
          color: var(--light-text);
          font-family: var(--font-alt);
          font-size: 0.7rem;
          letter-spacing: 1px;
        }

        h3 {
          font-family: var(--font);
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--light-text);
          transition: color 0.3s;
        }
      }
    }
  }
}

.is-dark {
  .profile-wrapper {
    .profile-body {
      .settings-section {
        .settings-box {
          background: var(--dark-sidebar-light-6);
          border-color: var(--dark-sidebar-light-12);

          &:hover,
          &:focus {
            border-color: var(--primary);

            h3 {
              color: var(--primary);
            }

            .icon-wrap i {
              color: var(--primary);
            }
          }

          &.is-active {
            h3 {
              color: var(--primary);
            }

            .icon-wrap i {
              color: var(--primary);
            }
          }

          .edit-icon {
            background: var(--dark-sidebar-light-2);

            i {
              color: var(--primary);
            }
          }

          .icon-wrap {
            background: none !important;

            i {
              color: var(--light-text-dark-20);

              &.is-solid {
                color: var(--primary);
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (width <= 767px) {
  .profile-wrapper {
    .profile-body {
      .settings-section {
        .settings-box {
          width: calc(50% - 16px);
        }
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .profile-wrapper {
    .profile-body {
      .settings-section {
        .settings-box {
          width: calc(25% - 16px);
        }
      }
    }
  }
}
</style>
