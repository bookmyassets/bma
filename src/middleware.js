import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",

  // Redirect documents are public/read-only data.
  // Using Sanity CDN avoids forcing every lookup to the origin API.
  useCdn: true,
});

const SITE_NAME = "bookmyassets";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.bookmyassets.com";

// Best-effort per-instance cache.
// Do not rely on this cache for correctness.
const CACHE_TTL = 5 * 60 * 1000;

let redirectCache = null;
let cacheTime = 0;

const DEFAULT_PUBLIC_ORIGIN = "https://www.bookmyassets.com";

function getPublicOrigin(request) {
  if (process.env.NODE_ENV === "production") {
    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    try {
      const configuredOrigin = new URL(
        configuredSiteUrl || DEFAULT_PUBLIC_ORIGIN,
      );

      if (
        !/^(localhost|127(?:\.\d{1,3}){3})$/i.test(configuredOrigin.hostname)
      ) {
        return configuredOrigin.origin;
      }
    } catch {
      return DEFAULT_PUBLIC_ORIGIN;
    }

    return DEFAULT_PUBLIC_ORIGIN;
  }

  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    .trim();
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();

  if (
    forwardedHost &&
    !/^(localhost|127(?:\.\d{1,3}){3})/i.test(forwardedHost)
  ) {
    return `${forwardedProtocol || request.nextUrl.protocol.replace(":", "")}://${forwardedHost}`;
  }

  return request.nextUrl.origin;
}

async function fetchRedirects() {
  const now = Date.now();

  if (redirectCache && now - cacheTime < CACHE_TTL) {
    return redirectCache;
  }

  redirectCache = await client.fetch(
    `*[
      _type == "redirect" &&
      site == $site
    ]{
      source,
      destination,
      permanent
    }`,
    {
      site: SITE_NAME,
    },
  );

  cacheTime = now;

  return redirectCache;
}

function buildRedirectUrl(request, destination) {
  if (!destination) return null;

  let cleanDestination = destination.trim();

  cleanDestination = cleanDestination.replace(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/i,
    "",
  );

  try {
    const target = /^https?:\/\//i.test(cleanDestination)
      ? new URL(cleanDestination)
      : new URL(
          cleanDestination.startsWith("/")
            ? cleanDestination
            : `/${cleanDestination}`,
          SITE_URL,
        );

    if (!target.search && request.nextUrl.search) {
      target.search = request.nextUrl.search;
    }

    const isSelfRedirect =
      target.pathname === request.nextUrl.pathname &&
      target.search === request.nextUrl.search;

    if (isSelfRedirect) {
      return null;
    }

    return target;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  /*
   * ---------------------------------------------------------
   * 1. CRM AUTHENTICATION
   * ---------------------------------------------------------
   */

  const auth = request.cookies.get("crm_auth")?.value;

  const isCrmRoute =
    pathname === "/after-sales/crm" || pathname.startsWith("/after-sales/crm/");

  if (isCrmRoute && auth !== "granted") {
    return NextResponse.redirect(
      new URL("/after-sales/crm-lock", request.url),
      307,
    );
  }

  /*
   * ---------------------------------------------------------
   * 2. INFOPACK URL NORMALIZATION
   * ---------------------------------------------------------
   *
   * This replaces:
   * app/(main)/infopack/middleware.js
   *
   * Next.js supports one project-level middleware.
   */

  if (pathname.toLowerCase().startsWith("/infopack")) {
    const lowercasePath = pathname.toLowerCase();

    if (pathname !== lowercasePath) {
      const lowercaseUrl = request.nextUrl.clone();

      lowercaseUrl.pathname = lowercasePath;

      return NextResponse.redirect(lowercaseUrl, 308);
    }
  }

  /*
   * ---------------------------------------------------------
   * 3. SANITY-MANAGED REDIRECTS
   * ---------------------------------------------------------
   */

  const redirects = await fetchRedirects();

  const match = redirects.find((redirect) => redirect.source === pathname);

  if (!match) {
    return NextResponse.next();
  }

  const redirectUrl = buildRedirectUrl(request, match.destination);

  if (!redirectUrl) {
    return NextResponse.next();
  }

  return NextResponse.redirect(redirectUrl, match.permanent ? 308 : 307);
}

export const config = {
  matcher: [
    {
      /*
       * Only run Middleware for real page requests.
       *
       * Excludes:
       * - APIs
       * - Next.js static files
       * - Next Image optimization
       * - Sanity Studio
       * - LandX proxy/static resources
       * - metadata files
       * - normal static assets
       */
      source:
        "/((?!api|_next/static|_next/image|studio|LandX-Beta|landx|css|js|images|img|uploads|favicon.ico|robots.txt|sitemap.xml|sitemap.html|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|woff|woff2|ttf|otf|pdf)$).*)",

      /*
       * Avoid executing Middleware just because Next.js is
       * prefetching a route in the background.
       */
      missing: [
        {
          type: "header",
          key: "next-router-prefetch",
        },
        {
          type: "header",
          key: "purpose",
          value: "prefetch",
        },
      ],
    },
  ],
};
