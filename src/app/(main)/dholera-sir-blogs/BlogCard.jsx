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
      href={post.slug?.current ? `/dholera-sir-blogs/${post.slug.current}` : "#"}
      className="group h-full block"
    >
      <div className="flex flex-col bg-white shadow-2xl hover:shadow-2xl hover:shadow-[#ddbc69] rounded-xl overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-1 border border-gray-200">
        {/* Image */}
        <div className="relative h-48 shrink-0">
          {post.mainImage ? (
            <Image
              src={
                urlFor(post.mainImage).width(700).height(467).auto("format").quality(75).url()
                || "/placeholder.svg"
              }
              alt={post.title || "Blog post image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]" />
          )}
        </div>

        {/* Content */}
        <div className="p-2 md:p-4 flex flex-col flex-1">
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
