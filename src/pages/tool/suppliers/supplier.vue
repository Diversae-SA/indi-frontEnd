<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Proveedores')

useHead({
  title: 'Listado de Proveedores',
})
</script>

<template>
  <div class="page-content-inner">
    <SupplierList />
  </div>
</template>
