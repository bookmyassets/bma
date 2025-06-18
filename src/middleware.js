import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Create Sanity client for middleware
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Don't use CDN in middleware for real-time data
  token: process.env.SANITY_API_TOKEN, // Optional: for private datasets
})

async function isLatestUpdatesSlug(slug) {
  try {
    // Query Sanity to check if the post exists and belongs to latest-updates
    const query = `*[_type == "post" && slug.current == $slug][0] {
      slug,
      category->{slug, title},
      categories[]->{slug, title},
      isLatestUpdate,
      _type
    }`
    
    const post = await sanityClient.fetch(query, { slug })
    
    if (!post) return false
    
    // Check if it belongs to latest-updates category
    // Adjust this logic based on your Sanity schema structure
    const belongsToLatestUpdates = (
      // Option 1: Single category field
      post.category?.slug?.current === 'latest-updates' ||
      post.category?.title?.toLowerCase().includes('latest update') ||
      
      // Option 2: Multiple categories array
      post.categories?.some(cat => 
        cat.slug?.current === 'latest-updates' || 
        cat.title?.toLowerCase().includes('latest update')
      ) ||
      
      // Option 3: Direct boolean field
      post.isLatestUpdate === true ||
      
      // Option 4: Check by slug pattern (if your latest-updates have specific patterns)
      slug.includes('update') || slug.includes('news') || slug.includes('announcement')
    )
    
    console.log(`Slug "${slug}" belongs to latest updates:`, belongsToLatestUpdates)
    return belongsToLatestUpdates
    
  } catch (error) {
    console.error('Error checking slug in Sanity:', error)
    return false
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if it's a direct dholera-sir slug access (not latest-updates or other known routes)
  const directSlugMatch = pathname.match(/^\/dholera-sir\/([^\/]+)$/)
  
  if (directSlugMatch) {
    const slug = directSlugMatch[1]
    
    // Skip if it's a known direct route or file
    const allowedDirectRoutes = [
      'latest-updates', 
      'page$', 
      'TrendingBlog.jsx', 
      'BlogCard.jsx',
      'sitemap.xml',
      'robots.txt',
      'favicon.ico'
    ]
    
    // Skip files with extensions or known routes
    if (allowedDirectRoutes.includes(slug) || slug.includes('.') || slug.startsWith('_')) {
      return NextResponse.next()
    }
    
    console.log(`Checking slug: ${slug}`)
    
    // Check if this slug belongs to latest-updates category
    const isLatestUpdate = await isLatestUpdatesSlug(slug)
    
    if (isLatestUpdate) {
      console.log(`Redirecting ${slug} to latest-updates`)
      // Redirect to the correct latest-updates path
      const correctUrl = new URL(`/dholera-sir/latest-updates/${slug}`, request.url)
      return NextResponse.redirect(correctUrl, 301)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match dholera-sir routes but exclude static files and API routes
    '/dholera-sir/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ]
}