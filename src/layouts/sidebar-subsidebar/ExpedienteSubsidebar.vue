<script setup lang="ts">
import { hasPermission } from '/@src/utils/permissions'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">
        Expedientes
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
        <li v-if="hasPermission('program expedientes')">
          <RouterLink to="/expediente/expediente_list">
            <i
              aria-hidden="true"
              class="lnil lnil-files pr-2"
            />
            Lista de Expedientes
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
