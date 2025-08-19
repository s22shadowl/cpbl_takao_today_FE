// /components/features/StatsTrendChart.tsx

'use client'

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
import { MetricConfig } from '@/lib/configs/metrics'
import { chartContainer, tooltipWrapper } from './StatsTrendChart.css'

// --- 型別定義 ---
interface StatsTrendChartProps {
  /**
   * 圖表要呈現的數據陣列。
   * 每個物件的 key 應對應 MetricConfig 中的 key。
   * e.g., [{ date: '...', hits: 10, ops: 0.9 }]
   */
  data: Record<string, unknown>[]
  /**
   * 要在此圖表中顯示的指標設定陣列。
   */
  metrics: MetricConfig[]
}

// 為不同的線條預先定義一組顏色
const LINE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F']

/**
 * StatsTrendChart 元件 (增強版)
 * @description 一個使用 Recharts 建立的動態曲線圖，支援多數據、多Y軸。
 */
export const StatsTrendChart = ({ data, metrics }: StatsTrendChartProps): React.ReactElement => {
  // 找出左右Y軸各自的第一個指標，以其顏色作為Y軸標籤顏色，建立視覺關聯
  const leftAxisMetric = metrics.find((m) => m.yAxisId === 'left')
  const rightAxisMetric = metrics.find((m) => m.yAxisId === 'right')

  const getMetricColor = (metricKey: string) => {
    const index = metrics.findIndex((m) => m.key === metricKey)
    return LINE_COLORS[index % LINE_COLORS.length]
  }

  return (
    <div className={chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="#666" />

          {/* 左側 Y 軸 */}
          {leftAxisMetric && (
            <YAxis
              yAxisId="left"
              stroke={getMetricColor(leftAxisMetric.key)}
              tickFormatter={(value) => leftAxisMetric.formatter(value)}
            />
          )}

          {/* 右側 Y 軸 */}
          {rightAxisMetric && (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={getMetricColor(rightAxisMetric.key)}
              tickFormatter={(value) => rightAxisMetric.formatter(value)}
            />
          )}

          <Tooltip
            wrapperClassName={tooltipWrapper}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            formatter={(value: number, name: string, props) => {
              // 從 metrics 設定中找到對應的格式化函式
              const metric = metrics.find((m) => m.label === name)
              return metric ? metric.formatter(value) : String(value)
            }}
          />

          <Legend />

          {/* 根據 metrics 設定動態生成 Line 元件 */}
          {metrics.map((metric) => (
            <Line
              key={metric.key}
              type="monotone"
              dataKey={metric.key}
              name={metric.label}
              stroke={getMetricColor(metric.key)}
              yAxisId={metric.yAxisId}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
