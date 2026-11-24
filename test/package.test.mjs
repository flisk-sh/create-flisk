import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';

const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const dir = mkdtempSync(join(tmpdir(), 'create-flisk-test-'));
const env = { ...process.env, npm_config_cache: join(dir, 'cache') };
/** @type {{ name: string, filename: string, files: { path: string }[] }} */
let report;

after(() => rmSync(dir, { recursive: true, force: true }));
before(() => {
  const output = execFileSync('npm', ['pack', '--json', '--loglevel=error', '--ignore-scripts', '--pack-destination', dir], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
    env,
  });
  const reports = JSON.parse(output);
  report = Array.isArray(reports) ? reports[0] : Object.values(reports)[0];
});

test('npm can run the packed executable and it points to the Flisk scaffolder', () => {
  assert.equal(typeof manifest.bin?.['create-flisk'], 'string', 'missing create-flisk executable');
  const output = execFileSync('npm', ['exec', '--offline', '--yes', `--package=${join(dir, report.filename)}`, '--', 'create-flisk'], {
    cwd: dir,
    encoding: 'utf8',
    env,
  });
  assert.match(output, /npx create-microservices\b/);
});

test('the registry archive contains only the launcher and package metadata', () => {
  assert.equal(report.name, 'create-flisk');
  assert.equal(report.filename, `create-flisk-${manifest.version}.tgz`);
  assert.deepEqual(report.files.map(({ path }) => path).sort(), [
    'LICENSE', 'README.md', 'bin/create-flisk.js', 'package.json',
  ]);
  assert.deepEqual(manifest.dependencies ?? {}, {});
});
