<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Movimiento de Expediente')

useHead({
  title: 'Movimiento de Expedientes',
})
</script>

<template>
  <div class="page-content-inner">
    <ExpedienteMovs />
  </div>
</template>
