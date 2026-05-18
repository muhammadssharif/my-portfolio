/**
 * CI/local check: production CSS bundle contains theme tokens and Tailwind utilities.
 * Run after `npm run build`.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const chunksDir = join(process.cwd(), ".next/static/chunks");
const cssFiles = readdirSync(chunksDir).filter((f) => f.endsWith(".css"));
if (cssFiles.length === 0) {
  console.error("No CSS chunks in .next/static/chunks — run npm run build first");
  process.exit(1);
}

const css = cssFiles.map((f) => readFileSync(join(chunksDir, f), "utf8")).join("\n");
const checks = [
  { name: "theme token --bg", pattern: /--bg:/ },
  { name: "data-theme selector", pattern: /\[data-theme=/ },
  { name: "tailwind .block utility", pattern: /\.block\s*\{[^}]*display:\s*block/ },
  { name: "display-title class", pattern: /\.display-title\s*\{/ }
];

const missing = checks.filter((c) => !c.pattern.test(css));
if (missing.length) {
  console.error("Style bundle verification failed:");
  for (const m of missing) console.error(`  - missing ${m.name}`);
  process.exit(1);
}

console.log(`Style bundle OK (${cssFiles.length} file(s), ${checks.length} checks passed)`);
