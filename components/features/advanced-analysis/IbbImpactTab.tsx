// components/features/advanced-analysis/IbbImpactTab.tsx

'use client'

import React from 'react'
import { useGetIbbImpact } from '@/hooks/analysis/useGetIbbImpact'
import type { components } from '@/types/generated-api'
import * as styles from './IbbImpactTab.css'

type IbbImpactResult = components['schemas']['IbbImpactResult']

// --- 假資料 ---
const mockOpponent = ['中信兄弟', '味全龍', '統一7-ELEVEn獅', '富邦悍將', '樂天桃猿']

// --- 子元件 ---

const IbbImpactCard: React.FC<{
  event: IbbImpactResult
  index: number
}> = ({ event, index }) => {
  const opponent = mockOpponent[index % mockOpponent.length]
  const { intentional_walk } = event // 取得敬遠當下的打席資訊

  return (
    <div className={styles.impactCard}>
      <div className={styles.cardHeader}>
        <div className={styles.headerMain}>
          <span className={styles.headerText}>
            {event.game_date} vs {opponent}
          </span>
          <span className={styles.headerText}>第 {event.inning} 局</span>
        </div>
        <div className={styles.headerDetails}>
          <span>投手: {intentional_walk.opposing_pitcher_name ?? 'N/A'}</span>
          <span>
            {intentional_walk.outs_before} 出局, {intentional_walk.runners_on_base_before}
          </span>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h4>敬遠後續打席：</h4>
        <ul className={styles.atBatsList}>
          {event.subsequent_at_bats.map((atBat) => (
            <li key={atBat.id} className={styles.atBatItem}>
              <span>{atBat.player_name}</span>
              <span>{atBat.result_short}</span>
            </li>
          ))}
        </ul>
        <div className={styles.resultSummary}>
          <span>該半局後續總失分：</span>
          <span className={styles.runsScoredText} data-has-runs={event.runs_scored_after_ibb > 0}>
            {event.runs_scored_after_ibb}
          </span>
        </div>
      </div>
    </div>
  )
}

// --- 主元件 ---

export const IbbImpactTab: React.FC = () => {
  const { data, isLoading, isError, error } = useGetIbbImpact('魔鷹')

  if (isLoading) {
    return <p className={styles.infoText}>正在載入數據...</p>
  }

  if (isError) {
    return (
      <p className={styles.infoText}>
        數據載入失敗: {error instanceof Error ? error.message : '未知錯誤'}
      </p>
    )
  }

  if (!data || data.length === 0) {
    return <p className={styles.infoText}>魔鷹尚無被故意四壞的紀錄。</p>
  }

  return (
    <div className={styles.container}>
      {data.map((event, index) => (
        <IbbImpactCard key={event.intentional_walk.id} event={event} index={index} />
      ))}
    </div>
  )
}
