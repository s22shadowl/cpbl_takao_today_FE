// /components/features/ThemeSwitcher.tsx

'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { Sun, Moon } from '@/components/ui/Icons'
import * as styles from './ThemeSwitcher.css'
export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={styles.button}
      aria-label={`切換至 ${theme === 'light' ? '深色' : '淺色'} 模式`}
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  )
}
