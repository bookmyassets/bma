import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getblogs, getUpdates, getPostBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug); 

  return {
    title: post.title,
    description: post.metaDescription,
  };
}

// Trending Blog Item Component
const TrendingBlogItem = ({ post }) => {
  return (
    <Link href={`/blogs/${post.slug.current}`}>
      <div className="flex gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
        {post.mainImage && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={urlFor(post.mainImage).width(80).height(80).url()}
              alt={post.title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
            {post.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Related Blog Card Component
const RelatedBlogCard = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug.current}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
          {blog.mainImage ? (
            <Image
              src={urlFor(blog.mainImage).width(400).height(250).url()}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {blog.categories && blog.categories.length > 0 && (
            <div className="absolute top-2 left-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full bg-opacity-90">
                {blog.categories[0].title || "Blog"}
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(blog.publishedAt || blog._createdAt).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="hover:text-[#C69C21] text-[#FDB913] p-1 rounded-xl font-semibold bg-gray-800 inline-flex items-center">
              Read more
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function Post({ params }) {
  const { slug } = params;

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  try {
    const [ post, trendingBlogs, relatedBlogs] = await Promise.all([
      getPostBySlug(slug),
      getblogs(0,4), // Get only 4 blogs
      getUpdates(slug, 3), 
    ]);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Blog post not found</h1>
            <Link
              href="/blogs"
              className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>
      );
    }

    const components = {
      types: {
        image: ({ value }) => {
          if (!value?.asset?._ref) return null;
          return (
            <figure className="my-8">
              <img
                loading="lazy"
                alt={value.alt || ""}
                src={urlFor(value).width(1200).url()}
                width={1200}
                height={800}
                className="w-full rounded-xl shadow-lg"
              />
              {value.caption && (
                <figcaption className="mt-2 text-center text-sm text-gray-500">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          );
        },
      },
      marks: {
        link: ({ children, value }) => (
          <a
            href={value.href}
            rel="noopener noreferrer"
            className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] transition-colors"
          >
            {children}
          </a>
        ),
      },
      block: {
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mt-12 mb-6 text-black">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-black">
            {children}
          </h3>
        ),
        normal: ({ children }) => (
          <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#FDB913] pl-4 my-6 italic text-gray-700">
            {children}
          </blockquote>
        ),
      },
    };

    const formattedDate = new Date(
      post.publishedAt || post._createdAt
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const wordCount = JSON.stringify(post.body).split(" ").length;
    const readingTime = Math.ceil(wordCount / 200);
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "alternativeHeadline": post.altHeadline || post.title,
      "image": post.mainImage?.url,
      "author": {
        "@type": "Organization",
        "name": "BookMyAssets"
      },
      "editor": "BookMyAssets Editorial Team",
      "genre": post.genre || "General",
      "keywords": post.keywords?.join(", "),
      "wordcount": wordCount.toString(),
      "publisher": {
        "@type": "Organization",
        "name": "BookMyAssets",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.bookmyassets.com/assets/images/logo.png"
        }
      },
      "url": `https://www.bookmyassets.com/blogs/${post.slug.current}`,
      "mainEntityOfPage": `https://www.bookmyassets.com/blogs/${post.slug.current}`,
      "datePublished": post.publishedAt,
      "dateModified": post._updatedAt || post.publishedAt,
      "description": post.metaDescription
    };

    const canonicalUrl = `https://www.bookmyassets.com/blogs/${post.slug.current}`;

    return (
      <div className="bg-white min-h-screen">
        <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
    <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        <div className="bg-white shadow-sm sticky top-0 z-30" />

        <main className="max-w-7xl mx-auto px-4 py-8 pt-44">
          <div className="flex flex-col lg:flex-row gap-10">
            <article className="lg:w-2/3">
              <div className="mb-4">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <Link
                          href="/blogs"
                          className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2"
                        >
                          Blogs
                        </Link>
                      </div>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">
                          {post.title}
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="mb-8">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category._id || category.title}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <time className="text-gray-500">{formattedDate}</time>
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{readingTime || post.readingTime || "5"} min read</span>
                  </div>
                </div>
              </div>

              {post.mainImage && (
                <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(675).url()}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              )}

              <div className="bg-white rounded-xl shadow-2xl text-black leading-5 shadow-t-2xl p-8 border border-gray-200">
                <div className="text-xl max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Related Topics:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blogs/tag/${tag}`}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            <aside className="lg:w-1/3">
              <div className="sticky space-y-4 top-24">
                {/* Trending posts */}
                <div className="bg-black rounded-xl shadow-2xl shadow-gray-500 p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-blue-300">
                    Latest Blogs
                  </h3>
                  <div className="">
                    {trendingBlogs && trendingBlogs.length > 0 ? (
                      trendingBlogs.map((post) => (
                        <div key={post._id} className="mb-3">
                          <TrendingBlogItem post={post} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">
                        No trending articles found.
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-6">
                    <Link href="/blogs">
                      <button className="text-center rounded-xl text-white font-semibold bg-[#d7b56d] hover:bg-[#c6a45d] p-3 transition-colors">
                       Explore More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

        <section className="bg-gray-50 py-12 mt-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                You might also like
              </h2>
              <Link
                href="/blogs"
                className="rounded-xl text-gray-800 font-semibold bg-[#d7b56d] p-1 hover:bg-[#c6a45d]"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs && relatedBlogs.length > 0
                ? relatedBlogs.map((blog) => (
                    <RelatedBlogCard key={blog._id} blog={blog} />
                  ))
                : Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                      >
                        <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200"></div>
                        <div className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", slug, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading blog post</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/blogs"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}