import React from "react";
import { getPaper, type Block, type BlockPair } from "@/lib/paper";
import type { Locale } from "@/lib/i18n";
import { renderInline } from "./Inline";
import PaperTable from "./PaperTable";
import FigureLightbox from "./FigureLightbox";

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

function headingTag(level: number, isTitle: boolean) {
  if (isTitle) return "h1" as const;
  return (["h2", "h3", "h4", "h5"] as const)[Math.min(level - 1, 3)];
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
  const out: React.ReactNode[] = [];

  pairs.forEach((pair, i) => {
    const b = pick(pair);
    const o = alt(pair);
    const key = `blk-${i}`;

    if (b.type === "heading") {
      const isTitle = !seenTitle;
      seenTitle = true;
      const Tag = headingTag(b.level, isTitle);
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
      out.push(
        <div key={key} className="mt-8">
          <FigureLightbox
            src={b.src}
            fullSrc="/figures/figure1-full.png"
            alt={t.figureAlt}
            openLabel={t.figureOpen}
            closeLabel={t.figureClose}
          />
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

  return (
    <article
      data-paper-root
      data-bilingual="off"
      lang={locale === "zh" ? "zh-Hant" : "en"}
      className="paper-prose font-serif text-ink"
    >
      {out}
    </article>
  );
}
