<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const title = 'Actualizar Personas/Miembros'
const titleTwo = 'Registrar Personas/Miembros'
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? title : titleTwo)

useHead({
  title: params.id ? title : titleTwo,
})
</script>

<template>
  <div class="page-content-inner">
    <DeliveryCreateUpdate />
  </div>
</template>
