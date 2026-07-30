import type { L } from "@/content/papers";

/**
 * 作者資料（單一來源）。只放已由來源或作者確認之資訊；
 * 學位、職稱、得獎、經歷等未提供之項目一律不填、不虛構。
 */
export const author = {
  name: { en: "Liu-Jung Lai", zh: "賴柳蓉" },
  affiliation: {
    en: "Department of Business Management, Chienkuo Technology University",
    zh: "建國科技大學經營管理系",
  },
  location: { en: "Changhua City, Taiwan", zh: "臺灣彰化市" },
  orcid: "0009-0002-5441-3313",
  /** 手稿已公開之通訊信箱 */
  email: "alison.lai19830210@gmail.com",
  interests: {
    zh: [
      "生成式 AI 導入（generative AI implementation）",
      "賦能敘事與組織溝通",
      "角色威脅與角色機會評估",
      "組織意義建構（sensemaking）",
      "科技採用與員工回應",
      "AI 工作流程整合與角色可替代性",
    ],
    en: [
      "Generative AI implementation",
      "Enablement narratives and organizational communication",
      "Role threat and role opportunity appraisal",
      "Organizational sensemaking",
      "Technology adoption and employee responses",
      "AI workflow integration and role replaceability",
    ],
  },
  statement: {
    zh: "研究關注生成式 AI 導入為員工帶來的詮釋問題：組織的賦能敘事與導入結構如何被員工讀成關於自身角色的訊號，角色威脅與角色機會評估如何形成與更新，以及組織可信的角色再設計承諾能在何處介入。",
    en: "My research examines the interpretive problem generative AI implementation poses for employees: how organizational enablement narratives and deployment structures are read as signals about one's own role, how role threat and role opportunity appraisals form and update, and where credible organizational role-redesign commitments can intervene.",
  },
  /** 外部學術連結（僅列已確認者） */
  links: [
    { label: { zh: "ORCID", en: "ORCID" } as L, href: "https://orcid.org/0009-0002-5441-3313" },
  ],
} as const;
