import { chromium } from "playwright-core";

const outDir = process.env.SHOT_DIR;
const base = "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();

await page.goto(base + "/zh/paper/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/paper-zh-top.png` });

// TOC scroll-spy: jump to §2.4 and check highlight
await page.click('nav a[href="#s-2-4"]');
await page.waitForTimeout(2200);
const active = await page.getAttribute('nav a[aria-current="location"]', "href").catch(() => null);
console.log("toc active after jump to #s-2-4:", active);

// citation tooltip: hover the first cite link
const firstCite = page.locator("a.cite").first();
console.log("cite count:", await page.locator("a.cite").count());
await firstCite.hover();
const tipVisible = await firstCite.locator(".cite-tip").isVisible();
console.log("tooltip visible on hover:", tipVisible);
await page.screenshot({ path: `${outDir}/paper-zh-cite-tooltip.png` });

// citation click jumps to references
const href = await firstCite.getAttribute("href");
await firstCite.click();
await page.waitForTimeout(400);
const target = await page.evaluate((h) => {
  const el = document.querySelector(h);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: Math.round(r.top), text: el.textContent.slice(0, 60) };
}, href);
console.log("citation jump target:", href, target);

// bilingual mode
await page.goto(base + "/zh/paper/#s-2-3-1", { waitUntil: "networkidle" });
await page.click('button[aria-pressed]');
await page.waitForTimeout(300);
const bilingual = await page.getAttribute("[data-paper-root]", "data-bilingual");
console.log("bilingual attr:", bilingual);
await page.screenshot({ path: `${outDir}/paper-zh-bilingual.png` });
// persists?
await page.reload({ waitUntil: "networkidle" });
console.log("bilingual after reload:", await page.getAttribute("[data-paper-root]", "data-bilingual"));

// lightbox
await page.goto(base + "/zh/paper/#s-3-1", { waitUntil: "networkidle" });
await page.click('button[aria-label*="圖 1"]');
await page.waitForTimeout(300);
console.log("lightbox dialog:", await page.locator('[role="dialog"]').count());
await page.screenshot({ path: `${outDir}/paper-zh-lightbox.png` });
await page.keyboard.press("Escape");
console.log("lightbox after Esc:", await page.locator('[role="dialog"]').count());

// language switch preserves section anchor
await page.goto(base + "/zh/paper/#s-2-4", { waitUntil: "networkidle" });
await page.click('a[aria-label*="切換語言"]');
await page.waitForURL("**/en/paper/**");
console.log("lang switch →", page.url());

await ctx.close();

// mobile: tables as cards, no horizontal scroll
const m = await browser.newContext({ viewport: { width: 375, height: 720 } });
const mp = await m.newPage();
await mp.goto(base + "/zh/paper/#s-3-4", { waitUntil: "networkidle" });
await mp.waitForTimeout(400);
const overflow = await mp.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
console.log("mobile horizontal overflow px:", overflow);
await mp.screenshot({ path: `${outDir}/paper-zh-mobile-table3.png` });
await mp.goto(base + "/zh/paper/", { waitUntil: "networkidle" });
await mp.screenshot({ path: `${outDir}/paper-zh-mobile-top.png` });
await m.close();

await browser.close();
console.log("done");
