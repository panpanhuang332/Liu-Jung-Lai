# Paper B 翻譯品質查核報告（translation_qa）

譯本：`zh_draft.md`（中文工作譯本，待作者審定；authorApproved: false）
基準：`en_source.md`（自 `Paper1_________v1.docx`，v1 彙整檔，as of 2026-07-30 整理）
結構：中英各 198 個平行區塊，逐塊對應（已程式化驗證）。

## 1. 缺少內容（來源即缺，未補寫）

| 項目 | 狀態 |
|---|---|
| Abstract | 原稿為佔位符（「To be written after data collection」）；譯本照實翻譯佔位說明，未補寫摘要 |
| §6 Discussion | 原稿佔位符；未補寫 |
| §7 Conclusion | 原稿佔位符；未補寫 |
| §5 Results 數據 | 原稿為「Template only」預定分析架構；所有 `[ ]` 空白儲存格照實保留，未填任何數值 |
| Correspondence email | 原稿標示 [to be inserted]；譯本照實譯為〔待補〕 |
| Public Interest Statement／Research Integrity／Disclosure／Funding／Data Availability | 原稿無此等聲明章節，故無可譯 |
| Figure 2 | 原稿僅有繪圖規則文字（無圖檔）；照實翻譯規則文字，未產製假圖 |

## 2. 來源衝突

無。Paper B 僅有單一來源（v1 彙整檔）；提示中提及之 Section 檔（Draft v4／v3.1／封版 txt）未出現於工作環境，無從比對。故未建立 `version_conflicts.md`。

## 3. 待確認術語（needs-author-review，詳見 terms.tsv）

- infusion → 深化滲透（另一常見譯法「注入」）
- assimilation → 同化（或「吸納」）
- codification → 符碼化（或「編碼化」）
- cohort → 班隊（指進修部課程班級群；首見附原文）
- dual-perception signature → 雙重知覺表徵（signature 亦可譯「印記／特徵」）
- headcount logic → 人力員額邏輯
- wild-cluster bootstrap → wild cluster 拔靴法（統計方法名，保留英文核心詞）
- bootstrap → 拔靴法（另一常見譯法「自助法」；全稿統一「拔靴法」）

全部已在譯文中維持單一譯法；未假裝已確認。

## 4. 無法辨識的表格或圖像

- 無無法辨識者。Figure 1 為 docx 內嵌 PNG（3760×2120），清晰可辨，已抽出為 `public/figures/paper-b-figure1.png`，並依原圖忠實重建中文版 SVG（`paper-b-figure1-zh.svg`：節點、箭頭方向、實線／虛線、括號、假設編號、灰底／白底方框均未變動）。
- 原稿 Table 2–7 為空白模板（儲存格 `[ ]`），照實保留。

## 5. 疑似斷句／格式錯誤（來源端，未靜默修正）

1. 原 docx 中「# 3. Hypothesis Development and Research Model」與「# 5. Results」兩個章節標題黏接於前一段落末尾（Word 分段遺失）。整理 `en_source.md` 時已還原為獨立標題；此為格式修復，非內容變更。
2. 原稿 §2 末段（2.5）與 §4.7 末段即上述黏接處，語意完整，無內容缺損。
3. 診斷題項編號自 CC1 跳至 CC3（無 CC2）；照實保留，**建議作者確認**是否刻意（例如 CC2 已刪除）。

## 6. 交叉引用查核

- 章節交叉引用（§1↔§2.3↔§2.4↔§2.5↔§3.x↔§5.x）逐一核對，譯文保留原有指涉。
- 假設編號 H1a、H1b、H2、H3、H4、H5 全數保留並與原文一致。
- 表格編號 Table 1、2、2C、3A、3B、3C、4、5、6、7 與圖 1、圖 2 編號未變動。
- Appendix A 內部引用（指令四 Parts 0–9、CMC1–3、IMC1–4、RTe1–4）保留原編號。

## 7. 引用與參考文獻一致性

- 內文引用 24 筆來源全部見於 References；References 24 筆全部於內文出現（含 Faul et al., 2007；Hayes, 2022；Vander Elst et al., 2014 於方法章出現）。
- 參考文獻保留原始英文書目與格式，未翻譯、未改動作者／年份／卷期／頁碼／DOI、未自行補 DOI。
- 異常記錄（未修正）：
  1. Faul et al. (2007) 條目題名為「GPower 3」（通行寫法為「G*Power 3」，星號疑於原稿轉檔時遺失）；同條目「39*(2)」有一個位置異常的星號（斜體標記殘留）。**建議作者於投稿前修正原稿。**
  2. Lai, E. (under review) 為作者自身之投稿中手稿（即本網站 Paper A），非正式出版品；照實保留。

## 8. 可能需作者審定的句子（抽樣重點）

- §1 對 paradox 的界定句與 §2.3 對 Smith & Lewis (2011) 定義之對應（「矛盾卻相互關聯、同時存在且長期持續」）。
- §2.2「符碼化」相關句（Kogut & Zander 術語密度高）。
- §4.6 統計程序全部句子（效果編碼、置中、拔靴法、班隊感知重抽）——譯文力求精確，仍建議具統計背景者複核。
- §5 推論判準段（intersection–union rule 譯「交集—聯集規則」）。
- Appendix A 操弄材料為施測文本：正式中文施測版依原稿 §4.3 須經委員會翻譯程序（雙譯者、回譯、認知訪談）產生，**本工作譯本不得直接作為施測版使用**（已於網站頁面標註）。

## 9. 不確定是否公開的附件

- PART II 研究工具附件（專家審查冊 V1–V5、揭示評定冊、操弄材料參照附件、研究者附件〔含「僅研究者持有」之預標風險與冗餘清單、Item Decision Log〕、認知訪談骨架 v3）：**未翻譯、未公開、未 commit**。判定依據：文件自身標示為研究者持有之內部工具；公開將洩露預標風險題項與訪談探查設計，可能污染後續專家審查與前測。
- `理論延伸圖.png`、`五層全展開_學術命題與產學經濟模式.md`：未在工作環境出現；如日後提供，預設 internal-only，待人工判定。

## 10. 標示原則（已在網站執行）

- 網站所有 Paper B 中文內容標示「**中文工作譯本（待作者審定）**」。
- 不使用「官方中文譯本」「正式中文版本」「作者審定譯本」等字樣（`content/papers` 資料模型中 authorApproved 為 false）。
- 翻譯忠實性原則：推論／預期／擬議語氣（will、expected、intends、proposed）均譯為「將／預期／擬／預計」，未轉為完成式或實證結果語氣；conceptual claim 未譯為 empirical result。
