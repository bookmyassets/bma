// lib/schema.js
const BASE_URL = "https://www.bookmyassets.com";

// ✅ Organization — Homepage pe use karo
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BookMyAssets",
    url: BASE_URL,
    logo: `${BASE_URL}/bma-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8130371647",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61583265159985",
      "https://www.instagram.com/bookmyassets",
    ],
  };
}

// ✅ Article Schema — Blog + Updates pages pe use karo
export function articleSchema({ title, description, image, publishedAt, updatedAt, slug, authorName = "BookMyAssets" }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || `${BASE_URL}/bma-logo.png`,
    author: {
      "@type": "Organization",
      name: "BookMyAssets",
    },
    publisher: {
      "@type": "Organization",
      name: "BookMyAssets",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/bma-logo.png`,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${slug}`,
    },
  };
}

// ✅ Breadcrumb Schema — Har page pe use karo
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

// ✅ RealEstate Schema — Residential plots pages pe use karo
export function realEstateSchema({ name, description, image, url, address }) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: name,
    description: description,
    image: image || `${BASE_URL}/bma-logo.png`,
    url: `${BASE_URL}${url}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address || "Dholera SIR",
      addressLocality: "Dholera",
      addressRegion: "Gujarat",
      postalCode: "382460",
      addressCountry: "IN",
    },
  };
}

// ✅ FAQ Schema — Project pages pe use karo
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ✅ LocalBusiness Schema
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BookMyAssets",
    url: BASE_URL,
    telephone: "+91-8130371647",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.2370",
      longitude: "72.1800",
    },
    openingHours: "Mo-Sa 09:00-18:00",
    priceRange: "₹₹",
  };
}