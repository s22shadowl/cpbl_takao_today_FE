// hooks/tests/useGetPlayersSeasonStats.test.tsx

import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetPlayersSeasonStats } from '../useGetPlayersSeasonStats'
import { type ReactNode } from 'react'

// Mock 整個 apiClient 模組
vi.mock('@/lib/apiClient')

// 建立一個 QueryClient 實例，用於測試
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // 將 retry 設定為 false，避免在測試中因重試而等待過久
        retry: false,
      },
    },
  })

// 建立一個包裹元件，提供 QueryClientProvider
const createWrapper = (client: QueryClient) => {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
}

describe('useGetPlayersSeasonStats', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    // 在每個測試開始前，建立新的 QueryClient 並清除 mock
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  // 測試案例 1: 成功獲取資料
  it('should call apiClient.get with correct parameters and return data on success', async () => {
    const mockData = [{ player_name: 'Player A', stats: { H: 10 } }]
    const playerNames = ['Player A']
    const dateRange = {
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31'),
    }

    // 將 apiClient.get mock 為一個解析 mockData 的函式
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetPlayersSeasonStats({ playerNames, dateRange }), {
      wrapper: createWrapper(queryClient),
    })

    // 等待 Hook 的 isSuccess 狀態變為 true
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // 驗證 apiClient.get 是否被正確的參數呼叫
    expect(apiClient.get).toHaveBeenCalledTimes(1)
    expect(apiClient.get).toHaveBeenCalledWith('/players/stats/history', {
      params: {
        player_name: ['Player A'],
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
    })

    // 驗證 Hook 回傳的資料
    expect(result.current.data).toEqual(mockData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  // 測試案例 2: API 呼叫失敗
  it('should return an error state when the api call fails', async () => {
    const mockError = new Error('Network Error')
    const playerNames = ['Player B']
    const dateRange = { start: null, end: null }

    // 將 apiClient.get mock 為一個拋出錯誤的函式
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetPlayersSeasonStats({ playerNames, dateRange }), {
      wrapper: createWrapper(queryClient),
    })

    // 等待 isError 狀態變為 true
    await waitFor(() => expect(result.current.isError).toBe(true))

    // 驗證 Hook 回傳的狀態
    expect(result.current.error).toBe(mockError)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  // 測試案例 3: 當 playerNames 為空陣列時，不應觸發查詢
  it('should not trigger the query if playerNames is empty', () => {
    const playerNames: string[] = []
    const dateRange = {
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31'),
    }

    renderHook(() => useGetPlayersSeasonStats({ playerNames, dateRange }), {
      wrapper: createWrapper(queryClient),
    })

    // 驗證 apiClient.get 完全沒有被呼叫
    expect(apiClient.get).not.toHaveBeenCalled()
  })

  // 測試案例 4: 測試日期格式化 (null 的情況)
  it('should pass null for dates when dateRange values are null', async () => {
    const playerNames = ['Player C']
    const dateRange = { start: null, end: null }

    vi.mocked(apiClient.get).mockResolvedValue([])

    const { result } = renderHook(() => useGetPlayersSeasonStats({ playerNames, dateRange }), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // 驗證 apiClient.get 的參數中，日期為 null
    expect(apiClient.get).toHaveBeenCalledWith('/players/stats/history', {
      params: {
        player_name: ['Player C'],
        start_date: null,
        end_date: null,
      },
    })
  })
})
