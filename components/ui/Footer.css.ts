// components/ui/Footer.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const footerContainer = style({
  backgroundColor: vars.colors.background,
  padding: `${vars.space.lg} 0`,
  textAlign: 'center',
  borderTop: `1px solid ${vars.colors.border}`,
  color: vars.colors.textSecondary,
  fontSize: vars.fontSizes.sm,
  fontFamily: vars.fontFamily.body,
})
