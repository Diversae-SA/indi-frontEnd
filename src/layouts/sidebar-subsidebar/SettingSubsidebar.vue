<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">
        Ajustes Generales
      </h3>
      <div
        class="panel-close"
        tabindex="0"
        role="button"
        @keydown.space.prevent="emit('close')"
        @click="emit('close')"
      >
        <i
          aria-hidden="true"
          class="iconify"
          data-icon="feather:x"
        />
      </div>
    </div>
    <div
      class="inner"
      data-simplebar
    >
      <ul>
        <li>
          <RouterLink to="/setting/rol">
            <i
              aria-hidden="true"
              class="lnil lnil-lock-alt pr-2"
            />
            Roles y Permisos
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/setting/organization-chart">
            <i
              aria-hidden="true"
              class="lnil lnil-hierchy-alt pr-2"
            />
            Organigrama
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/scss/layout/sidebar-panel';
</style>
