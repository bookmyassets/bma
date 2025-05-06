import { getUpdates, projectInfo } from "@/sanity/lib/api";
import hero from "@/assests/blogHero.webp";
import Image from "next/image";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";
import Link from "next/link";

export default async function BlogsPage() {
  const posts = (await projectInfo()) || []; // Fallback to empty array if null/undefined

  // Optional warning for debugging
  if (!Array.isArray(posts)) {
    console.warn("projectInfo() did not return an array:", posts);
  }

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug || { current: "#" },
  }));

  const p = (await getUpdates()) || [];
  const trendingBlogs = p.slice(0, 3);
  const regularBlogs = safePosts;
  const canonicalUrl = `https://www.bookmyassets.com/blogs`;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <div className="min-h-screen bg-white">
        {/* Hero Section with Black Background */}
        <div className="relative bg-black text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative w-full h-[300px]">
            <Image
              src={hero}
              alt="Dholera Skyline"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl font-bold text-white">Dholera SIR</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Trending Section - Left Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#FDB913] sticky top-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Latest Updates on Dholera
                </h2>
                <div className="space-y-6">
                  {trendingBlogs.map((post) => (
                    <TrendingBlogItem key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularBlogs.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-black text-white py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with Dholera SIR
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Subscribe to our newsletter for the latest investment opportunities and updates.
            </p>
            <Link
              href="/contact"
              className="bg-[#FDB913] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#C69C21] transition-colors shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
