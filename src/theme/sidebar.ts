import type { SavedState } from './palette.ts'

/** Only an explicitly saved sidebar opts into replacing native macOS tint.
 * Keeping these rules out of the stylesheet otherwise restores the host exactly.
 * CSS-module suffixes are taken from the 0.2.2-rc.1 layout/sidebar contracts.
 */
export function sidebarOverrideCss(library: SavedState): string {
  if (!library.palettes.find(p => p.id === library.selected)?.sidebar) return ''
  return `
/* theme-studio: independent sidebar */
[class*="_sidebarCol"] {
  background: var(--theme-studio-sidebar-fill) !important;
}
/* Web/Windows also paint the inner SidebarRoot. Keep one translucent layer. */
[class*="_sidebarCol"] [class*="_root"]:has(> [class*="_logoRow"]) {
  background: transparent !important;
}
@media (prefers-reduced-transparency: reduce) {
  [class*="_sidebarCol"] { background: var(--theme-studio-sidebar-opaque) !important; }
}
@media (forced-colors: active) {
  [class*="_sidebarCol"] { background: Canvas !important; }
}
`
}
