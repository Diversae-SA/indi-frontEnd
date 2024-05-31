<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Comunidades Indígenas')

useHead({
  title: 'Listado de Comunidades Indígenas',
})
</script>

<template>
  <div class="page-content-inner">
    <CommunityList />
  </div>
</template>
