// lib/apiClient.ts

import { APIErrorCode, ApiError } from './errors'
// 導入自動生成的型別。假設後端 OpenAPI 規格中定義了一個名為 HTTPValidationError 的錯誤結構。
import type { components } from '@/types/generated-api'

// 從生成的型別中提取錯誤回應的具體型別
// 注意：'HTTPValidationError' 是 FastAPI 常用的 schema 名稱，請依據 generated-api.ts 的實際內容調整
type ErrorResponse = components['schemas']['HTTPValidationError']

/**
 * 通用的 API 客戶端函式。
 * @param endpoint BFF API 的端點路徑 (不含 /api 前綴)。
 * @param options fetch 的選項。
 * @returns 解析後的 JSON 資料。
 * @throws {ApiError} 當 API 回應不成功時。
 */
export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  const response = await fetch(`/api/${endpoint}`, config)

  if (!response.ok) {
    const requestId = response.headers.get('X-Request-ID')
    let errorPayload: { message: string; code: APIErrorCode }

    try {
      // 嘗試解析後端回傳的、符合 OpenAPI 規格的 JSON 錯誤訊息
      const errorData = (await response.json()) as ErrorResponse

      // FastAPI 的預設錯誤 detail 可能是字串或物件，此處做通用處理
      // TODO: 根據您專案實際生成的 `HTTPValidationError` 型別微調此處的欄位對應
      const detail = errorData.detail
      let message = 'An unknown error occurred'
      let code = APIErrorCode.InternalServerError

      if (typeof detail === 'string') {
        message = detail
      } else if (typeof detail === 'object' && detail !== null && 'message' in detail) {
        // 假設 detail 物件中有 message 和 code 欄位
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message = (detail as any).message
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code = (detail as any).code || code
      }

      errorPayload = { message, code }
    } catch (_e) {
      // 如果後端未回傳 JSON 或格式不符，則使用通用的錯誤訊息
      errorPayload = {
        message: `API request failed with status ${response.status}`,
        code: APIErrorCode.InternalServerError,
      }
    }

    throw new ApiError(errorPayload.message, errorPayload.code, requestId)
  } // 處理沒有回應主體的情況 (例如 204 No Content)

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
