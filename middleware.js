import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Create Sanity client for middleware
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Don't use CDN in middleware for real-time data
  token: process.env.SANITY_API_TOKEN, // Optional: for private datasets
})

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname.replace(/^\/+/, ""); // remove leading "/"

  // Fetch new slug from Sanity
  const query = `*[_type == "post" && oldSlug == $slug][0]{ "newSlug": slug.current, category }`;
  const data = await client.fetch(query, { slug: pathname });

  if (data?.newSlug && data?.category) {
    let destination = "";

    switch (data.category) {
      case "Blog":
        destination = `/dholera-sir-blogs/${data.newSlug}`;
        break;
      case "Updates":
        destination = `/dholera-sir-updates/${data.newSlug}`;
        break;
      case "project-Info":
        destination = `/projects/about-dholera-sir/${data.newSlug}`;
        break;
      default:
        destination = `/${data.newSlug}`; // fallback
    }

    return NextResponse.redirect(new URL(destination, req.url), 301);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    // Match dholera-sir routes but exclude static files and API routes
    '/dholera-sir/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ]
}