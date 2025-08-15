// components/ui/Tabs.css.ts

import { style } from '@vanilla-extract/css'

export const tabsRoot = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

export const tabsList = style({
  flexShrink: 0,
  display: 'flex',
  borderBottom: '1px solid #e2e8f0', // gray-200
})

export const tabsTrigger = style({
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '8px 16px',
  height: '45px',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  lineHeight: 1,
  color: '#475569', // slate-600
  userSelect: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out, border-bottom 0.2s ease-in-out',
  borderBottom: '2px solid transparent',
  marginBottom: '-1px', // 讓底線與 List 的 border 重疊

  ':hover': {
    color: '#0f172a', // slate-900
  },

  selectors: {
    '&[data-state="active"]': {
      color: '#2563eb', // blue-600
      borderColor: '#2563eb', // blue-600
      fontWeight: 500,
    },
  },
})

export const tabsContent = style({
  flexGrow: 1,
  padding: '20px',
  backgroundColor: 'white',
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  outline: 'none',
})
