<script setup lang="ts">
import { hasPermission } from '/@src/utils/permissions'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">
        Datos Generales
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
        <li v-if="hasPermission('program departments')">
          <RouterLink to="/tool/departments">
            <i
              aria-hidden="true"
              class="lnil lnil-world-2 pr-2"
            />
            Departamentos
          </RouterLink>
        </li>
        <li v-if="hasPermission('program districts')">
          <RouterLink to="/tool/districts">
            <i
              aria-hidden="true"
              class="lnil lnil-world pr-2"
            />
            Distritos
          </RouterLink>
        </li>
        <li class="divider" />
        <li v-if="hasPermission('program functionaries')">
          <RouterLink to="/tool/functionary">
            <i
              aria-hidden="true"
              class="lnil lnil-users-alt pr-2"
            />
            Funcionarios
          </RouterLink>
        </li>
        <li v-if="hasPermission('program dependencies')">
          <RouterLink to="/tool/dependencies">
            <i
              aria-hidden="true"
              class="lnil lnil-users-alt pr-2"
            />
            Funcionario/Dependencia
          </RouterLink>
        </li>
        <li v-if="hasPermission('program externalEntities')">
          <RouterLink to="/tool/externalEntity">
            <i
              aria-hidden="true"
              class="lnil lnil-apartment-alt pr-2"
            />
            Entidades Externas
          </RouterLink>
        </li>
        <li v-if="hasPermission('program suppliers')">
          <RouterLink to="/tool/suppliers">
            <i
              aria-hidden="true"
              class="lnil lnil-users-alt pr-2"
            />
            Proveedores
          </RouterLink>
        </li>
        <li class="divider" />
        <li v-if="hasPermission('program type_data')">
          <RouterLink to="/tool/type_data">
            <i
              aria-hidden="true"
              class="lnil lnil-cubes pr-2"
            />
            Tipo de Datos
          </RouterLink>
        </li>
        <li v-if="hasPermission('program type_files')">
          <RouterLink to="/tool/type_files">
            <i
              aria-hidden="true"
              class="lnil lnil-books pr-2"
            />
            Tipo de Expedientes
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/src/scss/layout/sidebar-panel';
</style>
