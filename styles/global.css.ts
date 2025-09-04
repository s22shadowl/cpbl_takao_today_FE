import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

// 設定基礎文字顏色，確保亮色與暗色模式都能正確應用
globalStyle('body', {
  color: vars.colors.textPrimary,
  backgroundColor: vars.colors.background,
})

globalStyle('button, select', {
  color: vars.colors.textPrimary,
})

globalStyle('html, body', {
  height: '100%',
  margin: 0,
  padding: 0,
})

// 全域設定 box-sizing
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  display: 'flex',
  flexDirection: 'column',
})
