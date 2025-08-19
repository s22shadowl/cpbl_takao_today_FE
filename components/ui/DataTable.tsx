// /components/ui/DataTable.tsx

'use client'

import * as React from 'react'
import * as styles from './DataTable.css'

/**
 * 通用 DataTable 的欄位定義型別。
 * @template TData - 資料列的物件型別。
 */
export interface ColumnDef<TData> {
  /** 用於從資料列物件中取值的 key。 */
  accessorKey: keyof TData | (string & {})
  /** 顯示在表頭的文字。 */
  header: string
  /** (可選) 自訂儲存格的渲染函式。 */
  cell?: (props: { row: TData }) => React.ReactNode
}

/**
 * 通用 DataTable 的 props 型別。
 * @template TData - 資料列的物件型別。
 */
interface DataTableProps<TData> {
  /** 要顯示的資料陣列。 */
  data: TData[]
  /** 欄位定義陣列。 */
  columns: ColumnDef<TData>[]
}

/**
 * 一個可複用的、由 props 驅動的通用數據表格元件。
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<TData extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<TData>) {
  return (
    // RWD 方案：在容器上啟用水平滾動。
    // 未來可優化方案：在小螢幕上將每一行轉換為卡片式佈局 (Card-based layout)。
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles.th}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {columns.map((column, colIndex) => {
                const value = row[column.accessorKey as keyof TData]
                return (
                  <td key={colIndex} className={styles.td}>
                    {column.cell ? column.cell({ row }) : String(value ?? '')}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

DataTable.displayName = 'DataTable'
