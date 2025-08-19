// /app/season-trends/page.tsx

'use client'

import * as React from 'react'
import { addDays } from 'date-fns'
import { Check } from 'lucide-react'
import * as Collapsible from '@radix-ui/react-collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { useGetPlayersSeasonStats } from '@/hooks/useGetPlayersSeasonStats'
import { TRENDING_PLAYERS } from '@/lib/constants'
import { PLAYER_STATS_METRICS } from '@/lib/configs/metrics'
import { DateRangePicker } from '@/components/features/DateRangePicker'
import { StatsTrendChart } from '@/components/features/StatsTrendChart'
import { DataTable, ColumnDef } from '@/components/ui/DataTable'
import * as styles from './page.css'
import type { components } from '@/types/generated-api'

type PlayerSeasonStatsHistory = components['schemas']['PlayerSeasonStatsHistory']

// --- UI 控制器元件 ---
const MetricSelector = ({
  selectedMetrics,
  onSelectionChange,
}: {
  selectedMetrics: string[]
  onSelectionChange: (newSelection: string[]) => void
}) => {
  const handleSelect = (metricKey: string) => {
    const newSelection = selectedMetrics.includes(metricKey)
      ? selectedMetrics.filter((key) => key !== metricKey)
      : [...selectedMetrics, metricKey]

    if (newSelection.length > 3) {
      return
    }
    onSelectionChange(newSelection)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">選擇指標 ({selectedMetrics.length})</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>選擇最多3項指標</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PLAYER_STATS_METRICS.map((metric) => {
          const isSelected = selectedMetrics.includes(metric.key)
          return (
            <DropdownMenuItem
              key={metric.key}
              onSelect={(e: Event) => {
                e.preventDefault()
                handleSelect(metric.key)
              }}
              style={{ paddingLeft: '2rem' }} // 預留空間給 Check 圖示
            >
              {isSelected && <Check size={16} style={{ position: 'absolute', left: '0.5rem' }} />}
              {metric.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// --- 主頁面元件 ---
export default function SeasonTrendsPage() {
  const [dateRange, setDateRange] = React.useState<{ start: Date; end: Date }>(() => {
    const end = new Date()
    const start = addDays(end, -29)
    return { start, end }
  })

  const [selectedPlayer, setSelectedPlayer] = React.useState<string>(TRENDING_PLAYERS[0])
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>(['avg', 'ops'])

  const { data, isLoading, isError, error } = useGetPlayersSeasonStats({
    playerNames: TRENDING_PLAYERS,
    dateRange,
  })

  const currentPlayerStats = React.useMemo(
    () => (data && selectedPlayer ? data[selectedPlayer] || [] : []),
    [data, selectedPlayer]
  )

  const activeChartMetrics = React.useMemo(
    () => PLAYER_STATS_METRICS.filter((metric) => selectedMetrics.includes(metric.key)),
    [selectedMetrics]
  )

  const tableColumns: ColumnDef<PlayerSeasonStatsHistory>[] = React.useMemo(
    () => [
      { accessorKey: 'data_retrieved_date', header: '日期' },
      { accessorKey: 'hits', header: '安打' },
      { accessorKey: 'at_bats', header: '打數' },
      { accessorKey: 'homeruns', header: '全壘打' },
      { accessorKey: 'rbi', header: '打點' },
      { accessorKey: 'avg', header: '打擊率', cell: ({ row }) => row.avg?.toFixed(3) ?? '.000' },
      { accessorKey: 'ops', header: '攻擊指數', cell: ({ row }) => row.ops?.toFixed(3) ?? '.000' },
    ],
    []
  )

  const renderContent = () => {
    if (isLoading) return <div className={styles.loadingOrErrorState}>Loading...</div>
    if (isError) {
      return (
        <div className={styles.loadingOrErrorState}>
          Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
        </div>
      )
    }
    if (data) {
      return (
        <div className={styles.contentContainer}>
          <StatsTrendChart data={currentPlayerStats} metrics={activeChartMetrics} />

          <Collapsible.Root>
            <Collapsible.Trigger asChild>
              <button className={styles.collapsibleTrigger}>顯示/隱藏 每日詳細數據</button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div className={styles.collapsibleContent}>
                <DataTable data={currentPlayerStats} columns={tableColumns} />
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>賽季趨勢</h1>
        <div className={styles.controlsContainer}>
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px' }}
          >
            {TRENDING_PLAYERS.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
          <MetricSelector
            selectedMetrics={selectedMetrics}
            onSelectionChange={setSelectedMetrics}
          />
          <DateRangePicker onRangeChange={setDateRange} />
        </div>
      </header>
      <main>{renderContent()}</main>
    </div>
  )
}
