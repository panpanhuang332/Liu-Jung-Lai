import type { L } from "@/lib/content/guide";

/**
 * Per-proposition metadata: plain-language gloss, mechanism group, tier, and
 * the observable test derived from §5.3. The proposition texts themselves are
 * NOT stored here — they are extracted verbatim from the paper at build time.
 */

export type MechGroup = "mech1" | "appraisal" | "mech2" | "outcome";
export type Tier = "core" | "antecedent" | "boundary";

export const mechLabels: Record<MechGroup, L> = {
  mech1: { zh: "機制一：敘事反噬", en: "Mechanism 1: narrative backfire" },
  appraisal: { zh: "評估雙路徑", en: "Dual-pathway appraisal" },
  mech2: { zh: "機制二：意義建構迴圈", en: "Mechanism 2: sensemaking loop" },
  outcome: { zh: "結果：回應模式", en: "Outcome: response modes" },
};

export const tierLabels: Record<Tier, L> = {
  core: { zh: "主要構念", en: "Primary construct" },
  antecedent: { zh: "脈絡前因", en: "Contextual antecedent" },
  boundary: { zh: "邊界條件", en: "Boundary condition" },
};

export type PropMeta = {
  id: string; // P1, P1a, ... matches paper anchor prop-p1 etc.
  mech: MechGroup;
  tier: Tier;
  gloss: L;
  test: L;
};

export const propMeta: PropMeta[] = [
  {
    id: "P1",
    mech: "mech1",
    tier: "core",
    gloss: {
      zh: "訊息越是「標記化的再保證＋策略性模糊＋效率語彙」，被逆轉成替代框架的可能性越高；三者疊加時最強。",
      en: "The more a message combines marked reassurance, strategic ambiguity, and efficiency vocabulary, the likelier its reversal into a substitution frame—strongest when the three co-occur.",
    },
    test: {
      zh: "訊息屬性實驗：操弄再保證、模糊、效率框架三因子，量測「AI 即替代」框架的形成（§5.3）。",
      en: "Message-property experiment: manipulate reassurance, ambiguity, and efficiency framing; measure formation of the AI-as-substitute frame (§5.3).",
    },
  },
  {
    id: "P1a",
    mech: "mech1",
    tier: "core",
    gloss: {
      zh: "反向命題：訊息越具體——任務範圍、角色後果、可查核承諾——逆轉的可能性越低。",
      en: "The converse: the more specific the message—task scope, role consequences, observable commitments—the lower the likelihood of reversal.",
    },
    test: {
      zh: "在同一實驗中加入「特定性」對照訊息（比照 Schweiger & DeNisi 的務實預告設計）。",
      en: "Add a specificity contrast message to the same experiment (on the model of Schweiger & DeNisi's realistic preview).",
    },
  },
  {
    id: "P2",
    mech: "mech1",
    tier: "antecedent",
    gloss: {
      zh: "知覺角色脆弱性、低參與、言行不一致三個前因墊高逆轉的基線機率，疊加時進一步放大。",
      en: "Perceived role vulnerability, low participation, and word–deed inconsistency raise the baseline probability of reversal, amplifying further in combination.",
    },
    test: {
      zh: "實驗交叉角色脆弱性情境，或於田野測三前因與框架形成的關聯（可用工作不安全感、STARA 覺察量表）。",
      en: "Cross the experiment with role-vulnerability conditions, or field-test the three antecedents against frame formation (job-insecurity and STARA-awareness scales available).",
    },
  },
  {
    id: "P3",
    mech: "mech1",
    tier: "boundary",
    gloss: {
      zh: "組織信任是調節閥：信任低時逆轉更強，信任高時同一訊息較可能被照字面接受。",
      en: "Organizational trust is the moderator: reversal strengthens under low trust; under high trust the same message is more readily taken at face value.",
    },
    test: {
      zh: "訊息實驗交叉高／低信任情境；以 Mayer et al.（1995）信任構面測量。",
      en: "Cross the message experiment with high/low trust conditions; measure trust with the Mayer et al. (1995) facets.",
    },
  },
  {
    id: "P4",
    mech: "appraisal",
    tier: "core",
    gloss: {
      zh: "替代框架把初級評估推向威脅、升高被點名角色成分的威脅評估；是否同時出現機會評估取決於次級資源，不取決於框架本身。",
      en: "The frame biases primary appraisal toward threat and raises threat appraisal on the implicated role components; whether opportunity appraisal also arises depends on secondary resources, not on the frame alone.",
    },
    test: {
      zh: "框架與評估以參照對象區分測量（事件的意義 vs. 自身角色成分），驗證性因素分析確立區辨效度；依表 2 成分式測量（§5.3）。",
      en: "Measure frame and appraisal with referentially distinct items (meaning of the event vs. one's own role components); establish discriminant validity via CFA; measure componentially per Table 2 (§5.3).",
    },
  },
  {
    id: "P4a",
    mech: "appraisal",
    tier: "antecedent",
    gloss: {
      zh: "參與式導入、可信的角色再設計承諾、增益導向示範直接提高機會評估——不只是降低反噬機率的副作用。",
      en: "Participatory implementation, credible role-redesign commitment, and augmentation-configured demonstration raise opportunity appraisal directly—not merely by lowering the odds of reversal.",
    },
    test: {
      zh: "田野比較三前因存在與否時的機會評估水準（成分式測量：增益／提升／再造）。",
      en: "Field-compare opportunity appraisal with and without the three antecedents (componential measures: augmentation/elevation/reinvention).",
    },
  },
  {
    id: "P5",
    mech: "mech2",
    tier: "boundary",
    gloss: {
      zh: "線索要先被採信才移動評估：機器捷思放大線索的影響，對系統不均表現的認識折抵它。",
      en: "A cue moves an appraisal only if credited: the machine heuristic amplifies a cue's influence; awareness of the system's unevenness discounts it.",
    },
    test: {
      zh: "經驗取樣同時記錄線索接觸與採信程度；以機器捷思量表（Yang & Sundar, 2024）測可信度。",
      en: "Experience-sample cue exposure alongside crediting; measure credibility with the machine-heuristic scale (Yang & Sundar, 2024).",
    },
  },
  {
    id: "P6",
    mech: "mech2",
    tier: "core",
    gloss: {
      zh: "看它做，比聽它說更有力：示範性線索比自指涉線索更能移動評估，任務越貼近角色核心，差距越大。",
      en: "Watching it do beats hearing it claim: demonstrative cues move appraisals more than self-referential ones, and the gap widens with task-role overlap.",
    },
    test: {
      zh: "受控示範實驗：同一能力以「自述 vs. 實際示範」呈現，交叉任務—角色重疊度，比較評估位移。",
      en: "Controlled demonstration experiment: present the same capability as self-description vs. actual demonstration, crossed with task-role overlap; compare appraisal shifts.",
    },
  },
  {
    id: "P7",
    mech: "mech2",
    tier: "core",
    gloss: {
      zh: "初始框架引導探測方向與模糊線索的解讀；證據一致且被採信→固化，衝突且部分採信→擺盪，強反證且被採信→逆轉。",
      en: "The initial frame channels probes and biases ambiguous cues; consistent credited evidence entrenches, conflicting partially credited evidence oscillates, strong credited disconfirmation reverses.",
    },
    test: {
      zh: "個人內跨時間設計：日誌／經驗取樣逐次記錄探測與評估更新，或對實際員工—AI 互動作歷程追蹤（§5.3）。",
      en: "Within-person over-time designs: diary/experience sampling of successive probes and appraisal updates, or process tracing of actual employee–AI interaction (§5.3).",
    },
  },
  {
    id: "P8",
    mech: "outcome",
    tier: "boundary",
    gloss: {
      zh: "高威脅之下由次級資源選模式：資源少→迴避（拒用、拖延、最低度使用）；資源足→防衛性採用（自發超額使用、量大整合淺、威脅退則退）。",
      en: "Under high threat, secondary resources select the mode: scarce resources yield avoidance (refusal, delay, minimal use); adequate resources yield defensive adoption (self-initiated above-mandate use, high volume, shallow integration, receding with the threat).",
    },
    test: {
      zh: "同時測威脅評估、因應資源與可觀察使用軌跡；檢驗資源在威脅→模式關係中的調節。",
      en: "Measure threat appraisal, coping resources, and observable use trajectories; test resources as the moderator in the threat-to-mode link.",
    },
  },
  {
    id: "P9",
    mech: "outcome",
    tier: "core",
    gloss: {
      zh: "外部強制而未內化時產生純遵從性使用：貼著規定的最低限度、不延伸到裁量任務、命令撤除就停。",
      en: "External mandate without internalization yields compliance-only use: tracking the mandated minimum, not extending to discretionary tasks, lapsing when the mandate is withdrawn.",
    },
    test: {
      zh: "強制情境中追蹤三個訊號：是否貼最低要求、是否延伸裁量任務、撤令後是否延續。",
      en: "In mandated settings track three signals: does use track the minimum, extend to discretionary tasks, persist after withdrawal.",
    },
  },
  {
    id: "P9a",
    mech: "outcome",
    tier: "core",
    gloss: {
      zh: "純遵從與防衛性採用在單一時點可能難分，但軌跡可分：防衛性採用超額、外溢到裁量任務、隨威脅持續而持續。",
      en: "Compliance-only use and defensive adoption may coincide at a moment but diverge in trajectory: defensive adoption exceeds the minimum, spills into discretionary tasks, and persists with the threat.",
    },
    test: {
      zh: "縱貫使用軌跡分析（適合潛在轉移分析），以超額性、裁量延伸、持續性三特徵區分兩模式。",
      en: "Longitudinal trajectory analysis (latent transition analysis suits this), separating the modes by excess, discretionary extension, and persistence.",
    },
  },
  {
    id: "P10",
    mech: "outcome",
    tier: "core",
    gloss: {
      zh: "真正整合只能來自機會評估或迴圈中成功的再評估；防衛性採用不會自動轉化為真正整合。",
      en: "Genuine integration arises only from opportunity appraisal or a successful reappraisal through the loop; defensive adoption does not convert on its own.",
    },
    test: {
      zh: "縱貫追蹤防衛性採用者是否經再評估轉為整合；測自我保護動機與使用穩定性以分辨兩模式（§5.3）。",
      en: "Longitudinally track whether defensive adopters convert via reappraisal; measure protective motive and stability of use to separate the modes (§5.3).",
    },
  },
];
