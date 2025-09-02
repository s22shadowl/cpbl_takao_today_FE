// components/ui/tests/Tabs.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs'

describe('Tabs', () => {
  it('should display the content of the default tab and switch when another tab is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="password">Password content</TabsContent>
      </Tabs>
    )

    // Initially, the default tab's content should be visible
    expect(screen.getByText('Account content')).toBeInTheDocument()
    // The other tab's content should not be in the DOM
    expect(screen.queryByText('Password content')).toBeNull()
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('data-state', 'inactive')

    // --- Switch tabs ---
    const passwordTab = screen.getByRole('tab', { name: 'Password' })
    await user.click(passwordTab)

    // Now, the password content should be visible
    expect(screen.getByText('Password content')).toBeInTheDocument()
    // and the account content should be gone
    expect(screen.queryByText('Account content')).toBeNull()
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('data-state', 'inactive')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute('data-state', 'active')
  })
})
