export const editorTabs = ['general', 'colors', 'sidebarTab', 'effectsTab', 'previewTab'] as const
export type EditorTab = typeof editorTabs[number]

/** Horizontal, automatic-activation tabs with wrapping keyboard navigation. */
export function nextEditorTab(current: EditorTab, key: string): EditorTab | undefined {
  const index = editorTabs.indexOf(current)
  if (key === 'Home') return editorTabs[0]
  if (key === 'End') return editorTabs[editorTabs.length - 1]
  if (key === 'ArrowRight') return editorTabs[(index + 1) % editorTabs.length]
  if (key === 'ArrowLeft') return editorTabs[(index + editorTabs.length - 1) % editorTabs.length]
  return undefined
}
