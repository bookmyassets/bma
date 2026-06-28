const BASE_URL = "https://www.bookmyassets.com";
const LOGO_URL = `${BASE_URL}/bma-logo.png`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BookMyAssets",
    url: BASE_URL,
    logo: LOGO_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8130371647",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61583265159985",
      "https://www.instagram.com/bookmyassets",
      "https://www.youtube.com/@BookMyAssets",
      "https://www.linkedin.com/company/bookmyassetss/",
    ],
  };
}

export function articleSchema({
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  slug,
  authorName = "BookMyAssets",
  schemaType = "BlogPosting",
}) {
  const pageUrl = slug?.startsWith("http") ? slug : `${BASE_URL}/${slug || ""}`;

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: title,
    description,
    image: image ? [image] : [LOGO_URL],
    url: pageUrl,
    inLanguage: "en-IN",
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "BookMyAssets",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}

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

export function realEstateSchema({ name, description, image, url, address }) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name,
    description,
    image: image || LOGO_URL,
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

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BookMyAssets",
    image: LOGO_URL,
    "@id": `${BASE_URL}/#localbusiness`,
    url: BASE_URL,
    telephone: "+91-8130371647",
    priceRange: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "6th Floor, Unit 620, JMD Megapolis, Badshahpur Sohna Road, Sector 48",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122018",
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 09:00-21:00",
  };
}
