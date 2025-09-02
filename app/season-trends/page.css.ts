// /app/season-trends/page.css.ts

import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: vars.space.lg,
  paddingTop: `calc(60px + ${vars.space.lg})`, // 為 fixed Navbar 增加頂部間距
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: vars.space.lg,
  flexWrap: 'wrap',
  gap: vars.space.md,
})

export const title = style({
  fontSize: vars.fontSizes.xxl,
  fontWeight: 700,
})

export const controlsContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
})

export const playerSelect = style({
  padding: '8px',
  borderRadius: '6px',
  border: `1px solid ${vars.colors.border}`,
  backgroundColor: vars.colors.surface,
})

export const loadingOrErrorState = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  fontSize: vars.fontSizes.lg,
  color: vars.colors.textSecondary,
})

export const dataDisplayContainer = style({
  position: 'relative',
})

export const loadingOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  borderRadius: '8px',
})

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
})

// 使用 Flexbox 替代 Grid 以解決跑版問題
export const contentGrid = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space.lg,
  alignItems: 'flex-start',
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
})

// 保留 sticky 定位，並設定固定寬度
export const calendarContainer = style({
  flex: '0 0 300px', // 設定固定寬度且不縮放
  position: 'sticky',
  top: `calc(60px + ${vars.space.lg})`, // sticky 的 top 值也要加上 Navbar 高度
  '@media': {
    'screen and (max-width: 1024px)': {
      flex: '1 1 100%',
      width: '100%',
      position: 'static', // 在移動端取消 sticky
    },
  },
})

// 設定為可伸縮以填滿剩餘空間
export const mainContentContainer = style({
  flex: '1 1 0',
  minWidth: 0, // 防止內容溢出
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
})

export const collapsibleTrigger = style({
  width: '100%',
  padding: vars.space.sm,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '6px',
  backgroundColor: vars.colors.surface,
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: vars.space.md,
  ':hover': {
    backgroundColor: vars.colors.background,
  },
})

export const collapsibleContent = style({
  paddingTop: vars.space.md,
})
