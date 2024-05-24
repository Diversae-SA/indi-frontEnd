<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Distritos')

useHead({
  title: 'Listado de Distritos',
})
</script>

<template>
  <div class="page-content-inner">
    <DistrictList />
  </div>
</template>
