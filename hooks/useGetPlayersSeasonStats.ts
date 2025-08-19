// /hooks/useGetPlayersSeasonStats.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { operations } from '@/types/generated-api'

// 從 generated-api.ts 精確推斷出 API 回應的型別
type GetPlayerStatsHistoryResponse =
  operations['get_player_stats_history_api_players_stats_history_get']['responses']['200']['content']['application/json']

interface UseGetPlayersSeasonStatsParams {
  playerNames: string[]
  dateRange: {
    start: Date | null
    end: Date | null
  }
}

/**
 * 格式化 Date 物件為 'YYYY-MM-DD' 字串。
 * @param date - Date 物件
 * @returns 'YYYY-MM-DD' 格式的字串，如果傳入 null 或 undefined 則回傳 null。
 */
const formatDate = (date: Date | null | undefined): string | null => {
  if (!date) return null
  // toISOString() 會產生 'YYYY-MM-DDTHH:mm:ss.sssZ'，我們僅需要日期部分。
  return date.toISOString().split('T')[0]
}

/**
 * 獲取多位球員在指定日期範圍內的賽季統計數據。
 * @param params - 包含球員名稱陣列和日期範圍的物件。
 */
export const useGetPlayersSeasonStats = ({
  playerNames,
  dateRange,
}: UseGetPlayersSeasonStatsParams) => {
  return useQuery({
    queryKey: ['playersSeasonStats', playerNames, dateRange],
    queryFn: async () => {
      const formattedStartDate = formatDate(dateRange.start)
      const formattedEndDate = formatDate(dateRange.end)

      return apiClient.get<GetPlayerStatsHistoryResponse>('/players/stats/history', {
        params: {
          player_name: playerNames,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        },
      })
    },
    // 只有當 playerNames 陣列不為空時才執行查詢
    enabled: playerNames.length > 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    placeholderData: (prev) => prev,
  })
}
