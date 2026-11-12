import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeHex, contrast, tokensFor, initialColors, parseSaved, decodeSaved, decodePalette, presets, MAX_STORAGE_LENGTH, type Palette } from '../src/theme/palette.ts'

test('temas prontos têm cores válidas e contraste legível', () => {
  assert.equal(presets.length, 6)
  assert.equal(new Set(presets.map(p => p.id)).size, 6)
  for (const p of presets) {
    for (const color of Object.values(tokensFor(p.colors))) assert.match(color, /^#[a-f0-9]{6}$/)
    assert.ok(contrast(p.colors.text, p.colors.background) >= 4.5, p.name)
    assert.ok(contrast(p.colors.text, p.colors.surface) >= 4.5, p.name)
    assert.ok(contrast(p.colors.onAccent, p.colors.accent) >= 4.5, p.name)
  }
})
test('restaura preset selecionado sem alterar temas personalizados', () => {
  const palette: Palette = { id: 'hex-mine', name: 'Meu tema', scheme: 'dark', colors: initialColors }
  const state = { version: 1, selected: 'preset-nord', palettes: [palette] }
  assert.deepEqual(parseSaved(JSON.stringify(state)), state)
})

test('decoder valida dados desconhecidos e protege versões futuras', () => {
  for (const value of [null, false, 123, 'x', [], {}, { id: 12 }, { id: 'hex-a', name: '  ', scheme: 'dark', colors: initialColors }]) assert.equal(decodePalette(value), undefined)
  const palette = decodePalette({ id: 'hex-a', name: ' '.repeat(70) + 'Name', scheme: 'dark', colors: initialColors })
  assert.equal(palette?.name, 'Name')
  assert.equal(decodeSaved('{"version":2,"palettes":[]}').readOnly, true)
  assert.equal(decodeSaved('x'.repeat(MAX_STORAGE_LENGTH + 1)).readOnly, true)
})

test('normaliza HEX com e sem # e expande três dígitos', () => {
  assert.equal(normalizeHex(' ABC '), '#aabbcc')
  assert.equal(normalizeHex('#12Ff09'), '#12ff09')
})
test('rejeita CSS arbitrário, HEX incompleto e transparência', () => {
  for (const value of ['red', '#ff', '#12345678', 'url(x)', '#fff; color:red']) assert.throws(() => normalizeHex(value))
})
test('calcula razão WCAG e aplica tokens de UI reais', () => {
  assert.equal(contrast('#000', '#fff'), 21)
  assert.equal(contrast('#fff', '#fff'), 1)
  const tokens = tokensFor(initialColors)
  assert.equal(tokens['--dsw-specific-sidebar-fill'], initialColors.surface)
  assert.equal(tokens['--dsw-alias-bg-base'], initialColors.background)
  assert.equal(tokens['--dsw-alias-label-primary-foreground'], initialColors.onAccent)
  for (const color of Object.values(tokens)) assert.match(color, /^#[a-f0-9]{6}$/)
})
test('restaura temas salvos e trata armazenamento corrompido', () => {
  const palette: Palette = { id: 'hex-demo', name: 'Violeta', scheme: 'dark', colors: initialColors }
  const state = { version: 1, selected: palette.id, palettes: [palette] }
  assert.deepEqual(parseSaved(JSON.stringify(state)), state)
  const recovered = decodeSaved(JSON.stringify({ ...state, palettes: [palette, null, palette] }))
  assert.equal(recovered.recovered, true)
  assert.deepEqual(recovered.state, state)
  for (const raw of ['invalid', '{}', JSON.stringify({ ...state, palettes: [{ ...palette, colors: {} }] })]) {
    assert.deepEqual(parseSaved(raw), { version: 1, selected: 'system', palettes: [] })
  }
})
