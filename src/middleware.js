import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl
  const auth = req.cookies.get('crm_auth')?.value

  if (pathname.startsWith('/after-sales/crm') && !pathname.startsWith('/after-sales/crm-lock')) {
    if (auth !== 'granted') {
      return NextResponse.redirect(new URL('/after-sales/crm-lock', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}