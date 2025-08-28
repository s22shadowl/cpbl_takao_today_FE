// components/features/advanced-analysis/RaccoonTrioTab.css.ts

import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

/**
 * 表格容器，設定 overflow 以支援水平捲動。
 */
export const tableContainer = style({
  width: '100%',
  overflowX: 'auto',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '6px',
})

/**
 * 表格本體樣式。
 */
export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: vars.fontSizes.sm,
})

/**
 * 表格標頭 (th) 與儲存格 (td) 的通用樣式。
 */
export const tableCell = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  textAlign: 'left',
  borderBottom: `1px solid ${vars.colors.border}`,
  whiteSpace: 'nowrap',
})

/**
 * 表格標頭 (th) 的特定樣式。
 */
export const tableHeader = style([
  tableCell,
  {
    backgroundColor: vars.colors.background,
    color: vars.colors.textSecondary,
    fontWeight: 600,
  },
])

/**
 * 表格列 (tr) 的樣式，移除最後一列的底線。
 */
export const tableRow = style({})

globalStyle(`${tableRow}:last-child td`, {
  borderBottom: 'none',
})

/**
 * 錯誤或無資料時的提示文字樣式。
 */
export const infoText = style({
  padding: vars.space.lg,
  color: vars.colors.textSecondary,
  textAlign: 'center',
})
