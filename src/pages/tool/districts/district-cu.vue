<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Distrito' : 'Registrar Distrito')

useHead({
  title: params.id ? 'Actualizar Distrito' : 'Registrar Distrito',
})
</script>

<template>
  <div class="page-content-inner">
    <DistrictCreateUpdate />
  </div>
</template>
