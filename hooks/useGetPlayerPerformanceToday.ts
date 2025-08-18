// hooks/useGetPlayerPerformanceToday.ts

import { useGetTodayDashboard } from './useGetGamesToday'
import type { PlayerSummary, Game } from './useGetGamesToday'

const FOCUS_PLAYER_NAMES = ['王柏融', '吳念庭', '魔鷹'] // 根據規格，設定焦點球員姓名列表

/**
 * 從儀表板資料中，篩選出所有焦點球員的表現數據。
 * 如果當日無比賽，則會嘗試從上一場比賽的資料中尋找。
 * @returns {PlayerSummary[]} 一個包含所有找到的焦點球員表現的陣列。
 */
export const useGetPlayerPerformanceToday = () => {
  const { data: dashboardData, isLoading, isError, error, isSuccess } = useGetTodayDashboard()

  const performances: PlayerSummary[] = []

  // 只要成功取得資料，就開始尋找球員表現
  if (isSuccess && dashboardData) {
    const foundPlayerNames = new Set<string>() // 用於防止重複添加同一位球員

    // 尋找並收集球員表現的輔助函式
    const collectPerformances = (games: Game[]) => {
      for (const game of games) {
        for (const player of game.player_summaries) {
          // 如果球員在焦點名單內，且尚未被加入結果中
          if (
            FOCUS_PLAYER_NAMES.includes(player.player_name) &&
            !foundPlayerNames.has(player.player_name)
          ) {
            performances.push(player)
            foundPlayerNames.add(player.player_name)
          }
        }
      }
    }

    if (dashboardData.status === 'HAS_TODAY_GAMES') {
      collectPerformances(dashboardData.games)
    } else if (dashboardData.status === 'NO_TODAY_GAMES' && dashboardData.last_target_team_game) {
      // 如果今天沒比賽，就從上次比賽的資料找
      collectPerformances([dashboardData.last_target_team_game])
    }
  }

  console.log(performances)

  return {
    data: performances,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
