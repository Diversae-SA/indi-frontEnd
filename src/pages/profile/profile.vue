<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Detalle de Perfil')

useHead({
  title: 'Detalle de Perfil',
})
</script>

<template>
  <div class="page-content-inner">
    <ViewProfile />
  </div>
</template>
