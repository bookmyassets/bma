/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Handle favicon specifically
      {
        source: '/favicon.ico',
        destination: '/api/landx?path=/favicon.ico',
      },
      // Test the basic API route first
      {
        source: '/test-api',
        destination: '/api/landx?path=dashboard.php',
      },
      // Direct access to specific PHP files with explicit handling
      {
        source: '/logout.php',
        destination: '/api/landx?path=logout.php',
      },
      {
        source: '/superadmin.php',
        destination: '/api/landx?path=superadmin.php',
      },
      {
        source: '/edit.php',
        destination: '/api/landx?path=edit.php',
      },
      {
        source: '/login.php', 
        destination: '/api/landx?path=login.php',
      },
      {
        source: '/dashboard.php',
        destination: '/api/landx?path=dashboard.php',
      },
      // Handle other common PHP files
      {
        source: '/index.php',
        destination: '/api/landx?path=index.php',
      },
      {
        source: '/admin.php',
        destination: '/api/landx?path=admin.php',
      },
      // Handle CSS, JS, and image files
      {
        source: '/css/:path*',
        destination: 'https://bigbucket.online/LandX-Beta/css/:path*',
      },
      {
        source: '/js/:path*',
        destination: 'https://bigbucket.online/LandX-Beta/js/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://bigbucket.online/LandX-Beta/images/:path*',
      },
      {
        source: '/img/:path*',
        destination: 'https://bigbucket.online/LandX-Beta/img/:path*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://bigbucket.online/LandX-Beta/assets/:path*',
      },
      // Default LandX-Beta access - should be last
      {
        source: '/landx',
        destination: '/api/landx',
      },
      {
        source: '/landx/:path*',
        destination: '/api/landx?path=:path*',
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'same-origin' },
        ],
      },
      // Specific headers for API routes
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
    ];
  },

  // Additional configuration for better production handling
  poweredByHeader: false,
  compress: true,
  
  // Handle trailing slashes consistently
  trailingSlash: false,
  
  // Better error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;