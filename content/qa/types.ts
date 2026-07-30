export type QaCategory =
  | "enablement-narrative-backfire"
  | "integration-replaceability-paradox"
  | "research-direction";

export type QaItem = {
  id: string;
  locale: "zh" | "en";
  /** 相關論文；作者研究方向類問題用 "research-direction" */
  paperSlug: QaCategory;
  question: string;
  answer: string;
  /** 相關章節（如 "§2.3"），無則留空字串 */
  relatedSection: string;
  /** 相關假設或命題（如 "H4"、"P3"），無則留空字串 */
  relatedHypothesisOrProposition: string;
  /** 公開日期，格式 YYYY-MM-DD */
  date: string;
  /** 署名（anonymous 為 true 時不顯示） */
  attribution: string;
  anonymous: boolean;
  /** false 時完全不出現在網站上 */
  published: boolean;
};
