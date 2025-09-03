// /app/advanced-analysis/page.tsx

'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { HomerunTrackingTab } from '@/components/features/advanced-analysis/HomerunTrackingTab'
import { SituationalAtBatsTab } from '@/components/features/advanced-analysis/SituationalAtBatsTab'
import { IbbImpactTab } from '@/components/features/advanced-analysis/IbbImpactTab'
import { NPBStreaksTab } from '@/components/features/advanced-analysis/NPBStreaksTab'
import { RaccoonTrioTab } from '@/components/features/advanced-analysis/RaccoonTrioTab'
import { PositionInfieldTab } from '@/components/features/advanced-analysis/PositionInfieldTab'
import { situational_at_bats_tab_players, scoring_position_tab_players } from '@/lib/constants'
import { Card } from '@/components/ui/Card' // 1. 匯入 Card 元件
import * as styles from './page.css'

// 頁籤設定資料
const analysisTabs = [
  { value: 'homerun-tracking', title: '百轟倒數' },
  { value: 'position-infield', title: '二壘大風吹' },
  { value: 'bases-loaded', title: '滿壘大王' },
  { value: 'scoring-position', title: '得點圈之鬼' },
  { value: 'ibb-impact', title: 'IBB大哥' },
  { value: 'npb-streaks', title: '日職三連星' },
  { value: 'raccoon-trio', title: '浣熊三兄弟' },
]

/**
 * 進階數據分析頁面。
 */
const AdvancedAnalysisPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>進階數據分析</h1>

      {/* 2. 將 Card 元件包裹在 Tabs 元件外層 */}
      <Card>
        <Tabs defaultValue={analysisTabs[0].value}>
          <TabsList>
            {analysisTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* 全壘打追蹤頁籤 */}
          <TabsContent value="homerun-tracking">
            <HomerunTrackingTab />
          </TabsContent>

          {/* 二壘大風吹頁籤 */}
          <TabsContent value="position-infield">
            <PositionInfieldTab />
          </TabsContent>

          {/* 滿壘大王頁籤 */}
          <TabsContent value="bases-loaded">
            <SituationalAtBatsTab
              players={situational_at_bats_tab_players}
              situation="bases_loaded"
            />
          </TabsContent>

          {/* 得點圈表現頁籤 */}
          <TabsContent value="scoring-position">
            <SituationalAtBatsTab
              players={scoring_position_tab_players}
              situation="scoring_position"
            />
          </TabsContent>

          {/* 關鍵保送分析頁籤 */}
          <TabsContent value="ibb-impact">
            <IbbImpactTab />
          </TabsContent>

          {/* 日職三連星頁籤 */}
          <TabsContent value="npb-streaks">
            <NPBStreaksTab />
          </TabsContent>

          {/* 浣熊三兄弟頁籤 */}
          <TabsContent value="raccoon-trio">
            <RaccoonTrioTab />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

export default AdvancedAnalysisPage
