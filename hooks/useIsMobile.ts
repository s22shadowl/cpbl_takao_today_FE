// /hooks/useIsMobile.ts

'use client'

import { useState, useEffect } from 'react'

/**
 * 一個 SSR-safe 的 Hook，用於偵測當前視窗寬度是否小於指定的斷點。
 * @param breakpoint - 斷點值，預設為 768px。
 * @returns boolean - 如果當前寬度小於斷點，則回傳 true。
 */
export const useIsMobile = (breakpoint = 768): boolean => {
  // 預設為 false 以避免 SSR 與客戶端渲染不匹配的問題
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // useEffect 只在客戶端執行，因此可以安全地存取 window 物件
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkScreenSize() // 在元件掛載後立即執行一次檢查
    window.addEventListener('resize', checkScreenSize)

    // 在元件卸載時清除事件監聽器
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [breakpoint])

  return isMobile
}
