<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Organización' : 'Registrar Organización')

useHead({
  title: params.id ? 'Actualizar Organización' : 'Registrar Organización',
})
</script>

<template>
  <div class="page-content-inner">
    <OrganizationCreateUpdate />
  </div>
</template>
