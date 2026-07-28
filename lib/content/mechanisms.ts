import type { L } from "@/lib/content/guide";

/** Mechanism 1 — five pragmatic drivers (§2.3.1–2.3.5). Example sentences are
 * taken or adapted directly from the manuscript's own examples. */
export type Driver = {
  id: string;
  anchor: string;
  name: L;
  principle: L;
  example: L;
  reversal: L;
  refLabel: L;
};

export const drivers: Driver[] = [
  {
    id: "reassurance",
    anchor: "s-2-3-1",
    name: { zh: "標記化的再保證", en: "Marked reassurance" },
    principle: {
      zh: "依葛萊斯語用學，聽者假定說話者是合作且切題的，因此會推論字面之外的意思。特意去否認一個沒人提起的可能性，等於承認它值得否認——再保證在語用上是「有標記的」，Wegner 等人的暗示效應研究顯示連否認都能把聽者信念推向被否認的命題。",
      en: "On Gricean pragmatics, hearers assume speakers are cooperative and relevant, and so infer meaning beyond literal content. Explicitly denying a possibility no one has raised concedes that it is worth denying—reassurance is pragmatically marked, and Wegner and colleagues' innuendo-effect studies show that even denials can move beliefs toward the denied proposition.",
    },
    example: {
      zh: "「大家放心，導入 AI 不是要取代任何人。」",
      en: "“Don't worry—AI will not replace anyone here.”",
    },
    reversal: {
      zh: "這句話把「被取代」從無人談論變成檯面上的活生生可能。在角色後果不確定、信任偏低、先前經驗已埋下疑心的條件下，否認本身供給了它想移除的那個信念。",
      en: "The sentence turns replacement from an unraised topic into a live possibility on the table. Under role uncertainty, low trust, and suspicion primed by past experience, the act of denial supplies the very belief it was meant to remove.",
    },
    refLabel: { zh: "對應 §2.3.1", en: "Corresponds to §2.3.1" },
  },
  {
    id: "ambiguity",
    anchor: "s-2-3-2",
    name: { zh: "策略性模糊", en: "Strategic ambiguity" },
    principle: {
      zh: "組織經常策略性地使用模糊——保留彈性、容許多重解讀、保留否認空間（Eisenberg, 1984）。代價是把詮釋負擔轉嫁給員工：訊息留下的空白，會被員工用自己的先驗補完。",
      en: "Organizations often use ambiguity strategically—to preserve flexibility, permit multiple readings, and retain deniability (Eisenberg, 1984). The cost is that it transfers the interpretive burden to employees: the blanks a message leaves are completed with the employee's own priors.",
    },
    example: {
      zh: "「AI 會把你解放出來，去做更高價值的工作。」——但哪些任務會移轉、多少職位會留下、「更高價值」具體指什麼，一概未說。",
      en: "“AI will free you for higher-value work.”—with no word on which tasks will migrate, how many roles will remain, or what “higher-value” concretely means.",
    },
    reversal: {
      zh: "會限制悲觀解讀的細節——任務範圍、人數、時程——正是策略性模糊所扣住的。反過來說，提供這些細節的特定性溝通能封住威脅式補全（P1a；Schweiger & DeNisi 的務實併購預告實驗即為對照證據）。",
      en: "The specifics that would constrain a pessimistic reading—task scope, headcount, timeline—are exactly what strategic ambiguity withholds. Conversely, specific communication closes the threat-consistent completion (P1a; Schweiger & DeNisi's realistic merger preview experiment is the contrast case).",
    },
    refLabel: { zh: "對應 §2.3.2", en: "Corresponds to §2.3.2" },
  },
  {
    id: "efficiency",
    anchor: "s-2-3-3",
    name: { zh: "效率委婉語", en: "Efficiency euphemism" },
    principle: {
      zh: "「效率、精簡、優化、生產力」不是中性詞彙。組織論述研究指出管理語彙承載社會脈絡；裁員與重組研究顯示，這組詞在歷史上一再伴隨並合理化人力縮減，累積出獨立於任何說話者意圖的經濟弦外之音。",
      en: "“Efficiency, streamlining, optimization, productivity” are not neutral words. Organizational discourse research treats managerial vocabularies as socially situated; downsizing studies show these terms have recurrently accompanied and justified workforce reduction, acquiring an economic subtext independent of any speaker's intent.",
    },
    example: {
      zh: "「這波導入的目標是流程優化與人力配置的效率化。」",
      en: "“The goal of this rollout is process optimization and more efficient staffing.”",
    },
    reversal: {
      zh: "同一個詞對不同聽者做不同的詮釋工作：對管理層是發展與支持，對經歷過重組語彙的員工是人力編制的經濟訊號。發展語域覆蓋在經濟語域之上——這就是委婉替換，使賦能語言被當成暗語而非字面主張來接收。",
      en: "The same word performs different interpretive work for different listeners: development and support to management, an economic signal about headcount to employees who have met restructuring vocabularies before. A developmental register laid over an economic one—euphemistic substitution—means enablement language is received as code rather than as a literal claim.",
    },
    refLabel: { zh: "對應 §2.3.3", en: "Corresponds to §2.3.3" },
  },
  {
    id: "word-deed",
    anchor: "s-2-3-4",
    name: { zh: "言行不一致", en: "Word–deed inconsistency" },
    principle: {
      zh: "訊息是在管理可信度的背景下被接收的，而可信度錨定於言行一致（行為誠信，Simons, 2002）。信任由能力、善意、正直三者構成（Mayer et al., 1995）；心理契約違反與變革犬儒主義的歷史，會預先載入威脅傾向的解讀。",
      en: "Messages are received against managerial credibility, which is anchored in the alignment of words and deeds (behavioral integrity, Simons, 2002). Trust rests on ability, benevolence, and integrity (Mayer et al., 1995); histories of psychological-contract violation and change cynicism pre-load threat-consistent readings.",
    },
    example: {
      zh: "「我們是在投資你們。」——同一季卻凍結人事、他部門重組、產能目標上調。",
      en: "“We are investing in you.”—announced in the same quarter as a hiring freeze, restructuring elsewhere, and intensified productivity targets.",
    },
    reversal: {
      zh: "言行落差不只稀釋訊息：它把訊息重新編碼為掩飾的證據，使正向敘事變成威脅敘說「內部」的一筆資料，而非對抗威脅的砝碼。此後說得越好聽，越像有事要藏。",
      en: "The word–deed gap does more than dilute the message: it recodes it as evidence of concealment, so the positive narrative becomes a datum within a threat account rather than a counterweight against it. The better the rhetoric, the more it sounds like something is being hidden.",
    },
    refLabel: { zh: "對應 §2.3.4", en: "Corresponds to §2.3.4" },
  },
  {
    id: "priors",
    anchor: "s-2-3-5",
    name: { zh: "替代性先驗", en: "Substitution-leaning priors" },
    principle: {
      zh: "收到賦能敘事的員工不是中性的詮釋者。工作不安全感研究顯示「預期中的失業威脅」本身就有強大效應；STARA 覺察研究顯示員工對智慧科技取代自身有清楚的意識與焦慮；AI 身分威脅研究顯示受威脅的不只是僱用，還有職業身分。",
      en: "The employee who receives an enablement narrative is not a neutral interpreter. Job-insecurity research shows the anticipated threat of job loss is powerful in itself; STARA-awareness research shows employees are conscious of and anxious about displacement by smart technologies; AI-identity-threat research shows occupational identity, not only employment, is at stake.",
    },
    example: {
      zh: "還沒開說明會，同仁私下已經在傳：「聽說別家導入之後，那個組半年就砍一半。」",
      en: "Before the town hall even starts, colleagues are already whispering: “I heard that after another firm rolled this out, that team was cut in half within six months.”",
    },
    reversal: {
      zh: "這些文獻共同給出許多員工帶進會議室的詮釋預設：一個本來就傾向替代的先驗。一則語用上有標記、策略性模糊、效率語彙包裝的訊息，遇到的正是一個準備好把它補完成威脅的接收者。",
      en: "Together these literatures supply the interpretive default many employees bring into the room: a prior that already leans toward substitution. A message that is pragmatically marked, strategically ambiguous, and dressed in efficiency vocabulary meets a receiver primed to complete it as threat.",
    },
    refLabel: { zh: "對應 §2.3.5", en: "Corresponds to §2.3.5" },
  },
];

/** Mechanism 2 — nodes of the interactive Figure 1 redraw. Definitions are
 * condensed from Table 1 (§3.2) and §3.1/§3.3/§3.4. */
export type NodeDef = { id: string; label: L; def: L; section: string };

export const nodes: NodeDef[] = [
  {
    id: "vuln",
    label: { zh: "知覺角色脆弱性", en: "Perceived role vulnerability" },
    def: {
      zh: "脈絡前因：基線上感覺自身角色暴露於替代之中；提高反噬的基線機率。",
      en: "Contextual antecedent: a baseline sense that one's role is exposed to substitution; raises the baseline probability of backfire.",
    },
    section: "s-2-3-5",
  },
  {
    id: "part",
    label: { zh: "導入決策參與", en: "Participation in implementation decisions" },
    def: {
      zh: "脈絡前因：參與決定 AI 如何導入與使用；縮小詮釋缺口，並且是機會評估的直接前因。",
      en: "Contextual antecedent: involvement in decisions about how AI is introduced and used; narrows the interpretive gap and is a direct antecedent of opportunity appraisal.",
    },
    section: "s-2-4-2",
  },
  {
    id: "wdc",
    label: { zh: "言行一致性", en: "Word–deed consistency" },
    def: {
      zh: "脈絡前因：賦能說詞與可觀察組織作為的一致程度；不一致會把敘事重新編碼為掩飾，一致則為機會評估背書。",
      en: "Contextual antecedent: alignment between enablement rhetoric and observable organizational action; inconsistency recodes the narrative as concealment, consistency warrants opportunity appraisal.",
    },
    section: "s-2-3-4",
  },
  {
    id: "narrative",
    label: { zh: "組織賦能敘事", en: "Organizational enablement narrative" },
    def: {
      zh: "把生成式 AI 定調為協助員工、減輕例行負擔、讓人專注於更高價值任務的管理訊息。",
      en: "The managerial message framing generative AI as helping employees, reducing routine burdens, and freeing them for higher-value tasks.",
    },
    section: "s-1-1",
  },
  {
    id: "trust",
    label: { zh: "組織信任", en: "Organizational trust" },
    def: {
      zh: "邊界條件：知覺的管理能力、善意與正直；調節「敘事 → 框架」連結——信任低時逆轉更強（P3）。",
      en: "Boundary condition: perceived ability, benevolence, and integrity of management; moderates the narrative-to-frame link—reversal is stronger under low trust (P3).",
    },
    section: "s-2-3-4",
  },
  {
    id: "frame",
    label: { zh: "「AI 即替代」框架", en: "AI-as-substitute frame" },
    def: {
      zh: "主要構念：把導入讀作「AI 可能取代、吸納、排擠或貶抑自身專業角色的有意義部分」之證據的詮釋框架；機制一的輸出。",
      en: "Primary construct: an interpretive frame reading implementation as evidence that AI may replace, absorb, displace, or downgrade meaningful parts of one's professional role; the output of Mechanism 1.",
    },
    section: "s-2-3-6",
  },
  {
    id: "primary",
    label: { zh: "初級評估（偏向威脅）", en: "Primary appraisal (biased toward threat)" },
    def: {
      zh: "事件是否攸關自身福祉、屬良性或威脅或挑戰的評估；「AI 即替代」框架使其偏向威脅（§2.4.1）。",
      en: "The appraisal of whether an encounter is relevant to one's well-being and whether it is benign, threatening, or challenging; the AI-as-substitute frame biases it toward threat (§2.4.1).",
    },
    section: "s-2-4-1",
  },
  {
    id: "sar",
    label: { zh: "次級評估資源", en: "Secondary appraisal resources" },
    def: {
      zh: "邊界條件：保護或調適角色的知覺因應資源；決定威脅導向退縮或強化投入、產生哪種模式（P8）。",
      en: "Boundary condition: perceived coping resources for protecting or adapting the role; governs whether threat yields withdrawal or intensified engagement, and which mode results (P8).",
    },
    section: "s-2-4-1",
  },
  {
    id: "rta",
    label: { zh: "角色威脅評估", en: "Role threat appraisal" },
    def: {
      zh: "主要構念：自指涉地評估自身角色的重要成分——僱用安全、專業能力的市場價值、角色自主性、職業身分與地位——正受危害（表 2）。",
      en: "Primary construct: the self-referential appraisal that valued components of one's own role—employment security, market value of expertise, role autonomy, occupational identity and status—are endangered (Table 2).",
    },
    section: "s-3-3",
  },
  {
    id: "roa",
    label: { zh: "角色機會評估", en: "Role opportunity appraisal" },
    def: {
      zh: "主要構念：評估同樣的角色成分可被增益、提升或再造；挑戰性評估的角色化版本，真正整合的來源。",
      en: "Primary construct: the appraisal that the same role components can be augmented, elevated, or reinvented; challenge appraisal specified to the role, and the source of genuine integration.",
    },
    section: "s-3-3",
  },
  {
    id: "upd",
    label: { zh: "更新後的角色評估", en: "Updated role appraisal" },
    def: {
      zh: "迴圈節點：線索經採信後更新的威脅／機會評估；更新後的評估又決定下一次探測的方向。",
      en: "Loop node: the threat/opportunity appraisal as updated by credited cues; the updated appraisal conditions the next probe.",
    },
    section: "s-2-5-2",
  },
  {
    id: "interact",
    label: { zh: "員工—AI 互動（探測）", en: "Employee–AI interaction (probing)" },
    def: {
      zh: "迴圈節點：員工以自然語言查詢系統、要它示範與角色重疊的任務、私下低成本測試；探測本身就是產生線索的行動（實作式意義建構）。",
      en: "Loop node: the employee queries the system in natural language, prompts it to demonstrate role-overlapping tasks, and tests it privately at low cost; the probe itself is the act that produces the cues (enacted sensemaking).",
    },
    section: "s-2-5-1",
  },
  {
    id: "cues",
    label: { zh: "角色相關線索", en: "Role-relevant cues" },
    def: {
      zh: "迴圈節點：自指涉線索（系統對自身能力的陳述）＋展示性線索（系統實際執行任務），皆為 AI 生成；另有社會傳遞線索（同事示範、流傳的產出）進入迴圈。",
      en: "Loop node: self-referential cues (the system's statements about its own abilities) plus demonstrative cues (the system actually performing a task), both AI-generated; socially transmitted cues (colleagues' demonstrations, circulating outputs) also enter the loop.",
    },
    section: "s-2-5-3",
  },
  {
    id: "cred",
    label: { zh: "AI 生成線索可信度", en: "AI-generated cue credibility" },
    def: {
      zh: "邊界條件：AI 生成線索被採信為關於角色的有效證據之程度；機器捷思強化採信，對幻覺與不均表現的認識折抵之（P5）。",
      en: "Boundary condition: the degree to which AI-generated cues are credited as valid evidence about the role; the machine heuristic strengthens crediting, awareness of hallucination and unevenness discounts it (P5).",
    },
    section: "s-2-5-4",
  },
  {
    id: "avoid",
    label: { zh: "迴避", en: "Avoidance" },
    def: {
      zh: "回應模式：角色威脅＋低因應資源；高裁量權下的拒用、拖延或最低限度使用（表 3）。",
      en: "Response mode: role threat with low coping resources; refusal, delay, or minimal use where declining is possible (Table 3).",
    },
    section: "s-3-4",
  },
  {
    id: "comp",
    label: { zh: "純遵從性使用（外部強制要求）", en: "Compliance-only use (external mandate)" },
    def: {
      zh: "回應模式：由外部強制要求驅動、未內化；貼著規定的最低限度使用，命令撤除即停（表 3、P9）。",
      en: "Response mode: driven by external mandate, not internalized; use tracks the mandated minimum and lapses if the mandate is withdrawn (Table 3, P9).",
    },
    section: "s-3-4",
  },
  {
    id: "defad",
    label: { zh: "防衛性採用", en: "Defensive adoption" },
    def: {
      zh: "回應模式：角色威脅＋足夠因應資源；為維持不可或缺而自發、超額使用——量大但整合淺、不穩定（表 3、P8）。",
      en: "Response mode: role threat with adequate coping resources; self-initiated, above-mandate use aimed at remaining indispensable—high in volume yet shallow and unstable (Table 3, P8).",
    },
    section: "s-3-4",
  },
  {
    id: "genint",
    label: { zh: "真正整合", en: "Genuine integration" },
    def: {
      zh: "回應模式：來自角色機會評估或迴圈中成功的再評估；深而穩定地納入工作流程與角色，威脅單獨無法到達（表 3、P10）。",
      en: "Response mode: arises from role opportunity appraisal or a successful reappraisal through the loop; deep, stable incorporation into workflow and role, unreachable from threat alone (Table 3, P10).",
    },
    section: "s-3-4",
  },
];

/** P7's three trajectories of the loop */
export type Trajectory = { id: "entrench" | "oscillate" | "reverse"; name: L; desc: L };

export const trajectories: Trajectory[] = [
  {
    id: "entrench",
    name: { zh: "固化", en: "Entrenchment" },
    desc: {
      zh: "被採信的線索一致地確認框架——高可信度、高任務—角色重疊、反覆驗證——迴圈收斂，評估固化（P7-i）。",
      en: "Credited cues consistently confirm the frame—high credibility, high task-role overlap, repeated confirmation—the loop converges and the appraisal entrenches (P7-i).",
    },
  },
  {
    id: "oscillate",
    name: { zh: "擺盪", en: "Oscillation" },
    desc: {
      zh: "系統表現不均、線索僅部分被採信，連續探測回傳相互衝突的證據，評估擺盪而不定著（P7-ii）。",
      en: "Uneven performance returns partially credited, conflicting evidence across successive probes; the appraisal oscillates rather than settling (P7-ii).",
    },
  },
  {
    id: "reverse",
    name: { zh: "逆轉", en: "Reversal" },
    desc: {
      zh: "反證既強又被採信時，迴圈逆轉框架；經由成功的再評估，可沿再評估路徑抵達真正整合（P7-iii、P10）。",
      en: "When disconfirming evidence is both strong and credited, the loop reverses the frame; via a successful reappraisal, the reappraisal pathway can reach genuine integration (P7-iii, P10).",
    },
  },
];
