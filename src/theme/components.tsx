import { useEffect, useId, useState, type CSSProperties } from 'react'
import { Button, Input, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import type { TranslateNS } from '@deepseek-ai/dsh-client-ui-slots'
import { tokensFor, contrast, fields, initialColors, normalizeHex, presets, type Colors, type Palette } from './palette.ts'
import type { StudioCommands } from './controller.ts'
import type { StudioStoreProps } from './store.ts'
import { editorTabs, nextEditorTab, type EditorTab } from './editor-tabs.ts'

export type StudioProps = StudioStoreProps & { commands: StudioCommands; t: TranslateNS<'theme-studio'> }
function ThemeOptions({ palettes, t }: { palettes: readonly Palette[]; t: StudioProps['t'] }) {
  return <>
    <option value="system">{t('system')}</option><option value="light">{t('light')}</option><option value="dark">{t('dark')}</option>
    {presets.map(p => <option key={p.id} value={p.id}>✦ {p.name}</option>)}
    {palettes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
  </>
}
function StorageNotice({ useStore, t }: Pick<StudioProps, 'useStore' | 't'>) {
  const error = useStore(s => s.persistenceError)
  const recovered = useStore(s => s.recovered)
  const readOnly = useStore(s => s.readOnly)
  if (!error && !recovered && !readOnly) return null
  return <p className="hex-storage" role="status">{t(readOnly ? 'readOnly' : error ? 'storageError' : 'recovered')}</p>
}
/** Additive settings row: never reads or shadows another plugin's component. */
export function ThemeSettingsRow({ useStore, commands, t }: StudioProps) {
  const library = useStore(s => s.library)
  const id = useId()
  return <section className="dsh-theme-settings" data-testid="theme-studio-appearance" aria-labelledby={id}>
    <div className="hex-settings-copy"><strong id={id}>{t('section')}</strong><p>{t('hint')}</p></div>
    <div className="hex-settings-actions">
      <select aria-label={t('section')} value={library.selected} onChange={event => commands.select(event.target.value)}>
        <ThemeOptions palettes={library.palettes} t={t} />
      </select>
      <Button variant="outline" onClick={commands.open} aria-haspopup="dialog" data-testid="theme-studio-open">◐ {t('open')}</Button>
    </div>
    <StorageNotice useStore={useStore} t={t} />
  </section>
}

/** Shared native Modal owns focus, Escape, backdrop dismissal and modal stacking. */
export function ThemeEditor({ useStore, actions, commands, t }: StudioProps) {
  const open = useStore(s => s.open)
  const confirming = useStore(s => s.confirmingDelete)
  const library = useStore(s => s.library)
  const draft = useStore(s => s.draft)
  const message = useStore(s => s.message)
  const formId = useId()
  const validationId = useId()
  const tabsId = useId()
  const [tab, setTab] = useState<EditorTab>('general')
  useEffect(() => { if (open) setTab('general') }, [open])
  let colors: Colors | undefined
  try { colors = Object.fromEntries(Object.entries(draft.colors).map(([key, value]) => [key, normalizeHex(value)])) as Colors } catch { /* Invalid drafts stay visible for correction. */ }
  let sidebarColor: string | undefined
  try { sidebarColor = normalizeHex(draft.sidebar.color) } catch { /* Keep invalid HEX drafts editable. */ }
  const ratios = colors ? [contrast(colors.text, colors.background), contrast(colors.text, colors.surface), contrast(colors.onAccent, colors.accent)] : []
  const preview = { ...tokensFor(colors ?? initialColors, draft.effects, sidebarColor ? { ...draft.sidebar, color: sidebarColor } : undefined), ...Object.fromEntries(Object.entries(colors ?? initialColors).map(([key, value]) => [`--hex-${key}`, value])) } as CSSProperties
  return <>
    <Modal open={open} onClose={commands.close} title={t('title')} closeLabel={t('close')} description={t('intro')}
      className="dsh-theme-editor" contentClassName="hex-editor-content"
      footer={<div className="hex-editor-actions">
        {draft.id && <Button variant="ghost" onClick={commands.requestDelete}>{t('remove')}</Button>}
        <Button variant="outline" onClick={() => { commands.newPalette(); setTab('general') }}>{t('new')}</Button>
        <Button variant="primary" type="submit" form={formId}>{t('save')}</Button>
      </div>}>
      <div className="hex-tabs" role="tablist" aria-label={t('editorTabs')}>
        {editorTabs.map(key => <button key={key} type="button" role="tab" id={`${tabsId}-tab-${key}`}
          aria-controls={`${tabsId}-panel-${key}`} aria-selected={tab === key} tabIndex={tab === key ? 0 : -1}
          onClick={() => setTab(key)} onKeyDown={event => {
            const next = nextEditorTab(key, event.key)
            if (!next) return
            event.preventDefault()
            setTab(next)
            document.getElementById(`${tabsId}-tab-${next}`)?.focus()
          }}>{t(key)}</button>)}
      </div>
      <form id={formId} noValidate onSubmit={event => {
        event.preventDefault()
        if (!draft.name.trim()) setTab('general')
        else if (!colors) setTab('colors')
        else if (!sidebarColor) setTab('sidebarTab')
        commands.save()
      }}>
      <section role="tabpanel" className="hex-tab-panel" id={`${tabsId}-panel-general`} aria-labelledby={`${tabsId}-tab-general`} hidden={tab !== 'general'}>
      <div className="hex-active-row"><label className="hex-label">{t('active')}
        <select id="hex-active" value={library.selected} onChange={event => commands.select(event.target.value)}>
          <ThemeOptions palettes={library.palettes} t={t} />
        </select>
      </label><Button type="button" variant="outline" onClick={commands.toggle}>{t('toggle')}</Button></div>
        <div className="hex-form-top">
          <label className="hex-label" htmlFor="hex-name">{t('name')}</label>
          <Input id="hex-name" value={draft.name} onChange={event => actions.name(event.target.value)} required maxLength={60} autoComplete="off" data-modal-autofocus aria-invalid={message === 'nameRequired'} aria-describedby={validationId} />
          <label className="hex-label" htmlFor="hex-scheme">{t('base')}</label>
          <select id="hex-scheme" value={draft.scheme} onChange={event => actions.scheme(event.target.value === 'light' ? 'light' : 'dark')}>
            <option value="dark">{t('dark')}</option><option value="light">{t('light')}</option>
          </select>
        </div>
        <p className="hex-note">{t('note')}</p>
      </section>
      <section role="tabpanel" className="hex-tab-panel" id={`${tabsId}-panel-colors`} aria-labelledby={`${tabsId}-tab-colors`} hidden={tab !== 'colors'}>
        <div className="hex-colors">{(Object.keys(fields) as (keyof Colors)[]).map(key => {
          let normalized: string | undefined
          try { normalized = normalizeHex(draft.colors[key]) } catch { /* Show field-level error. */ }
          return <fieldset key={key} className="hex-color-field"><legend>{t(key)}</legend><div className="hex-color-row">
            <input type="color" aria-label={`${t('picker')}: ${t(key)}`} value={normalized ?? '#000000'} onChange={event => actions.color(key, event.target.value)} />
            <Input type="text" aria-label={`${t(key)} ${t('hex')}`} value={draft.colors[key]} onChange={event => actions.color(key, event.target.value)} required maxLength={7}
              pattern="#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})" spellCheck={false} autoComplete="off" aria-invalid={!normalized} aria-describedby={!normalized ? validationId : undefined} />
          </div></fieldset>
        })}</div>
      </section>
      <section role="tabpanel" className="hex-tab-panel" id={`${tabsId}-panel-sidebarTab`} aria-labelledby={`${tabsId}-tab-sidebarTab`} hidden={tab !== 'sidebarTab'}>
        <fieldset className="hex-color-field"><legend>{t('sidebarColor')}</legend><div className="hex-color-row">
          <input type="color" aria-label={`${t('picker')}: ${t('sidebarColor')}`} value={sidebarColor ?? '#000000'} onChange={event => actions.sidebarColor(event.target.value)} />
          <Input type="text" aria-label={`${t('sidebarColor')} ${t('hex')}`} value={draft.sidebar.color} onChange={event => actions.sidebarColor(event.target.value)} required maxLength={7}
            pattern="#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})" spellCheck={false} autoComplete="off" aria-invalid={!sidebarColor} aria-describedby={!sidebarColor ? validationId : undefined} />
        </div></fieldset>
        <label className="hex-label hex-sidebar-opacity">{t('sidebarOpacity')} · {draft.sidebar.opacity}%
          <input type="range" min={0} max={100} step={1} value={draft.sidebar.opacity} onChange={event => actions.sidebarOpacity(Number(event.target.value))} />
        </label>
        <div className="hex-sidebar-preview" style={preview} aria-label={t('sidebarTab')}>
          <div style={{ background: sidebarColor ? `color-mix(in srgb, ${sidebarColor} ${draft.sidebar.opacity}%, transparent)` : initialColors.surface }}>
            <strong>{t('sidebarTab')}</strong><span>{t('previewText')}</span>
          </div>
        </div>
        <p className="hex-note">{t('sidebarHint')}</p>
      </section>
      <section role="tabpanel" className="hex-tab-panel" id={`${tabsId}-panel-effectsTab`} aria-labelledby={`${tabsId}-tab-effectsTab`} hidden={tab !== 'effectsTab'}>
        <fieldset className="hex-effects"><legend>{t('effects')}</legend>
          <label className="hex-label">{t('blur')} · {draft.effects.blur} px
            <input type="range" min={0} max={48} step={1} value={draft.effects.blur} onChange={event => actions.effect('blur', Number(event.target.value))} />
          </label>
          <label className="hex-label">{t('opacity')} · {draft.effects.opacity}%
            <input type="range" min={0} max={100} step={1} value={draft.effects.opacity} onChange={event => actions.effect('opacity', Number(event.target.value))} />
          </label>
          <label><input type="checkbox" checked={draft.effects.liquidGlass} onChange={event => actions.effect('liquidGlass', event.target.checked)} /> {t('liquidGlass')}</label>
          <p className="hex-note">{t('effectsHint')}</p>
        </fieldset>
      </section>
      <section role="tabpanel" className="hex-tab-panel" id={`${tabsId}-panel-previewTab`} aria-labelledby={`${tabsId}-tab-previewTab`} hidden={tab !== 'previewTab'} tabIndex={0}>
        <div className="hex-preview" aria-label={t('preview')} style={preview}>
          <strong>{t('preview')}</strong><p>{t('previewText')}</p><span className="hex-preview-action">{t('previewAction')}</span>
        </div>
        <p className="hex-contrast">{colors ? `${t('contrast')}: ${ratios.map(r => `${r.toFixed(1)}:1`).join(' · ')}. ${t(Math.min(...ratios) < 4.5 ? 'contrastWarning' : 'contrastGood')}` : t('invalidHex')}</p>
      </section>
        <p id={validationId} className="hex-status" role="status" aria-live="polite">{message ? t(message) : !colors || !sidebarColor ? t('invalidHex') : ''}</p>
        <StorageNotice useStore={useStore} t={t} />
      </form>
    </Modal>
    <Modal open={open && confirming} title={t('deleteTitle')} description={t('deleteDescription')} closeLabel={t('closeConfirmation')} onClose={commands.cancelDelete}
      footer={<><Button variant="outline" onClick={commands.cancelDelete} data-modal-autofocus>{t('cancel')}</Button><Button variant="primary" onClick={commands.delete}>{t('remove')}</Button></>} />
  </>
}
