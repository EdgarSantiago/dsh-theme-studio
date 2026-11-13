import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('package.json', root), 'utf8'))

test('private package declares both bundle and standalone client roles', () => {
  assert.equal(manifest.name, 'dsh-theme-studio')
  assert.equal(manifest.private, true)
  assert.equal(manifest.dsh.manifestVersion, 1)
  assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml')
  assert.equal(manifest.dsh.client.platform, 'web')
  assert.equal(manifest.exports['./cordis.patch.yml'], manifest.dsh.bundle.patch)
  assert.ok(manifest.files.includes('cordis.patch.yml'))
  for (const hook of ['install', 'postinstall', 'prepare', 'prepack']) assert.equal(manifest.scripts[hook], undefined)
  assert.equal(manifest.scripts.pretest, 'npm run build')
  for (const dependencies of [manifest.dependencies, manifest.devDependencies, manifest.peerDependencies]) {
    assert.equal(dependencies?.['@deepseek-ai/dsh'], undefined)
    assert.equal(dependencies?.['@deepseek-ai/dsh-cli'], undefined)
  }
})

test('public source distribution keeps identity, metadata, licenses and prebuilt runtime resources', async () => {
  assert.equal(manifest.version, '0.4.0')
  assert.equal(manifest.license, 'MIT')
  assert.equal(manifest.repository.url, 'https://github.com/EdgarSantiago/dsh-theme-studio.git')
  assert.equal(manifest.engines.dsh, '>=0.2.2-rc.1 <0.2.3-0')
  assert.ok(manifest.keywords.includes('dsh-plugin'))
  const client = await readFile(new URL(manifest.exports['./client'], root), 'utf8')
  assert.doesNotMatch(client, /(?:\/Users\/|\/home\/|[A-Z]:\\\\Users\\\\)/)
  assert.match(client, /harness-plugin-css:src\/theme\/style\.css\.mjs/)
  for (const artifact of ['client.js', 'client.js.map', 'host.js', 'host.js.map']) {
    const content = await readFile(new URL(`dist/${artifact}`, root), 'utf8')
    assert.doesNotMatch(content, /(?:\/Users\/|\/home\/|[A-Z]:\\\\Users\\\\)/, artifact)
  }
  assert.equal(manifest.exports['./icon'], './icon.svg')
  assert.ok(!(await readFile(new URL('.gitignore', root), 'utf8')).split(/\r?\n/).includes('dist/'))
  for (const file of ['icon.svg', 'LICENSE', 'THIRD_PARTY.md']) assert.ok(manifest.files.includes(file))
  for (const tag of ['en', 'pt', 'pt-BR', 'zh', 'ja', 'es', 'fr', 'de', 'ru']) {
    const locale = JSON.parse(await readFile(new URL(`locale/${tag}.json`, root), 'utf8'))
    assert.ok(locale.meta.title && locale.meta.description)
  }
})

test('bundle patch inserts this package with the documented Cordis id', async () => {
  const patch = await readFile(new URL(manifest.dsh.bundle.patch, root), 'utf8')
  assert.equal(patch, '- insert:\n    - id: theme-studio\n      name: dsh-theme-studio\n')
})

test('controlled 0.2.2 admission stays consistent across release metadata', async () => {
  const lock = JSON.parse(await readFile(new URL('package-lock.json', root), 'utf8'))
  assert.deepEqual(lock.packages[''].engines, manifest.engines)
  assert.deepEqual(lock.packages[''].peerDependencies, manifest.peerDependencies)
  assert.deepEqual(lock.packages[''].devDependencies, manifest.devDependencies)
  const readme = await readFile(new URL('README.md', root), 'utf8')
  assert.ok(readme.includes(`\`${manifest.engines.dsh}\``))
  assert.ok(readme.includes('excludes 0.2.3, including its prereleases'))
  assert.ok(!readme.includes('0.2.2-rc.1 || 0.2.2-rc.2'))
  for (const [name, version] of Object.entries(manifest.devDependencies)) {
    if (name.startsWith('@deepseek-ai/dsh-')) assert.equal(version, '0.2.2-rc.1', name)
  }
})

const screenshotNames = ['theme-studio-open-editor.png', 'theme-studio-general.png', 'theme-studio-colors.png']

test('README screenshots are local PNG resources with readable alternative text', async () => {
  assert.ok(manifest.files.includes('docs/images/*.png'))
  const readme = await readFile(new URL('README.md', root), 'utf8')
  assert.match(readme, /Create \/ edit theme.*highlighted in red/)
  for (const name of screenshotNames) {
    const path = `docs/images/${name}`
    assert.ok(readme.includes(`](<${path}>)`), path)
    const bytes = await readFile(new URL(path, root))
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], name)
    assert.ok(bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0, name)
  }
})

test('npm package ships its declared patch and prebuilt standalone entry points', () => {
  // pretest already built the SDK bundles; avoid recursively invoking prepack here.
  const output = execFileSync('npm', ['--cache', 'node_modules/.cache/npm', 'pack', '--dry-run', '--ignore-scripts', '--json'], {
    cwd: fileURLToPath(root), encoding: 'utf8', timeout: 60_000,
  })
  const [packed] = JSON.parse(output) as { name: string; files: { path: string }[] }[]
  assert.equal(packed!.name, manifest.name)
  const files = new Set(packed!.files.map(file => file.path))
  for (const path of [manifest.dsh.bundle.patch, manifest.main, manifest.exports['./client']]) {
    assert.ok(files.has(path.replace(/^\.\//, '')), `Missing package artifact: ${path}`)
  }
  for (const path of ['package.json', 'icon.svg', 'LICENSE', 'THIRD_PARTY.md', 'licenses/dracula-MIT.txt', 'licenses/nord-MIT.txt', 'licenses/tokyo-night-MIT.txt', 'licenses/catppuccin-MIT.txt', 'licenses/rose-pine-MIT.txt', 'licenses/solarized-MIT.txt']) assert.ok(files.has(path), path)
  assert.ok(![...files].some(path => /node_modules|test-results|\.tgz$|\.log$/.test(path)))
  for (const tag of ['en', 'pt', 'pt-BR', 'zh', 'ja', 'es', 'fr', 'de', 'ru']) assert.ok(files.has(`locale/${tag}.json`), tag)
  for (const file of ['client.js', 'client.js.map', 'host.js', 'host.js.map']) assert.ok(files.has(`dist/${file}`), file)
  for (const name of screenshotNames) assert.ok(files.has(`docs/images/${name}`), name)
})
