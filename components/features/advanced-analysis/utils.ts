// components/features/advanced-analysis/utils.ts

import type { components } from '@/types/generated-api'

type GameResult = components['schemas']['GameResult']
type PlayerCareerStats = components['schemas']['PlayerCareerStats']

/**
 * 計算百轟里程碑相關數據。
 * @param careerData - 球員的生涯數據 (來自 API)。
 * @returns 計算後的里程碑物件，或在無法計算時回傳 null。
 */
export const calculateMilestone = (careerData: PlayerCareerStats) => {
  const { homeruns, plate_appearances, games_played, debut_date } = careerData

  if (homeruns <= 0 || !debut_date) {
    return null
  }

  const nextMilestone = (Math.floor(homeruns / 100) + 1) * 100
  const homerunsNeeded = nextMilestone - homeruns

  const today = new Date()
  const debut = new Date(debut_date)
  const daysSinceDebut = Math.floor((today.getTime() - debut.getTime()) / (1000 * 3600 * 24))

  // 計算平均值
  const avgDaysPerHR = parseFloat((daysSinceDebut / homeruns).toFixed(1))
  const avgGamesPerHR = parseFloat((games_played / homeruns).toFixed(1))
  const avgPAPerHR = parseFloat((plate_appearances / homeruns).toFixed(1))

  return {
    debut_date,
    total_homeruns: homeruns,
    nextMilestone,
    homerunsNeeded,
    avgDaysPerHR,
    avgGamesPerHR,
    avgPAPerHR,
  }
}

/**
 * 根據目標球隊，解析比賽的對手與勝負結果。
 * @param game - 單場比賽的 GameResult 物件。
 * @param targetTeam - 目標球隊的名稱。
 * @returns 包含對手名稱和比賽結果 ('勝利', '落敗', '平手') 和分數 的物件。
 */
export const getGameResultInfo = (game: GameResult, targetTeam: string) => {
  const { home_team, away_team, home_score, away_score } = game
  const isHomeTeam = home_team === targetTeam
  const opponent = isHomeTeam ? away_team : home_team
  let result = '平手'
  let score = '- : -'

  if (home_score !== null && away_score !== null) {
    score = `${home_score} : ${away_score}`
    if (home_score! > away_score!) {
      result = isHomeTeam ? '勝利' : '落敗'
    } else if (away_score! > home_score!) {
      result = isHomeTeam ? '落敗' : '勝利'
    }
  } else {
    result = '-'
  }

  return { opponent, result, score }
}
