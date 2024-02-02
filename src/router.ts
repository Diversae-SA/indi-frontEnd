import { createMemoryHistory, createRouter as createClientRouter, createWebHistory } from 'vue-router'
import layoutAuth from '/@src/pages/auth.vue'
import layoutApp from '/@src/pages/app.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: layoutAuth,
    children: [
      {
        component: () => import('/@src/pages/auth/login.vue'),
        path: '',
        name: 'auth-login',
        props: true,
      },
    ],
  },

  {
    path: '/app',
    name: 'app',
    component: layoutApp,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        component: () => import('/@src/pages/app/index.vue'),
        path: '',
        name: 'home',
        props: true,
      },

      //--------- Tool ---------- --------------------------------------
      {
        component: () => import('/@src/pages/tool/departments.vue'),
        path: '/tool/departments',
        name: '/tool/departments',
        props: true,
      },

      //--------- Profile Setting --------------------------------------
      {
        component: () => import('/@src/pages/setting/profile-settings.vue'),
        path: '/setting/profile-settings',
        name: '/setting/profile-settings',
        props: true,
      },

      //---------------------------- Rol and Permission ----------------
      /*{
        component: () => import('/@src/pages/setting/rol.vue'),
        path: '/setting/rol',
        name: 'setting/rol',
        props: true,
      },*/

      //---------------------------- Users -----------------------------
      {
        component: () => import('/@src/pages/setting/users.vue'),
        path: '/setting/profile-settings/users',
        name: '/setting/profile-settings/users',
        props: true,
      },
    ],
  },

  {
    component: () => import('/@src/pages/[...all].vue'),
    name: 'all',
    path: '/:all(.*)',
    props: true,
  },
];

export function createRouter() {
  return createClientRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior: (to, from, savedPosition) => {
      // Scroll to heading on click
      if (to.hash) {
        if (to.hash === '#') {
          return {
            top: 0,
            behavior: 'smooth',
          }
        }

        const el = document.querySelector(to.hash)

        // vue-router does not incorporate scroll-margin-top on its own.
        if (el) {
          const top = parseFloat(getComputedStyle(el).scrollMarginTop)
          if (el instanceof HTMLElement) {
            el.focus()
          }

          return {
            el: to.hash,
            behavior: 'smooth',
            top,
          }
        }

        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }

      // Scroll to top of window
      if (savedPosition) {
        return savedPosition
      } else if (to.path !== from.path) {
        return { top: 0 }
      }
    },
  })
}
