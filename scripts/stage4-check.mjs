import { chromium } from "playwright-core";

const outDir = process.env.SHOT_DIR;
const base = "http://localhost:4180";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();

// modes quiz: answer all 8 as "defensive adoption" options
await page.goto(base + "/zh/modes/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${outDir}/modes-zh-top.png` });
const questions = page.locator("fieldset");
console.log("quiz questions:", await questions.count());
const defadAnswers = [
  "擔心不用會落後", "生存工具", "停下來不安全", "遠超過",
  "表面、可拋棄", "威脅感高時猛用", "駕馭它", "證明自己不可或缺",
];
for (const txt of defadAnswers) {
  await page.locator("label", { hasText: txt }).first().click();
}
await page.waitForTimeout(300);
const resultShown = await page.locator("text=防衛性採用").count();
console.log("result mentions 防衛性採用:", resultShown > 0);
const disclaimer = await page.locator("text=不具診斷效力").count();
console.log("disclaimer occurrences:", disclaimer);
await page.getByText("你的作答最接近", { exact: true }).scrollIntoViewIfNeeded();
await page.screenshot({ path: `${outDir}/modes-zh-result.png` });

// no network requests carrying answers (static assets only)
const requests = [];
page.on("request", (r) => requests.push(r.url()));
await page.locator("label", { hasText: "公司要求" }).first().click();
await page.waitForTimeout(500);
console.log("requests fired on answer change:", requests.length);

// glossary search
await page.goto(base + "/zh/glossary/", { waitUntil: "networkidle" });
const total = await page.locator("ul li").count();
await page.fill("#glossary-search", "捷思");
await page.waitForTimeout(300);
const filtered = await page.locator("ul li").count();
console.log(`glossary rows: total=${total}, after search 捷思=${filtered}`);
await page.screenshot({ path: `${outDir}/glossary-zh-search.png` });
const anchorLink = await page.locator('ul li a[href*="/paper/#"]').first().getAttribute("href");
console.log("first-seen link example:", anchorLink);

// cite copy
await ctx.grantPermissions(["clipboard-read", "clipboard-write"]);
await page.goto(base + "/zh/cite/", { waitUntil: "networkidle" });
await page.locator("button", { hasText: "複製" }).first().click();
await page.waitForTimeout(200);
const clip = await page.evaluate(() => navigator.clipboard.readText());
console.log("clipboard starts with:", clip.slice(0, 30));
console.log("copied-state shown:", await page.locator("text=已複製").count());
await page.screenshot({ path: `${outDir}/cite-zh.png` });

await ctx.close();

// mobile overflow
const m = await browser.newContext({ viewport: { width: 375, height: 720 } });
const mp = await m.newPage();
for (const p of ["/zh/modes/", "/zh/glossary/", "/zh/cite/"]) {
  await mp.goto(base + p, { waitUntil: "networkidle" });
  const ov = await mp.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  console.log(`mobile overflow ${p}: ${ov}px`);
}
await mp.goto(base + "/zh/modes/", { waitUntil: "networkidle" });
await mp.screenshot({ path: `${outDir}/modes-zh-mobile.png` });
await m.close();
await browser.close();
console.log("done");
