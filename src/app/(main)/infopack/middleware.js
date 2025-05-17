import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  // If the pathname isn't lowercase, redirect to lowercase version
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to any URL that starts with "infopack" in any case variation
export const config = {
  matcher: ['/infopack', '/infopack/:path*', '/InfoPack', '/INFOpack', '/INFOPACK', '/infoPack'],
};