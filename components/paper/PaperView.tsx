import React from "react";

// Next.js statically blocks importing react-dom/server from server components;
// this page is SSG-only, so we load it at build/render time via a dynamic
// require that the bundler does not rewrite.
const { renderToStaticMarkup } = (eval("require") as NodeRequire)(
  "react-dom/server"
) as typeof import("react-dom/server");
import { getPaper, type Block, type BlockPair } from "@/lib/paper";
import type { Locale } from "@/lib/i18n";
import { renderInline } from "./Inline";
import PaperTable from "./PaperTable";
import LightboxController from "./LightboxController";
import AnchorFix from "./AnchorFix";

const ui = {
  zh: {
    figureOpen: "點擊放大圖 1",
    figureClose: "關閉",
    figureAlt:
      "圖 1：從賦能敘事到採用回應模式的遞迴角色意義建構架構流程圖",
  },
  en: {
    figureOpen: "Enlarge Figure 1",
    figureClose: "Close",
    figureAlt:
      "Figure 1: flow diagram of the recursive role-sensemaking framework from enablement narratives to modes of adoption response",
  },
} as const;

function headingTag(level: number, isTitle: boolean, seenH2: boolean) {
  if (isTitle) return "h1" as const;
  // front-matter sections (Abstract, PIS) are md-level-2 but appear before any
  // md-level-1 section heading — promote them to h2 to keep heading order valid
  const idx = Math.min(level - 1, 3);
  if (idx > 0 && !seenH2) return "h2" as const;
  return (["h2", "h3", "h4", "h5"] as const)[idx];
}

export default function PaperView({ locale }: { locale: Locale }) {
  const { pairs, refs } = getPaper();
  const ctx = { refs, cite: true };
  const noCite = { refs, cite: false };
  const t = ui[locale];
  const otherLang = locale === "zh" ? "en" : "zh-Hant";
  const pick = (p: BlockPair): Block => (locale === "zh" ? p.zh : p.en);
  const alt = (p: BlockPair): Block => (locale === "zh" ? p.en : p.zh);

  let seenTitle = false;
  let seenH2 = false;
  const out: React.ReactNode[] = [];

  pairs.forEach((pair, i) => {
    const b = pick(pair);
    const o = alt(pair);
    const key = `blk-${i}`;

    if (b.type === "heading") {
      const isTitle = !seenTitle;
      seenTitle = true;
      const Tag = headingTag(b.level, isTitle, seenH2);
      if (Tag === "h2") seenH2 = true;
      if (b.level === 1 && !isTitle) seenH2 = true;
      const cls = isTitle
        ? "text-3xl sm:text-[2.1rem] leading-snug font-semibold"
        : b.level === 1
          ? "mt-14 text-2xl font-semibold border-b border-line pb-2"
          : b.level === 2
            ? "mt-10 text-xl font-semibold"
            : "mt-8 text-lg font-semibold";
      out.push(
        <Tag key={key} id={pair.id} className={cls}>
          {renderInline(b.text, noCite, key)}
        </Tag>
      );
      return;
    }

    if (b.type === "figure") {
      // static markup; the LightboxController client component (outside this
      // static article) delegates clicks on [data-lightbox]
      out.push(
        <div key={key} className="mt-8">
          <button
            type="button"
            data-lightbox="/figures/figure1-full.png"
            aria-label={t.figureOpen}
            className="block w-full cursor-zoom-in border border-line bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.src}
              alt={t.figureAlt}
              width={1600}
              height={898}
              loading="lazy"
              className="w-full h-auto"
            />
          </button>
        </div>
      );
      return;
    }

    if (b.type === "table") {
      out.push(
        <div key={key} className="pair pair-table mt-4" id={pair.id}>
          <div>
            <PaperTable header={b.header} rows={b.rows} refs={refs} />
          </div>
          <div className="alt mt-6" lang={otherLang}>
            {o.type === "table" && (
              <PaperTable header={o.header} rows={o.rows} refs={refs} lang={otherLang} />
            )}
          </div>
        </div>
      );
      return;
    }

    // paragraphs
    if (pair.inRefs) {
      out.push(
        <p
          key={key}
          id={pair.id}
          lang="en"
          className="ref-entry mt-3 text-[0.95rem] leading-relaxed"
        >
          {renderInline(b.text, { refs, cite: false }, key)}
        </p>
      );
      return;
    }

    const isCaption = pair.alwaysBoth;
    out.push(
      <div
        key={key}
        id={pair.id}
        className={`pair pair-para mt-5 ${isCaption ? "always-both" : ""}`}
      >
        <p className={isCaption ? "text-[0.95rem] leading-relaxed" : ""}>
          {renderInline(b.text, ctx, key)}
        </p>
        <p
          lang={otherLang}
          className={`alt ${
            isCaption ? "text-[0.9rem] text-muted leading-relaxed mt-1" : "text-[0.98em]"
          }`}
        >
          {renderInline(o.type === "para" ? o.text : "", ctx, `${key}-alt`)}
        </p>
      </div>
    );
  });

  // The article is thousands of static nodes; serializing it once at build
  // time and injecting it as HTML keeps React hydration out of the hot path
  // (interactivity lives in components outside this subtree or is delegated).
  const html = renderToStaticMarkup(<>{out}</>);

  return (
    <>
      <article
        data-paper-root
        data-bilingual="off"
        lang={locale === "zh" ? "zh-Hant" : "en"}
        className="paper-prose font-serif text-ink"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <LightboxController closeLabel={t.figureClose} alt={t.figureAlt} />
      <AnchorFix />
    </>
  );
}
