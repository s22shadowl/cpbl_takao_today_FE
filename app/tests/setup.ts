import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
// 擴充 vitest 的 expect，使其支援 jest-dom 的語意化斷言
import '@testing-library/jest-dom/vitest'

// 將全域的 fetch 函式替換為一個 mock function。
// 這樣 apiClient 中對 fetch 的呼叫就會被我們攔截，而不會發出真正的網路請求。
vi.spyOn(global, 'fetch')

// 在每個測試案例結束後，自動執行以下清理動作
afterEach(() => {
  // 清理 @testing-library/react 產生的 DOM 結構
  cleanup()
  // 重置所有 mock 的呼叫紀錄，確保測試案例之間的獨立性
  vi.clearAllMocks()
})
