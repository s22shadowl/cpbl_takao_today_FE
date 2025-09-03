import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

// 設定基礎文字顏色，確保亮色與暗色模式都能正確應用
globalStyle('body', {
  color: vars.colors.textPrimary,
  backgroundColor: vars.colors.background,
})
