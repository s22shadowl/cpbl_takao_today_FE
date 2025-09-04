// components/features/tests/ThemeSwitcher.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { ThemeSwitcher } from '../ThemeSwitcher'
import * as ThemeProvider from '@/components/providers/ThemeProvider'

describe('ThemeSwitcher', () => {
  // Helper to mock the useTheme hook
  const mockUseTheme = (theme: 'light' | 'dark', toggleTheme: () => void) => {
    return vi.spyOn(ThemeProvider, 'useTheme').mockReturnValue({
      theme,
      toggleTheme,
    })
  }

  let useThemeSpy: ReturnType<typeof vi.spyOn>

  afterEach(() => {
    // Restore the original implementation after each test
    useThemeSpy.mockRestore()
  })

  it('should display the correct aria-label for switching to dark mode', () => {
    const toggleThemeMock = vi.fn()
    useThemeSpy = mockUseTheme('light', toggleThemeMock)

    render(<ThemeSwitcher />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      '切換至 深色 模式',
    )
  })

  it('should display the correct aria-label for switching to light mode', () => {
    const toggleThemeMock = vi.fn()
    useThemeSpy = mockUseTheme('dark', toggleThemeMock)

    render(<ThemeSwitcher />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      '切換至 淺色 模式',
    )
  })

  it('should call toggleTheme when the button is clicked', async () => {
    const toggleThemeMock = vi.fn()
    useThemeSpy = mockUseTheme('light', toggleThemeMock)
    const user = userEvent.setup()

    render(<ThemeSwitcher />)
    await user.click(screen.getByRole('button'))

    expect(toggleThemeMock).toHaveBeenCalledTimes(1)
  })
})
