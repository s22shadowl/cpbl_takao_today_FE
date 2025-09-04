// components/ui/tests/Navbar.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from '../Navbar'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

// Mock Next.js Link component to prevent jsdom navigation errors
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  }) => (
    <a
      href={href}
      onClick={(e) => {
        // 阻止 jsdom 嘗試進行頁面導航
        e.preventDefault()
        // 如果原始的 onClick 存在，則呼叫它 (例如 Navbar 中的 closeMenu)
        if (onClick) {
          onClick(e)
        }
      }}
    >
      {children}
    </a>
  ),
}))

describe('Navbar', () => {
  it('should toggle the mobile menu when the menu button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    )

    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })

    // Initially, the menu should be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    // --- Open the menu ---
    await user.click(menuButton)

    // Now, the menu should be open
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // --- Close the menu ---
    await user.click(menuButton)

    // The menu should be closed again
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('should close the mobile menu when a navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    )

    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })

    // --- Open the menu first ---
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // --- Click a link ---
    // Find a link inside the menu, e.g., '賽季趨勢'
    const seasonTrendLink = screen.getByRole('link', { name: /賽季趨勢/i })
    await user.click(seasonTrendLink)

    // The menu should now be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
