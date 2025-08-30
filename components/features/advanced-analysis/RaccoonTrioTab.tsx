// components/features/advanced-analysis/RaccoonTrioTab.tsx

'use client'

import React, { useMemo } from 'react'
import { useGetGamesWithPlayers } from '@/hooks/analysis/useGetGamesWithPlayers'
import { useGetSeasonGames } from '@/hooks/useGetSeasonGames'
import {
  EventCalendarChart,
  type CalendarDayData,
} from '@/components/features/charts/EventCalendarChart'
import { raccoon_trio_players, TARGET_TEAM } from '@/lib/constants'
import type { components } from '@/types/generated-api'
import * as styles from './RaccoonTrioTab.css'
import { getGameResultInfo } from './utils'

type GameResult = components['schemas']['GameResult']

export const RaccoonTrioTab: React.FC = () => {
  const {
    data: appearanceGames,
    isLoading,
    isError,
    error,
  } = useGetGamesWithPlayers(raccoon_trio_players)
  const { data: seasonGames } = useGetSeasonGames({})

  const calendarData = useMemo((): CalendarDayData[] => {
    if (!seasonGames) return []
    const appearanceSet = new Set(appearanceGames?.map((g) => g.game_date) ?? [])

    return seasonGames.map((game) => ({
      date: game.game_date,
      isGameDay: true,
      hasAppearance: appearanceSet.has(game.game_date),
      isHighlighted: false, // This scenario doesn't use highlight
      payload: appearanceGames?.find((g) => g.game_date === game.game_date),
    }))
  }, [seasonGames, appearanceGames])

  if (isLoading) {
    return <p className={styles.infoText}>正在搜尋比賽紀錄...</p>
  }

  if (isError) {
    return (
      <p className={styles.infoText}>
        數據載入失敗: {error instanceof Error ? error.message : '未知錯誤'}
      </p>
    )
  }

  if (!appearanceGames || appearanceGames.length === 0) {
    return <p className={styles.infoText}>找不到符合此組合的比賽紀錄。</p>
  }

  console.log(seasonGames)

  return (
    <div>
      <EventCalendarChart
        title="浣熊三兄弟 出賽日曆"
        subtitle="黃色代表共同出賽"
        data={calendarData}
        renderTooltip={(dayData) => {
          const game = dayData.payload as GameResult | undefined
          if (dayData.hasAppearance && game) {
            const { opponent, result } = getGameResultInfo(game, TARGET_TEAM)
            return (
              <div>
                vs {opponent} ({result})
              </div>
            )
          }
          return <div>{dayData.date}</div>
        }}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>比賽日期</th>
            <th className={styles.tableHeader}>對戰組合</th>
            <th className={styles.tableHeader}>比分</th>
            <th className={styles.tableHeader}>場地</th>
            <th className={styles.tableHeader}>勝敗</th>
          </tr>
        </thead>
        <tbody>
          {appearanceGames.map((game) => {
            const { opponent, result, score } = getGameResultInfo(game, TARGET_TEAM)
            return (
              <tr key={game.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{game.game_date}</td>
                <td className={styles.tableCell}>vs {opponent}</td>
                <td className={styles.tableCell}>{score}</td>
                <td className={styles.tableCell}>{game.venue}</td>
                <td className={styles.tableCell}>{result}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
