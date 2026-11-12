import { defineConfig } from 'tsdown'
import { inlineCss } from './scripts/inline-css.ts'

const id = 'dsh-theme-studio'
// Shared module-table identities; never bundle another React/store/primitives instance.
const externals = new Set(['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-store', '@deepseek-ai/dsh-client-ui-primitives'])
/** Standalone adaptation of the tagged monorepo preset, not an exported Harness SDK. */
export default defineConfig([
  { entry: { host: 'src/index.ts' }, tsconfig: 'tsconfig.host.json', outDir: 'dist', format: 'esm', platform: 'node', target: 'es2024', dts: false, clean: false, sourcemap: true, outputOptions: { entryFileNames: 'host.js' } },
  {
    entry: { client: 'src/theme/client.ts' }, tsconfig: 'tsconfig.client.json', outDir: 'dist', format: 'cjs', platform: 'browser', target: 'es2024', dts: false, clean: false, sourcemap: true,
    inputOptions: { platform: 'browser' },
    deps: { neverBundle: specifier => externals.has(specifier), alwaysBundle: specifier => !externals.has(specifier) },
    define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env': '{"MODE":"production"}', 'import.meta.env.MODE': '"production"' },
    plugins: [inlineCss(), {
      name: 'theme-studio-client-purity',
      resolveId(source) {
        if (source.startsWith('@deepseek-ai/') && !externals.has(source)) throw new Error(`Feature imports must be type-only or use Context services: ${source}`)
        return null
      },
    }],
    outputOptions: {
      entryFileNames: 'client.js',
      codeSplitting: false,
      banner: `window.__ModuleLoader__.load({id:${JSON.stringify(id)},factory:(require)=>{`,
      intro: 'var module = {exports:{}}; var exports = module.exports;',
      footer: 'return module.exports; }});',
    },
  },
])
