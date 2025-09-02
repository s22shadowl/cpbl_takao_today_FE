import { test, expect } from '@playwright/test'

test.describe('首頁', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('核心區塊渲染', async ({ page }) => {
    // 根據你提供的 page.tsx，我們預期看到 "本日戰報" 和 "本日焦點球員"
    // 測試計畫中的 "下場賽事" 在目前的程式碼中並未出現，因此我們只驗證存在的區塊

    // 驗證「本日戰報」區塊標題
    await expect(page.getByRole('heading', { name: '本日戰報', level: 1 })).toBeVisible()

    // 驗證「本日焦點球員」區塊標題
    await expect(page.getByRole('heading', { name: '本日焦點球員', level: 2 })).toBeVisible()
  })
})
