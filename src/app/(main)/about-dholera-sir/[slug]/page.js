import { getPostBySlug } from "@/sanity/lib/api";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "bookmyassets");
  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-12">
            <div className="overflow-hidden rounded-xl shadow-xl">
              <img
                alt={value.alt || " "}
                src={urlFor(value).width(1200).url()}
                width={1200}
                height={800}
                className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm italic text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      // Fixed table component
      table: ({ value }) => {
        if (!value?.rows || !Array.isArray(value.rows)) {
          return null;
        }

        return (
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <tbody>
                {value.rows.map((row, i) => {
                  if (!row?.cells || !Array.isArray(row.cells)) {
                    return null;
                  }

                  return (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-3 border border-gray-200 text-gray-700"
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
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code className="font-mono text-sm">{value.code}</code>
        </pre>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            href={value.href}
            rel="noopener noreferrer"
            className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] transition-colors"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-800">{children}</em>
      ),
      underline: ({ children }) => (
        <u className="underline decoration-gray-400">{children}</u>
      ),
      code: ({ children }) => (
        <code className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800">
          {children}
        </code>
      ),
      "strike-through": ({ children }) => (
        <del className="line-through text-gray-500">{children}</del>
      ),
      textColor: ({ children, value }) => (
        <span style={{ color: value?.color || "inherit" }}>{children}</span>
      ),
      textBackground: ({ children, value }) => (
        <span style={{ backgroundColor: value?.color || "transparent" }}>
          {children}
        </span>
      ),
      button: ({ children, value }) => {
        const getButtonClasses = () => {
          switch (value.style) {
            case "secondary":
              return "bg-gray-600 hover:bg-gray-700";
            case "outline":
              return "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50";
            default:
              return "bg-blue-600 hover:bg-blue-700";
          }
        };

        return (
          <Link
            href={value.href}
            className={`inline-block px-6 py-2 rounded-lg text-white font-medium transition-colors ${getButtonClasses()}`}
          >
            {value.text || children}
          </Link>
        );
      },
    },

    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-20 mb-8 text-gray-900 border-b border-gray-200 pb-3">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-16 mb-6 text-gray-800 border-b border-gray-200 pb-2">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold mt-8 mb-3 text-gray-800">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-lg font-semibold mt-6 mb-2 text-gray-800">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-base font-semibold mt-4 mb-2 text-gray-800">
          {children}
        </h6>
      ),
      normal: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-yellow-500 pl-6 my-8 italic text-gray-700 py-2 bg-gray-50 rounded-r-lg shadow-sm">
          {children}
        </blockquote>
      ),
      leftAlign: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-left">
          {children}
        </p>
      ),
      centerAlign: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-center">
          {children}
        </p>
      ),
      rightAlign: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-right">
          {children}
        </p>
      ),
      justify: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg text-justify">
          {children}
        </p>
      ),
      small: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-base">
          {children}
        </p>
      ),
      medium: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">{children}</p>
      ),
      large: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-xl">{children}</p>
      ),
      xlarge: ({ children }) => (
        <p className="mb-6 text-gray-700 leading-relaxed text-2xl">
          {children}
        </p>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
      number: ({ children }) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
    },
  };

  return (
    <>
      <div className="pt-48 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6">{post.title}</h1>

        {post.mainImage && (
          <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <div className="prose max-w-none">
          <PortableText value={post.body} components={components} />
        </div>

        {/* Add more fields as needed */}
      </div>
    </>
  );
}
