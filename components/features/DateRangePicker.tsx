// /components/features/DateRangePicker.tsx

'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { addDays, startOfYear, format } from 'date-fns'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css' // 引入基礎樣式

import * as Popover from '@radix-ui/react-popover'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import * as styles from './DateRangePicker.css'

type DateRangePickerProps = {
  onRangeChange: (range: { start: Date; end: Date }) => void
}

type Preset = '7d' | '30d' | 'season'

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onRangeChange }) => {
  const [label, setLabel] = React.useState('最近 30 天')
  const [popoverOpen, setPopoverOpen] = React.useState(false)
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)

  React.useEffect(() => {
    // 初始化預設值
    const today = new Date()
    const start = addDays(today, -29)
    onRangeChange({ start, end: today })
    setRange({ from: start, to: today })
  }, [onRangeChange])

  const handlePresetSelect = (preset: Preset) => {
    const today = new Date()
    let start: Date
    let newLabel = ''

    switch (preset) {
      case '7d':
        start = addDays(today, -6)
        newLabel = '最近 7 天'
        break
      case 'season':
        start = startOfYear(today) // 假設賽季從年初開始
        newLabel = '本賽季'
        break
      case '30d':
      default:
        start = addDays(today, -29)
        newLabel = '最近 30 天'
        break
    }

    setRange({ from: start, to: today })
    setLabel(newLabel)
    onRangeChange({ start, end: today })
  }

  const handleCustomRangeSelect = (selectedRange: DateRange | undefined) => {
    setRange(selectedRange)
    if (selectedRange?.from && selectedRange?.to) {
      onRangeChange({ start: selectedRange.from, end: selectedRange.to })
      setLabel(
        `${format(selectedRange.from, 'yyyy-MM-dd')} ~ ${format(selectedRange.to, 'yyyy-MM-dd')}`
      )
      setPopoverOpen(false) // 選擇完畢後關閉
    }
  }

  return (
    <Popover.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className={styles.triggerButton}>
            <span>{label}</span>
            <CalendarIcon size={16} className={styles.calendarIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handlePresetSelect('7d')}>最近 7 天</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handlePresetSelect('30d')}>最近 30 天</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handlePresetSelect('season')}>本賽季</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Popover.Trigger asChild>
            {/* onSelect 需 preventDefault 以免觸發 DropdownMenu 的關閉事件 */}
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>自訂範圍...</DropdownMenuItem>
          </Popover.Trigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <Popover.Portal>
        <Popover.Content className={styles.dayPicker} sideOffset={5} align="start">
          <DayPicker
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={handleCustomRangeSelect}
            numberOfMonths={2}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
