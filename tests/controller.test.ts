import assert from 'node:assert/strict'
import test from 'node:test'
import type { ThemeSnapshot, ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import { ThemeLibraryStorage, ThemeStudioController, type ThemePort, type StoragePort } from '../src/theme/controller.ts'
import { createStudioStore, draftFor } from '../src/theme/store.ts'
import { STORAGE_KEY, decodeSaved, initialColors } from '../src/theme/palette.ts'

class MemoryStorage implements StoragePort {
  data = new Map<string, string>()
  failRead = false
  failWrite = false
  getItem(key: string) { if (this.failRead) throw new Error('blocked'); return this.data.get(key) ?? null }
  setItem(key: string, value: string) { if (this.failWrite) throw new Error('quota'); this.data.set(key, value) }
}
class FakeTheme implements ThemePort {
  preference: 'light' | 'dark' | 'system' = 'system'
  tokens: ThemeTokenOverrides = {}
  onChange: (snapshot: ThemeSnapshot) => void = () => {}
  revision = 0
  private layer = 0
  failLayer = false
  getTheme(): ThemeSnapshot {
    const scheme = this.preference === 'system' ? 'light' : this.preference
    return { preference: this.preference, fontSizes: { text: 14, code: 11, terminal: 13 }, fontFamilies: { text: '', code: '', terminal: '' },
      active: { id: scheme, colorScheme: scheme, tokens: Object.fromEntries(Object.entries(this.tokens).map(([k, v]) => [k, v[scheme]])) }, themes: [], revision: this.revision }
  }
  publish() { this.revision++; this.onChange(this.getTheme()) }
  setTheme(id: string) {
    if (id !== 'light' && id !== 'dark' && id !== 'system') throw new Error('unknown theme')
    if (this.preference === id) return
    this.preference = id; this.publish()
  }
  overrideTokens(_source: string, tokens: ThemeTokenOverrides) {
    if (this.failLayer) throw new Error('provider unavailable')
    const generation = ++this.layer
    this.tokens = tokens; this.publish()
    return () => { if (this.layer === generation) { this.tokens = {}; this.publish() } }
  }
}
function setup(storage = new MemoryStorage()) {
  const loaded = decodeSaved(storage.getItem(STORAGE_KEY))
  const instance = createStudioStore({ library: loaded.state, open: false, confirmingDelete: false, draft: draftFor(), message: null,
    persistenceError: false, recovered: loaded.recovered, readOnly: loaded.readOnly }).create()
  const theme = new FakeTheme()
  let ids = 0
  const controller = new ThemeStudioController(theme, instance, new ThemeLibraryStorage(storage), () => ++ids === 1 ? 'hex-test' : `hex-test-${ids}`)
  theme.onChange = controller.themeChanged
  controller.start()
  return { storage, instance, theme, controller }
}

test('preset selection applies via official theme port without event loops', () => {
  const { controller, theme, instance } = setup()
  controller.select('preset-nord')
  assert.equal(instance.getSnapshot().library.selected, 'preset-nord')
  assert.equal(theme.tokens['--dsw-alias-bg-base']?.dark, '#2e3440')
  theme.publish() // font-only / token publication, same preference
  assert.equal(instance.getSnapshot().library.selected, 'preset-nord')
  theme.setTheme('light') // host / native preference wins
  assert.equal(instance.getSnapshot().library.selected, 'light')
  assert.deepEqual(theme.tokens, {})
})
test('saving a preset creates a validated copy; deletion never removes presets', () => {
  const { controller, instance } = setup()
  controller.select('preset-dracula'); controller.open()
  assert.equal(instance.getSnapshot().draft.id, null)
  controller.save()
  assert.equal(instance.getSnapshot().library.selected, 'hex-test')
  assert.equal(instance.getSnapshot().library.palettes.length, 1)
  assert.equal(controller.palettes().filter(p => p.id === 'preset-dracula').length, 1)
  controller.requestDelete(); assert.equal(instance.getSnapshot().confirmingDelete, true)
  controller.delete()
  assert.equal(instance.getSnapshot().library.palettes.length, 0)
  assert.equal(instance.getSnapshot().library.selected, 'system')
})
test('quota errors remain visible after selection and opening/closing the editor', () => {
  const { controller, instance, storage } = setup()
  storage.failWrite = true
  controller.select('preset-nord'); controller.open(); controller.close()
  assert.equal(instance.getSnapshot().persistenceError, true)
  assert.equal(storage.getItem(STORAGE_KEY), null)
})
test('quota failure never discards unsaved palettes on the next operation', () => {
  const { controller, instance, storage } = setup()
  storage.failWrite = true
  controller.open(); instance.actions.name('A'); controller.save()
  controller.select('preset-nord')
  assert.equal(instance.getSnapshot().persistenceError, true)
  assert.equal(instance.getSnapshot().library.palettes.length, 1)
  controller.newPalette(); instance.actions.name('B'); controller.save()
  assert.deepEqual(instance.getSnapshot().library.palettes.map(p => p.name), ['A', 'B'])
  storage.failWrite = false
  controller.select('preset-dracula')
  assert.deepEqual(decodeSaved(storage.getItem(STORAGE_KEY)).state.palettes.map(p => p.name), ['A', 'B'])
  assert.equal(instance.getSnapshot().persistenceError, false)
})
test('native preference changes merge foreign palettes even before a storage event', () => {
  const { controller, storage, theme, instance } = setup()
  controller.select('preset-nord')
  const foreign = { id: 'hex-foreign', name: 'Foreign', scheme: 'dark', colors: initialColors }
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, selected: 'preset-nord', palettes: [foreign] }))
  theme.setTheme('light')
  assert.equal(instance.getSnapshot().library.palettes[0]?.id, 'hex-foreign')
  assert.equal(decodeSaved(storage.getItem(STORAGE_KEY)).state.palettes[0]?.id, 'hex-foreign')
})
test('provider failures do not publish a half-applied library', () => {
  const { controller, instance, theme, storage } = setup()
  const previous = instance.getSnapshot().library
  theme.failLayer = true
  controller.select('preset-nord')
  assert.deepEqual(instance.getSnapshot().library, previous)
  assert.equal(instance.getSnapshot().message, 'applyError')
  assert.equal(storage.getItem(STORAGE_KEY), null)
})

test('invalid drafts do not mutate a library or apply CSS', () => {
  const { controller, instance, theme } = setup()
  controller.open(); instance.actions.name('Test'); instance.actions.color('accent', 'url(javascript:x)')
  controller.save()
  assert.equal(instance.getSnapshot().message, 'invalidHex')
  assert.equal(instance.getSnapshot().library.palettes.length, 0)
  assert.deepEqual(theme.tokens, {})
})
test('cross-tab reload keeps drafts and merges later saves with newly added palettes', () => {
  const { controller, instance, storage } = setup()
  controller.open(); instance.actions.name('My draft')
  const foreign = { id: 'hex-other', name: 'Other tab', scheme: 'dark', colors: initialColors }
  storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, selected: 'preset-nord', palettes: [foreign] }))
  controller.storageChanged()
  assert.equal(instance.getSnapshot().draft.name, 'My draft')
  controller.save()
  assert.deepEqual(instance.getSnapshot().library.palettes.map(p => p.id), ['hex-other', 'hex-test'])
})
test('recovery backs up raw data before writing, future schemas are not overwritten', () => {
  const storage = new MemoryStorage()
  const raw = JSON.stringify({ version: 1, selected: 'system', palettes: [null, { id: 'hex-valid', name: 'Healthy', scheme: 'dark', colors: initialColors }] })
  storage.setItem(STORAGE_KEY, raw)
  const { controller, instance } = setup(storage)
  assert.equal(instance.getSnapshot().library.palettes.length, 1)
  controller.select('preset-nord')
  assert.equal(storage.getItem(`${STORAGE_KEY}:recovery-backup`), raw)
  const future = '{"version":999,"palettes":[]}'
  storage.setItem(STORAGE_KEY, future)
  controller.storageChanged(); controller.select('preset-dracula')
  assert.equal(storage.getItem(STORAGE_KEY), future)
  assert.equal(instance.getSnapshot().persistenceError, true)
  assert.equal(instance.getSnapshot().readOnly, true)
})
test('dispose is idempotent and clears only the owned layer, not native preference', () => {
  const { controller, theme } = setup()
  controller.select('preset-nord')
  controller.dispose(); controller.dispose()
  assert.deepEqual(theme.tokens, {})
  assert.equal(theme.preference, 'dark')
  controller.select('preset-dracula')
  assert.deepEqual(theme.tokens, {})
})
