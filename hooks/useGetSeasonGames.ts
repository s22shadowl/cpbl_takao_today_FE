// hooks/useGetSeasonGames.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
import type { components } from '@/types/generated-api'

type SeasonGame = components['schemas']['SeasonGame']

interface UseGetSeasonGamesProps {
  year?: number
  completed_only?: boolean
  enabled?: boolean // 新增 enabled 選項
}

/**
 * 獲取指定年度的全聯盟賽程。
 * @param {UseGetSeasonGamesProps} props - Hook 的參數。
 * @param {number} [props.year=currentYear] - 查詢的年份。
 * @param {boolean} [props.completed_only=false] - 是否只回傳已完成的比賽。
 * @param {boolean} [props.enabled=true] - 是否啟用此 query。
 */
export const useGetSeasonGames = ({
  year = new Date().getFullYear(),
  completed_only = false,
  enabled = true, // 預設為啟用
}: UseGetSeasonGamesProps = {}) => {
  return useQuery<SeasonGame[], Error>({
    // queryKey 包含 Hook 名稱和所有參數，以確保請求的唯一性
    queryKey: ['seasonGames', year, completed_only],
    // queryFn 呼叫 apiClient 進行資料獲取
    queryFn: async () => {
      const response = await apiClient.get<SeasonGame[]>('/games/season', {
        params: { year, completed_only: String(completed_only) },
      })
      return response
    },
    // 賽季資料不常變動，設定為永久新鮮，避免不必要的重複請求
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled, // 將 enabled 狀態傳遞給 useQuery
  })
}
