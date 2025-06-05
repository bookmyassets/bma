import { getUpdates } from "@/sanity/lib/api";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";
import hero from "@/assests/latest-dholera-update.webp";
import Image from "next/image";

export default async function BlogsPage() {
  const posts = await getUpdates();

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug || { current: "#" },
  }));

  const trendingBlogs = safePosts.slice(0, 3);
  const regularBlogs = safePosts;
  const canonicalUrl = `https://www.bookmyassets.com/dholera-sir/latest-updates`
  
  return (
    <div className="min-h-screen bg-white">
      <link rel="canonical" href={canonicalUrl}/>
      {/* Navigation */}

      {/* Hero Section */}
      <div className="relative pt-12 h-80 md:h-96 w-full overflow-hidden">
        <Image
          src={hero}
          alt="Dholera Skyline"
          className="object-cover w-full h-full "
          priority
        />
        <div className="absolute inset-0 flex items-center justify-start max-w-7xl mx-auto">
          <div className="text-left px-6 py-10 ">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Dholera  <br/> <span className="text-[#ddb954]">Latest Updates</span> 
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 py-8 md:py-12 ml-4 md:ml-12 mr-4 md:mr-12">
        <div className="flex flex-col max-sm:flex-col lg:flex-row gap-6">
          {/* Trending Section - Left Sidebar */}
          <div className="lg:w-1/4 ">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#FDB913] sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Latest Updates
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
