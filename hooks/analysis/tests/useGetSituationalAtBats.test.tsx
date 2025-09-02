// hooks/analysis/tests/useGetSituationalAtBats.test.tsx

import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { useGetSituationalAtBats } from '../useGetSituationalAtBats'
import { type ReactNode } from 'react'
import type { components } from '@/types/generated-api'

type RunnersSituation = components['schemas']['RunnersSituation']

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

describe('useGetSituationalAtBats', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = createTestQueryClient()
    vi.clearAllMocks()
  })

  it('should call api with correct params and return data', async () => {
    const mockData = [{ description: 'Single to right' }]
    const playerName = 'Clutch'
    const situation: RunnersSituation = 'scoring_position'
    vi.mocked(apiClient.get).mockResolvedValue(mockData)

    const { result } = renderHook(() => useGetSituationalAtBats(playerName, situation), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(apiClient.get).toHaveBeenCalledWith(
      `/analysis/players/${playerName}/situational-at-bats`,
      { params: { situation } }
    )
    expect(result.current.data).toEqual(mockData)
  })

  it('should return an error state when api call fails', async () => {
    const mockError = new Error('API Error')
    vi.mocked(apiClient.get).mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetSituationalAtBats('Clutch', 'bases_loaded'), {
      wrapper: createWrapper(queryClient),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBe(mockError)
  })

  it('should not trigger query if playerName is empty', () => {
    renderHook(() => useGetSituationalAtBats('', 'bases_empty'), {
      wrapper: createWrapper(queryClient),
    })

    expect(apiClient.get).not.toHaveBeenCalled()
  })
})
