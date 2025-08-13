// app/games/page.tsx
'use client'

import { useGetGames } from '@/hooks/useGetGames'

const GamesPage = () => {
  // 為了測試，我們傳入一個指定的日期
  const { data: games, isLoading, isError, error } = useGetGames('2025-04-02')

  if (isLoading) {
    return <div>載入中... (日期: 2025-04-02)</div>
  }

  if (isError) {
    return <div>發生錯誤: {error.message}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">比賽列表 (2025-04-02)</h1>
      <ul>
        {games?.map((game) => (
          <li key={game.id} className="border-b p-2">
            {game.game_time}: {game.away_team} @ {game.home_team} ({game.away_score} -{' '}
            {game.home_score})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GamesPage
