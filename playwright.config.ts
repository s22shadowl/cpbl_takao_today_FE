import { defineConfig, devices } from '@playwright/test'

/**
 * 參考: https://playwright.dev/docs/test-configuration
 */

// 從環境變數讀取 PORT，若無則預設為 3000
const PORT = process.env.PORT || 3000
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  // 測試檔案所在的目錄
  testDir: './tests',

  // 每個測試的最長執行時間 (30 秒)
  timeout: 30 * 1000,

  // expect 斷言的最長等待時間 (5 秒)
  expect: {
    timeout: 5000,
  },

  /* 是否要並行執行測試檔案 */
  fullyParallel: true,

  /* 如果在 CI 環境中意外留下了 test.only，則讓建置失敗 */
  forbidOnly: !!process.env.CI,

  /* CI 環境中，失敗的測試重試 2 次 */
  retries: process.env.CI ? 2 : 0,

  /* CI 環境中限制 worker 數量為 1，在本機則不限制 */
  workers: process.env.CI ? 1 : undefined,

  /* 測試報告格式。參考: https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* 所有專案共享的設定 */
  use: {
    /* 在 page.goto('/') 等操作中使用的基礎 URL */
    baseURL,

    /* 在第一次重試失敗的測試時，收集追蹤檔 */
    trace: 'on-first-retry',
  },

  /* 為主要瀏覽器設定專案 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* 在開始測試前，啟動本地開發伺服器 */
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
})
