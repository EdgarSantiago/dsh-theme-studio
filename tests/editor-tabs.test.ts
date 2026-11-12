import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { editorTabs, nextEditorTab } from '../src/theme/editor-tabs.ts'

test('editor tabs support arrow wrapping, Home and End without stealing other keys', () => {
  assert.deepEqual(editorTabs, ['general', 'colors', 'sidebarTab', 'effectsTab', 'previewTab'])
  assert.equal(nextEditorTab('general', 'ArrowLeft'), 'previewTab')
  assert.equal(nextEditorTab('previewTab', 'ArrowRight'), 'general')
  assert.equal(nextEditorTab('general', 'ArrowRight'), 'colors')
  assert.equal(nextEditorTab('effectsTab', 'ArrowLeft'), 'sidebarTab')
  assert.equal(nextEditorTab('colors', 'Home'), 'general')
  assert.equal(nextEditorTab('colors', 'End'), 'previewTab')
  for (const key of ['Tab', 'Escape', 'Enter', 'ArrowDown']) assert.equal(nextEditorTab('colors', key), undefined)
})
test('every editor tab has a persistent labelled panel; save remains outside panels', () => {
  const source = readFileSync(new URL('../src/theme/components.tsx', import.meta.url), 'utf8')
  for (const key of editorTabs) {
    assert.ok(source.includes(`panel-${key}`))
    assert.ok(source.includes(`tab-${key}`))
    assert.ok(source.includes(`hidden={tab !== '${key}'}`))
  }
  assert.match(source, /role="tablist"/)
  assert.match(source, /aria-selected={tab === key}/)
  assert.match(source, /tabIndex={tab === key \? 0 : -1}/)
  // Hidden required fields must not trap browser validation in an invisible panel.
  assert.match(source, /<form id={formId} noValidate/)
  assert.match(source, /if \(!draft.name.trim\(\)\) setTab\('general'\)/)
  assert.match(source, /else if \(!colors\) setTab\('colors'\)/)
  assert.match(source, /type="submit" form={formId}/)
  const css = readFileSync(new URL('../src/theme/style.css', import.meta.url), 'utf8')
  assert.match(css, /\.hex-tab-panel\[hidden\] { display: none; }/)
})
