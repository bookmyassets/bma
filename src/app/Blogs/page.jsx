import { getblogs } from "@/sanity/lib/api";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";

export default async function BlogsPage() {
  const posts = await getblogs();

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug || { current: "#" },
  }));

  const trendingBlogs = safePosts.slice(0, 3);
  const regularBlogs = safePosts;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      
      {/* Hero Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
          <h1 className="text-4xl font-bold text-center text-gray-800">BLOGS</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 py-8 md:py-12 ml-4 md:ml-12 mr-4 md:mr-12">
        <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-6">
          {/* Trending Section - Left Sidebar */}
          <div className="lg:w-1/4 ">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDB913] sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Trending Blogs</h2>
              <div className="space-y-6">
                {trendingBlogs.map((post) => (
                  <TrendingBlogItem key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ">
              {regularBlogs.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}