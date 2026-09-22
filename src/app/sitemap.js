import { client } from "@/sanity/lib/client";
import { resolveBlogDates } from "@/lib/blogDates";

const BASE_URL = "https://www.bookmyassets.com";

const SANITY_OPTIONS = {
  next: {
    revalidate: 3600,
  },
};

const ABOUT_DHOLERA_PRIORITIES = {
  "Tata-Semiconductor-Plant-in-Dholera": 0.8,

  "infrastructure-development": 0.64,
  "abcd-building-dholera": 0.64,
  "ahmedabad-dholera-monorail-project": 0.64,
  "dholera-international-airport-cargo": 0.64,

  "water-treatment-plant-in-dholera": 0.512,
  "dholera-solarpark": 0.512,
  "residential-plots-in-dholera": 0.512,
  "dholera-bhavnagar-sea-port": 0.512,
  "Ahmedabad-Dholera_Expressway": 0.512,
  "dholera-activation-area": 0.512,
  "connectivity-in-dholera": 0.512,
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
      priority: 1,
    },

    {
      url: `${BASE_URL}/bulk-land`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/contact`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/about-dholera-sir`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/channel-partner`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/gallery`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/about`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/faqs`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-residency`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-estate`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-residential-plots/westwyn-county`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/book-video-call`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir-updates`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-sir-blogs`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/career`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/dholera-events`,
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/career/job-opening`,
      priority: 0.64,
    },
  ];

  const blogUrls = blogs.map((post) => {
    const { modificationDate } = resolveBlogDates(post);

    return {
      url: `${BASE_URL}/dholera-sir-blogs/${post.slug}`,
      lastModified: modificationDate,
      priority: 0.64,
    };
  });

  const updateUrls = updates.map((post) => ({
    url: `${BASE_URL}/dholera-sir-updates/${post.slug}`,
    lastModified: post._updatedAt,
    priority: 0.64,
  }));

  const aboutDholeraUrls = aboutDholera.map((post) => ({
    url: `${BASE_URL}/about-dholera-sir/${post.slug}`,
    lastModified: post._updatedAt,

    priority:
      ABOUT_DHOLERA_PRIORITIES[post.slug] ??
      0.512,
  }));

  return [
    ...staticPages,
    ...blogUrls,
    ...updateUrls,
    ...aboutDholeraUrls,
  ];
}