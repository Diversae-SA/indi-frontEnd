<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Tipo de Expediente' : 'Registrar Tipo de Expediente')

useHead({
  title: params.id ? 'Actualizar Tipo de Expediente' : 'Registrar Tipo de Expediente',
})
</script>

<template>
  <div class="page-content-inner">
    <TypeFileCreateUpdate />
  </div>
</template>
