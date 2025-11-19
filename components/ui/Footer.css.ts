// components/ui/Footer.css.ts

import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const footerContainer = style({
  backgroundColor: vars.colors.background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: `1px solid ${vars.colors.border}`,
  color: vars.colors.textSecondary,
  fontSize: vars.fontSizes.sm,
  fontFamily: vars.fontFamily.body,
  padding: `${vars.space.sm} 0`,
})

globalStyle(`${footerContainer} p`, {
  margin: 0,
})
