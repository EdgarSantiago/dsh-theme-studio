import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import css from './style.css?inline'
import { STORAGE_KEY, type DecodedLibrary } from './palette.ts'
import { ThemeLibraryStorage, ThemeStudioController } from './controller.ts'
import { createStudioStore, draftFor } from './store.ts'
import { ThemeSettingsRow, ThemeEditor } from './components.tsx'
import { dictionaries } from './locales.ts'
import { sidebarOverrideCss } from './sidebar.ts'

export const inject = ['theme', 'slots', 'locale']

/** Client composition only: contracts are imported from their owning packages. */
export function apply(ctx: Context) {
  ctx.effect(() => {
    const disposers: (() => void)[] = []
    const cleanup = () => { for (const dispose of disposers.splice(0).reverse()) dispose() }
    try {
      const storage = new ThemeLibraryStorage({
        getItem: key => window.localStorage.getItem(key),
        setItem: (key, value) => window.localStorage.setItem(key, value),
      })
      let loaded: DecodedLibrary
      let persistenceError = false
      try {
        loaded = storage.load()
        if (window.localStorage.getItem(STORAGE_KEY) === null) loaded.state.selected = ctx.theme.getTheme().preference
      } catch {
        persistenceError = true
        loaded = { state: { version: 1, selected: ctx.theme.getTheme().preference, palettes: [] }, recovered: false, readOnly: false }
      }
      const handle = createStudioStore({
        library: loaded.state, open: false, confirmingDelete: false, draft: draftFor(), message: null,
        persistenceError, recovered: loaded.recovered, readOnly: loaded.readOnly,
      })
      // Same root-scope instance shared by settings row and overlay, as ui-shortcuts does.
      const instance = handle.create()
      const store = { ...handle, create: () => instance }
      const controller = new ThemeStudioController(ctx.theme, instance, storage)
      disposers.push(controller.dispose)
      const style = document.createElement('style')
      style.dataset.plugin = 'dsh-theme-studio'
      style.dataset.pluginCss = 'dsh-theme-studio/style.css'
      style.textContent = css
      document.head.append(style)
      disposers.push(() => style.remove())
      disposers.push(ctx.locale.register('theme-studio', dictionaries))
      disposers.push(ctx.on('theme/change', controller.themeChanged))
      const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) controller.storageChanged() }
      window.addEventListener('storage', onStorage)
      disposers.push(() => window.removeEventListener('storage', onStorage))
      controller.start()
      let previousSidebarCss: string | undefined
      const syncSidebar = () => {
        const extra = sidebarOverrideCss(instance.getSnapshot().library)
        if (extra === previousSidebarCss) return
        previousSidebarCss = extra
        style.textContent = css + extra
      }
      syncSidebar()
      disposers.push(instance.subscribe(syncSidebar))
      const injected = () => ({ commands: controller })
      disposers.push(ctx.slots.inject('settings.general.item', () => ctx.slots.register({
        name: 'settings.general.item', id: 'theme-studio', order: 10.5, locale: 'theme-studio', store, inject: injected,
      }, ThemeSettingsRow)))
      disposers.push(ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay', id: 'theme-studio', locale: 'theme-studio', store, inject: injected,
      }, ThemeEditor)))
      return cleanup
    } catch (error) { cleanup(); throw error }
  })
}
