// hooks/analysis/useGetGamesWithPlayers.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

// 從 generated-api.ts 導入所需的資料型別
type GameResult = components['schemas']['GameResult']

/**
 * 查詢指定的所有球員同時出賽的比賽列表。
 *
 * @param playerNames - 球員姓名陣列。
 * @param options - TanStack Query 的 useQuery 選項。
 * @returns TanStack Query 的查詢結果，包含 GameResult 陣列。
 */
export const useGetGamesWithPlayers = (playerNames: string[], options?: { enabled?: boolean }) => {
  return useQuery<GameResult[], Error>({
    queryKey: ['useGetGamesWithPlayers', playerNames],
    queryFn: async () => {
      const response = await apiClient.get<GameResult[]>('/analysis/games-with-players', {
        params: { players: playerNames },
      })
      return response
    },
    // 確保 playerNames 陣列不為空
    enabled: playerNames.length > 0 && (options?.enabled ?? true),
    // 禁用視窗重新聚焦時的自動重新查詢
    refetchOnWindowFocus: false,
    // 將資料設定為永久新鮮，除非手動使其失效
    staleTime: Infinity,
  })
}
