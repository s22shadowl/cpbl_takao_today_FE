import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: vars.space.lg,
  paddingTop: vars.space.lg,
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
  color: vars.colors.textPrimary,
})

export const controlsContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
})

// --- Radix Select 相關樣式 ---

export const selectTrigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '180px',
  borderRadius: '6px',
  padding: `0 ${vars.space.md}`,
  height: '36px',
  fontSize: vars.fontSizes.base,
  gap: vars.space.sm,
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  color: vars.colors.textPrimary,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.colors.background,
  },
  ':focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${vars.colors.primary}`,
  },
  selectors: {
    '&[data-placeholder]': {
      color: vars.colors.textSecondary,
    },
  },
})

export const selectIcon = style({
  color: vars.colors.textSecondary,
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

export const selectContent = style({
  zIndex: vars.zIndices.dropdown,
  minWidth: 'var(--radix-select-trigger-width)',
  overflow: 'hidden',
  backgroundColor: vars.colors.surface,
  borderRadius: '6px',
  border: `1px solid ${vars.colors.border}`,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  selectors: {
    '&[data-state="open"]': {
      animationName: slideDownAndFade,
    },
    '&[data-state="closed"]': {
      animationName: slideUpAndFade,
    },
  },
})

export const selectViewport = style({
  padding: vars.space.sm,
})

export const selectItem = style({
  fontSize: vars.fontSizes.base,
  lineHeight: 1,
  color: vars.colors.textPrimary,
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // 修改：讓文字和打勾分開
  height: '25px',
  padding: `0 ${vars.space.sm}`, // 修改：調整 padding
  position: 'relative',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
  selectors: {
    '&[data-disabled]': {
      color: vars.colors.textSecondary,
      pointerEvents: 'none',
    },
    '&[data-highlighted]': {
      // 修改：使用主題變數來反轉顏色
      backgroundColor: vars.colors.textPrimary,
      color: vars.colors.surface,
    },
  },
})

export const selectItemIndicator = style({
  // 移除絕對定位，讓它成為 flex item
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

export const calendarContainer = style({
  flex: '0 0 300px',
  position: 'sticky',
  top: `calc(60px + ${vars.space.lg})`,
  '@media': {
    'screen and (max-width: 1024px)': {
      flex: '1 1 100%',
      width: '100%',
      position: 'static',
    },
  },
})

export const mainContentContainer = style({
  flex: '1 1 0',
  minWidth: 0,
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
  color: vars.colors.textPrimary,
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: vars.space.md,
  ':hover': {
    backgroundColor: vars.colors.background,
  },
})

export const collapsibleWrapper = style({
  // overflow: 'hidden', // This was preventing the DataTable's scrollbar
})

export const collapsibleContent = style({
  paddingTop: vars.space.md,
  maxWidth: '100%',
})

export const paginatorContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.md,
  marginBottom: vars.space.md,
})

export const paginatorMonth = style({
  minWidth: '100px',
  textAlign: 'center',
  fontWeight: 600,
  color: vars.colors.textPrimary,
})

export const desktopControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.md,
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'none',
    },
  },
})

export const mobileControls = style({
  display: 'none',
  position: 'relative',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'block',
    },
  },
})

export const mobileMenuTrigger = style({
  position: 'absolute',
  top: '-1rem',
  right: '0rem',
})

export const dropdownContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  padding: vars.space.md,
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.space.sm,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
})
