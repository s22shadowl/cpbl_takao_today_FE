import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const mainContainer = style({
  maxWidth: '1280px',
  margin: '0 auto',
  padding: vars.space.lg, // 24px
})
