// app/page.css.ts

import { style } from '@vanilla-extract/css'

export const section = style({
  // Equivalent to space-y-8, applied to each Card
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '2rem',
    },
  },
})
