// components/features/advanced-analysis/NPBStreaksTab.tsx

'use client'

import React from 'react'
import { useGetStreaks } from '@/hooks/analysis/useGetStreaks'
import { npb_streaks_tab_players } from '@/lib/constants'
import type { components } from '@/types/generated-api'
import * as styles from './NPBStreaksTab.css'

type OnBaseStreak = components['schemas']['OnBaseStreak']

// --- 子元件 ---

const StreakCard: React.FC<{ streak: OnBaseStreak }> = ({ streak }) => {
  return (
    <div className={styles.streakCard}>
      <div className={styles.cardHeader}>
        <span>{streak.game_date}</span>
        {/* 使用 API 回傳的真實對手數據 */}
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

// --- 主元件 ---

export const NPBStreaksTab: React.FC = () => {
  const { data, isLoading, isError, error } = useGetStreaks(npb_streaks_tab_players)

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
      <h2 className={styles.totalStreaksTitle}>本季連線總次數：{data.length}</h2>
      {data.map((streak) => (
        <StreakCard key={streak.game_id + '-' + streak.inning} streak={streak} />
      ))}
    </div>
  )
}
