// middleware.js
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const SITE_NAME = process.env.SITE_NAME || 'bookmyassets'

let redirectCache = null
let cacheTime = 0
const CACHE_TTL = 60 * 1000

async function fetchRedirects() {
  const now = Date.now()
  if (redirectCache && now - cacheTime < CACHE_TTL) return redirectCache
  redirectCache = await client.fetch(
    `*[_type == "redirect" && site == $site]{ source, destination, permanent }`,
    { site: SITE_NAME }
  )
  cacheTime = now
  return redirectCache
}

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const auth = req.cookies.get('crm_auth')?.value

  // ✅ 1. CRM Auth — same as before
  if (pathname.startsWith('/after-sales/crm') && !pathname.startsWith('/after-sales/crm-lock')) {
    if (auth !== 'granted') {
      return NextResponse.redirect(new URL('/after-sales/crm-lock', req.url))
    }
  }

  // ✅ 2. Sanity Redirects
  const redirects = await fetchRedirects()
  const match = redirects.find(r => r.source === pathname)

  if (match) {
    const url = req.nextUrl.clone()
    url.pathname = match.destination
    return NextResponse.redirect(url, { status: match.permanent ? 301 : 302 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}