# Third-party notices

The repository's MIT license covers Edgar Santiago's original plugin code, documentation and metadata icon, not third-party works or trademarks.

## Adapted palette selections

The six-color presets in `src/theme/palette.ts` are limited adaptations, not full upstream themes. Some foreground/accent choices were adjusted for this editor's contrast pairs. No upstream implementation is bundled. The original palette names identify their respective projects and do not imply affiliation or endorsement.

| Preset | Original project | Retained copyright notice | License |
| --- | --- | --- | --- |
| Dracula | https://github.com/dracula/dracula-theme | Copyright (c) 2023 Dracula Theme | MIT |
| Nord | https://github.com/nordtheme/nord | Copyright (c) 2016-present Sven Greb <development@svengreb.de> (https://www.svengreb.de) | MIT |
| Tokyo Night | https://github.com/enkia/tokyo-night-vscode-theme | Copyright (c) 2018-present Enkia | MIT |
| Catppuccin Mocha | https://github.com/catppuccin/catppuccin | Copyright (c) 2021 Catppuccin | MIT |
| Rosé Pine Dawn | https://github.com/rose-pine/palette | Copyright (c) mvllow | MIT |
| Solarized Light | https://github.com/altercation/solarized | Copyright (c) 2011 Ethan Schoonover | MIT |

Unmodified upstream license texts are included in `licenses/`. These notices and license texts must accompany redistributed presets. The plugin author's MIT license does not replace them.

## Harness and development dependencies

React and the Harness store/UI primitives are provided by the running Harness through its module table and are not bundled into the runtime artifacts. The plugin uses their public APIs and theme tokens. The build configuration adapts the upstream Client ModuleLoader format; DeepSeek Harness's SDK is MIT-licensed by DeepSeek. Dependency licenses remain with their owners in the installed packages; `node_modules` and test/browser output are not part of this source distribution.

DeepSeek and the referenced theme names/brands remain the property of their respective owners. This is an independent community plugin, not an official DeepSeek product.
