<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Tipos de Datos')

useHead({
  title: 'Listado de Tipos de Datos',
})
</script>

<template>
  <div class="page-content-inner">
    <TypeDataList />
  </div>
</template>
