// /components/features/DateRangePicker.css.ts

import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const triggerButton = style({
  width: '240px',
  justifyContent: 'space-between',
  textAlign: 'left',
  fontWeight: 400,
})

export const calendarIcon = style({
  marginLeft: vars.space.sm,
  color: vars.colors.textSecondary,
})

// react-day-picker 的樣式覆蓋
export const dayPicker = style({
  backgroundColor: vars.colors.surface,
  padding: vars.space.md,
  borderRadius: '8px',
  border: `1px solid ${vars.colors.border}`,
})

globalStyle(`${dayPicker} .rdp-caption_label`, {
  fontFamily: vars.fontFamily.body,
  fontSize: vars.fontSizes.base,
  fontWeight: 500,
  color: vars.colors.textPrimary,
})

globalStyle(`${dayPicker} .rdp-nav_button`, {
  color: vars.colors.textPrimary,
})

globalStyle(`${dayPicker} .rdp-head_cell`, {
  fontFamily: vars.fontFamily.body,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
})

globalStyle(`${dayPicker} .rdp-day`, {
  fontFamily: vars.fontFamily.body,
  color: vars.colors.textPrimary,
  borderRadius: '6px',
})

globalStyle(`${dayPicker} .rdp-day_selected`, {
  backgroundColor: `${vars.colors.primary} !important`,
  color: `${vars.colors.surface} !important`,
})

globalStyle(`${dayPicker} .rdp-day_range_middle`, {
  backgroundColor: vars.colors.background,
  borderRadius: 0,
})
