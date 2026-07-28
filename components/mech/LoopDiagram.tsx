"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { nodes, trajectories, type Trajectory } from "@/lib/content/mechanisms";

/**
 * Interactive redraw of Figure 1. Nodes are clickable (definition panel
 * below); the three P7 trajectories can be toggled to highlight the
 * relevant paths. Pure front-end state; topology mirrors the original figure.
 */

type TrajId = Trajectory["id"] | null;

const HIGHLIGHT: Record<Exclude<TrajId, null>, string[]> = {
  entrench: ["frame", "primary", "rta", "upd", "interact", "cues", "e-loop1", "e-loop2", "e-loop3", "e-loop-up", "e-fp", "e-pt"],
  oscillate: ["upd", "interact", "cues", "e-loop1", "e-loop2", "e-loop3", "e-loop-up", "d-cred", "cred"],
  reverse: ["upd", "interact", "cues", "e-loop1", "e-loop2", "e-loop3", "e-reapp", "genint", "roa"],
};

const uiText = {
  zh: {
    ariaDiagram: "圖 1 互動重繪：從賦能敘事到採用回應模式",
    trajLabel: "P7 三種軌跡",
    clear: "清除",
    nodeHint: "點擊圖中節點顯示定義",
    toPaper: "見原文",
    backfire: "賦能敘事反噬",
    loopLabel: ["AI 互動式角色", "意義建構迴圈"],
    reapp: "再評估路徑",
    ante: "脈絡前因",
    modes: "採用回應模式",
  },
  en: {
    ariaDiagram: "Interactive redraw of Figure 1: from enablement narratives to modes of adoption response",
    trajLabel: "The three P7 trajectories",
    clear: "Clear",
    nodeHint: "Click a node in the diagram to show its definition",
    toPaper: "See the paper",
    backfire: "Enablement narrative backfire",
    loopLabel: ["AI-interactive role", "sensemaking loop"],
    reapp: "reappraisal pathway",
    ante: "Contextual antecedents",
    modes: "Modes of adoption response",
  },
} as const;

/* node geometry (viewBox 1960×1100, mirrors the original figure) */
const GEOM: Record<string, { x: number; y: number; w: number; h: number; lines: { zh: string[]; en: string[] } }> = {
  vuln: { x: 40, y: 115, w: 245, h: 88, lines: { zh: ["知覺角色", "脆弱性"], en: ["Perceived role", "vulnerability"] } },
  part: { x: 40, y: 268, w: 245, h: 88, lines: { zh: ["導入決策", "參與"], en: ["Participation in", "implementation decisions"] } },
  wdc: { x: 40, y: 450, w: 245, h: 88, lines: { zh: ["言行", "一致性"], en: ["Word–deed", "consistency"] } },
  narrative: { x: 400, y: 262, w: 230, h: 122, lines: { zh: ["組織", "賦能敘事"], en: ["Organizational", "enablement narrative"] } },
  frame: { x: 820, y: 267, w: 245, h: 110, lines: { zh: ["「AI 即替代」", "框架"], en: ["AI-as-substitute", "frame"] } },
  primary: { x: 1105, y: 258, w: 255, h: 125, lines: { zh: ["初級評估", "（偏向威脅）"], en: ["Primary appraisal", "(biased toward threat)"] } },
  rta: { x: 1420, y: 228, w: 250, h: 92, lines: { zh: ["角色威脅評估"], en: ["Role threat", "appraisal"] } },
  roa: { x: 1425, y: 408, w: 245, h: 92, lines: { zh: ["角色機會評估"], en: ["Role opportunity", "appraisal"] } },
  avoid: { x: 1720, y: 103, w: 240, h: 72, lines: { zh: ["迴避"], en: ["Avoidance"] } },
  comp: { x: 1715, y: 222, w: 245, h: 118, lines: { zh: ["純遵從性使用", "（外部強制要求）"], en: ["Compliance-only use", "(external mandate)"] } },
  defad: { x: 1720, y: 382, w: 240, h: 90, lines: { zh: ["防衛性採用"], en: ["Defensive", "adoption"] } },
  genint: { x: 1720, y: 522, w: 240, h: 90, lines: { zh: ["真正整合"], en: ["Genuine", "integration"] } },
  upd: { x: 898, y: 562, w: 205, h: 98, lines: { zh: ["更新後的", "角色評估"], en: ["Updated role", "appraisal"] } },
  interact: { x: 1168, y: 698, w: 212, h: 126, lines: { zh: ["員工—AI 互動", "（探測）"], en: ["Employee–AI", "interaction (probing)"] } },
  cues: { x: 735, y: 878, w: 430, h: 156, lines: { zh: ["角色相關線索：", "自指涉＋展示性（AI 生成）；", "社會傳遞"], en: ["Role-relevant cues:", "self-referential + demonstrative", "(AI-generated); socially transmitted"] } },
};

const LABELS: Record<string, { x: number; y: number; lines: { zh: string[]; en: string[] }; nodeId: string }> = {
  trust: { x: 705, y: 100, lines: { zh: ["組織信任"], en: ["Organizational", "trust"] }, nodeId: "trust" },
  sar: { x: 1395, y: 82, lines: { zh: ["次級評估", "資源"], en: ["Secondary appraisal", "resources"] }, nodeId: "sar" },
  cred: { x: 460, y: 740, lines: { zh: ["AI 生成線索", "可信度"], en: ["AI-generated cue", "credibility"] }, nodeId: "cred" },
};

export default function LoopDiagram({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [traj, setTraj] = useState<TrajId>(null);
  const t = uiText[locale];
  const active = traj ? HIGHLIGHT[traj] : null;

  const cls = (id: string, base: string) => {
    let c = base;
    if (active) c += active.includes(id) ? " diag-hl" : " diag-dim";
    if (selected === id) c += " diag-sel";
    return c;
  };

  const nodeDef = nodes.find((n) => n.id === selected);
  const trajDef = trajectories.find((x) => x.id === traj);

  const pickNode = (id: string) => setSelected((s) => (s === id ? null : id));
  const keyNode = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pickNode(id);
    }
  };

  return (
    <div>
      {/* trajectory toggles */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.trajLabel}>
        <span className="text-sm text-muted mr-1">{t.trajLabel}：</span>
        {trajectories.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={traj === x.id}
            onClick={() => setTraj((cur) => (cur === x.id ? null : x.id))}
            className={`border px-3 py-1 text-sm ${
              traj === x.id
                ? "border-accent text-accent"
                : "border-line text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {x.name[locale]}
          </button>
        ))}
        {traj && (
          <button
            type="button"
            onClick={() => setTraj(null)}
            className="px-2 py-1 text-sm text-muted underline underline-offset-4 hover:text-accent"
          >
            {t.clear}
          </button>
        )}
      </div>
      {trajDef && (
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/90 border-l-2 border-accent pl-3">
          {trajDef.desc[locale]}
        </p>
      )}
      <p className="mt-3 text-sm text-muted">{t.nodeHint}</p>

      <div className="mt-4 overflow-x-auto border border-line bg-white dark:bg-surface">
        <svg
          viewBox="0 0 1960 1100"
          role="group"
          aria-label={t.ariaDiagram}
          className="min-w-[860px] w-full h-auto diag"
          fontSize="27"
        >
          <defs>
            <marker id="m-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
            </marker>
          </defs>

          <text x="40" y="52" className="diag-head">{t.ante}</text>
          <text x="1920" y="52" className="diag-head" textAnchor="end">{t.modes}</text>

          {/* edges */}
          <path id="e-ante" className={cls("e-ante", "diag-edge")} d="M285 159 H325 V494 H285 M325 312 H388" markerEnd="url(#m-arr)" />
          <path id="e-nf" className={cls("e-nf", "diag-edge")} d="M630 323 H808" markerEnd="url(#m-arr)" />
          <path id="e-fp" className={cls("e-fp", "diag-edge")} d="M1065 322 H1093" markerEnd="url(#m-arr)" />
          <path id="e-pt" className={cls("e-pt", "diag-edge")} d="M1360 295 L1408 272" markerEnd="url(#m-arr)" />
          <path id="e-po" className={cls("e-po", "diag-edge")} d="M1360 355 L1413 420" markerEnd="url(#m-arr)" />
          <path id="e-t-avoid" className={cls("e-t-avoid", "diag-edge")} d="M1670 250 L1708 165" markerEnd="url(#m-arr)" />
          <path id="e-t-comp" className={cls("e-t-comp", "diag-edge")} d="M1670 278 H1703" markerEnd="url(#m-arr)" />
          <path id="e-t-defad" className={cls("e-t-defad", "diag-edge")} d="M1670 305 L1708 400" markerEnd="url(#m-arr)" />
          <path id="e-o-gen" className={cls("e-o-gen", "diag-edge")} d="M1670 470 L1708 545" markerEnd="url(#m-arr)" />
          <path id="e-loop1" className={cls("e-loop1", "diag-edge")} d="M1103 622 C1200 640, 1250 660, 1268 692" markerEnd="url(#m-arr)" />
          <path id="e-loop2" className={cls("e-loop2", "diag-edge")} d="M1250 826 C1220 880, 1195 902, 1172 916" markerEnd="url(#m-arr)" />
          <path id="e-loop3" className={cls("e-loop3", "diag-edge")} d="M733 940 C640 880, 640 740, 780 655 C820 632, 855 623, 888 618" markerEnd="url(#m-arr)" />
          <path id="e-loop-up" className={cls("e-loop-up", "diag-edge")} d="M1020 560 L1190 390" markerEnd="url(#m-arr)" />
          <path id="e-reapp" className={cls("e-reapp", "diag-edge diag-dashed")} d="M1382 742 C1520 700, 1640 630, 1708 574" markerEnd="url(#m-arr)" />

          {/* boundary-condition dotted arrows */}
          <path id="d-trust" className={cls("d-trust", "diag-edge diag-dotted")} d="M705 160 V285" markerEnd="url(#m-arr)" />
          <path id="d-sar" className={cls("d-sar", "diag-edge diag-dotted")} d="M1395 148 V262" markerEnd="url(#m-arr)" />
          <path id="d-cred" className={cls("d-cred", "diag-edge diag-dotted")} d="M545 776 L648 800" markerEnd="url(#m-arr)" />

          {/* edge labels */}
          <text x="712" y="372" textAnchor="middle" fontStyle="italic" className={cls("e-nf", "diag-label")}>{t.backfire}</text>
          <text x="1020" y="702" textAnchor="middle" fontStyle="italic" className={cls("e-loop1", "diag-label")}>{t.loopLabel[0]}</text>
          <text x="1020" y="736" textAnchor="middle" fontStyle="italic" className={cls("e-loop1", "diag-label")}>{t.loopLabel[1]}</text>
          <text x="1580" y="762" textAnchor="middle" fontStyle="italic" className={cls("e-reapp", "diag-label")}>{t.reapp}</text>

          {/* boundary labels (clickable) */}
          {Object.entries(LABELS).map(([id, l]) => {
            const def = nodes.find((n) => n.id === l.nodeId)!;
            return (
              <g
                key={id}
                role="button"
                tabIndex={0}
                aria-pressed={selected === id}
                aria-label={def.label[locale]}
                onClick={() => pickNode(id)}
                onKeyDown={(e) => keyNode(e, id)}
                className={cls(id, "diag-boundary cursor-pointer")}
              >
                {l.lines[locale].map((line, i) => (
                  <text key={i} x={l.x} y={l.y + i * 33} textAnchor="middle" fontStyle="italic">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* nodes */}
          {Object.entries(GEOM).map(([id, g]) => {
            const def = nodes.find((n) => n.id === id)!;
            const lines = g.lines[locale];
            const lineH = 34;
            const startY = g.y + g.h / 2 - ((lines.length - 1) * lineH) / 2 + 9;
            return (
              <g
                key={id}
                role="button"
                tabIndex={0}
                aria-pressed={selected === id}
                aria-label={def.label[locale]}
                onClick={() => pickNode(id)}
                onKeyDown={(e) => keyNode(e, id)}
                className={cls(id, "diag-node cursor-pointer")}
              >
                <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="14" />
                {lines.map((line, i) => (
                  <text key={i} x={g.x + g.w / 2} y={startY + i * lineH} textAnchor="middle">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* definition panel */}
      <div aria-live="polite">
        {nodeDef && (
          <div className="mt-4 border border-line p-4 max-w-prose">
            <p className="font-medium text-ink">
              {nodeDef.label[locale]}
              <span lang={locale === "zh" ? "en" : "zh-Hant"} className="ml-2 text-sm text-muted">
                {nodeDef.label[locale === "zh" ? "en" : "zh"]}
              </span>
            </p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/90">{nodeDef.def[locale]}</p>
            <p className="mt-2 text-sm">
              <Link
                href={`/${locale}/paper/#${nodeDef.section}`}
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {t.toPaper}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
