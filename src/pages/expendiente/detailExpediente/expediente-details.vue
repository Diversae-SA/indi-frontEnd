<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Detalle de Expediente')

useHead({
  title: 'Detalle de Expedientes',
})
</script>

<template>
  <div class="page-content-inner">
    <ExpedienteView />
  </div>
</template>
