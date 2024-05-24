<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Proveedor' : 'Registrar Proveedor')

useHead({
  title: params.id ? 'Actualizar Proveedor' : 'Registrar Proveedor',
})
</script>

<template>
  <div class="page-content-inner">
    <SupplierCreateUpdate />
  </div>
</template>
