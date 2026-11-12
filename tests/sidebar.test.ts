import assert from 'node:assert/strict'
import test from 'node:test'
import { transform } from 'lightningcss'
import { decodePalette, decodeSaved, initialColors, normalizeSidebar, tokensFor, type Palette, type SavedState } from '../src/theme/palette.ts'
import { draftFor, createStudioStore } from '../src/theme/store.ts'
import { sidebarOverrideCss } from '../src/theme/sidebar.ts'

const palette: Palette = { id: 'hex-sidebar', name: 'Sidebar', scheme: 'dark', colors: initialColors, effects: { blur: 12, opacity: 40, liquidGlass: true }, sidebar: { color: '#ff5500', opacity: 72 } }
const library: SavedState = { version: 1, selected: palette.id, palettes: [palette] }

test('sidebar color and alpha persist independently of panel effects', () => {
  assert.deepEqual(decodeSaved(JSON.stringify(library)).state, library)
  const tokens = tokensFor(palette.colors, palette.effects, palette.sidebar)
  assert.equal(tokens['--dsw-specific-sidebar-fill'], 'color-mix(in srgb, #ff5500 72%, transparent)')
  assert.equal(tokens['--theme-studio-sidebar-opaque'], '#ff5500')
  assert.equal(tokens['--dsw-specific-input-major'], 'color-mix(in srgb, #1c2230 40%, transparent)')
  assert.equal(tokens['--dsw-alias-bg-base'], initialColors.background)
  assert.equal(tokensFor(initialColors, undefined, { color: '#f00', opacity: 100 })['--theme-studio-sidebar-fill'], '#ff0000')
  assert.equal(tokensFor(initialColors, undefined, { color: '#f00', opacity: 0 })['--theme-studio-sidebar-fill'], 'color-mix(in srgb, #ff0000 0%, transparent)')
})
test('legacy palettes stay unchanged and retain the host sidebar until explicitly saved', () => {
  const old = { ...palette, sidebar: undefined }
  assert.equal(decodePalette(old)?.sidebar, undefined)
  assert.equal(sidebarOverrideCss({ ...library, palettes: [old] }), '')
  const draft = draftFor(old)
  assert.deepEqual(draft.sidebar, { color: initialColors.surface, opacity: 100 })
  assert.notEqual(draftFor(palette).sidebar, palette.sidebar)
})
test('sidebar values are bounded and CSS injection is rejected', () => {
  assert.deepEqual(normalizeSidebar({ color: '#ABC', opacity: -3 }, '#000'), { color: '#aabbcc', opacity: 0 })
  assert.equal(normalizeSidebar({ opacity: Infinity }, '#000').opacity, 100)
  assert.equal(normalizeSidebar({ opacity: 900 }, '#000').opacity, 100)
  for (const color of ['red', '#fff;display:none', 'url(x)', 12]) {
    assert.equal(decodePalette({ ...palette, sidebar: { color, opacity: 50 } }), undefined)
  }
})
test('sidebar actions do not modify chat or panel settings', () => {
  const instance = createStudioStore({ library, open: false, confirmingDelete: false, draft: draftFor(palette), message: null, persistenceError: false, recovered: false, readOnly: false }).create()
  instance.actions.sidebarColor('#123456')
  instance.actions.sidebarOpacity(33)
  assert.deepEqual(instance.getSnapshot().draft.sidebar, { color: '#123456', opacity: 33 })
  assert.deepEqual(instance.getSnapshot().draft.colors, initialColors)
  assert.deepEqual(instance.getSnapshot().draft.effects, palette.effects)
})
test('native sidebar override replaces the full gradient and restores on native/preset selection', () => {
  const css = sidebarOverrideCss(library)
  assert.doesNotThrow(() => transform({ filename: 'sidebar.css', code: Buffer.from(css) }))
  assert.match(css, /background: var\(--theme-studio-sidebar-fill\) !important/)
  assert.match(css, /background: transparent !important/)
  assert.match(css, /prefers-reduced-transparency/)
  assert.match(css, /background: Canvas !important/)
  assert.doesNotMatch(css, /(?:opacity|filter)\s*:/)
  assert.equal(sidebarOverrideCss({ ...library, selected: 'system' }), '')
  assert.equal(sidebarOverrideCss({ ...library, selected: 'preset-nord' }), '')
})
