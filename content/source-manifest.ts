/**
 * Source manifest — 可維護的來源清單。
 *
 * classification（公開分級，三級制）：
 *   "public"                                公開（網站或公開 repository）
 *   "embargoedUntilDataCollectionComplete"  資料蒐集完成前暫不公開；
 *                                           完整檔已移交作者私人保存，不在公開 repository
 *   "internalOnly"                          永久內部文件，不公開
 *
 * 規則：
 * - classification 非 "public" 的來源不得出現在公開網站、下載區或公開 repository。
 * - 解除 embargo 的條件與核准人見 docs/PUBLICATION_BOUNDARY.md；
 *   變更公開狀態必須由作者人工決定並編輯本檔。
 */

export type SourceClassification =
  | "public"
  | "embargoedUntilDataCollectionComplete"
  | "internalOnly";

export type SourceEntry = {
  id: string;
  filename: string;
  paperSlug: "enablement-narrative-backfire" | "integration-replaceability-paradox" | "site";
  type: "docx" | "mdx" | "md" | "json" | "png" | "svg" | "tsv";
  language: "en" | "zh-Hant" | "bilingual";
  version: string;
  classification: SourceClassification;
  /** 是否存放於公開 repository（embargoed／internal 一律 false） */
  inPublicRepo: boolean;
  notes: string;
};

export const sourceManifest: SourceEntry[] = [
  // ---- Paper A（全部公開） ----
  {
    id: "paper-a-en",
    filename: "content/en/paper.mdx",
    paperSlug: "enablement-narrative-backfire",
    type: "mdx",
    language: "en",
    version: "July 2026",
    classification: "public",
    inPublicRepo: true,
    notes: "Paper A 英文全文（manuscript under review）。",
  },
  {
    id: "paper-a-zh",
    filename: "content/zh/paper.mdx",
    paperSlug: "enablement-narrative-backfire",
    type: "mdx",
    language: "zh-Hant",
    version: "July 2026",
    classification: "public",
    inPublicRepo: true,
    notes: "Paper A 中文全文；術語由作者於 2026-07-27 整批核定。",
  },
  {
    id: "paper-a-terms",
    filename: "output/術語對照表.md",
    paperSlug: "enablement-narrative-backfire",
    type: "md",
    language: "bilingual",
    version: "2026-07-27（作者核定）",
    classification: "public",
    inPublicRepo: true,
    notes: "Paper A 核定術語表；Paper B 翻譯之繼承依據。",
  },
  {
    id: "paper-a-figure1",
    filename: "public/figures/figure1.png",
    paperSlug: "enablement-narrative-backfire",
    type: "png",
    language: "en",
    version: "July 2026",
    classification: "public",
    inPublicRepo: true,
    notes: "Paper A 圖 1。",
  },

  // ---- Paper B：公開部分 ----
  {
    id: "paper-b-en-excerpt",
    filename: "translation/paper-b/en_source.md",
    paperSlug: "integration-replaceability-paradox",
    type: "md",
    language: "en",
    version: "公開節錄版（自 v1 彙整檔，2026-07-30）",
    classification: "public",
    inPublicRepo: true,
    notes:
      "公開節錄：題名頁、§1（研究設計段落暫不公開）、§2、參考文獻。署名 Liu-Jung Lai（作者已確認）。",
  },
  {
    id: "paper-b-zh-excerpt",
    filename: "translation/paper-b/zh_draft.md",
    paperSlug: "integration-replaceability-paradox",
    type: "md",
    language: "zh-Hant",
    version: "公開節錄版（工作譯本，2026-07-30）",
    classification: "public",
    inPublicRepo: true,
    notes: "中文工作譯本之公開節錄（待作者審定）。authorApproved: false。",
  },
  {
    id: "paper-b-terms",
    filename: "translation/paper-b/terms.tsv",
    paperSlug: "integration-replaceability-paradox",
    type: "tsv",
    language: "bilingual",
    version: "v1（2026-07-30）",
    classification: "public",
    inPublicRepo: true,
    notes: "術語表（構念層級，不含題項內容）。",
  },

  // ---- Paper B：embargo（資料蒐集完成前暫不公開；不在公開 repo） ----
  {
    id: "paper-b-manuscript-full",
    filename: "Paper1_________v1.docx＋完整基準稿 en_source_FULL.md＋完整譯本 zh_draft_FULL.md（私人保存）",
    paperSlug: "integration-replaceability-paradox",
    type: "docx",
    language: "bilingual",
    version: "v1 彙整檔，as of 2026-07-30；完整譯本 198 平行區塊",
    classification: "embargoedUntilDataCollectionComplete",
    inPublicRepo: false,
    notes:
      "含 §3–§5、附錄 A（情境刺激、操弄、檢核、疑心探查）、附錄 B（題項池）。避免需求特徵／假設猜測／量測污染，資料蒐集完成或正式發表後始得公開。",
  },
  {
    id: "paper-b-figure1",
    filename: "paper-b-figure1.png／paper-b-figure1-zh.svg（私人保存）",
    paperSlug: "integration-replaceability-paradox",
    type: "png",
    language: "bilingual",
    version: "sealed（自 v1 docx 抽出）＋中文重建版",
    classification: "embargoedUntilDataCollectionComplete",
    inPublicRepo: false,
    notes:
      "研究模型圖直接標示 H1a／H1b／H2／H4，可能促成假設猜測；是否可於資料蒐集前公開，由作者人工裁決（見 PUBLICATION_BOUNDARY.md）。",
  },
  {
    id: "paper-b-translation-qa-full",
    filename: "translation_qa_FULL.md（私人保存）",
    paperSlug: "integration-replaceability-paradox",
    type: "md",
    language: "zh-Hant",
    version: "v1（2026-07-30）",
    classification: "embargoedUntilDataCollectionComplete",
    inPublicRepo: false,
    notes: "完整翻譯查核報告（含逐題項細節）；公開 repo 僅保留節錄版 translation_qa.md。",
  },

  // ---- 永久 internal-only ----
  {
    id: "paper-b-part2-instruments",
    filename: "（PART II 研究工具附件：專家審查冊、盲分類表、研究者附件、認知訪談骨架；未 commit）",
    paperSlug: "integration-replaceability-paradox",
    type: "docx",
    language: "bilingual",
    version: "最終封版",
    classification: "internalOnly",
    inPublicRepo: false,
    notes: "含「僅研究者持有」內容（預標風險清單、Item Decision Log 等）。永久不公開。",
  },
  {
    id: "extension-map-png",
    filename: "理論延伸圖.png（未在工作環境出現）",
    paperSlug: "integration-replaceability-paradox",
    type: "png",
    language: "zh-Hant",
    version: "—",
    classification: "internalOnly",
    inPublicRepo: false,
    notes: "性質未確認，預設 internal-only；如日後提供須先人工判定。",
  },
  {
    id: "five-layer-md",
    filename: "五層全展開_學術命題與產學經濟模式.md（未在工作環境出現）",
    paperSlug: "site",
    type: "md",
    language: "zh-Hant",
    version: "—",
    classification: "internalOnly",
    inPublicRepo: false,
    notes: "內部規劃文件；除非作者人工改為 public，否則不得公開。",
  },
];

/** 給頁面使用：僅回傳公開來源 */
export function publicSources(): SourceEntry[] {
  return sourceManifest.filter((s) => s.classification === "public");
}
