// hooks/useGetGames.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
// 導入自動生成的型別
import type { paths } from '@/types/generated-api'

// --- 從 generated-api.ts 中提取並匯出所需的型別 ---

// API 回應的型別 (Game 陣列)
type GamesResponse =
  paths['/api/games/{game_date}']['get']['responses']['200']['content']['application/json']

// 從回應陣列中提取單一 Game 的型別
export type Game = NonNullable<GamesResponse>[number]

/**
 * 根據日期獲取比賽列表資料的自訂掛鉤。
 * @param gameDate - 要查詢的比賽日期 (格式: YYYY-MM-DD)
 */
export const useGetGames = (gameDate: string) => {
  return useQuery<Game[]>({
    // queryKey 包含 gameDate，確保不同日期的查詢會被獨立快取
    queryKey: ['games', gameDate], // 呼叫符合 API 規格的端點

    queryFn: () => apiClient<Game[]>(`games/${gameDate}`), // 只有在 gameDate 有值的時候才執行查詢

    enabled: !!gameDate,
  })
}
