// lib/errors.ts

/**
 * API 錯誤碼枚舉。
 * 注意：此定義應與 P0 階段定義的後端 APIErrorCode 保持同步。
 */
export enum APIErrorCode {
  // 一般錯誤
  InvalidInput = 'INVALID_INPUT',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  PermissionDenied = 'PERMISSION_DENIED',

  // 伺服器錯誤
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  ServiceUnavailable = 'SERVICE_UNAVAILABLE',
}

/**
 * 自訂 API 錯誤類別，用於封裝從 BFF 回傳的標準化錯誤。
 */
export class ApiError extends Error {
  public readonly code: APIErrorCode
  public readonly requestId: string | null

  constructor(message: string, code: APIErrorCode, requestId: string | null) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.requestId = requestId

    // 確保 instanceof 能正常運作
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
