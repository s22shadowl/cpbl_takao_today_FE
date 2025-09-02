// components/ui/tests/DataTable.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { DataTable } from '../DataTable'
import type { ColumnDef } from '@tanstack/react-table'

// Define a simple data structure for testing
interface TestData {
  name: string
  age: number
  city: string
}

// Prepare mock data and column definitions
const testData: TestData[] = [
  { name: 'Charlie', age: 30, city: 'Chicago' },
  { name: 'Alice', age: 25, city: 'Amsterdam' },
  { name: 'Bob', age: 35, city: 'Boston' },
]

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
]

describe('DataTable', () => {
  it('should render headers and initial data correctly', () => {
    render(<DataTable columns={columns} data={testData} />)

    // Check if headers are rendered
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Age' })).toBeInTheDocument()

    // Check if initial data rows are rendered in the original order
    const rows = screen.getAllByRole('row') // This includes the header row
    expect(rows[1]).toHaveTextContent('Charlie')
    expect(rows[2]).toHaveTextContent('Alice')
    expect(rows[3]).toHaveTextContent('Bob')
  })

  it('should sort data when a column header is clicked', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={columns} data={testData} />)

    const nameHeader = screen.getByRole('columnheader', { name: 'Name' })

    // --- 1. Click to sort ascending ---
    await user.click(nameHeader)

    // Check for ascending sort indicator
    expect(nameHeader).toHaveTextContent('▲')

    // Check for new row order
    let rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Alice')
    expect(rows[2]).toHaveTextContent('Bob')
    expect(rows[3]).toHaveTextContent('Charlie')

    // --- 2. Click to sort descending ---
    await user.click(nameHeader)

    // Check for descending sort indicator
    expect(nameHeader).toHaveTextContent('▼')

    // Check for new row order
    rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Charlie')
    expect(rows[2]).toHaveTextContent('Bob')
    expect(rows[3]).toHaveTextContent('Alice')

    // --- 3. Click to clear sorting ---
    await user.click(nameHeader)

    // Check that sort indicator is gone
    expect(nameHeader).not.toHaveTextContent('▲')
    expect(nameHeader).not.toHaveTextContent('▼')

    // Check that row order has returned to the original state
    rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Charlie')
    expect(rows[2]).toHaveTextContent('Alice')
    expect(rows[3]).toHaveTextContent('Bob')
  })
})
