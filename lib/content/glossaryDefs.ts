import type { L } from "@/lib/content/guide";

/**
 * Short definitions for the paper's own constructs, derived from the
 * manuscript (Table 1–3, §2, §3). Keys match the `en` field of
 * content/glossary.json. Terms without an entry here are shown with their
 * first-occurrence section only.
 */
export const glossaryDefs: Record<string, L> = {
  "enablement narrative": {
    zh: "把生成式 AI 定調為協助員工、減輕例行負擔、讓人專注更高價值任務的管理訊息（§1.1）。",
    en: "The managerial message framing generative AI as assisting employees, reducing routine burdens, and freeing them for higher-value tasks (§1.1).",
  },
  "enablement narrative backfire": {
    zh: "機制一：賦能訊息經語用機制被逆轉為替代解讀的過程；輸出為「AI 即替代」框架（§2.3）。",
    en: "Mechanism 1: the pragmatic reversal of an enablement message into a substitution reading; its output is the AI-as-substitute frame (§2.3).",
  },
  "AI-as-substitute frame": {
    zh: "把導入讀作「AI 可能取代、吸納、排擠或貶抑自身角色的有意義部分」之證據的詮釋框架（§2.3.6）。",
    en: "An interpretive frame reading implementation as evidence that AI may replace, absorb, displace, or downgrade meaningful parts of one's role (§2.3.6).",
  },
  "AI-interactive role sensemaking loop": {
    zh: "機制二：探測 → 線索 → 更新評估的遞迴過程；使框架與評估固化、擺盪或逆轉（§2.5）。",
    en: "Mechanism 2: the recursive probe → cue → updated-appraisal process that entrenches, oscillates, or reverses the frame and appraisals (§2.5).",
  },
  sensemaking: {
    zh: "行動者自模糊多義的經驗之流框選線索、發展成合理可信敘說以引導行動的回溯性、社會性、持續性活動（Weick, 1995；§2.2）。",
    en: "The retrospective, social, ongoing activity by which actors bracket cues from an equivocal flow of experience and elaborate them into plausible accounts that guide action (Weick, 1995; §2.2).",
  },
  sensegiving: {
    zh: "領導者試圖把他人的意義建構導向其偏好之現實再定義的過程（Gioia & Chittipeddi, 1991；§2.2）。",
    en: "Leaders' attempts to influence others' sensemaking toward a preferred redefinition of reality (Gioia & Chittipeddi, 1991; §2.2).",
  },
  "technological frames": {
    zh: "組織成員藉以理解一項科技的假設、期望與知識；不同群體的框架可能不一致（Orlikowski & Gash, 1994；§2.2）。",
    en: "The assumptions, expectations, and knowledge organizational members use to make sense of a technology; groups' frames may be incongruent (Orlikowski & Gash, 1994; §2.2).",
  },
  "frame incongruence": {
    zh: "管理者與員工對同一科技持不同框架；本文的「逆轉」比不一致更強——單一訊息被轉成其意圖之反面的證據（§2.3.6）。",
    en: "Managers and employees holding different frames of the same technology; the paper's reversal is stronger—one message turned into evidence for the opposite of its intent (§2.3.6).",
  },
  "role threat appraisal": {
    zh: "自指涉地評估自身角色的重要成分（僱用安全、專業市場價值、角色自主性、職業身分與地位）正受危害（§2.4.1、表 2）。",
    en: "The self-referential appraisal that valued components of one's role—employment security, market value of expertise, role autonomy, occupational identity and status—are endangered (§2.4.1, Table 2).",
  },
  "role opportunity appraisal": {
    zh: "評估同樣的角色成分可被增益、提升或再造；挑戰性評估的角色化版本，真正整合的來源（§2.4.1–2.4.2、表 2）。",
    en: "The appraisal that the same role components can be augmented, elevated, or reinvented; challenge appraisal given role-specific content, the source of genuine integration (§2.4.1–2.4.2, Table 2).",
  },
  "modes of adoption response": {
    zh: "採用的終端結果是「種類」而非「程度」：迴避、純遵從性使用、防衛性採用、真正整合（§3.4、表 3）。",
    en: "The terminal outcome of adoption as a kind rather than a level: avoidance, compliance-only use, defensive adoption, genuine integration (§3.4, Table 3).",
  },
  avoidance: {
    zh: "角色威脅＋低因應資源下的模式：高裁量權下的拒用、拖延或最低度使用（表 3、P8）。",
    en: "The mode under role threat with low coping resources: refusal, delay, or minimal use where declining is possible (Table 3, P8).",
  },
  "compliance-only use": {
    zh: "外部強制而未內化的模式：貼著規定最低限度、無自我保護動機、撤令即停（表 3、P9）。",
    en: "The mode under external mandate without internalization: use tracks the minimum, carries no protective motive, and lapses when the mandate is withdrawn (Table 3, P9).",
  },
  "defensive adoption": {
    zh: "威脅驅動、自我保護的模式：為維持不可或缺而自發超額使用；量大但整合淺且不穩定（表 3、P8、P9a）。",
    en: "The threat-driven, self-protective mode: self-initiated above-mandate use aimed at remaining indispensable; high in volume yet shallow and unstable (Table 3, P8, P9a).",
  },
  "genuine integration": {
    zh: "來自機會評估或成功再評估的模式：深而穩定地納入流程與角色；威脅單獨無法到達（表 3、P10）。",
    en: "The mode arising from opportunity appraisal or successful reappraisal: deep, stable incorporation into workflow and role; unreachable from threat alone (Table 3, P10).",
  },
  "cognitive appraisal theory": {
    zh: "同一事件可被評估為威脅或挑戰；初級評估問攸關與否，次級評估問資源足否（Lazarus & Folkman, 1984；§2.4.1）。",
    en: "The same encounter can be appraised as threat or challenge; primary appraisal asks relevance, secondary appraisal asks resources (Lazarus & Folkman, 1984; §2.4.1).",
  },
  "primary appraisal / secondary appraisal": {
    zh: "初級：事件是否攸關福祉、屬良性／威脅／挑戰；次級：可用因應資源與選項的評估（§2.4.1）。",
    en: "Primary: whether an encounter matters to well-being and is benign, threatening, or challenging; secondary: the assessment of available coping resources and options (§2.4.1).",
  },
  "challenge appraisal": {
    zh: "在資源足夠下把事件評估為可精進或有所得；角色機會評估即其角色化版本（§2.4.1）。",
    en: "Appraising an encounter as potential for mastery or gain under adequate resources; role opportunity appraisal is its role-specified form (§2.4.1).",
  },
  "protection motivation theory": {
    zh: "對威脅的回應由威脅評估×因應評估共同決定：高威脅＋高效能→問題導向因應；高威脅＋低效能→迴避等不良回應（Rogers, 1975；§2.4.1）。",
    en: "Responses to threat depend jointly on threat appraisal and coping appraisal: high threat with high efficacy yields problem-focused responses; with low efficacy, maladaptive ones like avoidance (Rogers, 1975; §2.4.1).",
  },
  implicature: {
    zh: "訊息在語境中傳達而未明說的意思；再保證的語用蘊含是「取代是活生生的可能」（Grice, 1975；§2.3.1）。",
    en: "What a message conveys in context beyond what it states; the implicature of reassurance is that replacement is a live possibility (Grice, 1975; §2.3.1).",
  },
  "Gricean pragmatics": {
    zh: "聽者假定說話者合作且切題，因而推論字面之外的意義；再保證因此帶有語用標記（§2.3.1）。",
    en: "Hearers assume speakers are cooperative and relevant and so infer beyond literal content; reassurance is thereby pragmatically marked (§2.3.1).",
  },
  "innuendo effect": {
    zh: "連提問與否認都能把聽眾信念推向被暗示的命題——「媒體的問題成為公眾的答案」（Wegner et al., 1981；§2.3.1）。",
    en: "Even questions and denials can move audiences toward the implied proposition—“media questions become public answers” (Wegner et al., 1981; §2.3.1).",
  },
  "strategic ambiguity": {
    zh: "組織策略性地使用模糊以保留彈性與多重解讀；代價是把詮釋負擔轉嫁給員工（Eisenberg, 1984；§2.3.2）。",
    en: "Organizations' strategic use of ambiguity to preserve flexibility and multiple readings; its cost is transferring the interpretive burden to employees (Eisenberg, 1984; §2.3.2).",
  },
  "euphemistic substitution": {
    zh: "發展語域覆蓋在經濟語域之上：效率語彙被聽成關於人力編制的暗語而非字面主張（§2.3.3）。",
    en: "A developmental register laid over an economic one: efficiency vocabulary heard as code about headcount rather than a literal claim (§2.3.3).",
  },
  "word–deed inconsistency": {
    zh: "賦能說詞與矛盾作為（凍結人事、重組、加壓目標）並存；使訊息被重新編碼為掩飾的證據（§2.3.4）。",
    en: "Enablement rhetoric co-occurring with contradictory deeds (freezes, restructuring, intensified targets); recodes the message as evidence of concealment (§2.3.4).",
  },
  "behavioral integrity": {
    zh: "知覺到的管理者言行一致；管理可信度的基礎，違反的代價不成比例地高（Simons, 2002；§2.3.4）。",
    en: "The perceived alignment between a manager's words and deeds; a foundation of credibility whose violation is disproportionately costly (Simons, 2002; §2.3.4).",
  },
  "psychological contract": {
    zh: "員工對僱傭關係中相互義務的信念；違反會改變其後如何解讀雇主的溝通，且違反是常態而非例外（§2.3.4）。",
    en: "Employees' beliefs about mutual obligations in employment; violation shifts how later employer communications are read—and is the norm, not the exception (§2.3.4).",
  },
  "change cynicism": {
    zh: "一再落空的變革說詞養成的懷疑：折抵正向訊息、偏好與威脅一致的推論（Reichers et al., 1997；§2.3.4）。",
    en: "Skepticism bred by repeated unfulfilled change rhetoric: discounts positive messages and privileges threat-consistent inferences (Reichers et al., 1997; §2.3.4).",
  },
  "job insecurity": {
    zh: "對失去工作的預期性、主觀性威脅；其效應更多來自預期而非既成事件（§2.3.5）。",
    en: "The anticipated, subjective threat of job loss; driven more by anticipation than by realized events (§2.3.5).",
  },
  "STARA awareness": {
    zh: "員工對智慧科技、AI、機器人與演算法可能取代自身的意識與焦慮（Brougham & Haar, 2018；§2.3.5）。",
    en: "Employees' consciousness of, and anxiety about, smart technology, AI, robotics, and algorithms displacing them (Brougham & Haar, 2018; §2.3.5).",
  },
  "AI identity threat": {
    zh: "AI 威脅的不只是僱用，還有職業「身分」——角色的獨特性與價值感（Mirbabaie et al., 2022；§2.3.5）。",
    en: "AI threatening occupational identity, not only employment—the distinctiveness and value attached to a role (Mirbabaie et al., 2022; §2.3.5).",
  },
  cue: {
    zh: "意義建構的原料：從模糊經驗中被框選、據以發展敘說的訊息片段（§2.2、§2.5）。",
    en: "The raw material of sensemaking: fragments bracketed from equivocal experience and elaborated into accounts (§2.2, §2.5).",
  },
  "self-referential cues": {
    zh: "系統對自身能力的陳述（「我可以草擬那份報告」）；因對話式介面而帶準證言份量（§2.5.3）。",
    en: "The system's statements about its own capabilities (“I can draft that report”), carrying quasi-testimonial weight because of the conversational interface (§2.5.3).",
  },
  "demonstrative cues": {
    zh: "系統實際執行任務的線索：把假設可能變成被觀察事件，通常比自我描述更有力（§2.5.5、P6）。",
    en: "Cues from the system actually performing a task: they convert a hypothetical into an observed event, typically outweighing self-description (§2.5.5, P6).",
  },
  "socially transmitted cues": {
    zh: "同事的示範、流傳的 AI 產出、管理者被觀察到的使用——不需親自探測的間接展示線索（§2.5.6）。",
    en: "Colleagues' demonstrations, circulating AI outputs, a manager's observed use—vicarious demonstrative cues requiring no probe of one's own (§2.5.6).",
  },
  "cue-generating artifact": {
    zh: "本文對生成式 AI 的定位：不只是被詮釋的對象，而是員工實作、擷取、採信並評估之線索的生產者（§2.5）。",
    en: "The paper's characterization of generative AI: not merely an object of interpretation but a producer of cues employees enact, extract, credit, and appraise (§2.5).",
  },
  "enacted sensemaking": {
    zh: "行動者製造出自己隨後要面對與詮釋的環境：探測正是產生線索的行動（Weick, 1988；§2.5.1）。",
    en: "Actors produce part of the environment they then confront and interpret: the probe is the act that produces the cue (Weick, 1988; §2.5.1).",
  },
  "task-role overlap": {
    zh: "被示範任務與角色身分的貼近程度；重疊越高，線索引發的評估越強——方向不定（§2.5.5、P6）。",
    en: "How central a demonstrated task is to one's role identity; higher overlap provokes stronger appraisals—in either direction (§2.5.5, P6).",
  },
  "cue credibility": {
    zh: "線索被採信為有效角色證據的程度；決定同一示範能否移動評估（§2.5.4、P5）。",
    en: "The degree to which a cue is credited as valid role evidence; decides whether the same demonstration moves an appraisal (§2.5.4, P5).",
  },
  "machine heuristic": {
    zh: "「機器客觀、不偏、機械因此準確」的捷思；使人在某些情境更信任機器來源資訊（Sundar & Kim, 2019；§2.5.4）。",
    en: "The heuristic that machines are objective, unbiased, mechanical, and therefore accurate; can make machine-sourced information more trusted (Sundar & Kim, 2019; §2.5.4).",
  },
  "MAIN model": {
    zh: "形式、代理、互動性、導覽性四類介面線索觸發可信度捷思的模型（Sundar, 2008；§2.5.4）。",
    en: "Modality, agency, interactivity, and navigability as interface cues that trigger credibility heuristics (Sundar, 2008; §2.5.4).",
  },
  "computers-are-social-actors (CASA)": {
    zh: "人們對電腦套用社會規則與期待，即使明知對方是機器（Nass 等；§2.5.3）。",
    en: "People apply social rules and expectations to computers even while knowing the interlocutor is a machine (Nass et al.; §2.5.3).",
  },
  "automation–augmentation paradox": {
    zh: "同一能力可被讀成自動化（替代）或增益（延伸），兩者相互糾纏而非對立（Raisch & Krakowski, 2021；§2.5.5）。",
    en: "The same capability can be read as automating (substituting) or augmenting (extending) human work, the two entangled rather than opposed (Raisch & Krakowski, 2021; §2.5.5).",
  },
  "job crafting": {
    zh: "員工主動改造角色的任務邊界、關係邊界與工作意義（Wrzesniewski & Dutton, 2001；§2.4.2）。",
    en: "Employees actively altering the task and relational boundaries and the meaning of their work (Wrzesniewski & Dutton, 2001; §2.4.2).",
  },
  "participatory implementation": {
    zh: "機會路徑前因一：員工參與決定任務移轉、時間運用與角色重組，成為導入意義的共同作者（§2.4.2）。",
    en: "Opportunity antecedent 1: employees co-author the implementation's meaning by deciding task migration, time use, and role reconfiguration (§2.4.2).",
  },
  "credible role-redesign commitment": {
    zh: "機會路徑前因二：可查核的賦能作為——時間重配、訓練投資、改寫職掌、可驗證的轉任承諾——把敘事變成證據（§2.4.2）。",
    en: "Opportunity antecedent 2: observable enabling deeds—time reallocation, training investment, rewritten role descriptions, verifiable redeployment commitments—turn narrative into evidence (§2.4.2).",
  },
  "augmentation-configured demonstration": {
    zh: "機會路徑前因三：以員工視為負擔（而非身分核心）的任務作示範、並一併呈現產出仍需的人類判斷（§2.4.2）。",
    en: "Opportunity antecedent 3: demonstrations centered on burdensome rather than identity-central tasks, presented with the human judgment the output still requires (§2.4.2).",
  },
  "entrenchment / oscillation / reversal": {
    zh: "迴圈的三種軌跡：證據一致且被採信→固化；衝突且部分採信→擺盪；強反證且被採信→逆轉（§2.5.8、P7）。",
    en: "The loop's three trajectories: consistent credited evidence entrenches; conflicting partially credited evidence oscillates; strong credited disconfirmation reverses (§2.5.8, P7).",
  },
  reappraisal: {
    zh: "迴圈中對威脅／機會判斷的修訂；成功的再評估是防衛性採用通往真正整合的唯一途徑（P10）。",
    en: "Revision of the threat/opportunity judgment through the loop; a successful reappraisal is the only route from defensive adoption to genuine integration (P10).",
  },
  "contextual antecedent": {
    zh: "在任何評估形成前就先塑造詮釋過程的條件：知覺角色脆弱性、導入決策參與、言行一致性（§3.2）。",
    en: "Conditions shaping the interpretive process before any appraisal forms: perceived role vulnerability, participation, word–deed consistency (§3.2).",
  },
  "boundary condition": {
    zh: "調節架構中特定連結的條件：組織信任、次級評估資源、AI 生成線索可信度（§3.2、§5.2）。",
    en: "Conditions moderating specific links in the framework: organizational trust, secondary appraisal resources, AI-generated cue credibility (§3.2, §5.2).",
  },
  "perceived role vulnerability": {
    zh: "基線上感覺自身角色暴露於替代之中；提高反噬的基線機率（表 1、P2）。",
    en: "A baseline sense that one's role is exposed to substitution; raises the baseline probability of backfire (Table 1, P2).",
  },
  "organizational trust": {
    zh: "知覺的管理能力、善意與正直；調節敘事→框架連結——信任低則逆轉強（Mayer et al., 1995；P3）。",
    en: "Perceived ability, benevolence, and integrity of management; moderates the narrative-to-frame link—reversal strengthens under low trust (Mayer et al., 1995; P3).",
  },
  "secondary appraisal resources": {
    zh: "保護或調適角色的知覺因應資源；決定威脅產生退縮或強化投入、導向哪種模式（P8）。",
    en: "Perceived coping resources for protecting or adapting the role; govern whether threat yields withdrawal or intensified engagement, and which mode results (P8).",
  },
  "AI-generated cue credibility": {
    zh: "AI 生成線索被採信為有效角色證據的程度；調節迴圈中線索→評估更新的連結（P5）。",
    en: "The degree to which AI-generated cues are credited as valid role evidence; moderates the cue-to-appraisal-update link in the loop (P5).",
  },
  "narrative reversal": {
    zh: "本文第一項貢獻：指明正向管理框架如何經可指認的語用性質被轉換為員工端替代框架（§5.1）。",
    en: "The paper's first contribution: specifying how a positive managerial frame is transformed into an employee substitution frame through identifiable pragmatic properties (§5.1).",
  },
  "recursive cue production": {
    zh: "本文第二項貢獻：把科技自身的產出理論化為角色相關線索的遞迴來源——每次更新的評估改變下一次探測的選擇（§5.1）。",
    en: "The paper's second contribution: theorizing the technology's own outputs as a recursive source of role-relevant cues—each updated appraisal changes the selection of the next probe (§5.1).",
  },
};
