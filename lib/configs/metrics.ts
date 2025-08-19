// /lib/configs/metrics.ts

/**
 * 定義單一數據指標的設定結構
 */
export interface MetricConfig {
  /**
   * 對應 PlayerSeasonStatsHistory 中的 key
   */
  key:
    | 'hits'
    | 'homeruns'
    | 'rbi'
    | 'runs_scored'
    | 'strikeouts'
    | 'walks'
    | 'stolen_bases'
    | 'total_bases'
    | 'avg'
    | 'obp'
    | 'slg'
    | 'ops'
  /**
   * 在 UI 上顯示的名稱
   */
  label: string
  /**
   * 數據類型，用於分組或特殊處理
   */
  type: 'cumulative' | 'ratio'
  /**
   * 對應圖表的 Y 軸 ID，用於多Y軸顯示
   * 'left' 用於計數型數據 (如: 安打)，'right' 用於比率型數據 (如: 打擊率)
   */
  yAxisId: 'left' | 'right'
  /**
   * 格式化數值的函式，用於 Tooltip 或 Y 軸標籤
   * @param value - 原始數值
   * @returns 格式化後的字串
   */
  formatter: (value: number | null | undefined) => string
}

/**
 * 可供賽季趨勢圖表選擇的所有數據指標設定
 */
export const PLAYER_STATS_METRICS: MetricConfig[] = [
  // --- 每日比率型 ---
  {
    key: 'avg',
    label: '打擊率 (AVG)',
    type: 'ratio',
    yAxisId: 'right',
    formatter: (value) => (value ? value.toFixed(3) : '.000'),
  },
  {
    key: 'ops',
    label: '攻擊指數 (OPS)',
    type: 'ratio',
    yAxisId: 'right',
    formatter: (value) => (value ? value.toFixed(3) : '.000'),
  },
  {
    key: 'obp',
    label: '上壘率 (OBP)',
    type: 'ratio',
    yAxisId: 'right',
    formatter: (value) => (value ? value.toFixed(3) : '.000'),
  },
  {
    key: 'slg',
    label: '長打率 (SLG)',
    type: 'ratio',
    yAxisId: 'right',
    formatter: (value) => (value ? value.toFixed(3) : '.000'),
  },
  // --- 累積計數型 ---
  {
    key: 'hits',
    label: '安打 (H)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'homeruns',
    label: '全壘打 (HR)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'rbi',
    label: '打點 (RBI)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'runs_scored',
    label: '得分 (R)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'strikeouts',
    label: '三振 (SO)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'walks',
    label: '保送 (BB)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'stolen_bases',
    label: '盜壘 (SB)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
  {
    key: 'total_bases',
    label: '壘打數 (TB)',
    type: 'cumulative',
    yAxisId: 'left',
    formatter: (value) => String(value ?? 0),
  },
]
