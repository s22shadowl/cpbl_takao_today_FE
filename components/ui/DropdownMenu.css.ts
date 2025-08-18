// components/ui/DropdownMenu.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const dropdownContent = style({
  minWidth: '220px',
  backgroundColor: vars.colors.surface,
  borderRadius: '6px',
  padding: vars.space.xs,
  border: `1px solid ${vars.colors.border}`,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

export const dropdownItem = style({
  fontSize: vars.fontSizes.sm,
  lineHeight: 1,
  color: vars.colors.textPrimary,
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  height: '25px',
  padding: `0 ${vars.space.xs}`,
  position: 'relative',
  userSelect: 'none',
  outline: 'none',
  fontFamily: vars.fontFamily.body,

  ':hover': {
    backgroundColor: vars.colors.background,
  },
})
