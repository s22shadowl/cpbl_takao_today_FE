// components/ui/Card.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const card = style({
  padding: vars.space.lg, // 24px
  borderRadius: vars.space.sm, // 8px
  border: `1px solid ${vars.colors.border}`,
  backgroundColor: vars.colors.surface,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
})
