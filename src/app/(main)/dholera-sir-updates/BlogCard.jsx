import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(date)) return "Date not available";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <Link
      href={
        post.slug?.current ? `/dholera-sir-updates/${post.slug.current}` : "#"
      }
      className="group block w-full h-full"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-[#ddbc69] hover:shadow-2xl overflow-hidden h-full w-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Blog Image */}
        <div className="relative w-full h-48 shrink-0">
          {post.mainImage ? (
            <Image
              src={
                urlFor(post.mainImage)
                  .width(1200)
                  .height(800)
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
            <div className="h-full w-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 md:p-4 flex flex-col flex-1 w-full">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] line-clamp-2 transition-colors">
            {post.title}
          </h2>
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex justify-between text-sm">
              <p className="text-black">{formatDate(post.publishedAt || post._createdAt)}</p>
              <p className="font-medium hover:underline text-[#ddbc69]">Explore More →</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}