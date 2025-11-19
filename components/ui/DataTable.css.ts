// /components/ui/DataTable.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const tableContainer = style({
  width: '100%',
  overflowX: 'auto',
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '8px',
  backgroundColor: vars.colors.surface,
})

export const table = style({
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontFamily: vars.fontFamily.body,
  tableLayout: 'auto',
  '@media': {
    'screen and (min-width: 768px)': {
      width: '100%',
      tableLayout: 'fixed',
    },
  },
})

export const thead = style({
  backgroundColor: vars.colors.background,
  borderBottom: `2px solid ${vars.colors.border}`,
})

export const th = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontWeight: 600,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',
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
  transition: 'background-color 0.15s ease-in-out',
})

export const td = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontSize: vars.fontSizes.base,
  color: vars.colors.textPrimary,
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
})

export const sortIcon = style({
  marginLeft: vars.space.xs,
  fontSize: '0.8em',
  display: 'inline-block',
  width: '1em', // 確保未顯示圖示時也能佔據相同寬度，避免排版跳動
})
