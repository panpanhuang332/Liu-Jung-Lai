import fs from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";

export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "para"; text: string }
  | { type: "figure"; src: string }
  | { type: "table"; header: string[]; rows: string[][] };

export type BlockPair = {
  en: Block;
  zh: Block;
  /** stable anchor shared by both locales (headings / propositions) */
  id?: string;
  /** paragraph pairs that must show both languages at all times (figure captions) */
  alwaysBoth?: boolean;
  /** true for blocks inside the References section */
  inRefs?: boolean;
};

export type TocItem = { id: string; level: number; label: { zh: string; en: string } };

export type RefEntry = {
  id: string;
  text: string;
  year: string;
  /** lowercase full entry text used for surname matching */
  haystack: string;
};

export type Paper = {
  pairs: BlockPair[];
  toc: TocItem[];
  refs: RefEntry[];
};

function parseBlocks(raw: string): Block[] {
  const chunks = raw
    .split(/\n[ \t]*\n+/)
    .map((c) => c.trim())
    .filter(Boolean);
  const blocks: Block[] = [];
  for (const c of chunks) {
    const hm = c.match(/^(#{1,6})\s+([\s\S]*)$/);
    if (hm && !c.includes("\n")) {
      blocks.push({ type: "heading", level: hm[1].length, text: hm[2].trim() });
      continue;
    }
    if (c.startsWith("![")) {
      const m = c.match(/\((\/[^)]+)\)/);
      blocks.push({ type: "figure", src: m ? m[1] : "/figures/figure1.png" });
      continue;
    }
    if (c.startsWith("|")) {
      const lines = c.split("\n").filter((l) => l.trim().startsWith("|"));
      const cells = (l: string) =>
        l
          .replace(/^\s*\|/, "")
          .replace(/\|\s*$/, "")
          .split("|")
          .map((x) => x.trim());
      const header = cells(lines[0]);
      const rows = lines
        .slice(1)
        .filter((l) => !/^\s*\|?[\s:|-]+\|?\s*$/.test(l))
        .map(cells);
      blocks.push({ type: "table", header, rows });
      continue;
    }
    blocks.push({ type: "para", text: c.replace(/\n/g, " ") });
  }
  return blocks;
}

const SPECIAL_IDS: Array<[RegExp, string]> = [
  [/^Abstract/i, "abstract"],
  [/^Public Interest/i, "public-interest-statement"],
  [/^Research Integrity/i, "research-integrity-statement"],
  [/^Disclosure/i, "disclosure-statement"],
  [/^Funding/i, "funding"],
  [/^Data Availability/i, "data-availability"],
  [/^References/i, "references"],
];

function headingId(enText: string, index: number): string {
  const num = enText.match(/^(\d+(?:\.\d+)*)/);
  if (num) return "s-" + num[1].split(".").join("-");
  for (const [re, id] of SPECIAL_IDS) if (re.test(enText)) return id;
  return index === 0 ? "top" : `h-${index}`;
}

function refSlug(text: string, year: string, used: Set<string>): string {
  const first = (text.match(/^[^,.(]+/) || ["ref"])[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 2)
    .join("-");
  let id = `ref-${first}-${year}`;
  let n = 2;
  while (used.has(id)) id = `ref-${first}-${year}-${n++}`;
  used.add(id);
  return id;
}

let cache: Paper | null = null;

export function getPaper(): Paper {
  if (cache) return cache;
  const root = process.cwd();
  const en = parseBlocks(fs.readFileSync(path.join(root, "content/en/paper.mdx"), "utf8"));
  const zh = parseBlocks(fs.readFileSync(path.join(root, "content/zh/paper.mdx"), "utf8"));
  if (en.length !== zh.length) {
    throw new Error(`paper block mismatch: en=${en.length} zh=${zh.length}`);
  }

  const pairs: BlockPair[] = [];
  const toc: TocItem[] = [];
  const refs: RefEntry[] = [];
  const usedSlugs = new Set<string>();
  let inRefs = false;
  let headingIndex = 0;

  for (let i = 0; i < en.length; i++) {
    const e = en[i];
    const z = zh[i];
    const pair: BlockPair = { en: e, zh: z };
    if (e.type === "heading" && z.type === "heading") {
      const id = headingId(e.text, headingIndex++);
      pair.id = id;
      if (id === "references") inRefs = true;
      if (id !== "top") {
        toc.push({ id, level: e.level, label: { zh: z.text, en: e.text } });
      }
    } else if (e.type === "para") {
      // proposition / research-question anchors
      const pm = e.text.match(/^\*\*(P\d+a?|RQ\d)[.:]?\*\*/);
      if (pm) pair.id = "prop-" + pm[1].toLowerCase();
      if (inRefs) {
        pair.inRefs = true;
        const ym = e.text.match(/\((\d{4})[a-z]?\)/) || e.text.match(/\((\d{4}),/);
        const year = ym ? ym[1] : "0000";
        const id = refSlug(e.text, year, usedSlugs);
        pair.id = id;
        refs.push({ id, text: e.text, year, haystack: e.text.toLowerCase() });
      }
      // figure caption + note: always show both languages (spec: 圖說中英雙語)
      if (/^(\*\*Figure \d|\*Note\.\*)/.test(e.text)) pair.alwaysBoth = true;
    }
    pairs.push(pair);
  }
  cache = { pairs, toc, refs };
  return cache;
}

/** find the reference entry matching a cited surname list + year */
export function matchRef(refs: RefEntry[], names: string, year: string): RefEntry | undefined {
  const surnames = (names.match(/[A-Z][A-Za-z''’-]+/g) || []).filter(
    (w) => !["The", "In", "See", "AI"].includes(w)
  );
  if (!surnames.length) return undefined;
  const candidates = refs.filter((r) => r.year === year);
  return (
    candidates.find((r) =>
      surnames.every((s) => r.haystack.includes(s.toLowerCase()))
    ) ||
    candidates.find((r) => r.haystack.startsWith(surnames[0].toLowerCase())) ||
    candidates.find((r) => r.haystack.includes(surnames[0].toLowerCase()))
  );
}
