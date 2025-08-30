// components/features/charts/EventCalendarChart.tsx

'use client'

import React, { useState, useMemo } from 'react'
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
  showNavigators?: boolean
  onMonthChange?: (newMonth: Date) => void
  renderTooltip: (dayData: CalendarDayData) => React.ReactNode
}

// --- 主元件 ---

export const EventCalendarChart: React.FC<EventCalendarChartProps> = ({
  title,
  subtitle,
  data,
  initialMonth,
  showNavigators = true,
  onMonthChange,
  renderTooltip,
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? new Date())
  const [hoveredDay, setHoveredDay] = useState<CalendarDayData | null>(null)

  const dataMap = useMemo(() => {
    return new Map(data.map((d) => [d.date, d]))
  }, [data])

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth)
    if (onMonthChange) {
      onMonthChange(newMonth)
    }
  }

  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    return eachDayOfInterval({ start: startDate, end: endDate })
  }, [currentMonth])

  const getCellStyle = (dayData: CalendarDayData, month: Date) => {
    if (!isSameMonth(new Date(dayData.date), month)) return styles.otherMonthCell
    if (dayData.isHighlighted) return styles.highlightedCell
    if (dayData.hasAppearance) return styles.hasAppearanceCell
    if (dayData.isGameDay) return styles.gameDayNoAppearanceCell
    return styles.noGameDayCell
  }

  return (
    <div className={styles.container}>
      {showNavigators && (
        <>
          <button
            className={styles.prevButton}
            onClick={() => handleMonthChange(subMonths(currentMonth, 1))}
          >
            <ChevronLeft />
          </button>
          <button
            className={styles.nextButton}
            onClick={() => handleMonthChange(addMonths(currentMonth, 1))}
          >
            <ChevronRight />
          </button>
        </>
      )}

      <div className={styles.chartHeader}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.calendarHeader}>
        <h4 className={styles.monthTitle}>{format(currentMonth, 'yyyy 年 M 月')}</h4>
        <div className={styles.weekHeader}>
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
      </div>

      <div className={styles.calendarGrid}>
        {daysInMonth.map((day, index) => {
          const dayString = format(day, 'yyyy-MM-dd')
          const dayData = dataMap.get(dayString) ?? {
            date: dayString,
            isGameDay: false,
          }

          return (
            <React.Fragment key={day.toString()}>
              {index % 7 === 1 && (
                <div className={styles.weekSeparator} style={{ left: `calc(${100 / 7}% * 1)` }} />
              )}
              <div
                className={`${styles.cell} ${getCellStyle(dayData, currentMonth)}`}
                onMouseEnter={() => setHoveredDay(dayData)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <span className={styles.dateNumber}>{day.getDate()}</span>
                {hoveredDay?.date === dayData.date && isSameMonth(day, currentMonth) && (
                  <div className={styles.tooltip}>{renderTooltip(dayData)}</div>
                )}
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
