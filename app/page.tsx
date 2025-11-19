// /app/page.tsx

import { Scoreboard } from '@/components/features/ScoreBoard'
import { PlayerDailyPerformance } from '@/components/features/PlayerDailyPerformance'
import * as styles from './page.css'

export default function HomePage() {
  return (
    <div>
      <h1 className={styles.pageTitle}>數據總覽</h1>

      <section className={styles.section}>
        <h2>本日戰報</h2>
        <Scoreboard />
      </section>

      <section className={styles.section}>
        <h2>本日焦點球員</h2>
        <PlayerDailyPerformance />
      </section>
    </div>
  )
}
