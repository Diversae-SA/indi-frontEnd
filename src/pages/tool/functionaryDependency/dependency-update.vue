<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Actualizar asignación de Dependencia')

useHead({
  title: 'Actualizar asignación de Dependencia',
})
</script>

<template>
  <div class="page-content-inner">
    <DependencyCreateUpdate />
  </div>
</template>
