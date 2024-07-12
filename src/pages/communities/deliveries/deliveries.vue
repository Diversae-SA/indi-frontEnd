<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
const title = 'Listado de Entregas'
viewWrapper.setPageTitle(title)

useHead({
  title: title,
})
</script>

<template>
  <div class="page-content-inner">
    <DeliveryList />
  </div>
</template>
