// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          "/after-sales/",
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