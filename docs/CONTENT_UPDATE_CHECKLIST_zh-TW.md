# 內容更新檢查清單

每次更新網站內容時，逐項勾選：

## 更新前

- [ ] **來源版本確認**：這次要放上網站的內容，出自哪一版原稿？是否為最新版？（Paper B 目前基準：v1 彙整檔，2026-07-30）
- [ ] 不公開的內容（PART II 研究工具、內部規劃文件、讀者個資）沒有混入這次要 commit 的檔案。

## 內容

- [ ] **中英文一致**：中英 mdx 檔段落數一致（不一致時 build 會失敗）；新增段落兩邊都加了。
- [ ] **術語一致**：新文字使用 `output/術語對照表.md`（Paper A）與 `translation/paper-b/terms.tsv`（Paper B）的既定譯名。
- [ ] 未經作者審定的中文譯文仍標示「中文工作譯本（待作者審定）」。

## 頁面檢查（部署後實際點開）

- [ ] **圖表載入**：相關頁面圖片正常顯示、點擊可放大。
- [ ] **附件下載**：新放的 PDF／附件連結可下載，檔名標示清楚（English original／中文工作譯本／Supplementary material）。
- [ ] **手機版**：手機寬度下沒有橫向捲動溢出；表格可水平捲動。
- [ ] **深色模式**：切到深色模式檢查新內容可讀。
- [ ] **舊連結**：`/zh/paper/`、`/zh/guide/`、`/zh/mechanisms/`、`/zh/propositions/`、`/zh/modes/`、`/zh/glossary/`、`/zh/cite/`（及 `/en/` 版）都還開得起來。
- [ ] **語言切換**：在新改的頁面按語言切換，會停在同一頁的另一語言版。

## 互動功能

- [ ] **Google Form**：提問頁狀態正確（未設定→顯示準備中；已設定→按鈕與表單都開得起來）。
- [ ] **Q&A 隱私**：新公開的問答已取得讀者同意；署名／匿名設定正確；沒有 Email 或個資進到 repository。

## 技術

- [ ] **build**：GitHub Actions「Deploy to GitHub Pages」綠色勾（或本機 `npm run build` 成功）。
- [ ] **deployment**：正式網址 https://panpanhuang332.github.io/Liu-Jung-Lai/ 已更新（部署後約 1–3 分鐘）。
