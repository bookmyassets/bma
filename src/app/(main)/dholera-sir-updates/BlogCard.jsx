import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  return (
    <Link
      href={
        post.slug?.current ? `/dholera-sir-updates/${post.slug.current}` : "#"
      }
      className="group"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-[#ddbc69] hover:shadow-2xl overflow-hidden h-full transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Blog Image */}
        <div className="relative h-48">
          {post.mainImage ? (
            <Image
              src={
                urlFor(post.mainImage)
                  .width(700)
                  .height(467)
                  .auto("format")
                  .quality(75)
                  .url() || "/placeholder.svg"
              }
              alt={post.mainImage?.alt || post.title || "Blog post image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 md:p-4">
          <p className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] line-clamp-2 transition-colors">
            {post.title}
          </p>

          {/* Footer with "Read More" */}
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FDB913] mr-2"></span>
                <span className="text-black font-medium">Explore More</span>
              </div>
              <span className="text-[#C69C21] font-medium">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
