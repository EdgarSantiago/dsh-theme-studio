# Verification scope

This file is a scope statement, not a security certification or a current vulnerability count.

## Supported runtime

The public release candidate targets only DeepSeek Harness `0.2.2-rc.1` and `0.2.2-rc.2`. Development SDK packages remain pinned to rc.1. The rc.2 compatibility pass checked the installed runtime and live settings registration; visual/browser interaction coverage is limited as explained in the README.

## Reproducible checks

```sh
npm ci
npm test
npm run build
npm pack --dry-run --ignore-scripts --json
```

The build typechecks Host, Client, tests and tooling. Node tests cover real palette/controller logic plus compiled Client lifecycle contracts with test doubles, not a live browser. The release pack check verifies the prebuilt runtime, icon, display locales, license and palette attributions. Publication preparation does not run a Harness server or modify an installed profile.

## Security boundaries

The runtime is a browser-side customization feature. It uses local browser storage, the native theme service and additive settings/overlay slots. It does not add model tools, external network services or a filesystem API. That feature scope is not a security sandbox: a plugin runs with the trust of its host, and separate dependency/Host review is still required.

No current npm vulnerability scan is claimed here. Historical vulnerability counts from an unrelated combined development tree were removed because they were not evidence about this release candidate. Maintainers can run `npm audit --json` and `npm audit --omit=dev --json` separately, date the results, and evaluate fixes with compatibility tests; do not infer that an empty production dependency tree makes the running Harness secure.
