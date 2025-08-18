// components/ui/Navbar.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const navContainer = style({
  backgroundColor: vars.colors.surface,
  padding: `${vars.space.md} ${vars.space.xl}`,
  borderBottom: `1px solid ${vars.colors.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
