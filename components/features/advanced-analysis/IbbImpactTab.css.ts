// components/features/advanced-analysis/IbbImpactTab.css.ts

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
 * 單次敬遠事件的卡片樣式。
 */
export const impactCard = style({
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
  flexDirection: 'column', // 改為縱向佈局
  gap: vars.space.sm, // 新增間距
})

/**
 * 卡片標頭中的主要資訊列 (日期、局數)。
 */
export const headerMain = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

/**
 * 卡片標頭中的詳細資訊列 (投手、出局、壘包)。
 */
export const headerDetails = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
})

/**
 * 卡片標頭中的文字樣式。
 */
export const headerText = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
})

/**
 * 卡片內容區域。
 */
export const cardContent = style({
  padding: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
})

/**
 * 後續打席列表的容器。
 */
export const atBatsList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
})

/**
 * 單一後續打席的項目樣式。
 */
export const atBatItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${vars.space.sm} 0`,
  borderBottom: `1px solid ${vars.colors.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
})

/**
 * 打席結果摘要，用於突顯總失分。
 */
export const resultSummary = style({
  marginTop: vars.space.md,
  paddingTop: vars.space.md,
  borderTop: `1px solid ${vars.colors.border}`,
  textAlign: 'right',
  fontSize: vars.fontSizes.lg,
  fontWeight: 600,
})

/**
 * 總失分文字的樣式，根據是否有失分顯示不同顏色。
 */
export const runsScoredText = style({
  color: vars.colors.textPrimary,
  selectors: {
    '&[data-has-runs="true"]': {
      color: vars.colors.error,
    },
  },
})

/**
 * 錯誤或無資料時的提示文字樣式。
 */
export const infoText = style({
  padding: vars.space.lg,
  color: vars.colors.textSecondary,
  textAlign: 'center',
})
