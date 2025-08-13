// lib/tests/apiClient.test.ts

import { describe, it, expect, vi, afterEach, Mock } from 'vitest'
import { apiClient } from '../apiClient'
import { ApiError, APIErrorCode } from '../errors'

// Mock 全域的 fetch 函式
global.fetch = vi.fn()

describe('apiClient', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  // 測試案例 1: 成功路徑
  it('should return data on a successful response', async () => {
    const mockData = { id: 1, name: 'Team Awesome' }
    ;(fetch as Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    })

    const data = await apiClient('teams/1')
    expect(fetch).toHaveBeenCalledWith('/api/teams/1', expect.any(Object))
    expect(data).toEqual(mockData)
  })

  // 測試案例 2: 處理 204 No Content
  it('should return undefined for a 204 No Content response', async () => {
    ;(fetch as Mock).mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => {
        throw new Error('Should not call json()')
      },
    })

    const data = await apiClient('teams/1', { method: 'DELETE' })
    expect(data).toBeUndefined()
  })

  // 測試案例 3: 失敗路徑與錯誤碼驗證
  it('should throw an ApiError with the correct code on a failed response', async () => {
    const mockError = {
      message: 'Resource was not found.',
      code: APIErrorCode.ResourceNotFound,
    }
    ;(fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
      headers: new Headers(),
      json: async () => mockError,
    })

    await expect(apiClient('teams/999')).rejects.toThrow(ApiError)

    try {
      await apiClient('teams/999')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      if (error instanceof ApiError) {
        expect(error.code).toBe(APIErrorCode.ResourceNotFound)
        expect(error.message).toBe(mockError.message)
      }
    }
  })

  // 測試案例 4: 請求 ID 捕獲驗證
  it('should attach the X-Request-ID to the ApiError on a failed response', async () => {
    const mockRequestId = 'trace-id-12345'
    const mockError = {
      message: 'Internal Server Error',
      code: APIErrorCode.InternalServerError,
    }
    ;(fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
      headers: new Headers({ 'X-Request-ID': mockRequestId }),
      json: async () => mockError,
    })

    try {
      await apiClient('system/crash')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      if (error instanceof ApiError) {
        expect(error.requestId).toBe(mockRequestId)
      }
    }
  })
})
