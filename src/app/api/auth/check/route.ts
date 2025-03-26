import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value
  if (!refreshToken) {
    return NextResponse.json(
      { isAuthenticated: false },
      {
        status: 200,
      },
    )
  }
  return NextResponse.json(
    { isAuthenticated: true },
    {
      status: 200,
    },
  )
}
