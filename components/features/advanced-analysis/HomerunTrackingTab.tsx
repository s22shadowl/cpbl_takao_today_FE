// components/features/advanced-analysis/HomerunTrackingTab.tsx

'use client'

import React from 'react'
import { useGetLastHomerun } from '@/hooks/analysis/useGetLastHomerun'
import { StatItem } from '@/components/ui/StatItem'
import * as styles from './HomerunTrackingTab.css'
import { calculateMilestone } from './utils'
import { homeruns_tab_players } from '@/lib/constants'

// --- 子元件 ---

const PlayerStatsCard: React.FC<{
  playerName: string
}> = ({ playerName }) => {
  const { data, isLoading, isError, error } = useGetLastHomerun(playerName)

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

  const milestoneData = data.career_stats ? calculateMilestone(data.career_stats) : null

  return (
    <div className={styles.card}>
      {/* 上半部：最後一轟資訊 */}
      <div>
        <h3 className={styles.playerName}>{playerName}</h3>
        <div className={styles.statsGrid}>
          <StatItem label="最後開轟日期" value={data.game_date} />
          <StatItem label="距今天數" value={`${data.days_since} 天`} />
          <StatItem label="經過場次" value={`${data.games_since} 場`} />
          <StatItem label="經過打數" value={`${data.at_bats_since} 個`} />
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
          <div className={styles.statsGrid}>
            <StatItem label="初登板日期" value={milestoneData.debut_date} />
            <StatItem label="生涯全壘打" value={`${milestoneData.total_homeruns} 支`} />
            <StatItem label="下一個百轟尚需" value={` ${milestoneData.homerunsNeeded} 支`} />
            <StatItem label="平均產出週期(日)" value={` ${milestoneData.avgDaysPerHR} 天/轟`} />
            <StatItem label="平均產出週期(場)" value={` ${milestoneData.avgGamesPerHR} 場/轟`} />
            <StatItem label="平均產出週期(打席)" value={` ${milestoneData.avgPAPerHR} 打席/轟`} />
          </div>
          {/*
           <p className={styles.milestoneText}>
             預計將於 {milestoneData.estimatedDateString} 達成
           </p>
          */}
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
