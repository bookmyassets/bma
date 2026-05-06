import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import {
  getPostBySlug,
  getUpdateBySlug,
  getUpdates,
  getblogs,
  projectInfo,
} from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import SlugPageForm from "../../components/SlugPageForm";
import { generateMetadata as buildMeta } from "@/lib/seo";
import SchemaMarkup from "../../components/SchemaMarkup";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

const URLFormatter = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const extractHeadings = (body) => {
  if (!body || !Array.isArray(body)) return [];

  return body
    .filter((block) => {
      // Check if it's a valid heading block
      const isHeading =
        block.style &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.style);

      // Check if it has valid text content
      const hasValidText =
        block.children &&
        Array.isArray(block.children) &&
        block.children.length > 0 &&
        block.children[0]?.text &&
        block.children[0].text.trim().length > 0;

      return isHeading && hasValidText;
    })
    .map((block) => ({
      ...block,
      // Ensure we have clean text
      children: [
        {
          ...block.children[0],
          text: block.children[0].text.trim(),
        },
      ],
    }));
};

// Right Sidebar Component
const RightSidebar = ({ trendingBlogs, relatedProjects, type = "blog" }) => {
  return (
    <aside className="lg:w-1/3 space-y-4 pt-4">
      <div className="bg-gradient-to-br from-[#C69C21]/10 to-[#FDB913]/10 rounded-xl p-6 border border-[#C69C21]/20">
        <h4 className="font-bold text-lg mb-3 text-gray-900">
          Get the Complete Dholera Investment Guide
        </h4>
        <p className="text-gray-700 mb-4 text-sm">
          Learn which sectors are driving growth in Dholera.
        </p>
        <a
          href="tel:+918130371647"
          className="w-full bg-[#deae3c] hover:bg-[#f3bb39] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Lets Connect
        </a>
      </div>
      <div className="sticky top-24 space-y-6">
        {/* Latest Content Section */}
        <div className="bg-black rounded-xl shadow-2xl shadow-gray-500 p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-white">Latest Updates</h3>
          <div className="space-y-8 max-h-[400px] overflow-y-auto">
            {trendingBlogs?.slice(1, 5).map((item) => (
              <Link
                key={item._id}
                href={`/dholera-sir-updates/${item.slug.current}`}
              >
                <div className="flex gap-3 items-center bg-white hover:bg-gray-50 p-3  border border-gray-200 transition-all hover:shadow-md">
                  {item.mainImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(item.mainImage).width(64).height(64).url()}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-600">
            <Link
              href="/dholera-sir-updates"
              className="w-full text-center rounded-xl text-white font-semibold bg-[#deae3c] hover:bg-[#f3bb39]  p-3 transition-colors"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getUpdateBySlug(slug);
  if (!post) return {};

  return buildMeta({
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    slug: `dholera-sir-updates/${post.slug.current}`,
    image: post.mainImage?.asset?.url,
    canonicalUrl: post.seo?.canonicalUrl,
    noIndex: post.seo?.noIndex,
    keywords: post.seo?.keywords || post.keywords || [],
    type: "article",
    publishedAt: post.publishedAt,
    updatedAt: post._updatedAt,
  });
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getUpdateBySlug(slug);

  const site = "bookmyassets";

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  try {
    const [post, trendingBlogs, relatedBlogs] = await Promise.all([
      getUpdateBySlug(slug),
      getUpdates(1, 6), // Get 6 blogs for sidebar
      getUpdates(slug, 3),
    ]);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Blog post not found</h1>
            <Link
              href="/dholera-sir-updates"
              className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
            >
              ← Back to Updates
            </Link>
          </div>
        </div>
      );
    }

    const components = {
      types: {
        image: ({ value }) => {
          if (!value?.asset) return null;
          const imageUrl =
            value.asset.url || urlFor(value).width(1200).height(800).url();
          const imageNode = (
            <img
              src={imageUrl}
              alt={value.alt || ""}
              className="w-full h-auto aspect-[3/2] rounded-lg my-6"
              width={1200}
              height={800}
              loading="lazy"
            />
          );
          return (
            <figure className="my-6">
              {value.url ? (
                <a
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {imageNode}
                </a>
              ) : (
                imageNode
              )}
              {value.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          );
        },

        table: ({ value }) => {
          if (!value?.rows || !Array.isArray(value.rows)) return null;
          return (
            <div className="overflow-x-auto my-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full">
                <tbody>
                  {value.rows.map((row, i) => {
                    const cells = row.cells || row;
                    if (!cells || !Array.isArray(cells)) return null;
                    return (
                      <tr
                        key={i}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          i === 0
                            ? "bg-gradient-to-r from-[#C69C21]/10 to-[#FDB913]/10 font-semibold"
                            : i % 2 === 0
                              ? "bg-gray-50/50"
                              : "bg-white"
                        }`}
                      >
                        {cells.map((cell, j) => (
                          <td
                            key={j}
                            className="px-6 py-4 text-gray-700 border-b border-gray-100 last:border-r-0 text-[clamp(0.8rem,calc(0.4vw+0.75rem),0.95rem)]"
                          >
                            {typeof cell === "string"
                              ? cell
                              : cell?.text || cell?.value || ""}
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

        htmlTableBlock: ({ value }) => {
          if (!value?.html) return null;
          return (
            <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <div
                className="[&_table]:w-full [&_table]:border-collapse [&_table]:bg-white
                     [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-700
                     [&_th]:bg-gray-50 [&_th]:border-b [&_th]:border-gray-200
                     [&_td]:px-6 [&_td]:py-4 [&_td]:text-gray-600 [&_td]:border-b [&_td]:border-gray-200
                     [&_tr:last-child_td]:border-b-0 [&_tr:hover]:bg-gray-50/50
                     [&_th:first-child]:rounded-tl-lg [&_th:last-child]:rounded-tr-lg
                     [&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg"
                dangerouslySetInnerHTML={{ __html: value.html }}
              />
            </div>
          );
        },

        code: ({ value }) => (
          <div className="my-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-1 shadow-2xl">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
              <code className="font-mono text-[clamp(0.75rem,calc(0.4vw+0.7rem),0.875rem)] leading-relaxed">
                {value.code}
              </code>
            </pre>
          </div>
        ),
      },

      marks: {
        link: ({ children, value }) => {
          // Helper function to extract plain text from children
          const extractText = (node) => {
            if (typeof node === "string") return node;
            if (Array.isArray(node)) {
              return node.map(extractText).join("");
            }
            if (node?.props?.children) {
              return extractText(node.props.children);
            }
            return "";
          };

          const linkText = extractText(children);
          const titleText = value.title || linkText; // Use provided title or fallback to link text

          return (
            <Link
              href={value.href}
              title={titleText}
              rel="noopener noreferrer"
              className="text-[#C69C21] hover:text-[#FDB913] underline decoration-[#FDB913]/30 hover:decoration-[#FDB913] decoration-2 underline-offset-4 transition-all duration-300 hover:bg-[#FDB913]/5 px-1 py-0.5 rounded"
            >
              {children}
            </Link>
          );
        },
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900 px-1 py-0.5 rounded">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800 px-1 py-0.5 rounded">
            {children}
          </em>
        ),
        code: ({ children }) => (
          <code className="font-mono bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 rounded-md text-[clamp(0.75rem,calc(0.4vw+0.7rem),0.875rem)] text-gray-800 border border-gray-300">
            {children}
          </code>
        ),
        button: ({ children, value }) => {
          const getButtonClasses = () => {
            switch (value.style) {
              case "secondary":
                return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl";
              case "outline":
                return "bg-transparent border-2 border-[#C69C21] text-[#C69C21] hover:bg-[#C69C21] hover:text-white shadow-md hover:shadow-lg";
              default:
                return "bg-gradient-to-r from-[#C69C21] to-[#FDB913] hover:from-[#FDB913] hover:to-[#C69C21] shadow-lg hover:shadow-xl";
            }
          };
          return (
            <a
              href={value.href}
              className={`inline-block px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 text-[clamp(0.875rem,calc(0.5vw+0.8rem),1rem)] ${getButtonClasses()}`}
            >
              {value.text || children}
            </a>
          );
        },
      },

      block: {
        ...(() => {
          const makeHeading =
            (Tag, className) =>
            ({ children }) => {
              const getText = () => {
                if (typeof children === "string") return children;
                if (Array.isArray(children))
                  return children
                    .map((c) =>
                      typeof c === "string" ? c : c?.props?.text || "",
                    )
                    .join("");
                return "";
              };
              const id = URLFormatter(getText());
              return (
                <Tag id={id} className={className}>
                  <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] rounded-full" />
                  {children}
                </Tag>
              );
            };
          return {
            h1: makeHeading(
              "h1",
              "text-[clamp(1.75rem,calc(3vw+1rem),3rem)] font-black mt-8 mb-6 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-4 [&+ul]:mt-4 [&+ol]:mt-4",
            ),
            h2: makeHeading(
              "h2",
              "text-[clamp(1.375rem,calc(2.5vw+1rem),1.875rem)] font-bold mt-8 mb-4 text-gray-800 relative border-l-4 border-[#FDB913] pl-3 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-3 [&+ul]:mt-4 [&+ol]:mt-4",
            ),
            h3: makeHeading(
              "h3",
              "text-[clamp(1.25rem,calc(2vw+1rem),1.875rem)] font-bold mt-8 mb-4 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-2 [&+ul]:mt-4 [&+ol]:mt-4",
            ),
            h4: makeHeading(
              "h4",
              "text-[clamp(1.125rem,calc(1.5vw+1rem),1.5rem)] font-semibold mt-6 mb-3 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-2 [&+ul]:mt-3 [&+ol]:mt-3",
            ),
            h5: makeHeading(
              "h5",
              "text-[clamp(1rem,calc(1.2vw+0.9rem),1.25rem)] font-semibold mt-6 mb-3 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-2 [&+ul]:mt-3 [&+ol]:mt-3",
            ),
            h6: makeHeading(
              "h6",
              "text-[clamp(0.875rem,calc(1vw+0.8rem),1.125rem)] font-semibold mt-4 mb-2 text-gray-800 relative border-l-4 border-[#FDB913] pl-6 bg-gradient-to-r from-[#FDB913]/5 to-transparent py-1 [&+ul]:mt-2 [&+ol]:mt-2",
            ),
          };
        })(),

        normal: ({ children }) => (
          <p className="mb-4 text-gray-700 leading-loose text-[clamp(0.9rem,calc(0.5vw+0.85rem),1.125rem)] font-light tracking-wide">
            {children}
          </p>
        ),

        blockquote: ({ children }) => (
          <blockquote className="relative my-8 p-8 bg-gradient-to-br from-[#C69C21]/5 to-[#FDB913]/10 rounded-2xl shadow-lg border border-[#C69C21]/20">
            <div className="absolute top-4 left-6 text-6xl text-[#C69C21]/30 font-serif">
              "
            </div>
            <div className="pl-8 italic text-gray-700 text-[clamp(1rem,calc(1vw+0.85rem),1.25rem)] leading-relaxed font-medium">
              {children}
            </div>
          </blockquote>
        ),

        centerAlign: ({ children }) => (
          <p className="mb-4 text-gray-700 leading-loose text-[clamp(0.9rem,calc(0.5vw+0.85rem),1.125rem)] text-center bg-gray-50 py-6 rounded-xl">
            {children}
          </p>
        ),
      },

      list: {
        bullet: ({ children }) => (
          <ul className="space-y-2 mb-4 pl-0">{children}</ul>
        ),
        number: ({ children }) => (
          <ol
            className="space-y-2 mb-4 pl-0 list-none"
            style={{ counterReset: "item" }}
          >
            {children}
          </ol>
        ),
      },

      listItem: {
        bullet: ({ children }) => (
          <li
            className="
                 text-[clamp(0.875rem,calc(0.5vw+0.8rem),1rem)] leading-relaxed text-gray-700
                 flex items-start gap-3
                 bg-white px-3 py-2.5 rounded-lg shadow-sm border border-gray-100
                 hover:shadow-md transition-shadow duration-300
                 [&_h1]:border-l-0 [&_h1]:pl-0 [&_h1]:bg-transparent [&_h1]:mt-0 [&_h1]:mb-0 [&_h1]:py-0 [&_h1]:text-xl  [&_h1]:font-bold
                 [&_h2]:border-l-0 [&_h2]:pl-0 [&_h2]:bg-transparent [&_h2]:mt-0 [&_h2]:mb-0 [&_h2]:py-0 [&_h2]:text-lg  [&_h2]:font-bold
                 [&_h3]:border-l-0 [&_h3]:pl-0 [&_h3]:bg-transparent [&_h3]:mt-0 [&_h3]:mb-0 [&_h3]:py-0 [&_h3]:text-lg  [&_h3]:font-semibold
                 [&_h4]:border-l-0 [&_h4]:pl-0 [&_h4]:bg-transparent [&_h4]:mt-0 [&_h4]:mb-0 [&_h4]:py-0 [&_h4]:text-xl [&_h4]:font-semibold
                 [&_h5]:border-l-0 [&_h5]:pl-0 [&_h5]:bg-transparent [&_h5]:mt-0 [&_h5]:mb-0 [&_h5]:py-0 [&_h5]:text-base [&_h5]:font-semibold
                 [&_h6]:border-l-0 [&_h6]:pl-0 [&_h6]:bg-transparent [&_h6]:mt-0 [&_h6]:mb-0 [&_h6]:py-0 [&_h6]:text-sm  [&_h6]:font-medium
                 [&_span.absolute]:hidden
               "
          >
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-[#C69C21] to-[#FDB913] mt-1.5 flex-shrink-0 flex justify-center items-center" />
            <div className="flex-1 [&>ul]:mt-2 [&>ul]:mb-0 [&>ol]:mt-2 [&>ol]:mb-0 [&>ul>li]:shadow-none [&>ul>li]:border-0 [&>ul>li]:py-1 [&>ol>li]:shadow-none [&>ol>li]:border-0 [&>ol>li]:py-1">
              {children}
            </div>
          </li>
        ),

        number: ({ children }) => (
          <li
            className="
                 text-[clamp(0.875rem,calc(0.5vw+0.8rem),1rem)] leading-relaxed text-gray-700
                 flex items-start gap-3
                 bg-white px-3 py-2.5 rounded-lg shadow-sm border border-gray-100
                 hover:shadow-md transition-shadow duration-300
                 [&_h1]:border-l-0 [&_h1]:pl-0 [&_h1]:bg-transparent [&_h1]:mt-0 [&_h1]:mb-0 [&_h1]:py-0 [&_h1]:text-base [&_h1]:font-semibold
                 [&_h2]:border-l-0 [&_h2]:pl-0 [&_h2]:bg-transparent [&_h2]:mt-0 [&_h2]:mb-0 [&_h2]:py-0 [&_h2]:text-base [&_h2]:font-semibold
                 [&_h3]:border-l-0 [&_h3]:pl-0 [&_h3]:bg-transparent [&_h3]:mt-0 [&_h3]:mb-0 [&_h3]:py-0 [&_h3]:text-base [&_h3]:font-semibold
                 [&_span.absolute]:hidden
               "
            style={{ counterIncrement: "item" }}
          >
            <div className="w-7 h-7 flex-shrink-0 rounded-full bg-gradient-to-r from-[#C69C21] to-[#FDB913] flex items-center justify-center text-white text-xs font-bold mt-0.5">
              <span className="item-counter" />
            </div>
            <div className="flex-1 [&>ul]:mt-2 [&>ul]:mb-0 [&>ol]:mt-2 [&>ol]:mb-0">
              {children}
            </div>
          </li>
        ),
      },
    };

    const TableOfContent = ({ headings }) => {
      // Filter for valid headings with text content
      const validHeadings =
        headings?.filter((heading) => {
          const text = heading.children?.[0]?.text;
          return text && text.trim().length > 0;
        }) || [];

      // Filter for only h1 and h2 headings
      const h1h2Headings = validHeadings.filter((heading) => {
        return heading.style === "h1" || heading.style === "h2";
      });

      // Hide TOC if no h1 or h2 headings exist
      if (h1h2Headings.length === 0) return null;

      return (
        <div className="my-8 p-6 bg-gradient-to-br from-[#C69C21]/5 to-[#FDB913]/10 rounded-2xl shadow-lg border border-[#C69C21]/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Table of Contents
          </h2>
          <ul className="space-y-3">
            {validHeadings.map((heading, index) => {
              const text = heading.children[0].text.trim();
              const level = parseInt(heading.style.replace("h", ""));
              const indent = (level - 2) * 16;

              return (
                <li
                  key={index}
                  style={{ marginLeft: `${Math.max(0, indent)}px` }}
                  className="relative"
                >
                  <a
                    href={`#${URLFormatter(text)}`}
                    className="text-[#C69C21] hover:text-[#FDB913] hover:underline transition-colors duration-200 flex items-start gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#C69C21] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm leading-relaxed">{text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    const formattedDate = new Date(
      post.publishedAt || post._createdAt,
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return (
      <>
        <SchemaMarkup
          schema={articleSchema({
            title: post.metaTitle || post.title,
            description: post.metaDescription,
            image: post.mainImage?.asset?.url,
            publishedAt: post.publishedAt,
            updatedAt: post._updatedAt,
            slug: `dholera-sir-updates/${slug}`,
            authorName: post.author?.name || "BookMyAssets",
          })}
        />

        <SchemaMarkup
          schema={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Updates", path: "/dholera-sir-updates" },
            { name: post.title, path: `/dholera-sir-updates/${slug}` },
          ])}
        />

        <SlugPageForm
          title="Explore the Latest Development in Dholera"
          button="Talk To A Dholera Expert"
          project={post.title}
        />
        <div className="bg-white min-h-screen">
          <div className="bg-white shadow-sm sticky top-0 z-30" />

          <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main Content */}
              <article className="lg:w-2/3">
                {/* Breadcrumb */}
                <div className="mb-4">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                        <Link
                          href="/"
                          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <Link
                            href="/dholera-sir-updates"
                            className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2"
                          >
                            Updates
                          </Link>
                        </div>
                      </li>
                      <li aria-current="page">
                        <div className="flex items-center">
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">
                            {post.title}
                          </span>
                        </div>
                      </li>
                    </ol>
                  </nav>
                </div>

                {/* Article Header */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((category) => (
                          <span
                            key={category._id || category.title}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex space-x-2 pr-2">
                      {/* WhatsApp */}
                      <Link
                        href={`https://api.whatsapp.com/send?text=https://www.bookmyassets.com/dholera-sir-updates/${post.slug.current}`}
                      >
                        <FaWhatsapp className="text-green-500 w-5 h-5" />
                      </Link>

                      {/* Facebook */}
                      <Link
                        href={`https://www.facebook.com/sharer/sharer.php?u=https://www.bookmyassets.com/dholera-sir-updates/${post.slug.current}`}
                      >
                        <FaFacebook className="text-blue-500 w-5 h-5" />
                      </Link>

                      {/* Instagram - Note: Direct sharing not supported */}
                      {/* Instagram doesn't support web URL sharing. Users need to manually share */}

                      {/* LinkedIn */}
                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.bookmyassets.com/dholera-sir-updates/${post.slug.current}`}
                      >
                        <FaLinkedin className="text-blue-800 w-5 h-5" />
                      </Link>

                      {/* Twitter/X */}
                      <Link
                        href={`https://twitter.com/intent/tweet?url=https://www.bookmyassets.com/dholera-sir-updates/${post.slug.current}`}
                      >
                        <FaXTwitter className=" w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-4xl  font-bold text-gray-900 mb-4">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-4 text-black text-sm mb-6">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>

                      <time
                        className="text-black"
                        dateTime={
                          new Date(post.publishedAt || post._createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      >
                        {formattedDate}
                      </time>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                {post.mainImage && (
                  <div className="mb-10 w-full h-auto overflow-hidden rounded-xl shadow-lg aspect-[3/2]">
                    <Image
                      src={urlFor(post.mainImage).width(1200).height(800).url()}
                      alt={post.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto aspect-[3/2]"
                      priority
                      fetchPriority="high"
                    />
                  </div>
                )}

                <TableOfContent headings={extractHeadings(post.body)} />

                {/* Article Content */}
                <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
                  <div className="text-xl max-w-none">
                    <PortableText value={post.body} components={components} />
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Related Topics:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/blogs/tag/${tag}`}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {/* Right Sidebar */}
              <RightSidebar
                trendingBlogs={trendingBlogs?.filter(
                  (item) => item.slug.current !== slug,
                )}
                relatedProjects={relatedBlogs}
                type="blog"
              />
            </div>
          </main>

          {/* Related Articles Section */}
          <section className="bg-gray-50 py-12 mt-4">
            <div className="max-w-7xl mx-auto px-4">
              <div className=" gap-6">
                {relatedBlogs && relatedBlogs.length > 0 ? (
                  <>
                    {/* Mobile Slider with Improved Design */}
                    <div className="md:hidden -mx-4 px-4">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Our Latest Blogs
                        </h2>
                        <Link
                          href="/dholera-sir-blogs"
                          className="rounded-xl text-white font-semibold bg-[#deae3c] hover:bg-[#f3bb39] px-4 py-2"
                        >
                          View all
                        </Link>
                      </div>
                      <div className="relative">
                        <div
                          className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                        >
                          {relatedBlogs.map((blog, index) => (
                            <Link
                              key={blog._id}
                              href={`/dholera-sir-updates/${blog.slug.current}`}
                              className="group snap-start flex-shrink-0 first:ml-0"
                              style={{ width: "calc(100vw - 3rem)" }}
                            >
                              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-500 border border-gray-100 relative">
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                  {blog.mainImage ? (
                                    <>
                                      <Image
                                        src={urlFor(blog.mainImage)
                                          .width(1200)
                                          .height(675)
                                          .url()}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </>
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#FDB913] via-[#E5A622] to-[#C69C21] flex items-center justify-center relative overflow-hidden">
                                      <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20" />
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16" />
                                      </div>
                                      <span className="text-white/80 text-sm font-medium relative z-10">
                                        No image
                                      </span>
                                    </div>
                                  )}

                                  {/* Category Badge (if you have categories) */}
                                  {blog.category && (
                                    <div className="absolute top-4 left-4 z-10">
                                      <span className="bg-white/95 backdrop-blur-sm text-[#C69C21] px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                        {blog.category}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {/* Content Section */}
                                <div className="p-5">
                                  <h3 className="text-lg font-bold mb-2.5 text-gray-900 group-hover:text-[#C69C21] line-clamp-2 transition-colors duration-300 leading-snug">
                                    {blog.title}
                                  </h3>

                                  {blog.description && (
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                      {blog.description}
                                    </p>
                                  )}

                                  {/* Footer */}
                                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    {blog.publishedAt && (
                                      <div className="flex items-center gap-1.5 text-black">
                                        <svg
                                          className="w-3.5 h-3.5"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          />
                                        </svg>
                                        <span className="text-xs font-medium">
                                          {new Date(
                                            blog.publishedAt,
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1.5 text-[#C69C21] font-semibold text-sm group-hover:gap-2.5 transition-all duration-300">
                                      <span>Read More</span>
                                      <svg
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                {/* Hover Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FDB913] via-[#E5A622] to-[#C69C21] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Scroll Indicator Dots */}
                        <div className="flex justify-center gap-2 mt-2">
                          {relatedBlogs.map((_, index) => (
                            <div
                              key={index}
                              className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Grid Layout with Enhanced Design */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedBlogs.map((blog) => (
                        <Link
                          key={blog._id}
                          href={`/dholera-sir-blogs/${blog.slug.current}`}
                          className="group"
                        >
                          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full w-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col relative">
                            {/* Image Section */}
                            <div className="relative h-56 overflow-hidden">
                              {blog.mainImage ? (
                                <>
                                  <Image
                                    src={urlFor(blog.mainImage)
                                      .width(1200)
                                      .height(675)
                                      .url()}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </>
                              ) : (
                                <div className="h-full bg-gradient-to-br from-[#FDB913] via-[#E5A622] to-[#C69C21] flex items-center justify-center relative overflow-hidden">
                                  <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
                                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
                                  </div>
                                  <span className="text-white/80 text-base font-medium relative z-10">
                                    No image available
                                  </span>
                                </div>
                              )}

                              {/* Category Badge */}
                              {blog.category && (
                                <div className="absolute top-4 left-4 z-10">
                                  <span className="bg-white/95 backdrop-blur-sm text-[#C69C21] px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                                    {blog.category}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-grow">
                              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#C69C21] line-clamp-2 transition-colors duration-300 leading-tight">
                                {blog.title}
                              </h3>

                              {blog.description && (
                                <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
                                  {blog.description}
                                </p>
                              )}

                              {/* Footer */}
                              <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                                {blog.publishedAt && (
                                  <div className="flex items-center gap-2 text-black">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="text-sm font-medium">
                                      {new Date(
                                        blog.publishedAt,
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-[#C69C21] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                                  <span>Explore More</span>
                                  <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Hover Accent Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FDB913] via-[#E5A622] to-[#C69C21] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  // Enhanced Loading Skeleton
                  <>
                    {/* Mobile Skeleton */}
                    <div className="md:hidden -mx-4 px-4">
                      <div className="flex gap-4 overflow-x-auto pb-6">
                        {Array(3)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                              style={{ width: "calc(100vw - 3rem)" }}
                            >
                              <div
                                className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%]"
                                style={{ animation: "shimmer 2s infinite" }}
                              />
                              <div className="p-5">
                                <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-3 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded-lg w-full mb-2 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-4 animate-pulse" />
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                  <div className="h-4 bg-gray-200 rounded-lg w-20 animate-pulse" />
                                  <div className="h-4 bg-gray-200 rounded-lg w-24 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Desktop Skeleton */}
                    <div className="hidden  gap-6">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                          >
                            <div className="h-56 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
                            <div className="p-6">
                              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded-lg w-full mb-2 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-2 animate-pulse" />
                              <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-5 animate-pulse" />
                              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div className="h-4 bg-gray-200 rounded-lg w-24 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded-lg w-28 animate-pulse" />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading blog post:", slug, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading blog post</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/dholera-sir-updates"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}
