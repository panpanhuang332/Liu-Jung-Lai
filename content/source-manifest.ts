/**
 * Source manifest — 可維護的來源清單。
 *
 * publicationStatus 詞彙：
 *   "published-on-site"     已公開於網站
 *   "working-translation"   中文工作譯本（待作者審定）
 *   "internal-only"         內部文件，不公開
 *   "not-in-workspace"      提示中提及但目前工作環境未找到
 *
 * 規則：`public: false` 的來源不得出現在公開頁面或下載區。
 * 變更公開狀態必須由人工編輯本檔（不得由程式自動改動）。
 */

export type SourceEntry = {
  id: string;
  filename: string;
  paperSlug: "enablement-narrative-backfire" | "integration-replaceability-paradox" | "site";
  type: "docx" | "mdx" | "md" | "json" | "png" | "svg" | "tsv";
  language: "en" | "zh-Hant" | "bilingual";
  version: string;
  publicationStatus:
    | "published-on-site"
    | "working-translation"
    | "internal-only"
    | "not-in-workspace";
  public: boolean;
  notes: string;
};

export const sourceManifest: SourceEntry[] = [
  // ---- Paper A ----
  {
    id: "paper-a-en",
    filename: "content/en/paper.mdx",
    paperSlug: "enablement-narrative-backfire",
    type: "mdx",
    language: "en",
    version: "July 2026",
    publicationStatus: "published-on-site",
    public: true,
    notes: "Paper A 英文全文（manuscript under review）。",
  },
  {
    id: "paper-a-zh",
    filename: "content/zh/paper.mdx",
    paperSlug: "enablement-narrative-backfire",
    type: "mdx",
    language: "zh-Hant",
    version: "July 2026",
    publicationStatus: "published-on-site",
    public: true,
    notes: "Paper A 中文全文；術語由作者於 2026-07-27 整批核定。",
  },
  {
    id: "paper-a-terms",
    filename: "output/術語對照表.md",
    paperSlug: "enablement-narrative-backfire",
    type: "md",
    language: "bilingual",
    version: "2026-07-27（作者核定）",
    publicationStatus: "published-on-site",
    public: true,
    notes: "Paper A 核定術語表；Paper B 翻譯之繼承依據。",
  },
  {
    id: "paper-a-figure1",
    filename: "public/figures/figure1.png",
    paperSlug: "enablement-narrative-backfire",
    type: "png",
    language: "en",
    version: "July 2026",
    publicationStatus: "published-on-site",
    public: true,
    notes: "Paper A 圖 1。",
  },

  // ---- Paper B ----
  {
    id: "paper-b-manuscript-v1",
    filename: "Paper1_________v1.docx（上傳原稿，未 commit 全檔）",
    paperSlug: "integration-replaceability-paradox",
    type: "docx",
    language: "en",
    version: "v1 彙整檔，as of 2026-07-30",
    publicationStatus: "working-translation",
    public: true,
    notes:
      "Paper B 唯一來源。公開範圍：題名頁至 Appendix B（working manuscript）。缺 Abstract、§6、§7；§5 為預定分析架構模板。PART II 不在公開範圍。",
  },
  {
    id: "paper-b-en-source",
    filename: "translation/paper-b/en_source.md",
    paperSlug: "integration-replaceability-paradox",
    type: "md",
    language: "en",
    version: "自 v1 docx 整理（2026-07-30）",
    publicationStatus: "published-on-site",
    public: true,
    notes: "Paper B 英文基準稿（公開章節）。",
  },
  {
    id: "paper-b-zh-draft",
    filename: "translation/paper-b/zh_draft.md",
    paperSlug: "integration-replaceability-paradox",
    type: "md",
    language: "zh-Hant",
    version: "工作譯本 v1（2026-07-30）",
    publicationStatus: "working-translation",
    public: true,
    notes: "中文工作譯本（待作者審定）。authorApproved: false。",
  },
  {
    id: "paper-b-terms",
    filename: "translation/paper-b/terms.tsv",
    paperSlug: "integration-replaceability-paradox",
    type: "tsv",
    language: "bilingual",
    version: "v1（2026-07-30）",
    publicationStatus: "working-translation",
    public: true,
    notes: "Paper B 術語表；含 inherited-confirmed / proposed / needs-author-review 狀態。",
  },
  {
    id: "paper-b-figure1",
    filename: "public/figures/paper-b-figure1.png",
    paperSlug: "integration-replaceability-paradox",
    type: "png",
    language: "en",
    version: "sealed（自 v1 docx 抽出）",
    publicationStatus: "published-on-site",
    public: true,
    notes: "Paper B 圖 1（研究模型，英文原圖）。",
  },
  {
    id: "paper-b-figure1-zh",
    filename: "public/figures/paper-b-figure1-zh.svg",
    paperSlug: "integration-replaceability-paradox",
    type: "svg",
    language: "zh-Hant",
    version: "中文重建版 v1",
    publicationStatus: "working-translation",
    public: true,
    notes: "依英文原圖忠實重建之中文版（節點、箭頭、線型、假設編號不變）。",
  },
  {
    id: "paper-b-part2-instruments",
    filename: "（PART II 研究工具附件：專家審查冊、盲分類表、研究者附件、認知訪談骨架；未 commit）",
    paperSlug: "integration-replaceability-paradox",
    type: "docx",
    language: "bilingual",
    version: "最終封版",
    publicationStatus: "internal-only",
    public: false,
    notes: "含「僅研究者持有」內容。不公開、不放入 repository。",
  },

  // ---- 提示提及但未找到 ----
  {
    id: "extension-map-png",
    filename: "理論延伸圖.png",
    paperSlug: "integration-replaceability-paradox",
    type: "png",
    language: "zh-Hant",
    version: "—",
    publicationStatus: "not-in-workspace",
    public: false,
    notes: "未在工作環境找到；性質未確認，預設 internal-only。",
  },
  {
    id: "five-layer-md",
    filename: "五層全展開_學術命題與產學經濟模式.md",
    paperSlug: "site",
    type: "md",
    language: "zh-Hant",
    version: "—",
    publicationStatus: "not-in-workspace",
    public: false,
    notes: "內部規劃文件；除非人工改為 public，否則不得公開。",
  },
];

/** 給頁面使用：僅回傳可公開來源 */
export function publicSources(): SourceEntry[] {
  return sourceManifest.filter((s) => s.public);
}
