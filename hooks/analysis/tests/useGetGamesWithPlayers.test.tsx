// hooks/analysis/tests/useGetGamesWithPlayers.test.tsx

import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetGamesWithPlayers } from '../useGetGamesWithPlayers'
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

describe('useGetGamesWithPlayers', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  it('should call api with correct players and return data', async () => {
    const mockData = [{ game_id: '1', players: ['Player A', 'Player B'] }]
    const playerNames = ['Player A', 'Player B']
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetGamesWithPlayers(playerNames), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith('/analysis/games-with-players', {
      params: { players: playerNames },
    })
    expect(result.current.data).toEqual(mockData)
  })

  it('should return an error state when api call fails', async () => {
    const mockError = new Error('API Error')
    const playerNames = ['Player A']
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetGamesWithPlayers(playerNames), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBe(mockError)
  })

  it('should not trigger query if playerNames is empty', () => {
    renderHook(() => useGetGamesWithPlayers([]), {
      wrapper: createWrapper(queryClient),
    })

    expect(apiClient.get).not.toHaveBeenCalled()
  })
})
