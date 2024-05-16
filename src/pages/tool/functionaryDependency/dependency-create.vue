<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Asignar Dependencia')

useHead({
  title: 'Asignar Dependencia',
})
</script>

<template>
  <div class="page-content-inner">
    <DependencyCreateUpdate />
  </div>
</template>
