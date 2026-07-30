# 公開內容分級報告（PUBLICATION_BOUNDARY）

最後更新：2026-07-30。本報告是全站內容公開與否的單一判準文件；任何分級變更由**作者（賴柳蓉／Liu-Jung Lai）本人**核准後，人工修改 `content/source-manifest.ts` 與本文件。

## 1. Paper A《When Enablement Narratives Backfire》— 公開內容

| 內容 | 狀態 |
|---|---|
| 英文全文、中文全文（作者核定術語）、圖 1、三個表、參考文獻、各項聲明 | **public**（維持現狀） |
| 導讀／機制拆解／命題總表／採用模式／術語辭典／引用頁 | **public** |

Paper A 為概念性論文（投稿審查中），無實驗材料污染問題，無 embargo。

## 2. Paper B《The Integration–Replaceability Paradox》— 目前可公開內容

| 內容 | 位置 |
|---|---|
| 暫定題名、正式署名（Liu-Jung Lai／賴柳蓉）、關鍵詞（暫定） | 論文頁、papers 列表、首頁卡片 |
| 「Working manuscript · Research in progress · 尚未蒐集資料」標示 | 同上 |
| 高階研究問題（一句） | 論文頁、卡片 |
| 理論背景摘要（網站改寫，非逐字全文） | 論文頁 |
| 不揭露刺激材料之研究設計概要（2 × 2 受試者間、分階段情境實驗、調節式中介分析） | 論文頁 |
| 「完整方法與研究工具將於資料蒐集完成或正式發表後公開」說明 | 論文頁 embargo 區塊 |
| 公開節錄稿：題名頁＋§1（研究設計兩段暫不公開）＋§2＋參考文獻（英文基準稿與中文工作譯本） | `translation/paper-b/` |
| 術語表（構念層級，不含題項） | `translation/paper-b/terms.tsv` |

## 3. Paper B — 資料蒐集完成前 embargo 內容（不在公開 repository）

1. Appendix A 完整情境刺激文本（含共同引言與各階段材料）。
2. 各實驗組別的確切操弄差異（整合低／高、佐證低／高之全文）。
3. 操弄檢核題項（IMC、CMC 等）。
4. 注意力檢核與其答案。
5. 理解檢核題項。
6. 漏斗式疑心探查題組。
7. Appendix B 完整題項池（v5）。
8. 專家審查題項與判準。
9. 研究者專用診斷內容。
10. §3–§5 全文（含 H1a–H5 正式假設陳述、方法細節、預定分析架構模板）。
11. **研究模型圖（Figure 1，英文原圖與中文重建 SVG）**：因直接標示假設編號與路徑，暫列 embargo；是否提前公開為**待作者人工裁決**事項。
12. 完整英文基準稿、完整中文工作譯本（198 平行區塊）、完整翻譯查核報告。

以上檔案已輸出至 repository 之外的私人交付目錄並移交作者（隨 Claude Code session 附件交付：`en_source_FULL.md`、`zh_draft_FULL.md`、`translation_qa_FULL.md`、`paper-b-figure1.png`、`paper-b-figure1-zh.svg`）。**建議**：由作者另建 **private repository**（例如 `panpanhuang332/liu-jung-lai-private-materials`）長期保存完整版；公開 repository 之任何資料夾（包含名為 private／internal／hidden 者）一律視為公開，不得存放。

註：本 PR 分支的早期 commit 歷史中曾包含完整材料；建議合併時使用 **Squash and merge 並刪除分支**，使 embargo 材料不進入 main 的歷史（詳見 PR 說明）。

## 4. 永久 internal-only 內容

- 原稿 PART II 研究工具附件：專家審查冊（盲分類 V1–V5、揭示評定）、操弄材料參照附件、研究者附件（含「僅研究者持有」之預標風險與冗餘清單、Item Decision Log）、認知訪談骨架 v3。
- `理論延伸圖.png`、`五層全展開_學術命題與產學經濟模式.md`（未在工作環境出現；預設 internal-only）。
- Google 表單回覆、Google Sheet 內容、讀者 Email 與任何個資。

## 5. 作者署名裁決狀態

**已裁決（2026-07-30）**：Paper B 正式唯一作者＝Liu-Jung Lai（賴柳蓉），通訊作者＝Liu-Jung Lai；`authorshipConfirmed: true`。v1 工作稿暫時署名之版本紀錄保留於 `docs/SOURCE_AUDIT.md` §1.1（不顯示於公開網站頁面）。

## 6. 翻譯審定狀態

- Paper A 中文全文：術語作者核定（2026-07-27）。
- Paper B 中文工作譯本：**未審定**（authorApproved: false）；網站統一標示「中文工作譯本（待作者審定）」。8 個術語待作者確認（見 `translation/paper-b/terms.tsv`）。

## 7. 解除 embargo 所需條件

符合下列**任一**條件後，方可將第 3 節內容改為 public：

1. 主研究資料蒐集正式完成（含所有前導研究與正式實驗之資料蒐集）；或
2. 論文正式發表（或期刊/預印本政策要求公開材料）之時；且
3. 兩種情形下均需**作者本人明確核准**，並確認公開版本與最終施測版本之對應關係。

解除程序：作者核准 → 更新 `content/source-manifest.ts` 分級 → 將完整檔重新加入 repository → 恢復全文頁與圖檔 → 更新本文件與 `docs/SOURCE_AUDIT.md`。

## 8. 未來由誰核准公開

**唯一核准人：作者本人（賴柳蓉／Liu-Jung Lai）。** Claude Code 或其他協作者只能提出建議與執行已核准的變更，不得自行解除 embargo、公開 internal-only 內容、或變更署名／翻譯審定狀態。
