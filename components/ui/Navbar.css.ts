// /components/ui/Navbar.css.ts

import { style } from '@vanilla-extract/css'
import { vars, breakpoints } from '@/styles/theme.css'

export const navContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space.md} ${vars.space.lg}`, // 16px 24px
  borderBottom: `1px solid ${vars.colors.border}`,
  position: 'relative',
  backgroundColor: vars.colors.surface,
})

export const titleLink = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: vars.colors.textPrimary,
})

export const menuButton = style({
  display: 'none',
  '@media': {
    [breakpoints.mobile]: {
      display: 'block',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: vars.colors.textPrimary,
      zIndex: vars.zIndices.modal,
    },
  },
})

export const dropdownMenu = style({
  display: 'flex',
  '@media': {
    [breakpoints.mobile]: {
      display: 'none',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: vars.colors.surface,
      padding: vars.space.md,
      zIndex: vars.zIndices.navbar,
    },
  },
  selectors: {
    '&[data-state="open"]': {
      display: 'block',
    },
  },
})

export const menuList = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.lg,
  listStyle: 'none',
  margin: 0,
  padding: 0,

  '@media': {
    [breakpoints.mobile]: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'flex-start',
      gap: vars.space.md,
    },
  },
})

export const menuLink = style({
  textDecoration: 'none',
  color: vars.colors.textSecondary,
  transition: 'color 0.2s ease-in-out',
  ':hover': {
    color: vars.colors.textPrimary,
  },
})

export const backdrop = style({
  display: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: vars.zIndices.backdrop,
  selectors: {
    '&[data-state="open"]': {
      display: 'block',
    },
  },
})
