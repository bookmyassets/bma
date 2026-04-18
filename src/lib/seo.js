// lib/seo.js
import defaultImageSrc from "@/assests/bma-logo.png"
const BASE_URL = "https://www.BookMyAssets.com";

export function generateMetadata({
  title,
  description,
  slug,
  image,
  canonicalUrl,
  noIndex = false,
  keywords = [],
  type = "website",
  publishedAt,
  updatedAt,
}) {
  // Auto canonical generate from slug if not provided
  const canonical = canonicalUrl || `${BASE_URL}/${slug}`;

  // Fallback values
  const metaTitle = title || "BookMyAssets";
  const metaDesc = description || "Buy plots and properties with BookMyAssets";
  const ogImage = image
    ? image.startsWith("https")
      ? image
      : `${BASE_URL}/${image}`
    : defaultImageSrc.src;;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: keywords,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: canonical,
      siteName: "BookMyAssets",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type,
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(updatedAt && { modifiedTime: updatedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
    },
  };
}
