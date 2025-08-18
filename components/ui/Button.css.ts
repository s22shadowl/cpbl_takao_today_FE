// components/ui/Button.css.ts

import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@/styles/theme.css'

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
    fontFamily: vars.fontFamily.body,
    border: '1px solid transparent',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.surface,
        ':hover': {
          // 為了提供視覺回饋，此處可以添加 hover 樣式，但暫時保留與原碼一致
        },
      },
      secondary: {
        backgroundColor: vars.colors.surface,
        color: vars.colors.textPrimary,
        borderColor: vars.colors.border,
      },
      destructive: {
        backgroundColor: vars.colors.error,
        color: vars.colors.surface,
      },
    },
    size: {
      default: {
        padding: `${vars.space.sm} ${vars.space.md}`,
        fontSize: vars.fontSizes.base,
      },
      sm: {
        padding: `${vars.space.xs} ${vars.space.sm}`,
        fontSize: vars.fontSizes.sm,
      },
      lg: {
        padding: `${vars.space.md} ${vars.space.lg}`,
        fontSize: vars.fontSizes.lg,
      },
    },
  },

  // 預設變體
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})
