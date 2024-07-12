<script setup lang="ts">
const emits = defineEmits<{
  (e: 'view'): void
  (e: 'projects'): void
  (e: 'schedule'): void
  (e: 'comprobante'): void
}>()
</script>

<template>
  <VDropdown
    icon="feather:more-vertical"
    class="is-pushed-mobile"
    spaced
    right
  >
    <template #content="{ close }">
      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="
          () => {
            emits('comprobante')
            close()
          }
        "
      >
        <div class="icon">
          <i
            aria-hidden="true"
            class="lnil lnil-ticket-alt"
          />
        </div>
        <div class="meta">
          <span>Comprobate</span>
          <span>Comprobante del Expediente</span>
        </div>
      </a>
      <hr class="dropdown-divider">
      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="
          () => {
            emits('view')
            close()
          }
        "
      >
        <div class="icon">
          <i
            aria-hidden="true"
            class="lnil lnil-page"
          />
        </div>
        <div class="meta">
          <span>Portada/Caratula</span>
          <span>Visualizar la portada/caratula del expediente</span>
        </div>
      </a>

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="
          () => {
            emits('projects')
            close()
          }
        "
      >
        <div class="icon">
          <i
            aria-hidden="true"
            class="lnil lnil-book-alt"
          />
        </div>
        <div class="meta">
          <span>Resumen del Expediente</span>
          <span>Datos basicos del expediente</span>
        </div>
      </a>

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="
          () => {
            emits('schedule')
            close()
          }
        "
      >
        <div class="icon">
          <i
            aria-hidden="true"
            class="lnil lnil-books-alt"
          />
        </div>
        <div class="meta">
          <span>Resumen del Expediente (Completo)</span>
          <span>Todo los datos del expediente</span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
