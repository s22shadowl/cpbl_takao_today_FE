// components/features/charts/EventCalendarChart.css.ts

import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'
import { transparentize } from 'polished'

/**
 * 元件最外層的容器，用於定位導覽按鈕。
 */
export const container = style({
  position: 'relative',
  padding: `0 ${vars.space.xl}`,
  backgroundColor: vars.colors.surface,
  borderRadius: '8px',
  border: `1px solid ${vars.colors.border}`,
})

/**
 * 元件標頭，包含主標題與副標題。
 */
export const chartHeader = style({
  padding: `${vars.space.lg} ${vars.space.lg} 0`,
  textAlign: 'center',
})

export const title = style({
  fontSize: vars.fontSizes.xl,
  fontWeight: 600,
  color: vars.colors.textPrimary,
})

export const subtitle = style({
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  marginTop: vars.space.xs,
})

/**
 * 日曆的標頭，包含月份標題和週標題。
 */
export const calendarHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${vars.space.lg} 0 ${vars.space.md}`,
})

/**
 * 月份標題的樣式。
 */
export const monthTitle = style({
  fontSize: vars.fontSizes.lg,
  fontWeight: 500,
  color: vars.colors.textPrimary,
  marginBottom: vars.space.lg,
})

/**
 * 週標題的容器 (日、一...六)。
 */
export const weekHeader = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  width: '100%',
  textAlign: 'center',
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
  paddingBottom: vars.space.sm,
})

/**
 * 日曆網格的容器。
 */
export const calendarGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  backgroundColor: vars.colors.border,
  borderTop: `1px solid ${vars.colors.border}`,
  position: 'relative', // 用於定位分隔線
})

/**
 * 每一天格子的基本樣式。
 */
export const cell = style({
  position: 'relative',
  padding: vars.space.sm,
  aspectRatio: '1 / 1',
  backgroundColor: vars.colors.surface,
  color: vars.colors.textPrimary,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fontSize: vars.fontSizes.xs,
  transition: 'transform 0.1s ease-in-out',

  ':hover': {
    transform: 'scale(1.05)',
    zIndex: 2,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
})

/**
 * 非當前月份日期的格子樣式。
 */
export const otherMonthCell = style({
  color: vars.colors.textSecondary,
  backgroundColor: vars.colors.background,
  cursor: 'default',
  ':hover': {
    transform: 'none',
    boxShadow: 'none',
  },
})

/**
 * 無比賽日 (isGameDay: false): Default 狀態
 */
export const noGameDayCell = style({
  backgroundColor: vars.colors.background,
})

/**
 * 有比賽但未出賽 (isGameDay: true, hasAppearance: false)
 */
export const gameDayNoAppearanceCell = style({
  backgroundColor: transparentize(0.8, vars.colors.secondary),
})

/**
 * 有出賽 (hasAppearance: true)
 */
export const hasAppearanceCell = style({
  backgroundColor: vars.colors.secondary,
  color: vars.colors.textPrimary,
})

/**
 * 符合情境 (isHighlighted: true)
 */
export const highlightedCell = style({
  backgroundColor: vars.colors.primary,
  color: vars.colors.surface,
})

/**
 * Tooltip 容器的樣式。
 */
export const tooltip = style({
  position: 'absolute',
  bottom: '105%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: vars.colors.textPrimary,
  color: vars.colors.surface,
  padding: vars.space.sm,
  borderRadius: '4px',
  fontSize: vars.fontSizes.sm,
  whiteSpace: 'nowrap',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s, visibility 0.2s',
  zIndex: 10,

  selectors: {
    [`${cell}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
    },
  },
})

/**
 * 週分隔線的樣式。
 */
export const weekSeparator = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '1px',
  backgroundColor: vars.colors.border,
  zIndex: 1,
})

/**
 * 導覽按鈕的通用樣式。
 */
export const navButton = style({
  position: 'absolute',
  top: '50%',
  backgroundColor: vars.colors.surface,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 3,
  transition: 'background-color 0.2s, transform 0.2s',

  ':hover': {
    backgroundColor: vars.colors.background,
    transform: 'translateY(-50%) scale(1.1)',
  },
})

/**
 * 上個月按鈕的特定位置樣式。
 */
export const prevButton = style([
  navButton,
  {
    left: 0,
    transform: 'translate(-50%, -50%)',
  },
])

/**
 * 下個月按鈕的特定位置樣式。
 */
export const nextButton = style([
  navButton,
  {
    right: 0,
    transform: 'translate(50%, -50%)',
  },
])
