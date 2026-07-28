import type { Locale } from "@/lib/i18n";

/**
 * Reader's-guide content. Authored strictly from the manuscript itself;
 * every entry cites the section(s) of the paper it derives from.
 */

export type L = Record<Locale, string>;

export const oneMinute: {
  items: { title: L; body: L }[];
  ref: { label: L; ids: string[] };
} = {
  items: [
    {
      title: { zh: "問題", en: "The problem" },
      body: {
        zh: "組織導入生成式 AI 時，通常以「AI 是來協助你，不是取代你」這類賦能敘事安撫員工，但員工聽到的往往是相反的訊息。本文解釋兩件事：善意的敘事為何反噬，以及同一套系統為何在不同員工身上產生分歧的回應。",
        en: "When organizations implement generative AI, they typically reassure employees with an enablement narrative—the technology assists you rather than replaces you—yet employees often hear the opposite. The paper explains two things: why well-intended narratives backfire, and why the same system yields divergent responses across a workforce.",
      },
    },
    {
      title: { zh: "機制一：賦能敘事反噬", en: "Mechanism 1: enablement narrative backfire" },
      body: {
        zh: "特意否認一件沒人提起的事，反而把「被取代」端上檯面——再保證在語用上是有標記的。加上策略性模糊、效率語彙的經濟弦外之音、言行不一致與員工既有的替代性先驗，正向訊息就被逆轉為「AI 即替代」框架。",
        en: "Denying a possibility no one has raised puts replacement on the table—reassurance is pragmatically marked. Together with strategic ambiguity, the economic subtext of efficiency vocabulary, word–deed inconsistency, and employees' substitution-leaning priors, the positive message is reversed into an AI-as-substitute frame.",
      },
    },
    {
      title: { zh: "機制二：AI 互動式角色意義建構迴圈", en: "Mechanism 2: the AI-interactive role sensemaking loop" },
      body: {
        zh: "與過去的職場科技不同，員工可以直接、私下、低成本地測試生成式 AI——要它示範自己的工作，看它做得多好。每一次探測產生的線索都回饋到員工對自身角色的評估，使威脅或機會的判斷遞迴更新，走向固化、擺盪或逆轉。",
        en: "Unlike earlier workplace technologies, employees can test generative AI directly, privately, and at low cost—prompting it to demonstrate their own tasks and watching how well it does. Each probe returns cues that feed back into the employee's appraisal of their own role, so judgments of threat or opportunity update recursively toward entrenchment, oscillation, or reversal.",
      },
    },
    {
      title: { zh: "四種回應模式", en: "Four modes of adoption response" },
      body: {
        zh: "評估的結果不是「用多或用少」，而是四種性質不同的採用：迴避、純遵從性使用、防衛性採用（因怕顯得可被取代而密集使用）與真正整合。因此使用量本身無法區辨一支被賦能的團隊與一支被嚇壞的團隊。",
        en: "The outcome of appraisal is not more or less use but four qualitatively different kinds of adoption: avoidance, compliance-only use, defensive adoption (intensive use driven by the fear of appearing replaceable), and genuine integration. Usage volume alone therefore cannot distinguish an empowered workforce from a frightened one.",
      },
    },
  ],
  ref: { label: { zh: "對應 §1.1–1.2、§3.4、§6", en: "Corresponds to §1.1–1.2, §3.4, §6" }, ids: ["s-1-1", "s-3-4", "s-6"] },
};

export const tenMinute: {
  q: L;
  paras: L[];
  ref: { label: L; ids: string[] };
}[] = [
  {
    q: { zh: "一、為什麼善意的訊息會反噬？", en: "1. Why do well-intended messages backfire?" },
    paras: [
      {
        zh: "反噬的起點在語用學：訊息在語境中傳達的，不止於它字面所說的。「AI 不會取代你」這句再保證，等於承認「取代」是一個值得否認的活生生可能——依葛萊斯語用學，人們不會特意去否認沒人想過的事；Wegner 等人的暗示效應研究更顯示，連否認本身都能把聽者的信念推向被否認的命題（§2.3.1）。",
        en: "The reversal starts with pragmatics: what a message communicates in context exceeds what it literally states. The reassurance “AI will not replace you” concedes that replacement is a live possibility worth denying—on Gricean pragmatics, one does not ordinarily negate a possibility no one entertains, and Wegner and colleagues' innuendo-effect studies show that even denials can move audiences toward the denied proposition (§2.3.1).",
      },
      {
        zh: "其餘四個驅動因子把這個可能性補完成威脅解讀：策略性模糊迴避了任務範圍、人數與時程等關鍵細節，把詮釋負擔轉嫁給員工（§2.3.2）；「效率、精簡、優化」這套語彙在裁員與重組論述中累積了經濟弦外之音（§2.3.3）；當賦能說詞與凍結人事、強化績效目標等作為並存，言行不一致把訊息重新編碼為掩飾的證據（§2.3.4）；而工作不安全感、STARA 覺察與 AI 身分威脅的研究顯示，許多員工本來就帶著傾向替代解讀的先驗走進會議室（§2.3.5）。",
        en: "Four further drivers complete that possibility into a threat reading: strategic ambiguity withholds the consequential specifics—task scope, headcount, timeline—and shifts the interpretive burden onto employees (§2.3.2); the vocabulary of efficiency, streamlining, and optimization carries an economic subtext sedimented by downsizing and restructuring discourse (§2.3.3); when enablement rhetoric co-occurs with hiring freezes or intensified targets, word–deed inconsistency recodes the message as evidence of concealment (§2.3.4); and research on job insecurity, STARA awareness, and AI identity threat shows that many employees walk in with priors that already lean toward substitution (§2.3.5).",
      },
      {
        zh: "本文強調這不是員工「誤解」，而是意義在語境中被共同生產出來的逆轉——不是雙方讀出不同意思的框架不一致，而是同一則訊息被轉成其意圖之反面的證據（§2.3.6）。對應的解方也在訊息層次：提供任務範圍、角色後果與可查核承諾的特定性溝通，能封住被威脅式補全的詮釋缺口（P1a）。",
        en: "The paper stresses that this is not employee misunderstanding but a reversal co-produced in context—not frame incongruence, where two parties read the same technology differently, but a single message turned into evidence for the opposite of its intent (§2.3.6). The remedy sits at the same level: communication specific about task scope, role consequences, and verifiable commitments closes the interpretive gap that threat-consistent completion exploits (P1a).",
      },
    ],
    ref: { label: { zh: "對應 §2.3.1–2.3.6、P1–P3", en: "Corresponds to §2.3.1–2.3.6, P1–P3" }, ids: ["s-2-3-1", "s-2-3-6", "prop-p1"] },
  },
  {
    q: { zh: "二、為什麼同一套系統會產生分歧反應？", en: "2. Why does the same system produce divergent responses?" },
    paras: [
      {
        zh: "框架還不是結果。「AI 即替代」框架使初級評估偏向威脅，但依認知評估理論，同一事件究竟穩定為角色威脅評估或角色機會評估，取決於次級評估——員工自認擁有多少保護或調適角色的資源（§2.4.1）。機會路徑另有自己的直接前因：參與式導入、可信的角色再設計承諾、增益導向的示範配置（§2.4.2、P4a）。",
        en: "A frame is not yet an outcome. The AI-as-substitute frame biases primary appraisal toward threat, but on cognitive appraisal theory whether the same encounter stabilizes as role threat or role opportunity appraisal depends on secondary appraisal—the resources an employee perceives for protecting or adapting the role (§2.4.1). The opportunity pathway also has direct antecedents of its own: participatory implementation, credible role-redesign commitment, and augmentation-configured demonstration (§2.4.2, P4a).",
      },
      {
        zh: "更關鍵的是，生成式 AI 是「線索生成物」：員工的每一次探測都產生新的角色相關證據。系統對自身能力的陳述是自指涉線索，因為對話式介面而帶著準證言的份量（電腦即社會行動者，§2.5.3）；系統實際執行任務是展示性線索，其衝擊隨任務—角色重疊度放大（§2.5.5）；同事的示範與流傳的產出則是社會傳遞線索（§2.5.6）。線索要先被採信才會移動評估——相信機器客觀的機器捷思會強化採信，對幻覺與不均表現的認識則會折抵（§2.5.4）。",
        en: "More crucially, generative AI is a cue-generating artifact: every probe an employee runs produces fresh role-relevant evidence. The system's statements about its own abilities are self-referential cues, carrying quasi-testimonial weight because of the conversational interface (computers-are-social-actors, §2.5.3); the system actually performing a task is a demonstrative cue whose impact scales with task-role overlap (§2.5.5); colleagues' demonstrations and circulating outputs are socially transmitted cues (§2.5.6). A cue moves an appraisal only if credited—the machine heuristic strengthens crediting, awareness of hallucination and uneven performance discounts it (§2.5.4).",
      },
      {
        zh: "因為探測由員工自己選、系統表現又不均，同一套系統會對不同人回傳不同的證據組合：一致被採信的確認證據使框架固化；部分採信的衝突證據使評估擺盪；強而被採信的反證則使框架逆轉（§2.5.8、P7）。分歧與不穩定不是雜訊，而是這個遞迴機制的可預期產物。",
        en: "Because probes are self-directed and performance is uneven, the same system returns different evidence mixes to different people: consistently credited confirming evidence entrenches the frame; partially credited conflicting evidence makes the appraisal oscillate; strong, credited disconfirming evidence reverses it (§2.5.8, P7). Divergence and instability are not noise but the predictable output of this recursive mechanism.",
      },
    ],
    ref: { label: { zh: "對應 §2.4–§2.5、P4–P7", en: "Corresponds to §2.4–§2.5, P4–P7" }, ids: ["s-2-4", "s-2-5", "prop-p7"] },
  },
  {
    q: { zh: "三、為什麼採用是「種類」而非「程度」？", en: "3. Why is adoption a kind, not a level?" },
    paras: [
      {
        zh: "保護動機理論給出理論樞紐：高威脅配上足夠的因應資源，產生的不是退縮而是強化投入——為了維持不可或缺而自發、超額地使用系統，本文稱之為防衛性採用；同樣的威脅配上匱乏的資源，才產生迴避（§2.4.1、P8）。威脅並不是把採用意圖往下壓的單一力量。",
        en: "Protection motivation theory supplies the hinge: high threat with adequate coping resources produces not withdrawal but intensified engagement—self-initiated, above-mandate use aimed at remaining indispensable, which the paper terms defensive adoption; the same threat with scarce resources yields avoidance instead (§2.4.1, P8). Threat is not a single force pressing adoption intention downward.",
      },
      {
        zh: "四種模式由驅動力、裁量權／強制性、行為深度與其表達的角色意義區分（§3.4、表 3）。純遵從性使用與防衛性採用在某個時點的行為可能難以分辨，但軌跡不同：防衛性採用超出強制最低要求、延伸到裁量性任務、隨威脅持續而持續；純遵從則貼著規定走、命令撤了就停（P9、P9a）。",
        en: "The four modes are distinguished by driver, discretion versus mandate, behavioral depth, and the role meaning they express (§3.4, Table 3). Compliance-only use and defensive adoption can be indistinguishable at a single moment, but their trajectories differ: defensive adoption exceeds the mandated minimum, extends to discretionary tasks, and persists while the threat persists; compliance tracks the requirement and lapses when it is withdrawn (P9, P9a).",
      },
      {
        zh: "真正整合是唯一無法單靠威脅到達的模式——它需要角色機會評估，或迴圈中一次成功的再評估（P10）。這正是全文最尖銳主張的出處：高使用量可能是防衛性採用，低使用量可能是迴避或遵從最低限，所以使用量本身無法區辨一支被賦能的團隊與一支被嚇壞的團隊（§5.4、§6）。",
        en: "Genuine integration is the one mode unreachable from threat alone—it requires role opportunity appraisal or a successful reappraisal achieved through the loop (P10). This is where the paper's sharpest claim comes from: high volume may be defensive adoption and low volume may be avoidance or a compliance minimum, so usage volume alone cannot distinguish an empowered workforce from a frightened one (§5.4, §6).",
      },
    ],
    ref: { label: { zh: "對應 §2.4.1、§3.4、P8–P10、§6", en: "Corresponds to §2.4.1, §3.4, P8–P10, §6" }, ids: ["s-2-4-1", "s-3-4", "prop-p10"] },
  },
];

export type FullGuideEntry = {
  id: string;
  anchor: string;
  title: L;
  question: L;
  claim: L;
  theories: L;
  refLabel: L;
};

export const fullGuide: FullGuideEntry[] = [
  {
    id: "g1",
    anchor: "s-1",
    title: { zh: "§1 緒論", en: "§1 Introduction" },
    question: {
      zh: "生成式 AI 的採用問題，為什麼不能只當成科技評估問題？",
      en: "Why can generative AI adoption not be treated as a technology-evaluation problem alone?",
    },
    claim: {
      zh: "員工可能在有意義的使用發生前就已抗拒，因為他們先問的不是「好不好用」，而是「這對我的角色意味著什麼」；本文據此提出兩個相互耦合的機制與三個研究問題，並聲明三項貢獻：敘事逆轉機制、遞迴線索生產解釋、回應模式分類。",
      en: "Employees may resist before meaningful use occurs because their first question is not whether the tool is useful but what its implementation means for their role; the paper introduces two coupled mechanisms, three research questions, and three claimed contributions—narrative reversal, recursive cue production, and the response-mode taxonomy.",
    },
    theories: {
      zh: "科技採用研究（TAM／UTAUT）、科技框架、意義建構與意義賦予；動機引用 Pew 與 Microsoft 的調查證據。",
      en: "Technology-adoption research (TAM/UTAUT), technological frames, sensemaking and sensegiving; Pew and Microsoft surveys cited as motivating evidence.",
    },
    refLabel: { zh: "對應 §1.1–1.5", en: "Corresponds to §1.1–1.5" },
  },
  {
    id: "g2-1",
    anchor: "s-2-1",
    title: { zh: "§2.1 科技採用與以評估為中心之解釋的侷限", en: "§2.1 Technology adoption and the limits of an evaluation-centered account" },
    question: {
      zh: "TAM 與 UTAUT 這類主流採用模型，在生成式 AI 情境漏掉了什麼？",
      en: "What do mainstream adoption models such as TAM and UTAUT miss in the generative AI setting?",
    },
    claim: {
      zh: "採用模型把使用者的詮釋參照框架當成已定，但生成式 AI 恰恰使這個前置問題懸而未決；當系統的產出與身分核心任務重疊，「有用」本身就是雙面刃——高知覺有用性可能正是引發角色威脅的刺激。",
      en: "Adoption models take the user's interpretive frame of reference as fixed, but generative AI unsettles precisely that prior question; where outputs overlap identity-central tasks, usefulness is double-edged—high perceived usefulness can be the very stimulus that raises role threat.",
    },
    theories: {
      zh: "科技接受模式（Davis, 1989）、整合性科技接受與使用理論（Venkatesh et al., 2003）。",
      en: "Technology acceptance model (Davis, 1989); UTAUT (Venkatesh et al., 2003).",
    },
    refLabel: { zh: "對應 §2.1", en: "Corresponds to §2.1" },
  },
  {
    id: "g2-2",
    anchor: "s-2-2",
    title: { zh: "§2.2 科技框架、意義建構與意義賦予", en: "§2.2 Technological frames, sensemaking, and sensegiving" },
    question: {
      zh: "本文的理論骨幹是什麼？它們又留下哪兩個未言明之處？",
      en: "What is the paper's theoretical backbone, and what two matters does it leave unspecified?",
    },
    claim: {
      zh: "科技框架與意義建構（含意義賦予）供給三個前提：詮釋可變且有後果、詮釋靠線索擷取與合理敘說進行、管理者會主動引導詮釋。但它們未說明正向框架如何被「逆轉」為其反面，也未把科技自身的產出當作線索來源——這兩個缺口分別由 §2.3 與 §2.5 補上。",
      en: "Technological frames and sensemaking (with sensegiving) supply three premises: interpretation is variable and consequential, proceeds by cue extraction and plausible accounts, and is actively steered by management. They leave unspecified how a positive frame is reversed into its opposite and how the technology's own outputs become cues—gaps supplied by §2.3 and §2.5 respectively.",
    },
    theories: {
      zh: "科技框架（Orlikowski & Gash, 1994）、意義建構（Weick, 1995；Maitlis & Christianson, 2014）、意義賦予（Gioia & Chittipeddi, 1991）。",
      en: "Technological frames (Orlikowski & Gash, 1994); sensemaking (Weick, 1995; Maitlis & Christianson, 2014); sensegiving (Gioia & Chittipeddi, 1991).",
    },
    refLabel: { zh: "對應 §2.2", en: "Corresponds to §2.2" },
  },
  {
    id: "g2-3",
    anchor: "s-2-3",
    title: { zh: "§2.3 賦能敘事反噬的語用與論述基礎", en: "§2.3 The pragmatic and discursive foundations of backfire" },
    question: {
      zh: "一則明確正向的訊息，經過哪些可指認的性質而被逆轉成替代訊號？",
      en: "Through which identifiable properties is an explicitly positive message reversed into a substitution signal?",
    },
    claim: {
      zh: "五個驅動因子累積地（而非缺一不可地）推動逆轉：標記化的再保證（§2.3.1）、策略性模糊（§2.3.2）、效率語彙的委婉替換（§2.3.3）、言行不一致與詮釋先驗（§2.3.4）、自動化焦慮的威脅背景（§2.3.5）；§2.3.6 總結：這是語用逆轉機制，不是框架不一致。",
      en: "Five drivers push reversal cumulatively rather than as joint requirements: marked reassurance (§2.3.1), strategic ambiguity (§2.3.2), efficiency vocabulary as euphemistic substitution (§2.3.3), word–deed inconsistency and interpretive priors (§2.3.4), and the threat-laden backdrop of automation anxiety (§2.3.5); §2.3.6 concludes this is a pragmatic reversal mechanism, not frame incongruence.",
    },
    theories: {
      zh: "葛萊斯語用學與暗示效應、策略性模糊（Eisenberg, 1984）、組織論述研究、行為誠信（Simons, 2002）、組織信任（Mayer et al., 1995）、心理契約與變革犬儒主義、工作不安全感／STARA 覺察／AI 身分威脅。",
      en: "Gricean pragmatics and the innuendo effect; strategic ambiguity (Eisenberg, 1984); organizational discourse research; behavioral integrity (Simons, 2002); organizational trust (Mayer et al., 1995); psychological contract and change cynicism; job insecurity / STARA awareness / AI identity threat.",
    },
    refLabel: { zh: "對應 §2.3.1–2.3.6", en: "Corresponds to §2.3.1–2.3.6" },
  },
  {
    id: "g2-4",
    anchor: "s-2-4",
    title: { zh: "§2.4 認知評估與雙路徑", en: "§2.4 Cognitive appraisal and the dual pathway" },
    question: {
      zh: "框架如何連接到分化的回應？機會路徑憑什麼是真正的競爭評估，而非修辭上的平衡？",
      en: "How does the frame connect to differentiated responses, and what makes the opportunity pathway a genuine competing appraisal rather than a rhetorical counterweight?",
    },
    claim: {
      zh: "角色威脅與角色機會評估是同一評估歷程的威脅極與挑戰極：框架使初級評估偏向威脅，次級評估資源決定其落點；保護動機理論進一步說明高威脅可因因應效能不同而導向迴避或防衛性採用。機會路徑有三個自己的直接前因：參與式導入、可信的角色再設計承諾、增益導向的示範配置。",
      en: "Role threat and role opportunity appraisal are the threat and challenge poles of one appraisal process: the frame biases primary appraisal toward threat while secondary appraisal resources settle the outcome; protection motivation theory then explains how high threat routes to avoidance or defensive adoption depending on coping efficacy. The opportunity pathway has three direct antecedents of its own: participatory implementation, credible role-redesign commitment, augmentation-configured demonstration.",
    },
    theories: {
      zh: "認知評估理論（Lazarus & Folkman, 1984）、保護動機理論（Rogers, 1975）、STARA 挑戰／阻礙評估（Ding, 2021）、工作形塑（Wrzesniewski & Dutton, 2001）。",
      en: "Cognitive appraisal theory (Lazarus & Folkman, 1984); protection motivation theory (Rogers, 1975); STARA challenge–hindrance appraisal (Ding, 2021); job crafting (Wrzesniewski & Dutton, 2001).",
    },
    refLabel: { zh: "對應 §2.4.1–2.4.2", en: "Corresponds to §2.4.1–2.4.2" },
  },
  {
    id: "g2-5",
    anchor: "s-2-5",
    title: { zh: "§2.5 作為線索生成物的生成式 AI", en: "§2.5 Generative AI as a cue-generating artifact" },
    question: {
      zh: "為什麼生成式 AI 不只是被詮釋的對象，而是詮釋所用線索的生產者？",
      en: "Why is generative AI not merely an object of interpretation but a producer of the cues interpretation uses?",
    },
    claim: {
      zh: "探測產生線索（實作式意義建構），線索分三類（自指涉、展示性、社會傳遞），其效力受線索可信度與任務—角色重疊度調節；因為探測自我導向且系統表現不均，迴圈可預測地產生固化、擺盪、逆轉三種軌跡，這是分歧與不穩定的共同來源。",
      en: "Probing produces cues (enacted sensemaking); cues come in three classes (self-referential, demonstrative, socially transmitted) whose force is moderated by cue credibility and task-role overlap; because probes are self-directed and performance is uneven, the loop predictably yields entrenchment, oscillation, and reversal—the joint source of divergence and instability.",
    },
    theories: {
      zh: "實作式意義建構（Weick, 1988）、意義建構迴圈與資訊覓食（Pirolli & Card, 2005）、電腦即社會行動者（Nass 等）、MAIN 模型與機器捷思（Sundar）、自動化—增益弔詭（Raisch & Krakowski, 2021）、新興生成式 AI 意義建構研究（Agarwal et al., 2026；Yan et al., 2025）。",
      en: "Enacted sensemaking (Weick, 1988); the sensemaking loop and information foraging (Pirolli & Card, 2005); computers-are-social-actors (Nass et al.); the MAIN model and machine heuristic (Sundar); the automation–augmentation paradox (Raisch & Krakowski, 2021); emerging generative-AI sensemaking research (Agarwal et al., 2026; Yan et al., 2025).",
    },
    refLabel: { zh: "對應 §2.5.1–2.5.8", en: "Corresponds to §2.5.1–2.5.8" },
  },
  {
    id: "g3",
    anchor: "s-3",
    title: { zh: "§3 概念架構", en: "§3 Conceptual framework" },
    question: {
      zh: "整個架構如何組裝？哪些是機制、哪些是可測量的構念？",
      en: "How is the framework assembled, and which elements are mechanisms versus measurable constructs?",
    },
    claim: {
      zh: "架構把兩個機制串接成序列並閉合為迴圈（圖 1），元素分三層：主要機制與構念、脈絡前因、邊界條件（表 1）；兩種角色評估各由具名成分構成（表 2）；結果被正式化為四種採用回應模式的分類（表 3），以驅動力、行為深度與角色意義區分。",
      en: "The framework couples the two mechanisms in sequence and closes them into a loop (Figure 1); elements sort into three tiers—primary mechanisms and constructs, contextual antecedents, boundary conditions (Table 1); each role appraisal has named components (Table 2); and the outcome is formalized as a taxonomy of four adoption response modes (Table 3), distinguished by driver, depth, and role meaning.",
    },
    theories: {
      zh: "綜合 §2 各文獻；機制／構念的區分援引概念性理論建構慣例。",
      en: "Synthesizes the literatures of §2; the mechanism/construct distinction follows conceptual theory-building convention.",
    },
    refLabel: { zh: "對應 §3.1–3.5、圖 1、表 1–3", en: "Corresponds to §3.1–3.5, Figure 1, Tables 1–3" },
  },
  {
    id: "g4",
    anchor: "s-4",
    title: { zh: "§4 命題", en: "§4 Propositions" },
    question: {
      zh: "架構的因果主張如何被壓縮成可檢驗的形式？",
      en: "How are the framework's causal claims compressed into testable form?",
    },
    claim: {
      zh: "13 條命題按層次分工：P1–P3 給敘事逆轉機制定形並劃界（訊息屬性、前因、信任邊界條件）；P4／P4a 連接框架與雙路徑評估；P5–P7 給遞迴線索生產機制定形（可信度、線索類型、三種軌跡）；P8–P10（含 P9a）把評估與強制要求映射到四種回應模式，並給出可觀察的軌跡特徵。",
      en: "Thirteen propositions divide the labor: P1–P3 specify and bound narrative reversal (message properties, antecedents, the trust boundary condition); P4/P4a connect the frame to dual-pathway appraisal; P5–P7 specify recursive cue production (credibility, cue types, three trajectories); P8–P10 with P9a map appraisal and mandate onto the four response modes with observable trajectory signatures.",
    },
    theories: {
      zh: "承 §2–§3 的全部理論材料。",
      en: "Draws on all theoretical materials of §2–§3.",
    },
    refLabel: { zh: "對應 §4.1–4.5", en: "Corresponds to §4.1–4.5" },
  },
  {
    id: "g5-1",
    anchor: "s-5-1",
    title: { zh: "§5.1 理論貢獻", en: "§5.1 Theoretical contributions" },
    question: {
      zh: "本文自認推進了哪些文獻、推進在哪裡？",
      en: "Which literatures does the paper claim to advance, and where exactly?",
    },
    claim: {
      zh: "恰好三項：敘事逆轉機制把框架研究從「記錄不一致」推進到「指明逆轉」，並區分意義賦予失敗與敘事反噬；遞迴線索生產解釋把科技自身產出理論化為線索來源，說明威脅為何是被建構且可修訂的；回應模式觀點指出高知覺有用性可反轉為替代解讀，並解釋純遵從與防衛性採用為何在既有測量下不可見。",
      en: "Exactly three: the reversal mechanism advances frame research from documenting incongruence to specifying reversal, distinguishing sensegiving failure from narrative backfire; the recursive cue-production account theorizes the technology's own outputs as cue sources, showing why threat is constructed and revisable; the response-mode view shows how high perceived usefulness can invert into a replaceability reading and why compliance-only use and defensive adoption were invisible to volume-based measures.",
    },
    theories: {
      zh: "科技框架與意義賦予、意義建構、AI 威脅研究、科技採用研究。",
      en: "Technological frames and sensegiving; sensemaking; AI-threat research; technology-adoption research.",
    },
    refLabel: { zh: "對應 §5.1", en: "Corresponds to §5.1" },
  },
  {
    id: "g5-2",
    anchor: "s-5-2",
    title: { zh: "§5.2 邊界條件與適用範圍", en: "§5.2 Boundary conditions and scope" },
    question: {
      zh: "這個理論在什麼條件下最強、什麼條件下不適用？",
      en: "Under what conditions is the theory strongest, and where does it not apply?",
    },
    claim: {
      zh: "機制在角色後果不確定、產出與身分核心知識工作重疊、系統可查詢可示範可私測時最強；就業保護、工會與證照等制度參數會校準基線機率；理論談的是「被詮釋的替代」而非「客觀替代」，不是所有 AI 導入的一般理論。",
      en: "The mechanisms are strongest where role consequences are uncertain, outputs overlap identity-central knowledge work, and the system is queryable, demonstrable, and privately testable; employment protection, unions, and licensure calibrate baseline probabilities; the account concerns interpreted rather than objective substitution and is not a general theory of all AI implementation.",
    },
    theories: {
      zh: "三個邊界條件（組織信任、次級評估資源、AI 生成線索可信度）與制度脈絡參數。",
      en: "The three boundary conditions (organizational trust, secondary appraisal resources, AI-generated cue credibility) plus institutional context parameters.",
    },
    refLabel: { zh: "對應 §5.2", en: "Corresponds to §5.2" },
  },
  {
    id: "g5-3",
    anchor: "s-5-3",
    title: { zh: "§5.3 實證研究方向", en: "§5.3 Directions for empirical research" },
    question: {
      zh: "這些命題實際上要怎麼測？",
      en: "How would one actually test these propositions?",
    },
    claim: {
      zh: "P1–P3 適合訊息屬性實驗（再保證×模糊×效率框架，交叉信任與角色脆弱性）；P5–P7 需要個人內跨時間設計（日誌、經驗取樣、探測歷程追蹤）；P8–P10 要求測驅動力、深度與軌跡而非使用量，適合潛在轉移分析；「AI 即替代」框架與角色威脅評估必須用參照對象區分（事件的意義 vs. 自身角色成分），並以驗證性因素分析確立區辨效度。",
      en: "P1–P3 invite message-property experiments (reassurance × ambiguity × efficiency framing, crossed with trust and role vulnerability); P5–P7 require within-person over-time designs (diaries, experience sampling, probe process-tracing); P8–P10 require measuring driver, depth, and trajectory rather than volume, suiting latent transition analysis; the frame and role threat appraisal must be separated referentially (meaning of the event vs. one's own role components) with discriminant validity established via CFA.",
    },
    theories: {
      zh: "既有量表：工作不安全感、STARA 覺察、機器捷思量表（Yang & Sundar, 2024）、組織信任（Mayer et al., 1995）。",
      en: "Existing instruments: job insecurity, STARA awareness, the machine-heuristic scale (Yang & Sundar, 2024), organizational trust (Mayer et al., 1995).",
    },
    refLabel: { zh: "對應 §5.3", en: "Corresponds to §5.3" },
  },
  {
    id: "g5-4",
    anchor: "s-5-4",
    title: { zh: "§5.4 實務意涵", en: "§5.4 Practical implications" },
    question: {
      zh: "對正在導入生成式 AI 的組織，這個架構給出什麼可操作的提醒？",
      en: "What actionable cautions does the framework offer organizations implementing generative AI?",
    },
    claim: {
      zh: "三點：再保證不夠，要配上任務範圍、角色再設計、參與及可查核承諾的特定性；員工必然私下測試，組織無法完全控制迴圈，但能以引導式實驗與集體詮釋場合形塑它；要診斷採用的「模式」而非以使用量推斷成功——高用量可能是防衛性採用，低用量可能是迴避或遵從最低限。",
      en: "Three points: reassurance alone is insufficient and must be paired with specificity about task scope, role redesign, participation, and observable commitments; employees will privately test the system, so the loop cannot be fully controlled but can be shaped through guided experimentation and collective interpretation; diagnose the mode of adoption rather than inferring success from volume—high use may be defensive, low use may be avoidance or a compliance minimum.",
    },
    theories: {
      zh: "由 P1a、P4a 與回應模式分類直接推導；強調意義管理重於訊息措辭。",
      en: "Derived directly from P1a, P4a, and the response-mode taxonomy; meaning management over message wording.",
    },
    refLabel: { zh: "對應 §5.4", en: "Corresponds to §5.4" },
  },
  {
    id: "g6",
    anchor: "s-6",
    title: { zh: "§6 結論", en: "§6 Conclusion" },
    question: {
      zh: "全文的最終主張是什麼？",
      en: "What is the paper's final claim?",
    },
    claim: {
      zh: "分歧且不穩定的回應，不只來自技術差異，更來自員工如何建構並遞迴修訂技術對其角色的意義；兩個機制的「耦合」——框架選擇探測、探測回傳線索、線索決定框架的固化／擺盪／逆轉——才是主流採用模型未指明之處。最尖銳的推論：使用量本身無法區辨被賦能與被嚇壞的團隊。",
      en: "Divergent, unstable responses stem not only from differences in the technology but from how employees construct and recursively revise its meaning for their roles; it is the coupling—the frame selects the probes, the probes return the cues, the cues decide entrenchment, oscillation, or reversal—that mainstream adoption models leave unspecified. Its sharpest corollary: usage volume alone cannot distinguish an empowered workforce from a frightened one.",
    },
    theories: {
      zh: "總結全文，無新增文獻。",
      en: "Concluding synthesis; no new literature.",
    },
    refLabel: { zh: "對應 §6", en: "Corresponds to §6" },
  },
];
