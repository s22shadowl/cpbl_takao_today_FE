// /app/season-trends/page.css.ts

import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
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
  transition: 'opacity 0.2s ease-in-out',
})

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
})

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
      alignItems: 'stretch',
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
  flexWrap: 'wrap',
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
