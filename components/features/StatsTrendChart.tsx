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
import { useIsMobile } from '@/hooks/useIsMobile'

// --- 型別定義 ---
interface StatsTrendChartProps {
  /**
   * 圖表要呈現的數據陣列。
   * 每個物件的 key 應對應 MetricConfig 中的 key。
   * e.g., [{ date: '...', hits: 10, ops: 0.9 }]
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[]
  metrics: MetricConfig[]
}

const LINE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F']

/**
 * StatsTrendChart 元件 (增強版)
 * @description 一個使用 Recharts 建立的動態曲線圖，支援多數據、多Y軸。
 */
export const StatsTrendChart = ({ data, metrics }: StatsTrendChartProps): React.ReactElement => {
  const isMobile = useIsMobile()
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
          <XAxis
            dataKey="data_retrieved_date"
            stroke="#666"
            // 在行動裝置上增加刻度間隔以避免重疊
            interval={isMobile ? Math.floor(data.length / 5) : 'preserveStartEnd'}
            tick={{ fontSize: 12 }}
          />

          {leftAxisMetric && (
            <YAxis
              yAxisId="left"
              stroke={getMetricColor(leftAxisMetric.key)}
              tickFormatter={(value) => leftAxisMetric.formatter(value)}
              tick={{ fontSize: 12 }}
            />
          )}

          {rightAxisMetric && (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={getMetricColor(rightAxisMetric.key)}
              tickFormatter={(value) => rightAxisMetric.formatter(value)}
              tick={{ fontSize: 12 }}
            />
          )}

          <Tooltip
            wrapperClassName={tooltipWrapper}
            formatter={(value: number, name: string) => {
              const metric = metrics.find((m) => m.label === name)
              return metric ? metric.formatter(value) : String(value)
            }}
          />

          <Legend />

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
