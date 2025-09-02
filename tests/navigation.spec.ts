import { test, expect } from '@playwright/test'

test.describe('通用導覽流程', () => {
  test.beforeEach(async ({ page }) => {
    // 在每個測試前，都先造訪首頁
    await page.goto('/')
  })

  test('漢堡選單導覽', async ({ page }) => {
    // 1. 從首頁開始，點擊漢堡選單圖示
    // 使用 aria-label 來定位，這是最穩定的方式
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click()

    // 2. 驗證選單是否可見
    // 透過檢查其中一個連結是否可見來確認選單已開啟
    await expect(page.getByRole('link', { name: '賽季趨勢' })).toBeVisible()

    // 3. 點擊「賽季趨勢」連結
    await page.getByRole('link', { name: '賽季趨勢' }).click()

    // 4. 驗證 URL 與 h1 標題是否已正確更新
    await expect(page).toHaveURL('/season-trends')
    await expect(page.getByRole('heading', { name: '賽季趨勢', level: 1 })).toBeVisible()

    // 5. 再次點擊漢堡選單圖示，準備導覽至下一個頁面
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click()
    await expect(page.getByRole('link', { name: '進階數據分析' })).toBeVisible()

    // 6. 點擊「進階數據分析」連結
    await page.getByRole('link', { name: '進階數據分析' }).click()

    // 7. 驗證 URL 與 h1 標題是否已正確更新
    await expect(page).toHaveURL('/advanced-analysis')
    await expect(page.getByRole('heading', { name: '進階數據分析', level: 1 })).toBeVisible()
  })
})
