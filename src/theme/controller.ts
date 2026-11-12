import type { ThemeRuntime, ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client'
import { decodeSaved, decodePalette, MAX_PALETTES, STORAGE_KEY, presets, tokensFor, type SavedState } from './palette.ts'
import { draftFor, type StudioInstance } from './store.ts'

export type ThemePort = Pick<ThemeRuntime, 'getTheme' | 'setTheme' | 'overrideTokens'>
export type StoragePort = Pick<Storage, 'getItem' | 'setItem'>
const SOURCE = 'dsh-theme-studio'

/** Browser persistence remains v1-compatible; recovery backs up the original bytes. */
export class ThemeLibraryStorage {
  private readonly storage: StoragePort
  constructor(storage: StoragePort) { this.storage = storage }
  load() { return decodeSaved(this.storage.getItem(STORAGE_KEY)) }
  write(library: SavedState): void {
    const raw = this.storage.getItem(STORAGE_KEY)
    const decoded = decodeSaved(raw)
    if (decoded.readOnly) throw new Error('readOnly')
    if (library.palettes.length > MAX_PALETTES) throw new Error('library conflict exceeds limit')
    if (raw && decoded.recovered) this.storage.setItem(`${STORAGE_KEY}:recovery-backup`, raw)
    this.storage.setItem(STORAGE_KEY, JSON.stringify(library))
  }
}

/** Commands own side effects; store actions remain pure and components stay declarative. */
export class ThemeStudioController {
  private applying = false
  private disposed = false
  private disposeLayer: (() => void) | undefined
  private lastPreference: string
  private unsavedLibrary: SavedState | undefined
  private readonly pendingRemoved = new Set<string>()
  private readonly theme: ThemePort
  private readonly instance: StudioInstance
  private readonly storage: ThemeLibraryStorage
  private readonly newId: () => string
  constructor(theme: ThemePort, instance: StudioInstance, storage: ThemeLibraryStorage, newId: () => string = () => `hex-${crypto.randomUUID()}`) {
    this.theme = theme; this.instance = instance; this.storage = storage; this.newId = newId
    this.lastPreference = theme.getTheme().preference
  }

  private get actions() { return this.instance.actions }
  private get state() { return this.instance.getSnapshot() }
  palettes = () => [...presets, ...this.state.library.palettes]
  start() { this.apply(this.state.library.selected) }
  private apply(id: string, library = this.state.library): boolean {
    if (this.disposed) return false
    const palette = [...presets, ...library.palettes].find(p => p.id === id)
    if (!palette && !['system', 'light', 'dark'].includes(id)) return false
    const tokens = palette ? Object.fromEntries(Object.entries(tokensFor(palette.colors, palette.effects, palette.sidebar)).map(([name, color]) => [name, { light: color, dark: color }])) : undefined
    this.applying = true
    const previousPreference = this.theme.getTheme().preference
    try {
      this.theme.setTheme(palette?.scheme ?? id)
      if (tokens) {
        // Same-source replacement is atomic; stale disposers cannot erase a newer layer.
        this.disposeLayer = this.theme.overrideTokens(SOURCE, tokens)
      } else { this.disposeLayer?.(); this.disposeLayer = undefined }
      this.lastPreference = this.theme.getTheme().preference
      return true
    } catch {
      try { this.theme.setTheme(previousPreference) } catch { /* Preserve the original failure. */ }
      this.lastPreference = this.theme.getTheme().preference
      this.actions.message('applyError')
      return false
    } finally { this.applying = false }
  }
  private latest(): SavedState {
    try {
      const loaded = this.storage.load()
      this.actions.persistence(!!this.unsavedLibrary, loaded.recovered, loaded.readOnly)
      if (!this.unsavedLibrary) return loaded.state
      const merged = new Map(loaded.state.palettes.map(p => [p.id, p]))
      for (const palette of this.unsavedLibrary.palettes) merged.set(palette.id, palette)
      for (const id of this.pendingRemoved) merged.delete(id)
      return { version: 1, selected: this.unsavedLibrary.selected, palettes: [...merged.values()] }
    } catch {
      this.actions.persistence(true, this.state.recovered, this.state.readOnly)
      return this.state.library
    }
  }
  private commit(library: SavedState): boolean {
    this.actions.library(library)
    try {
      this.storage.write(library)
      this.unsavedLibrary = undefined; this.pendingRemoved.clear()
      this.actions.persistence(false, false, false)
      return true
    } catch {
      this.unsavedLibrary = library
      this.actions.persistence(true, this.state.recovered, this.state.readOnly)
      return false
    }
  }
  select = (id: string) => {
    if (this.disposed) return
    const latest = this.latest()
    if (!this.apply(id, latest)) return
    this.commit({ ...latest, selected: id })
    this.editSelected()
  }
  private editSelected() {
    const palette = this.palettes().find(p => p.id === this.state.library.selected)
    this.actions.editor(draftFor(palette), palette?.id.startsWith('preset-') ? 'copyNotice' : null)
  }
  open = () => { this.editSelected(); this.actions.open(true) }
  close = () => { this.actions.open(false) }
  newPalette = () => { this.actions.editor(draftFor()) }
  toggle = () => this.select(this.theme.getTheme().active.colorScheme === 'dark' ? 'light' : 'dark')
  requestDelete = () => { if (this.state.draft.id) this.actions.confirmDelete(true) }
  cancelDelete = () => this.actions.confirmDelete(false)
  save = () => {
    const draft = this.state.draft
    if (!draft.name.trim()) { this.actions.message('nameRequired'); return }
    const palette = decodePalette({ ...draft, id: draft.id ?? this.newId() })
    if (!palette) { this.actions.message('invalidHex'); return }
    const latest = this.latest()
    if (!latest.palettes.some(p => p.id === palette.id) && latest.palettes.length >= MAX_PALETTES) { this.actions.message('limit'); return }
    const palettes = latest.palettes.filter(p => p.id !== palette.id).concat(palette)
    if (!this.apply(palette.id, { ...latest, palettes })) return
    const saved = this.commit({ version: 1, selected: palette.id, palettes })
    this.actions.editor(draftFor(palette), saved ? 'saved' : 'applied')
  }
  delete = () => {
    const id = this.state.draft.id
    if (!id) return
    const latest = this.latest()
    const library: SavedState = { ...latest, palettes: latest.palettes.filter(p => p.id !== id), selected: latest.selected === id ? 'system' : latest.selected }
    if (!this.apply(library.selected, library)) return
    this.pendingRemoved.add(id)
    this.commit(library)
    this.actions.editor(draftFor(), 'deleted')
  }
  /** Host/native preference changes win. Font-only publications never erase a palette. */
  themeChanged = (snapshot: ThemeSnapshot) => {
    if (this.disposed || this.applying) return
    const changed = snapshot.preference !== this.lastPreference
    this.lastPreference = snapshot.preference
    if (!changed) return
    this.disposeLayer?.(); this.disposeLayer = undefined
    const library = { ...this.latest(), selected: snapshot.preference }
    this.commit(library)
  }
  /** Same-origin tabs converge; an open unsaved draft is deliberately retained. */
  storageChanged = () => {
    if (this.disposed) return
    const library = this.latest()
    if (this.apply(library.selected, library)) this.actions.library(library)
    if (this.state.open) this.actions.message('externalChange')
  }
  dispose = () => {
    if (this.disposed) return
    this.disposed = true
    this.applying = true
    this.disposeLayer?.(); this.disposeLayer = undefined
    this.actions.open(false)
  }
}
export type StudioCommands = Pick<ThemeStudioController, 'select' | 'open' | 'close' | 'newPalette' | 'toggle' | 'requestDelete' | 'cancelDelete' | 'save' | 'delete'>
