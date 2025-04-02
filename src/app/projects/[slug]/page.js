import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function Post({ params }) {
  const post = await getPostBySlug(params.slug);

  // Calculate read time (rough estimate)
  const wordCount = JSON.stringify(post.body).split(" ").length;
  const readTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
  const isProject = post.categories?.some(
    (category) => category.title.toLowerCase() === "project"
  );

  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-8">
            <img
              alt={value.alt || " "}
              src={urlFor(value).width(800).url()}
              width={800}
              height={600}
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
      link: ({ children, value }) => {
        return (
          <Link
            href={value.href}
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
          >
            {children}
          </Link>
        );
      },
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },
  };

  return (
    <main className="min-h-screen max-w-7xl mx-auto pt-56 py-12">
      <article className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      {post.mainImage && (
          <div className="relative w-full">
            <Image
              src={urlFor(post.mainImage)?.url() || ""}
              alt={post.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </article>
      <div>
      

        <div className="px-8 py-10">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category.title}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta information */}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.body} components={components} />
          </div>
        </div>
      </div>
    </main>
  );
}