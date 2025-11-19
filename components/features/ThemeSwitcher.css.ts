// components/features/ThemeSwitcher.css.ts

import { vars } from '@/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const button = style({
  background: 'inherit',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: vars.colors.textNav,
})
