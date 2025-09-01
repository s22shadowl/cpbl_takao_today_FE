// /components/features/charts/PositionCalendarChart.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const container = style({
  position: 'relative',
  padding: `0 ${vars.space.md}`,
  backgroundColor: vars.colors.surface,
  borderRadius: '8px',
  border: `1px solid ${vars.colors.border}`,
})

export const calendarHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: `${vars.space.lg} 0 ${vars.space.md}`,
})

export const monthTitle = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: 500,
  color: vars.colors.textPrimary,
  margin: `0 ${vars.space.xl}`,
  minWidth: '140px',
  textAlign: 'center',
})

export const weekHeader = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  width: '100%',
  textAlign: 'center',
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  padding: `${vars.space.sm} 0`,
  borderBottom: `1px solid ${vars.colors.border}`,
})

export const calendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  backgroundColor: vars.colors.border,
})

export const cell = style({
  position: 'relative',
  padding: vars.space.xs,
  aspectRatio: '1 / 1',
  backgroundColor: vars.colors.surface,
  color: vars.colors.textPrimary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.xs,
})

export const dateNumber = style({
  fontSize: vars.fontSizes.xs,
  color: vars.colors.textSecondary,
})

export const starterPlayer = style({
  fontSize: vars.fontSizes.base,
  fontWeight: 500,
  color: vars.colors.textPrimary,
})

export const otherMonthCell = style({
  color: vars.colors.textSecondary,
  backgroundColor: vars.colors.background,
  cursor: 'default',
})

export const navButton = style({
  backgroundColor: 'transparent',
  border: 'none',
  padding: vars.space.sm,
  cursor: 'pointer',
  color: vars.colors.textSecondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  transition: 'background-color 0.2s, color 0.2s',
  ':hover': {
    backgroundColor: vars.colors.background,
    color: vars.colors.textPrimary,
  },
})
