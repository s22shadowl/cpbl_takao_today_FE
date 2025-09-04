// app/layout.css.ts

import { style } from '@vanilla-extract/css'
import { vars, breakpoints } from '@/styles/theme.css'

export const pageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

export const mainContainer = style({
  flex: '1 0 auto',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: vars.space.lg,
  paddingBottom: vars.space.md,
  width: '100%',
  '@media': {
    [breakpoints.mobile]: {
      padding: vars.space.md,
    },
  },
})
