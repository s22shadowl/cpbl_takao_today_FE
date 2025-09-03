// app/page.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const section = style({
  marginBottom: vars.space.xl, // 修改：統一所有卡片的下間距 (32px)
})

export const pageTitle = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: 'bold',
  marginBottom: vars.space.lg,
})
