import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { transform } from 'lightningcss'
import { normalizeEffects, defaultEffects, decodePalette, decodeSaved, initialColors, tokensFor } from '../src/theme/palette.ts'
import { draftFor } from '../src/theme/store.ts'

test('legacy themes retain opaque defaults and existing tokens', () => {
  assert.deepEqual(draftFor().effects, defaultEffects)
  assert.equal(tokensFor(initialColors)['--dsw-alias-bg-layer-2'], initialColors.surface)
})
test('effects are bounded and cannot inject CSS', () => {
  assert.deepEqual(normalizeEffects({ blur: 999, opacity: -2, liquidGlass: 'true' }), { blur: 48, opacity: 0, liquidGlass: false })
  assert.deepEqual(normalizeEffects({ blur: NaN, opacity: Infinity }), defaultEffects)
  assert.deepEqual(normalizeEffects({ blur: 'url(x)', opacity: null }), defaultEffects)
})
test('glass settings round-trip in existing storage and drafts', () => {
  const effects = { blur: 24, opacity: 65, liquidGlass: true }
  const palette = decodePalette({ id: 'hex-glass', name: 'Glass', scheme: 'dark', colors: initialColors, effects })!
  const state = { version: 1, selected: palette.id, palettes: [palette] }
  assert.deepEqual(decodeSaved(JSON.stringify(state)).state, state)
  const draft = draftFor(palette)
  assert.deepEqual(draft.effects, effects)
  draft.effects.blur = 0
  assert.equal(palette.effects?.blur, 24)
  const tokens = tokensFor(palette.colors, palette.effects)
  assert.equal(tokens['--theme-studio-filter'], 'blur(24px) saturate(1.65)')
  assert.equal(tokens['--dsw-alias-bg-layer-2'], 'color-mix(in srgb, #1c2230 65%, transparent)')
  assert.equal(tokens['--dsw-alias-label-primary'], initialColors.text)
  assert.equal(tokens['--dsw-alias-bg-base'], initialColors.background)
  assert.equal(tokens['--theme-studio-chat-fill'], 'color-mix(in srgb, #10131a 65%, transparent)')
  assert.equal(tokens['--theme-studio-chat-content'], '""')
  assert.match(tokens['--theme-studio-scene']!, /radial-gradient/)
})
test('disabling effects removes the chat background plane and decorative scene', () => {
  const tokens = tokensFor(initialColors, defaultEffects)
  assert.equal(tokens['--theme-studio-chat-content'], 'none')
  assert.equal(tokens['--theme-studio-scene'], 'none')
  assert.equal(tokens['--theme-studio-filter'], 'none')
})
test('chat and composer use native hooks; blur stays off text and scroll ancestors', () => {
  const css = readFileSync(new URL('../src/theme/style.css', import.meta.url), 'utf8')
  assert.doesNotThrow(() => transform({ filename: 'style.css', code: Buffer.from(css) }))
  assert.match(css, /\[data-composer-card\][^{]*\.dsh-theme-editor \.hex-preview p\s*\{[^}]*backdrop-filter:/s)
  assert.match(css, /\[data-conversation-content\]::before\s*\{[^}]*pointer-events: none;[^}]*backdrop-filter:/s)
  const chatRule = css.match(/\[data-conversation-content\]\s*\{([^}]*)\}/)![1]!
  assert.doesNotMatch(chatRule, /(?:backdrop-filter|\bopacity)\s*:/)
  assert.match(css, /prefers-reduced-transparency: reduce/)
})
