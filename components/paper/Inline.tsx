import React from "react";
import { matchRef, type RefEntry } from "@/lib/paper";

/**
 * Minimal inline-markdown renderer for the controlled subset used by the
 * manuscript: **bold**, *italic*, <sup>…</sup>, bare URLs, and citations.
 * Citations become tooltip links into the reference list.
 */

type Ctx = { refs: RefEntry[]; cite: boolean };

const YEAR = "(?:18|19|20)\\d{2}[a-z]?";

function CiteLink({
  refEntry,
  children,
}: {
  refEntry: RefEntry;
  children: React.ReactNode;
}) {
  const plain = refEntry.text.replace(/\*([^*]+)\*/g, "$1").replace(/\*\*/g, "");
  return (
    <a href={`#${refEntry.id}`} className="cite" aria-label={plain}>
      {children}
      <span className="cite-tip" aria-hidden="true">
        {plain}
      </span>
    </a>
  );
}

/** linkify citation patterns inside a plain-text segment */
function citations(text: string, ctx: Ctx, keyBase: string): React.ReactNode[] {
  if (!ctx.cite) return [text];
  const out: React.ReactNode[] = [];
  // parenthetical groups (half-width, as in the manuscript) containing >=1 year
  const groupRe = new RegExp(`\\(([^()]*\\b${YEAR}\\b[^()]*)\\)`, "g");
  let last = 0;
  let g: RegExpExecArray | null;
  let k = 0;
  while ((g = groupRe.exec(text))) {
    out.push(...narrative(text.slice(last, g.index), ctx, `${keyBase}-n${k}`));
    const inner = g[1];
    const parts = inner.split(/;\s*/);
    const rendered: React.ReactNode[] = [];
    parts.forEach((part, pi) => {
      if (pi > 0) rendered.push("; ");
      const ym = part.match(new RegExp(`\\b(${YEAR})\\b`));
      const entry = ym ? matchRef(ctx.refs, part.slice(0, ym.index), ym[1].slice(0, 4)) : undefined;
      if (entry) {
        rendered.push(
          <CiteLink key={`${keyBase}-g${k}-${pi}`} refEntry={entry}>
            {part}
          </CiteLink>
        );
      } else {
        rendered.push(part);
      }
    });
    out.push("(", ...rendered, ")");
    last = g.index + g[0].length;
    k++;
  }
  out.push(...narrative(text.slice(last), ctx, `${keyBase}-tail`));
  return out;
}

/** narrative citations: Weick (1995) / Orlikowski 與 Gash（1994） */
function narrative(text: string, ctx: Ctx, keyBase: string): React.ReactNode[] {
  if (!text) return [];
  const re = new RegExp(
    `([A-Z][A-Za-z''’-]+(?:(?:\\s*(?:and|&|與|、)\\s*)[A-Z][A-Za-z''’-]+)*(?:\\s+et al\\.)?)` +
      `\\s*([(（])(${YEAR})([)）])`,
    "g"
  );
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    const entry = matchRef(ctx.refs, m[1], m[3].slice(0, 4));
    out.push(text.slice(last, m.index));
    if (entry) {
      out.push(m[1], m[2]);
      out.push(
        <CiteLink key={`${keyBase}-${k++}`} refEntry={entry}>
          {m[3]}
        </CiteLink>
      );
      out.push(m[4]);
    } else {
      out.push(m[0]);
    }
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

/** linkify bare URLs (reference list) */
function urls(text: string, keyBase: string): React.ReactNode[] {
  const re = /https?:\/\/[^\s)]+/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    out.push(text.slice(last, m.index));
    out.push(
      <a key={`${keyBase}-u${k++}`} href={m[0]} rel="external" className="break-all underline underline-offset-4 hover:text-accent">
        {m[0]}
      </a>
    );
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

function renderPlain(text: string, ctx: Ctx, keyBase: string): React.ReactNode[] {
  if (/https?:\/\//.test(text)) return urls(text, keyBase);
  return citations(text, ctx, keyBase);
}

/** split on **bold**, *italic*, <sup>…</sup>; recurse into fragments */
export function renderInline(text: string, ctx: Ctx, keyBase = "i"): React.ReactNode[] {
  const tokenRe = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|<sup>[^<]*<\/sup>)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const clean = text.replace(/\\([*'"[\]&])/g, "$1");
  while ((m = tokenRe.exec(clean))) {
    out.push(...renderPlain(clean.slice(last, m.index), ctx, `${keyBase}-${k}`));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(<strong key={`${keyBase}-b${k}`}>{renderInline(tok.slice(2, -2), ctx, `${keyBase}-b${k}`)}</strong>);
    } else if (tok.startsWith("<sup>")) {
      out.push(<sup key={`${keyBase}-s${k}`}>{tok.slice(5, -6)}</sup>);
    } else {
      out.push(<em key={`${keyBase}-e${k}`}>{renderInline(tok.slice(1, -1), ctx, `${keyBase}-e${k}`)}</em>);
    }
    last = m.index + tok.length;
    k++;
  }
  out.push(...renderPlain(clean.slice(last), ctx, `${keyBase}-z`));
  return out;
}
