export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

export const htmlLang: Record<Locale, string> = {
  zh: "zh-Hant",
  en: "en",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://panpanhuang332.github.io/Liu-Jung-Lai";

export const paperTitle = {
  en: "When Enablement Narratives Backfire: Recursive Sensemaking and Modes of Adoption Response in Generative AI Implementation",
  zh: "當賦能敘事反噬：生成式 AI 導入中的遞迴意義建構與採用回應模式",
} as const;

/** split title for the hero hierarchy (main visual title vs. subtitle) */
export const paperTitleMain = {
  en: "When Enablement Narratives Backfire",
  zh: "當賦能敘事反噬",
} as const;

export const paperTitleSub = {
  en: "Recursive Sensemaking and Modes of Adoption Response in Generative AI Implementation",
  zh: "生成式 AI 導入中的遞迴意義建構與採用回應模式",
} as const;

/** manuscript status + version — single source, keep dates out of components */
export const paperStatus = {
  en: "Conceptual paper · Manuscript under review",
  zh: "概念性論文 · 投稿審查中",
} as const;

export const paperVersion = {
  en: "Version: July 2026",
  zh: "版本：2026 年 7 月",
} as const;

export const authorEmail = "alison.lai19830210@gmail.com";

/** shared Open Graph image (static asset, stable path) */
export const ogImage = [
  {
    url: `${siteUrl}/og.png`,
    width: 1200,
    height: 630,
    alt: "When Enablement Narratives Backfire — concept model and central claim",
  },
];

export const authorName = {
  en: "Liu-Jung Lai",
  zh: "賴柳蓉",
} as const;

export const affiliation = {
  en: "Department of Business Management, Chienkuo Technology University",
  zh: "建國科技大學經營管理系",
} as const;

export const orcid = "0009-0002-5441-3313";

type Dict = {
  siteName: string;
  nav: {
    home: string;
    papers: string;
    paper: string;
    guide: string;
    mechanisms: string;
    propositions: string;
    modes: string;
    glossary: string;
    cite: string;
    questions: string;
    qa: string;
    about: string;
  };
  footer: {
    statusNote: string;
    rights: string;
  };
  underConstruction: string;
  underConstructionNote: string;
  themeToggle: { toLight: string; toDark: string };
  langSwitch: { label: string; other: string };
  skipToContent: string;
};

export const dictionaries: Record<Locale, Dict> = {
  zh: {
    siteName: "Liu-Jung Lai｜學術網站",
    nav: {
      home: "首頁",
      papers: "學術作品",
      paper: "論文全文",
      guide: "導讀",
      mechanisms: "機制拆解",
      propositions: "命題總表",
      modes: "採用模式",
      glossary: "術語辭典",
      cite: "引用本文",
      questions: "讀者提問",
      qa: "學術問答",
      about: "關於作者",
    },
    footer: {
      statusNote:
        "本站各篇論文依其頁面標示之狀態呈現（投稿中手稿或研究進行中之工作論文），均尚未正式發表。",
      rights: "版權所有",
    },
    underConstruction: "此頁面建置中",
    underConstructionNote: "內容將於近期上線。",
    themeToggle: { toLight: "切換至淺色模式", toDark: "切換至深色模式" },
    langSwitch: { label: "切換語言", other: "English" },
    skipToContent: "跳至主要內容",
  },
  en: {
    siteName: "Liu-Jung Lai | Academic Site",
    nav: {
      home: "Home",
      papers: "Papers",
      paper: "Full Paper",
      guide: "Reader's Guide",
      mechanisms: "Mechanisms",
      propositions: "Propositions",
      modes: "Adoption Modes",
      glossary: "Glossary",
      cite: "Cite",
      questions: "Ask a Question",
      qa: "Q&A",
      about: "About",
    },
    footer: {
      statusNote:
        "Papers on this site carry the status shown on their pages (manuscript under review, or working manuscript with research in progress); none has been formally published.",
      rights: "All rights reserved",
    },
    underConstruction: "This page is under construction",
    underConstructionNote: "Content will be available soon.",
    themeToggle: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
    langSwitch: { label: "Switch language", other: "中文" },
    skipToContent: "Skip to main content",
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/** hreflang alternates for a given path (path is locale-less, e.g. "/paper") */
export function languageAlternates(path: string) {
  const clean = path === "/" ? "" : path;
  return {
    languages: {
      "zh-Hant": `${siteUrl}/zh${clean}/`,
      en: `${siteUrl}/en${clean}/`,
      "x-default": `${siteUrl}/zh${clean}/`,
    },
  };
}
