// hooks/useGetGamesToday.ts

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/apiClient'
// 導入自動生成的型別
import type { paths } from '@/types/generated-api'

// --- 從 generated-api.ts 中提取並匯出所需的型別 ---

// API 回應的聯合型別
export type DashboardResponse =
  paths['/api/dashboard/today']['get']['responses']['200']['content']['application/json']

// 輔助型別：從 DashboardResponse 聯合型別中，提取具有特定 status 的成員
type DashboardResponseWithStatus<S> = Extract<DashboardResponse, { status?: S }>

// 安全地從 DashboardResponse 推導出 Game 型別
// 1. 取得 status 為 'HAS_TODAY_GAMES' 的回應型別
type HasGamesResponse = DashboardResponseWithStatus<'HAS_TODAY_GAMES'>
// 2. 從中提取 games 陣列的元素型別
export type Game = NonNullable<HasGamesResponse['games']>[number]

// 安全地從 Game 型別推導出 PlayerSummary 型別
export type PlayerSummary = NonNullable<Game['player_summaries']>[number]

/**
 * 獲取首頁儀表板所需的所有資料。
 * 此 Hook 直接呼叫 /api/dashboard/today 端點。
 */
export const useGetTodayDashboard = () => {
  return useQuery<DashboardResponse>({
    queryKey: ['dashboard', 'today'],
    queryFn: () => apiClient<DashboardResponse>('dashboard/today'),
    staleTime: 1000 * 60 * 5, // 儀表板資訊 5 分鐘內有效
  })
}
