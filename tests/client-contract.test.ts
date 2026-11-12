import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'
import * as react from 'react'
import * as jsx from 'react/jsx-runtime'
import * as store from '@deepseek-ai/dsh-client-store'
import { initialColors, STORAGE_KEY } from '../src/theme/palette.ts'
import type { ThemeStudioController } from '../src/theme/controller.ts'
import { dictionaries } from '../src/theme/locales.ts'

type ClientExports = { inject: string[]; apply(ctx: unknown): void }
type Registration = { id: string; factory(require: (id: string) => unknown): ClientExports }
async function harness(failOverlay = false) {
  let registration: Registration | undefined
  const styles = new Set<unknown>()
  const listeners = new Set<unknown>()
  const entries = new Set<Record<string, unknown>>()
  const effects: (() => void)[] = []
  const locales = new Map<string, unknown>()
  let layer = false
  const data = new Map([[STORAGE_KEY, JSON.stringify({ version: 1, selected: 'preset-nord', palettes: [] })]])
  const window = {
    __ModuleLoader__: { load: (value: Registration) => { registration = value } },
    localStorage: { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value) } },
    addEventListener: (_key: string, callback: unknown) => { listeners.add(callback) },
    removeEventListener: (_key: string, callback: unknown) => { listeners.delete(callback) },
  }
  const document = {
    createElement: () => { const element = { dataset: {}, textContent: '', remove: () => styles.delete(element) }; return element },
    head: { append: (element: unknown) => { styles.add(element) } },
  }
  runInNewContext(await readFile(new URL('../dist/client.js', import.meta.url), 'utf8'), { window, document, console, crypto })
  assert.ok(registration)
  assert.equal(registration.id, 'dsh-theme-studio')
  const modules: Record<string, unknown> = { react, 'react/jsx-runtime': jsx, '@deepseek-ai/dsh-client-store': store,
    '@deepseek-ai/dsh-client-ui-primitives': { Modal: () => null, Button: () => null, Input: () => null } }
  const client = registration.factory(id => { assert.ok(id in modules, `Unexpected external ${id}`); return modules[id] })
  assert.equal(styles.size, 0, 'factory execution must not install plugin effects')
  let preference = 'system'
  const ctx = {
    effect: (fn: () => () => void) => { effects.push(fn()) },
    theme: { getTheme: () => ({ preference, active: { colorScheme: preference === 'dark' ? 'dark' : 'light' } }),
      setTheme: (id: string) => { preference = id }, overrideTokens: () => { layer = true; return () => { layer = false } } },
    locale: { register: (namespace: string, dicts: unknown) => { locales.set(namespace, dicts); return () => { locales.delete(namespace) } } },
    on: (_event: string, listener: unknown) => { listeners.add(listener); return () => { listeners.delete(listener) } },
    slots: {
      inject: (key: string, callback: () => () => void) => {
        if (failOverlay && key === 'shell.overlay') throw new Error('overlay unavailable')
        return callback()
      },
      register: (options: Record<string, unknown>) => { entries.add(options); return () => { entries.delete(options) } },
    },
  }
  return { client, ctx, styles, listeners, entries, effects, data, locales, hasLayer: () => layer }
}

test('compiled client registers full dictionaries and both native locale seats, then disposes them', async () => {
  const h = await harness()
  h.client.apply(h.ctx)
  assert.deepEqual(JSON.parse(JSON.stringify(h.locales.get('theme-studio'))), dictionaries)
  assert.deepEqual([...h.entries].map(entry => entry.locale), ['theme-studio', 'theme-studio'])
  h.effects.pop()!()
  assert.equal(h.locales.size, 0)
})

test('Client bundle uses baseline shared externals and additive public slots', async () => {
  const h = await harness()
  for (let i = 0; i < 3; i++) {
    h.client.apply(h.ctx)
    assert.equal(h.styles.size, 1)
    assert.equal(h.entries.size, 2)
    assert.deepEqual([...h.entries].map(e => [e.name, e.id]), [['settings.general.item', 'theme-studio'], ['shell.overlay', 'theme-studio']])
    assert.equal(h.hasLayer(), true)
    const cleanup = h.effects.pop()!
    cleanup(); cleanup()
    assert.equal(h.styles.size, 0); assert.equal(h.entries.size, 0); assert.equal(h.listeners.size, 0); assert.equal(h.hasLayer(), false)
  }
})
test('sidebar override follows the applied library and is removed on native theme selection', async () => {
  const h = await harness()
  h.data.set(STORAGE_KEY, JSON.stringify({ version: 1, selected: 'hex-sidebar', palettes: [{ id: 'hex-sidebar', name: 'Sidebar', scheme: 'dark', colors: initialColors, sidebar: { color: '#ff5500', opacity: 60 } }] }))
  h.client.apply(h.ctx)
  const style = [...h.styles][0] as { textContent: string }
  assert.match(style.textContent, /theme-studio: independent sidebar/)
  const entry = [...h.entries][0] as unknown as { inject: () => { commands: ThemeStudioController } }
  entry.inject().commands.select('dark')
  await new Promise<void>(resolve => setImmediate(resolve))
  assert.doesNotMatch(style.textContent, /theme-studio: independent sidebar/)
  entry.inject().commands.select('hex-sidebar')
  await new Promise<void>(resolve => setImmediate(resolve))
  assert.match(style.textContent, /theme-studio: independent sidebar/)
  h.effects.pop()!()
  assert.equal(h.styles.size, 0)
  assert.equal(h.listeners.size, 0)
})
test('setup rollback leaves no style, listeners, slots or tokens after a registration failure', async () => {
  const h = await harness(true)
  assert.throws(() => h.client.apply(h.ctx), /overlay unavailable/)
  assert.equal(h.styles.size, 0); assert.equal(h.entries.size, 0); assert.equal(h.listeners.size, 0); assert.equal(h.hasLayer(), false)
})
