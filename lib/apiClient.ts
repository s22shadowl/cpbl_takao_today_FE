// lib/apiClient.ts

import { APIErrorCode, ApiError } from './errors'

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
    let errorData
    try {
      // 嘗試解析後端回傳的 JSON 錯誤訊息
      errorData = await response.json()
    } catch (_e) {
      // 如果後端未回傳 JSON，則使用通用的錯誤訊息
      errorData = {
        message: `API request failed with status ${response.status}`,
        code: APIErrorCode.InternalServerError,
      }
    }

    throw new ApiError(
      errorData.message || 'An unknown error occurred',
      errorData.code || APIErrorCode.InternalServerError,
      requestId
    )
  }

  // 處理沒有回應主體的情況 (例如 204 No Content)
  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
