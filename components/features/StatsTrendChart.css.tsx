// /components/features/StatsTrendChart.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const chartContainer = style({
  width: '100%',
  height: '400px',
  fontFamily: vars.fontFamily.body,
})

export const tooltipWrapper = style({
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '8px',
  padding: `${vars.space.xs} ${vars.space.sm}`,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
})
