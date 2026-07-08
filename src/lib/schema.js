const BASE_URL = "https://www.bookmyassets.com";
const LOGO_URL = `${BASE_URL}/bma-logo.png`;

function absoluteUrl(path = "") {
  if (!path) return BASE_URL;
  const normalizedPath = String(path);
  return normalizedPath.startsWith("http")
    ? normalizedPath
    : `${BASE_URL}/${normalizedPath.replace(/^\/+/, "")}`;
}

function cleanText(value) {
  if (!value) return undefined;
  return String(value).replace(/\s+/g, " ").trim() || undefined;
}

function toIsoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function compactObject(value) {
  if (Array.isArray(value)) {
    return value
      .map(compactObject)
      .filter((item) => item !== undefined && item !== null);
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, item]) => [key, compactObject(item)])
      .filter(([, item]) => {
        if (item === undefined || item === null || item === "") return false;
        if (Array.isArray(item) && item.length === 0) return false;
        return !(
          typeof item === "object" &&
          !Array.isArray(item) &&
          Object.keys(item).length === 0
        );
      });

    return Object.fromEntries(entries);
  }

  return value;
}

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

export function blogPostSchema({
  title,
  description,
  image,
  imageAlt,
  publishedAt,
  updatedAt,
  slug,
  canonicalUrl,
  authorName = "BookMyAssets",
  categories = [],
  keywords = [],
  bodyText,
  readingTime,
  relatedBlogs = [],
}) {
  const pageUrl = absoluteUrl(canonicalUrl || slug);
  const headline = cleanText(title) || "Dholera Smart City Blog";
  const articleText = cleanText(bodyText);
  const summary =
    cleanText(description) ||
    (articleText
      ? `${articleText.slice(0, 157)}${articleText.length > 157 ? "..." : ""}`
      : undefined);
  const categoryNames = categories
    .map((category) => cleanText(category?.title || category))
    .filter(Boolean);
  const keywordNames = keywords
    .map((keyword) => cleanText(keyword))
    .filter(Boolean);
  const wordCount = articleText
    ? articleText.split(/\s+/).filter(Boolean).length
    : undefined;
  const readMinutes =
    readingTime ||
    (wordCount ? Math.max(1, Math.ceil(wordCount / 200)) : undefined);
  const mainImage = image || LOGO_URL;
  const author =
    authorName === "BookMyAssets"
      ? { "@id": `${BASE_URL}/#organization` }
      : { "@type": "Person", name: cleanText(authorName) };

  const relatedItems = relatedBlogs
    .filter((blog) => blog?.slug?.current && blog?.title)
    .map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`dholera-sir-blogs/${blog.slug.current}`),
      item: {
        "@type": "BlogPosting",
        headline: cleanText(blog.title),
        description: cleanText(blog.metaDescription || blog.description),
        url: absoluteUrl(`dholera-sir-blogs/${blog.slug.current}`),
        datePublished: toIsoDate(blog.publishedAt || blog._createdAt),
      },
    }));

  const graph = [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "BookMyAssets",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    {
      "@type": "Blog",
      "@id": `${BASE_URL}/dholera-sir-blogs#blog`,
      name: "BookMyAssets Dholera SIR Blogs",
      url: `${BASE_URL}/dholera-sir-blogs`,
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: headline,
      description: summary,
      isPartOf: {
        "@id": `${BASE_URL}/dholera-sir-blogs#blog`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: mainImage,
      },
      datePublished: toIsoDate(publishedAt),
      dateModified: toIsoDate(updatedAt || publishedAt),
      inLanguage: "en-IN",
    },
    {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#blogposting`,
      mainEntityOfPage: {
        "@id": `${pageUrl}#webpage`,
      },
      headline,
      name: headline,
      description: summary,
      image: [
        {
          "@type": "ImageObject",
          url: mainImage,
          caption: cleanText(imageAlt || headline),
        },
      ],
      thumbnailUrl: mainImage,
      url: pageUrl,
      datePublished: toIsoDate(publishedAt),
      dateModified: toIsoDate(updatedAt || publishedAt),
      author,
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      articleSection: categoryNames[0] || "Dholera SIR Blogs",
      keywords: [...new Set([...categoryNames, ...keywordNames])].join(", "),
      wordCount,
      timeRequired: readMinutes ? `PT${readMinutes}M` : undefined,
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      isPartOf: {
        "@id": `${BASE_URL}/dholera-sir-blogs#blog`,
      },
      about: categoryNames.map((name) => ({
        "@type": "Thing",
        name,
      })),
      articleBody: articleText ? articleText.slice(0, 5000) : undefined,
    },
    relatedItems.length > 0
      ? {
          "@type": "ItemList",
          "@id": `${pageUrl}#related-posts`,
          name: "Related Dholera SIR blog posts",
          itemListElement: relatedItems,
        }
      : undefined,
  ];

  return compactObject({
    "@context": "https://schema.org",
    "@graph": graph,
  });
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
