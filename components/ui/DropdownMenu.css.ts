// components/ui/DropdownMenu.css.ts

import { style } from '@vanilla-extract/css'

export const dropdownContent = style({
  minWidth: '220px',
  backgroundColor: 'white',
  borderRadius: '6px',
  padding: '5px',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

export const dropdownItem = style({
  fontSize: '14px',
  lineHeight: 1,
  color: 'black',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  height: '25px',
  padding: '0 5px',
  position: 'relative',
  userSelect: 'none',
  outline: 'none',

  ':hover': {
    backgroundColor: 'lightblue',
  },
})
