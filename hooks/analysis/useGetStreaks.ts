// hooks/analysis/useGetStreaks.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

// 從 generated-api.ts 導入所需的資料型別
type OnBaseStreak = components['schemas']['OnBaseStreak']

/**
 * 查詢由指定球員們組成的「連線」紀錄。
 *
 * @param playerNames - 球員姓名陣列。
 * @param options - TanStack Query 的 useQuery 選項。
 * @returns TanStack Query 的查詢結果，包含 OnBaseStreak 陣列。
 */
export const useGetStreaks = (playerNames: string[], options?: { enabled?: boolean }) => {
  return useQuery<OnBaseStreak[], Error>({
    // queryKey 包含陣列參數，TanStack Query 會自動處理序列化
    queryKey: ['useGetStreaks', playerNames],
    queryFn: async () => {
      const response = await apiClient.get<OnBaseStreak[]>('/analysis/streaks', {
        params: { player_names: playerNames },
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
