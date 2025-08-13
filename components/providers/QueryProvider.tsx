// components/providers/QueryProvider.tsx
'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Props 的型別定義，允許接收 children
interface QueryProviderProps {
  children: React.ReactNode
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  // 使用 useState 確保 QueryClient 實例在元件生命週期內只被建立一次
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
