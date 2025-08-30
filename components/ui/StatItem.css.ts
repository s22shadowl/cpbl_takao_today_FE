// components/ui/StatItem.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

/**
 * 單一統計項目的容器。
 */
export const statItem = style({
  display: 'flex',
  flexDirection: 'column',
})

/**
 * 統計項目的標籤文字 (例如："距今天數")。
 */
export const statLabel = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
})

/**
 * 統計項目的數值。
 */
export const statValue = style({
  fontSize: vars.fontSizes.lg,
  color: vars.colors.textPrimary,
  fontWeight: 500,
})
