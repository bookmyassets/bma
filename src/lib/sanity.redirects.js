import { client } from '@/sanity/lib/client'

const SITE_NAME = process.env.SITE_NAME || 'bookmyassets'

export async function getRedirects() {
  return client.fetch(
    `*[_type == "redirect" && site == $site]{ source, destination, permanent }`,
    { site: SITE_NAME },  // ✅ site filter add kiya
    { next: { tags: ['redirects'] } }
  )
}