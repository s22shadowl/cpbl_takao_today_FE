// app/api/[...slug]/route.ts

import { type NextRequest } from 'next/server'

// 統一的處理函數，用於轉發請求
async function handler(
  req: NextRequest,
  // 我們仍然接收 context，但不再優先使用它的 params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  context: any
) {
  // 1. 從環境變數讀取後端 API 的 URL 和金鑰
  const backendApiUrl = process.env.BACKEND_API_URL
  const backendApiKey = process.env.BACKEND_API_KEY

  if (!backendApiUrl || !backendApiKey) {
    console.error('Error: Missing backend API environment variables.')
    return new Response(
      JSON.stringify({ error: 'Internal Server Error: Missing API configuration.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 2. 重組目標 URL
  // 從 req.nextUrl.pathname 獲取路徑，例如 "/api/games" 或 "/api/players/some-id"
  const incomingPath = req.nextUrl.pathname
  // 移除 "/api/" 前綴，得到需要轉發的路徑部分，例如 "games" 或 "players/some-id"
  const path = incomingPath.replace(/^\/api\//, '')

  // 取得原始請求中的查詢參數 (例如 "?season=2024")
  const searchParams = req.nextUrl.search
  // 組合出完整的後端 API 目標 URL
  const targetUrl = `${backendApiUrl}/api/${path}${searchParams}`

  // 3. 準備轉發的請求標頭 (Headers)
  const headers = new Headers(req.headers)
  headers.set('Host', new URL(backendApiUrl).host)
  headers.set('X-API-Key', backendApiKey)

  try {
    // 4. 使用 fetch 轉發請求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.body,
      duplex: 'half',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    // 5. 直接回傳後端 API 的回應
    return response
  } catch (error) {
    console.error(`[BFF Proxy Error] Failed to fetch ${targetUrl}:`, error)
    return new Response(JSON.stringify({ error: 'Bad Gateway' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// 將同一個 handler 應用於所有常見的 HTTP 方法
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }
