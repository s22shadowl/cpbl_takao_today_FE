// app/api/[...slug]/route.ts
import { type NextRequest } from 'next/server'

// 支援所有方法
export async function GET(req: NextRequest) {
  return handler(req)
}
export async function POST(req: NextRequest) {
  return handler(req)
}
export async function PUT(req: NextRequest) {
  return handler(req)
}
export async function DELETE(req: NextRequest) {
  return handler(req)
}
export async function PATCH(req: NextRequest) {
  return handler(req)
}

async function handler(req: NextRequest) {
  // 1. 讀取變數
  let backendApiUrl = process.env.BACKEND_API_URL
  const backendApiKey = process.env.BACKEND_API_KEY

  // 2. 進入安全區塊 (所有可能報錯的邏輯都在這裡)
  try {
    if (!backendApiUrl || !backendApiKey) {
      throw new Error('Missing Config')
    }

    // 自動修剪空格 (Trim) 並補上 https
    backendApiUrl = backendApiUrl.trim()
    if (!backendApiUrl.startsWith('http')) {
      backendApiUrl = `https://${backendApiUrl}`
    }

    // 3. 重組 URL
    const incomingPath = req.nextUrl.pathname
    const path = incomingPath.replace(/^\/api\//, '')
    const searchParams = req.nextUrl.search
    const targetUrl = `${backendApiUrl}/api/${path}${searchParams}`

    console.log(`[Proxy] Fetching: ${targetUrl}`)

    // 4.請求 Header
    const requestHeaders = new Headers()
    requestHeaders.set('Content-Type', req.headers.get('Content-Type') || 'application/json')
    requestHeaders.set('Accept', 'application/json')
    requestHeaders.set('X-API-Key', backendApiKey)
    requestHeaders.set('Host', new URL(backendApiUrl).host)

    // 5. 發送請求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: requestHeaders,
      // GET/HEAD 不帶 body
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
      // @ts-expect-error: Next.js duplex option
      duplex: 'half',
    })

    // ----------------------------------------------------------------
    // 【關鍵修正】清洗回應 Header，解決 ERR_CONTENT_DECODING_FAILED
    // ----------------------------------------------------------------
    const responseHeaders = new Headers(response.headers)

    // 移除壓縮編碼 Header，因為 Node.js fetch 已經幫我們解壓縮了
    // 如果不移除，瀏覽器會試圖再次解壓縮導致崩潰
    responseHeaders.delete('content-encoding')
    responseHeaders.delete('transfer-encoding')
    responseHeaders.delete('content-length') // 讓 Vercel 自動重新計算長度

    // 回傳新的 Response
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // 這裡會捕捉所有錯誤 (包含 URL 格式錯、連線失敗等)
    console.error('[Proxy Fatal]', error)
    return new Response(JSON.stringify({ error: 'Proxy Error', details: error.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
