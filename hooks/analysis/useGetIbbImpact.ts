// hooks/analysis/useGetIbbImpact.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

// 從 generated-api.ts 導入所需的資料型別
type IbbImpactResult = components['schemas']['IbbImpactResult']

/**
 * 查詢指定球員被故意四壞後，該半局後續所有打席的紀錄與總失分。
 *
 * @param playerName - 球員姓名。
 * @param options - TanStack Query 的 useQuery 選項。
 * @returns TanStack Query 的查詢結果，包含 IbbImpactResult 陣列。
 */
export const useGetIbbImpact = (playerName: string, options?: { enabled?: boolean }) => {
  return useQuery<IbbImpactResult[], Error>({
    queryKey: ['useGetIbbImpact', playerName],
    queryFn: async () => {
      const response = await apiClient.get<IbbImpactResult[]>(
        `/analysis/players/${playerName}/ibb-impact`
      )
      return response
    },
    // 當 playerName 為空時，此查詢將不會自動執行
    enabled: !!playerName && (options?.enabled ?? true),
    // 禁用視窗重新聚焦時的自動重新查詢
    refetchOnWindowFocus: false,
    // 將資料設定為永久新鮮，除非手動使其失效
    staleTime: Infinity,
  })
}
