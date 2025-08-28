// components/features/advanced-analysis/SituationalAtBatsTab.tsx

'use client'

import React from 'react'
import { useGetSituationalAtBats } from '@/hooks/analysis/useGetSituationalAtBats'
import type { components } from '@/types/generated-api'
import * as styles from './SituationalAtBatsTab.css'

type RunnersSituation = components['schemas']['RunnersSituation']

// --- 輔助資料 ---
const mockGameData = [
  { game_date: '2024-08-15', opponent: '中信兄弟' },
  { game_date: '2024-08-12', opponent: '味全龍' },
  { game_date: '2024-08-05', opponent: '統一7-ELEVEn獅' },
  { game_date: '2024-07-28', opponent: '富邦悍將' },
  { game_date: '2024-07-21', opponent: '樂天桃猿' },
]

// 將情境代碼轉換為中文，方便顯示提示訊息
const situationToText: Record<RunnersSituation, string> = {
  bases_loaded: '滿壘時',
  scoring_position: '得點圈',
  bases_empty: '壘上無人時',
}

// --- 子元件 ---

const PlayerSituationalAtBatsTable: React.FC<{
  playerName: string
  situation: RunnersSituation
}> = ({ playerName, situation }) => {
  const { data, isLoading, isError, error } = useGetSituationalAtBats(playerName, situation)

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
          {data.map((atBat, index) => {
            const game = mockGameData[index % mockGameData.length]
            return (
              <tr key={atBat.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{game.game_date}</td>
                <td className={styles.tableCell}>{game.opponent}</td>
                <td className={styles.tableCell}>{atBat.inning}</td>
                <td className={styles.tableCell}>{atBat.opposing_pitcher_name}</td>
                <td className={styles.tableCell}>{atBat.result_short}</td>
                <td className={styles.tableCell}>{atBat.runs_scored_on_play}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// --- 主元件 ---

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
