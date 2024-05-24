<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Tipos de Expedientes')

useHead({
  title: 'Listado de Tipos de Expedientes',
})
</script>

<template>
  <div class="page-content-inner">
    <TypeFileList />
  </div>
</template>
