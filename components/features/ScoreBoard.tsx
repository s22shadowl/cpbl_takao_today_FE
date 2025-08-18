// components/features/ScoreBoard.tsx
'use client'

import { useGetTodayDashboard } from '@/hooks/useGetGamesToday'

// 簡易的 UI 元件
const Skeleton = () => <div className="p-4 my-2 bg-gray-200 rounded-md animate-pulse h-20"></div>
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 my-2 text-red-700 bg-red-100 border border-red-400 rounded-md">{message}</div>
)
const EmptyMessage = ({ message }: { message: string }) => (
  <div className="p-4 my-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md">
    {message}
  </div>
)

export const Scoreboard = () => {
  const { data: dashboardData, isLoading, isError, error } = useGetTodayDashboard()

  if (isLoading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  if (isError) {
    return <ErrorMessage message={`讀取儀表板資料時發生錯誤: ${error.message}`} />
  }

  if (!dashboardData) {
    return <EmptyMessage message="無法取得儀表板資料" />
  }

  // 根據後端回傳的 status 決定要渲染的內容
  if (dashboardData.status === 'NO_TODAY_GAMES') {
    return <EmptyMessage message={`今日無賽事。下一場比賽日期：${dashboardData.next_game_date}`} />
  }

  // dashboardData.status === 'HAS_TODAY_GAMES'
  const games = dashboardData.games

  if (games?.length === 0) {
    return <EmptyMessage message="今日無賽事" />
  }

  return (
    <div className="space-y-4">
      {games?.map((game) => (
        <div key={game.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-lg">{game.away_team}</span>
            </div>
            <div className="text-2xl font-bold">
              <span>{game.away_score}</span>
              <span className="mx-2">-</span>
              <span>{game.home_score}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-bold text-lg">{game.home_team}</span>
            </div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">{game.status}</div>
        </div>
      ))}
    </div>
  )
}
