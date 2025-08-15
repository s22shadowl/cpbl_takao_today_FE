'use client'
// components/features/StatsTrendChart.tsx

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// 假設樣式檔案也已更名或調整，此處暫時註解
// import { chartContainer, tooltipWrapper } from './StatsTrendChart.css'

// --- 型別定義 ---
// 新的數據點型別，適用於趨勢圖
interface TrendDataPoint {
  /** X 軸的標籤，通常是日期或時間 */
  date: string
  /** Y 軸的數值 */
  value: number
}

interface StatsTrendChartProps {
  /** 圖表要呈現的數據陣列 */
  data: TrendDataPoint[]
  /** 在圖例中顯示的數據線名稱 */
  dataKeyName?: string
}

/**
 * StatsTrendChart 元件
 * @description 一個使用 Recharts 建立的曲線圖，用於視覺化呈現數據隨時間的趨勢。
 * @param {StatsTrendChartProps} props - 元件的 props
 * @returns {React.ReactElement}
 */
export const StatsTrendChart = ({
  data,
  dataKeyName = '數值',
}: StatsTrendChartProps): React.ReactElement => {
  return (
    <div
      style={{
        width: '100%',
        height: 400,
        maxWidth: '800px',
        margin: '0 auto',
      }} /* className={chartContainer} */
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* 圖表的網格線 */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X 軸，顯示日期 */}
          <XAxis dataKey="date" />
          {/* Y 軸 */}
          <YAxis />
          {/* 滑鼠懸停時的提示框 */}
          <Tooltip /* wrapperClassName={tooltipWrapper} */ />
          {/* 圖例 */}
          <Legend />
          {/* 主要的數據曲線 */}
          <Line
            type="monotone"
            dataKey="value"
            name={dataKeyName}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
