import { chromium } from "playwright-core";

const outDir = process.env.SHOT_DIR;
const base = "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

// console/hydration error watch on the home page
const errCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const errPage = await errCtx.newPage();
const errors = [];
errPage.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
errPage.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 120)));
await errPage.goto(base + "/zh/", { waitUntil: "networkidle" });
await errPage.goto(base + "/en/", { waitUntil: "networkidle" });
console.log("console errors:", errors.length ? errors : "none");
await errCtx.close();

// desktop shots + nav active state
const d = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await d.newPage();
await p.goto(base + "/zh/", { waitUntil: "networkidle" });
await p.screenshot({ path: `${outDir}/re-home-zh.png`, fullPage: true });
await p.emulateMedia({ colorScheme: "dark" });
await p.reload({ waitUntil: "networkidle" });
await p.screenshot({ path: `${outDir}/re-home-zh-dark.png` });
await p.emulateMedia({ colorScheme: "light" });

await p.goto(base + "/en/", { waitUntil: "networkidle" });
await p.screenshot({ path: `${outDir}/re-home-en.png` });

// active nav on guide page
await p.goto(base + "/zh/guide/", { waitUntil: "networkidle" });
const active = await p.locator('nav a[aria-current="page"]').first().textContent();
console.log("active nav on /zh/guide/:", JSON.stringify(active));

// hero CTAs resolve
await p.goto(base + "/zh/", { waitUntil: "networkidle" });
for (const sel of ['a.btn-primary', 'a.btn-secondary']) {
  const href = await p.locator(sel).first().getAttribute("href");
  console.log(sel, "→", href);
}
const h1 = await p.locator("h1").textContent();
console.log("home h1:", h1.trim().slice(0, 60));
console.log("h1 count:", await p.locator("h1").count());

// modes 2x2
await p.goto(base + "/zh/modes/", { waitUntil: "networkidle" });
await p.screenshot({ path: `${outDir}/re-modes-zh.png` });
await d.close();

// mobile: hamburger behaviour + widths
const widths = [360, 390, 768];
for (const w of widths) {
  const m = await browser.newContext({ viewport: { width: w, height: 780 } });
  const mp = await m.newPage();
  await mp.goto(base + "/zh/", { waitUntil: "networkidle" });
  const ov = await mp.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  console.log(`overflow @${w}px:`, ov);
  if (w === 390) {
    await mp.screenshot({ path: `${outDir}/re-home-zh-390.png`, fullPage: true });
    // hamburger open/close
    const btn = mp.locator('button[aria-controls="mobile-nav-panel"]');
    console.log("hamburger visible:", await btn.isVisible());
    await btn.click();
    console.log("aria-expanded after open:", await btn.getAttribute("aria-expanded"));
    await mp.screenshot({ path: `${outDir}/re-mobile-menu.png` });
    const linkCount = await mp.locator('#mobile-nav-panel a').count();
    console.log("mobile menu links:", linkCount);
    await mp.keyboard.press("Escape");
    console.log("aria-expanded after Esc:", await btn.getAttribute("aria-expanded"));
    // navigate via menu
    await btn.click();
    await mp.locator('#mobile-nav-panel a', { hasText: "術語辭典" }).click();
    await mp.waitForURL("**/zh/glossary/**");
    console.log("mobile nav navigation → glossary OK");
  }
  await m.close();
}

// og image reference present
const c2 = await browser.newContext();
const p2 = await c2.newPage();
await p2.goto(base + "/zh/", { waitUntil: "domcontentloaded" });
const og = await p2.locator('meta[property="og:image"]').getAttribute("content");
const tw = await p2.locator('meta[name="twitter:card"]').getAttribute("content");
console.log("og:image:", og, "| twitter:card:", tw);
await c2.close();

await browser.close();
console.log("done");
