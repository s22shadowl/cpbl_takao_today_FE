// components/features/charts/EventCalendarChart.tsx

'use client'

import React, { useState, useMemo } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
} from 'date-fns'
import * as styles from './EventCalendarChart.css'
import { ChevronLeft, ChevronRight } from '@/components/ui/Icons'

// --- 型別定義 ---

export interface CalendarDayData {
  date: string // 'YYYY-MM-DD'
  isGameDay: boolean
  hasAppearance?: boolean
  isHighlighted?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export interface EventCalendarChartProps {
  title: string
  subtitle?: string
  data: CalendarDayData[]
  initialMonth?: Date
  onMonthChange?: (newMonth: Date) => void
  renderTooltip: (dayData: CalendarDayData) => React.ReactNode
}

export const EventCalendarChart: React.FC<EventCalendarChartProps> = ({
  title,
  subtitle,
  data,
  initialMonth,
  onMonthChange,
  renderTooltip,
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth || new Date())

  const dataMap = useMemo(() => {
    const map = new Map<string, CalendarDayData>()
    data.forEach((day) => map.set(day.date, day))
    return map
  }, [data])

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1)
    setCurrentMonth(newMonth)
    onMonthChange?.(newMonth)
  }

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1)
    setCurrentMonth(newMonth)
    onMonthChange?.(newMonth)
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const cells = []
    let day = startDate

    while (day <= endDate) {
      const formattedDate = format(day, 'yyyy-MM-dd')
      const dayData = dataMap.get(formattedDate)

      const cellClasses = [
        styles.cell,
        !isSameMonth(day, monthStart)
          ? styles.otherMonthCell
          : dayData?.isHighlighted
            ? styles.highlightedCell
            : dayData?.hasAppearance
              ? styles.hasAppearanceCell
              : dayData?.isGameDay
                ? styles.gameDayNoAppearanceCell
                : styles.noGameDayCell,
      ]
        .filter(Boolean)
        .join(' ')

      cells.push(
        <div key={formattedDate} className={cellClasses}>
          {format(day, 'd')}
          {dayData && isSameMonth(day, monthStart) && (
            <div className={styles.tooltip}>{renderTooltip(dayData)}</div>
          )}
        </div>
      )
      day = addDays(day, 1)
    }
    return cells
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartHeader}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <button onClick={handlePrevMonth} className={styles.prevButton} aria-label="上個月">
        <ChevronLeft />
      </button>
      <button onClick={handleNextMonth} className={styles.nextButton} aria-label="下個月">
        <ChevronRight />
      </button>

      <div className={styles.calendarHeader}>
        <h3 className={styles.monthTitle}>{format(currentMonth, 'yyyy 年 MM 月')}</h3>
        <div className={styles.weekHeader}>
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
      </div>

      <div className={styles.calendarGrid}>
        {/* 渲染週分隔線 */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={`sep-${i}`}
            className={styles.weekSeparator}
            style={{ left: `calc(100% / 7 * ${i})` }}
          />
        ))}
        {renderCells()}
      </div>
    </div>
  )
}
