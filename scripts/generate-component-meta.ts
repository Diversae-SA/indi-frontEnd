import { fileURLToPath } from 'node:url'
import { join, basename } from 'node:path'
import { readdir, lstat, writeFile } from 'node:fs/promises'

import type {
  MetaCheckerOptions,
  EventMeta,
  PropertyMeta,
  ExposeMeta,
  SlotMeta,
} from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
// const componentPath = join(componentDir, '/pagination/VFlexPagination.vue')

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  schema: false,
  printer: { newLine: 1 },
}

type Checker = ReturnType<typeof createComponentMetaChecker>
async function main() {
  const tsconfig = join(__dirname, '../tsconfig.json')
  const componentDir = join(__dirname, '../src/components/base/')
  const out = join(__dirname, '../src/data/documentation/components-meta.ts')

  const checker = createComponentMetaChecker(tsconfig, checkerOptions)

  const components: Record<string, any> = {}
  await walk(components, checker, componentDir)

  const content = [
    `// This file is auto generated by scripts/generate-component-meta.ts`,
    `import type { ComponentMeta } from 'vue-component-meta'`,
    ``,
    `export const components = ${JSON.stringify(
      Object.keys(components),
    )} as const`,
    ``,
    ...Object.entries(components).map(([name, meta]) => {
      return `export const ${name}Meta = ${JSON.stringify(
        meta,
      )} satisfies ComponentMeta`
    }),
  ].join('\n')

  await writeFile(out, content)
}

async function walk(
  components: Record<string, any>,
  checker: Checker,
  dir: string,
) {
  const files = await readdir(dir)
  for (const file of files) {
    const path = join(dir, file)
    const stat = await lstat(path)
    if (stat.isDirectory()) {
      await walk(components, checker, path) // recursive
    }

    const isVueFile = path.endsWith('.vue')
    if (!isVueFile) continue

    const name = basename(path, '.vue')
    const meta = await extractMeta(checker, path)
    components[name] = meta
  }
}

async function extractMeta(checker: Checker, path: string) {
  const metaFields = checker.getComponentMeta(path)
  const meta = {
    type: metaFields.type,
    props: metaFields.props.filter(field => !field.global),
    events: metaFields.events,
    exposed: metaFields.exposed.filter((field) => {
      const isProps
        = metaFields.props?.findIndex(prop => prop.name === field.name) >= 0
      const isEvent
        = metaFields.events?.findIndex(
          (event: any) =>
            `on${event.name}`.toLowerCase() === field.name?.toLowerCase(),
        ) >= 0
      const isExcluded = field.name?.startsWith('$')
      const isModel = field.name === 'modelValue'

      return !(isProps || isEvent || isExcluded || isModel)
    }),
    slots: metaFields.slots,
  }

  meta.props.forEach(field => cleanMeta(field))
  meta.events.forEach(field => cleanMeta(field))
  meta.slots.forEach(field => cleanMeta(field))
  meta.exposed.forEach(field => cleanMeta(field))

  meta.props.sort((a, b) => {
    // sort required properties first
    if (!a.required && b.required) {
      return 1
    }
    if (a.required && !b.required) {
      return -1
    }
    // then ensure boolean properties are sorted last
    if (a.type === 'boolean' && b.type !== 'boolean') {
      return 1
    }
    if (a.type !== 'boolean' && b.type === 'boolean') {
      return -1
    }

    return a.name.localeCompare(b.name)
  })
  meta.events.sort((a, b) => a.name.localeCompare(b.name))
  meta.slots.sort((a, b) => a.name.localeCompare(b.name))
  meta.exposed.sort((a, b) => a.name.localeCompare(b.name))

  return meta
}

function cleanMeta(field: EventMeta | PropertyMeta | ExposeMeta | SlotMeta) {
  if ('schema' in field) {
    // @ts-expect-error can't be undefined
    delete field.schema

    if ('signature' in field) {
      field.schema = []
    }
    else {
      field.schema = ''
    }
  }

  if ('declarations' in field) {
    // @ts-expect-error can't be undefined
    delete field.declarations

    field.declarations = []
  }
}

main().catch(console.error)
