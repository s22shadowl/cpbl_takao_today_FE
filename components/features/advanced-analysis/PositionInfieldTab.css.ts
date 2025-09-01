// /components/features/advanced-analysis/PositionInfieldTab.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xl,
})

export const sectionTitle = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: 600,
  color: vars.colors.textPrimary,
  marginBottom: vars.space.md,
})

export const loadingContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  color: vars.colors.textSecondary,
})
