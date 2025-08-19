// /components/features/CumulativeStatsTable.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const tableContainer = style({
  overflowX: 'auto',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '8px',
  backgroundColor: vars.colors.surface,
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontFamily: vars.fontFamily.body,
})

export const thead = style({
  backgroundColor: vars.colors.background,
  borderBottom: `1px solid ${vars.colors.border}`,
})

export const th = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontWeight: 500,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
})

export const tbody = style({})

export const tr = style({
  borderBottom: `1px solid ${vars.colors.border}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
    '&:hover': {
      backgroundColor: vars.colors.background,
    },
  },
  transition: 'background-color 0.2s ease-in-out',
})

export const td = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontSize: vars.fontSizes.base,
  color: vars.colors.textPrimary,
  verticalAlign: 'middle',
})

export const playerName = style({
  fontWeight: 500,
})
