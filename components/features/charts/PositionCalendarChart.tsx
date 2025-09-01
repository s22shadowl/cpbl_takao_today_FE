// /components/features/charts/PositionCalendarChart.tsx

'use client'

import React, { useMemo } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns'
import * as styles from './PositionCalendarChart.css'
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons'

// --- 型別定義 ---

export interface PlayerPositionCalendarData {
  /** 日期字串 'YYYY-MM-DD' */
  date: string
  /** 先發球員姓名 */
  starterPlayerName: string
}

export interface PositionCalendarChartProps {
  /** 日曆上要顯示的球員數據 */
  data: PlayerPositionCalendarData[]
  /** 顯示的年份 */
  year: number
  /** 顯示的月份 (1-12) */
  month: number
  /** 月份切換時的回呼函式 */
  onMonthChange: (newYear: number, newMonth: number) => void
}

// --- 主元件 ---

export const PositionCalendarChart: React.FC<PositionCalendarChartProps> = ({
  data,
  year,
  month,
  onMonthChange,
}) => {
  // 根據傳入的 year 和 month props 建立 Date 物件
  // month - 1 是因為 Date 物件的月份是 0-11
  const currentMonthDate = useMemo(() => new Date(year, month - 1), [year, month])

  const dataMap = useMemo(() => {
    return new Map(data.map((d) => [d.date, d]))
  }, [data])

  const handlePrevMonth = () => {
    const prevMonthDate = subMonths(currentMonthDate, 1)
    onMonthChange(prevMonthDate.getFullYear(), prevMonthDate.getMonth() + 1)
  }

  const handleNextMonth = () => {
    const nextMonthDate = addMonths(currentMonthDate, 1)
    onMonthChange(nextMonthDate.getFullYear(), nextMonthDate.getMonth() + 1)
  }

  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonthDate)
    const monthEnd = endOfMonth(currentMonthDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: startDate, end: endDate })
  }, [currentMonthDate])

  return (
    <div className={styles.container}>
      <div className={styles.calendarHeader}>
        <button className={styles.navButton} onClick={handlePrevMonth} aria-label="上個月">
          <ChevronLeft />
        </button>
        <h4 className={styles.monthTitle}>{format(currentMonthDate, 'yyyy 年 M 月')}</h4>
        <button className={styles.navButton} onClick={handleNextMonth} aria-label="下個月">
          <ChevronRight />
        </button>
      </div>

      <div className={styles.weekHeader}>
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {daysInMonth.map((day) => {
          const dayString = format(day, 'yyyy-MM-dd')
          const dayData = dataMap.get(dayString)
          const isCurrentMonth = isSameMonth(day, currentMonthDate)

          return (
            <div
              key={dayString}
              className={`${styles.cell} ${!isCurrentMonth ? styles.otherMonthCell : ''}`}
            >
              <span className={styles.dateNumber}>{format(day, 'd')}</span>
              {isCurrentMonth && dayData && (
                <div className={styles.starterPlayer}>{dayData.starterPlayerName}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
