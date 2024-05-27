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
        <li v-if="hasPermission('program organizations')">
          <RouterLink to="/communities/organizations">
            <i
              aria-hidden="true"
              class="lnil lnil-apartment-alt pr-2"
            />
            Organizaciones
          </RouterLink>
        </li>
        <li v-if="hasPermission('program community_members')">
          <RouterLink to="/communities/community_members">
            <i
              aria-hidden="true"
              class="lnil lnil-user-alt-2 pr-2"
            />
            Personas/Miembros
          </RouterLink>
        </li>
        <li class="divider" />
        <li v-if="hasPermission('program additional_data')">
          <RouterLink to="/communities/additional_data">
            <i
              aria-hidden="true"
              class="lnil lnil-cubes pr-2"
            />
            Datos Adicionales
          </RouterLink>
        </li>
        <li v-if="hasPermission('program type_benefits')">
          <RouterLink to="/communities/type_benefits">
            <i
              aria-hidden="true"
              class="lnil lnil-letterblocks pr-2"
            />
            Tipos de Beneficios
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/scss/layout/sidebar-panel';
</style>
