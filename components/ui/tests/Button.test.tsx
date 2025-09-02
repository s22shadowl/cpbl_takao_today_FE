// components/ui/tests/Button.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('should render a button with the correct text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should call the onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click Me</Button>)

    await user.click(screen.getByRole('button', { name: /click me/i }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when the disabled prop is true', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    )

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDisabled()

    await user.click(button).catch(() => {
      /* userEvent throws an error on disabled elements, which is expected */
    })

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should render as a child element when asChild prop is true', () => {
    render(
      <Button asChild>
        <a href="/home">Go Home</a>
      </Button>
    )

    // It should not render a <button> element
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    // Instead, it should render an <a> element with link role
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/home')
  })
})
