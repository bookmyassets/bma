/** @type {import('next').NextConfig} */
const nextConfig = {
 async rewrites() {
    return [
      // Handle favicon specifically
      {
        source: "/favicon.ico",
        destination: "/api/landx?path=/favicon.ico",
      },
      // Test the basic API route first
      {
        source: "/test-api",
        destination: "/api/landx?path=dashboard.php",
      },
      // Direct access to specific PHP files with explicit handling
      {
        source: "/logout.php",
        destination: "/api/landx?path=logout.php",
      },
      {
        source: "/superadmin.php",
        destination: "/api/landx?path=superadmin.php",
      },
      {
        source: "/edit.php",
        destination: "/api/landx?path=edit.php",
      },
      {
        source: "/login.php",
        destination: "/api/landx?path=login.php",
      },
      {
        source: "/dashboard.php",
        destination: "/api/landx?path=dashboard.php",
      },
      {
        source: "/api.php",
        destination: "/api/landx?path=api.php",
      },
      {
        source: "/generate_pdf.php",
        destination: "/api/landx?path=generate_pdf.php",
      },
      // Handle other common PHP files
      {
        source: "/index.php",
        destination: "/api/landx?path=index.php",
      },
      {
        source: "/admin.php",
        destination: "/api/landx?path=admin.php",
      },
      // Handle CSS, JS, and image files
      {
        source: "/css/:path*",
        destination: "https://bigbucket.online/LandX-Beta/css/:path*",
      },
      {
        source: "/js/:path*",
        destination: "https://bigbucket.online/LandX-Beta/js/:path*",
      },
      {
        source: "/images/:path*",
        destination: "https://bigbucket.online/LandX-Beta/images/:path*",
      },
      {
        source: "/img/:path*",
        destination: "https://bigbucket.online/LandX-Beta/img/:path*",
      },
      {
        source: "/uploads/pdfs/:path*",
        destination: "/api/landx?path=uploads/pdfs/:path*",
      },
      // Default landx access - should be last
      {
        source: "/landx",
        destination: "/api/landx",
      },
      {
        source: "/landx/:path*",
        destination: "/api/landx?path=:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "same-origin" },
        ],
      },
      // Specific headers for API routes
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      {
        source: "/api/landx",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type",
          },
        ],
      },
      {
        source: "/uploads/pdfs/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Expose-Headers", value: "*" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
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

  images: {
    domains: ['cdn.sanity.io'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source:"/dholera-sir/latest-updates/dholera-international-airport-latest-news",
        destination:"/dholera-sir-updates/dholera-international-airport-latest-news",
        permanent:true
      },

      {
        source: '/blog',
        destination: '/dholera-sir-blogs',
        permanent: true, 
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true, 
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true, 
      },
      {
        source: '/projects/paradise-2',
        destination: '/dholera-residential-plots/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-1',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/projects/dholera/pages/about',
        permanent: true,
      },
      {
        source: '/projects/dholera/westwyn-c',
        destination: '/projects/dholera/westwyn-c',
        permanent: true,
      },
      {
        source: '/projects/orchid-township',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/maple',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/marina-bay',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/paradise-p1',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/maple-township-mt',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/marina-bay-mb',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/paradise-p2',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/orchid-township-ot',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-1/westwyn-c',
        destination: '/projects/dholera/paradise-1',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/paradise-p1',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/maple-township-mt',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/marina-bay-mb',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/paradise-2/paradise-p2',
        destination: '/projects/dholera/paradise-2',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/maple-township-mt',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/marina-bay-mb',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/paradise-p2',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/orchid-township-ot',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/orchid-township/westwyn-c',
        destination: '/projects/dholera/orchid-township',
        permanent: true,
      },
      {
        source: '/projects/maple/paradise-p1',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/maple-township-mt',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/marina-bay-mb',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/paradise-p2',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/orchid-township-ot',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/maple/westwyn-c',
        destination: '/projects/dholera/maple',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/paradise-p1',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/maple-township-mt',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/marina-bay-mb',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/paradise-p2',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/orchid-township-ot',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/marina-bay/westwyn-c',
        destination: '/projects/dholera/marina-bay',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/paradise-p1',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/maple-township-mt',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/marina-bay-mb',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/paradise-p2',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/westwyn-c',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/paradise-p1',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/maple-township-mt',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/marina-bay-mb',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/orchid-township-ot',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/westwyn-c',
        destination: '/projects/dholera/paradise-p2',
        permanent: true,
      },
      {
        source: '/projects/orchid-township-ot/orchid-township-ot',
        destination: '/projects/dholera/orchid-township-ot',
        permanent: true,
      },
      {
        source: '/projects/paradise-p2/paradise-p2',
        destination: '/projects/dholera/paradise-p2/paradise-p2',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/dholera/abcd-building',
        destination: '/dholera-sir/abcd-building-dholera',
        permanent: true,
      },
      {
        source: '/carrers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/copyright',
        destination: '/policies/copyright',
        permanent: true,
      },
      {
        source: '/terms-of-use',
        destination: '/policies/terms',
        permanent: true,
      },
      {
        source: '/pages/Blogs',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/pages/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/properties',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/pages/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/Events',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/policies/privacy',
        permanent: true,
      },
      {
        source: '/blogs/latest-update',
        destination: '/dholera-sir/latest-update',
        permanent: true,
      },
      {
        source: '/blogs/sitemap.html',
        destination: '/sitemap.html',
        permanent: true,
      },
      {
        source: '/projects/sitemap.html',
        destination: '/sitemap.html',
        permanent: true,
      },
      {
        source: '/blogs/sitemap.xml',
        destination: '/sitemap.html',
        permanent: true,
      },
      {
        source: '/projects/sitemap.xml',
        destination: '/sitemap.html',
        permanent: true,
      },
      {
        source:
          "/dholera-sir/latest-updates/sitemap.html",
        destination:
          "/sitemap.html",
        permanent: true,
      },
      
    ];
  },

};

export default nextConfig;