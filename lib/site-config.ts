/**
 * 站台層級設定（靜態）。
 *
 * Google 表單設定方式（詳見 docs/GOOGLE_FORM_SETUP_zh-TW.md）：
 * 1. 建立 Google 表單後，把「傳送」對話框中的連結貼到 publicUrl。
 * 2. 把「傳送」→「<>」（嵌入 HTML）中 iframe 的 src 網址貼到 embedUrl。
 * 3. 將 enabled 改為 true。
 * enabled 為 false 或 publicUrl 為空時，提問頁顯示「表單準備中」，
 * 不渲染 iframe、不產生錯誤。
 */
export const siteConfig = {
  googleForm: {
    publicUrl: "",
    embedUrl: "",
    enabled: false,
  },
  /** 作者照片（存在才會顯示；否則顯示 initials placeholder） */
  authorPhoto: "/images/author/liu-jung-lai.jpg",
} as const;

export function googleFormReady(): boolean {
  return siteConfig.googleForm.enabled && siteConfig.googleForm.publicUrl.length > 0;
}
