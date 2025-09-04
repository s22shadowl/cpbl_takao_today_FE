// components/ui/tests/Footer.test.tsx

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('should render the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2024 CPBL Stats. All rights reserved./i)).toBeInTheDocument()
  })
})
