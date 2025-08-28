// components/features/advanced-analysis/NPBStreaksTab.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

/**
 * 頁籤內容的主容器，設定卡片之間的間距。
 */
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
})

/**
 * 顯示本季連線總次數的標題樣式。
 */
export const totalStreaksTitle = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: 600,
  color: vars.colors.textPrimary,
  marginBottom: vars.space.sm,
})

/**
 * 單次連線事件的卡片樣式。
 */
export const streakCard = style({
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '8px',
  overflow: 'hidden',
})

/**
 * 卡片標頭，顯示比賽基本資訊。
 */
export const cardHeader = style({
  padding: `${vars.space.md} ${vars.space.lg}`,
  backgroundColor: vars.colors.background,
  borderBottom: `1px solid ${vars.colors.border}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space.md,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
})

/**
 * 卡片內容區域。
 */
export const cardContent = style({
  padding: vars.space.lg,
})

/**
 * 打席列表的容器。
 */
export const atBatsList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
})

/**
 * 單一打席的項目樣式。
 */
export const atBatItem = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
  paddingBottom: vars.space.md,
  borderBottom: `1px solid ${vars.colors.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    },
  },
})

/**
 * 打席項目中的主要資訊列 (球員、結果)。
 */
export const atBatMainInfo = style({
  display: 'flex',
  gap: vars.space.md,
})

/**
 * 打席項目中的球員姓名。
 */
export const atBatPlayer = style({
  fontWeight: 500,
  minWidth: '80px',
})

/**
 * 打席項目中的次要資訊 (出局、壘包)。
 */
export const atBatSubInfo = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  paddingLeft: '96px', // 與球員姓名的寬度對齊
})

/**
 * 卡片註腳，顯示總得分。
 */
export const cardFooter = style({
  marginTop: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: `1px solid ${vars.colors.border}`,
  textAlign: 'right',
  fontSize: vars.fontSizes.lg,
  fontWeight: 600,
  color: vars.colors.primary,
})

/**
 * 錯誤或無資料時的提示文字樣式。
 */
export const infoText = style({
  padding: vars.space.lg,
  color: vars.colors.textSecondary,
  textAlign: 'center',
})
