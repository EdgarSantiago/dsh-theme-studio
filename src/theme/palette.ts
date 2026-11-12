export const STORAGE_KEY = 'dsh-theme-studio:v1'
export const fields = {
  background: 'Fundo principal', surface: 'Painéis e campos', text: 'Texto',
  accent: 'Cor de destaque', onAccent: 'Texto sobre destaque', border: 'Bordas',
} as const
export type Colors = Record<keyof typeof fields, string>
export interface Effects { blur: number; opacity: number; liquidGlass: boolean }
export const defaultEffects: Effects = { blur: 0, opacity: 100, liquidGlass: false }
export function normalizeEffects(value: unknown): Effects {
  const v = typeof value === "object" && value !== null ? value as Record<string, unknown> : {}
  const number = (key: string, fallback: number, max: number) => typeof v[key] === "number" && Number.isFinite(v[key]) ? Math.min(max, Math.max(0, v[key] as number)) : fallback
  return { blur: number("blur", 0, 48), opacity: number("opacity", 100, 100), liquidGlass: v.liquidGlass === true }
}
export interface SidebarAppearance { color: string; opacity: number }
export function normalizeSidebar(value: unknown, fallback: string): SidebarAppearance {
  const v = typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
  if (v.color !== undefined && typeof v.color !== 'string') throw new Error('invalidHex')
  return {
    color: normalizeHex(v.color as string | undefined ?? fallback),
    opacity: typeof v.opacity === 'number' && Number.isFinite(v.opacity) ? Math.min(100, Math.max(0, v.opacity)) : 100,
  }
}
export interface Palette { id: string; name: string; scheme: 'light' | 'dark'; colors: Colors; effects?: Effects; sidebar?: SidebarAppearance }
export interface SavedState { version: 1; selected: string; palettes: Palette[] }
export const initialColors: Colors = {
  background: '#10131a', surface: '#1c2230', text: '#edf1f7',
  accent: '#8b7cf8', onAccent: '#10131a', border: '#394357',
}
// Presets stay separate from user storage, so upgrades never overwrite saved palettes.
export const presets: readonly Palette[] = [
  { id: 'preset-dracula', name: 'Dracula', scheme: 'dark', colors: { background: '#282a36', surface: '#343746', text: '#f8f8f2', accent: '#bd93f9', onAccent: '#282a36', border: '#6272a4' } },
  { id: 'preset-nord', name: 'Nord', scheme: 'dark', colors: { background: '#2e3440', surface: '#3b4252', text: '#eceff4', accent: '#88c0d0', onAccent: '#2e3440', border: '#616e88' } },
  { id: 'preset-tokyo-night', name: 'Tokyo Night', scheme: 'dark', colors: { background: '#1a1b26', surface: '#24283b', text: '#c0caf5', accent: '#7aa2f7', onAccent: '#1a1b26', border: '#565f89' } },
  { id: 'preset-catppuccin', name: 'Catppuccin Mocha', scheme: 'dark', colors: { background: '#1e1e2e', surface: '#313244', text: '#cdd6f4', accent: '#cba6f7', onAccent: '#1e1e2e', border: '#6c7086' } },
  { id: 'preset-rose-pine-dawn', name: 'Rosé Pine Dawn', scheme: 'light', colors: { background: '#faf4ed', surface: '#fffaf3', text: '#575279', accent: '#907aa9', onAccent: '#191724', border: '#b4a5a6' } },
  { id: 'preset-solarized', name: 'Solarized Light', scheme: 'light', colors: { background: '#fdf6e3', surface: '#eee8d5', text: '#465b63', accent: '#006a85', onAccent: '#ffffff', border: '#93a1a1' } },
]
export function normalizeHex(input: string): string {
  const value = input.trim().replace(/^#/, '')
  if (!/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) throw new Error('Use uma cor HEX com 3 ou 6 dígitos, por exemplo #8b7cf8.')
  return '#' + (value.length === 3 ? [...value].map(c => c + c).join('') : value).toLowerCase()
}
function luminance(hex: string): number {
  const v = normalizeHex(hex).slice(1).match(/../g)!.map(c => parseInt(c, 16) / 255)
    .map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * v[0]! + 0.7152 * v[1]! + 0.0722 * v[2]!
}
export function contrast(a: string, b: string): number {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
export function mix(a: string, b: string, weight: number): string {
  const av = normalizeHex(a).slice(1), bv = normalizeHex(b).slice(1)
  return '#' + [0, 2, 4].map(i => Math.round(parseInt(av.slice(i, i + 2), 16) * (1 - weight) + parseInt(bv.slice(i, i + 2), 16) * weight).toString(16).padStart(2, '0')).join('')
}
export function tokensFor(colors: Colors, effects?: Effects, sidebar?: SidebarAppearance): Record<string, string> {
  const c = Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, normalizeHex(v)])) as Colors
  const e = normalizeEffects(effects)
  const surface = e.opacity === 100 ? c.surface : `color-mix(in srgb, ${c.surface} ${e.opacity}%, transparent)`
  const side = sidebar ? normalizeSidebar(sidebar, c.surface) : undefined
  const sideFill = side ? (side.opacity === 100 ? side.color : `color-mix(in srgb, ${side.color} ${side.opacity}%, transparent)`) : surface
  return {
    ...(side ? {
      '--theme-studio-sidebar-fill': sideFill,
      '--theme-studio-sidebar-opaque': side.color,
    } : {}),
    ...(effects ? {
      '--theme-studio-chat-content': e.blur > 0 || e.opacity < 100 || e.liquidGlass ? '""' : 'none',
      '--theme-studio-chat-fill': e.opacity === 100 ? c.background : `color-mix(in srgb, ${c.background} ${e.opacity}%, transparent)`,
      '--theme-studio-opaque-background': c.background,
      '--theme-studio-scene': e.liquidGlass ? `radial-gradient(ellipse at 10% 15%, ${mix(c.background, c.accent, 0.55)}, transparent 65%), radial-gradient(ellipse at 90% 85%, ${mix(c.background, c.text, 0.18)}, transparent 65%)` : 'none',
      '--theme-studio-blur': `${e.blur}px`,
      '--theme-studio-saturation': e.liquidGlass ? '1.65' : '1',
      '--theme-studio-filter': e.blur || e.liquidGlass ? `blur(${e.blur}px) saturate(${e.liquidGlass ? 1.65 : 1})` : 'none',
      '--theme-studio-sheen': e.liquidGlass ? 'linear-gradient(135deg, #ffffff24, #ffffff03 45%, #ffffff10)' : 'none',
      '--theme-studio-shadow': e.liquidGlass ? 'inset 0 1px 0 #ffffff40, 0 8px 32px #00000018' : 'none',
    } : {}),
    '--dsw-alias-bg-base': c.background,
    '--dsw-specific-sidebar-fill': sideFill,
    '--dsw-alias-label-primary-foreground': c.onAccent,
    '--dsw-alias-border-l4': c.border,
    '--dsw-alias-bg-layer-1': c.background,
    '--dsw-alias-bg-layer-2': surface,
    '--dsw-alias-bg-layer-3': surface,
    '--dsw-alias-label-primary': c.text,
    '--dsw-alias-label-secondary': mix(c.text, c.surface, 0.25),
    '--dsw-alias-label-tertiary': mix(c.text, c.surface, 0.4),
    '--dsw-alias-border-l1': c.border,
    '--dsw-alias-border-l2': c.border,
    '--dsw-alias-border-l3': c.border,
    '--dsw-alias-state-business-primary': c.accent,
    '--dsw-alias-button-primary-fill': c.accent,
    '--dsw-alias-button-primary-hover': mix(c.accent, c.text, 0.12),
    '--dsw-alias-button-info-fill': c.accent,
    '--dsw-alias-button-info-hover': mix(c.accent, c.text, 0.12),
    '--dsw-alias-button-floating-fill': surface,
    '--dsw-alias-button-floating-hover': mix(c.surface, c.text, 0.1),
    '--dsw-specific-input-major': surface,
  }
}
export const MAX_PALETTES = 50
export const MAX_STORAGE_LENGTH = 256_000
export interface DecodedLibrary { state: SavedState; recovered: boolean; readOnly: boolean }
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
/** Decode untrusted browser storage without discarding healthy palettes. */
export function decodePalette(value: unknown): Palette | undefined {
  if (!isRecord(value) || typeof value.id !== 'string' || !/^hex-[a-z0-9-]{1,100}$/.test(value.id)
    || typeof value.name !== 'string' || !value.name.trim()
    || (value.scheme !== 'light' && value.scheme !== 'dark') || !isRecord(value.colors)) return undefined
  const colors = {} as Colors
  for (const key of Object.keys(fields) as (keyof Colors)[]) {
    const color = value.colors[key]
    if (typeof color !== 'string') return undefined
    try { colors[key] = normalizeHex(color) } catch { return undefined }
  }
  let sidebar: SidebarAppearance | undefined
  try { if (value.sidebar !== undefined) sidebar = normalizeSidebar(value.sidebar, colors.surface) } catch { return undefined }
  return { id: value.id, name: value.name.trim().slice(0, 60), scheme: value.scheme, colors, ...(value.effects === undefined ? {} : { effects: normalizeEffects(value.effects) }), ...(sidebar ? { sidebar } : {}) }
}
export function decodeSaved(raw: string | null): DecodedLibrary {
  const empty: SavedState = { version: 1, selected: 'system', palettes: [] }
  if (!raw) return { state: empty, recovered: false, readOnly: false }
  if (raw.length > MAX_STORAGE_LENGTH) return { state: empty, recovered: true, readOnly: true }
  let data: unknown
  try { data = JSON.parse(raw) as unknown } catch { return { state: empty, recovered: true, readOnly: false } }
  if (!isRecord(data) || data.version !== 1 || !Array.isArray(data.palettes)) {
    return { state: empty, recovered: true, readOnly: isRecord(data) && data.version !== 1 }
  }
  let recovered = false
  const palettes: Palette[] = []
  const seen = new Set<string>()
  for (const value of data.palettes) {
    const palette = decodePalette(value)
    if (!palette || seen.has(palette.id) || palettes.length >= MAX_PALETTES) { recovered = true; continue }
    palettes.push(palette); seen.add(palette.id)
  }
  const allowed = ['system', 'light', 'dark', ...presets.map(p => p.id), ...palettes.map(p => p.id)]
  const selected = typeof data.selected === 'string' && allowed.includes(data.selected) ? data.selected : 'system'
  return { state: { version: 1, selected, palettes }, recovered, readOnly: false }
}
/** Backwards-compatible v1 storage key and decoded data shape. */
export function parseSaved(raw: string | null): SavedState { return decodeSaved(raw).state }
