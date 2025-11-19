import { style } from '@vanilla-extract/css'
import { vars, breakpoints } from '@/styles/theme.css'

export const navContainer = style({
  backgroundColor: vars.colors.primary,
  borderBottom: `3px solid ${vars.colors.secondary}`,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
})

export const navTextBlock = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.space.md} ${vars.space.lg}`, // 16px 24px
  maxWidth: '1200px',
  width: '100%',
})

export const titleBlock = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
})

export const titleLink = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: vars.colors.textNav,

  '@media': {
    [breakpoints.mobile]: {
      padding: `0`,
    },
  },
})

export const menuButton = style({
  display: 'none',
  '@media': {
    [breakpoints.mobile]: {
      display: 'block',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: vars.colors.textNav,
      zIndex: vars.zIndices.modal,
    },
  },
})

export const dropdownMenu = style({
  display: 'flex',
  alignItems: 'center',
  '@media': {
    [breakpoints.mobile]: {
      display: 'none',
      position: 'absolute',
      top: 'calc(100% + 3px)',
      left: 0,
      right: 0,
      backgroundColor: vars.colors.primary,
      padding: 0,
      zIndex: vars.zIndices.navbar,
      alignItems: 'stretch', // Reset for mobile layout
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
      padding: `${vars.space.md} ${vars.space.lg}`,
    },
  },
})

export const menuLink = style({
  textDecoration: 'none',
  fontSize: vars.fontSizes.lg,
  fontWeight: 'bold',
  color: vars.colors.textNav,
  transition: 'color 0.2s ease-in-out',
  ':hover': {
    color: vars.colors.secondary,
  },
  '@media': {
    [breakpoints.mobile]: {
      color: vars.colors.textNav,
    },
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
