// components/features/advanced-analysis/HomerunTrackingTab.tsx

'use client'

import React from 'react'
import { useGetLastHomerun } from '@/hooks/analysis/useGetLastHomerun'
import * as styles from './HomerunTrackingTab.css'
import { calculateMilestone, type CareerData } from './utils'
import { homeruns_tab_players } from '@/lib/constants'

// --- 假數據 ---

/**
 * 模擬後端未來會提供的生涯數據。
 */
const mockCareerData: Record<string, CareerData> = {
  王柏融: {
    total_homeruns: 88,
    total_PA: 2500,
    total_game_played: 600,
    debut_date: '2019-03-29',
  },
  魔鷹: {
    total_homeruns: 101,
    total_PA: 3000,
    total_game_played: 800,
    debut_date: '2017-05-10',
  },
}

// --- 子元件 ---

const PlayerStatsCard: React.FC<{
  playerName: string
}> = ({ playerName }) => {
  // 將 Hook 呼叫移至此元件內部，以便在迴圈中安全使用
  const { data, isLoading, isError, error } = useGetLastHomerun(playerName)
  const milestoneData = calculateMilestone(mockCareerData[playerName])

  if (isLoading) {
    return <div className={styles.card}>正在載入 {playerName} 的數據...</div>
  }

  if (isError) {
    return (
      <div className={styles.card}>
        <h3 className={styles.playerName}>{playerName}</h3>
        <p className={styles.errorText}>
          數據載入失敗: {error instanceof Error ? error.message : '未知錯誤'}
        </p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={styles.card}>
        <h3 className={styles.playerName}>{playerName}</h3>
        <p>暫無全壘打數據。</p>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      {/* 上半部：最後一轟資訊 */}
      <div>
        <h3 className={styles.playerName}>{playerName}</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>最後開轟日期</span>
            <span className={styles.statValue}>{data.game_date}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>距今天數</span>
            <span className={styles.statValue}>{data.days_since} 天</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>經過場次</span>
            <span className={styles.statValue}>{data.games_since} 場</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>經過打數</span>
            <span className={styles.statValue}>{data.at_bats_since} 個</span>
          </div>
        </div>
        <div className={styles.sectionSeparator}>
          <p>
            <strong>對戰投手:</strong> {data.last_homerun.opposing_pitcher_name ?? 'N/A'}
          </p>
          <p>
            <strong>打席結果:</strong> {data.last_homerun.result_description_full ?? 'N/A'}
          </p>
        </div>
      </div>

      {/* 下半部：百轟進度 */}
      {milestoneData && (
        <div className={styles.sectionSeparator}>
          <h4 className={styles.milestoneTitle}>百轟進度</h4>
          <p className={styles.milestoneText}>
            目前累積：{milestoneData.total_homeruns} 支<br />
            距離下一個百轟還有：{milestoneData.homerunsNeeded} 支<br />
            依照目前速度，預計還需要：{milestoneData.estimatedDays} 天 /{' '}
            {milestoneData.estimatedGames} 場出賽 / {milestoneData.estimatedPA} 個打席，預計將於{' '}
            {milestoneData.estimatedDateString} 達成
          </p>
        </div>
      )}
    </div>
  )
}

// --- 主元件 ---

export const HomerunTrackingTab: React.FC = () => {
  return (
    <div className={styles.container}>
      {homeruns_tab_players.map((player) => (
        <PlayerStatsCard key={player} playerName={player} />
      ))}
    </div>
  )
}
