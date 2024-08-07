/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/app': RouteRecordInfo<'/app', '/app', Record<never, never>, Record<never, never>>,
    '/app/': RouteRecordInfo<'/app/', '/app', Record<never, never>, Record<never, never>>,
    '/auth': RouteRecordInfo<'/auth', '/auth', Record<never, never>, Record<never, never>>,
    '/auth/login': RouteRecordInfo<'/auth/login', '/auth/login', Record<never, never>, Record<never, never>>,
    '/communities/additional_data/additional': RouteRecordInfo<'/communities/additional_data/additional', '/communities/additional_data/additional', Record<never, never>, Record<never, never>>,
    '/communities/communities/communities': RouteRecordInfo<'/communities/communities/communities', '/communities/communities/communities', Record<never, never>, Record<never, never>>,
    '/communities/communities/communities-cu': RouteRecordInfo<'/communities/communities/communities-cu', '/communities/communities/communities-cu', Record<never, never>, Record<never, never>>,
    '/communities/deliveries/deliveries': RouteRecordInfo<'/communities/deliveries/deliveries', '/communities/deliveries/deliveries', Record<never, never>, Record<never, never>>,
    '/communities/deliveries/deliveries-cu': RouteRecordInfo<'/communities/deliveries/deliveries-cu', '/communities/deliveries/deliveries-cu', Record<never, never>, Record<never, never>>,
    '/communities/members/community_members': RouteRecordInfo<'/communities/members/community_members', '/communities/members/community_members', Record<never, never>, Record<never, never>>,
    '/communities/members/community-members-cu': RouteRecordInfo<'/communities/members/community-members-cu', '/communities/members/community-members-cu', Record<never, never>, Record<never, never>>,
    '/communities/organizations/organizations': RouteRecordInfo<'/communities/organizations/organizations', '/communities/organizations/organizations', Record<never, never>, Record<never, never>>,
    '/communities/organizations/organizations-cu': RouteRecordInfo<'/communities/organizations/organizations-cu', '/communities/organizations/organizations-cu', Record<never, never>, Record<never, never>>,
    '/communities/type_benefits/benefits': RouteRecordInfo<'/communities/type_benefits/benefits', '/communities/type_benefits/benefits', Record<never, never>, Record<never, never>>,
    '/expendiente/detailExpediente/expediente-details': RouteRecordInfo<'/expendiente/detailExpediente/expediente-details', '/expendiente/detailExpediente/expediente-details', Record<never, never>, Record<never, never>>,
    '/expendiente/detailExpediente/expediente-mov': RouteRecordInfo<'/expendiente/detailExpediente/expediente-mov', '/expendiente/detailExpediente/expediente-mov', Record<never, never>, Record<never, never>>,
    '/expendiente/listExpediente/expedientes': RouteRecordInfo<'/expendiente/listExpediente/expedientes', '/expendiente/listExpediente/expedientes', Record<never, never>, Record<never, never>>,
    '/expendiente/listExpediente/expedientes-cu': RouteRecordInfo<'/expendiente/listExpediente/expedientes-cu', '/expendiente/listExpediente/expedientes-cu', Record<never, never>, Record<never, never>>,
    '/profile/profile': RouteRecordInfo<'/profile/profile', '/profile/profile', Record<never, never>, Record<never, never>>,
    '/setting/organizationChart/organizationChart': RouteRecordInfo<'/setting/organizationChart/organizationChart', '/setting/organizationChart/organizationChart', Record<never, never>, Record<never, never>>,
    '/setting/organizationChart/organizationChart-create': RouteRecordInfo<'/setting/organizationChart/organizationChart-create', '/setting/organizationChart/organizationChart-create', Record<never, never>, Record<never, never>>,
    '/setting/organizationChart/organizationChart-update': RouteRecordInfo<'/setting/organizationChart/organizationChart-update', '/setting/organizationChart/organizationChart-update', Record<never, never>, Record<never, never>>,
    '/setting/role/rol': RouteRecordInfo<'/setting/role/rol', '/setting/role/rol', Record<never, never>, Record<never, never>>,
    '/setting/role/rol-create': RouteRecordInfo<'/setting/role/rol-create', '/setting/role/rol-create', Record<never, never>, Record<never, never>>,
    '/setting/role/rol-update': RouteRecordInfo<'/setting/role/rol-update', '/setting/role/rol-update', Record<never, never>, Record<never, never>>,
    '/setting/user/user': RouteRecordInfo<'/setting/user/user', '/setting/user/user', Record<never, never>, Record<never, never>>,
    '/setting/user/user-create': RouteRecordInfo<'/setting/user/user-create', '/setting/user/user-create', Record<never, never>, Record<never, never>>,
    '/setting/user/user-update': RouteRecordInfo<'/setting/user/user-update', '/setting/user/user-update', Record<never, never>, Record<never, never>>,
    '/tool/departments': RouteRecordInfo<'/tool/departments', '/tool/departments', Record<never, never>, Record<never, never>>,
    '/tool/districts/district': RouteRecordInfo<'/tool/districts/district', '/tool/districts/district', Record<never, never>, Record<never, never>>,
    '/tool/districts/district-cu': RouteRecordInfo<'/tool/districts/district-cu', '/tool/districts/district-cu', Record<never, never>, Record<never, never>>,
    '/tool/externalEntity/entity': RouteRecordInfo<'/tool/externalEntity/entity', '/tool/externalEntity/entity', Record<never, never>, Record<never, never>>,
    '/tool/externalEntity/entity-cu': RouteRecordInfo<'/tool/externalEntity/entity-cu', '/tool/externalEntity/entity-cu', Record<never, never>, Record<never, never>>,
    '/tool/functionaries/functionary': RouteRecordInfo<'/tool/functionaries/functionary', '/tool/functionaries/functionary', Record<never, never>, Record<never, never>>,
    '/tool/functionaries/functionary-create': RouteRecordInfo<'/tool/functionaries/functionary-create', '/tool/functionaries/functionary-create', Record<never, never>, Record<never, never>>,
    '/tool/functionaries/functionary-update': RouteRecordInfo<'/tool/functionaries/functionary-update', '/tool/functionaries/functionary-update', Record<never, never>, Record<never, never>>,
    '/tool/functionaryDependency/dependency': RouteRecordInfo<'/tool/functionaryDependency/dependency', '/tool/functionaryDependency/dependency', Record<never, never>, Record<never, never>>,
    '/tool/functionaryDependency/dependency-create': RouteRecordInfo<'/tool/functionaryDependency/dependency-create', '/tool/functionaryDependency/dependency-create', Record<never, never>, Record<never, never>>,
    '/tool/functionaryDependency/dependency-update': RouteRecordInfo<'/tool/functionaryDependency/dependency-update', '/tool/functionaryDependency/dependency-update', Record<never, never>, Record<never, never>>,
    '/tool/suppliers/supplier': RouteRecordInfo<'/tool/suppliers/supplier', '/tool/suppliers/supplier', Record<never, never>, Record<never, never>>,
    '/tool/suppliers/supplier-cu': RouteRecordInfo<'/tool/suppliers/supplier-cu', '/tool/suppliers/supplier-cu', Record<never, never>, Record<never, never>>,
    '/tool/typeData/typeData': RouteRecordInfo<'/tool/typeData/typeData', '/tool/typeData/typeData', Record<never, never>, Record<never, never>>,
    '/tool/typeFiles/typeFile': RouteRecordInfo<'/tool/typeFiles/typeFile', '/tool/typeFiles/typeFile', Record<never, never>, Record<never, never>>,
    '/tool/typeFiles/typeFile-cu': RouteRecordInfo<'/tool/typeFiles/typeFile-cu', '/tool/typeFiles/typeFile-cu', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
