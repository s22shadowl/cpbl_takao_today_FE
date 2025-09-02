// components/ui/tests/StatItem.test.tsx

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StatItem } from '../StatItem'

describe('StatItem', () => {
  it('should render the label and a string value correctly', () => {
    render(<StatItem label="打擊率" value=".300" />)
    expect(screen.getByText('打擊率')).toBeInTheDocument()
    expect(screen.getByText('.300')).toBeInTheDocument()
  })

  it('should render the label and a number value correctly', () => {
    render(<StatItem label="全壘打" value={25} />)
    expect(screen.getByText('全壘打')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('should render the label and a React node as value', () => {
    render(<StatItem label="狀態" value={<span>火熱</span>} />)
    expect(screen.getByText('狀態')).toBeInTheDocument()
    expect(screen.getByText('火熱')).toBeInTheDocument()
  })
})
