'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { addDays, startOfYear, format, isSameDay } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import * as Popover from '@radix-ui/react-popover'
import { Button } from '@/components/ui/Button'
import { useIsMobile } from '@/hooks/useIsMobile' // 引入 useIsMobile
import * as styles from './DateRangePicker.css'

const PRESET_RANGES = [
  {
    id: '7d',
    label: '最近 7 天',
    getRange: () => {
      const today = new Date()
      return { from: addDays(today, -6), to: today }
    },
  },
  {
    id: '30d',
    label: '最近 30 天',
    getRange: () => {
      const today = new Date()
      return { from: addDays(today, -29), to: today }
    },
  },
  {
    id: 'season',
    label: '本賽季',
    getRange: () => {
      const today = new Date()
      return { from: startOfYear(today), to: today }
    },
  },
] as const

type PresetId = (typeof PRESET_RANGES)[number]['id']

const generateLabel = (range: DateRange | undefined): string => {
  if (!range || !range.from) {
    return '選擇日期'
  }

  for (const preset of PRESET_RANGES) {
    const presetRange = preset.getRange()
    if (
      presetRange.from &&
      presetRange.to &&
      isSameDay(range.from, presetRange.from) &&
      range.to &&
      isSameDay(range.to, presetRange.to)
    ) {
      return preset.label
    }
  }

  if (range.to) {
    return `${format(range.from, 'yyyy-MM-dd')} ~ ${format(range.to, 'yyyy-MM-dd')}`
  }

  return format(range.from, 'yyyy-MM-dd')
}

type DateRangePickerProps = {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  className?: string
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange, className }) => {
  const isMobile = useIsMobile() // 呼叫 hook
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  const handlePresetSelect = React.useCallback(
    (presetId: PresetId) => {
      const preset = PRESET_RANGES.find((p) => p.id === presetId)
      if (preset) {
        onChange(preset.getRange())
        setPopoverOpen(false)
      }
    },
    [onChange]
  )

  const handleCustomRangeSelect = React.useCallback(
    (selectedRange: DateRange | undefined) => {
      onChange(selectedRange)
      if (selectedRange?.from && selectedRange?.to) {
        setPopoverOpen(false)
      }
    },
    [onChange]
  )

  const label = generateLabel(value)

  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Popover.Trigger asChild>
        <Button variant="secondary" className={`${styles.triggerButton} ${className}`}>
          <span>{label}</span>
          <CalendarIcon size={16} className={styles.calendarIcon} />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.popoverContent} sideOffset={5} align="start">
          <div className={styles.presetsContainer}>
            {PRESET_RANGES.map((preset) => (
              <Button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className={styles.presetButton}
              >
                {preset.label}
              </Button>
            ))}
          </div>
          <div className={styles.separator} />
          <DayPicker
            mode="range"
            month={value?.from}
            selected={value}
            onSelect={handleCustomRangeSelect}
            numberOfMonths={isMobile ? 1 : 2} // 動態設定月份數量
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
