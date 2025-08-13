// components/ui/Button.tsx

'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type RecipeVariants } from '@vanilla-extract/recipes'
import { button } from './Button.css'

// 從 recipe 中自動推斷出變體的類型
type ButtonVariants = RecipeVariants<typeof button>

// 使用 type 和交集類型 (&) 來組合 props
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    // 將 recipe 產生的 class 與外部傳入的 className 結合
    const finalClassName = `${button({ variant, size })} ${className || ''}`.trim()

    return <Comp className={finalClassName} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button }
