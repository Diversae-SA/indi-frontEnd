<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Panel Principal')

useHead({
  title: 'Inicio - SEGDOC | BENITECH',
})
</script>

<template>
  <div class="page-content-inner">
    <DashboardPrimary />
  </div>
</template>
