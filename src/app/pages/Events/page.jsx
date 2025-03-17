import Link from "next/link"
import { getblogs } from "@/sanity/lib/api"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { CalendarDays, MessageSquare, User } from "lucide-react"
import "../Events/blog.css"

export default async function BlogPage() {
  const posts = await getblogs()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-black pt-16 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center"></div>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Events
          </h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-gray-200">
            Stay Updated with BMA's exclusive Events
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Post (first post) */}
        {posts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {posts[0].mainImage && (
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={urlFor(posts[0].mainImage).width(800).height(600).url() || "/placeholder.svg"}
                        alt={posts[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                      <span className="absolute top-4 left-4 bg-[#0e48fe] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {posts[0].category || "Featured"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{new Date().toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>5 min read</span>
                  </div>

                  <p className="text-xs text-[#0e48fe] font-medium mb-2">{posts[0].hashtags?.join(" ")}</p>

                  <Link href={posts[0].slug?.current ? `/posts/${posts[0].slug.current}` : "#"}>
                    <h2 className="text-2xl font-bold text-gray-900 hover:text-[#0e48fe] transition mb-3">
                      {posts[0].title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 mb-4">{posts[0].description}</p>

                  <div className="flex items-center mt-auto">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-semibold text-gray-800">{posts[0].author.name}</h3>
                      <p className="text-xs text-gray-500">{posts[0].author.followers || 0} followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.slice(1).map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Image and Category */}
              <div className="relative">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(600).height(400).url() }
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                <span
                  className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: getCategoryColor(post.category),
                  }}
                >
                  {post.category || "Blog"}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>

                <p className="text-xs text-[#0e48fe] font-medium mb-2">{post.hashtags?.join(" ")}</p>

                <Link href={post.slug?.current ? `/posts/${post.slug.current}` : "#"} className="group">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#0e48fe] transition line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.description}</p>

                {/* Author Section */}
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-gray-800">{post.author.name}</h3>
                    <p className="text-xs text-gray-500">{post.author.followers || 0} followers</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}


 