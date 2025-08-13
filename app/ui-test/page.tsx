// app/ui-test/page.tsx

import { PlayerStatsChart } from '@/components/features/PlayerStatsChart'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

export default function UITestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>UI 元件庫測試頁面</h1>

      {/* Button 元件驗證 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Button 元件</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">
            Primary SM
          </Button>
          <Button variant="primary" size="default">
            Primary Default
          </Button>
          <Button variant="primary" size="lg">
            Primary LG
          </Button>

          <Button variant="secondary" size="sm">
            Secondary SM
          </Button>
          <Button variant="secondary" size="default">
            Secondary Default
          </Button>
          <Button variant="secondary" size="lg">
            Secondary LG
          </Button>

          <Button variant="destructive" size="sm">
            Destructive SM
          </Button>
          <Button variant="destructive" size="default">
            Destructive Default
          </Button>
          <Button variant="destructive" size="lg">
            Destructive LG
          </Button>
        </div>
      </section>

      {/* DropdownMenu 元件驗證 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>DropdownMenu 元件</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary">打開選單</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>個人資料</DropdownMenuItem>
            <DropdownMenuItem>帳單</DropdownMenuItem>
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>登出</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* asChild 功能驗證 */}
      <section>
        <h2 style={{ marginBottom: '1rem' }}>Button `asChild` 功能</h2>
        <Button asChild>
          <a href="https://www.cpbl.com.tw" target="_blank" rel="noopener noreferrer">
            CPBL 官網連結
          </a>
        </Button>
      </section>
      <section>
        <PlayerStatsChart
          data={[
            { name: '全壘打', value: 29 },
            { name: '打點', value: 88 },
            { name: '安打', value: 135 },
            { name: '打擊率', value: 0.32 }, // 打擊率通常是小數
            { name: '盜壘', value: 15 },
          ]}
        />
      </section>
    </div>
  )
}
