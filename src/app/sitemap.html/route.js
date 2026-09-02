import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.bookmyassets.com";
const SITE = "bookmyassets";

const STATIC_SECTIONS = [
  {
    title: "Main pages",
    links: [
      { href: "/", title: "BookMyAssets" },
      { href: "/about", title: "About BookMyAssets" },
      { href: "/contact", title: "Contact BookMyAssets" },
      { href: "/career", title: "Careers" },
      { href: "/channel-partner", title: "Channel Partner" },
      { href: "/bulk-land", title: "Bulk Land in Dholera" },
      { href: "/gallery", title: "Dholera Gallery" },
    ],
  },
  {
    title: "About Dholera SIR",
    links: [
      { href: "/about-dholera-sir", title: "About Dholera SIR" },
    ],
    dynamicKey: "about",
  },
  {
    title: "Dholera SIR blogs",
    links: [
      { href: "/dholera-sir-blogs", title: "Dholera SIR Blogs" },
    ],
    dynamicKey: "blogs",
  },
  {
    title: "Dholera SIR updates",
    links: [
      { href: "/dholera-sir-updates", title: "Dholera SIR Updates" },
    ],
    dynamicKey: "updates",
  },
  {
    title: "Residential projects",
    links: [
      {
        href: "/dholera-residential-plots/westwyn-county",
        title: "WestWyn County",
      },
      {
        href: "/dholera-residential-plots/westwyn-estate",
        title: "WestWyn Estate",
      },
      {
        href: "/dholera-residential-plots/westwyn-residency",
        title: "WestWyn Residency",
      },
    ],
  },
];

// These are canonical-looking paths that currently redirect in next.config.mjs.
// Keeping them here prevents a miscategorised Sanity document from reintroducing
// a redirect source into the HTML sitemap.
const CONFIG_REDIRECT_SOURCES = [
  "/dholera-sir-updates/dholera-sea-port-location-connectivity",
  "/dholera-sir-blogs/first-smart-city-dholera",
  "/about-dholera-sir/dholera-expressway-toll-update-2025",
  "/about-dholera-sir/dholera-customs-port-update",
  "/dholera-sir-blogs/nextgen-8800-crore-investment-dholera-industrial-ecosystem",
  "/dholera-sir-updates/buy-plots-in-dholera-smart-city",
  "/dholera-sir-blogs/gujarat-budget-2026-dholera-smart-city",
  "/about-dholera-sir/ahmedabad–dholera-monorail-project",
  "/about-dholera-sir/dholera-smart-city-investment",
  "/about-dholera-sir/current-status",
];

const SITEMAP_QUERY = `{
  "posts": *[
    _type == "post" &&
    site == $site &&
    defined(slug.current) &&
    slug.current != "" &&
    coalesce(seo.noIndex, noIndex, false) == false &&
    (
      "Blog" in categories[]->title ||
      "Updates" in categories[]->title ||
      "project-Info" in categories[]->title
    )
  ] | order(lower(title) asc) {
    title,
    "canonicalUrl": coalesce(seo.canonicalUrl, canonicalUrl),
    "slug": slug.current,
    "categories": categories[]->title
  },

  "redirects": *[
    _type == "redirect" &&
    site == $site &&
    defined(source)
  ] {
    source
  }
}`;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizePath(value) {
  if (!value || typeof value !== "string") return null;

  try {
    const url = new URL(value.trim(), BASE_URL);

    if (url.origin !== BASE_URL) return null;

    const pathname = decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";
    return pathname;
  } catch {
    return null;
  }
}

function buildPostLinks(posts = []) {
  const links = {
    blogs: [],
    updates: [],
    about: [],
  };

  const categoryRoutes = [
    { category: "Blog", key: "blogs", prefix: "/dholera-sir-blogs" },
    { category: "Updates", key: "updates", prefix: "/dholera-sir-updates" },
    {
      category: "project-Info",
      key: "about",
      prefix: "/about-dholera-sir",
    },
  ];

  for (const post of posts) {
    const title = post?.title?.trim();
    const slug = post?.slug?.trim();

    if (!title || !slug) continue;

    const candidates = categoryRoutes
      .filter(({ category }) => post.categories?.includes(category))
      .map(({ key, prefix }) => ({
        key,
        href: `${prefix}/${encodeURIComponent(slug)}`,
        title,
      }));

    const canonicalPath = normalizePath(post.canonicalUrl);
    const canonicalCandidate = canonicalPath
      ? candidates.find(({ href }) => normalizePath(href) === canonicalPath)
      : null;

    const selected = post.canonicalUrl
      ? canonicalCandidate
        ? [canonicalCandidate]
        : []
      : candidates;

    for (const link of selected) {
      links[link.key].push(link);
    }
  }

  return links;
}

function renderLink({ href, title }) {
  return `<li><a href="${escapeHtml(href)}">${escapeHtml(title)}</a></li>`;
}

function renderSection({ title, links }) {
  if (!links.length) return "";

  return `
    <section aria-labelledby="${escapeHtml(title.toLowerCase().replaceAll(" ", "-"))}">
      <h2 id="${escapeHtml(title.toLowerCase().replaceAll(" ", "-"))}">${escapeHtml(title)}</h2>
      <ul>${links.map(renderLink).join("")}</ul>
    </section>`;
}

function renderDocument(sections) {
  const linkCount = sections.reduce((total, section) => total + section.links.length, 0);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HTML Sitemap | BookMyAssets</title>
    <meta name="description" content="Browse the current pages, Dholera SIR guides, blogs, updates and residential projects published by BookMyAssets.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${BASE_URL}/sitemap.html">
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body { margin: 0; background: #050505; color: #f5f5f5; font-family: Arial, sans-serif; line-height: 1.6; }
      main { width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 56px 0 72px; }
      header { max-width: 720px; margin-bottom: 36px; }
      .eyebrow { margin: 0 0 8px; color: #ddbc69; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
      h1 { margin: 0; font-size: clamp(2rem, 7vw, 3.5rem); line-height: 1.15; }
      header p { margin: 14px 0 0; color: #c8c8c8; font-size: 1.05rem; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 20px; }
      section { border: 1px solid #2c2c2c; border-radius: 14px; background: #101010; padding: 24px; }
      h2 { margin: 0 0 14px; color: #ddbc69; font-size: 1.25rem; }
      ul { margin: 0; padding-left: 1.25rem; }
      li + li { margin-top: 8px; }
      a { color: #fff; text-underline-offset: 4px; text-decoration-color: #6c5d36; }
      a:hover, a:focus-visible { color: #ddbc69; text-decoration-color: currentColor; }
      .home-link { display: inline-block; margin-top: 32px; color: #ddbc69; font-weight: 700; }
      @media (max-width: 520px) { main { padding-top: 36px; } section { padding: 20px; } }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">BookMyAssets</p>
        <h1>HTML Sitemap</h1>
        <p>Browse ${linkCount} current, indexable pages about BookMyAssets, Dholera SIR, property projects, articles and infrastructure updates.</p>
      </header>
      <div class="grid">${sections.map(renderSection).join("")}
      </div>
      <a class="home-link" href="/">Return to BookMyAssets home</a>
    </main>
  </body>
</html>`;
}

export const dynamic = "force-dynamic";

export async function GET() {
  let posts = [];
  let sanityRedirects = [];

  try {
    const data = await client.fetch(
      SITEMAP_QUERY,
      { site: SITE },
      { cache: "no-store" },
    );

    posts = Array.isArray(data?.posts) ? data.posts : [];
    sanityRedirects = Array.isArray(data?.redirects) ? data.redirects : [];
  } catch (error) {
    console.error("Unable to load Sanity data for the HTML sitemap:", error);
  }

  const dynamicLinks = buildPostLinks(posts);
  const redirectSources = new Set(
    [...CONFIG_REDIRECT_SOURCES, ...sanityRedirects.map(({ source }) => source)]
      .map(normalizePath)
      .filter(Boolean),
  );

  const sections = STATIC_SECTIONS.map((section) => {
    const combinedLinks = [
      ...section.links,
      ...(section.dynamicKey ? dynamicLinks[section.dynamicKey] : []),
    ];

    const seen = new Set();
    const links = combinedLinks.filter(({ href }) => {
      const path = normalizePath(href);

      if (!path || redirectSources.has(path) || seen.has(path)) return false;

      seen.add(path);
      return true;
    });

    return { title: section.title, links };
  });

  return new Response(renderDocument(sections), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
