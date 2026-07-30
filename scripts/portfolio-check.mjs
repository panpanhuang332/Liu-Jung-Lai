/**
 * Post-build checks for the multi-paper portfolio (run against out/ served
 * at localhost:4180): Paper B full text, new routes, language switch, dark
 * mode, and mobile overflow.
 */
import { chromium } from "playwright-core";

const base = "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

let fail = 0;
const ok = (name, cond) => {
  console.log(`${cond ? "✓" : "✗"} ${name}`);
  if (!cond) fail++;
};

// new routes render with one h1
for (const p of [
  "/zh/", "/en/", "/zh/papers/", "/en/papers/",
  "/zh/papers/enablement-narrative-backfire/",
  "/zh/papers/integration-replaceability-paradox/",
  "/zh/papers/integration-replaceability-paradox/full-text/",
  "/en/papers/integration-replaceability-paradox/full-text/",
  "/zh/questions/", "/en/questions/", "/zh/qa/", "/en/qa/", "/zh/about/", "/en/about/",
]) {
  await page.goto(base + p, { waitUntil: "networkidle" });
  const h1 = await page.locator("h1").count();
  ok(`${p} loads, h1=1`, h1 === 1);
}

// Paper B: hypothesis anchor + toc + figure
await page.goto(base + "/zh/papers/integration-replaceability-paradox/full-text/#prop-h1a", {
  waitUntil: "networkidle",
});
ok("Paper B anchor #prop-h1a exists", (await page.locator("#prop-h1a").count()) === 1);
ok("Paper B appendix anchor exists", (await page.locator("#appendix-a").count()) === 1);
ok("Paper B figure rendered", (await page.locator("img[src*='paper-b-figure1']").count()) >= 1);

// bilingual toggle on Paper B
const toggle = page.locator("button[aria-pressed]").first();
await toggle.click();
const bl = await page.locator("[data-paper-root]").getAttribute("data-bilingual");
ok("Paper B bilingual toggle turns on", bl === "on");

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

// mobile overflow on Paper B full text + home
const mctx = await browser.newContext({ viewport: { width: 375, height: 720 } });
const mp = await mctx.newPage();
for (const p of ["/zh/", "/zh/papers/", "/zh/papers/integration-replaceability-paradox/full-text/"]) {
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
