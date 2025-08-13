import { style, globalStyle } from '@vanilla-extract/css'

/**
 * 圖表外層容器的樣式
 */
export const chartContainer = style({
  width: '100%',
  maxWidth: '700px',
  margin: '2rem auto',
  padding: '1.5rem',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
})

/**
 * Recharts Tooltip 的外層 Wrapper。
 * 我們只定義一個空的 class name，並使用 globalStyle 來覆寫 Recharts 的預設樣式。
 */
export const tooltipWrapper = style({})

// Recharts 的 Tooltip 預設 class name 是 .recharts-default-tooltip
// 我們使用 globalStyle 來選取並設定其樣式。
globalStyle(`${tooltipWrapper} .recharts-default-tooltip`, {
  backgroundColor: 'rgba(255, 255, 255, 0.9) !important',
  backdropFilter: 'blur(4px)',
  border: '1px solid #d1d5db !important',
  borderRadius: '8px !important',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15) !important',
  padding: '0.5rem 1rem !important',
})

// Tooltip 內容標籤的樣式
globalStyle(`${tooltipWrapper} .recharts-tooltip-label`, {
  fontWeight: 'bold',
  color: '#1f2937',
  marginBottom: '0.5rem !important',
})
