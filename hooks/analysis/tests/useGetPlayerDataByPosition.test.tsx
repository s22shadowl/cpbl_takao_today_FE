// hooks/analysis/tests/useGetPlayerDataByPosition.test.tsx

import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetPlayerDataByPosition } from '../useGetPlayerDataByPosition'
import { type ReactNode } from 'react'

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

describe('useGetPlayerDataByPosition', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  it('should call api with correct year and position and return data', async () => {
    const mockData = { position: 'SS', top_players: [] }
    const year = 2024
    const position = 'SS'
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetPlayerDataByPosition(year, position), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith(`/analysis/positions/${year}/${position}`)
    expect(result.current.data).toEqual(mockData)
  })

  it('should return an error state when api call fails', async () => {
    const mockError = new Error('API Error')
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetPlayerDataByPosition(2024, 'SS'), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBe(mockError)
  })

  it('should not trigger query if position is empty', () => {
    renderHook(() => useGetPlayerDataByPosition(2024, ''), {
      wrapper: createWrapper(queryClient),
    })

    expect(apiClient.get).not.toHaveBeenCalled()
  })
})
