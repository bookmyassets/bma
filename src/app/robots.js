// src/app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",

      disallow: [
        "/api/",
        "/studio/",
        "/after-sales/",
      ],
    },

    sitemap: "https://www.bookmyassets.com/sitemap.xml",
  };
}