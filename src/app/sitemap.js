import { client } from "@/sanity/lib/client";
import { resolveBlogDates } from "@/lib/blogDates";

const BASE_URL = "https://www.bookmyassets.com";

const SANITY_OPTIONS = {
  next: {
    revalidate: 3600,
  },
};

export default async function sitemap() {
  const [blogs, updates, aboutDholera] = await Promise.all([
    client.fetch(
      `
        *[
          _type == "post"
          && "Blog" in categories[]->title
          && site == "bookmyassets"
          && defined(slug.current)
          && coalesce(seo.noIndex, noIndex, false) == false
        ]{
          "slug": slug.current,
          createdAt,
          publishedAt,
          _createdAt,
          _updatedAt
        }
      `,
      {},
      SANITY_OPTIONS,
    ),

    client.fetch(
      `
        *[
          _type == "post"
          && "Updates" in categories[]->title
          && site == "bookmyassets"
          && defined(slug.current)
          && coalesce(seo.noIndex, noIndex, false) == false
        ]{
          "slug": slug.current,
          _updatedAt
        }
      `,
      {},
      SANITY_OPTIONS,
    ),

    client.fetch(
      `
        *[
          _type == "post"
          && "project-Info" in categories[]->title
          && site == "bookmyassets"
          && defined(slug.current)
          && coalesce(seo.noIndex, noIndex, false) == false
        ]{
          "slug": slug.current,
          _updatedAt
        }
      `,
      {},
      SANITY_OPTIONS,
    ),
  ]);

  const staticPages = [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/about`,
    },
    {
      url: `${BASE_URL}/contact`,
    },
    {
      url: `${BASE_URL}/career`,
    },
    {
      url: `${BASE_URL}/channel-partner`,
    },
    {
      url: `${BASE_URL}/bulk-land`,
    },
    {
      url: `${BASE_URL}/gallery`,
    },
    {
      url: `${BASE_URL}/dholera-sir-blogs`,
    },
    {
      url: `${BASE_URL}/dholera-sir-updates`,
    },
    {
      url: `${BASE_URL}/about-dholera-sir`,
    },
    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-county`,
    },
    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-estate`,
    },
    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-residency`,
    },
    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-crown`,
    },
  ];

  const blogUrls = blogs.map((post) => {
    const { modificationDate } = resolveBlogDates(post);

    return {
      url: `${BASE_URL}/dholera-sir-blogs/${post.slug}`,
      lastModified: modificationDate,
    };
  });

  const updateUrls = updates.map((post) => ({
    url: `${BASE_URL}/dholera-sir-updates/${post.slug}`,
    lastModified: post._updatedAt,
  }));

  const aboutDholeraUrls = aboutDholera.map((post) => ({
    url: `${BASE_URL}/about-dholera-sir/${post.slug}`,
    lastModified: post._updatedAt,
  }));

  return [
    ...staticPages,
    ...blogUrls,
    ...updateUrls,
    ...aboutDholeraUrls,
  ];
}