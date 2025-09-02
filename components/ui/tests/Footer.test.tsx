// components/ui/tests/Footer.test.tsx

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Footer } from '../Footer'

// Mock the ThemeSwitcher component as we don't need to test its functionality here
vi.mock('../../features/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <button>Mock Theme Switcher</button>,
}))

describe('Footer', () => {
  it('should render the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2024 CPBL Stats. All rights reserved./i)).toBeInTheDocument()
  })

  it('should render the ThemeSwitcher component', () => {
    render(<Footer />)
    expect(screen.getByRole('button', { name: 'Mock Theme Switcher' })).toBeInTheDocument()
  })
})
