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
      throw new Error('Missing BACKEND_API_URL or BACKEND_API_KEY')
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

    // Debug: 印出實際請求網址 (請去 Vercel Logs 看這行)
    console.log(`[Proxy Config] URL: ${backendApiUrl}, Target: ${targetUrl}`)

    // 4. 處理 Headers
    const headers = new Headers()
    headers.set('Content-Type', req.headers.get('Content-Type') || 'application/json')
    headers.set('Accept', 'application/json')
    headers.set('X-API-Key', backendApiKey)
    // 確保 Host 正確
    headers.set('Host', new URL(backendApiUrl).host)

    // 5. 發送請求
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      // GET/HEAD 不帶 body
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
      // @ts-expect-error: Next.js specific option
      duplex: 'half',
    })

    return response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // 這裡會捕捉所有錯誤 (包含 URL 格式錯、連線失敗等)
    console.error('[Proxy Error]', error)
    return new Response(
      JSON.stringify({
        error: 'Proxy Error',
        details: error.message,
        debugUrl: backendApiUrl, // 回傳這個讓你在瀏覽器就能看到讀到了什麼
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
