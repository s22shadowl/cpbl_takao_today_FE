// lib/tests/apiClient.test.ts

import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { apiClient } from '@/lib/apiClient'
import { ApiError, APIErrorCode } from '@/lib/errors'
import type { components } from '@/types/generated-api'

// 為了型別安全，定義一個符合 OpenAPI 規格的 mock 錯誤回應
type ErrorResponse = components['schemas']['HTTPValidationError']

// 將全域的 fetch mock 轉換為 Vitest 的 Mock 型別，以便在測試中使用 .mockResolvedValue 等方法
const fetchMock = global.fetch as Mock

// 在每個測試案例執行前，重置 fetch mock 的所有呼叫紀錄
beforeEach(() => {
  vi.resetAllMocks()
})

describe('apiClient.get', () => {
  const mockSuccessData = { message: 'success' }
  const mockRequestId = 'trace-id-xyz-789'

  // 輔助函式：建立一個 mock Response 物件
  const createMockResponse = (body: object | string, ok: boolean, status: number, headers = {}) => {
    return {
      ok,
      status,
      headers: new Headers({ 'X-Request-ID': mockRequestId, ...headers }),
      json: async () => (typeof body === 'string' ? JSON.parse(body) : body),
    }
  }

  it('should return data on a successful 200 OK response', async () => {
    fetchMock.mockResolvedValue(createMockResponse(mockSuccessData, true, 200))

    const data = await apiClient.get('test-endpoint')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith('/api/test-endpoint', {
      method: 'GET',
      headers: expect.any(Object),
    })
    expect(data).toEqual(mockSuccessData)
  })

  it('should return undefined for a 204 No Content response', async () => {
    // 204 回應沒有 body，所以 json() 不應該被呼叫
    const mockResponse = { ok: true, status: 204, headers: new Headers() }
    fetchMock.mockResolvedValue(mockResponse)

    const data = await apiClient.get('test-endpoint')

    expect(data).toBeUndefined()
  })

  describe('Parameter Serialization', () => {
    it('should correctly serialize and append query parameters', async () => {
      fetchMock.mockResolvedValue(createMockResponse(mockSuccessData, true, 200))
      await apiClient.get('test', { params: { a: '1', b: 2, c: 'hello world' } })

      const expectedUrl = '/api/test?a=1&b=2&c=hello+world'
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expect.any(Object))
    })

    it('should handle array parameters by appending multiple times', async () => {
      fetchMock.mockResolvedValue(createMockResponse(mockSuccessData, true, 200))
      await apiClient.get('test', { params: { ids: ['id1', 'id2'] } })

      const expectedUrl = '/api/test?ids=id1&ids=id2'
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expect.any(Object))
    })

    it('should ignore null and undefined parameters', async () => {
      fetchMock.mockResolvedValue(createMockResponse(mockSuccessData, true, 200))
      await apiClient.get('test', { params: { a: '1', b: null, c: undefined } })

      const expectedUrl = '/api/test?a=1'
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expect.any(Object))
    })
  })

  describe('Error Handling', () => {
    it('should throw an ApiError with parsed details for a structured error response', async () => {
      const mockErrorBody: ErrorResponse = {
        detail: [{ loc: ['body'], msg: 'field required', type: 'value_error' }],
      }
      // 根據 apiClient.ts 的邏輯，它會從 detail 物件中尋找 message 和 code。
      // 由於我們的 mockErrorBody 沒有這些欄位，它會 fallback 到 'An unknown error occurred'。
      // 這是為了驗證解析邏輯。
      fetchMock.mockResolvedValue(createMockResponse(mockErrorBody, false, 422))

      await expect(apiClient.get('test-error')).rejects.toThrow(ApiError)

      try {
        await apiClient.get('test-error')
      } catch (e) {
        const err = e as ApiError
        expect(err.message).toBe('An unknown error occurred')
        expect(err.code).toBe(APIErrorCode.InternalServerError)
        expect(err.requestId).toBe(mockRequestId)
      }
    })

    it('should correctly parse an error response where detail is a string', async () => {
      // 使用 `as any` 來繞過嚴格的型別檢查，因為我們正在特意測試
      // 當 API 回應與生成的型別不完全匹配時，apiClient 的穩健性。
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockErrorBody = { detail: 'Specific error message from server' } as any
      fetchMock.mockResolvedValue(createMockResponse(mockErrorBody, false, 404))

      try {
        await apiClient.get('test-error')
      } catch (e) {
        const err = e as ApiError
        expect(err.message).toBe('Specific error message from server')
        expect(err.requestId).toBe(mockRequestId)
      }
    })

    it('should throw a generic ApiError for a non-JSON error response', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        headers: new Headers({ 'X-Request-ID': mockRequestId }),
        json: async () => {
          throw new SyntaxError('Invalid JSON')
        },
      }
      fetchMock.mockResolvedValue(mockResponse)

      try {
        await apiClient.get('test-error')
      } catch (e) {
        const err = e as ApiError
        expect(err.message).toBe('API request failed with status 500')
        expect(err.code).toBe(APIErrorCode.InternalServerError)
        expect(err.requestId).toBe(mockRequestId)
      }
    })
  })

  it('should allow passing custom headers', async () => {
    fetchMock.mockResolvedValue(createMockResponse(mockSuccessData, true, 200))
    const customHeaders = { Authorization: 'Bearer token123' }

    await apiClient.get('secure-endpoint', { headers: customHeaders })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const fetchOptions = fetchMock.mock.calls[0][1]

    // 驗證預設標頭和自訂標頭都存在
    expect(fetchOptions?.headers).toMatchObject({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    })
  })
})
