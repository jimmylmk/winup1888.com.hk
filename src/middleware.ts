import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Redirect root path "/" to default locale "/zh-HK"
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh-HK', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
