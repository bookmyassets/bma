/** @type {import('next').NextConfig} */

const nextConfig = {
  /* LandX Proxy Start */
  async rewrites() {
    return [
      // Handle favicon specifically
      {
        source: "/favicon.ico",
        destination: "/api/landx?path=/favicon.ico",
      },

      // CRITICAL: Handle dashboard.php with ANY query parameters
      {
        source: "/LandX-Beta/dashboard.php",

        destination: "/api/landx?path=dashboard.php",
      },

      // Direct access to PHP files
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
        source: "/api.php",
        destination: "/api/landx?path=api.php",
      },

      // PDF generation endpoints
      {
        source: "/generate_pdf.php",
        destination: "/api/landx?path=generate_pdf.php",
      },
      {
        source: "/generate_pdf_filtered.php",
        destination: "/api/landx?path=generate_pdf_filtered.php",
      },
      {
        source: "/generate_pdf_non_brand.php",
        destination: "/api/landx?path=generate_pdf_non_brand.php",
      },

      // Other PHP files
      {
        source: "/index.php",
        destination: "/api/landx?path=index.php",
      },
      {
        source: "/admin.php",
        destination: "/api/landx?path=admin.php",
      },

      // Static assets - go directly to target
      {
        source: "/css/:path*",
        destination: "https://dholeratimes.co.in/LandX-Beta/css/:path*",
      },
      {
        source: "/js/:path*",
        destination: "https://dholeratimes.co.in/LandX-Beta/js/:path*",
      },

      // Images through proxy
      {
        source: "/images/:path*",
        destination: "/api/landx?path=images/:path*",
      },
      {
        source: "/img/:path*",
        destination: "/api/landx?path=img/:path*",
      },

      // Uploads handling
      {
        source: "/uploads/:path*",
        destination: "/api/landx?path=uploads/:path*",
      },
      {
        source: "/uploads/pdfs/:path*",
        destination: "/api/landx?path=uploads/pdfs/:path*",
      },

      // General pattern - should be LAST
      {
        source: "/landx",
        destination: "/api/landx",
      },
      {
        source: "/LandX-Beta/:path*",
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
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
      /*  // CRITICAL: Add CORS headers for uploaded files
      {
        source: "/uploads/pdfs/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      }, */
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

  /* LandX Proxy Close */

  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },

  /* Website Redirects SEO */

  async redirects() {
    return [
      /* REDIRECTIONS AFTER RESTRUCTURE */

      {
        source: "/blogs/latest-update",
        destination: "/dholera-sir-updates", // NOT /dholera-sir-blogs/latest-update
        permanent: true,
      },
      {
        source: "/blogs/sitemap.html",
        destination: "/sitemap.html", // NOT /dholera-sir-blogs/sitemap.html
        permanent: true,
      },
      {
        source: "/blogs/sitemap.xml",
        destination: "/sitemap.html", // NOT /dholera-sir-blogs/sitemap.xml
        permanent: true,
      },
      {
        source:
          "/blogs/why-invest-in-dholera-india-first-greenfield-smart-city",
        destination: "/dholera-sir-blogs/invest-in-dholera-sir-projects",
        permanent: true,
      },
      {
        source: "/blogs/first-smart-city-dholera",
        destination:
          "/dholera-sir-blogs/impact-of-tata-semiconductor-plant-on-land-value-in-dholera",
        permanent: true,
      },

      // /dholera-sir/latest-updates/* override
      {
        source: "/dholera-sir/latest-updates/sitemap.html",
        destination: "/sitemap.html", // NOT /dholera-sir-updates/sitemap.html
        permanent: true,
      },

      // ─────────────────────────────────────────────────────────────
      // SECTION 2: WILDCARDS (catch-all rules)
      // ─────────────────────────────────────────────────────────────

      // Order matters: more-specific prefix first
      {
        source: "/dholera-sir/latest-updates/:slug*",
        destination: "/dholera-sir-updates/:slug*",
        permanent: true,
      },
      {
        source: "/dholera-sir/:slug*",
        destination: "/about-dholera-sir/:slug*",
        permanent: true,
      },
      {
        source: "/blogs/:slug*",
        destination: "/dholera-sir-blogs/:slug*",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/dholera-sir-blogs",
        permanent: true,
      },

      // ─────────────────────────────────────────────────────────────
      // SECTION 3: /projects — wildcard-collapsed rules
      // Replaces ~40 individual sub-path rules with 7 wildcard rules.
      // Any /projects/<old-slug>/* hits now route to the right project.
      // ─────────────────────────────────────────────────────────────
      {
        source: "/projects/paradise-1/:slug*",
        destination: "/dholera-residential-plots/paradise",
        permanent: true,
      },
      {
        source: "/projects/paradise-1",
        destination: "/dholera-residential-plots/paradise",
        permanent: true,
      },
      {
        source: "/projects/paradise-2/:slug*",
        destination: "/dholera-residential-plots/paradise-2",
        permanent: true,
      },
      {
        source: "/projects/paradise-2",
        destination: "/dholera-residential-plots/paradise-2",
        permanent: true,
      },
      {
        source: "/projects/paradise-p2/:slug*",
        destination: "/dholera-residential-plots/paradise-2",
        permanent: true,
      },
      {
        source: "/projects/paradise-p2",
        destination: "/dholera-residential-plots/paradise-2",
        permanent: true,
      },
      {
        source: "/projects/orchid-township/:slug*",
        destination: "/dholera-residential-plots/orchid",
        permanent: true,
      },
      {
        source: "/projects/orchid-township",
        destination: "/dholera-residential-plots/orchid",
        permanent: true,
      },
      {
        source: "/projects/orchid-township-ot/:slug*",
        destination: "/dholera-residential-plots/orchid",
        permanent: true,
      },
      {
        source: "/projects/orchid-township-ot",
        destination: "/dholera-residential-plots/orchid",
        permanent: true,
      },
      {
        source: "/projects/maple/:slug*",
        destination: "/dholera-residential-plots/maple",
        permanent: true,
      },
      {
        source: "/projects/maple",
        destination: "/dholera-residential-plots/maple",
        permanent: true,
      },
      {
        source: "/projects/marina-bay/:slug*",
        destination: "/dholera-residential-plots/marina-bay",
        permanent: true,
      },
      {
        source: "/projects/marina-bay",
        destination: "/dholera-residential-plots/marina-bay",
        permanent: true,
      },
      {
        source: "/projects/sitemap.html",
        destination: "/sitemap.html",
        permanent: true,
      },
      {
        source: "/projects/sitemap.xml",
        destination: "/sitemap.html",
        permanent: true,
      },
      {
        source: "/projects/dholera/westwyn-c",
        destination: "/dholera-residential-plots/westwyn-county",
        permanent: true,
      },

      // ─────────────────────────────────────────────────────────────
      // SECTION 4: MISC ONE-TO-ONE REDIRECTS
      // ─────────────────────────────────────────────────────────────
      {
        source: "/dholera-sir-updates/dholera-sea-port-location-connectivity",
        destination:
          "/dholera-sir-blogs/dholera-sea-port-location-connectivity",
        permanent: true,
      },
      {
        source: "/dholera-sir-blogs/first-smart-city-dholera",
        destination:
          "/dholera-sir-blogs/impact-of-tata-semiconductor-plant-on-land-value-in-dholera",
        permanent: true,
      },
      {
        source: "/dholera/abcd-building",
        destination: "/about-dholera-sir/abcd-building-dholera",
        permanent: true,
      },
      {
        source: "/about-dholera-sir/dholera-expressway-toll-update-2025",
        destination: "/dholera-sir-updates/dholera-expressway-toll-update-2025",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/dholera-sir-blogs",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/carrers",
        destination: "/career",
        permanent: true,
      },
      {
        source: "/copyright",
        destination: "/policies/copyright",
        permanent: true,
      },
      {
        source: "/terms-of-use",
        destination: "/policies/terms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/policies/privacy",
        permanent: true,
      },
      {
        source: "/pages/about",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/pages/Blogs",
        destination: "/dholera-sir-blogs",
        permanent: true,
      },
      {
        source: "/pages/properties",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/pages/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/pages/Events",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
