// PlayerDailyPerformance.tsx
'use client'

import { useGetPlayerPerformanceToday } from '@/hooks/useGetPlayerPerformanceToday'

// 簡易的 UI 元件
const Skeleton = () => <div className="p-4 my-2 bg-gray-200 rounded-md h-24 animate-pulse"></div>
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="p-4 my-2 text-red-700 bg-red-100 border border-red-400 rounded-md">{message}</div>
)
const EmptyMessage = ({ message }: { message: string }) => (
  <div className="p-4 my-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md">
    {message}
  </div>
)

export const PlayerDailyPerformance = () => {
  const {
    data: performances,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetPlayerPerformanceToday()

  if (isLoading) {
    return <Skeleton />
  }

  if (isError) {
    return <ErrorMessage message={`讀取球員表現時發生錯誤: ${error?.message}`} />
  }

  if (isSuccess && (!performances || performances.length === 0)) {
    return <EmptyMessage message="找不到焦點球員的表現數據" />
  }

  return (
    <div className="space-y-4">
      {performances.map((performance) => (
        <div key={performance.id} className="p-4 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-bold mb-4">{performance.player_name}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">打席</p>
              <p className="text-2xl font-semibold">{performance.plate_appearances}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">打數</p>
              <p className="text-2xl font-semibold">{performance.at_bats}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">安打</p>
              <p className="text-2xl font-semibold">{performance.hits}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">打點</p>
              <p className="text-2xl font-semibold">{performance.rbi}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">全壘打</p>
              <p className="text-2xl font-semibold">{performance.homeruns}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
