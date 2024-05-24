<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Entidades Externas')

useHead({
  title: 'Listado de Entidades Externas',
})
</script>

<template>
  <div class="page-content-inner">
    <EntityList />
  </div>
</template>
