// /components/ui/DataTable.tsx

'use client'

import * as React from 'react'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as styles from './DataTable.css'

/**
 * 通用 DataTable 的 props 型別。
 * @template TData - 資料列的物件型別。
 * @template TValue - 欄位值的型別。
 */
interface DataTableProps<TData, TValue> {
  /** 欄位定義陣列。 */
  columns: ColumnDef<TData, TValue>[]
  /** 要顯示的資料陣列。 */
  data: TData[]
}

/**
 * 一個可複用的、由 props 驅動的通用數據表格元件，整合了 @tanstack/react-table 以支援排序功能。
 */
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    // RWD 方案：在容器上啟用水平滾動。
    // 未來可優化方案：在小螢幕上將每一行轉換為卡片式佈局 (Card-based layout)。
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={styles.th}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  <span className={styles.sortIcon}>
                    {{
                      asc: '▲',
                      desc: '▼',
                    }[header.column.getIsSorted() as string] ?? null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

DataTable.displayName = 'DataTable'
