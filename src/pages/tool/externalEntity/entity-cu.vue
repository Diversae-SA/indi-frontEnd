<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Entidad Externa' : 'Registrar Entidad Externa')

useHead({
  title: params.id ? 'Actualizar Entidad Externa' : 'Registrar Entidad Externa',
})
</script>

<template>
  <div class="page-content-inner">
    <EntityCreateUpdate />
  </div>
</template>
