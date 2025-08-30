// components/features/advanced-analysis/NPBStreaksTab.tsx

'use client'

import React, { useMemo } from 'react'
import { useGetStreaks } from '@/hooks/analysis/useGetStreaks'
import { useGetSeasonGames } from '@/hooks/useGetSeasonGames'
import { useGetGamesWithPlayers } from '@/hooks/analysis/useGetGamesWithPlayers'
import { npb_streaks_tab_players } from '@/lib/constants'
import {
  EventCalendarChart,
  type CalendarDayData,
} from '@/components/features/charts/EventCalendarChart'
import type { components } from '@/types/generated-api'
import * as styles from './NPBStreaksTab.css'

type OnBaseStreak = components['schemas']['OnBaseStreak']

const StreakCard: React.FC<{ streak: OnBaseStreak }> = ({ streak }) => {
  return (
    <div className={styles.streakCard}>
      <div className={styles.cardHeader}>
        <span>{streak.game_date}</span>
        <span>vs {streak.opponent_team}</span>
        <span>第 {streak.inning} 局</span>
      </div>
      <div className={styles.cardContent}>
        <ul className={styles.atBatsList}>
          {streak.at_bats.map((atBat) => (
            <li key={atBat.id} className={styles.atBatItem}>
              <div className={styles.atBatMainInfo}>
                <span className={styles.atBatPlayer}>{atBat.player_name}</span>
                <span>{atBat.result_description_full}</span>
              </div>
              <div className={styles.atBatSubInfo}>
                {atBat.outs_before} 出局, {atBat.runners_on_base_before}
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cardFooter}>此次連線得分: {streak.runs_scored_during_streak}</div>
      </div>
    </div>
  )
}

export const NPBStreaksTab: React.FC = () => {
  const { data, isLoading, isError, error } = useGetStreaks(npb_streaks_tab_players)
  const { data: seasonGames } = useGetSeasonGames({})
  const { data: appearanceGames } = useGetGamesWithPlayers(npb_streaks_tab_players)

  const calendarData = useMemo((): CalendarDayData[] => {
    if (!seasonGames) return []

    const gameDaySet = new Set(seasonGames.map((g) => g.game_date))
    const appearanceSet = new Set(appearanceGames?.map((g) => g.game_date) ?? [])
    const highlightedSet = new Set(data?.map((s) => s.game_date) ?? [])

    const allDates = Array.from(new Set([...gameDaySet, ...appearanceSet, ...highlightedSet]))

    return allDates.map((date) => ({
      date,
      isGameDay: gameDaySet.has(date),
      hasAppearance: appearanceSet.has(date),
      isHighlighted: highlightedSet.has(date),
      payload: data?.find((s) => s.game_date === date),
    }))
  }, [seasonGames, appearanceGames, data])

  if (isLoading) {
    return <p className={styles.infoText}>正在搜尋連線紀錄...</p>
  }

  if (isError) {
    return (
      <p className={styles.infoText}>
        數據載入失敗: {error instanceof Error ? error.message : '未知錯誤'}
      </p>
    )
  }

  if (!data || data.length === 0) {
    return <p className={styles.infoText}>找不到符合此組合的連線紀錄。</p>
  }

  return (
    <div className={styles.container}>
      <EventCalendarChart
        title="日職三連星 連線日曆"
        data={calendarData}
        renderTooltip={(dayData) => {
          const streak = dayData.payload as OnBaseStreak | undefined
          if (dayData.isHighlighted && streak) {
            return (
              <div>
                {streak.streak_length} 連線！ ({streak.runs_scored_during_streak} 得分)
              </div>
            )
          }
          if (dayData.hasAppearance) {
            return <div>共同出賽</div>
          }
          return <div>{dayData.date}</div>
        }}
      />

      <h2 className={styles.totalStreaksTitle}>本季連線總次數：{data.length}</h2>
      {data.map((streak) => (
        <StreakCard key={streak.game_id + '-' + streak.inning} streak={streak} />
      ))}
    </div>
  )
}
