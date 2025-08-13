// hooks/useGetGames.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'

// 根據 API 文件更新 Game 的型別定義
export interface Game {
  id: number
  cpbl_game_id: string
  game_date: string
  game_time: string
  home_team: string
  away_team: string
  home_score: number
  away_score: number
  venue: string
  status: string
}

/**
 * 根據日期獲取比賽列表資料的自訂掛鉤。
 * @param gameDate - 要查詢的比賽日期 (格式: YYYY-MM-DD)
 */
export const useGetGames = (gameDate: string) => {
  return useQuery<Game[]>({
    // queryKey 包含 gameDate，確保不同日期的查詢會被獨立快取
    queryKey: ['games', gameDate],

    // 呼叫符合 API 規格的端點
    queryFn: () => apiClient<Game[]>(`/games/${gameDate}`),

    // 只有在 gameDate 有值的時候才執行查詢
    enabled: !!gameDate,
  })
}
