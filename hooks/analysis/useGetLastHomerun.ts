// hooks/analysis/useGetLastHomerun.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

// 從 generated-api.ts 導入所需的資料型別
type LastHomerunStats = components['schemas']['LastHomerunStats']

/**
 * 獲取指定球員的最後一轟及其相關統計數據。
 *
 * @param playerName - 球員姓名。
 * @param options - TanStack Query 的 useQuery 選項。
 * @returns TanStack Query 的查詢結果，包含 LastHomerunStats 資料。
 */
export const useGetLastHomerun = (playerName: string, options?: { enabled?: boolean }) => {
  return useQuery<LastHomerunStats, Error>({
    // queryKey 用於唯一識別此查詢，包含 Hook 名稱和所有參數
    queryKey: ['useGetLastHomerun', playerName],
    // queryFn 是實際執行資料獲取的函式
    queryFn: async () => {
      // 呼叫 apiClient 來發送 GET 請求
      const response = await apiClient.get<LastHomerunStats>(
        `/analysis/players/${playerName}/last-homerun`
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
