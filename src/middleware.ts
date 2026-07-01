import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // Define headers property to override the read-only request headers
  Object.defineProperty(request, 'headers', {
    value: requestHeaders,
    writable: false
  })

  const response = handleI18nRouting(request)

  response.headers.set('x-pathname', pathname)

  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*']
}
