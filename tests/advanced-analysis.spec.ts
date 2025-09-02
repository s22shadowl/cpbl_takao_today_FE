import { test, expect } from '@playwright/test'

const analysisTabs = [
  { value: 'homerun-tracking', title: '百轟倒數' },
  { value: 'position-infield', title: '二壘大風吹' },
  { value: 'bases-loaded', title: '滿壘大王' },
  { value: 'scoring-position', title: '得點圈之鬼' },
  { value: 'ibb-impact', title: 'IBB大哥' },
  { value: 'npb-streaks', title: '日職三連星' },
  { value: 'raccoon-trio', title: '浣熊三兄弟' },
]

test.describe('進階數據分析頁', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/advanced-analysis')
  })

  test('分頁切換', async ({ page }) => {
    // 驗證預設第一個分頁是選中狀態
    await expect(
      page.getByRole('tab', { name: analysisTabs[0].title, selected: true })
    ).toBeVisible()

    // 依序點擊所有可用的分頁，並驗證狀態
    // 我們從第二個 tab 開始，因為第一個是預設選中的
    for (let i = 1; i < analysisTabs.length; i++) {
      const tab = analysisTabs[i]

      // 點擊分頁
      await page.getByRole('tab', { name: tab.title }).click()

      // 驗證被點擊的分頁是否處於 selected 狀態
      // 這是驗證分頁切換最直接且可靠的方式
      await expect(page.getByRole('tab', { name: tab.title, selected: true })).toBeVisible()

      // 同時，也驗證對應的 tab panel 是可見的
      // 這確保了內容區塊有跟著切換
      await expect(page.getByRole('tabpanel')).toBeVisible()
    }
  })
})
