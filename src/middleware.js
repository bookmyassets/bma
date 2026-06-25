// middleware.js
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const SITE_NAME = 'localhost:3000'
const SITE_URL = 'http://localhost:3000/'

let redirectCache = null
let cacheTime = 0
const CACHE_TTL = 60 * 1000

async function fetchRedirects() {
  const now = Date.now()

  if (redirectCache && now - cacheTime < CACHE_TTL) {
    return redirectCache
  }

  redirectCache = await client.fetch(
    `*[_type == "redirect" && site == $site]{ source, destination, permanent }`,
    { site: SITE_NAME }
  )

  cacheTime = now
  return redirectCache
}

function buildRedirectUrl(destination) {
  if (!destination) return null

  let cleanDestination = destination.trim()

  // Protect against localhost accidentally saved in Sanity
  cleanDestination = cleanDestination.replace(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i,
    ''
  )

  // Internal redirect: /blogs/xyz
  if (cleanDestination.startsWith('/')) {
    return new URL(cleanDestination, SITE_URL)
  }

  // External redirect: https://example.com/page
  if (cleanDestination.startsWith('https://')) {
    return cleanDestination
  }

  // Fallback: treat missing leading slash as internal path
  return new URL(`/${cleanDestination}`, SITE_URL)
}

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const auth = req.cookies.get('crm_auth')?.value

  const isCrmRoute =
    pathname === '/after-sales/crm' ||
    pathname.startsWith('/after-sales/crm/')

  const isCrmLockRoute =
    pathname === '/after-sales/crm-lock' ||
    pathname.startsWith('/after-sales/crm-lock/')

  // 1. CRM Auth
  if (isCrmRoute && !isCrmLockRoute) {
    if (auth !== 'granted') {
      return NextResponse.redirect(
        new URL('/after-sales/crm-lock', SITE_URL)
      )
    }
  }

  // 2. Sanity Redirects
  const redirects = await fetchRedirects()
  const match = redirects.find((r) => r.source === pathname)

  if (match) {
    const redirectUrl = buildRedirectUrl(match.destination)

    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl, {
        status: match.permanent ? 301 : 302,
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
