'use client'

import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { chartContainer, tooltipWrapper } from './PlayerStatsChart.css'

// --- 型別定義 ---
// TODO: 在未來的任務中，這個型別將會被移至共享的型別檔案 (e.g., /types/player.ts)，
//       並從後端 API 的規格中產生，以確保型別安全。
interface PlayerStat {
  name: string
  value: number
}

interface PlayerStatsChartProps {
  /** 圖表要呈現的數據陣列 */
  data: PlayerStat[]
}

/**
 * PlayerStatsChart 元件
 * @description 一個使用 Recharts 建立的雷達圖，用於視覺化呈現球員的各項統計數據。
 * @param {PlayerStatsChartProps} props - 元件的 props
 * @returns {React.ReactElement}
 */
export const PlayerStatsChart = ({ data }: PlayerStatsChartProps): React.ReactElement => {
  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }} className={chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {/* 雷達圖的網格線 */}
          <PolarGrid />
          {/* 角度軸，顯示數據項目的名稱 (e.g., 全壘打) */}
          <PolarAngleAxis dataKey="name" />
          {/* 半徑軸，此處不顯示刻度，讓圖表更簡潔 */}
          <PolarRadiusAxis tick={false} axisLine={false} />
          {/* 主要的雷達圖形 */}
          <Radar
            name="球員數值"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          {/* 滑鼠懸停時的提示框 */}
          <Tooltip wrapperClassName={tooltipWrapper} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
