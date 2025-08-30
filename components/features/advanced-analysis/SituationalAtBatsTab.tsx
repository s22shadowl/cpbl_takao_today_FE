// components/features/advanced-analysis/SituationalAtBatsTab.tsx

'use client'

import React, { useMemo } from 'react'
import { useGetSituationalAtBats } from '@/hooks/analysis/useGetSituationalAtBats'
import { useGetSeasonGames } from '@/hooks/useGetSeasonGames'
import {
  EventCalendarChart,
  type CalendarDayData,
} from '@/components/features/charts/EventCalendarChart'
import type { components } from '@/types/generated-api'
import * as styles from './SituationalAtBatsTab.css'

type RunnersSituation = components['schemas']['RunnersSituation']
type SituationalAtBatDetail = components['schemas']['SituationalAtBatDetail']

const situationToText: Record<RunnersSituation, string> = {
  bases_loaded: '滿壘時',
  scoring_position: '得點圈',
  bases_empty: '壘上無人時',
}

const PlayerSituationalAtBatsTable: React.FC<{
  playerName: string
  situation: RunnersSituation
}> = ({ playerName, situation }) => {
  const { data, isLoading, isError, error } = useGetSituationalAtBats(playerName, situation)
  const { data: seasonGames } = useGetSeasonGames({})

  const calendarData = useMemo((): CalendarDayData[] => {
    if (!seasonGames || !data) return []

    const gameDaySet = new Set(seasonGames.map((g) => g.game_date))
    const appearanceMap = new Map<string, SituationalAtBatDetail[]>()
    data.forEach((atBat) => {
      if (!appearanceMap.has(atBat.game_date)) {
        appearanceMap.set(atBat.game_date, [])
      }
      appearanceMap.get(atBat.game_date)?.push(atBat)
    })

    const allDates = Array.from(new Set([...gameDaySet, ...appearanceMap.keys()]))

    return allDates.map((date) => {
      const atBats = appearanceMap.get(date)
      const hasHit = atBats?.some((ab) => ab.result_type === 'ON_BASE')
      return {
        date,
        isGameDay: gameDaySet.has(date),
        hasAppearance: !!atBats,
        isHighlighted: !!hasHit,
        payload: atBats,
      }
    })
  }, [seasonGames, data])

  if (isLoading) {
    return <p className={styles.infoText}>正在載入 {playerName} 的數據...</p>
  }

  if (isError) {
    return (
      <p className={styles.infoText}>
        {playerName} 數據載入失敗: {error instanceof Error ? error.message : '未知錯誤'}
      </p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p className={styles.infoText}>
        {playerName} 尚無{situationToText[situation]}的打席紀錄。
      </p>
    )
  }

  return (
    <>
      <EventCalendarChart
        title={`${playerName} ${situationToText[situation]}表現`}
        data={calendarData}
        renderTooltip={(dayData) => {
          const atBats = dayData.payload as SituationalAtBatDetail[] | undefined
          if (!atBats) return <div>{dayData.date}</div>
          return (
            <div>
              <strong>{dayData.date}</strong>
              {atBats.map((ab) => (
                <div key={ab.id}>
                  {ab.result_short} ({ab.runs_scored_on_play} RBI)
                </div>
              ))}
            </div>
          )
        }}
      />

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>比賽日期</th>
              <th className={styles.tableHeader}>對戰球隊</th>
              <th className={styles.tableHeader}>局數</th>
              <th className={styles.tableHeader}>對戰投手</th>
              <th className={styles.tableHeader}>結果</th>
              <th className={styles.tableHeader}>打點</th>
            </tr>
          </thead>
          <tbody>
            {data.map((atBat) => (
              <tr key={atBat.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{atBat.game_date}</td>
                <td className={styles.tableCell}>{atBat.opponent_team}</td>
                <td className={styles.tableCell}>{atBat.inning}</td>
                <td className={styles.tableCell}>{atBat.opposing_pitcher_name}</td>
                <td className={styles.tableCell}>{atBat.result_short}</td>
                <td className={styles.tableCell}>{atBat.runs_scored_on_play}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

interface SituationalAtBatsTabProps {
  players: string[]
  situation: RunnersSituation
}

export const SituationalAtBatsTab: React.FC<SituationalAtBatsTabProps> = ({
  players,
  situation,
}) => {
  return (
    <div className={styles.container}>
      {players.map((player) => (
        <section key={player} className={styles.playerSection}>
          <h3 className={styles.playerName}>{player}</h3>
          <PlayerSituationalAtBatsTable playerName={player} situation={situation} />
        </section>
      ))}
    </div>
  )
}
