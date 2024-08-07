<script setup lang="ts">
import 'https://code.jquery.com/jquery-3.7.1.min.js'
import DataTable from 'datatables.net-vue3'
import DataTablesCore, { type Config } from 'datatables.net'

import 'datatables.net-responsive'
import { hasPermission } from '/@src/utils/permissions'

DataTable.use(DataTablesCore)

let dt: any
const table = ref()
const props = defineProps({
  columnId: {
    type: String,
    default: () => 'id',
  },
  buttonTable: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => ref([]),
  },
})

const emit = defineEmits(['view', 'edit', 'delete'])
const augmentedColumns = [
  ...props.columns,
  {
    className: 'dt-center editor-edit noVis',
    orderable: false,
    searchable: false,
    defaultContent: '<i class="fa fa-pen"/>',
    data: props.columnId,
    render: function (data: any) {
      const buttonTypes = [
        { type: 'view', icon: 'feather:eye', class: 'is-info' },
        { type: 'edit', icon: 'feather:edit', class: 'is-warning' },
        { type: 'delete', icon: 'feather:trash-2', class: 'is-danger' },
      ]
      const buttons = buttonTypes
        .filter((button) => {
          return props.buttonTable.some(
            btn => btn.button === button.type && (hasPermission(btn.permission) || btn.permission === 'full'),
          )
        })
        .map((button) => {
          return `
        <button data-id="${data}" class="button is-dark-bg-1 ${button.class} is-light" id="${button.type}">
          <i class="iconify" data-icon="${button.icon}" aria-hidden="true"></i>
        </button>`
        })
        .join('')
      return `<div class="action-button">${buttons}</div>`;
    },
    exportable: false,
  },
]

const options = ref({
  columns: augmentedColumns,
  lengthChange: true,
  lengthMenu: [
    [10, 25, 50, 100],
    [
      '10 resultados por página',
      '25 resultados por página',
      '50 resultados por página',
      '100 resultados por página',
    ],
  ],
  processing: true,
  language: {
    url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json',
    // url: '/api/plug-ins/1.13.7/i18n/es-ES.json',
    lengthMenu: '_MENU_',
    search: ' ',
    searchPlaceholder: 'Buscar...',
    select: {
      rows: '',
      columns: '',
      cells: '',
    },
  },
  searchHighlight: true,
  responsive: {
    details: {
      renderer: function (api: any, rowIdx: any, columns: any) {
        const data = $.map(columns, function (col) {
          return col.hidden
            ? '<tr data-dt-row="'
            + col.rowIndex
            + '" data-dt-column="'
            + col.columnIndex
            + '">'
            + '<td class="dtr-title">'
            + col.title
            + ':'
            + '</td> '
            + '<td>'
            + col.data
            + '</td>'
            + '</tr>'
            : ''
        }).join('')
        return data ? $('<table/>').append(data) : false
      },
    },
  },
  columnDefs: [
    { responsivePriority: 2, targets: 0 },
    { responsivePriority: 1, targets: -1 },
    {
      targets: 1, // Índice de la columna que deseas modificar
      width: 200, // Ancho deseado para la columna en píxeles o cualquier otra unidad válida de CSS
    },
    {
      targets: '_all',
      render: function (data: any, type: any) {
        if (data != null) {
          return type === 'display' && data.length > 100
            ? '<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;">'
            + data
            + '</div>'
            : data
        }
        else {
          return data
        }
      },
    },
  ],
  search: true,
  // data: props.modelValue,
}) as Config

onMounted(function () {
  dt = table.value.dt
  $(document).on('click', '#view', function (event) {
    event.preventDefault()
    event.stopPropagation()
    let id = $(this).data('id')
    emit('view', id)
  })
  $(document).on('click', '#edit', function (event) {
    event.preventDefault()
    event.stopPropagation()
    let id = $(this).data('id')
    emit('edit', id)
  })
  $(document).on('click', '#delete', function (event) {
    event.preventDefault()
    event.stopPropagation()
    let id = $(this).data('id')
    emit('delete', id)
  })
})

const dataTable = ref<Record<string, any>[]>([])
watch(() => props.modelValue, (newVal) => {
  dataTable.value = [...newVal]
}, { deep: true })

</script>
<template>
  <div class="table">
    <DataTable
      ref="table"
      :options="options"
      :data="dataTable"
      class="striped is-hoverable is-fullwidth hover nowrap"
    />
  </div>
</template>
<style lang="scss">
@import '/src/scss/components/_tableJquery.scss';
</style>
