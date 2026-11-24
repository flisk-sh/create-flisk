import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { gzipSync } from "node:zlib";

test("measures the bundle when the checkout path contains spaces and a percent sign", {
  skip: process.platform === "win32" ? "fixture uses a POSIX Vite shim" : false,
}, (t) => {
  const root = mkdtempSync(join(tmpdir(), "create-flisk north star % "));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "bench"));
  mkdirSync(join(root, "dist"));
  mkdirSync(join(root, "node_modules", ".bin"), { recursive: true });
  copyFileSync(new URL("./north-star.mjs", import.meta.url), join(root, "bench", "north-star.mjs"));

  const entry = "console.log('ready');";
  writeFileSync(join(root, "dist", "index.html"), '<script src="/create-flisk/entry.js"></script>');
  writeFileSync(join(root, "dist", "entry.js"), entry);
  writeFileSync(join(root, "node_modules", ".bin", "vite"), '#!/bin/sh\n[ "$1" = build ] && [ -f dist/index.html ]\n', {
    mode: 0o755,
  });

  const output = execFileSync(process.execPath, [join(root, "bench", "north-star.mjs")], { encoding: "utf8" });
  assert.equal(JSON.parse(output).value, Math.round((gzipSync(entry).length / 1024) * 100) / 100);
});
