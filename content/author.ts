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
  /** 一句學術定位（作者提供，2026-07-30） */
  positioning: {
    zh: "研究生成式 AI 導入過程中，組織如何塑造員工對科技、角色與未來工作的理解。",
    en: "Researching how organizations shape employees' understanding of technology, roles, and future work during generative AI implementation.",
  },
  /** 研究主張 pull quote（作者提供，2026-07-30） */
  quote: {
    zh: "AI 的影響不只來自它能做什麼，也來自組織如何解釋它將改變什麼。",
    en: "The impact of AI lies not only in what it can do, but also in how organizations explain what it will change.",
  },
  /** 研究簡介（兩段短文，取代單一長段） */
  introParagraphs: {
    zh: [
      "當組織導入生成式 AI，員工聽到的往往不只是新工具的功能，而是關於自身角色的訊號。賦能敘事可能被讀成替代的前兆，深度的 AI 工作流程整合也可能同時發出「導入成功」與「角色可被替代」兩種訊號——這些詮釋，決定了角色威脅或角色機會評估的走向。",
      "我的研究以組織意義建構為軸，追索這些訊號如何形成、如何被員工遞迴更新，並如何分化為迴避、純遵從、防衛性採用或真正整合等不同的採用回應；同時探討組織可信的角色再設計承諾，能在哪個環節改變這條路徑。",
    ],
    en: [
      "When organizations implement generative AI, what employees hear is rarely just a tool's features — it is a signal about their own role. Enablement narratives can be read as omens of substitution, and deep AI workflow integration can signal implementation success and role replaceability at once; these readings steer role threat and role opportunity appraisals.",
      "Anchored in organizational sensemaking, my research traces how these signals form, how employees recursively update them, and how they diverge into avoidance, compliance-only use, defensive adoption, or genuine integration — and asks where credible organizational role-redesign commitments can change that path.",
    ],
  },
  /** 研究主題：核心／延伸 兩層 */
  coreTopics: [
    {
      label: { zh: "生成式 AI 導入與員工回應", en: "Generative AI implementation & employee responses" },
      href: "/papers",
    },
    {
      label: { zh: "組織意義建構與科技框架", en: "Organizational sensemaking & technological frames" },
      href: "/papers/enablement-narrative-backfire",
    },
    {
      label: { zh: "角色威脅／角色機會評估", en: "Role threat / role opportunity appraisal" },
      href: "/papers/integration-replaceability-paradox",
    },
  ],
  extendedTopics: [
    { label: { zh: "賦能敘事與組織溝通", en: "Enablement narratives & organizational communication" }, href: null },
    { label: { zh: "AI 工作流程整合", en: "AI workflow integration" }, href: null },
  ],
  /** 研究象徵圖像（非作者照片；暫時素材，授權確認前不得長期使用） */
  avatar: {
    path: "/images/author/research-avatar.jpg",
    label: { zh: "研究象徵圖像", en: "Symbolic research avatar" },
    alt: {
      zh: "以水瓶座聖鬥士絕招曙光女神之寬恕構成的象徵性研究圖像，代表AI時代知識如流水、但人類需要有承接器皿以留住所需要的知識，否則就只是鏡花水月。",
      en: "A symbolic image inspired by the Aquarius Gold Saint's iconic technique, Aurora Execution. It conveys the notion that, in the AI era, knowledge flows like an endless stream of water. Human beings must possess a vessel to receive, preserve, and internalize what truly matters; otherwise, knowledge remains as intangible as a reflection on water or a flower in a mirror.",
    },
  },
  /** 外部學術連結（僅列已確認者） */
  links: [
    { label: { zh: "ORCID", en: "ORCID" } as L, href: "https://orcid.org/0009-0002-5441-3313" },
  ],
} as const;
