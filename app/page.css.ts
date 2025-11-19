// app/page.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const section = style({
  padding: vars.space.lg,
  borderRadius: vars.space.sm,
  border: `1px solid ${vars.colors.border}`,
  backgroundColor: vars.colors.surface,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  marginBottom: vars.space.xl,
})

export const pageTitle = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: 'bold',
  marginBottom: vars.space.lg,
})
