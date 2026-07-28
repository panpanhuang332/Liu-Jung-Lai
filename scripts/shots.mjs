import { chromium } from "playwright-core";

const outDir = process.env.SHOT_DIR;
const base = "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

async function shot(name, url, { width = 1280, height = 900, dark = false } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: dark ? "dark" : "light",
  });
  const page = await ctx.newPage();
  await page.goto(base + url, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  await ctx.close();
}

await shot("home-zh-light", "/zh/");
await shot("home-zh-dark", "/zh/", { dark: true });
await shot("home-en-light", "/en/");
await shot("home-zh-mobile375", "/zh/", { width: 375, height: 720 });
await shot("about-zh-light", "/zh/about/");
await shot("about-en-dark-mobile", "/en/about/", { width: 375, height: 720, dark: true });

// functional checks
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

// 1) root redirect by browser language (zh default)
await page.goto(base + "/", { waitUntil: "networkidle" });
console.log("root redirect →", page.url());

// 2) html lang
await page.goto(base + "/zh/about/", { waitUntil: "networkidle" });
console.log("lang zh:", await page.getAttribute("html", "lang"));

// 3) language switcher preserves path + hash
await page.evaluate(() => { window.location.hash = "#test-anchor"; });
await page.click('a[aria-label="切換語言"]');
await page.waitForURL("**/en/about/**");
console.log("switcher →", page.url());
console.log("lang en:", await page.getAttribute("html", "lang"));

// 4) theme toggle persists in localStorage
const before = await page.evaluate(() => document.documentElement.classList.contains("dark"));
await page.click('button[aria-label*="dark" i], button[aria-label*="Switch" i]');
const after = await page.evaluate(() => document.documentElement.classList.contains("dark"));
const stored = await page.evaluate(() => localStorage.getItem("theme"));
console.log(`theme toggle: ${before} → ${after}, localStorage=${stored}`);
await page.reload({ waitUntil: "networkidle" });
console.log("theme after reload:", await page.evaluate(() => document.documentElement.classList.contains("dark")));

await ctx.close();
await browser.close();
console.log("done");
