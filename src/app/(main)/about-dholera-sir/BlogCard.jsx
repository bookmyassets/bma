import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  return (
    <Link href={`/about-dholera-sir/${post.slug.current}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Blog Post Image */}
        <div className="relative h-52">
          {post.mainImage ? (
            <Image
              src={
                urlFor(post.mainImage).width(1200).height(675).url() ||
                "/placeholder.svg"
              }
              alt={post.title || "Blog post"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] transition-colors line-clamp-2">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FDB913] mr-2"></span>
                <span className="text-black font-medium">Read More</span>
              </div>
              <span className="text-[#C69C21] font-medium">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}