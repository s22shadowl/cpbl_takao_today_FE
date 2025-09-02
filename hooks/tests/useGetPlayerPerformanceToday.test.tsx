// hooks/tests/useGetPlayerPerformanceToday.test.tsx

import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useGetPlayerPerformanceToday } from '../useGetPlayerPerformanceToday'
import { useGetTodayDashboard } from '../useGetGamesToday'
import type { Game, DashboardResponse, PlayerSummary } from '../useGetGamesToday'
import type { UseQueryResult } from '@tanstack/react-query'

// Mock the entire dependency hook
vi.mock('../useGetGamesToday', () => ({
  useGetTodayDashboard: vi.fn(),
}))

// 建立一個符合 PlayerSummary/PlayerGameSummary 完整型別的 mock 物件
const mockPlayer = (name: string): PlayerSummary => ({
  id: Math.random(),
  game_id: 1,
  player_name: name,
  team_name: 'Team',
  batting_order: '3',
  position: 'RF',
  plate_appearances: 4,
  at_bats: 4,
  runs_scored: 1,
  hits: 2,
  doubles: 0,
  triples: 0,
  homeruns: 1,
  rbi: 1,
  walks: 0,
  intentional_walks: 0,
  hit_by_pitch: 0,
  strikeouts: 1,
  stolen_bases: 0,
  caught_stealing: 0,
  sacrifice_hits: 0,
  sacrifice_flies: 0,
  gidp: 0,
  errors: 0,
  created_at: new Date().toISOString(),
  at_bat_details: [],
})

const mockGame = (players: PlayerSummary[]): Game => ({
  id: Math.random(),
  game_date: new Date().toISOString(),
  home_team: 'Home',
  away_team: 'Away',
  player_summaries: players,
})

// 建立一個符合 UseQueryResult 完整型別的基底 mock
const baseMockQueryResult: Partial<UseQueryResult> = {
  isPending: false,
  isLoadingError: false,
  isRefetchError: false,
  isPlaceholderData: false,
  isRefetching: false,
  isStale: false,
  status: 'success',
  fetchStatus: 'idle',
  refetch: vi.fn(),
}

describe('useGetPlayerPerformanceToday', () => {
  it('should return loading state from dependency hook', () => {
    vi.mocked(useGetTodayDashboard).mockReturnValue({
      ...baseMockQueryResult,
      data: undefined,
      isLoading: true,
      isPending: true,
      isError: false,
      error: null,
      isSuccess: false,
      status: 'pending',
    } as UseQueryResult<DashboardResponse, Error>)

    const { result } = renderHook(() => useGetPlayerPerformanceToday())
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual([])
  })

  it('should return error state from dependency hook', () => {
    const error = new Error('Fetch error')
    vi.mocked(useGetTodayDashboard).mockReturnValue({
      ...baseMockQueryResult,
      data: undefined,
      isLoading: false,
      isError: true,
      isLoadingError: true,
      error,
      isSuccess: false,
      status: 'error',
    } as UseQueryResult<DashboardResponse, Error>)

    const { result } = renderHook(() => useGetPlayerPerformanceToday())
    expect(result.current.isError).toBe(true)
    expect(result.current.error).toBe(error)
  })

  it('should extract focus players from today`s games', () => {
    const mockDashboardData: DashboardResponse = {
      status: 'HAS_TODAY_GAMES',
      games: [
        mockGame([mockPlayer('王柏融'), mockPlayer('Some Other Player')]),
        mockGame([mockPlayer('魔鷹')]),
      ],
    }
    vi.mocked(useGetTodayDashboard).mockReturnValue({
      ...baseMockQueryResult,
      data: mockDashboardData,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
    } as UseQueryResult<DashboardResponse, Error>)

    const { result } = renderHook(() => useGetPlayerPerformanceToday())

    expect(result.current.isSuccess).toBe(true)
    expect(result.current.data).toHaveLength(2)
    expect(result.current.data.map((p) => p.player_name)).toEqual(['王柏融', '魔鷹'])
  })

  it('should extract focus players from last game if no games today', () => {
    const mockDashboardData: DashboardResponse = {
      status: 'NO_TODAY_GAMES',
      last_target_team_game: mockGame([mockPlayer('吳念庭'), mockPlayer('Some Other Player')]),
    }
    vi.mocked(useGetTodayDashboard).mockReturnValue({
      ...baseMockQueryResult,
      data: mockDashboardData,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
    } as UseQueryResult<DashboardResponse, Error>)

    const { result } = renderHook(() => useGetPlayerPerformanceToday())

    expect(result.current.data).toHaveLength(1)
    expect(result.current.data[0].player_name).toBe('吳念庭')
  })

  it('should return an empty array if no focus players are found', () => {
    const mockDashboardData: DashboardResponse = {
      status: 'HAS_TODAY_GAMES',
      games: [mockGame([mockPlayer('Player A'), mockPlayer('Player B')])],
    }
    vi.mocked(useGetTodayDashboard).mockReturnValue({
      ...baseMockQueryResult,
      data: mockDashboardData,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
    } as UseQueryResult<DashboardResponse, Error>)

    const { result } = renderHook(() => useGetPlayerPerformanceToday())
    expect(result.current.data).toEqual([])
  })

  it('should not add duplicate players', () => {
    const mockDashboardData: DashboardResponse = {
      status: 'HAS_TODAY_GAMES',
      games: [
        mockGame([mockPlayer('王柏融')]),
        mockGame([mockPlayer('王柏融'), mockPlayer('魔鷹')]),
      ],
    }
    vi.mocked(useGetTodayDashboard).mockReturnValue({
      ...baseMockQueryResult,
      data: mockDashboardData,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
    } as UseQueryResult<DashboardResponse, Error>)

    const { result } = renderHook(() => useGetPlayerPerformanceToday())
    expect(result.current.data).toHaveLength(2)
    expect(result.current.data.map((p) => p.player_name)).toEqual(['王柏融', '魔鷹'])
  })
})
