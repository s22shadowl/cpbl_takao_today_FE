// components/ui/Tabs.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const tabsRoot = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: vars.fontFamily.body,
})

export const tabsList = style({
  flexShrink: 0,
  display: 'flex',
  borderBottom: `1px solid ${vars.colors.border}`,
  overflowX: 'auto',

  // Hide scrollbar for Webkit browsers
  '::-webkit-scrollbar': {
    display: 'none',
  },
  // Hide scrollbar for Firefox
  scrollbarWidth: 'none',
})

export const tabsTrigger = style({
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: `${vars.space.sm} ${vars.space.md}`,
  height: '45px',
  flex: '0 0 auto', // Prevent shrinking, allow natural width
  whiteSpace: 'nowrap', // Prevent text wrapping
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: vars.fontSizes.base,
  lineHeight: 1,
  color: vars.colors.textSecondary,
  userSelect: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out, border-bottom 0.2s ease-in-out',
  borderBottom: '2px solid transparent',
  marginBottom: '-1px',

  ':hover': {
    color: vars.colors.textPrimary,
  },

  selectors: {
    '&[data-state="active"]': {
      color: vars.colors.primary,
      borderColor: vars.colors.primary,
      fontWeight: 500,
    },
  },
})

export const tabsContent = style({
  flexGrow: 1,
  padding: vars.space.lg,
  backgroundColor: vars.colors.surface,
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  outline: 'none',
})