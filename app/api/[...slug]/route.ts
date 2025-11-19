// app/api/[...slug]/route.ts
import { type NextRequest, NextResponse } from 'next/server'

// 統一處理所有 Method
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
  const start = Date.now()
  let backendApiUrl = process.env.BACKEND_API_URL || ''
  const backendApiKey = process.env.BACKEND_API_KEY || ''

  console.log('🔍 [Diagnostic] Start Request Processing...')

  try {
    // 1. 診斷環境變數
    console.log('🔍 [Diagnostic] 1. Env Vars Check:', {
      RAW_URL: backendApiUrl,
      HAS_KEY: !!backendApiKey, // 不要印出 Key，只確認有無
      KEY_LENGTH: backendApiKey.length,
    })

    if (!backendApiUrl) throw new Error('Missing BACKEND_API_URL')

    // 2. 網址正規化與診斷
    backendApiUrl = backendApiUrl.trim()
    if (!backendApiUrl.startsWith('http')) {
      console.warn('⚠️ [Diagnostic] URL missing protocol, adding https://')
      backendApiUrl = `https://${backendApiUrl}`
    }

    const incomingPath = req.nextUrl.pathname.replace(/^\/api\//, '')
    const targetUrl = `${backendApiUrl}/api/${incomingPath}${req.nextUrl.search}`

    console.log('🔍 [Diagnostic] 2. Target Construction:', {
      incomingPath: req.nextUrl.pathname,
      finalTargetUrl: targetUrl,
    })

    // 3. Header 診斷
    const requestHeaders = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('Accept', 'application/json')
    requestHeaders.set('X-API-Key', backendApiKey)

    // 關鍵：紀錄我們到底送了什麼 Host 過去
    const targetHost = new URL(backendApiUrl).host
    requestHeaders.set('Host', targetHost)

    // 將 Header 轉為物件以便列印診斷
    const debugHeaders: Record<string, string> = {}
    requestHeaders.forEach((v, k) => {
      debugHeaders[k] = v
    })

    console.log('🔍 [Diagnostic] 3. Outgoing Headers:', debugHeaders)

    // 4. 執行 Fetch (捕捉底層網路錯誤)
    console.log(`🚀 [Diagnostic] 4. Executing Fetch to: ${targetUrl}`)

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: requestHeaders,
      // 只有非 GET/HEAD 才傳送 body
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
      // @ts-expect-error: Next.js extended fetch option
      duplex: 'half',
      // 設定 timeout 避免卡死 (Vercel 預設 10s，我們設短一點來測試連通性)
      signal: AbortSignal.timeout(8000),
    })

    // 5. 診斷回應狀態
    console.log('🔍 [Diagnostic] 5. Received Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    })

    // 6. 讀取內容 (無論成功失敗都先讀出來，看看 Fly 到底回了什麼)
    // 注意：這裡改用 text() 讀取，避免 json() 解析失敗導致看不到原始錯誤訊息
    const responseBodyText = await response.text()

    // 如果內容太長，只印出前 500 個字避免 Log 爆炸
    console.log(
      '🔍 [Diagnostic] 6. Raw Response Body (First 500 chars):',
      responseBodyText.substring(0, 500)
    )

    // 嘗試解析 JSON
    let data
    try {
      data = JSON.parse(responseBodyText)
    } catch {
      // 如果不是 JSON，代表可能是 Fly Proxy 的錯誤頁面 (HTML)
      data = { rawText: responseBodyText }
    }

    return NextResponse.json(data, { status: response.status })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // 7. 捕捉致命錯誤 (這裡是重點)
    const errorDetails = {
      name: error.name,
      message: error.message,
      code: error.code, // 例如 ECONNREFUSED, ENOTFOUND
      cause: error.cause,
      stack: error.stack,
      duration: Date.now() - start,
    }

    console.error('❌ [Diagnostic] FATAL ERROR:', JSON.stringify(errorDetails, null, 2))

    // 回傳詳細錯誤給前端 (Curl)
    return NextResponse.json(
      {
        error: 'Proxy Diagnostic Error',
        diagnosis: errorDetails,
      },
      { status: 502 }
    )
  }
}
