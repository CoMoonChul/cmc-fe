import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function handler(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname.replace(/^\/api/, '')
    const searchParams = req.nextUrl.search
    const url = `${BACKEND_URL}${path}${searchParams ? searchParams : ''}`
    const response = await fetch(url, {
      method: req.method,

      headers: {
        'Content-Type': 'application/json',
        // ...(req.headers.get("Authorization") && {
        //   Authorization: req.headers.get("Authorization") || "",
        // }),
      },
      body: req.method !== 'GET' ? JSON.stringify(await req.json()) : undefined,
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
