// app/players/[playerName]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useGetPlayerStats, PlayerStats } from '@/hooks/useGetPlayerStats'
import { PlayerStatsChart } from '@/components/features/PlayerStatsChart'
import { ApiError, APIErrorCode } from '@/lib/errors'

// 資料轉換函式：將 API 回傳的 PlayerStats 物件轉換為圖表所需的格式
const transformDataForChart = (playerStat: PlayerStats) => {
  return [
    { name: '安打', value: playerStat.hits },
    { name: '全壘打', value: playerStat.homeruns },
    { name: '打點', value: playerStat.rbi },
    { name: '盜壘', value: playerStat.stolen_bases },
    { name: '三振', value: playerStat.strikeouts },
    { name: '四壞', value: playerStat.walks },
  ]
}

const PlayerStatsPage = () => {
  const params = useParams()
  const playerName = Array.isArray(params.playerName) ? params.playerName[0] : params.playerName!

  const { data: stats, isLoading, isError, error } = useGetPlayerStats(playerName)

  // 處理載入中狀態
  if (isLoading) {
    return <div>正在查詢球員 {playerName} 的統計數據...</div>
  }

  // 處理錯誤狀態
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

  // API 可能回傳多筆資料（例如同名同姓），此處先取第一筆
  const playerStat = stats?.[0]

  if (!playerStat) {
    return <div>找不到 {playerName} 的數據。</div>
  }

  const chartData = transformDataForChart(playerStat)

  return (
    <div>
      <h1 className="text-2xl font-bold">{playerStat.player_name}</h1>
      <p>Team: {playerStat.team_name}</p>
      <hr className="my-4" />

      {/* 渲染圖表 */}
      <PlayerStatsChart data={chartData} />

      {/* 你也可以同時保留文字列表 */}
      <h2 className="text-xl font-semibold mt-8">詳細數據</h2>
      <ul>
        <li>Hits: {playerStat.hits}</li>
        <li>Home Runs: {playerStat.homeruns}</li>
        <li>RBI: {playerStat.rbi}</li>
      </ul>
    </div>
  )
}

export default PlayerStatsPage
