import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'
import type { Context } from '@deepseek-ai/cordis'
import type { LocaleRuntime } from '@deepseek-ai/dsh-client-locale/client'
import * as react from 'react'
import * as jsx from 'react/jsx-runtime'
import * as store from '@deepseek-ai/dsh-client-store'
import { dictionaries, en, type ThemeStudioKey } from '../src/theme/locales.ts'

const languages = ['en', 'pt', 'pt-BR', 'zh', 'ja', 'es', 'fr', 'de', 'ru'] as const
const keys = Object.keys(en) as ThemeStudioKey[]
const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort()
// These are legitimate cognates or technical literals, not fallback dictionaries.
const unchanged: Record<string, readonly string[]> = { pt: ['base', 'hex'], 'pt-BR': ['base', 'hex'], zh: ['hex'], ja: ['hex'], es: ['general', 'hex'], fr: ['hex'], de: ['system', 'text', 'hex'], ru: ['hex'] }

test('all eight native languages and pt-BR have complete, non-placeholder dictionaries', () => {
  assert.deepEqual(Object.keys(dictionaries).sort(), [...languages].sort())
  assert.equal(keys.length, 61)
  assert.equal(dictionaries['pt-BR'], dictionaries.pt)
  for (const tag of languages) {
    const dict = dictionaries[tag]
    assert.deepEqual(Object.keys(dict).sort(), [...keys].sort(), tag)
    for (const key of keys) {
      assert.ok(dict[key].trim(), `${tag}.${key}`)
      assert.doesNotMatch(dict[key], /\u200b|\ufeff|TODO|TRANSLATE/)
      assert.deepEqual(placeholders(dict[key]), placeholders(en[key]), `${tag}.${key} placeholders`)
      if (tag !== 'en' && dict[key] === en[key]) assert.ok(unchanged[tag]!.includes(key), `${tag}.${key} must be translated`)
    }
    assert.match(dict.invalidHex, /#8b7cf8/)
    assert.match(dict.limit, /50/)
    assert.match(dict.contrastWarning, /4[.,]5:1/)
  }
})

test('localized plugin metadata covers the same language set and preserves the pt-BR alias', async () => {
  const read = async (tag: string) => JSON.parse(await readFile(new URL(`../locale/${tag}.json`, import.meta.url), 'utf8'))
  const baseline = await read('en')
  for (const tag of languages) {
    const value = await read(tag)
    assert.deepEqual(Object.keys(value.meta).sort(), ['description', 'title'])
    assert.ok(value.meta.title.trim() && value.meta.description.trim())
    if (tag !== 'en') assert.notEqual(value.meta.description, baseline.meta.description)
  }
  assert.deepEqual(await read('pt-BR'), await read('pt'))
})

// Execute the real SDK LocaleRuntime, not a replacement translation engine or a
// React/DOM renderer. No Host preference scope is provided, so nothing is saved.
async function localeRuntime(languages = ['en']) {
  let factory: ((require: (id: string) => unknown) => { LocaleRuntime: typeof LocaleRuntime }) | undefined
  const path = new URL('../node_modules/@deepseek-ai/dsh-client-locale/lib/client.js', import.meta.url)
  runInNewContext(await readFile(path, 'utf8'), { window: { __ModuleLoader__: { load: (value: { factory: typeof factory }) => { factory = value.factory } } } })
  assert.ok(factory)
  const modules: Record<string, unknown> = { react, 'react/jsx-runtime': jsx, '@deepseek-ai/dsh-client-store': store, '@deepseek-ai/dsh-client-ui-primitives': {} }
  const { LocaleRuntime: Runtime } = factory(id => { assert.ok(id in modules, id); return modules[id] })
  const runtime = new Runtime({ emit: () => {} } as unknown as Context, undefined, { languages, preference: null })
  // Mirrors the six definitions added by Harness's native locale bootstrap.
  for (const tag of ['ja', 'es', 'fr', 'de', 'ru', 'pt']) runtime.addLanguage({ id: tag, label: tag, fallback: 'en' })
  return runtime
}

test('native stable t and snapshot subscription follow language changes and late registration', async () => {
  const runtime = await localeRuntime()
  const t = runtime.bind('theme-studio')
  assert.equal(t('save'), 'save')
  let notifications = 0
  const unsubscribe = runtime.subscribe(() => { notifications++ })
  const unregister = runtime.register('theme-studio', dictionaries)
  assert.equal(notifications, 1)
  for (const tag of ['en', 'pt', 'zh', 'ja', 'es', 'fr', 'de', 'ru'] as const) {
    runtime.setLocale(tag)
    assert.equal(runtime.bind('theme-studio'), t)
    assert.equal(runtime.getSnapshot().active, tag)
    for (const key of keys) assert.equal(t(key), dictionaries[tag][key], `${tag}.${key}`)
  }
  const revision = runtime.getSnapshot().revision
  unregister(); unregister()
  assert.equal(runtime.getSnapshot().revision, revision + 1, 'disposal is idempotent')
  assert.equal(t('save'), 'save')
  unsubscribe()
  const before = notifications
  runtime.setLocale('en')
  assert.equal(notifications, before)
  const brazilian = await localeRuntime(['pt-BR'])
  assert.equal(brazilian.getSnapshot().active, 'pt', 'native browser-tag matching uses pt')
})

test('both slots receive native live t without a plugin language preference or selector', async () => {
  const client = await readFile(new URL('../src/theme/client.ts', import.meta.url), 'utf8')
  const components = await readFile(new URL('../src/theme/components.tsx', import.meta.url), 'utf8')
  assert.equal([...client.matchAll(/locale: 'theme-studio'/g)].length, 2)
  assert.match(client, /ctx\.locale\.register\('theme-studio', dictionaries\)/)
  assert.match(components, /ThemeSettingsRow\(\{ useStore, commands, t \}/)
  assert.match(components, /ThemeEditor\(\{ useStore, actions, commands, t \}/)
  assert.doesNotMatch(client + components, /locale\.setLocale|locale\.addLanguage|navigator\.language|locale\.preference/)
})
