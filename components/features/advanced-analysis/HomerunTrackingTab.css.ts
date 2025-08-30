// components/features/advanced-analysis/HomerunTrackingTab.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

/**
 * 頁籤內容的主容器。
 * 使用 Grid 佈局，讓兩張卡片並排顯示，並在不同螢幕尺寸下自動換行。
 */
export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: vars.space.lg,
})

/**
 * 單一球員數據卡片的樣式。
 */
export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  padding: vars.space.lg,
  backgroundColor: vars.colors.surface,
  borderRadius: '8px',
  border: `1px solid ${vars.colors.border}`,
})

/**
 * 卡片內球員姓名的標題樣式。
 */
export const playerName = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: 600,
  color: vars.colors.primary,
})

/**
 * 統計數據區塊的容器。
 */
export const statsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space.md,
})

/**
 * 分隔線的樣式。
 */
export const sectionSeparator = style({
  marginTop: vars.space.sm,
  paddingTop: vars.space.md,
  borderTop: `1px solid ${vars.colors.border}`,
})

/**
 * 百轟進度區塊的標題樣式。
 */
export const milestoneTitle = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: 600,
  color: vars.colors.textPrimary,
  marginBottom: vars.space.sm,
})

/**
 * 百轟進度區塊的內文樣式。
 */
export const milestoneText = style({
  fontSize: vars.fontSizes.base,
  color: vars.colors.textSecondary,
  lineHeight: 1.6,
})

/**
 * 錯誤訊息的樣式。
 */
export const errorText = style({
  color: vars.colors.error,
})
