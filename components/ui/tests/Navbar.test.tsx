// components/ui/tests/Navbar.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from '../Navbar'

// Mock Next.js Link component to prevent jsdom navigation errors
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}))

describe('Navbar', () => {
  it('should toggle the mobile menu when the menu button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

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
    render(<Navbar />)

    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })

    // --- Open the menu first ---
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    // --- Click a link ---
    // Find a link inside the menu, e.g., 'About'
    const aboutLink = screen.getByRole('link', { name: /賽季趨勢/i })
    await user.click(aboutLink)

    // The menu should now be closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
