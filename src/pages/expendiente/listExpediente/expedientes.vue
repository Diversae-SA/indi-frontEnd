<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Expedientes')

useHead({
  title: 'Listado de Expedientes',
})
</script>

<template>
  <div class="page-content-inner">
    <ExpedienteList />
  </div>
</template>
