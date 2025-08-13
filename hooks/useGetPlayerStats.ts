// hooks/useGetPlayerStats.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import { APIErrorCode } from '@/lib/errors'

// 根據 API 文件新增 PlayerStats 的型別定義
export interface PlayerStats {
  player_name: string
  team_name: string
  data_retrieved_date: string
  games_played: number
  plate_appearances: number
  at_bats: number
  runs_scored: number
  hits: number
  rbi: number
  homeruns: number
  singles: number
  doubles: number
  triples: number
  total_bases: number
  strikeouts: number
  stolen_bases: number
  gdp: number
  sacrifice_hits: number
  sacrifice_flies: number
  walks: number
  intentional_walks: number
}

/**
 * 根據球員姓名獲取其歷史統計數據。
 * @param playerName - 球員的姓名
 */
export const useGetPlayerStats = (playerName: string) => {
  return useQuery<PlayerStats[]>({
    // API 回應的是一個陣列
    // queryKey 包含 playerName
    queryKey: ['playerStats', playerName],

    // 呼叫符合 API 規格的端點
    queryFn: () => apiClient<PlayerStats[]>(`/players/${playerName}/stats/history`),

    // 只有 playerName 有值時才執行
    enabled: !!playerName,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retry: (failureCount, error: any) => {
      if (error.code === APIErrorCode.PlayerNotFound) return false
      return failureCount < 3
    },
  })
}
