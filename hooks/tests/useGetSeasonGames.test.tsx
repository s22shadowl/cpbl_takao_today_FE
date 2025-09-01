// hooks/tests/useGetSeasonGames.test.tsx

import { type ReactNode } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetSeasonGames } from '../useGetSeasonGames'

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

describe('useGetSeasonGames', () => {
  let queryClient: QueryClient
  const currentYear = new Date().getFullYear()

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  it('should call api with default params and return data', async () => {
    const mockData = [{ game_id: '1' }]
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetSeasonGames(), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith('/games/season', {
      params: { year: currentYear, completed_only: 'false' },
    })
    expect(result.current.data).toEqual(mockData)
  })

  it('should call api with custom params', async () => {
    const mockData = [{ game_id: '2' }]
    vi.mocked(apiClient.get).mockResolvedValue(mockData)
    const year = 2023
    const completed_only = true

    const { result } = renderHook(() => useGetSeasonGames({ year, completed_only }), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith('/games/season', {
      params: { year, completed_only: 'true' },
    })
    expect(result.current.data).toEqual(mockData)
  })

  it('should return an error state when api call fails', async () => {
    const mockError = new Error('API Error')
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetSeasonGames(), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('API Error')
  })

  it('should not trigger query if enabled is false', () => {
    renderHook(() => useGetSeasonGames({ enabled: false }), {
      wrapper: createWrapper(queryClient),
    })

    expect(apiClient.get).not.toHaveBeenCalled()
  })
})
