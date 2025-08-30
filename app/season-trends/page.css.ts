// /app/season-trends/page.css.ts

import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: vars.space.lg,
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: vars.space.lg,
})

export const title = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: 700,
})

export const controlsContainer = style({
  display: 'flex',
  gap: vars.space.md,
})

export const playerSelect = style({
  padding: '8px',
  borderRadius: '6px',
  border: `1px solid ${vars.colors.border}`,
  backgroundColor: vars.colors.surface,
})

export const loadingOrErrorState = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  fontSize: vars.fontSizes.lg,
  color: vars.colors.textSecondary,
})

export const dataDisplayContainer = style({
  position: 'relative',
})

export const loadingOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  borderRadius: '8px',
})

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
})

export const contentGrid = style({
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: vars.space.lg,
  alignItems: 'flex-start',
})

export const calendarContainer = style({
  position: 'sticky',
  top: vars.space.lg,
})

export const mainContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
})

export const collapsibleTrigger = style({
  width: '100%',
  padding: vars.space.sm,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '6px',
  backgroundColor: vars.colors.surface,
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: vars.space.md,

  ':hover': {
    backgroundColor: vars.colors.background,
  },
})

export const collapsibleContent = style({
  paddingTop: vars.space.md,
})
