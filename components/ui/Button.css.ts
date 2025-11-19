// components/ui/Button.css.ts

import { recipe } from '@vanilla-extract/recipes'
import { vars } from '@/styles/theme.css'

export const button = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    fontFamily: vars.fontFamily.body,
    border: '1px solid transparent',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.surface,
        ':hover': {
          // Add a hover effect, e.g., slightly darken the color
        },
      },
      secondary: {
        backgroundColor: vars.colors.surface,
        color: vars.colors.textPrimary,
        borderColor: vars.colors.border,
        ':hover': {
          backgroundColor: vars.colors.background,
        },
      },
      destructive: {
        backgroundColor: vars.colors.error,
        color: vars.colors.surface,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: vars.colors.textPrimary,
        ':hover': {
          backgroundColor: vars.colors.background,
        },
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
      icon: {
        height: '2.5rem', // 40px
        width: '2.5rem', // 40px
        padding: 0,
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})