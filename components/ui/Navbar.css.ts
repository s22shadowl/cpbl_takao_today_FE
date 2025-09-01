// /components/ui/Navbar.css.ts

import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

const baseContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${vars.space.md}`,
  backgroundColor: vars.colors.surface,
  borderBottom: `1px solid ${vars.colors.border}`,
  zIndex: vars.zIndices.navbar,
})

export const navContainer = style([baseContainer])

export const titleLink = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: 700,
  color: vars.colors.textPrimary,
  textDecoration: 'none',
})

export const menuButton = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: vars.space.xs,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.colors.textPrimary,
})

const baseDropdown = style({
  position: 'absolute',
  top: '60px', // Navbar height
  left: 0,
  right: 0,
  backgroundColor: vars.colors.surface,
  borderBottom: `1px solid ${vars.colors.border}`,
  padding: `${vars.space.sm} 0`,
  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
  zIndex: vars.zIndices.dropdown,
})

export const dropdownMenu = styleVariants({
  open: [
    baseDropdown,
    {
      transform: 'translateY(0)',
      opacity: 1,
      visibility: 'visible',
    },
  ],
  closed: [
    baseDropdown,
    {
      transform: 'translateY(-10px)',
      opacity: 0,
      visibility: 'hidden',
    },
  ],
})

export const menuList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

export const menuLink = style({
  display: 'block',
  padding: `${vars.space.md} ${vars.space.lg}`,
  color: vars.colors.textPrimary,
  textDecoration: 'none',
  fontSize: vars.fontSizes.base,
  transition: 'background-color 0.2s ease',
  ':hover': {
    backgroundColor: vars.colors.background,
  },
})

const baseBackdrop = style({
  position: 'fixed',
  top: '60px', // Start below the navbar
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: vars.zIndices.backdrop,
  transition: 'opacity 0.3s ease-in-out',
})

export const backdrop = styleVariants({
  open: [
    baseBackdrop,
    {
      opacity: 1,
      visibility: 'visible',
    },
  ],
  closed: [
    baseBackdrop,
    {
      opacity: 0,
      visibility: 'hidden',
    },
  ],
})
