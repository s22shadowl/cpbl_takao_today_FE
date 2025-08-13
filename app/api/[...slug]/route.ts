import { type NextRequest } from 'next/server'

// 統一的處理函數，用於轉發請求
async function handler(req: NextRequest, { params }: { params: { slug: string[] } }) {
  // 1. 從環境變數讀取後端 API 的 URL 和金鑰
  const backendApiUrl = process.env.BACKEND_API_URL
  const backendApiKey = process.env.BACKEND_API_KEY

  // 檢查環境變數是否已設定
  if (!backendApiUrl || !backendApiKey) {
    console.error('Error: Missing backend API environment variables.')
    return new Response(
      JSON.stringify({ error: 'Internal Server Error: Missing API configuration.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 2. 重組目標 URL
  // 將 slug 陣列（例如 ['teams', '1']）轉換為路徑字串 "teams/1"
  const path = params.slug.join('/')
  // 取得原始請求中的查詢參數 (例如 "?season=2024")
  const searchParams = req.nextUrl.search
  // 組合出完整的後端 API 目標 URL
  const targetUrl = `${backendApiUrl}/api/${path}${searchParams}`

  // 3. 準備轉發的請求標頭 (Headers)
  const headers = new Headers(req.headers)
  // 必須移除或替換 host 標頭，否則 fetch 會出錯
  headers.set('Host', new URL(backendApiUrl).host)
  // 附加後端 API 金鑰
  headers.set('X-API-Key', backendApiKey)

  try {
    // 4. 使用 fetch 轉發請求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      // 將原始請求的 body 串流轉發出去
      body: req.body,
      // duplex 'half' 是在 Node.js 環境中串流請求主體的必要設定
      duplex: 'half',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    // 5. 直接回傳後端 API 的回應
    // 這會將後端的 status, headers, body 都原封不動地回傳給前端
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
