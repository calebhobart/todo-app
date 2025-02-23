import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get token from localStorage
  const token = request.cookies.get('token')

  // If no token and not on login page, redirect to login
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - login
     * - api (handled by FastAPI auth)
     * - static files (css, images, etc)
     */
    '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
  ],
}