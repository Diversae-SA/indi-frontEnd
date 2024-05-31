<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Comunidad Indígena' : 'Registrar Comunidad Indígena')

useHead({
  title: params.id ? 'Actualizar Comunidad Indígena' : 'Registrar Comunidad Indígena',
})
</script>

<template>
  <div class="page-content-inner">
    <CommunityCreateUpdate />
  </div>
</template>
