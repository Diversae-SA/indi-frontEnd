<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado de Tipos de Beneficios')

useHead({
  title: 'Listado de Tipos de Beneficios',
})
</script>

<template>
  <div class="page-content-inner">
    <TypeBenefitList />
  </div>
</template>
