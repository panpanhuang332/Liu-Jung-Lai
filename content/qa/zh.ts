import type { QaItem } from "./types";

/**
 * 公開學術問答（中文）。
 *
 * 新增方式：由作者自 Google 表單回覆（Google Sheet）中挑選具代表性的問題，
 * 依讀者於表單勾選之同意選項決定匿名或署名，人工整理後加入下方陣列。
 * 絕不將讀者 Email 或未經同意之個資寫入本檔。
 * published 設為 false 即可隱藏一則問答。
 *
 * 範例格式（請勿直接發布此範例）：
 * {
 *   id: "qa-zh-001",
 *   locale: "zh",
 *   paperSlug: "enablement-narrative-backfire",
 *   question: "……",
 *   answer: "……",
 *   relatedSection: "§2.3",
 *   relatedHypothesisOrProposition: "P3",
 *   date: "2026-08-01",
 *   attribution: "",
 *   anonymous: true,
 *   published: true,
 * }
 */
export const qaZh: QaItem[] = [];
