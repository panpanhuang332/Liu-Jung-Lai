import type { L } from "@/lib/content/guide";

/** Home-page copy. Reader's-guide material derived strictly from the paper. */

export const hero: {
  claim: L;
  primaryCta: L;
  secondaryCta: L;
  tertiary: { href: string; label: L }[];
  identity: { orcid: L; email: L; cite: L };
  diagramCaption: L;
} = {
  claim: {
    zh: "使用量本身無法區辨一支被賦能的團隊與一支被嚇壞的團隊。",
    en: "Usage volume alone cannot distinguish an empowered workforce from a frightened one.",
  },
  primaryCta: { zh: "閱讀一分鐘導讀", en: "Read the one-minute guide" },
  secondaryCta: { zh: "探索互動模型", en: "Explore the interactive model" },
  tertiary: [
    { href: "paper", label: { zh: "論文全文", en: "Full paper" } },
    { href: "propositions", label: { zh: "命題總表", en: "Propositions" } },
    { href: "glossary", label: { zh: "術語辭典", en: "Glossary" } },
  ],
  identity: {
    orcid: { zh: "ORCID", en: "ORCID" },
    email: { zh: "Email", en: "Email" },
    cite: { zh: "引用本文", en: "Cite this paper" },
  },
  diagramCaption: {
    zh: "概念模型摘要（依論文圖 1 簡化；完整互動版見機制拆解頁）",
    en: "Concept-model summary (simplified from Figure 1; full interactive version on the Mechanisms page)",
  },
};

export const researchProblem: {
  heading: L;
  steps: { title: L; body: L }[];
  ref: { label: L; anchor: string };
} = {
  heading: { zh: "研究問題", en: "The research problem" },
  steps: [
    {
      title: { zh: "管理者說：「AI 是來賦能你。」", en: "Managers say: “AI is here to enable you.”" },
      body: {
        zh: "組織導入生成式 AI 時，幾乎都以賦能敘事開場——協助工作、減輕負擔、讓人專注更高價值的任務。",
        en: "Generative AI implementation almost always opens with an enablement narrative—assisting work, reducing burdens, freeing people for higher-value tasks.",
      },
    },
    {
      title: { zh: "員工為何反而聽見：「AI 將取代你」？", en: "Why do employees hear: “AI will replace you”?" },
      body: {
        zh: "再保證本身把「被取代」端上檯面；策略性模糊、效率語彙、言行不一致與既有的替代性先驗，把正向訊息逆轉成「AI 即替代」框架。",
        en: "Reassurance itself puts replacement on the table; strategic ambiguity, efficiency vocabulary, word–deed inconsistency, and substitution-leaning priors reverse the positive message into an AI-as-substitute frame.",
      },
    },
    {
      title: { zh: "與 AI 的直接互動，如何分化成四種採用回應？", en: "How does direct interaction with AI diverge into four adoption responses?" },
      body: {
        zh: "員工能私下、低成本地測試系統；每次探測產生的線索遞迴更新角色評估，最終落入迴避、純遵從、防衛性採用或真正整合。",
        en: "Employees can test the system privately and at low cost; each probe returns cues that recursively update role appraisals, settling into avoidance, compliance-only use, defensive adoption, or genuine integration.",
      },
    },
  ],
  ref: { label: { zh: "對應 §1.1–1.2", en: "Corresponds to §1.1–1.2" }, anchor: "s-1-1" },
};

export const mechanisms: {
  heading: L;
  m1: { name: L; body: L };
  m2: { name: L; body: L };
  link: L;
} = {
  heading: { zh: "兩個機制", en: "The two mechanisms" },
  m1: {
    name: { zh: "機制一：賦能敘事反噬", en: "Mechanism 1: Enablement narrative backfire" },
    body: {
      zh: "五個語用驅動因子——標記化的再保證、策略性模糊、效率委婉語、言行不一致、替代性先驗——累積地把一則善意訊息逆轉為替代訊號。",
      en: "Five pragmatic drivers—marked reassurance, strategic ambiguity, efficiency euphemism, word–deed inconsistency, substitution-leaning priors—cumulatively reverse a well-intended message into a substitution signal.",
    },
  },
  m2: {
    name: { zh: "機制二：AI 互動式角色意義建構迴圈", en: "Mechanism 2: The AI-interactive role sensemaking loop" },
    body: {
      zh: "探測 → 線索 → 更新評估的遞迴過程；證據一致則固化、衝突則擺盪、強反證則逆轉。",
      en: "A recursive probe → cue → updated-appraisal process; consistent evidence entrenches, conflicting evidence oscillates, strong disconfirmation reverses.",
    },
  },
  link: { zh: "進入機制拆解（含互動圖）", en: "Open the mechanisms page (with the interactive diagram)" },
};

export const modesTeaser: {
  heading: L;
  note: L;
  link: L;
} = {
  heading: { zh: "四種採用回應", en: "Four adoption responses" },
  note: {
    zh: "視覺閱讀導引（教學式整理，軸線非論文正式模型）；判準見論文表 3。",
    en: "Visual reading guide (a teaching aid, not a formal model from the paper); criteria in Table 3.",
  },
  link: { zh: "完整說明與自我檢視", en: "Full descriptions and self-check" },
};

export const readingDepth: {
  heading: L;
  sub: L;
  items: { n: string; time: L; what: L; href: string; hash?: string }[];
} = {
  heading: { zh: "選擇你的閱讀深度", en: "Choose your reading depth" },
  sub: {
    zh: "依你此刻有的時間開始，而不是依頁面名稱。",
    en: "Start from the time you have, not from page names.",
  },
  items: [
    {
      n: "1",
      time: { zh: "1 分鐘", en: "1 minute" },
      what: { zh: "理解研究主張", en: "Understand the central claim" },
      href: "guide",
      hash: "#one-minute",
    },
    {
      n: "10",
      time: { zh: "10 分鐘", en: "10 minutes" },
      what: { zh: "理解理論機制與主要命題", en: "Understand the mechanisms and propositions" },
      href: "guide",
      hash: "#ten-minutes",
    },
    {
      n: "60",
      time: { zh: "完整閱讀", en: "Full paper" },
      what: { zh: "閱讀論文全文、圖表與參考文獻", en: "Read the complete manuscript, figures, and references" },
      href: "paper",
    },
  ],
};

export const resources: {
  heading: L;
  items: { href: string; label: L }[];
} = {
  heading: { zh: "研究資源", en: "Research resources" },
  items: [
    { href: "propositions", label: { zh: "命題總表", en: "Propositions" } },
    { href: "glossary", label: { zh: "術語辭典", en: "Glossary" } },
    { href: "cite", label: { zh: "引用本文", en: "Cite" } },
    { href: "paper", label: { zh: "論文全文", en: "Full paper" } },
  ],
};

export const authorSection: {
  heading: L;
  interests: L;
  more: L;
} = {
  heading: { zh: "作者", en: "Author" },
  interests: {
    zh: "生成式 AI 導入 · 賦能敘事反噬 · 角色威脅與機會評估 · 組織意義建構 · 科技採用",
    en: "Generative AI implementation · Enablement narrative backfire · Role threat and opportunity appraisal · Organizational sensemaking · Technology adoption",
  },
  more: { zh: "完整作者資訊", en: "Full author information" },
};
