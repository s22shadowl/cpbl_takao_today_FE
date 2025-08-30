/**
 * 專案的功能旗標 (Feature Flags) 設定檔。
 *
 * 在此處集中管理所有實驗性或可開關的功能，
 * 便於在不修改元件主要邏輯的情況下，快速啟用或停用特定功能。
 *
 * @example
 * export const FEATURE_FLAGS = {
 * enableNewDashboard: true,
 * enableExperimentalFeature: false,
 * };
 */

export const FEATURE_FLAGS = {
  /**
   * 是否在「賽季趨勢」頁面啟用 EventCalendarChart。
   */
  enableSeasonTrendsCalendar: false,
}
