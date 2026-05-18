#!/usr/bin/env node
/**
 * Quick guard for app/globals.css: one unclosed `{` invalidates the entire file
 * and the site renders unstyled (Safari and Chrome both drop the broken sheet).
 * Run after marquee edits: npm run check:css-braces
 */
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2] ?? "app/globals.css";
const css = fs.readFileSync(path.resolve(file), "utf8");
let depth = 0;
let line = 1;

for (let i = 0; i < css.length; i++) {
  if (css[i] === "\n") line++;
  if (css[i] === "{") depth++;
  if (css[i] === "}") {
    depth--;
    if (depth < 0) {
      console.error(`${file}: extra } at line ${line}`);
      process.exit(1);
    }
  }
}

if (depth !== 0) {
  console.error(`${file}: unclosed braces (depth ${depth})`);
  process.exit(1);
}

console.log(`${file}: brace balance OK (${line} lines)`);
