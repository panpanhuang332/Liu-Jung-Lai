import { chromium } from "playwright-core";

const outDir = process.env.SHOT_DIR;
const base = "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();

// guide
await page.goto(base + "/zh/guide/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/guide-zh-top.png` });
const guideLinks = await page.locator('a[href*="/paper/#"]').count();
console.log("guide → paper anchor links:", guideLinks);

// mechanisms: expand a driver card
await page.goto(base + "/zh/mechanisms/", { waitUntil: "networkidle" });
await page.click("details >> nth=1 >> summary");
await page.waitForTimeout(200);
await page.screenshot({ path: `${outDir}/mech-zh-cards.png` });

// diagram: click node, toggle trajectory
await page.locator('svg g[role="button"]', { hasText: "防衛性採用" }).click();
await page.waitForTimeout(200);
const defShown = await page.locator("text=為維持不可或缺").count();
console.log("node definition panel shows defensive adoption:", defShown > 0);
await page.locator('button[aria-pressed]', { hasText: "逆轉" }).click();
await page.waitForTimeout(300);
await page.locator("svg.diag").scrollIntoViewIfNeeded();
await page.screenshot({ path: `${outDir}/mech-zh-diagram-reverse.png` });
const dimCount = await page.locator("svg .diag-dim").count();
const hlCount = await page.locator("svg .diag-hl").count();
console.log("trajectory highlight: dimmed =", dimCount, ", highlighted =", hlCount);

// keyboard access on a node
await page.keyboard.press("Tab");
console.log("focusable nodes present:", await page.locator('svg g[tabindex="0"]').count());

// propositions: filters
await page.goto(base + "/zh/propositions/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/props-zh-table.png` });
const rows0 = await page.locator("table tbody tr").count();
await page.locator("button", { hasText: "機制二" }).click();
await page.waitForTimeout(200);
const rows1 = await page.locator("table tbody tr").count();
await page.locator("button", { hasText: "邊界條件" }).click();
await page.waitForTimeout(200);
const rows2 = await page.locator("table tbody tr").count();
console.log(`propositions filter: all=${rows0}, mech2=${rows1}, mech2+boundary=${rows2}`);
await page.screenshot({ path: `${outDir}/props-zh-filtered.png` });

await ctx.close();

// mobile checks
const m = await browser.newContext({ viewport: { width: 375, height: 720 } });
const mp = await m.newPage();
for (const p of ["/zh/guide/", "/zh/mechanisms/", "/zh/propositions/"]) {
  await mp.goto(base + p, { waitUntil: "networkidle" });
  const ov = await mp.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  console.log(`mobile overflow ${p}: ${ov}px`);
}
await mp.goto(base + "/zh/propositions/", { waitUntil: "networkidle" });
await mp.screenshot({ path: `${outDir}/props-zh-mobile.png` });
await m.close();
await browser.close();
console.log("done");
