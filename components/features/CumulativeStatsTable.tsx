// /components/features/CumulativeStatsTable.tsx

'use client'

import * as React from 'react'
import * as styles from './CumulativeStatsTable.css'
import type { components } from '@/types/generated-api'

// 從 generated-api.ts 導入的確切型別
type PlayerSeasonStatsHistory = components['schemas']['PlayerSeasonStatsHistory']

type CumulativeStatsTableProps = {
  // data 的 key 是球員姓名
  data: Record<string, PlayerSeasonStatsHistory[]>
}

type CalculatedStats = {
  playerName: string
  at_bats: number
  hits: number
  homeruns: number
  rbi: number
  avg: string
}

const calculateCumulativeStats = (data: CumulativeStatsTableProps['data']): CalculatedStats[] => {
  return Object.entries(data).map(([playerName, statsHistory]) => {
    const totals = statsHistory.reduce(
      (acc, day) => {
        acc.at_bats += day.at_bats || 0
        acc.hits += day.hits || 0
        acc.homeruns += day.homeruns || 0
        acc.rbi += day.rbi || 0
        return acc
      },
      { at_bats: 0, hits: 0, homeruns: 0, rbi: 0 }
    )

    const avg = totals.at_bats > 0 ? (totals.hits / totals.at_bats).toFixed(3).substring(1) : '.000'

    return {
      playerName,
      ...totals,
      avg,
    }
  })
}

export const CumulativeStatsTable: React.FC<CumulativeStatsTableProps> = ({ data }) => {
  const calculatedData = React.useMemo(() => calculateCumulativeStats(data), [data])

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>球員</th>
            <th className={styles.th}>打數</th>
            <th className={styles.th}>安打</th>
            <th className={styles.th}>全壘打</th>
            <th className={styles.th}>打點</th>
            <th className={styles.th}>打擊率</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {calculatedData.map((playerStats) => (
            <tr key={playerStats.playerName} className={styles.tr}>
              <td className={`${styles.td} ${styles.playerName}`}>{playerStats.playerName}</td>
              <td className={styles.td}>{playerStats.at_bats}</td>
              <td className={styles.td}>{playerStats.hits}</td>
              <td className={styles.td}>{playerStats.homeruns}</td>
              <td className={styles.td}>{playerStats.rbi}</td>
              <td className={styles.td}>{playerStats.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
