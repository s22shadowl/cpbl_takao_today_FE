import type { components } from '@/types/generated-api'

type GameResult = components['schemas']['GameResult']

// 定義球員生涯數據的型別，方便共用
export interface CareerData {
  total_homeruns: number
  total_PA: number
  total_game_played: number
  debut_date: string
}

/**
 * 計算百轟里程碑相關數據。
 * @param careerData - 球員的生涯數據。
 * @returns 計算後的里程碑物件，或在無法計算時回傳 null。
 */
export const calculateMilestone = (careerData: CareerData) => {
  // ... (此函式內容未變動，保持原樣)
  // TODO:
  const { total_homeruns, total_PA, total_game_played, debut_date } = careerData
  if (total_homeruns <= 0) return null
  const nextMilestone = (Math.floor(total_homeruns / 100) + 1) * 100
  const homerunsNeeded = nextMilestone - total_homeruns
  const today = new Date()
  const debut = new Date(debut_date)
  const daysSinceDebut = Math.floor((today.getTime() - debut.getTime()) / (1000 * 3600 * 24))
  const avgDaysPerHR = daysSinceDebut / total_homeruns
  const avgGamesPerHR = total_game_played / total_homeruns
  const avgPAPerHR = total_PA / total_homeruns
  const estimatedDays = Math.ceil(homerunsNeeded * avgDaysPerHR)
  const estimatedGames = Math.ceil(homerunsNeeded * avgGamesPerHR)
  const estimatedPA = Math.ceil(homerunsNeeded * avgPAPerHR)
  const estimatedDate = new Date(today)
  estimatedDate.setDate(today.getDate() + estimatedDays)
  const estimatedDateString = estimatedDate.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return {
    total_homeruns,
    nextMilestone,
    homerunsNeeded,
    estimatedDays,
    estimatedGames,
    estimatedPA,
    estimatedDateString,
  }
}

/**
 * 根據目標球隊，解析比賽的對手與勝負結果。
 * @param game - 單場比賽的 GameResult 物件。
 * @param targetTeam - 目標球隊的名稱。
 * @returns 包含對手名稱和比賽結果 ('勝利', '落敗', '平手') 的物件。
 */
export const getGameResultInfo = (game: GameResult, targetTeam: string) => {
  const { home_team, away_team, home_score, away_score } = game
  const isHomeTeam = home_team === targetTeam
  const opponent = isHomeTeam ? away_team : home_team

  let result = '平手'
  if (home_score === null || away_score === null) {
    result = '-' // 分數未定時
  } else if (home_score! > away_score!) {
    result = isHomeTeam ? '勝利' : '落敗'
  } else if (away_score! > home_score!) {
    result = isHomeTeam ? '落敗' : '勝利'
  }

  return { opponent, result }
}
