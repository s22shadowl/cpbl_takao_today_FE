import { test, expect } from '@playwright/test'

test.describe('賽季趨勢頁', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/season-trends')
  })

  test('互動篩選功能', async ({ page }) => {
    // 1. 在互動前，先等待頁面的主要標題出現，確保頁面已載入
    await expect(page.getByRole('heading', { name: '賽季趨勢', level: 1 })).toBeVisible()

    // 2. 找到初始狀態的 DateRangePicker 按鈕
    const initialDatePickerButton = page.getByRole('button', { name: '最近 30 天' })
    await expect(initialDatePickerButton).toBeVisible()

    // 3. 選擇一個新的日期區間
    // 點擊按鈕打開日曆
    await initialDatePickerButton.click()
    // 點擊起始日期 10 號
    await page.getByRole('gridcell', { name: '10' }).first().click()

    // 日曆關閉後，按鈕文字已更新。我們需要用新的定位器重新尋找它
    // 新的按鈕文字會包含 "~"，例如 "2025-08-10 ~ 2025-08-10"
    const updatedDatePickerButton = page.getByRole('button', { name: /~/ })
    await updatedDatePickerButton.click()

    // 點擊結束日期 20 號
    await page.getByRole('gridcell', { name: '20' }).first().click()

    // 4. 驗證圖表與表格是否已更新
    const loadingSpinner = page.getByTestId('loading-spinner')

    // 期望讀取動畫最終會消失，表示資料已載入完成
    await expect(loadingSpinner).toBeHidden({ timeout: 10000 })
  })
})
