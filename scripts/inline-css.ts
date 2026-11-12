import type { TsdownPlugin } from 'tsdown'
import { readFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { transform } from 'lightningcss'

/** Lifecycle-owned CSS text, following the tagged Harness Client bundle contract. */
export function inlineCss(): TsdownPlugin {
  const prefix = '\0harness-plugin-css:'
  // Stable virtual IDs keep developer home paths out of generated comments/maps.
  const filenames = new Map<string, string>()
  return {
    name: 'harness-plugin-css-inline',
    resolveId(source, importer) {
      if (!source.endsWith('.css?inline') || !importer) return null
      const filename = resolve(dirname(importer), source.slice(0, -7))
      const id = prefix + relative(process.cwd(), filename).replaceAll('\\', '/') + '.mjs'
      filenames.set(id, filename)
      return id
    },
    async load(id) {
      if (!id.startsWith(prefix)) return null
      const filename = filenames.get(id)
      if (!filename) throw new Error('Unresolved local inline CSS module')
      this.addWatchFile(filename)
      const { code } = transform({ filename, code: await readFile(filename), minify: true })
      return `export default ${JSON.stringify(code.toString())}`
    },
  }
}
