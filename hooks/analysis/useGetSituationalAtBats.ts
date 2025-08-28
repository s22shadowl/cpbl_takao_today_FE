// hooks/analysis/useGetSituationalAtBats.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

// 更新回傳資料的型別
type SituationalAtBatDetail = components['schemas']['SituationalAtBatDetail']
type RunnersSituation = components['schemas']['RunnersSituation']

/**
 * 根據指定的壘上情境，查詢球員的打席紀錄。
 *
 * @param playerName - 球員姓名。
 * @param situation - 壘上跑者情境。
 * @param options - TanStack Query 的 useQuery 選項。
 * @returns TanStack Query 的查詢結果，包含 SituationalAtBatDetail 陣列。
 */
export const useGetSituationalAtBats = (
  playerName: string,
  situation: RunnersSituation,
  options?: { enabled?: boolean }
) => {
  return useQuery<SituationalAtBatDetail[], Error>({
    // queryKey 包含 Hook 名稱和所有參數，以確保唯一性
    queryKey: ['useGetSituationalAtBats', playerName, situation],
    queryFn: async () => {
      // 呼叫 apiClient，並將 situation 作為查詢參數傳遞
      const response = await apiClient.get<SituationalAtBatDetail[]>(
        `/analysis/players/${playerName}/situational-at-bats`,
        {
          params: { situation },
        }
      )
      return response
    },
    // 確保所有必要的參數都存在時，查詢才會執行
    enabled: !!playerName && !!situation && (options?.enabled ?? true),
    // 禁用視窗重新聚焦時的自動重新查詢
    refetchOnWindowFocus: false,
    // 將資料設定為永久新鮮，除非手動使其失效
    staleTime: Infinity,
  })
}
