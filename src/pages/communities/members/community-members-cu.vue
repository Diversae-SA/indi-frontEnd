<script setup lang="ts">
import { useViewWrapper } from '/src/stores/viewWrapper'

const route = useRoute()
interface RouteParams {
  id?: string
}
const params = route.params as RouteParams
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle(params.id ? 'Actualizar Personas/Miembros' : 'Registrar Personas/Miembros')

useHead({
  title: params.id ? 'Actualizar Personas/Miembros' : 'Registrar Personas/Miembros',
})
</script>

<template>
  <div class="page-content-inner">
    <MembersCreateUpdate />
  </div>
</template>
