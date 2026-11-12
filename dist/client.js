window.__ModuleLoader__.load({
	id: "dsh-theme-studio",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		// \0harness-plugin-css:src/theme/style.css.mjs
		var style_css_default = ".dsh-theme-settings{color:var(--dsw-alias-label-primary);border-bottom:1px solid var(--dsw-alias-border-l3);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;padding:8px 0 20px;display:flex}.dsh-theme-settings .hex-settings-copy strong{font-size:14px;font-weight:500}.dsh-theme-settings .hex-settings-copy p{color:var(--dsw-alias-label-secondary);margin:6px 0 0;font-size:12px}.dsh-theme-settings .hex-settings-actions{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.dsh-theme-settings select,.dsh-theme-editor select{min-width:0;font:inherit;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);min-height:40px;color:var(--dsw-alias-label-primary);border-radius:10px;padding:10px 12px;font-size:13px}.dsh-theme-settings select{max-width:210px}.dsh-theme-settings select:focus-visible,.dsh-theme-editor select:focus-visible,.dsh-theme-editor input:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:3px}.dsh-theme-editor{width:min(620px,100%);max-height:100%}.dsh-theme-editor .hex-editor-actions{flex-wrap:wrap;flex:1;justify-content:flex-end;gap:8px;display:flex}.dsh-theme-editor .hex-editor-content{overflow-y:auto}.dsh-theme-editor .hex-tabs{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;margin-bottom:20px;padding:4px;display:grid}.dsh-theme-editor .hex-tabs button{min-width:0;min-height:40px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;border:0;border-radius:8px;padding:8px 4px;font-size:13px}.dsh-theme-editor .hex-tabs button[aria-selected=true]{background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground)}.dsh-theme-editor .hex-tabs button:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.dsh-theme-editor .hex-tab-panel{min-width:0}.dsh-theme-editor .hex-tab-panel[hidden]{display:none}.dsh-theme-editor .hex-tab-panel .hex-effects,.dsh-theme-editor .hex-tab-panel .hex-preview{margin-top:0}.dsh-theme-editor .hex-tab-panel .hex-form-top{margin-bottom:0}.dsh-theme-editor .hex-label{flex-direction:column;gap:8px;font-size:12px;font-weight:500;display:flex}.dsh-theme-editor .hex-active-row{align-items:flex-end;gap:10px;margin-bottom:20px;display:flex}.dsh-theme-editor .hex-active-row .hex-label{flex:1;min-width:0}.dsh-theme-editor .hex-active-row>button{white-space:nowrap}.dsh-theme-editor .hex-form-top{grid-template-columns:1fr;gap:8px;margin-bottom:20px;display:grid}.dsh-theme-editor .hex-colors{grid-template-columns:1fr 1fr;gap:16px;display:grid}.dsh-theme-editor .hex-color-field{border:0;min-width:0;margin:0;padding:0}.dsh-theme-editor .hex-color-field legend{margin-bottom:8px;font-size:12px}.dsh-theme-editor .hex-color-row{align-items:center;gap:8px;min-width:0;display:flex}.dsh-theme-editor .hex-color-row>span{flex:1;min-width:0}.dsh-theme-editor .hex-color-row input[type=text]{font-family:var(--ds-font-family-code,ui-monospace, monospace);width:100%}.dsh-theme-editor input[type=color]{cursor:pointer;background:0 0;border:0;border-radius:9px;flex:0 0 40px;width:40px;height:40px;padding:0}.dsh-theme-editor .hex-preview{border:1px solid var(--hex-border);background:var(--hex-background);color:var(--hex-text);border-radius:14px;margin-top:24px;padding:20px}.dsh-theme-editor .hex-preview p{background:var(--hex-surface);border-radius:8px;margin:14px 0;padding:12px;line-height:1.5}.dsh-theme-editor .hex-preview-action{background:var(--hex-accent);color:var(--hex-onAccent);border-radius:8px;padding:8px 12px;display:inline-block}.dsh-theme-editor .hex-contrast,.dsh-theme-editor .hex-note{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.5}.dsh-theme-editor .hex-status{min-height:20px;font-size:12px}.dsh-theme-settings .hex-storage,.dsh-theme-editor .hex-storage{border:1px solid var(--dsw-alias-border-l2);border-radius:8px;flex-basis:100%;padding:8px;font-size:12px}@media (width<=480px){.dsh-theme-editor .hex-colors{grid-template-columns:1fr}.dsh-theme-settings select{max-width:100%}}@media (forced-colors:active){.dsh-theme-editor .hex-preview,.dsh-theme-editor .hex-preview-action{border:1px solid canvastext}}.dsh-theme-editor .hex-effects{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;gap:16px;margin:24px 0 0;padding:16px;display:grid}.dsh-theme-editor .hex-sidebar-opacity{margin:20px 0}.dsh-theme-editor .hex-sidebar-preview{background:repeating-conic-gradient(silver 0% 25%,#666 0% 50%) 0/20px 20px;border-radius:12px;overflow:hidden}.dsh-theme-editor .hex-sidebar-preview>div{color:var(--hex-text);flex-direction:column;gap:12px;padding:20px;display:flex}.dsh-theme-editor .hex-sidebar-preview span{font-size:12px}.dsh-theme-editor .hex-sidebar-opacity input[type=range],.dsh-theme-editor .hex-effects input[type=range]{width:100%;min-height:32px;accent-color:var(--dsw-alias-state-business-primary)}.dsh-theme-editor .hex-preview{background:radial-gradient(ellipse at top right, var(--hex-accent), transparent 65%), var(--hex-background)}.dsh-theme-editor .hex-preview p{background:var(--dsw-alias-bg-layer-2)}[class*=_sidebarCol],[class*=_rightbarCol],[role=dialog],[data-composer-card],.dsh-theme-editor .hex-preview p{backdrop-filter:var(--theme-studio-filter,none);background-image:var(--theme-studio-sheen,none);box-shadow:var(--theme-studio-shadow,none)}[data-conversation-content]{isolation:isolate;background-image:var(--theme-studio-scene,none);position:relative}[data-conversation-content]:before{content:var(--theme-studio-chat-content,none);z-index:-1;pointer-events:none;background-color:var(--theme-studio-chat-fill,transparent);background-image:var(--theme-studio-sheen,none);backdrop-filter:var(--theme-studio-filter,none);box-shadow:var(--theme-studio-shadow,none);position:absolute;inset:0}[data-composer-card]{background-color:var(--dsw-specific-input-major)}@media (prefers-reduced-transparency:reduce),(forced-colors:active){[data-conversation-content]{background-image:none}[data-conversation-content]:before{content:none}[class*=_sidebarCol],[class*=_rightbarCol],[role=dialog],[data-composer-card],.dsh-theme-editor .hex-preview p{backdrop-filter:none;box-shadow:none;background-image:none;background-color:var(--dsw-alias-bg-base)}}";
		// src/theme/palette.ts
		const STORAGE_KEY = "dsh-theme-studio:v1";
		const fields = {
			background: "Fundo principal",
			surface: "Painéis e campos",
			text: "Texto",
			accent: "Cor de destaque",
			onAccent: "Texto sobre destaque",
			border: "Bordas"
		};
		const defaultEffects = {
			blur: 0,
			opacity: 100,
			liquidGlass: false
		};
		function normalizeEffects(value) {
			const v = typeof value === "object" && value !== null ? value : {};
			const number = (key, fallback, max) => typeof v[key] === "number" && Number.isFinite(v[key]) ? Math.min(max, Math.max(0, v[key])) : fallback;
			return {
				blur: number("blur", 0, 48),
				opacity: number("opacity", 100, 100),
				liquidGlass: v.liquidGlass === true
			};
		}
		function normalizeSidebar(value, fallback) {
			const v = typeof value === "object" && value !== null ? value : {};
			if (v.color !== void 0 && typeof v.color !== "string") throw new Error("invalidHex");
			return {
				color: normalizeHex(v.color ?? fallback),
				opacity: typeof v.opacity === "number" && Number.isFinite(v.opacity) ? Math.min(100, Math.max(0, v.opacity)) : 100
			};
		}
		const initialColors = {
			background: "#10131a",
			surface: "#1c2230",
			text: "#edf1f7",
			accent: "#8b7cf8",
			onAccent: "#10131a",
			border: "#394357"
		};
		const presets = [
			{
				id: "preset-dracula",
				name: "Dracula",
				scheme: "dark",
				colors: {
					background: "#282a36",
					surface: "#343746",
					text: "#f8f8f2",
					accent: "#bd93f9",
					onAccent: "#282a36",
					border: "#6272a4"
				}
			},
			{
				id: "preset-nord",
				name: "Nord",
				scheme: "dark",
				colors: {
					background: "#2e3440",
					surface: "#3b4252",
					text: "#eceff4",
					accent: "#88c0d0",
					onAccent: "#2e3440",
					border: "#616e88"
				}
			},
			{
				id: "preset-tokyo-night",
				name: "Tokyo Night",
				scheme: "dark",
				colors: {
					background: "#1a1b26",
					surface: "#24283b",
					text: "#c0caf5",
					accent: "#7aa2f7",
					onAccent: "#1a1b26",
					border: "#565f89"
				}
			},
			{
				id: "preset-catppuccin",
				name: "Catppuccin Mocha",
				scheme: "dark",
				colors: {
					background: "#1e1e2e",
					surface: "#313244",
					text: "#cdd6f4",
					accent: "#cba6f7",
					onAccent: "#1e1e2e",
					border: "#6c7086"
				}
			},
			{
				id: "preset-rose-pine-dawn",
				name: "Rosé Pine Dawn",
				scheme: "light",
				colors: {
					background: "#faf4ed",
					surface: "#fffaf3",
					text: "#575279",
					accent: "#907aa9",
					onAccent: "#191724",
					border: "#b4a5a6"
				}
			},
			{
				id: "preset-solarized",
				name: "Solarized Light",
				scheme: "light",
				colors: {
					background: "#fdf6e3",
					surface: "#eee8d5",
					text: "#465b63",
					accent: "#006a85",
					onAccent: "#ffffff",
					border: "#93a1a1"
				}
			}
		];
		function normalizeHex(input) {
			const value = input.trim().replace(/^#/, "");
			if (!/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) throw new Error("Use uma cor HEX com 3 ou 6 dígitos, por exemplo #8b7cf8.");
			return "#" + (value.length === 3 ? [...value].map((c) => c + c).join("") : value).toLowerCase();
		}
		function luminance(hex) {
			const v = normalizeHex(hex).slice(1).match(/../g).map((c) => parseInt(c, 16) / 255).map((c) => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
			return .2126 * v[0] + .7152 * v[1] + .0722 * v[2];
		}
		function contrast(a, b) {
			const x = luminance(a), y = luminance(b);
			return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
		}
		function mix(a, b, weight) {
			const av = normalizeHex(a).slice(1), bv = normalizeHex(b).slice(1);
			return "#" + [
				0,
				2,
				4
			].map((i) => Math.round(parseInt(av.slice(i, i + 2), 16) * (1 - weight) + parseInt(bv.slice(i, i + 2), 16) * weight).toString(16).padStart(2, "0")).join("");
		}
		function tokensFor(colors, effects, sidebar) {
			const c = Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, normalizeHex(v)]));
			const e = normalizeEffects(effects);
			const surface = e.opacity === 100 ? c.surface : `color-mix(in srgb, ${c.surface} ${e.opacity}%, transparent)`;
			const side = sidebar ? normalizeSidebar(sidebar, c.surface) : void 0;
			const sideFill = side ? side.opacity === 100 ? side.color : `color-mix(in srgb, ${side.color} ${side.opacity}%, transparent)` : surface;
			return {
				...side ? {
					"--theme-studio-sidebar-fill": sideFill,
					"--theme-studio-sidebar-opaque": side.color
				} : {},
				...effects ? {
					"--theme-studio-chat-content": e.blur > 0 || e.opacity < 100 || e.liquidGlass ? "\"\"" : "none",
					"--theme-studio-chat-fill": e.opacity === 100 ? c.background : `color-mix(in srgb, ${c.background} ${e.opacity}%, transparent)`,
					"--theme-studio-opaque-background": c.background,
					"--theme-studio-scene": e.liquidGlass ? `radial-gradient(ellipse at 10% 15%, ${mix(c.background, c.accent, .55)}, transparent 65%), radial-gradient(ellipse at 90% 85%, ${mix(c.background, c.text, .18)}, transparent 65%)` : "none",
					"--theme-studio-blur": `${e.blur}px`,
					"--theme-studio-saturation": e.liquidGlass ? "1.65" : "1",
					"--theme-studio-filter": e.blur || e.liquidGlass ? `blur(${e.blur}px) saturate(${e.liquidGlass ? 1.65 : 1})` : "none",
					"--theme-studio-sheen": e.liquidGlass ? "linear-gradient(135deg, #ffffff24, #ffffff03 45%, #ffffff10)" : "none",
					"--theme-studio-shadow": e.liquidGlass ? "inset 0 1px 0 #ffffff40, 0 8px 32px #00000018" : "none"
				} : {},
				"--dsw-alias-bg-base": c.background,
				"--dsw-specific-sidebar-fill": sideFill,
				"--dsw-alias-label-primary-foreground": c.onAccent,
				"--dsw-alias-border-l4": c.border,
				"--dsw-alias-bg-layer-1": c.background,
				"--dsw-alias-bg-layer-2": surface,
				"--dsw-alias-bg-layer-3": surface,
				"--dsw-alias-label-primary": c.text,
				"--dsw-alias-label-secondary": mix(c.text, c.surface, .25),
				"--dsw-alias-label-tertiary": mix(c.text, c.surface, .4),
				"--dsw-alias-border-l1": c.border,
				"--dsw-alias-border-l2": c.border,
				"--dsw-alias-border-l3": c.border,
				"--dsw-alias-state-business-primary": c.accent,
				"--dsw-alias-button-primary-fill": c.accent,
				"--dsw-alias-button-primary-hover": mix(c.accent, c.text, .12),
				"--dsw-alias-button-info-fill": c.accent,
				"--dsw-alias-button-info-hover": mix(c.accent, c.text, .12),
				"--dsw-alias-button-floating-fill": surface,
				"--dsw-alias-button-floating-hover": mix(c.surface, c.text, .1),
				"--dsw-specific-input-major": surface
			};
		}
		function isRecord(value) {
			return typeof value === "object" && value !== null && !Array.isArray(value);
		}
		/** Decode untrusted browser storage without discarding healthy palettes. */
		function decodePalette(value) {
			if (!isRecord(value) || typeof value.id !== "string" || !/^hex-[a-z0-9-]{1,100}$/.test(value.id) || typeof value.name !== "string" || !value.name.trim() || value.scheme !== "light" && value.scheme !== "dark" || !isRecord(value.colors)) return void 0;
			const colors = {};
			for (const key of Object.keys(fields)) {
				const color = value.colors[key];
				if (typeof color !== "string") return void 0;
				try {
					colors[key] = normalizeHex(color);
				} catch {
					return;
				}
			}
			let sidebar;
			try {
				if (value.sidebar !== void 0) sidebar = normalizeSidebar(value.sidebar, colors.surface);
			} catch {
				return;
			}
			return {
				id: value.id,
				name: value.name.trim().slice(0, 60),
				scheme: value.scheme,
				colors,
				...value.effects === void 0 ? {} : { effects: normalizeEffects(value.effects) },
				...sidebar ? { sidebar } : {}
			};
		}
		function decodeSaved(raw) {
			const empty = {
				version: 1,
				selected: "system",
				palettes: []
			};
			if (!raw) return {
				state: empty,
				recovered: false,
				readOnly: false
			};
			if (raw.length > 256e3) return {
				state: empty,
				recovered: true,
				readOnly: true
			};
			let data;
			try {
				data = JSON.parse(raw);
			} catch {
				return {
					state: empty,
					recovered: true,
					readOnly: false
				};
			}
			if (!isRecord(data) || data.version !== 1 || !Array.isArray(data.palettes)) return {
				state: empty,
				recovered: true,
				readOnly: isRecord(data) && data.version !== 1
			};
			let recovered = false;
			const palettes = [];
			const seen = /* @__PURE__ */ new Set();
			for (const value of data.palettes) {
				const palette = decodePalette(value);
				if (!palette || seen.has(palette.id) || palettes.length >= 50) {
					recovered = true;
					continue;
				}
				palettes.push(palette);
				seen.add(palette.id);
			}
			const allowed = [
				"system",
				"light",
				"dark",
				...presets.map((p) => p.id),
				...palettes.map((p) => p.id)
			];
			return {
				state: {
					version: 1,
					selected: typeof data.selected === "string" && allowed.includes(data.selected) ? data.selected : "system",
					palettes
				},
				recovered,
				readOnly: false
			};
		}
		// src/theme/store.ts
		function draftFor(palette) {
			const preset = palette?.id.startsWith("preset-") ?? false;
			return {
				id: palette && !preset ? palette.id : null,
				name: palette?.name ?? "",
				scheme: palette?.scheme ?? "dark",
				effects: normalizeEffects(palette?.effects ?? defaultEffects),
				sidebar: normalizeSidebar(palette?.sidebar, palette?.colors.surface ?? initialColors.surface),
				colors: { ...palette?.colors ?? initialColors }
			};
		}
		/** A handle is constructed per apply lifetime, never as a module singleton. */
		function createStudioStore(initial) {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => initial,
				actions: {
					library: (draft, library) => {
						draft.library = library;
					},
					editor: (draft, value, message = null) => {
						draft.draft = value;
						draft.message = message;
						draft.confirmingDelete = false;
					},
					open: (draft, open) => {
						draft.open = open;
						draft.confirmingDelete = false;
					},
					name: (draft, name) => {
						draft.draft.name = name;
					},
					scheme: (draft, scheme) => {
						draft.draft.scheme = scheme;
					},
					color: (draft, field, value) => {
						draft.draft.colors[field] = value;
					},
					sidebarColor: (draft, color) => {
						draft.draft.sidebar.color = color;
					},
					sidebarOpacity: (draft, opacity) => {
						draft.draft.sidebar.opacity = normalizeSidebar({ opacity }, initialColors.surface).opacity;
					},
					effect: (draft, field, value) => {
						draft.draft.effects = normalizeEffects({
							...draft.draft.effects,
							[field]: value
						});
					},
					message: (draft, message) => {
						draft.message = message;
					},
					persistence: (draft, error, recovered, readOnly) => {
						draft.persistenceError = error;
						draft.recovered = recovered;
						draft.readOnly = readOnly;
					},
					confirmDelete: (draft, value) => {
						draft.confirmingDelete = value;
					}
				}
			});
		}
		// src/theme/controller.ts
		const SOURCE = "dsh-theme-studio";
		/** Browser persistence remains v1-compatible; recovery backs up the original bytes. */
		var ThemeLibraryStorage = class {
			storage;
			constructor(storage) {
				this.storage = storage;
			}
			load() {
				return decodeSaved(this.storage.getItem(STORAGE_KEY));
			}
			write(library) {
				const raw = this.storage.getItem(STORAGE_KEY);
				const decoded = decodeSaved(raw);
				if (decoded.readOnly) throw new Error("readOnly");
				if (library.palettes.length > 50) throw new Error("library conflict exceeds limit");
				if (raw && decoded.recovered) this.storage.setItem(`${STORAGE_KEY}:recovery-backup`, raw);
				this.storage.setItem(STORAGE_KEY, JSON.stringify(library));
			}
		};
		/** Commands own side effects; store actions remain pure and components stay declarative. */
		var ThemeStudioController = class {
			applying = false;
			disposed = false;
			disposeLayer;
			lastPreference;
			unsavedLibrary;
			pendingRemoved = /* @__PURE__ */ new Set();
			theme;
			instance;
			storage;
			newId;
			constructor(theme, instance, storage, newId = () => `hex-${crypto.randomUUID()}`) {
				this.theme = theme;
				this.instance = instance;
				this.storage = storage;
				this.newId = newId;
				this.lastPreference = theme.getTheme().preference;
			}
			get actions() {
				return this.instance.actions;
			}
			get state() {
				return this.instance.getSnapshot();
			}
			palettes = () => [...presets, ...this.state.library.palettes];
			start() {
				this.apply(this.state.library.selected);
			}
			apply(id, library = this.state.library) {
				if (this.disposed) return false;
				const palette = [...presets, ...library.palettes].find((p) => p.id === id);
				if (!palette && ![
					"system",
					"light",
					"dark"
				].includes(id)) return false;
				const tokens = palette ? Object.fromEntries(Object.entries(tokensFor(palette.colors, palette.effects, palette.sidebar)).map(([name, color]) => [name, {
					light: color,
					dark: color
				}])) : void 0;
				this.applying = true;
				const previousPreference = this.theme.getTheme().preference;
				try {
					this.theme.setTheme(palette?.scheme ?? id);
					if (tokens) this.disposeLayer = this.theme.overrideTokens(SOURCE, tokens);
					else {
						this.disposeLayer?.();
						this.disposeLayer = void 0;
					}
					this.lastPreference = this.theme.getTheme().preference;
					return true;
				} catch {
					try {
						this.theme.setTheme(previousPreference);
					} catch {}
					this.lastPreference = this.theme.getTheme().preference;
					this.actions.message("applyError");
					return false;
				} finally {
					this.applying = false;
				}
			}
			latest() {
				try {
					const loaded = this.storage.load();
					this.actions.persistence(!!this.unsavedLibrary, loaded.recovered, loaded.readOnly);
					if (!this.unsavedLibrary) return loaded.state;
					const merged = new Map(loaded.state.palettes.map((p) => [p.id, p]));
					for (const palette of this.unsavedLibrary.palettes) merged.set(palette.id, palette);
					for (const id of this.pendingRemoved) merged.delete(id);
					return {
						version: 1,
						selected: this.unsavedLibrary.selected,
						palettes: [...merged.values()]
					};
				} catch {
					this.actions.persistence(true, this.state.recovered, this.state.readOnly);
					return this.state.library;
				}
			}
			commit(library) {
				this.actions.library(library);
				try {
					this.storage.write(library);
					this.unsavedLibrary = void 0;
					this.pendingRemoved.clear();
					this.actions.persistence(false, false, false);
					return true;
				} catch {
					this.unsavedLibrary = library;
					this.actions.persistence(true, this.state.recovered, this.state.readOnly);
					return false;
				}
			}
			select = (id) => {
				if (this.disposed) return;
				const latest = this.latest();
				if (!this.apply(id, latest)) return;
				this.commit({
					...latest,
					selected: id
				});
				this.editSelected();
			};
			editSelected() {
				const palette = this.palettes().find((p) => p.id === this.state.library.selected);
				this.actions.editor(draftFor(palette), palette?.id.startsWith("preset-") ? "copyNotice" : null);
			}
			open = () => {
				this.editSelected();
				this.actions.open(true);
			};
			close = () => {
				this.actions.open(false);
			};
			newPalette = () => {
				this.actions.editor(draftFor());
			};
			toggle = () => this.select(this.theme.getTheme().active.colorScheme === "dark" ? "light" : "dark");
			requestDelete = () => {
				if (this.state.draft.id) this.actions.confirmDelete(true);
			};
			cancelDelete = () => this.actions.confirmDelete(false);
			save = () => {
				const draft = this.state.draft;
				if (!draft.name.trim()) {
					this.actions.message("nameRequired");
					return;
				}
				const palette = decodePalette({
					...draft,
					id: draft.id ?? this.newId()
				});
				if (!palette) {
					this.actions.message("invalidHex");
					return;
				}
				const latest = this.latest();
				if (!latest.palettes.some((p) => p.id === palette.id) && latest.palettes.length >= 50) {
					this.actions.message("limit");
					return;
				}
				const palettes = latest.palettes.filter((p) => p.id !== palette.id).concat(palette);
				if (!this.apply(palette.id, {
					...latest,
					palettes
				})) return;
				const saved = this.commit({
					version: 1,
					selected: palette.id,
					palettes
				});
				this.actions.editor(draftFor(palette), saved ? "saved" : "applied");
			};
			delete = () => {
				const id = this.state.draft.id;
				if (!id) return;
				const latest = this.latest();
				const library = {
					...latest,
					palettes: latest.palettes.filter((p) => p.id !== id),
					selected: latest.selected === id ? "system" : latest.selected
				};
				if (!this.apply(library.selected, library)) return;
				this.pendingRemoved.add(id);
				this.commit(library);
				this.actions.editor(draftFor(), "deleted");
			};
			/** Host/native preference changes win. Font-only publications never erase a palette. */
			themeChanged = (snapshot) => {
				if (this.disposed || this.applying) return;
				const changed = snapshot.preference !== this.lastPreference;
				this.lastPreference = snapshot.preference;
				if (!changed) return;
				this.disposeLayer?.();
				this.disposeLayer = void 0;
				const library = {
					...this.latest(),
					selected: snapshot.preference
				};
				this.commit(library);
			};
			/** Same-origin tabs converge; an open unsaved draft is deliberately retained. */
			storageChanged = () => {
				if (this.disposed) return;
				const library = this.latest();
				if (this.apply(library.selected, library)) this.actions.library(library);
				if (this.state.open) this.actions.message("externalChange");
			};
			dispose = () => {
				if (this.disposed) return;
				this.disposed = true;
				this.applying = true;
				this.disposeLayer?.();
				this.disposeLayer = void 0;
				this.actions.open(false);
			};
		};
		// src/theme/editor-tabs.ts
		const editorTabs = [
			"general",
			"colors",
			"sidebarTab",
			"effectsTab",
			"previewTab"
		];
		/** Horizontal, automatic-activation tabs with wrapping keyboard navigation. */
		function nextEditorTab(current, key) {
			const index = editorTabs.indexOf(current);
			if (key === "Home") return editorTabs[0];
			if (key === "End") return editorTabs[editorTabs.length - 1];
			if (key === "ArrowRight") return editorTabs[(index + 1) % editorTabs.length];
			if (key === "ArrowLeft") return editorTabs[(index + editorTabs.length - 1) % editorTabs.length];
		}
		// src/theme/components.tsx
		function ThemeOptions({ palettes, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
					value: "system",
					children: t("system")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
					value: "light",
					children: t("light")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
					value: "dark",
					children: t("dark")
				}),
				presets.map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
					value: p.id,
					children: ["✦ ", p.name]
				}, p.id)),
				palettes.map((p) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
					value: p.id,
					children: p.name
				}, p.id))
			] });
		}
		function StorageNotice({ useStore, t }) {
			const error = useStore((s) => s.persistenceError);
			const recovered = useStore((s) => s.recovered);
			const readOnly = useStore((s) => s.readOnly);
			if (!error && !recovered && !readOnly) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: "hex-storage",
				role: "status",
				children: t(readOnly ? "readOnly" : error ? "storageError" : "recovered")
			});
		}
		/** Additive settings row: never reads or shadows another plugin's component. */
		function ThemeSettingsRow({ useStore, commands, t }) {
			const library = useStore((s) => s.library);
			const id = (0, react.useId)();
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "dsh-theme-settings",
				"data-testid": "theme-studio-appearance",
				"aria-labelledby": id,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "hex-settings-copy",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
							id,
							children: t("section")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("hint") })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "hex-settings-actions",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
							"aria-label": t("section"),
							value: library.selected,
							onChange: (event) => commands.select(event.target.value),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThemeOptions, {
								palettes: library.palettes,
								t
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: commands.open,
							"aria-haspopup": "dialog",
							"data-testid": "theme-studio-open",
							children: ["◐ ", t("open")]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StorageNotice, {
						useStore,
						t
					})
				]
			});
		}
		/** Shared native Modal owns focus, Escape, backdrop dismissal and modal stacking. */
		function ThemeEditor({ useStore, actions, commands, t }) {
			const open = useStore((s) => s.open);
			const confirming = useStore((s) => s.confirmingDelete);
			const library = useStore((s) => s.library);
			const draft = useStore((s) => s.draft);
			const message = useStore((s) => s.message);
			const formId = (0, react.useId)();
			const validationId = (0, react.useId)();
			const tabsId = (0, react.useId)();
			const [tab, setTab] = (0, react.useState)("general");
			(0, react.useEffect)(() => {
				if (open) setTab("general");
			}, [open]);
			let colors;
			try {
				colors = Object.fromEntries(Object.entries(draft.colors).map(([key, value]) => [key, normalizeHex(value)]));
			} catch {}
			let sidebarColor;
			try {
				sidebarColor = normalizeHex(draft.sidebar.color);
			} catch {}
			const ratios = colors ? [
				contrast(colors.text, colors.background),
				contrast(colors.text, colors.surface),
				contrast(colors.onAccent, colors.accent)
			] : [];
			const preview = {
				...tokensFor(colors ?? initialColors, draft.effects, sidebarColor ? {
					...draft.sidebar,
					color: sidebarColor
				} : void 0),
				...Object.fromEntries(Object.entries(colors ?? initialColors).map(([key, value]) => [`--hex-${key}`, value]))
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open,
				onClose: commands.close,
				title: t("title"),
				closeLabel: t("close"),
				description: t("intro"),
				className: "dsh-theme-editor",
				contentClassName: "hex-editor-content",
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "hex-editor-actions",
					children: [
						draft.id && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "ghost",
							onClick: commands.requestDelete,
							children: t("remove")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							onClick: () => {
								commands.newPalette();
								setTab("general");
							},
							children: t("new")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							type: "submit",
							form: formId,
							children: t("save")
						})
					]
				}),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "hex-tabs",
					role: "tablist",
					"aria-label": t("editorTabs"),
					children: editorTabs.map((key) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						id: `${tabsId}-tab-${key}`,
						"aria-controls": `${tabsId}-panel-${key}`,
						"aria-selected": tab === key,
						tabIndex: tab === key ? 0 : -1,
						onClick: () => setTab(key),
						onKeyDown: (event) => {
							const next = nextEditorTab(key, event.key);
							if (!next) return;
							event.preventDefault();
							setTab(next);
							document.getElementById(`${tabsId}-tab-${next}`)?.focus();
						},
						children: t(key)
					}, key))
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
					id: formId,
					noValidate: true,
					onSubmit: (event) => {
						event.preventDefault();
						if (!draft.name.trim()) setTab("general");
						else if (!colors) setTab("colors");
						else if (!sidebarColor) setTab("sidebarTab");
						commands.save();
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							role: "tabpanel",
							className: "hex-tab-panel",
							id: `${tabsId}-panel-general`,
							"aria-labelledby": `${tabsId}-tab-general`,
							hidden: tab !== "general",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "hex-active-row",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "hex-label",
										children: [t("active"), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
											id: "hex-active",
											value: library.selected,
											onChange: (event) => commands.select(event.target.value),
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThemeOptions, {
												palettes: library.palettes,
												t
											})
										})]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
										type: "button",
										variant: "outline",
										onClick: commands.toggle,
										children: t("toggle")
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "hex-form-top",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											className: "hex-label",
											htmlFor: "hex-name",
											children: t("name")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
											id: "hex-name",
											value: draft.name,
											onChange: (event) => actions.name(event.target.value),
											required: true,
											maxLength: 60,
											autoComplete: "off",
											"data-modal-autofocus": true,
											"aria-invalid": message === "nameRequired",
											"aria-describedby": validationId
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
											className: "hex-label",
											htmlFor: "hex-scheme",
											children: t("base")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
											id: "hex-scheme",
											value: draft.scheme,
											onChange: (event) => actions.scheme(event.target.value === "light" ? "light" : "dark"),
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "dark",
												children: t("dark")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
												value: "light",
												children: t("light")
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "hex-note",
									children: t("note")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("section", {
							role: "tabpanel",
							className: "hex-tab-panel",
							id: `${tabsId}-panel-colors`,
							"aria-labelledby": `${tabsId}-tab-colors`,
							hidden: tab !== "colors",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "hex-colors",
								children: Object.keys(fields).map((key) => {
									let normalized;
									try {
										normalized = normalizeHex(draft.colors[key]);
									} catch {}
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
										className: "hex-color-field",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t(key) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "hex-color-row",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "color",
												"aria-label": `${t("picker")}: ${t(key)}`,
												value: normalized ?? "#000000",
												onChange: (event) => actions.color(key, event.target.value)
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
												type: "text",
												"aria-label": `${t(key)} ${t("hex")}`,
												value: draft.colors[key],
												onChange: (event) => actions.color(key, event.target.value),
												required: true,
												maxLength: 7,
												pattern: "#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})",
												spellCheck: false,
												autoComplete: "off",
												"aria-invalid": !normalized,
												"aria-describedby": !normalized ? validationId : void 0
											})]
										})]
									}, key);
								})
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							role: "tabpanel",
							className: "hex-tab-panel",
							id: `${tabsId}-panel-sidebarTab`,
							"aria-labelledby": `${tabsId}-tab-sidebarTab`,
							hidden: tab !== "sidebarTab",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
									className: "hex-color-field",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("sidebarColor") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "hex-color-row",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "color",
											"aria-label": `${t("picker")}: ${t("sidebarColor")}`,
											value: sidebarColor ?? "#000000",
											onChange: (event) => actions.sidebarColor(event.target.value)
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
											type: "text",
											"aria-label": `${t("sidebarColor")} ${t("hex")}`,
											value: draft.sidebar.color,
											onChange: (event) => actions.sidebarColor(event.target.value),
											required: true,
											maxLength: 7,
											pattern: "#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})",
											spellCheck: false,
											autoComplete: "off",
											"aria-invalid": !sidebarColor,
											"aria-describedby": !sidebarColor ? validationId : void 0
										})]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: "hex-label hex-sidebar-opacity",
									children: [
										t("sidebarOpacity"),
										" · ",
										draft.sidebar.opacity,
										"%",
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "range",
											min: 0,
											max: 100,
											step: 1,
											value: draft.sidebar.opacity,
											onChange: (event) => actions.sidebarOpacity(Number(event.target.value))
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "hex-sidebar-preview",
									style: preview,
									"aria-label": t("sidebarTab"),
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: { background: sidebarColor ? `color-mix(in srgb, ${sidebarColor} ${draft.sidebar.opacity}%, transparent)` : initialColors.surface },
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: t("sidebarTab") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("previewText") })]
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "hex-note",
									children: t("sidebarHint")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("section", {
							role: "tabpanel",
							className: "hex-tab-panel",
							id: `${tabsId}-panel-effectsTab`,
							"aria-labelledby": `${tabsId}-tab-effectsTab`,
							hidden: tab !== "effectsTab",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
								className: "hex-effects",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("effects") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "hex-label",
										children: [
											t("blur"),
											" · ",
											draft.effects.blur,
											" px",
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "range",
												min: 0,
												max: 48,
												step: 1,
												value: draft.effects.blur,
												onChange: (event) => actions.effect("blur", Number(event.target.value))
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: "hex-label",
										children: [
											t("opacity"),
											" · ",
											draft.effects.opacity,
											"%",
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												type: "range",
												min: 0,
												max: 100,
												step: 1,
												value: draft.effects.opacity,
												onChange: (event) => actions.effect("opacity", Number(event.target.value))
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", { children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: draft.effects.liquidGlass,
											onChange: (event) => actions.effect("liquidGlass", event.target.checked)
										}),
										" ",
										t("liquidGlass")
									] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "hex-note",
										children: t("effectsHint")
									})
								]
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							role: "tabpanel",
							className: "hex-tab-panel",
							id: `${tabsId}-panel-previewTab`,
							"aria-labelledby": `${tabsId}-tab-previewTab`,
							hidden: tab !== "previewTab",
							tabIndex: 0,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "hex-preview",
								"aria-label": t("preview"),
								style: preview,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: t("preview") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("previewText") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "hex-preview-action",
										children: t("previewAction")
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: "hex-contrast",
								children: colors ? `${t("contrast")}: ${ratios.map((r) => `${r.toFixed(1)}:1`).join(" · ")}. ${t(Math.min(...ratios) < 4.5 ? "contrastWarning" : "contrastGood")}` : t("invalidHex")
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							id: validationId,
							className: "hex-status",
							role: "status",
							"aria-live": "polite",
							children: message ? t(message) : !colors || !sidebarColor ? t("invalidHex") : ""
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StorageNotice, {
							useStore,
							t
						})
					]
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
				open: open && confirming,
				title: t("deleteTitle"),
				description: t("deleteDescription"),
				closeLabel: t("closeConfirmation"),
				onClose: commands.cancelDelete,
				footer: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "outline",
					onClick: commands.cancelDelete,
					"data-modal-autofocus": true,
					children: t("cancel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					variant: "primary",
					onClick: commands.delete,
					children: t("remove")
				})] })
			})] });
		}
		// src/theme/locales.ts
		const en = {
			sidebarTab: "Sidebar",
			sidebarColor: "Sidebar color",
			sidebarOpacity: "Sidebar opacity",
			sidebarHint: "Independent from panels and chat. At 100% the exact color is shown; lower opacity reveals the native macOS glass. Save to apply.",
			editorTabs: "Theme settings",
			general: "General",
			colors: "Colors",
			effectsTab: "Effects",
			previewTab: "Preview",
			effects: "Background effects",
			blur: "Backdrop blur",
			opacity: "Panel opacity",
			liquidGlass: "Liquid glass",
			effectsHint: "Check the Preview tab; save to apply. Transparency affects backgrounds, not text. Blur needs content behind the panel. Contrast checks do not include transparency.",
			section: "Custom themes",
			hint: "Choose a palette or create one with HEX colors.",
			active: "Active theme",
			open: "Create / edit theme",
			title: "Your interface, your colors.",
			intro: "Preview a palette, then save and apply it.",
			close: "Close theme editor",
			system: "System",
			light: "Light",
			dark: "Dark",
			toggle: "Light / dark",
			name: "Theme name",
			base: "Base",
			background: "Main background",
			surface: "Panels and inputs",
			text: "Text",
			accent: "Accent color",
			onAccent: "Text on accent",
			border: "Borders",
			hex: "HEX",
			picker: "Pick color",
			preview: "Palette preview",
			previewText: "Sample text, panels and accents.",
			previewAction: "Accent color",
			contrast: "Checked contrast pairs",
			contrastWarning: "Some checked pairs are below 4.5:1.",
			contrastGood: "Checked pairs meet 4.5:1; this is not a full accessibility audit.",
			invalidHex: "Enter a 3- or 6-digit HEX color, such as #8b7cf8.",
			nameRequired: "Give your theme a name.",
			saved: "Theme saved and applied!",
			applied: "Applied for this session; the browser could not save it.",
			deleted: "Theme deleted.",
			limit: "You can save up to 50 themes. Delete one before adding another.",
			storageError: "Browser storage is unavailable or full. Changes are applied, but not saved.",
			recovered: "Some stored entries were invalid. Healthy themes were recovered; original data will be backed up before the next save.",
			readOnly: "This library has an unsupported version or exceeds the safe size limit. It will not be overwritten.",
			copyNotice: "Saving a preset creates a custom copy; the original stays unchanged.",
			externalChange: "Themes changed in another tab. Your unsaved draft was kept.",
			applyError: "The theme service rejected this change. Your library was not changed.",
			save: "Save and apply",
			new: "New theme",
			remove: "Delete theme",
			cancel: "Cancel",
			closeConfirmation: "Close confirmation",
			deleteTitle: "Delete this theme?",
			deleteDescription: "This removes the custom palette from this browser. Presets are kept.",
			note: "Saved in this browser and origin (address and port). Unsaved drafts are discarded when reopening the editor."
		};
		const pt = {
			sidebarTab: "Barra lateral",
			sidebarColor: "Cor da barra lateral",
			sidebarOpacity: "Opacidade da barra lateral",
			sidebarHint: "Independente dos painéis e do chat. Em 100%, a cor é exata; com menor opacidade, o vidro nativo do macOS aparece. Salve para aplicar.",
			editorTabs: "Configurações do tema",
			general: "Geral",
			colors: "Cores",
			effectsTab: "Efeitos",
			previewTab: "Prévia",
			effects: "Efeitos de fundo",
			blur: "Desfoque do fundo",
			opacity: "Opacidade dos painéis",
			liquidGlass: "Liquid glass",
			effectsHint: "Confira a aba Prévia e salve para aplicar. A transparência afeta fundos, não textos. O blur precisa de conteúdo atrás do painel. O contraste verificado não considera transparência.",
			section: "Temas personalizados",
			hint: "Escolha uma paleta ou crie uma com cores HEX.",
			active: "Tema ativo",
			open: "Criar / editar tema",
			title: "Sua interface, suas cores.",
			intro: "Confira a prévia, depois salve e aplique a paleta.",
			close: "Fechar editor de temas",
			system: "Sistema",
			light: "Claro",
			dark: "Escuro",
			toggle: "Claro / escuro",
			name: "Nome do tema",
			base: "Base",
			background: "Fundo principal",
			surface: "Painéis e campos",
			text: "Texto",
			accent: "Cor de destaque",
			onAccent: "Texto sobre destaque",
			border: "Bordas",
			hex: "HEX",
			picker: "Selecionar cor",
			preview: "Prévia da paleta",
			previewText: "Exemplo de textos, painéis e destaques.",
			previewAction: "Cor de destaque",
			contrast: "Pares de contraste verificados",
			contrastWarning: "Alguns pares verificados estão abaixo de 4,5:1.",
			contrastGood: "Pares verificados atendem 4,5:1; não é uma auditoria completa de acessibilidade.",
			invalidHex: "Use uma cor HEX com 3 ou 6 dígitos, por exemplo #8b7cf8.",
			nameRequired: "Dê um nome ao tema.",
			saved: "Tema salvo e aplicado!",
			applied: "Aplicado nesta sessão; o navegador não conseguiu salvar.",
			deleted: "Tema excluído.",
			limit: "Limite de 50 temas salvos. Exclua um antes de adicionar outro.",
			storageError: "O armazenamento do navegador está indisponível ou cheio. As alterações são aplicadas, mas não salvas.",
			recovered: "Alguns registros eram inválidos. Temas válidos foram recuperados; os dados originais terão backup antes de salvar novamente.",
			readOnly: "A biblioteca tem versão incompatível ou excede o limite seguro. Ela não será sobrescrita.",
			copyNotice: "Salvar um tema pronto cria uma cópia personalizada; o original é preservado.",
			externalChange: "Os temas mudaram em outra aba. Seu rascunho não salvo foi preservado.",
			applyError: "O serviço de temas rejeitou a alteração. Sua biblioteca não foi modificada.",
			save: "Salvar e aplicar",
			new: "Novo tema",
			remove: "Excluir tema",
			cancel: "Cancelar",
			closeConfirmation: "Fechar confirmação",
			deleteTitle: "Excluir este tema?",
			deleteDescription: "A paleta personalizada será removida deste navegador. Os temas prontos são preservados.",
			note: "Salvo neste navegador e origem (endereço e porta). Rascunhos não salvos são descartados ao reabrir o editor."
		};
		const zh = {
			sidebarTab: "侧边栏",
			sidebarColor: "侧边栏颜色",
			sidebarOpacity: "侧边栏不透明度",
			sidebarHint: "独立于面板和聊天。100% 显示原色，降低不透明度可显示 macOS 原生玻璃。保存后应用。",
			editorTabs: "主题设置",
			general: "常规",
			colors: "颜色",
			effectsTab: "效果",
			previewTab: "预览",
			effects: "背景效果",
			blur: "背景模糊",
			opacity: "面板不透明度",
			liquidGlass: "液态玻璃",
			effectsHint: "预览后保存应用。透明度仅影响背景。模糊需要面板后方有内容。对比度检查不包含透明度。",
			section: "自定义主题",
			hint: "选择配色，或使用 HEX 颜色创建主题。",
			active: "当前主题",
			open: "创建 / 编辑主题",
			title: "你的界面，你的色彩。",
			intro: "预览配色，然后保存并应用。",
			close: "关闭主题编辑器",
			system: "跟随系统",
			light: "浅色",
			dark: "深色",
			toggle: "浅色 / 深色",
			name: "主题名称",
			base: "基础模式",
			background: "主背景",
			surface: "面板和输入框",
			text: "文字",
			accent: "强调色",
			onAccent: "强调色上的文字",
			border: "边框",
			hex: "HEX",
			picker: "选择颜色",
			preview: "配色预览",
			previewText: "文字、面板和强调色示例。",
			previewAction: "强调色",
			contrast: "已检查的对比度",
			contrastWarning: "部分已检查的配色对比度低于 4.5:1。",
			contrastGood: "已检查的配色达到 4.5:1；这不代表完整的无障碍审查。",
			invalidHex: "请输入 3 位或 6 位 HEX 颜色，例如 #8b7cf8。",
			nameRequired: "请为主题命名。",
			saved: "主题已保存并应用！",
			applied: "已在本次会话中应用；浏览器无法保存。",
			deleted: "主题已删除。",
			limit: "最多可保存 50 个主题。请先删除一个再添加。",
			storageError: "浏览器存储不可用或已满。更改已应用，但未保存。",
			recovered: "部分存储条目无效。有效主题已恢复；下次保存前会备份原始数据。",
			readOnly: "主题库版本不受支持或超出安全大小限制。不会覆盖现有数据。",
			copyNotice: "保存预设会创建自定义副本，原始预设保持不变。",
			externalChange: "另一个标签页更改了主题。未保存的草稿已保留。",
			applyError: "主题服务拒绝了此更改，主题库未被修改。",
			save: "保存并应用",
			new: "新建主题",
			remove: "删除主题",
			cancel: "取消",
			closeConfirmation: "关闭确认窗口",
			deleteTitle: "删除此主题？",
			deleteDescription: "将从此浏览器删除自定义配色，预设主题会保留。",
			note: "保存在当前浏览器和来源（地址及端口）中。重新打开编辑器时会丢弃未保存的草稿。"
		};
		// src/theme/sidebar.ts
		/** Only an explicitly saved sidebar opts into replacing native macOS tint.
		* Keeping these rules out of the stylesheet otherwise restores the host exactly.
		* CSS-module suffixes are taken from the 0.2.2-rc.1 layout/sidebar contracts.
		*/
		function sidebarOverrideCss(library) {
			if (!library.palettes.find((p) => p.id === library.selected)?.sidebar) return "";
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
`;
		}
		// src/theme/client.ts
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		/** Client composition only: contracts are imported from their owning packages. */
		function apply(ctx) {
			ctx.effect(() => {
				const disposers = [];
				const cleanup = () => {
					for (const dispose of disposers.splice(0).reverse()) dispose();
				};
				try {
					const storage = new ThemeLibraryStorage({
						getItem: (key) => window.localStorage.getItem(key),
						setItem: (key, value) => window.localStorage.setItem(key, value)
					});
					let loaded;
					let persistenceError = false;
					try {
						loaded = storage.load();
						if (window.localStorage.getItem("dsh-theme-studio:v1") === null) loaded.state.selected = ctx.theme.getTheme().preference;
					} catch {
						persistenceError = true;
						loaded = {
							state: {
								version: 1,
								selected: ctx.theme.getTheme().preference,
								palettes: []
							},
							recovered: false,
							readOnly: false
						};
					}
					const handle = createStudioStore({
						library: loaded.state,
						open: false,
						confirmingDelete: false,
						draft: draftFor(),
						message: null,
						persistenceError,
						recovered: loaded.recovered,
						readOnly: loaded.readOnly
					});
					const instance = handle.create();
					const store = {
						...handle,
						create: () => instance
					};
					const controller = new ThemeStudioController(ctx.theme, instance, storage);
					disposers.push(controller.dispose);
					const style = document.createElement("style");
					style.dataset.plugin = "dsh-theme-studio";
					style.dataset.pluginCss = "dsh-theme-studio/style.css";
					style.textContent = style_css_default;
					document.head.append(style);
					disposers.push(() => style.remove());
					disposers.push(ctx.locale.register("theme-studio", {
						en,
						pt,
						zh
					}));
					disposers.push(ctx.on("theme/change", controller.themeChanged));
					const onStorage = (event) => {
						if (event.key === "dsh-theme-studio:v1" || event.key === null) controller.storageChanged();
					};
					window.addEventListener("storage", onStorage);
					disposers.push(() => window.removeEventListener("storage", onStorage));
					controller.start();
					let previousSidebarCss;
					const syncSidebar = () => {
						const extra = sidebarOverrideCss(instance.getSnapshot().library);
						if (extra === previousSidebarCss) return;
						previousSidebarCss = extra;
						style.textContent = style_css_default + extra;
					};
					syncSidebar();
					disposers.push(instance.subscribe(syncSidebar));
					const injected = () => ({ commands: controller });
					disposers.push(ctx.slots.inject("settings.general.item", () => ctx.slots.register({
						name: "settings.general.item",
						id: "theme-studio",
						order: 10.5,
						locale: "theme-studio",
						store,
						inject: injected
					}, ThemeSettingsRow)));
					disposers.push(ctx.slots.inject("shell.overlay", () => ctx.slots.register({
						name: "shell.overlay",
						id: "theme-studio",
						locale: "theme-studio",
						store,
						inject: injected
					}, ThemeEditor)));
					return cleanup;
				} catch (error) {
					cleanup();
					throw error;
				}
			});
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map