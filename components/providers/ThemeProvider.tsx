// /components/providers/ThemeProvider.tsx

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { lightTheme, darkTheme } from '@/styles/theme.css'

// 建立 Context 所需的類型定義
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// 建立 Context，並提供一個預設值
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 建立 Provider 元件
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light') // 預設為淺色主題

  // Effect 1: 元件首次掛載時，從 localStorage 讀取儲存的主題
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  // Effect 2: 當 theme 狀態改變時，更新 body 的 class 和 localStorage
  useEffect(() => {
    document.body.classList.remove(lightTheme, darkTheme)
    document.body.classList.add(theme === 'light' ? lightTheme : darkTheme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

// 建立一個自定義 Hook，方便子元件取用 context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
