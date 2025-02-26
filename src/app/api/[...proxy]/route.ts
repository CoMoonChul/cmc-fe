import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

async function handleRequest(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname.replace(/^\/api/, '')
    const searchParams = req.nextUrl.search
    const url = `${BACKEND_URL}${path}${searchParams ? searchParams : ''}`

    console.log('@@ 요청 URL:', url)

    const body =
      req.method !== 'GET' ? JSON.stringify(await req.json()) : undefined

    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // ...(req.headers.get("Authorization") && {
        //   Authorization: req.headers.get("Authorization") || "",
        // }),
      },
      body,
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('%% 에러 발생:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req)
}

export async function POST(req: NextRequest) {
  return handleRequest(req)
}

export async function PUT(req: NextRequest) {
  return handleRequest(req)
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req)
}
