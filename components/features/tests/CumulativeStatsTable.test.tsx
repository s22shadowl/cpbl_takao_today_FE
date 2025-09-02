// components/features/tests/CumulativeStatsTable.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CumulativeStatsTable } from '../CumulativeStatsTable'
import type { components } from '@/types/generated-api'

type PlayerSeasonStatsHistory = components['schemas']['PlayerSeasonStatsHistory']

// Helper to create a fully-typed mock object
const createMockStatsHistory = (
  overrides: Partial<PlayerSeasonStatsHistory>
): PlayerSeasonStatsHistory => {
  const defaults: PlayerSeasonStatsHistory = {
    total_bases: 0,
    ground_outs: 0,
    fly_outs: 0,
    id: 0,
    player_name: '',
    team_name: 'N/A',
    games_played: 1,
    plate_appearances: 0,
    at_bats: 0,
    runs_scored: 0,
    hits: 0,
    singles: 0,
    doubles: 0,
    triples: 0,
    homeruns: 0,
    rbi: 0,
    walks: 0,
    intentional_walks: 0,
    hit_by_pitch: 0,
    strikeouts: 0,
    stolen_bases: 0,
    caught_stealing: 0,
    sacrifice_hits: 0,
    sacrifice_flies: 0,
    gidp: 0,
    avg: 0.0,
    obp: 0.0,
    slg: 0.0,
    ops: 0.0,
    created_at: new Date().toISOString(),
  }
  return { ...defaults, ...overrides }
}

const mockData: Record<string, PlayerSeasonStatsHistory[]> = {
  王柏融: [
    createMockStatsHistory({ at_bats: 4, hits: 2, homeruns: 1, rbi: 2 }),
    createMockStatsHistory({ at_bats: 5, hits: 1, homeruns: 0, rbi: 1 }),
  ],
  吳念庭: [
    createMockStatsHistory({ at_bats: 3, hits: 1, homeruns: 0, rbi: 0 }),
    createMockStatsHistory({ at_bats: 4, hits: 0, homeruns: 0, rbi: 0 }),
  ],
}

describe('CumulativeStatsTable', () => {
  it('should render table headers correctly', () => {
    render(<CumulativeStatsTable data={{}} />)
    expect(screen.getByRole('columnheader', { name: '球員' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '打數' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '安打' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '全壘打' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '打點' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: '打擊率' })).toBeInTheDocument()
  })

  it('should calculate and render cumulative stats correctly', () => {
    render(<CumulativeStatsTable data={mockData} />)
    const rows = screen.getAllByRole('row') // Includes header row

    // Check data for '王柏融'
    const poWangRow = rows[1]
    expect(poWangRow).toHaveTextContent('王柏融')
    expect(poWangRow).toHaveTextContent('9') // AB: 4 + 5
    expect(poWangRow).toHaveTextContent('3') // H: 2 + 1
    expect(poWangRow).toHaveTextContent('1') // HR: 1 + 0
    expect(poWangRow).toHaveTextContent('3') // RBI: 2 + 1
    expect(poWangRow).toHaveTextContent('.333') // AVG: 3 / 9

    // Check data for '吳念庭'
    const nienTingRow = rows[2]
    expect(nienTingRow).toHaveTextContent('吳念庭')
    expect(nienTingRow).toHaveTextContent('7') // AB: 3 + 4
    expect(nienTingRow).toHaveTextContent('1') // H: 1 + 0
    expect(nienTingRow).toHaveTextContent('0') // HR: 0 + 0
    expect(nienTingRow).toHaveTextContent('0') // RBI: 0 + 0
    expect(nienTingRow).toHaveTextContent('.143') // AVG: 1 / 7 = .1428...
  })

  it('should handle players with zero at-bats correctly', () => {
    const zeroAbData = {
      林立: [createMockStatsHistory({ at_bats: 0, hits: 0, homeruns: 0, rbi: 0 })],
    }
    render(<CumulativeStatsTable data={zeroAbData} />)
    const row = screen.getByRole('row', { name: /林立/ })
    expect(row).toHaveTextContent('.000') // AVG for 0 AB
  })
})
