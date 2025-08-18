// /styles/theme.css.ts

import { createTheme, createThemeContract } from '@vanilla-extract/css'

// =================================================================
// THEME CONTRACT (設計契約)
// =================================================================
// 此處定義了主題的「形狀」或「契約」。
// 所有主題 (淺色、深色等) 都必須符合此處定義的結構。
// 這確保了我們在不同主題間切換時，所有的 CSS 變數都能被正確對應。
// 未來的全域視覺 Token (如圓角、陰影等) 也應在此處新增。
// =================================================================

export const vars = createThemeContract({
  colors: {
    primary: null,
    secondary: null,
    background: null,
    surface: null,
    textPrimary: null,
    textSecondary: null,
    border: null,
    success: null,
    error: null,
    warning: null,
  },
  space: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: null,
  },
  fontFamily: {
    body: null,
  },
  fontSizes: {
    xs: null,
    sm: null,
    base: null,
    lg: null,
    xl: null,
    xxl: null,
  },
})

// =================================================================
// LIGHT THEME (淺色主題)
// =================================================================
// 這是「鋼鐵之翼」視覺主題的淺色模式實作。
// 當需要調整淺色模式的具體數值時，請在此處修改。
// =================================================================

export const lightTheme = createTheme(vars, {
  colors: {
    primary: '#045C44',
    secondary: '#D9A404',
    background: '#F7F7F7',
    surface: '#FFFFFF',
    textPrimary: '#1A202C',
    textSecondary: '#718096',
    border: '#E2E8F0',
    success: '#38A169',
    error: '#E53E3E',
    warning: '#DD6B20',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fontFamily: {
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
  },
})

// =================================================================
// DARK THEME (深色主題)
// =================================================================
// 這是「鋼鐵之翼」視覺主題的深色模式實作。
// 當需要調整深色模式的具體數值時，請在此處修改。
// =================================================================

export const darkTheme = createTheme(vars, {
  colors: {
    primary: '#068D69',
    secondary: '#FFC72C',
    background: '#121212',
    surface: '#1E1E1E',
    textPrimary: '#EAEAEA',
    textSecondary: '#A0AEC0',
    border: '#4A5568',
    success: '#68D391',
    error: '#FC8181',
    warning: '#F6AD55',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fontFamily: {
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
  },
})
