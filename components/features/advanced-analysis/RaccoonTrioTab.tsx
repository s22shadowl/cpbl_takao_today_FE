// components/features/advanced-analysis/RaccoonTrioTab.tsx

'use client'

import React from 'react'
import { useGetGamesWithPlayers } from '@/hooks/analysis/useGetGamesWithPlayers'
import { raccoon_trio_players, TARGET_TEAM } from '@/lib/constants'
import { getGameResultInfo } from './utils'
import * as styles from './RaccoonTrioTab.css'

// --- 主元件 ---

export const RaccoonTrioTab: React.FC = () => {
  const { data, isLoading, isError, error } = useGetGamesWithPlayers(raccoon_trio_players)

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

  if (!data || data.length === 0) {
    return <p className={styles.infoText}>找不到此組合共同出賽的比賽紀錄。</p>
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>比賽日期</th>
            <th className={styles.tableHeader}>對戰對手</th>
            <th className={styles.tableHeader}>最終比分</th>
            <th className={styles.tableHeader}>比賽結果</th>
            <th className={styles.tableHeader}>比賽場地</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game) => {
            const { opponent, result } = getGameResultInfo(game, TARGET_TEAM)
            return (
              <tr key={game.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{game.game_date}</td>
                <td className={styles.tableCell}>{opponent}</td>
                <td className={styles.tableCell}>
                  {game.away_score ?? '-'} : {game.home_score ?? '-'}
                </td>
                <td className={styles.tableCell}>{result}</td>
                <td className={styles.tableCell}>{game.venue ?? 'N/A'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
