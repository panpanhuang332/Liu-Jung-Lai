import { chromium } from "playwright-core";
import fs from "node:fs";

const axeSource = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const base = "http://localhost:4180";
const pages = [
  "/zh/", "/en/", "/zh/paper/", "/zh/guide/", "/zh/mechanisms/",
  "/zh/propositions/", "/zh/modes/", "/zh/glossary/", "/zh/cite/", "/zh/about/",
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

let totalViolations = 0;
for (const dark of [false, true]) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: dark ? "dark" : "light",
  });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    if (dark) await page.emulateMedia({ colorScheme: "dark" });
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        sample: v.nodes[0]?.html?.slice(0, 110),
      }));
    });
    if (res.length) {
      totalViolations += res.length;
      console.log(`\n${dark ? "[dark]" : "[light]"} ${p}`);
      res.forEach((v) => console.log(`  ✗ ${v.id} (${v.impact}, ${v.nodes} nodes) ${v.sample}`));
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`\ntotal violation types across ${pages.length} pages × 2 themes: ${totalViolations}`);
