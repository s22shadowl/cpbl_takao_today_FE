// hooks/tests/useGetTodayDashboard.test.tsx

import { type ReactNode } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetTodayDashboard } from '../useGetGamesToday'
import type { DashboardResponse } from '../useGetGamesToday'

vi.mock('@/lib/apiClient')

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

const createWrapper = (client: QueryClient) => {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
}

describe('useGetTodayDashboard', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  it('should return data on successful api call', async () => {
    const mockData: DashboardResponse = { status: 'HAS_TODAY_GAMES', games: [] }
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetTodayDashboard(), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith('dashboard/today')
    expect(result.current.data).toEqual(mockData)
  })

  it('should return an error state when api call fails', async () => {
    const mockError = new Error('API Error')
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetTodayDashboard(), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBe(mockError)
  })
})
