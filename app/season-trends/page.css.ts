// /app/season-trends/page.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `${vars.space.lg} ${vars.space.md}`,
  fontFamily: vars.fontFamily.body,
})

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space.md,
  marginBottom: vars.space.xl,

  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch', // 讓內容撐滿寬度
    },
  },
})

export const title = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: 600,
  color: vars.colors.textPrimary,
  marginRight: 'auto',

  '@media': {
    'screen and (max-width: 768px)': {
      marginRight: 0,
      marginBottom: vars.space.md,
    },
  },
})

export const controlsContainer = style({
  display: 'flex',
  flexWrap: 'wrap', // 允許控制器換行
  gap: vars.space.md,
  alignItems: 'center',
})

export const contentContainer = style({
  display: 'grid',
  gap: vars.space.xl,
})

export const loadingOrErrorState = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  fontSize: vars.fontSizes.lg,
  color: vars.colors.textSecondary,
})

export const collapsibleTrigger = style({
  width: '100%',
  padding: `${vars.space.sm} ${vars.space.md}`,
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '6px',
  textAlign: 'left',
  fontWeight: 500,
  cursor: 'pointer',
  marginTop: vars.space.xl,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.background,
    },
  },
})

export const collapsibleContent = style({
  paddingTop: vars.space.md,
})
