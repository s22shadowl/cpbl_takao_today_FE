// components/ui/StatItem.tsx

import React from 'react'
import * as styles from './StatItem.css'

interface StatItemProps {
  label: string
  value: React.ReactNode
}

/**
 * 一個通用的 UI 元件，用於顯示一個標籤和其對應的數值。
 */
export const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <div className={styles.statItem}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  )
}
