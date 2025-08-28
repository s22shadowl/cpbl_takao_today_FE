// components/features/advanced-analysis/SituationalAtBatsTab.tsx

'use client'

import React from 'react'
import { useGetSituationalAtBats } from '@/hooks/analysis/useGetSituationalAtBats'
import type { components } from '@/types/generated-api'
import * as styles from './SituationalAtBatsTab.css'

type RunnersSituation = components['schemas']['RunnersSituation']

// 將情境代碼轉換為中文，方便顯示提示訊息
const situationToText: Record<RunnersSituation, string> = {
  bases_loaded: '滿壘時',
  scoring_position: '得點圈',
  bases_empty: '壘上無人',
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
          {data.map((atBat) => (
            <tr key={atBat.id} className={styles.tableRow}>
              {/* 使用 API 回傳的真實數據 */}
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
