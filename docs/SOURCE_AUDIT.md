# SOURCE_AUDIT — 來源稽核報告

稽核日期：2026-07-30
稽核範圍：GitHub repository `panpanhuang332/Liu-Jung-Lai` 工作目錄全部檔案 + 本次任務隨附上傳檔案。
稽核者：Claude Code（自動稽核，處置建議需作者確認）。

## 0. 稽核結論摘要

- **Paper A**（既有論文）：*When Enablement Narratives Backfire: Recursive Sensemaking and Modes of Adoption Response in Generative AI Implementation*。來源為 repository 內既有之 `content/en/paper.mdx` 與 `content/zh/paper.mdx`（中文譯本術語已由作者於 2026-07-27 整批核定，見 `output/術語對照表.md`）。本次任務**未收到**任何較新的 Paper A 原稿，因此不覆蓋任何 Paper A 既有內容。
- **Paper B**（新論文）：*The Integration–Replaceability Paradox: AI Workflow Integration, Perceived Role Replaceability, and Role Threat Appraisal*（原稿明確標示 working title／暫定題名，投稿前定稿）。唯一來源為本次上傳之 `Paper1_________v1.docx`（原始檔名含底線，內部命名為「Paper 1」，但與網站 Paper A 為不同論文）。
- **完整性裁決：Paper B 不是完整論文。** 摘要尚未撰寫（原稿明載「To be written after data collection」）、Section 6（Discussion）與 Section 7（Conclusion）為佔位符、Section 5（Results）為「Template only」的預定分析架構（含空白表格模板），且尚無實際資料。依規則以 **Working manuscript / Research in progress／工作論文** 處理；網站僅公開實際存在的章節，不補寫任何缺少內容。
- 原稿 PART II（研究工具附件：專家審查冊、盲分類表、研究者附件、認知訪談骨架）含明確標示「**僅研究者持有**」之內容，全部列為 **internal-only**，不公開、不 commit 全文至 repository。

## 1. 逐檔稽核

### 1.1 本次上傳檔案

| # | 項目 | 內容 |
|---|---|---|
| 檔名 | `Paper1_________v1.docx`（上傳檔實際名稱 `b641b818-Paper1_________v1.docx`） | |
| 類型 | DOCX（Word 手稿彙整檔，內嵌 1 張 PNG 圖） | |
| 推定所屬論文 | **Paper B** | |
| 題名 | The Integration–Replaceability Paradox: AI Workflow Integration, Perceived Role Replaceability, and Role Threat Appraisal（working title，原稿標示「暫定題名，投稿前定稿」） | |
| 作者 | 原稿署名 **Eric Lai**（Sole author；correspondence 標示 [to be inserted]）。與網站作者 Liu-Jung Lai（賴柳蓉）之對應**需作者確認**（見 §4 疑點） | |
| 版本日期 | 原稿 Document status note 載明「as of 2026-07-30」；檔名版本 v1 | |
| 包含章節 | 題名頁、Keywords（暫定）、Document status note、§1 Introduction、§2 Theoretical Background（2.1–2.5）、§3 Hypothesis Development and Research Model（3.1–3.4，H1a–H5）、Figure 1（sealed，內嵌 PNG）、§4 Method（4.1–4.7）、§5 Results（Template only，5.1–5.9 預定分析架構＋空白表格模板 Table 2–7）、§6 Discussion（佔位符）、§7 Conclusion（佔位符）、References（21 筆，經作者查證之 citation log）、Appendix A（實驗材料，sealed）、Appendix B（Item Pools v5，專家審查凍結版）、**PART II 研究工具附件（內部）** | |
| 摘要／關鍵詞／圖／表／參考文獻／附錄 | 摘要：**無**（佔位符）。關鍵詞：有（標示暫定）。圖：Figure 1（研究模型，sealed）。表：Table 1（構念比較，有內容）；Table 2–7 為空白模板。參考文獻：有。附錄：Appendix A、B 有內容 | |
| 是否為完整論文 | **否**（缺 Abstract、§6、§7；§5 無資料） | |
| 是否適合公開 | **部分適合**：題名頁至 Appendix B（明確標示 sealed／凍結之學術內容）適合以「工作論文」名義公開；PART II 不適合 | |
| 是否與現有網站內容重複 | 否。題名、研究問題、方法（實驗研究 vs. Paper A 概念性論文）均不同；引用了 Paper A（Lai, under review），為平行的另一篇論文 | |
| 是否疑似內部規劃文件 | 主文（§1–§5、App A/B）：否，為正式手稿。**PART II：是**（專家審查工具、含「僅研究者持有」之預標風險清單、Item Decision Log、認知訪談編碼卡） | |
| 建議處置 | 主文（題名頁–Appendix B）：**public-after-review**（以 working manuscript 標示公開，中文譯本待作者審定）。PART II：**internal-only**。內嵌 Figure 1：public（隨主文） | |

### 1.2 Repository 既有來源

| 檔案 | 類型 | 所屬 | 說明 | 完整性 | 處置 |
|---|---|---|---|---|---|
| `content/en/paper.mdx` | MDX | Paper A | 英文全文（已上線） | 完整（概念性論文含 Abstract、§1–§6、References、聲明） | **public**（維持現狀，不覆蓋） |
| `content/zh/paper.mdx` | MDX | Paper A | 中文全文（已上線；術語經作者 2026-07-27 核定） | 完整 | **public**（維持現狀，不覆蓋） |
| `content/glossary.json` | JSON | Paper A | 網站術語辭典 | — | public（維持） |
| `output/論文全文_繁體中文.md` / `.docx` | MD/DOCX | Paper A | 中文譯本工作檔 | 完整 | 既存工作檔，不連結至公開頁面（duplicate of `content/zh/paper.mdx`） |
| `output/術語對照表.md` | MD | Paper A | 作者核定術語表（Paper B 翻譯之繼承依據） | — | 既存工作檔；Paper B 術語表引用之 |
| `output/figure1_zh_draft.svg`、`figure1_中文化說明.md` | SVG/MD | Paper A | 圖 1 中文化工作檔 | — | 既存工作檔 |
| `public/figures/figure1.png`、`figure1-full.png` | PNG | Paper A | 網站圖 1 | — | public（維持） |
| `public/og.png` | PNG | 網站 | Open Graph 分享圖 | — | public（維持） |

### 1.3 提示中列出、但目前工作環境中「不存在」的檔案

以下檔案在 repository 與本次工作目錄中**均未找到**，本次不做任何處置，也不憑空重建其內容：

| 檔案 | 狀態 | 說明 |
|---|---|---|
| `Manuscript_with_author_details_revised.docx` | 未找到 | 推定為 Paper A 原稿之歷史版本；Paper A 內容已在 `content/` 上線，不受影響 |
| `Section-1-Introduction-—-Draft-v4.txt` | 未找到 | 推定為 Paper B 章節舊版；本次以 v1 彙整 docx（2026-07-30）為唯一基準，無版本衝突可稽核 |
| `Section-2-Theoretical-Background-—-最終版(Draft-v3.1,封版).txt` | 未找到 | 同上 |
| `Section-4-Method-—-最終版(封版).txt` | 未找到 | 同上 |
| `理論延伸圖.png` | 未找到 | 無法確認其性質（正式圖表／延伸研究地圖／內部規劃圖），依規則**保留 internal-only 處置**；如日後提供，須先人工判定 |
| `五層全展開_學術命題與產學經濟模式.md` | 未找到 | 依任務規則預設 **internal-only**，除非作者在 manifest 中人工標記為 public |

### 1.4 版本衝突

僅有一份 Paper B 來源（v1 彙整檔，2026-07-30），**未發現版本衝突**；`translation/paper-b/version_conflicts.md` 因此不需建立。若日後出現 Section 檔舊版與彙整檔差異，應以彙整檔（較新、標示 sealed）為準並記錄。

## 2. Paper B 公開章節清單（網站上明示）

公開（以 working manuscript 名義）：
- 題名（標示 working title）與作者資訊
- Keywords（標示暫定）
- §1 Introduction
- §2 Theoretical Background（2.1–2.5）
- §3 Hypothesis Development and Research Model（3.1–3.4；H1a, H1b, H2, H3, H4, H5）
- Figure 1（研究模型，含中文重建版）
- §4 Method（4.1–4.7）
- §5 Results — **僅以「預定分析架構（preregistered analysis plan template）」名義公開文字說明；空白數據表格模板一併呈現但明確標示無資料**
- References
- Appendix A（實驗材料，sealed）
- Appendix B（Item Pools v5，凍結版）

不公開（缺漏，網站不得建立假內容頁）：
- Abstract（尚未撰寫）
- §6 Discussion（佔位符）
- §7 Conclusion（佔位符）
- PART II 研究工具附件（internal-only；含「僅研究者持有」內容）

## 3. Paper A 一致性核對

- 本次未收到新的 Paper A 原稿 → 不更動 `content/en/paper.mdx`、`content/zh/paper.mdx`、命題、圖表與已核定術語。
- Paper B 原稿引用 Paper A：`Lai, E. (under review). When enablement narratives backfire… Manuscript submitted to Cogent Business & Management.` 與網站現況（manuscript under review）一致。
- Paper B 與 Paper A 共用構念之中文譯名沿用作者已核定版本（role threat appraisal → 角色威脅評估；credible role-redesign commitment → 可信的角色再設計承諾；task–role overlap → 任務—角色重疊度 等），詳見 `translation/paper-b/terms.tsv`。

## 4. 待作者確認之疑點

1. **作者署名**：Paper B 原稿署名 Eric Lai；網站與 Paper A 使用 Liu-Jung Lai（賴柳蓉）。網站 Paper B 頁面暫以網站既有作者身分（Liu-Jung Lai）呈現並於引用區註記原稿署名，**請作者確認正式署名**。
2. **Correspondence email**：Paper B 原稿標示 [to be inserted]；網站沿用既有公開信箱。
3. **題名**：working title，投稿前可能變更；網站以「暫定題名」標示。
4. **Keywords 暫定**：以「暫定」標示。
5. `理論延伸圖.png`、`五層全展開_學術命題與產學經濟模式.md` 未在工作環境出現；如存在於作者本機，預設 internal-only。

## 5. 隱私與不公開原則（本次執行）

- PART II 全文**不** commit 至 repository、不出現在公開網站與下載區。
- 不公開任何讀者 Email、Google 表單回覆。
- 網站不加入 Firebase／資料庫／登入／API 金鑰。
