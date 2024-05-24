<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'
import ExpedienteCreateUpdate from '/@src/components/pages/expediente/expdienteList/ExpedienteCreateUpdate.vue'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Expediente' : 'Nuevo Expediente')

useHead({
  title: params.id ? 'Actualizar Expediente' : 'Nuevo Expediente',
})
</script>

<template>
  <div class="page-content-inner">
    <ExpedienteCreateUpdate />
  </div>
</template>
