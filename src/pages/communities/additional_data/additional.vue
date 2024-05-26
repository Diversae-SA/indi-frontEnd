<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Datos Adicionales')

useHead({
  title: 'Listado de Datos Adicionales',
})
</script>

<template>
  <div class="page-content-inner">
    <AdditionalDataList />
  </div>
</template>
