// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/studio/",
          "/crm/",
          "/crm-cost-estimate/",
          "/costsheet/",
          "/thankyou/",
          "/exit-popup/",
          "/infopack/",
        ],
      },
    ],
    sitemap: "https://www.bookmyassets.com/sitemap.xml",
  };
}