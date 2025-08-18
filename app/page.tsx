import { Scoreboard } from '@/components/features/ScoreBoard'
import { PlayerDailyPerformance } from '@/components/features/PlayerDailyPerformance'

export default function HomePage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="space-y-12">
        <section>
          <h1 className="text-3xl font-bold mb-6 border-b pb-2">本日戰報</h1>
          <Scoreboard />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">本日焦點球員</h2>
          <PlayerDailyPerformance />
        </section>
      </div>
    </main>
  )
}
