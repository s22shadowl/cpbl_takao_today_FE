// hooks/analysis/tests/useGetIbbImpact.test.tsx

import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetIbbImpact } from '../useGetIbbImpact'
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

describe('useGetIbbImpact', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  it('should call api with correct player name and return data', async () => {
    const mockData = [{ runs_scored: 2 }]
    const playerName = 'Player X'
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetIbbImpact(playerName), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith(`/analysis/players/${playerName}/ibb-impact`)
    expect(result.current.data).toEqual(mockData)
  })

  it('should return an error state when api call fails', async () => {
    const mockError = new Error('API Error')
    const playerName = 'Player X'
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetIbbImpact(playerName), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBe(mockError)
  })

  it('should not trigger query if playerName is empty', () => {
    renderHook(() => useGetIbbImpact(''), {
      wrapper: createWrapper(queryClient),
    })

    expect(apiClient.get).not.toHaveBeenCalled()
  })
})
