/**
 * Post-build checks for the multi-paper portfolio (run against out/ served
 * at localhost:4180): new routes, Paper B embargo, language switch, dark
 * mode, and mobile overflow. Also greps out/ for embargoed-material leaks.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const base = "http://localhost:4180";
let fail = 0;
const ok = (name, cond) => {
  console.log(`${cond ? "✓" : "✗"} ${name}`);
  if (!cond) fail++;
};

// --- static embargo scan: no experimental-material strings anywhere in out/ ---
const leakMarkers = [
  "Meridian", // scenario company (Appendix A)
  "Atlas",    // scenario system (Appendix A / example items)
  "IMC1", "CMC1", "PRR1", "RTe1", // check/item codes
  "Not stated", // attention-check answer
  "H1a.", // formal hypothesis statements
  "prop-h1a",
];
const leaks = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(html|txt|xml|js)$/.test(f)) {
      const txt = fs.readFileSync(p, "utf8");
      for (const m of leakMarkers) if (txt.includes(m)) leaks.push(`${p}: ${m}`);
    }
  }
})("out");
ok(`embargo scan: no material markers in out/ (${leaks.length} hits)`, leaks.length === 0);
if (leaks.length) console.log(leaks.slice(0, 10).join("\n"));

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

// new routes render with one h1
for (const p of [
  "/zh/", "/en/", "/zh/papers/", "/en/papers/",
  "/zh/papers/enablement-narrative-backfire/",
  "/zh/papers/integration-replaceability-paradox/",
  "/en/papers/integration-replaceability-paradox/",
  "/zh/questions/", "/en/questions/", "/zh/qa/", "/en/qa/", "/zh/about/", "/en/about/",
]) {
  await page.goto(base + p, { waitUntil: "networkidle" });
  const h1 = await page.locator("h1").count();
  ok(`${p} loads, h1=1`, h1 === 1);
}

// Paper B overview: embargo notice shown, no figures, no full-text link, confirmed byline
await page.goto(base + "/zh/papers/integration-replaceability-paradox/", { waitUntil: "networkidle" });
ok("Paper B embargo notice", (await page.locator("text=暫不公開").count()) >= 1);
ok("Paper B no figures", (await page.locator("article img").count()) === 0);
ok("Paper B no full-text link", (await page.locator("a[href*='full-text']").count()) === 0);
ok("Paper B byline 賴柳蓉", (await page.locator("text=賴柳蓉").count()) >= 1);
ok("Paper B no pending-byline text", (await page.locator("text=待作者確認").count()) === 0 && (await page.locator("text=Eric Lai").count()) === 0);

// full-text route must be gone (404 page served)
const resp = await page.goto(base + "/zh/papers/integration-replaceability-paradox/full-text/", { waitUntil: "networkidle" });
ok("Paper B full-text route removed (404)", resp.status() === 404);

// language switch keeps path
await page.goto(base + "/zh/papers/integration-replaceability-paradox/", { waitUntil: "networkidle" });
await page.locator("header a:has-text('English')").click();
await page.waitForURL("**/en/papers/integration-replaceability-paradox/**", { timeout: 10000 });
ok("language switch keeps page", page.url().includes("/en/papers/integration-replaceability-paradox"));

// qa page: filter buttons + empty state (zh)
await page.goto(base + "/zh/qa/", { waitUntil: "networkidle" });
ok("QA filter buttons", (await page.locator("button[aria-pressed]").count()) === 4);
ok("QA empty state", (await page.locator("text=目前尚無公開問答").count()) === 1);

// questions page: no iframe while disabled, preparing notice shown
await page.goto(base + "/zh/questions/", { waitUntil: "networkidle" });
ok("questions: no iframe when disabled", (await page.locator("iframe").count()) === 0);
ok("questions: preparing notice", (await page.locator("text=準備中").count()) >= 1);

// about: no broken img (placeholder shown when photo absent)
await page.goto(base + "/zh/about/", { waitUntil: "networkidle" });
const brokenImgs = await page.$$eval("img", (els) =>
  els.filter((i) => i.complete && i.naturalWidth === 0).length
);
ok("about: no broken images", brokenImgs === 0);

// mobile overflow
const mctx = await browser.newContext({ viewport: { width: 375, height: 720 } });
const mp = await mctx.newPage();
for (const p of ["/zh/", "/zh/papers/", "/zh/papers/integration-replaceability-paradox/"]) {
  await mp.goto(base + p, { waitUntil: "networkidle" });
  const overflow = await mp.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  ok(`mobile no horizontal overflow ${p} (${overflow}px)`, overflow <= 0);
}

// dark mode renders on Paper B overview
await mp.emulateMedia({ colorScheme: "dark" });
await mp.goto(base + "/zh/papers/integration-replaceability-paradox/", { waitUntil: "networkidle" });
const dark = await mp.evaluate(() => document.documentElement.classList.contains("dark"));
ok("dark mode class applied", dark);

await browser.close();
console.log(fail === 0 ? "portfolio-check: all passed" : `portfolio-check: ${fail} FAILED`);
process.exit(fail === 0 ? 0 : 1);
