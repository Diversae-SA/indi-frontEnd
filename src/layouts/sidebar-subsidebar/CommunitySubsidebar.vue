<script setup lang="ts">
import { hasPermission } from '/@src/utils/permissions'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">
        Comunidades Indígenas
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
        <li class="divider" />
        <li v-if="hasPermission('program type_data')">
          <RouterLink to="/communities/additional_data">
            <i
              aria-hidden="true"
              class="lnil lnil-cubes pr-2"
            />
            Datos Adicionales
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/scss/layout/sidebar-panel';
</style>
