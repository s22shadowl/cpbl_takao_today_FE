// app/layout.css.ts

import { style } from '@vanilla-extract/css'
import { vars, breakpoints } from '@/styles/theme.css'

export const mainContainer = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: vars.space.lg, // 24px
  marginTop: vars.space.xl, // 新增：與 Navbar 的間距 (32px)
  paddingBottom: vars.space.xxl, // 新增：與 Footer 的間距 (48px)
  '@media': {
    [breakpoints.mobile]: {
      padding: vars.space.md, // 修改：行動裝置的 padding (16px)
    },
  },
})
