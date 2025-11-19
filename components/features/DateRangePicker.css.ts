import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const triggerButton = style({
  width: '240px',
  justifyContent: 'space-between',
  textAlign: 'left',
  fontWeight: 400,
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      minWidth: '180px',
    },
  },
})

export const calendarIcon = style({
  marginLeft: vars.space.sm,
  color: vars.colors.textSecondary,
})

export const popoverContent = style({
  zIndex: 50,
  backgroundColor: vars.colors.surface,
  padding: vars.space.md,
  borderRadius: '8px',
  border: `1px solid ${vars.colors.border}`,
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  display: 'flex',
  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
    },
    'screen and (max-width: 767px)': {
      flexDirection: 'column',
    },
  },
})

export const presetsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '150px',
})

export const presetButton = style({
  justifyContent: 'flex-start',
  fontWeight: 400,
  width: '100%',
  backgroundColor: 'transparent',
  color: vars.colors.textSecondary,
  ':hover': {
    backgroundColor: vars.colors.background,
    color: vars.colors.textPrimary,
  },
})

export const separator = style({
  backgroundColor: vars.colors.border,
  '@media': {
    'screen and (min-width: 768px)': {
      width: '1px',
      height: 'auto',
      margin: `0 ${vars.space.md}`,
    },
    'screen and (max-width: 767px)': {
      width: '100%',
      height: '1px',
      margin: `${vars.space.md} 0`,
    },
  },
})

// react-day-picker 的樣式覆蓋 (更新選擇器)
globalStyle(`${popoverContent} .rdp-caption_label`, {
  fontFamily: vars.fontFamily.body,
  fontSize: vars.fontSizes.base,
  fontWeight: 500,
  color: vars.colors.textPrimary,
})

globalStyle(`${popoverContent} .rdp-nav_button`, {
  color: vars.colors.textPrimary,
})

globalStyle(`${popoverContent} .rdp-head_cell`, {
  fontFamily: vars.fontFamily.body,
  fontSize: vars.fontSizes.sm,
  color: vars.colors.textSecondary,
})

globalStyle(`${popoverContent} .rdp-day`, {
  fontFamily: vars.fontFamily.body,
  color: vars.colors.textPrimary,
  borderRadius: '6px',
})

globalStyle(`${popoverContent} .rdp-day_selected`, {
  backgroundColor: `${vars.colors.primary} !important`,
  color: `${vars.colors.surface} !important`,
})

globalStyle(`${popoverContent} .rdp-day_range_middle`, {
  backgroundColor: `${vars.colors.background} !important`,
  color: `${vars.colors.textPrimary} !important`,
  borderRadius: 0,
})
