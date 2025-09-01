// /hooks/analysis/useGetPlayerDataByPosition.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

type PositionAnalysisResponse = components['schemas']['PositionAnalysisResponse']

/**
 * 透過 TanStack Query 取得指定年度與守備位置的深入分析數據。
 * @param year - 查詢的年份 (e.g., 2024)
 * @param position - 查詢的守備位置 (e.g., '2B', 'SS')
 * @returns The result of the useQuery hook.
 */
export const useGetPlayerDataByPosition = (year: number, position: string) => {
  return useQuery<PositionAnalysisResponse, Error>({
    // queryKey 應包含所有會影響查詢結果的依賴項
    queryKey: ['playerDataByPosition', year, position],

    // queryFn 負責執行實際的資料獲取操作
    queryFn: async () => {
      const response = await apiClient.get<PositionAnalysisResponse>(
        `/analysis/positions/${year}/${position}`
      )
      return response
    },

    // enabled 選項確保在 year 和 position 皆為有效值時才觸發查詢
    enabled: !!year && !!position,
  })
}
