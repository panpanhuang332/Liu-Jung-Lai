/**
 * Post-build link & anchor checker over out/.
 * - Collects every internal href (page links and #anchors) from all HTML files
 * - Verifies target pages exist in out/ and target element ids exist in the page
 * - Reports external links (listed, not fetched) and missing meta tags
 */
import fs from "node:fs";
import path from "node:path";

const OUT = "out";
const htmlFiles = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) htmlFiles.push(p);
  }
})(OUT);

const pages = new Map(); // url path -> { ids:Set, links:[{href, file}] }
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const links = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map((m) => m[1]);
  let url = "/" + path.relative(OUT, file).replace(/\\/g, "/");
  url = url.replace(/index\.html$/, "").replace(/\.html$/, "/");
  pages.set(url, { ids, links, file });
}

// When the build used a GitHub Pages basePath, internal hrefs carry the
// prefix but out/ paths do not — strip it before matching.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function resolve(href, fromUrl) {
  if (href.startsWith("http") || href.startsWith("mailto:")) return { external: true, href };
  let [p, hash] = href.split("#");
  if (BASE && (p === BASE || p.startsWith(BASE + "/"))) p = p.slice(BASE.length) || "/";
  if (p === "") p = fromUrl; // same-page anchor
  if (!p.startsWith("/")) p = path.posix.join(fromUrl, p);
  if (!p.endsWith("/") && !p.includes(".")) p += "/";
  return { external: false, page: p, hash };
}

const broken = [];
const externals = new Set();
let checked = 0;
for (const [url, { links }] of pages) {
  for (const href of links) {
    const r = resolve(href, url);
    if (r.external) {
      externals.add(r.href);
      continue;
    }
    checked++;
    const target = pages.get(r.page);
    if (!target) {
      // static assets (e.g. /figures/...) are fine if the file exists
      const asset = path.join(OUT, r.page.replace(/\/$/, ""));
      if (!fs.existsSync(asset)) broken.push(`[${url}] → ${href} （頁面不存在）`);
      continue;
    }
    if (r.hash && !target.ids.has(r.hash)) {
      broken.push(`[${url}] → ${href} （錨點 #${r.hash} 不存在）`);
    }
  }
}

// meta audit per page
const metaIssues = [];
for (const [url, { file }] of pages) {
  if (url === "/" || url.startsWith("/404")) continue; // static redirect/404 pages
  const html = fs.readFileSync(file, "utf8");
  const need = [
    ["<title>", /<title[^>]*>[^<]+<\/title>/],
    ["meta description", /<meta name="description" content="[^"]+"/],
    ["og:title", /<meta property="og:title"/],
    ["hreflang zh-Hant", /hrefLang="zh-Hant"/i],
    ["hreflang en", /hrefLang="en"/i],
    ["canonical", /rel="canonical"/],
    ["JSON-LD", /application\/ld\+json/],
    ["html lang", /<html[^>]+lang="(zh-Hant|en)"/],
  ];
  for (const [name, re] of need) {
    if (!re.test(html)) metaIssues.push(`[${url}] 缺 ${name}`);
  }
}

console.log("HTML pages:", pages.size);
console.log("internal link+anchor checks:", checked);
console.log("broken:", broken.length);
broken.forEach((b) => console.log("  ✗", b));
console.log("meta issues:", metaIssues.length);
metaIssues.forEach((m) => console.log("  ✗", m));
console.log("external links (not fetched):");
[...externals].sort().forEach((e) => console.log("  -", e));
