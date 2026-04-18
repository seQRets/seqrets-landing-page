#!/usr/bin/env node
/**
 * Postbuild: inject SHA-256 hashes for inline <script> blocks into the
 * Content-Security-Policy header.
 *
 * vite-react-ssg emits two inline scripts per prerendered page:
 *   1. window.__staticRouterHydrationData = JSON.parse(...)
 *   2. window.__VITE_REACT_SSG_HASH__ = '<build-hash>'
 *
 * The second one's content changes every build, so the CSP must allow them
 * via per-build SHA-256 hashes rather than a hardcoded list. Without this,
 * the strict CSP in public/_headers blocks them and React hydration fails:
 * routes can't find their loader manifest, framer-motion's whileInView
 * animations never attach, and the page silently breaks.
 *
 * This script:
 *   - Reads every dist/**\/*.html file
 *   - Extracts every inline <script> block (those without a src= attribute)
 *   - Computes a SHA-256 of each script body
 *   - Injects the resulting 'sha256-...' tokens into the script-src directive
 *     of dist/_headers
 *
 * Run automatically after `npm run build`.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const DIST_DIR = "dist";
const HEADERS_PATH = join(DIST_DIR, "_headers");
const INLINE_SCRIPT_RE = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;

function walkHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkHtml(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function sha256Base64(body) {
  return createHash("sha256").update(body, "utf8").digest("base64");
}

const htmlFiles = walkHtml(DIST_DIR);
const hashes = new Set();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(INLINE_SCRIPT_RE)) {
    const body = match[1];
    if (body.trim().length === 0) continue;
    hashes.add(`'sha256-${sha256Base64(body)}'`);
  }
}

if (hashes.size === 0) {
  console.log("[csp-hashes] No inline scripts found — nothing to inject.");
  process.exit(0);
}

const headerLines = readFileSync(HEADERS_PATH, "utf8");
const hashTokens = [...hashes].join(" ");

const updated = headerLines.replace(
  /(script-src\s+[^;]*?)(\s*;)/,
  (full, directive, terminator) => {
    // Skip if already injected
    if (directive.includes("sha256-")) {
      return `${directive.replace(/\s+'sha256-[^']+'/g, "")} ${hashTokens}${terminator}`;
    }
    return `${directive} ${hashTokens}${terminator}`;
  }
);

if (updated === headerLines) {
  console.error("[csp-hashes] Failed to find script-src directive in _headers — nothing changed.");
  process.exit(1);
}

writeFileSync(HEADERS_PATH, updated);
console.log(
  `[csp-hashes] Injected ${hashes.size} SHA-256 hash${hashes.size === 1 ? "" : "es"} for inline scripts across ${htmlFiles.length} HTML file${htmlFiles.length === 1 ? "" : "s"}.`
);
for (const h of hashes) console.log(`  ${h}`);
