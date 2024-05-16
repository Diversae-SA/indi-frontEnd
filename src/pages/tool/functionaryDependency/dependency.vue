<script setup lang="ts">
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Listado Funcionario por Dependencia')

useHead({
  title: 'Listado de Funcionario por Dependencia',
})
</script>

<template>
  <div class="page-content-inner">
    <DependencyList />
  </div>
</template>
