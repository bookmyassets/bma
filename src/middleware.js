// middleware.js
import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})

let redirectCache = null
let cacheTime = 0
const CACHE_TTL = 60 * 1000

async function fetchRedirects() {
  const now = Date.now()
  if (redirectCache && now - cacheTime < CACHE_TTL) return redirectCache

  redirectCache = await client.fetch(
    `*[_type == "redirect"]{ source, destination, permanent }`
  )
  cacheTime = now
  return redirectCache
}

export async function middleware(request) {
  const redirects = await fetchRedirects()
  const pathname = request.nextUrl.pathname

  console.log('👉 Path:', pathname)
  console.log('👉 Redirects count:', redirects.length)

  const match = redirects.find(r => r.source === pathname)

  if (match) {
    const url = request.nextUrl.clone()
    url.pathname = match.destination
    return NextResponse.redirect(url, { status: match.permanent ? 301 : 302 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}