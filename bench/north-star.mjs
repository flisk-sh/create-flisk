// Measures first-load JavaScript (gzip) of the production build: the entry script index.html loads.
// Prints {value, baseline, unit} for `gel north-star --measure`. Lower is better.
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
const root = new URL("..", import.meta.url).pathname;
const bin = existsSync(root + "node_modules/.bin/vite") ? root + "node_modules/.bin/vite" : "vite";
execFileSync(bin, ["build", "--logLevel", "error"], { cwd: root, stdio: ["ignore", "inherit", "inherit"] });
const html = readFileSync(root + "dist/index.html", "utf8");
const scripts = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]).filter((u) => !/^https?:/.test(u));
const preloads = [...html.matchAll(/<link[^>]*rel="modulepreload"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
let bytes = 0;
for (const u of [...scripts, ...preloads]) bytes += gzipSync(readFileSync(root + "dist/" + u.replace(/^\/?create-flisk\//, ""))).length;
const value = Math.round((bytes / 1024) * 100) / 100;
console.log(JSON.stringify({ value, baseline: 118.95, unit: "kB gzip of first-load JS" }));
