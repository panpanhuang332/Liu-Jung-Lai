# 網站維護手冊（HANDOFF）

寫給柳蓉同學：這份文件說明網站的架構，以及日常更新的具體步驟。不需要程式背景，照著做即可；大部分小改動都可以直接在 GitHub 網頁上完成。

---

## 1. 網站整體架構

- 網站是「靜態網站」：所有頁面在 GitHub Actions 上預先產生，再由 **GitHub Pages** 免費放送。沒有伺服器、沒有資料庫、沒有登入，也不需要 Firebase 或任何付費服務。
- 網址結構：`/zh/…` 中文版、`/en/…` 英文版，右上角可切換語言與深淺色。
- 主要頁面：
  - `/zh/`：首頁（以作者為核心）
  - `/zh/papers/`：學術作品列表（兩篇論文平行並列）
  - `/zh/papers/enablement-narrative-backfire/`：Paper A 論文頁（當賦能敘事反噬）
  - `/zh/paper/`、`/zh/guide/`、`/zh/mechanisms/`、`/zh/propositions/`、`/zh/modes/`、`/zh/glossary/`、`/zh/cite/`：Paper A 的全文與各種導讀頁（**舊網址全部保留**）
  - `/zh/papers/integration-replaceability-paradox/`：Paper B 論文頁（整合—可替代性弔詭）。**注意**：Paper B 目前在資料蒐集完成前只公開節錄（詳見 `docs/PUBLICATION_BOUNDARY.md`），全文頁與研究模型圖已 embargo，資料蒐集完成後才可恢復
  - `/zh/questions/`：讀者提問（Google 表單入口）
  - `/zh/qa/`：公開學術問答
  - `/zh/about/`：關於作者

## 2. 兩篇論文的資料位置

| 內容 | 檔案 |
|---|---|
| 論文清單與狀態（卡片文字、標籤、章節清單） | `content/papers/index.ts` |
| Paper A 英文全文 | `content/en/paper.mdx` |
| Paper A 中文全文 | `content/zh/paper.mdx` |
| Paper B 公開節錄（英文基準稿、中文工作譯本、術語表、QA 節錄） | `translation/paper-b/` |
| Paper B 完整稿與圖檔（embargo，**不在公開 repo**） | 作者私人保存（建議另建 private repository；見 `docs/PUBLICATION_BOUNDARY.md`） |
| 圖檔（Paper A） | `public/figures/` |

注意：中英全文檔是「逐段平行」的——中文檔第 N 段對應英文檔第 N 段。若增刪段落，兩個檔案必須同步增刪，否則網站建置會報「block mismatch」錯誤。

## 3. 如何更換作者照片

1. 準備一張正方形照片（建議至少 480×480，不裁到臉），檔名改為 `liu-jung-lai.jpg`。
2. 放到 `public/images/author/` 資料夾（GitHub 網頁：進入該資料夾 →「Add file」→「Upload files」）。
3. 部署完成後，關於作者頁就會顯示照片。照片不存在時會顯示姓名縮寫方塊，不會破圖。

## 4. 如何修改作者簡介

編輯 `content/author.ts`：姓名、單位、信箱、研究興趣、研究主張都在這一個檔案。首頁的研究定位文字在 `components/home/AuthorHero.tsx` 上方的 `copy` 區塊。

## 5. 如何修改 Google Form 網址

見 `docs/GOOGLE_FORM_SETUP_zh-TW.md`。重點：編輯 `lib/site-config.ts`，填入 `publicUrl` 與 `embedUrl`，把 `enabled` 改成 `true`。

## 6. 如何新增一則公開學術問答

1. 到自己的 Google Sheet 看讀者提問，挑選要公開、且讀者已勾選「同意公開」的問題。
2. 編輯 `content/qa/zh.ts`（英文版放 `content/qa/en.ts`），在陣列中加入一筆，照檔案內註解的範例格式填：`id`（不重複即可，如 `qa-zh-001`）、`paperSlug`（三選一：`enablement-narrative-backfire`／`integration-replaceability-paradox`／`research-direction`）、`question`、`answer`、`relatedSection`、`relatedHypothesisOrProposition`、`date`、`attribution`（讀者同意署名才填）、`anonymous`、`published: true`。
3. **不要**把讀者 Email 或未同意公開的內容寫進檔案。

## 7. 如何隱藏一則問答

把該筆的 `published: true` 改成 `false` 即可（不必刪除）。

## 8. 如何新增第三篇論文

1. 在 `content/en/` 與 `content/zh/` 各放一個新的 `.mdx` 全文檔（格式仿照 Paper B：`#` 開頭是章節標題、段落之間空一行、表格用 `|` 直線）。兩檔段落數必須一致。
2. 在 `content/papers/index.ts` 的 `papers` 陣列中照 Paper B 的格式加一筆（slug、題名、狀態、章節清單、路由）。
3. 在 `app/[locale]/papers/` 下新增以 slug 命名的資料夾與頁面（最快的方式：請 Claude Code 照 Paper B 的兩個頁面複製修改）。
4. 在 `public/sitemap.xml` 補上新網址。

## 9. 如何更新論文狀態

編輯 `content/papers/index.ts` 中該論文的 `status`（中英文）與 `statusSchema`（英文描述）。例如 Paper B 未來投稿後，可改為「投稿審查中」。Paper A 的狀態文字另外也出現在 `lib/i18n.ts` 的 `paperStatus` 與 footer 文字，記得一併更新。

## 10. 如何替換 PDF 或附件

把檔案放進 `public/` 下的適當資料夾（例如 `public/downloads/`），檔名用能清楚辨識版本的名稱，例如：
- `integration-replaceability-paradox_en_original.pdf`（English original）
- `integration-replaceability-paradox_zh_working-translation.pdf`（中文工作譯本）
- `..._supplementary.pdf`（Supplementary material）
然後在對應頁面加上連結。**內部文件（internal material）不得放進 public/**——public 資料夾內所有東西都是公開的。

## 11. 在 GitHub 網頁介面修改簡單文字

1. 開啟 repository → 找到檔案 → 點右上鉛筆圖示「Edit this file」。
2. 修改後拉到下方「Commit changes」：選「Create a new branch … and start a pull request」。
3. 建立 Pull Request → 等待自動部署檢查 → 按「Merge」。合併到 `main` 後幾分鐘內網站自動更新。

## 12. 使用 Claude Code 修改較大內容

到 https://claude.ai/code （或安裝 Claude Code CLI），連結此 GitHub repository，用中文描述需求即可，例如：「把 Paper B 的狀態改成投稿審查中，並在 papers 頁面更新標籤」。要求它：先開新分支、完成後跑 `npm run build`、開 Pull Request 給你確認。

## 13. 如何建立 branch

GitHub 網頁：repository 首頁左上角分支選單 → 輸入新分支名稱（例如 `update-qa-2026-08`）→「Create branch」。之後的編輯都選在這個分支上 commit。

## 14. 如何提交 Pull Request

分支上有新 commit 後，GitHub 會出現「Compare & pull request」按鈕 → 填標題與說明 → 「Create pull request」。確認沒問題後按「Merge pull request」。

## 15. 如何查看 GitHub Actions 部署結果

repository 上方「Actions」分頁 → 最新一筆「Deploy to GitHub Pages」。綠色勾＝成功；紅色叉＝失敗，點進去看紅字錯誤訊息（最常見是中英文段落數不一致）。合併到 `main` 才會觸發部署。

## 16. 如何回復上一版

- 單一 commit：repository →「Commits」→ 找到出問題的 commit → 右上「⋯」→「Revert」→ 產生反向 PR → 合併。
- 或請 Claude Code：「請把網站回復到 commit ○○○ 的狀態，開 PR 給我」。

## 17. 哪些檔案不得公開

- 論文原稿 docx 的 **PART II 研究工具附件**（專家審查冊、盲分類表、「僅研究者持有」的研究者附件、認知訪談骨架）：**不要**上傳到 repository。
- `理論延伸圖.png`、`五層全展開_學術命題與產學經濟模式.md`（若在你電腦上）：屬內部規劃文件，未經你明確決定不要放上來。
- 判斷原則：放進這個 repository 的任何檔案（不只 `public/`）都視同公開。

## 18. 讀者資料的紅線

**不要**把 Google 表單回覆匯出檔、Google Sheet 內容或讀者 Email commit 到 GitHub。公開問答只放你逐字整理、且讀者已同意公開的文字。

## 19. 網站不需要的東西

本網站**不需要**：Firebase、Supabase、資料庫、會員登入、OAuth、API 金鑰、信用卡、任何付費雲端服務。若有人（或任何 AI 工具）建議加這些，預設答案是「不需要」。

## 20. 常見錯誤與排除

| 症狀 | 原因 | 解法 |
|---|---|---|
| Actions 紅叉：`paper block mismatch: en=X zh=Y` | 中英全文檔段落數不一致 | 檢查最近改過的 mdx，把兩檔段落補齊（段落之間必須空一行） |
| 圖片破圖 | 檔名或路徑打錯、或圖檔沒放進 `public/` | 確認 `public/figures/` 內檔名與 mdx 中路徑完全一致（含大小寫） |
| 提問頁沒有表單 | `lib/site-config.ts` 的 `enabled` 還是 `false` 或網址空白 | 照第 5 節設定 |
| 新問答沒出現 | `published` 不是 `true`，或改在 `en.ts` 但看的是中文頁 | 檢查該筆資料 |
| 網站沒更新 | 只 push 到分支、還沒合併進 `main` | 合併 PR 後等 Actions 跑完 |
| 部署成功但頁面 404 | 網址少了結尾斜線或拼錯 slug | 從首頁導覽點過去，複製正確網址 |
