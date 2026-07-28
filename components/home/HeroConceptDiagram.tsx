import type { Locale } from "@/lib/i18n";

/**
 * Simplified concept model for the hero — a static, single-accent summary of
 * Figure 1 (narrative → frame → appraisal → responses, with the recursive
 * loop). Server-rendered SVG; the full interactive version lives on the
 * Mechanisms page.
 */

const text = {
  zh: {
    title: "概念模型摘要",
    desc: "賦能敘事經反噬成為「AI 即替代」框架，進入角色威脅／機會評估，產生四種採用回應；AI 互動式角色意義建構迴圈遞迴地更新評估。",
    narrative: "賦能敘事",
    backfire: "反噬",
    frame: ["「AI 即替代」", "框架"],
    appraisal: ["角色威脅／", "機會評估"],
    loop: ["遞迴：AI 互動式", "角色意義建構"],
    responses: "四種採用回應",
    modes: ["迴避", "純遵從", "防衛性採用", "真正整合"],
  },
  en: {
    title: "Concept-model summary",
    desc: "An enablement narrative backfires into an AI-as-substitute frame, feeds role threat/opportunity appraisal, and yields four adoption responses; the AI-interactive role sensemaking loop recursively updates the appraisal.",
    narrative: "Enablement narrative",
    backfire: "backfire",
    frame: ["AI-as-substitute", "frame"],
    appraisal: ["Role threat /", "opportunity appraisal"],
    loop: ["Recursive: AI-interactive", "role sensemaking"],
    responses: "Adoption responses",
    modes: ["Avoidance", "Compliance-only", "Defensive", "Integration"],
  },
} as const;

export default function HeroConceptDiagram({ locale }: { locale: Locale }) {
  const t = text[locale];
  return (
    <svg
      viewBox="0 0 460 560"
      role="img"
      aria-labelledby="hero-diagram-title hero-diagram-desc"
      className="w-full h-auto diag"
      fontSize="21"
      fontFamily="system-ui, -apple-system, 'PingFang TC', 'Microsoft JhengHei', sans-serif"
    >
      <title id="hero-diagram-title">{t.title}</title>
      <desc id="hero-diagram-desc">{t.desc}</desc>
      <defs>
        <marker id="hcd-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
        </marker>
      </defs>

      {/* narrative */}
      <g className="diag-node">
        <rect x="90" y="18" width="280" height="58" rx="3" />
        <text x="230" y="54" textAnchor="middle">{t.narrative}</text>
      </g>

      {/* backfire arrow (accent) */}
      <path d="M230 76 V128" className="hcd-accent" strokeWidth="2.5" fill="none" markerEnd="url(#hcd-a)" />
      <text x="248" y="110" className="hcd-accent-t" fontStyle="italic" fontSize="19">{t.backfire}</text>

      {/* frame */}
      <g className="diag-node">
        <rect x="90" y="134" width="280" height="78" rx="3" />
        <text x="230" y="168" textAnchor="middle">{t.frame[0]}</text>
        <text x="230" y="196" textAnchor="middle">{t.frame[1]}</text>
      </g>

      <path d="M230 212 V254" className="hcd-line" strokeWidth="2" fill="none" markerEnd="url(#hcd-a)" />

      {/* appraisal */}
      <g className="diag-node">
        <rect x="90" y="260" width="280" height="78" rx="3" />
        <text x="230" y="294" textAnchor="middle">{t.appraisal[0]}</text>
        <text x="230" y="322" textAnchor="middle">{t.appraisal[1]}</text>
      </g>

      {/* recursive loop (accent, curved, both directions) */}
      <path
        d="M370 320 C428 340, 428 400, 384 416 C420 380, 416 340, 372 330"
        className="hcd-accent"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#hcd-a)"
      />
      <text x="452" y="376" textAnchor="end" className="hcd-accent-t" fontSize="26">↺</text>
      <text x="230" y="382" textAnchor="middle" className="hcd-muted" fontStyle="italic" fontSize="17">{t.loop[0]}</text>
      <text x="230" y="404" textAnchor="middle" className="hcd-muted" fontStyle="italic" fontSize="17">{t.loop[1]}</text>

      <path d="M230 338 V424" className="hcd-line" strokeWidth="2" fill="none" markerEnd="url(#hcd-a)" strokeDasharray="none" opacity="0" />
      <path d="M150 338 C150 380, 170 400, 200 428" className="hcd-line" strokeWidth="2" fill="none" markerEnd="url(#hcd-a)" />

      {/* responses */}
      <g className="diag-node">
        <rect x="40" y="434" width="380" height="104" rx="3" />
        <text x="230" y="466" textAnchor="middle">{t.responses}</text>
        {t.modes.map((m, i) => (
          <text
            key={m}
            x={40 + 47.5 + i * 95}
            y="510"
            textAnchor="middle"
            className="hcd-muted"
            fontSize="15.5"
          >
            {m}
          </text>
        ))}
      </g>
    </svg>
  );
}
