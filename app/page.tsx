// app/page.tsx

import { Scoreboard } from '@/components/features/ScoreBoard'
import { PlayerDailyPerformance } from '@/components/features/PlayerDailyPerformance'
import { Card } from '@/components/ui/Card'
import * as styles from './page.css'

export default function HomePage() {
  return (
    // The space-y behavior is now handled by the styles.section class
    // applied to each Card.
    <div>
      <Card className={styles.section}>
        <h1 className="text-3xl font-bold mb-6 border-b pb-2">本日戰報</h1>
        <Scoreboard />
      </Card>

      <Card className={styles.section}>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">本日焦點球員</h2>
        <PlayerDailyPerformance />
      </Card>
    </div>
  )
}
