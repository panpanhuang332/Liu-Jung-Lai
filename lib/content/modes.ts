import type { L } from "@/lib/content/guide";

/** The four adoption response modes, condensed from Table 3 (§3.4). */
export type ModeId = "avoid" | "comp" | "defad" | "genint";

export type Mode = {
  id: ModeId;
  name: L;
  nameEn: string;
  driver: L;
  discretion: L;
  depth: L;
  meaning: L;
  source: L;
  anchors: { label: string; id: string }[];
};

export const modes: Mode[] = [
  {
    id: "avoid",
    name: { zh: "迴避", en: "Avoidance" },
    nameEn: "Avoidance",
    driver: { zh: "角色威脅＋低知覺因應資源", en: "Role threat under low perceived coping resources" },
    discretion: { zh: "高裁量權：員工可以拒絕", en: "High discretion: the employee can decline" },
    depth: { zh: "低：拒用、拖延或最低限度使用", en: "Low: refusal, delay, or minimal use" },
    meaning: { zh: "AI 是對角色的危險", en: "AI as danger to the role" },
    source: {
      zh: "威脅評估＋不足的次級評估資源（表 3；P8）",
      en: "Threat appraisal + low secondary appraisal resources (Table 3; P8)",
    },
    anchors: [
      { label: "§3.4", id: "s-3-4" },
      { label: "P8", id: "prop-p8" },
    ],
  },
  {
    id: "comp",
    name: { zh: "純遵從性使用", en: "Compliance-only use" },
    nameEn: "Compliance-only use",
    driver: { zh: "外部強制要求，未內化", en: "External mandate, not internalized" },
    discretion: { zh: "低裁量權：使用是被規定的", en: "Low discretion: use is mandated" },
    depth: { zh: "淺：滿足要求即止，無自我保護意圖", en: "Shallow: satisfies a requirement; no protective intent" },
    meaning: { zh: "AI 是被加諸的要求", en: "AI as imposed requirement" },
    source: {
      zh: "強制要求；無自我保護動機（表 3；P9）",
      en: "Mandate; no protective motive (Table 3; P9)",
    },
    anchors: [
      { label: "§3.4", id: "s-3-4" },
      { label: "P9", id: "prop-p9" },
      { label: "P9a", id: "prop-p9a" },
    ],
  },
  {
    id: "defad",
    name: { zh: "防衛性採用", en: "Defensive adoption" },
    nameEn: "Defensive adoption",
    driver: { zh: "角色威脅＋自我保護動機", en: "Role threat with a protective motive" },
    discretion: { zh: "自發，常超出被規定的範圍", en: "Self-initiated, often beyond what is mandated" },
    depth: { zh: "量中—高，但常是淺而不穩定的整合", en: "Medium–high in volume but often shallow and unstable" },
    meaning: { zh: "AI 是生存工具——維持不可或缺", en: "AI as survival tool—remaining indispensable" },
    source: {
      zh: "威脅評估＋足夠的次級評估資源（高因應效能）（表 3；P8）",
      en: "Threat appraisal + adequate secondary appraisal resources (high coping efficacy) (Table 3; P8)",
    },
    anchors: [
      { label: "§3.4", id: "s-3-4" },
      { label: "P8", id: "prop-p8" },
      { label: "P9a", id: "prop-p9a" },
    ],
  },
  {
    id: "genint",
    name: { zh: "真正整合", en: "Genuine integration" },
    nameEn: "Genuine integration",
    driver: { zh: "角色機會評估，或成功的再評估", en: "Role opportunity appraisal or successful reappraisal" },
    discretion: { zh: "自願內化", en: "Voluntary internalization" },
    depth: { zh: "深而穩定：納入工作流程與角色，最深處是角色再設計", en: "Deep and stable: incorporation into workflow and role; at its fullest, role redesign" },
    meaning: { zh: "AI 是角色的延伸", en: "AI as role extension" },
    source: {
      zh: "機會評估／經迴圈的再評估——非僅威脅（表 3；P10）",
      en: "Opportunity appraisal / reappraisal via the loop—not threat alone (Table 3; P10)",
    },
    anchors: [
      { label: "§3.4", id: "s-3-4" },
      { label: "P10", id: "prop-p10" },
    ],
  },
];

/**
 * Self-check questions. Two per Table 3 criterion (driver, discretion/mandate,
 * behavioral depth, role meaning); every option maps to exactly one mode.
 * Teaching illustration only — NOT a validated scale.
 */
export type QuizQuestion = {
  criterion: L;
  q: L;
  options: { mode: ModeId; text: L }[];
};

export const quiz: QuizQuestion[] = [
  {
    criterion: { zh: "驅動因素", en: "Driver" },
    q: { zh: "你目前使用（或不使用）生成式 AI，最主要的原因是？", en: "What is the main reason you currently use—or don't use—generative AI?" },
    options: [
      { mode: "comp", text: { zh: "公司要求，照規定用", en: "The organization requires it, so I follow the rule" } },
      { mode: "defad", text: { zh: "擔心不用會落後、顯得可被取代", en: "I worry that not using it would make me look replaceable" } },
      { mode: "genint", text: { zh: "它實際擴展了我能完成的工作", en: "It genuinely extends what I can accomplish" } },
      { mode: "avoid", text: { zh: "我盡可能避免使用它", en: "I avoid it as much as I can" } },
    ],
  },
  {
    criterion: { zh: "驅動因素", en: "Driver" },
    q: { zh: "想到工作中的生成式 AI，最貼近你的感受是？", en: "Thinking of generative AI at work, which feeling is closest to yours?" },
    options: [
      { mode: "avoid", text: { zh: "它是威脅，能閃就閃", en: "It is a danger; I keep my distance" } },
      { mode: "comp", text: { zh: "它是一項被交辦的要求", en: "It is an imposed requirement" } },
      { mode: "defad", text: { zh: "它是生存工具——用得夠多才安全", en: "It is a survival tool—using it heavily keeps me safe" } },
      { mode: "genint", text: { zh: "它是我角色的延伸", en: "It is an extension of my role" } },
    ],
  },
  {
    criterion: { zh: "裁量權／強制性", en: "Discretion / mandate" },
    q: { zh: "如果公司明天撤回使用要求，你會？", en: "If the mandate were withdrawn tomorrow, you would…" },
    options: [
      { mode: "comp", text: { zh: "那就不用了", en: "Stop using it" } },
      { mode: "defad", text: { zh: "照樣大量使用——停下來不安全", en: "Keep using it heavily—stopping feels unsafe" } },
      { mode: "genint", text: { zh: "照常使用，它已是我工作方式的一部分", en: "Keep using it; it is part of how I work now" } },
      { mode: "avoid", text: { zh: "本來就幾乎沒在用", en: "Nothing changes; I hardly used it anyway" } },
    ],
  },
  {
    criterion: { zh: "裁量權／強制性", en: "Discretion / mandate" },
    q: { zh: "你的使用量相對於公司要求的最低限度：", en: "Relative to the mandated minimum, your use is…" },
    options: [
      { mode: "comp", text: { zh: "大致貼著最低限度", en: "Right at the minimum" } },
      { mode: "defad", text: { zh: "遠超過，而且多半出於不安", en: "Far beyond it, mostly out of unease" } },
      { mode: "genint", text: { zh: "超過，因為它自然融入了流程", en: "Beyond it, because it fits my workflow naturally" } },
      { mode: "avoid", text: { zh: "連最低限度都想拖延", en: "I delay even the minimum" } },
    ],
  },
  {
    criterion: { zh: "行為深度", en: "Behavioral depth" },
    q: { zh: "生成式 AI 在你工作流程中的位置是？", en: "Where does generative AI sit in your workflow?" },
    options: [
      { mode: "avoid", text: { zh: "幾乎不存在", en: "Practically absent" } },
      { mode: "comp", text: { zh: "只出現在被要求的環節", en: "Only in the steps where it is required" } },
      { mode: "defad", text: { zh: "用量很大，但多是表面、可拋棄的用法", en: "High volume, but mostly surface-level, disposable uses" } },
      { mode: "genint", text: { zh: "深度整合，改變了我完成工作的方式", en: "Deeply integrated; it has changed how I get work done" } },
    ],
  },
  {
    criterion: { zh: "行為深度", en: "Behavioral depth" },
    q: { zh: "你的使用型態隨時間的變化是？", en: "How does your use change over time?" },
    options: [
      { mode: "defad", text: { zh: "威脅感高時猛用，鬆一點就退", en: "Spikes when I feel threatened, recedes when I relax" } },
      { mode: "genint", text: { zh: "穩定，而且持續加深", en: "Stable and steadily deepening" } },
      { mode: "comp", text: { zh: "看規定：要求變了才變", en: "Tracks the rules; changes only when they change" } },
      { mode: "avoid", text: { zh: "一直很低，能避就避", en: "Consistently low; I avoid it where possible" } },
    ],
  },
  {
    criterion: { zh: "角色意義", en: "Role meaning" },
    q: { zh: "對你而言，生成式 AI 與你的角色的關係是？", en: "For you, the relation between generative AI and your role is…" },
    options: [
      { mode: "avoid", text: { zh: "危險——它在侵蝕我的角色", en: "Danger—it is eroding my role" } },
      { mode: "comp", text: { zh: "外加的要求，與我的角色無關", en: "An add-on requirement, unrelated to my role" } },
      { mode: "defad", text: { zh: "我必須駕馭它，才能保住位置", en: "Something I must master to keep my place" } },
      { mode: "genint", text: { zh: "它增益、提升或重塑了我的角色", en: "It augments, elevates, or reinvents my role" } },
    ],
  },
  {
    criterion: { zh: "角色意義", en: "Role meaning" },
    q: { zh: "使用（或迴避）AI 之後，你對自身角色價值的感受是？", en: "After using (or avoiding) AI, how do you feel about the value of your role?" },
    options: [
      { mode: "avoid", text: { zh: "我不想靠近這個問題", en: "I would rather not go near the question" } },
      { mode: "comp", text: { zh: "沒有改變，只是多了一項規定", en: "Unchanged; it is just one more rule" } },
      { mode: "defad", text: { zh: "更焦慮：得不斷證明自己不可或缺", en: "More anxious: I must keep proving I am indispensable" } },
      { mode: "genint", text: { zh: "更清楚我的價值在哪、AI 如何配合", en: "Clearer about where my value lies and how AI fits" } },
    ],
  },
];
