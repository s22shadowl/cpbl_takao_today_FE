// components/ui/Card.tsx

import React from 'react'
import * as styles from './card.css'

type CardProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={`${styles.card} ${className || ''}`} {...props}>
      {children}
    </div>
  )
}
