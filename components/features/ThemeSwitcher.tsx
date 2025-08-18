// /components/features/ThemeSwitcher.tsx

'use client'

import { useTheme } from '@/components/providers/ThemeProvider'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        // 這裡只是一個簡單的範例樣式
        padding: '8px 16px',
        border: '1px solid gray',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      切換至 {theme === 'light' ? '深色' : '淺色'} 模式
    </button>
  )
}
