// hooks/useGetSeasonGames.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

// 從 generated-api.ts 導入回傳型別
type SeasonGame = components['schemas']['SeasonGame']

interface UseGetSeasonGamesProps {
  year?: number
  completed_only?: boolean
}

/**
 * 獲取指定年度的全聯盟賽程/賽果。
 *
 * @param year - 查詢的年份，預設為今年。
 * @param completed_only - 是否只回傳已完成的比賽，預設為 false。
 * @returns TanStack Query 的查詢結果，包含 SeasonGame 陣列。
 */
export const useGetSeasonGames = ({
  year = new Date().getFullYear(),
  completed_only = false,
}: UseGetSeasonGamesProps = {}) => {
  return useQuery<SeasonGame[], Error>({
    // queryKey 包含 Hook 名稱和所有參數，以確保請求的唯一性
    queryKey: ['useGetSeasonGames', year, completed_only],
    // queryFn 呼叫 apiClient 獲取數據
    queryFn: async () => {
      const response = await apiClient.get<SeasonGame[]>('/games/season', {
        params: { year, completed_only: completed_only.toString() },
      })
      return response
    },
    // 賽季資料不常變動，設定為永久新鮮，避免不必要的重複請求
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
