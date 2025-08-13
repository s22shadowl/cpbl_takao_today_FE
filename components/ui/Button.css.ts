// components/ui/Button.css.ts

import { recipe } from '@vanilla-extract/recipes'

export const button = recipe({
  base: {
    // 基本樣式，所有變體共用
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },

  variants: {
    variant: {
      primary: { backgroundColor: 'blue', color: 'white' },
      secondary: { backgroundColor: 'gray', color: 'black' },
      destructive: { backgroundColor: 'red', color: 'white' },
    },
    size: {
      default: { padding: '10px 16px', fontSize: '16px' },
      sm: { padding: '8px 12px', fontSize: '14px' },
      lg: { padding: '12px 20px', fontSize: '18px' },
    },
  },

  // 預設變體
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})
