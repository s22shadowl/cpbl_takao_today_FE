// app/players/[playerName]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useGetPlayerStats } from '@/hooks/useGetPlayerStats' // <-- 引入新的掛鉤
import { ApiError, APIErrorCode } from '@/lib/errors'

const PlayerStatsPage = () => {
  const params = useParams()
  const playerName = Array.isArray(params.playerName) ? params.playerName[0] : params.playerName!

  const { data: stats, isLoading, isError, error } = useGetPlayerStats(playerName)

  if (isLoading) {
    return <div>正在查詢球員 {playerName} 的統計數據...</div>
  }

  if (isError) {
    if (error instanceof ApiError && error.code === APIErrorCode.PlayerNotFound) {
      return (
        <div className="text-red-500">
          <h1 className="text-xl">查無此球員</h1>
          <p>姓名: {playerName}</p>
          <p>Request ID: {error.requestId || 'N/A'}</p>
        </div>
      )
    }
    return <div>發生預期外的錯誤: {error.message}</div>
  }

  // 因為 API 回傳陣列，我們取第一筆資料來顯示
  const playerStat = stats?.[0]

  return (
    <div>
      <h1 className="text-2xl font-bold">{playerStat?.player_name}</h1>
      <p>Team: {playerStat?.team_name}</p>
      <hr className="my-4" />
      <h2 className="text-xl font-semibold">Stats</h2>
      <ul>
        <li>Hits: {playerStat?.hits}</li>
        <li>Home Runs: {playerStat?.homeruns}</li>
        <li>RBI: {playerStat?.rbi}</li>
      </ul>
    </div>
  )
}

export default PlayerStatsPage
