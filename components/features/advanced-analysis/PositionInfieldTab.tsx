// /components/features/advanced-analysis/PositionInfieldTab.tsx

'use client'

import * as React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useGetPlayerDataByPosition } from '@/hooks/analysis/useGetPlayerDataByPosition'
import { PositionCalendarChart } from '@/components/features/charts/PositionCalendarChart'
import { DataTable } from '@/components/ui/DataTable'
import { components } from '@/types/generated-api'
import * as styles from './PositionInfieldTab.css'

type PlayerStats = components['schemas']['PlayerStatsForPositionAnalysis']

/*  TODO: 
    守備進攻數據標準不一致，待修正
    日曆的 hover 行為
*/

const columns: ColumnDef<PlayerStats>[] = [
  {
    accessorKey: 'player_name',
    header: '球員',
  },
  {
    header: '出賽數',
    accessorFn: (row) => row.batting_stats?.games_played ?? 0,
  },
  {
    header: '打擊率',
    accessorFn: (row) => row.batting_stats?.avg?.toFixed(3) ?? '.000',
  },
  {
    header: '上壘率',
    accessorFn: (row) => row.batting_stats?.obp?.toFixed(3) ?? '.000',
  },
  {
    header: '長打率',
    accessorFn: (row) => row.batting_stats?.slg?.toFixed(3) ?? '.000',
  },
  {
    header: 'OPS',
    accessorFn: (row) => row.batting_stats?.ops?.toFixed(3) ?? '.000',
  },
  {
    header: '守備率',
    accessorFn: (row) => row.fielding_stats[0]?.fielding_percentage?.toFixed(3) ?? '.000',
  },
]

export const PositionInfieldTab: React.FC = () => {
  const today = new Date()
  const [year, setYear] = React.useState(today.getFullYear())
  const [month, setMonth] = React.useState(today.getMonth() + 1)

  // API Hook，鎖定查詢二壘 ('2B')
  const { data, isLoading, isError, error } = useGetPlayerDataByPosition(year, '2B')

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear)
    setMonth(newMonth)
  }

  const processedData = React.useMemo(() => {
    if (!data) return { calendarData: [], playerStats: [] }
    return {
      calendarData: data.calendar_data.map((d) => ({
        date: d.date,
        starterPlayerName: d.starter_player_name,
      })),
      playerStats: data.player_stats,
    }
  }, [data])

  if (isLoading) {
    return <div className={styles.loadingContainer}>讀取中...</div>
  }

  if (isError) {
    return (
      <div className={styles.loadingContainer}>
        讀取失敗: {error instanceof Error ? error.message : '未知錯誤'}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.sectionTitle}>先發二壘手月曆</h2>
        <PositionCalendarChart
          data={processedData.calendarData}
          year={year}
          month={month}
          onMonthChange={handleMonthChange}
        />
      </div>
      <div>
        <h2 className={styles.sectionTitle}>球員攻守數據</h2>
        <DataTable columns={columns} data={processedData.playerStats} />
      </div>
    </div>
  )
}
