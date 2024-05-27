<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Organizaciones')

useHead({
  title: 'Listado de Organizaciones',
})
</script>

<template>
  <div class="page-content-inner">
    <OrganizationList />
  </div>
</template>
