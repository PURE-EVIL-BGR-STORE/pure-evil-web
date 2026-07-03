import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('auth_session')?.value

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    const payloadBase64 = sessionToken.split('.')[1]
    if (!payloadBase64) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8')
    const payload = JSON.parse(payloadJson)

    // Check expiration
    const exp = payload.exp
    if (exp && Date.now() >= exp * 1000) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.sub,
        username: payload.preferred_username || payload.name || 'User',
        email: payload.email,
        name: payload.name || '',
        roles: payload.realm_access?.roles || []
      }
    }, { status: 200 })
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
}
