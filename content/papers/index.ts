import type { Locale } from "@/lib/i18n";

export type L = { zh: string; en: string };

export type PaperEntry = {
  slug: string;
  /** content/{en,zh}/<contentId>.mdx；null 表示無雙語全文檔 */
  contentId: string | null;
  title: L;
  titleMain: L;
  titleSub: L;
  /** 題名是否為暫定（working title） */
  titleProvisional: boolean;
  authors: { display: L; note: L | null };
  year: string;
  type: L;
  status: L;
  /** Schema.org creativeWorkStatus 用之英文描述文字 */
  statusSchema: string;
  translationStatus: { label: L; authorApproved: boolean };
  /** 摘要；來源無摘要時為 null（不得補寫） */
  abstract: { zh: string | null; en: string | null };
  keywords: { en: string[]; provisional: boolean };
  /** 一句核心研究問題（取自原稿） */
  coreQuestion: L;
  /** 網站上實際公開的章節（不含來源缺漏者） */
  availableSections: L[];
  /** 來源缺漏、網站不建立內容頁的章節 */
  missingSections: L[];
  routes: {
    overview: string;
    fullText: string | null;
    guide: string | null;
    extras: { href: string; label: L }[];
  };
  figures: {
    src: string;
    zhSrc: string | null;
    caption: L;
    alt: L;
  }[];
  supplements: { label: L; href: string }[];
  citation: L;
  featured: boolean;
  order: number;
};

export const papers: PaperEntry[] = [
  {
    slug: "enablement-narrative-backfire",
    contentId: "paper",
    title: {
      en: "When Enablement Narratives Backfire: Recursive Sensemaking and Modes of Adoption Response in Generative AI Implementation",
      zh: "當賦能敘事反噬：生成式 AI 導入中的遞迴意義建構與採用回應模式",
    },
    titleMain: { en: "When Enablement Narratives Backfire", zh: "當賦能敘事反噬" },
    titleSub: {
      en: "Recursive Sensemaking and Modes of Adoption Response in Generative AI Implementation",
      zh: "生成式 AI 導入中的遞迴意義建構與採用回應模式",
    },
    titleProvisional: false,
    authors: { display: { en: "Liu-Jung Lai", zh: "賴柳蓉（Liu-Jung Lai）" }, note: null },
    year: "2026",
    type: { zh: "概念性論文", en: "Conceptual paper" },
    status: { zh: "投稿審查中（manuscript under review）", en: "Manuscript under review" },
    statusSchema: "Manuscript under review",
    translationStatus: {
      label: { zh: "中文全文（作者核定術語）", en: "Chinese full text (author-approved terminology)" },
      authorApproved: true,
    },
    abstract: {
      en: null,
      zh: null,
    },
    keywords: {
      en: [
        "generative AI implementation",
        "enablement narrative backfire",
        "role threat appraisal",
        "sensemaking",
        "technology adoption",
        "employee responses to artificial intelligence",
      ],
      provisional: false,
    },
    coreQuestion: {
      zh: "為什麼「AI 是來賦能你」會被聽成「AI 將取代你」？員工與 AI 的直接互動又如何分化成四種採用回應？",
      en: "Why is “AI is here to enable you” heard as “AI will replace you,” and how does employee–AI interaction diverge into four modes of adoption response?",
    },
    availableSections: [
      { zh: "摘要與 Public Interest Statement", en: "Abstract & Public Interest Statement" },
      { zh: "全文（§1–§6）", en: "Full text (§1–§6)" },
      { zh: "圖 1 與三個表", en: "Figure 1 and three tables" },
      { zh: "參考文獻與各項聲明", en: "References and statements" },
    ],
    missingSections: [],
    routes: {
      overview: "/papers/enablement-narrative-backfire",
      fullText: "/paper",
      guide: "/guide",
      extras: [
        { href: "/mechanisms", label: { zh: "機制拆解", en: "Mechanisms" } },
        { href: "/propositions", label: { zh: "命題總表", en: "Propositions" } },
        { href: "/modes", label: { zh: "採用模式", en: "Adoption Modes" } },
        { href: "/glossary", label: { zh: "術語辭典", en: "Glossary" } },
        { href: "/cite", label: { zh: "引用本文", en: "Cite" } },
      ],
    },
    figures: [
      {
        src: "/figures/figure1.png",
        zhSrc: null,
        caption: {
          zh: "圖 1：從賦能敘事到採用回應模式的遞迴角色意義建構架構",
          en: "Figure 1: From enablement narratives to modes of adoption response",
        },
        alt: {
          zh: "圖 1：從賦能敘事到採用回應模式的遞迴角色意義建構架構流程圖",
          en: "Figure 1: flow diagram of the recursive role-sensemaking framework from enablement narratives to modes of adoption response",
        },
      },
    ],
    supplements: [],
    citation: {
      zh: "Lai, L.-J. (2026). When enablement narratives backfire: Recursive sensemaking and modes of adoption response in generative AI implementation [Manuscript under review].",
      en: "Lai, L.-J. (2026). When enablement narratives backfire: Recursive sensemaking and modes of adoption response in generative AI implementation [Manuscript under review].",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "integration-replaceability-paradox",
    contentId: "integration-replaceability-paradox",
    title: {
      en: "The Integration–Replaceability Paradox: AI Workflow Integration, Perceived Role Replaceability, and Role Threat Appraisal",
      zh: "整合—可替代性弔詭：AI 工作流程整合、知覺角色可替代性與角色威脅評估",
    },
    titleMain: { en: "The Integration–Replaceability Paradox", zh: "整合—可替代性弔詭" },
    titleSub: {
      en: "AI Workflow Integration, Perceived Role Replaceability, and Role Threat Appraisal",
      zh: "AI 工作流程整合、知覺角色可替代性與角色威脅評估",
    },
    titleProvisional: true,
    authors: {
      display: { en: "Liu-Jung Lai", zh: "賴柳蓉（Liu-Jung Lai）" },
      note: {
        zh: "原稿署名 Eric Lai（獨立作者）；正式署名待作者確認。",
        en: "Manuscript byline: Eric Lai (sole author); formal byline pending author confirmation.",
      },
    },
    year: "2026",
    type: { zh: "實驗研究（2 × 2 情境實驗設計）", en: "Empirical study (2 × 2 scenario experiment design)" },
    status: {
      zh: "工作論文／研究進行中（尚未蒐集資料）",
      en: "Working manuscript · Research in progress (data not yet collected)",
    },
    statusSchema: "Working manuscript (research in progress; data not yet collected)",
    translationStatus: {
      label: { zh: "中文工作譯本（待作者審定）", en: "Chinese working translation (pending author review)" },
      authorApproved: false,
    },
    abstract: {
      en: null,
      zh: null,
    },
    keywords: {
      en: [
        "AI workflow integration",
        "perceived role replaceability",
        "integration–replaceability paradox",
        "role threat appraisal",
        "role-redesign commitment",
        "scenario experiment",
      ],
      provisional: true,
    },
    coreQuestion: {
      zh: "深度 AI 工作流程整合如何同時產生「導入成功」與「角色可替代」兩種知覺？可替代性又在何種條件下被轉譯為角色威脅？",
      en: "How does deep AI workflow integration simultaneously generate perceptions of implementation success and role replaceability, and under what conditions does perceived replaceability translate into role threat?",
    },
    availableSections: [
      { zh: "§1 緒論", en: "§1 Introduction" },
      { zh: "§2 理論背景", en: "§2 Theoretical Background" },
      { zh: "§3 假設發展與研究模型（H1a–H5、圖 1）", en: "§3 Hypotheses & Research Model (H1a–H5, Figure 1)" },
      { zh: "§4 研究方法", en: "§4 Method" },
      { zh: "§5 預定分析架構（無資料之模板）", en: "§5 Preregistered analysis plan (template, no data)" },
      { zh: "參考文獻", en: "References" },
      { zh: "附錄 A 實驗材料、附錄 B 題項池", en: "Appendix A materials & Appendix B item pools" },
    ],
    missingSections: [
      { zh: "摘要（資料蒐集後撰寫）", en: "Abstract (to be written after data collection)" },
      { zh: "§6 討論（佔位符）", en: "§6 Discussion (placeholder)" },
      { zh: "§7 結論（佔位符）", en: "§7 Conclusion (placeholder)" },
      { zh: "實證結果（尚未蒐集資料）", en: "Empirical results (data not yet collected)" },
    ],
    routes: {
      overview: "/papers/integration-replaceability-paradox",
      fullText: "/papers/integration-replaceability-paradox/full-text",
      guide: null,
      extras: [],
    },
    figures: [
      {
        src: "/figures/paper-b-figure1.png",
        zhSrc: "/figures/paper-b-figure1-zh.svg",
        caption: {
          zh: "圖 1：整合—可替代性弔詭之研究模型",
          en: "Figure 1: Research model of the integration–replaceability paradox",
        },
        alt: {
          zh: "圖 1：研究模型圖。AI 工作流程整合深度（操弄）以實線箭頭 H1a 指向知覺組織導入成功、以 H1b 指向知覺角色可替代性；兩者由大括號標為整合—可替代性弔詭。知覺角色可替代性以實線箭頭 H2 指向角色威脅評估；角色再設計承諾之可驗證佐證（操弄）以虛線箭頭 H4 指向可替代性—威脅路徑。",
          en: "Figure 1: research model. AI workflow integration depth (manipulated) points via solid arrows H1a to perceived organizational implementation success and H1b to perceived role replaceability; a bracket labels the two as the integration–replaceability paradox. Perceived role replaceability points via solid arrow H2 to role threat appraisal; role-redesign commitment substantiation (manipulated) moderates the replaceability-to-threat path via dashed arrow H4.",
        },
      },
    ],
    supplements: [],
    citation: {
      zh: "Lai (2026). The integration–replaceability paradox: AI workflow integration, perceived role replaceability, and role threat appraisal [Working manuscript, research in progress；暫定題名].",
      en: "Lai (2026). The integration–replaceability paradox: AI workflow integration, perceived role replaceability, and role threat appraisal [Working manuscript, research in progress; working title].",
    },
    featured: true,
    order: 2,
  },
];

export function getPaperEntry(slug: string): PaperEntry {
  const p = papers.find((x) => x.slug === slug);
  if (!p) throw new Error(`unknown paper slug: ${slug}`);
  return p;
}

export function featuredPapers(): PaperEntry[] {
  return papers.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function localizedTitle(p: PaperEntry, locale: Locale): string {
  return p.title[locale];
}
