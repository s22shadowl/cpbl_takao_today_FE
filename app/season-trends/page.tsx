// /app/season-trends/page.tsx

'use client'

import * as React from 'react'
import { addDays, startOfMonth } from 'date-fns'
import { Check, Loader2, Menu, ChevronDown } from 'lucide-react' // 引入 ChevronDown icon
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Select from '@radix-ui/react-select' // 引入 Radix Select
import { DateRange } from 'react-day-picker'
import { type ColumnDef } from '@tanstack/react-table'
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
import { useGetSeasonGames } from '@/hooks/useGetSeasonGames'
import { useIsMobile } from '@/hooks/useIsMobile'
import { TARGET_TEAM_PLAYERS } from '@/lib/constants'
import { PLAYER_STATS_METRICS } from '@/lib/configs/metrics'
import { FEATURE_FLAGS } from '@/lib/configs/featureFlags'
import { DateRangePicker } from '@/components/features/DateRangePicker'
import { StatsTrendChart } from '@/components/features/StatsTrendChart'
import {
  EventCalendarChart,
  type CalendarDayData,
} from '@/components/features/charts/EventCalendarChart'
import { DataTable } from '@/components/ui/DataTable'
import { Card } from '@/components/ui/Card'
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
    if (newSelection.length > 3) return
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
              style={{ paddingLeft: '2rem' }}
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

// 修改：使用 Radix Select 重構 Controls 元件
const Controls = ({
  selectedPlayer,
  onPlayerChange,
  selectedMetrics,
  onMetricsChange,
  dateRange,
  onDateChange,
}: {
  selectedPlayer: string
  onPlayerChange: (value: string) => void
  selectedMetrics: string[]
  onMetricsChange: (value: string[]) => void
  dateRange: DateRange | undefined
  onDateChange: (value: DateRange | undefined) => void
}) => (
  <>
    <Select.Root value={selectedPlayer} onValueChange={onPlayerChange}>
      <Select.Trigger className={styles.selectTrigger} aria-label="選擇球員">
        <Select.Value placeholder="選擇球員" />
        <Select.Icon className={styles.selectIcon}>
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.selectContent} position="popper" sideOffset={5}>
          <Select.Viewport className={styles.selectViewport}>
            {TARGET_TEAM_PLAYERS.map((player) => (
              <Select.Item key={player} value={player} className={styles.selectItem}>
                <Select.ItemText>{player}</Select.ItemText>
                <Select.ItemIndicator className={styles.selectItemIndicator}>
                  <Check size={14} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    <MetricSelector selectedMetrics={selectedMetrics} onSelectionChange={onMetricsChange} />
    <DateRangePicker value={dateRange} onChange={onDateChange} />
  </>
)

// --- 主頁面元件 ---
export default function SeasonTrendsPage() {
  const isMobile = useIsMobile()
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(() => {
    const end = new Date()
    const start = addDays(end, -29)
    return { from: start, to: end }
  })

  const [selectedPlayer, setSelectedPlayer] = React.useState<string>(TARGET_TEAM_PLAYERS[0])
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>(['avg', 'ops'])

  const apiDateRange = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      const end = new Date()
      const start = addDays(end, -29)
      return { start, end }
    }
    return { start: dateRange.from, end: dateRange.to }
  }, [dateRange])

  const {
    data: PlayersSeasonData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetPlayersSeasonStats({
    playerNames: TARGET_TEAM_PLAYERS,
    dateRange: apiDateRange,
  })

  const { data: seasonGames } = useGetSeasonGames({
    year: apiDateRange.start.getFullYear(),
    enabled: FEATURE_FLAGS.enableSeasonTrendsCalendar,
  })

  const currentPlayerStats = React.useMemo(() => {
    if (!PlayersSeasonData || !selectedPlayer) return []
    const playerData = PlayersSeasonData[selectedPlayer] || []
    return [...playerData].sort(
      (a, b) =>
        new Date(a.data_retrieved_date || 0).getTime() -
        new Date(b.data_retrieved_date || 0).getTime()
    )
  }, [PlayersSeasonData, selectedPlayer])

  const calendarData = React.useMemo((): CalendarDayData[] => {
    if (
      !FEATURE_FLAGS.enableSeasonTrendsCalendar ||
      !seasonGames ||
      !PlayersSeasonData ||
      !selectedPlayer
    ) {
      return []
    }

    const playerStatsMap = new Map<string, PlayerSeasonStatsHistory>()
    if (PlayersSeasonData[selectedPlayer]) {
      PlayersSeasonData[selectedPlayer].forEach((stat) => {
        if (stat.data_retrieved_date) {
          playerStatsMap.set(stat.data_retrieved_date, stat)
        }
      })
    }

    return seasonGames.map((game) => {
      const playerStat = playerStatsMap.get(game.game_date)
      return {
        date: game.game_date,
        isGameDay: true,
        hasAppearance: !!playerStat && (playerStat.at_bats ?? 0) > 0,
        isHighlighted: !!playerStat && (playerStat.hits ?? 0) > 0,
        payload: playerStat,
      }
    })
  }, [seasonGames, PlayersSeasonData, selectedPlayer])

  const activeChartMetrics = React.useMemo(
    () => PLAYER_STATS_METRICS.filter((metric) => selectedMetrics.includes(metric.key)),
    [selectedMetrics]
  )

  const tableColumns = React.useMemo<ColumnDef<PlayerSeasonStatsHistory>[]>(() => {
    const dateColumn: ColumnDef<PlayerSeasonStatsHistory> = {
      accessorKey: 'data_retrieved_date',
      header: '日期',
    }

    const metricColumns: ColumnDef<PlayerSeasonStatsHistory>[] = activeChartMetrics.map(
      (metric) => ({
        accessorKey: metric.key,
        header: metric.label,
        cell: ({ row }) => {
          const value = row.getValue(metric.key)
          // The formatter function from metrics config is expected to handle the formatting.
          return metric.formatter(value as number)
        },
      }),
    )

    return [dateColumn, ...metricColumns]
  }, [activeChartMetrics])

  const renderContent = () => {
    if (isLoading) return <div className={styles.loadingOrErrorState}>Loading...</div>
    if (isError)
      return (
        <div className={styles.loadingOrErrorState}>
          Error: {error instanceof Error ? error.message : 'An unknown error occurred'}
        </div>
      )
    if (PlayersSeasonData) {
      return (
        <div className={styles.dataDisplayContainer}>
          {isFetching && (
            <div className={styles.loadingOverlay} data-testid="loading-spinner">
              <Loader2 size={32} className={styles.spinner} />
            </div>
          )}
          {FEATURE_FLAGS.enableSeasonTrendsCalendar ? (
            <div className={styles.contentGrid}>
              <div className={styles.calendarContainer}>
                <EventCalendarChart
                  title={`${selectedPlayer} 出賽日曆`}
                  subtitle="綠色代表有安打，黃色代表有出賽"
                  data={calendarData}
                  initialMonth={startOfMonth(apiDateRange.start)}
                  showNavigators={false}
                  renderTooltip={(dayData) => {
                    const stats = dayData.payload as PlayerSeasonStatsHistory | undefined
                    if (!stats) return <div>{dayData.date}</div>
                    return (
                      <div>
                        <div>{dayData.date}</div>
                        <div>
                          {stats.hits ?? 0} H / {stats.at_bats ?? 0} AB
                        </div>
                        {(stats.homeruns ?? 0) > 0 && <div>{stats.homeruns} HR</div>}
                      </div>
                    )
                  }}
                />
              </div>
              <div className={styles.mainContentContainer}>
                <StatsTrendChart data={currentPlayerStats} metrics={activeChartMetrics} />
                <div className={styles.collapsibleWrapper}>
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
              </div>
            </div>
          ) : (
            <div className={styles.mainContentContainer}>
              <StatsTrendChart data={currentPlayerStats} metrics={activeChartMetrics} />
              <div className={styles.collapsibleWrapper}>
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
            </div>
          )}
        </div>
      )
    }
    return null
  }

  const controlProps = {
    selectedPlayer,
    onPlayerChange: setSelectedPlayer,
    selectedMetrics,
    onMetricsChange: setSelectedMetrics,
    dateRange,
    onDateChange: setDateRange,
  }

  return (
    <div className={styles.container}>
      <Card>
        <header className={styles.header}>
          <h1 className={styles.title}>賽季趨勢</h1>
          {isMobile ? (
            <div className={styles.mobileControls}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className={styles.mobileMenuTrigger}>
                  <Button variant="ghost" size="icon">
                    <Menu />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className={styles.dropdownContent}>
                    <Controls {...controlProps} />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className={styles.desktopControls}>
              <Controls {...controlProps} />
            </div>
          )}
        </header>
        <main>{renderContent()}</main>
      </Card>
    </div>
  )
}
