// app/advanced-analysis/page.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

/**
 * 頁面的主要容器樣式。
 * 設定了內邊距、最大寬度、居中對齊以及子元素間的間距。
 */
export const container = style({
  padding: `${vars.space.lg} ${vars.space.md}`,
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
})

/**
 * 頁面主標題 (h1) 的樣式。
 * 設定了字體大小、顏色、字重和下邊距。
 */
export const title = style({
  fontSize: vars.fontSizes.xxl,
  color: vars.colors.textPrimary,
  fontWeight: 700,
  marginBottom: vars.space.md,
})
