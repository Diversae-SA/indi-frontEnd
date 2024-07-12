import { createMemoryHistory, createRouter as createClientRouter, createWebHistory } from 'vue-router'
import layoutAuth from '/@src/pages/auth.vue'
import layoutApp from '/@src/pages/app.vue'
import { hasPermission } from '/@src/utils/permissions'

// @ts-ignore
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

      // ---- TOOL -------------------------------------------------------

      // ---------------------------- Department -------------------------
      {
        component: () => import('/@src/pages/tool/departments.vue'),
        path: '/tool/departments',
        name: '/tool/departments',
        props: true,
        meta: { permission: 'program departments' },
      },

      // ---------------------------- Distritos ----------------------
      {
        component: () => import('/@src/pages/tool/districts/district.vue'),
        path: '/tool/districts',
        name: 'tool/districts',
        props: true,
        meta: { permission: 'program districts' },
      },
      {
        component: () => import('/@src/pages/tool/districts/district-cu.vue'),
        path: '/tool/districts/create',
        name: 'tool/districts/create',
        props: true,
        meta: { permission: 'districts create' },
      },
      {
        component: () => import('/@src/pages/tool/districts/district-cu.vue'),
        path: '/tool/districts/update/:id',
        name: '/tool/districts/update',
        props: true,
        meta: { permission: 'districts edit' },
      },

      // ---------------------------- Functionaries ----------------------
      {
        component: () => import('/@src/pages/tool/functionaries/functionary.vue'),
        path: '/tool/functionary',
        name: 'tool/functionary',
        props: true,
        meta: { permission: 'program functionaries' },
      },
      {
        component: () => import('/@src/pages/tool/functionaries/functionary-create.vue'),
        path: '/tool/functionary/create',
        name: 'tool/functionary/create',
        props: true,
        meta: { permission: 'functionaries create' },
      },
      {
        component: () => import('/@src/pages/tool/functionaries/functionary-update.vue'),
        path: '/tool/functionary/update/:id',
        name: '/tool/functionary/update',
        props: true,
        meta: { permission: 'functionaries edit' },
      },

      // ---------------------------- Dependencia -----------------
      {
        component: () => import('/@src/pages/tool/functionaryDependency/dependency.vue'),
        path: '/tool/dependencies',
        name: 'tool/dependencies',
        props: true,
        meta: { permission: 'program dependencies' },
      },
      {
        component: () => import('/@src/pages/tool/functionaryDependency/dependency-create.vue'),
        path: '/tool/dependencies/create',
        name: 'tool/dependencies/create',
        props: true,
        meta: { permission: 'dependencies create' },
      },
      {
        component: () => import('/@src/pages/tool/functionaryDependency/dependency-update.vue'),
        path: '/tool/dependencies/update/:id',
        name: 'tool/dependencies/update',
        props: true,
        meta: { permission: 'dependencies edit' },
      },

      // ---------------------------- Entidades Externos -----------------
      {
        component: () => import('/@src/pages/tool/externalEntity/entity.vue'),
        path: '/tool/externalEntity',
        name: 'tool/externalEntity',
        props: true,
        meta: { permission: 'program externalEntities' },
      },
      {
        component: () => import('/@src/pages/tool/externalEntity/entity-cu.vue'),
        path: '/tool/externalEntity/create',
        name: 'tool/externalEntity/create',
        props: true,
        meta: { permission: 'externalEntities create' },
      },
      {
        component: () => import('/@src/pages/tool/externalEntity/entity-cu.vue'),
        path: '/tool/externalEntity/update/:id',
        name: 'tool/externalEntity/update',
        props: true,
        meta: { permission: 'externalEntities edit' },
      },

      // ---------------------------- Proveedores ------------------------
      {
        component: () => import('/@src/pages/tool/suppliers/supplier.vue'),
        path: '/tool/suppliers',
        name: 'tool/suppliers',
        props: true,
        meta: { permission: 'program suppliers' },
      },
      {
        component: () => import('/@src/pages/tool/suppliers/supplier-cu.vue'),
        path: '/tool/suppliers/create',
        name: 'tool/suppliers/create',
        props: true,
        meta: { permission: 'suppliers create' },
      },
      {
        component: () => import('/@src/pages/tool/suppliers/supplier-cu.vue'),
        path: '/tool/suppliers/update/:id',
        name: 'tool/suppliers/update',
        props: true,
        meta: { permission: 'suppliers edit' },
      },

      // ---------------------------- Tipo de Datos ------------------------
      {
        component: () => import('/@src/pages/tool/typeData/typeData.vue'),
        path: '/tool/type_data',
        name: 'tool/type_data',
        props: true,
        meta: { permission: 'program type_data' },
      },

      // ---------------------------- Tipos de Expedientes -----------------
      {
        component: () => import('/@src/pages/tool/typeFiles/typeFile.vue'),
        path: '/tool/type_files',
        name: 'tool/type_files',
        props: true,
        meta: { permission: 'program type_files' },
      },
      {
        component: () => import('/@src/pages/tool/typeFiles/typeFile-cu.vue'),
        path: '/tool/type_files/create',
        name: 'tool/type_files/create',
        props: true,
        meta: { permission: 'type_files create' },
      },
      {
        component: () => import('/@src/pages/tool/typeFiles/typeFile-cu.vue'),
        path: '/tool/type_files/update/:id',
        name: 'tool/type_files/update',
        props: true,
        meta: { permission: 'type_files edit' },
      },

      // ----- EXPEDIENTES --------------------------------------------------
      // ---------------------------- Lista de Expedientes -------------------------------
      {
        component: () => import('/@src/pages/expendiente/listExpediente/expedientes.vue'),
        path: '/expediente/expediente_list',
        name: 'expediente/expediente_list',
        props: true,
        meta: { permission: 'program expedientes' },
      },
      {
        component: () => import('/@src/pages/expendiente/listExpediente/expedientes-cu.vue'),
        path: '/expediente/expediente_list/create',
        name: 'expediente/expediente_list/create',
        props: true,
        meta: { permission: 'expedientes create' },
      },
      // ---------------------------- Detalle de Expedientes -----------------------------
      {
        component: () => import('/@src/pages/expendiente/detailExpediente/expediente-details.vue'),
        path: '/expediente/expediente_details',
        name: 'expediente/expediente_details',
        props: true,
        meta: { permission: 'program expedienteDetails' },
      },
      {
        component: () => import('/@src/pages/expendiente/detailExpediente/expediente-mov.vue'),
        path: '/expediente/expediente_mov/:id',
        name: 'expediente/expediente_mov',
        props: true,
        meta: { permission: 'program expedienteDetails' },
      },
      // ---------------------------- Movimiento para Expediente -------------------------
      {
        component: () => import('/@src/pages/expendiente/detailExpediente/expediente-details.vue'),
        path: '/expediente/expediente_details/view/:id',
        name: 'expediente/expediente_details/view',
        props: true,
        meta: { permission: 'program expedienteDetails' },
      },
      // --******************************** COMUNIDADES **********************************

      // ---------------------------- Datos Adicionales ----------------------------------
      {
        component: () => import('/@src/pages/communities/additional_data/additional.vue'),
        path: '/communities/additional_data',
        name: 'communities/additional_data',
        props: true,
        meta: { permission: 'program additional_data' },
      },
      // ---------------------------- Tipo de Beneficios ---------------------------------
      {
        component: () => import('/@src/pages/communities/type_benefits/benefits.vue'),
        path: '/communities/type_benefits',
        name: 'communities/type_benefits',
        props: true,
        meta: { permission: 'program type_benefits' },
      },
      // ---------------------------- Miembros de la Comunidad ---------------------------
      {
        component: () => import('/@src/pages/communities/members/community_members.vue'),
        path: '/communities/community_members',
        name: 'communities/community_members',
        props: true,
        meta: { permission: 'program community_members' },
      },
      {
        component: () => import('/@src/pages/communities/members/community-members-cu.vue'),
        path: '/communities/community_members/create',
        name: 'communities/community_members/create',
        props: true,
        meta: { permission: 'community_members create' },
      },
      {
        component: () => import('/@src/pages/communities/members/community-members-cu.vue'),
        path: '/communities/community_members/update/:id',
        name: 'communities/community_members/update',
        props: true,
        meta: { permission: 'community_members edit' },
      },
      // ---------------------------- Organizacion ---------------------------------------
      {
        component: () => import('/@src/pages/communities/organizations/organizations.vue'),
        path: '/communities/organizations',
        name: 'communities/organizations',
        props: true,
        meta: { permission: 'program organizations' },
      },
      {
        component: () => import('/@src/pages/communities/organizations/organizations-cu.vue'),
        path: '/communities/organizations/create',
        name: 'communities/organizations/create',
        props: true,
        meta: { permission: 'organizations create' },
      },
      {
        component: () => import('/@src/pages/communities/organizations/organizations-cu.vue'),
        path: '/communities/organizations/update/:id',
        name: 'communities/organizations/update',
        props: true,
        meta: { permission: 'organizations edit' },
      },
      // ---------------------------- Comunidades Indigenas ------------------------------
      {
        component: () => import('/@src/pages/communities/communities/communities.vue'),
        path: '/communities',
        name: 'communities',
        props: true,
        meta: { permission: 'program communities' },
      },
      {
        component: () => import('/@src/pages/communities/communities/communities-cu.vue'),
        path: '/communities/create',
        name: 'communities/create',
        props: true,
        meta: { permission: 'communities create' },
      },
      {
        component: () => import('/@src/pages/communities/communities/communities-cu.vue'),
        path: '/communities/update/:id',
        name: 'communities/update',
        props: true,
        meta: { permission: 'communities edit' },
      },
      // ---------------------------- Entregas de Beneficios -----------------------------
      {
        component: () => import('/@src/pages/communities/deliveries/deliveries.vue'),
        path: '/communities/deliveries',
        name: 'communities/deliveries',
        props: true,
        meta: { permission: 'program deliveries' },
      },
      {
        component: () => import('/@src/pages/communities/deliveries/deliveries-cu.vue'),
        path: '/communities/deliveries/create',
        name: 'communities/deliveries/create',
        props: true,
        meta: { permission: 'deliveries create' },
      },
      {
        component: () => import('/@src/pages/communities/communities/communities-cu.vue'),
        path: '/communities/deliveries/update/:id',
        name: 'communities/deliveries/update',
        props: true,
        meta: { permission: 'deliveries edit' },
      },

      // *********************************** SETTINGS ************************************

      // ---------------------------- Organization Chart -----------------
      {
        component: () => import('/@src/pages/setting/organizationChart/organizationChart.vue'),
        path: '/setting/organization-chart',
        name: 'setting/organization-chart',
        props: true,
        meta: { permission: 'program organizationsChart' },
      },
      {
        component: () => import('/@src/pages/setting/organizationChart/organizationChart-create.vue'),
        path: '/setting/organization-chart/create',
        name: 'setting/organization-chart/create',
        props: true,
        meta: { permission: 'organizationsChart create' },
      },
      {
        component: () => import('/@src/pages/setting/organizationChart/organizationChart-update.vue'),
        path: '/setting/organization-chart/update/:id',
        name: '/setting/organization-chart/update',
        props: true,
        meta: { permission: 'organizationsChart edit' },
      },

      // ---------------------------- Rol and Permission -----------------
      {
        component: () => import('/@src/pages/setting/role/rol.vue'),
        path: '/setting/rol',
        name: 'setting/rol',
        props: true,
        meta: { permission: 'program roles' },
      },
      {
        component: () => import('/@src/pages/setting/role/rol-create.vue'),
        path: '/setting/rol/create',
        name: 'setting/rol/create',
        props: true,
        meta: { permission: 'roles create' },
      },
      {
        component: () => import('/@src/pages/setting/role/rol-update.vue'),
        path: '/setting/rol/update/:id',
        name: '/setting/rol/update',
        props: true,
        meta: { permission: 'roles edit' },
      },

      // ---------------------------- Users ------------------------------
      {
        component: () => import('/@src/pages/setting/user/user.vue'),
        path: '/setting/users',
        name: '/setting/users',
        props: true,
        meta: { permission: 'program users' },
      },
      {
        component: () => import('/@src/pages/setting/user/user-create.vue'),
        path: '/setting/users/create',
        name: 'setting/users/create',
        props: true,
        meta: { permission: 'users create' },
      },
      {
        component: () => import('/@src/pages/setting/user/user-update.vue'),
        path: '/setting/users/update/:id',
        name: '/setting/users/update',
        props: true,
        meta: { permission: 'users edit' },
      },

      // ---------------------------- Profile ------------------------------
      {
        component: () => import('/@src/pages/profile/profile.vue'),
        path: '/profile',
        name: '/profile',
        props: true,
        // meta: { permission: 'program ' },
      },
    ],
  },

  {
    component: () => import('/@src/pages/[...all].vue'),
    name: 'all',
    path: '/:all(.*)',
    props: true,
  },
]

export function createRouter() {
  const router = createClientRouter({
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
      }
      else if (to.path !== from.path) {
        return { top: 0 }
      }
    },
  })
  router.beforeEach((to, from, next) => {
    const permission = to.meta.permission as string
    if (!permission || hasPermission(permission)) {
      next()
    }
    else {
      next('/error')
    }
  })

  return router
}
