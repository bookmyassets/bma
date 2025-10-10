import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import {
  getPostBySlug,
  getblogs,
  getUpdates,
  projectInfo,
} from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import BlogSchemaMarkup from "../BlogSchemaMarkup";

// Right Sidebar Component
const RightSidebar = ({ trendingBlogs, relatedProjects, type = "blog" }) => {
  return (
    <aside className="lg:w-1/3">
      <div className="sticky top-24 space-y-6">
        
        {/* Latest Content Section */}
        <div className="bg-black rounded-xl shadow-2xl shadow-gray-500 p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-white">
            About Dholera SIR
          </h3>
          <div className=" overflow-y-auto">
            {trendingBlogs?.slice(0, 4).map((item) => (
              <Link key={item._id} href={`/dholera-sir-blogs/${item.slug.current}`}>
                <div className="flex gap-3 items-center bg-white hover:bg-gray-50 p-3 border border-gray-200 transition-all hover:shadow-md">
                  {item.mainImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(item.mainImage).width(64).height(64).url()}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-600">
            <Link href="/about-dholera-sir">
              <button className="w-full text-center rounded-xl text-white font-semibold bg-[#deae3c] hover:bg-[#f3bb39] p-3 transition-colors">
                Explore More
              </button>
            </Link>
          </div>
        </div>

        {/* Contact/CTA Card */}
        <div className="bg-gradient-to-br from-[#C69C21]/10 to-[#FDB913]/10 rounded-xl p-6 border border-[#C69C21]/20">
          <h4 className="font-bold text-lg mb-3 text-gray-900">Get In Touch</h4>
          <p className="text-gray-700 mb-4 text-sm">
            Interested in our insights? Contact our experts
          </p>
          <a href="tel:+918130371647" >
          <button className="w-full bg-[#deae3c] hover:bg-[#f3bb39] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">

            Contact Now
          </button>
          </a>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Stay Updated</h4>
          <p className="text-gray-600 text-sm mb-4">
            Subscribe to get the latest updates and insights
          </p>
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C21]"
            />
            <button className="w-full bg-[#C69C21] hover:bg-[#FDB913] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div> */}

      </div>
    </aside>
  );
};

// Trending Blog Item Component (updated)


export default async function Post({ params }) {
  const { slug } = await params;
  const site = "bookmyassets";

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  try {
    const [post, trendingBlogs, relatedBlogs] = await Promise.all([
      getPostBySlug(slug, site),
      getUpdates(0, 6), // Get 6 blogs for sidebar
      getblogs(slug, 3),
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
         if (!value?.asset) return null;
   
         // Use the asset URL directly if urlFor is not working
         const imageUrl = value.asset.url || urlFor(value).width(1200).url();
   
         const imageNode = (
           <img
             src={imageUrl}
             alt={value.alt || ""}
             className="w-full rounded-lg my-6"
             loading="lazy"
           />
         );
   
         return (
           <figure className="my-6">
             {value.url ? (
               <a
                 href={value.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block hover:opacity-90 transition-opacity cursor-pointer"
               >
                 {imageNode}
               </a>
             ) : (
               imageNode
             )}
             {value.caption && (
               <figcaption className="text-center text-sm text-gray-500 mt-2">
                 {value.caption}
               </figcaption>
             )}
           </figure>
         );
       },

        table: ({ value }) => {
          if (!value?.rows || !Array.isArray(value.rows)) {
            return null;
          }

          return (
            <div className="overflow-x-auto my-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full">
                <tbody>
                  {value.rows.map((row, i) => {
                    if (!row?.cells || !Array.isArray(row.cells)) {
                      return null;
                    }

                    return (
                      <tr
                        key={i}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          i === 0
                            ? "bg-gradient-to-r from-[#C69C21]/10 to-[#FDB913]/10 font-semibold"
                            : i % 2 === 0
                              ? "bg-gray-50/50"
                              : "bg-white"
                        }`}
                      >
                        {row.cells.map((cell, j) => (
                          <td
                            key={j}
                            className="px-6 py-4 text-gray-700 border-b border-gray-100 last:border-r-0"
                          >
                            {cell || ""}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        },

        code: ({ value }) => (
          <div className="my-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-1 shadow-2xl">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed">
                {value.code}
              </code>
            </pre>
          </div>
        ),
      },

      marks: {
        link: ({ children, value }) => (
          <Link
            href={value.href}
            rel="noopener noreferrer"
            className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] decoration-2 underline-offset-4 transition-all duration-300 hover:bg-[#FDB913]/5 px-1 py-0.5 rounded"
          >
            {children}
          </Link>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900 px-1 py-0.5 rounded">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800 px-1 py-0.5 rounded">
            {children}
          </em>
        ),
        code: ({ children }) => (
          <code className="font-mono bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 rounded-md text-sm text-gray-800 border border-gray-300">
            {children}
          </code>
        ),
        button: ({ children, value }) => {
          const getButtonClasses = () => {
            switch (value.style) {
              case "secondary":
                return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl";
              case "outline":
                return "bg-transparent border-2 border-[#C69C21] text-[#C69C21] hover:bg-[#C69C21] hover:text-white shadow-md hover:shadow-lg";
              default:
                return "bg-gradient-to-r from-[#C69C21] to-[#FDB913] hover:from-[#FDB913] hover:to-[#C69C21] shadow-lg hover:shadow-xl";
            }
          };

          return (
            <Link
              href={value.href}
              className={`inline-block px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 ${getButtonClasses()}`}
            >
              {value.text || children}
            </Link>
          );
        },
      },

      block: {
        h1: ({ children }) => (
          <h1 className="text-5xl font-black mt-8 mb-10 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-4">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full"></span>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-4xl font-bold mt-16 mb-8 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-3">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full"></span>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-2">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full"></span>
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-2">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full"></span>
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-xl font-semibold mt-8 mb-3 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-2">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full"></span>
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-lg font-semibold mt-6 mb-2 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-1">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full"></span>
            {children}
          </h6>
        ),
        normal: ({ children }) => (
          <p className="mb-8 text-gray-700 leading-loose text-lg font-light tracking-wide">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="relative my-12 p-8 bg-gradient-to-br from-[#C69C21]/5 to-[#FDB913]/10 rounded-2xl shadow-lg border border-[#C69C21]/20">
            <div className="absolute top-4 left-6 text-6xl text-[#C69C21]/30 font-serif">
              "
            </div>
            <div className="pl-8 italic text-gray-700 text-xl leading-relaxed font-medium">
              {children}
            </div>
          </blockquote>
        ),
        centerAlign: ({ children }) => (
          <p className="mb-8 text-gray-700 leading-loose text-lg text-center py-6 rounded-xl">
            {children}
          </p>
        ),
      },

      list: {
        bullet: ({ children }) => (
          <ul className="space-y-4 mb-10 pl-0">{children}</ul>
        ),
        number: ({ children }) => (
          <ol className="space-y-4 mb-10 pl-0 counter-reset-list">
            {children}
          </ol>
        ),
      },

      listItem: {
        bullet: ({ children }) => (
          <li className="text-lg leading-relaxed text-gray-700 flex items-start gap-4 p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
            <div className="w-3 h-3 bg-gradient-to-r from-[#C69C21] to-[#FDB913] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">{children}</div>
          </li>
        ),
        number: ({ children }) => (
          <li className="text-lg leading-relaxed text-gray-700 flex items-start gap-4 p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300 relative counter-increment-list">
            <div className="w-3 h-3 bg-gradient-to-r from-[#C69C21] to-[#FDB913] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              <span className="counter-content"></span>
            </div>
            <div className="flex-1">{children}</div>
          </li>
        ),
      },
    };

    return (
      <>
      <div>


      <title>{post.title}</title>
      <meta name="description" content={post.metaDescription} />
          <meta name="keywords" content={post.keywords} />
          <meta name="publisher" content="BookMyAssets" />
          <BlogSchemaMarkup post={post} relatedBlogs={relatedBlogs} />
          
          {/* Additional SEO meta tags */}
          <link rel="canonical" href={`https://bookmyassets.com/about-dholera-sir/${post.slug.current}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Preload critical resources */}
          {post.mainImage && (
            <link
              rel="preload"
              as="image"
              href={urlFor(post.mainImage).width(1200).height(675).url()}
              />
          )}
              </div>
      <div className="bg-white min-h-screen">
        <div className="bg-white shadow-sm sticky top-0 z-30" />

        <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Main Content */}
            <article className="lg:w-2/3">
              {/* Breadcrumb */}
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
                          >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            />
                        </svg>
                        <Link
                          href="/dholera-sir-blogs"
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
                          >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">
                          {post.title}
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Article Header */}
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
              </div>

              {/* Featured Image */}
              {post.mainImage && (
                <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(675).url()}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-contain"
                    priority
                    />
                </div>
              )}

              {/* Article Content */}
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
                <div className="text-xl max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>

                {/* Tags */}
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

            {/* Right Sidebar */}
            <RightSidebar 
              trendingBlogs={trendingBlogs}
              relatedProjects={relatedBlogs}
              type="blog"
              />

          </div>
        </main>

        {/* Related Articles Section */}
        <section className="bg-gray-50 py-12 mt-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                You might also like
              </h2>
              <Link
                href="/dholera-sir-blogs"
                className="rounded-xl text-white font-semibold px-4 py-2 bg-[#deae3c] hover:bg-[#f3bb39]"
                >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs && relatedBlogs.length > 0
                ? relatedBlogs.map((blog) => (
                  <Link key={blog._id} href={`/dholera-sir-blogs/${blog.slug.current}`}>
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
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
                          <span className="hover:text-[#C69C21] text-[#FDB913] p-1 rounded-xl font-semibold bg-gray-800 inline-flex items-center">
                            Read more
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                  : Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
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
     </>
    );
  } catch (error) {
    console.error("Error loading blog post:", slug, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading blog post</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/dholera-sir-blogs"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}