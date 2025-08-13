// hooks/useGetGames.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient' // 根據你的專案結構調整路徑

// 為了型別安全，定義 Game 的基本型別 (可根據實際 API 回應擴充)
interface Game {
  id: string
  date: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
}

/**
 * 獲取比賽列表資料的自訂掛鉤。
 */
export const useGetGames = () => {
  return useQuery<Game[]>({
    // queryKey 是此查詢的唯一標識符，用於快取和依賴追蹤
    queryKey: ['games'],

    // queryFn 是執行資料獲取的非同步函式
    queryFn: () => apiClient<Game[]>('/games'),
  })
}
