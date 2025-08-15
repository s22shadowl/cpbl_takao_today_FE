import { StatsTrendChart } from '@/components/features/StatsTrendChart'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

// 準備一個給 StatsTrendChart 使用的假數據
const trendData = [
  { date: '2024-05-01', value: 2 },
  { date: '2024-05-02', value: 3 },
  { date: '2024-05-03', value: 2 },
  { date: '2024-05-04', value: 5 },
  { date: '2024-05-05', value: 4 },
  { date: '2024-05-06', value: 6 },
  { date: '2024-05-07', value: 7 },
]

export default function UITestPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>UI 元件庫測試頁面</h1>

      {/* Button 元件驗證 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Button 元件</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="default">
            Primary Default
          </Button>
          <Button variant="secondary" size="default">
            Secondary Default
          </Button>
          <Button variant="destructive" size="default">
            Destructive Default
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
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>登出</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Tabs 元件驗證 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Tabs 元件</h2>
        <Tabs defaultValue="tab1" style={{ width: '100%' }}>
          <TabsList>
            <TabsTrigger value="tab1">全壘打追蹤</TabsTrigger>
            <TabsTrigger value="tab2">滿壘時表現</TabsTrigger>
            <TabsTrigger value="tab3">火力連線</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p>這裡是「全壘打追蹤」的內容。</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>這裡是「滿壘時表現」的內容。</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>這裡是「火力連線」的內容。</p>
          </TabsContent>
        </Tabs>
      </section>

      {/* StatsTrendChart 元件驗證 */}
      <section>
        <h2 style={{ marginBottom: '1rem' }}>StatsTrendChart 元件</h2>
        <StatsTrendChart data={trendData} dataKeyName="單週全壘打" />
      </section>
    </div>
  )
}
