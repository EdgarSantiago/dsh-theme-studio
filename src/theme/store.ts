import { defineStore } from '@deepseek-ai/dsh-client-store'
import type { BoundActions, PropsStore } from '@deepseek-ai/dsh-client-store'
import { defaultEffects, normalizeEffects, normalizeSidebar, type SidebarAppearance, type Effects, initialColors, type Colors, type Palette, type SavedState } from './palette.ts'

export type MessageKey = 'saved' | 'applied' | 'deleted' | 'invalidHex' | 'nameRequired' | 'limit' | 'storageError' | 'recovered' | 'readOnly' | 'copyNotice' | 'externalChange' | 'applyError'
export interface EditorDraft { id: string | null; name: string; scheme: 'light' | 'dark'; colors: Colors; effects: Effects; sidebar: SidebarAppearance }
export interface StudioState {
  library: SavedState
  open: boolean
  confirmingDelete: boolean
  draft: EditorDraft
  message: MessageKey | null
  persistenceError: boolean
  recovered: boolean
  readOnly: boolean
}
export function draftFor(palette?: Palette): EditorDraft {
  const preset = palette?.id.startsWith('preset-') ?? false
  return {
    id: palette && !preset ? palette.id : null,
    name: palette?.name ?? '',
    scheme: palette?.scheme ?? 'dark',
    effects: normalizeEffects(palette?.effects ?? defaultEffects),
    sidebar: normalizeSidebar(palette?.sidebar, palette?.colors.surface ?? initialColors.surface),
    colors: { ...(palette?.colors ?? initialColors) },
  }
}
/** A handle is constructed per apply lifetime, never as a module singleton. */
export function createStudioStore(initial: StudioState) {
  return defineStore({
    init: (): StudioState => initial,
    actions: {
      library: (draft, library: SavedState) => { draft.library = library },
      editor: (draft, value: EditorDraft, message: MessageKey | null = null) => { draft.draft = value; draft.message = message; draft.confirmingDelete = false },
      open: (draft, open: boolean) => { draft.open = open; draft.confirmingDelete = false },
      name: (draft, name: string) => { draft.draft.name = name },
      scheme: (draft, scheme: 'light' | 'dark') => { draft.draft.scheme = scheme },
      color: (draft, field: keyof Colors, value: string) => { draft.draft.colors[field] = value },
      sidebarColor: (draft, color: string) => { draft.draft.sidebar.color = color },
      sidebarOpacity: (draft, opacity: number) => { draft.draft.sidebar.opacity = normalizeSidebar({ opacity }, initialColors.surface).opacity },
      effect: (draft, field: keyof Effects, value: number | boolean) => { draft.draft.effects = normalizeEffects({ ...draft.draft.effects, [field]: value }) },
      message: (draft, message: MessageKey | null) => { draft.message = message },
      persistence: (draft, error: boolean, recovered: boolean, readOnly: boolean) => {
        draft.persistenceError = error; draft.recovered = recovered; draft.readOnly = readOnly
      },
      confirmDelete: (draft, value: boolean) => { draft.confirmingDelete = value },
    },
  })
}
export type StudioStore = ReturnType<typeof createStudioStore>
export type StudioInstance = ReturnType<StudioStore['create']>
export type StudioActions = BoundActions<StudioStore>
export type StudioStoreProps = PropsStore<StudioStore>
