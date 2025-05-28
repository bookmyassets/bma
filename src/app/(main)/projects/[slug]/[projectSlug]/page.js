import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import {
  getPostBySlug,
  getProjectBySlug,
  getProjectSOBySlug,
} from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import CostSheet from "@/app/(main)/components/costSheet";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
  };
}

export default async function SubProjectDetail({ params }) {
  const { slug, projectSlug } = await params;

  if (!slug || !projectSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  try {
    const [mainProject, subProject, soldOutProjects] = await Promise.all([
      getPostBySlug(slug),
      getProjectBySlug(projectSlug),
      getProjectSOBySlug(slug),
    ]);

    if (!mainProject || !subProject) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Project not found
        </div>
      );
    }

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
          <p className="mb-6 text-gray-700 leading-relaxed text-lg">
            {children}
          </p>
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
          <p className="mb-6 text-gray-700 leading-relaxed text-lg">
            {children}
          </p>
        ),
        large: ({ children }) => (
          <p className="mb-6 text-gray-700 leading-relaxed text-xl">
            {children}
          </p>
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

    const canonicalUrl = `https://www.bookmyassets.com/projects/${slug}/${projectSlug}`;

    const post = await Promise.all([getProjectBySlug(slug)]);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      alternativeHeadline: post.altHeadline || post.title,
      image: post.mainImage?.url,
      author: {
        "@type": "Organization",
        name: "BookMyAssets",
      },
      editor: "BookMyAssets Editorial Team",
      genre: post.genre || "General",
      keywords: post.keywords?.join(", "),

      publisher: {
        "@type": "Organization",
        name: "BookMyAssets",
        logo: {
          "@type": "ImageObject",
          url: "https://www.bookmyassets.com/assets/images/logo.png",
        },
      },
      url: `https://www.bookmyassets.com/projects/${slug}`,

      datePublished: post.publishedAt,
      dateModified: post._updatedAt || post.publishedAt,
      description: post.metaDescription,
    };

    return (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>{subProject.metaTitle}</title>
        <meta name="description" content={subProject.metaDescription} />
        <meta name="keywords" content={subProject.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow"></meta>
        <div className="bg-white min-h-screen">
          <div className="bg-white shadow-sm sticky top-0 z-30 h-16" />

          <header className=" left-0 w-full bg-black text-white z-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h1 className="text-4xl md:text-5xl font-bold">
                {subProject.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl">
                {subProject.description}
              </p>
            </div>
          </header>

          <main className=" max-w-7xl mx-auto px-4 py-4">
            <div className="mb-6">
              <Link
                href={`/projects/${slug}`}
                className="text-[#C69C21] hover:text-[#FDB913] flex items-center gap-2"
              >
                ← More about {mainProject.title}
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              <article className="lg:w-2/3">
                {subProject.mainImage && (
                  <div className="mb-10 overflow-hidden shadow-2xl pt-8 scale-105">
                    <Image
                      src={
                        urlFor(subProject.mainImage)
                          .width(1200)
                          .height(900)
                          .url() || ""
                      }
                      alt={subProject.title}
                      width={1200}
                      height={800}
                      className="w-full h-full"
                      priority
                    />
                  </div>
                )}

                <div className="lg:hidden mb-10">
                  {subProject?.relatedProjects?.length > 0 && (
                    <aside className="your-sidebar-class">
                      <h3 className="text-xl font-bold mb-4 text-black">
                        Our {mainProject.title} Projects
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {subProject.relatedProjects.map((project) => {
                          const projectSlugStr =
                            typeof project.slug === "object"
                              ? project.slug.current
                              : project.slug;

                          return (
                            <Link
                              key={projectSlugStr}
                              href={`/projects/${slug}/${projectSlugStr}`}
                              className="flex flex-col items-center text-center hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition"
                            >
                              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-200 mb-2">
                                {project.mainImage && (
                                  <Image
                                    src={urlFor(project.mainImage)
                                      .width(200)
                                      .height(200)
                                      .url()}
                                    alt={project.title}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <h4 className="text-sm font-semibold text-black">
                                {project.title}
                              </h4>
                            </Link>
                          );
                        })}
                      </div>
                    </aside>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
                  <div className="text-lg leading-5 max-w-none">
                    <PortableText
                      value={subProject.body}
                      components={components}
                    />
                  </div>
                </div>
              </article>

              <aside className="lg:w-1/3">
                {subProject?.relatedProjects?.length > 0 && (
                  <div className="bg-white rounded-xl max-md:hidden shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-black">
                      Our {mainProject.title} Projects
                    </h3>
                    <div className="space-y-4">
                      {subProject.relatedProjects.map((project) => {
                        const projectSlugStr =
                          typeof project.slug === "object"
                            ? project.slug.current
                            : project.slug;

                        return (
                          <Link
                            key={projectSlugStr}
                            href={`/projects/${slug}/${projectSlugStr}`}
                            className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-lg transition"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                              {project.mainImage && (
                                <Image
                                  src={urlFor(project.mainImage)
                                    .width(64)
                                    .height(64)
                                    .url()}
                                  alt={project.title}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-black">
                                {project.title}
                              </h4>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {soldOutProjects?.relatedProjects?.length > 0 && (
                  <div className="bg-white rounded-xl max-md:hidden shadow-md mt-4 p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-black">
                      Our Sold Out Projects
                    </h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      {soldOutProjects.relatedProjects.map((project) => {
                        const projectSlugStr =
                          typeof project.slug === "object"
                            ? project.slug.current
                            : project.slug;

                        return (
                          <Link
                            key={projectSlugStr}
                            href={`/projects/${slug}/${projectSlugStr}`}
                            className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-lg transition"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                              {project.mainImage && (
                                <Image
                                  src={urlFor(project.mainImage)
                                    .width(64)
                                    .height(64)
                                    .url()}
                                  alt={project.title}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-black">
                                {project.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                  SOLD OUT
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="sticky mt-8 top-32">
                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-black">
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="font-medium text-[#C69C21]">
                          {subProject.categories?.find((c) =>
                            ["active", "sold out", "coming soon"].includes(
                              c.title
                            )
                          )?.title || "Active"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium">
                          {subProject.location || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment</span>
                        <span className="font-medium">
                          {subProject.investment || "Contact for details"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Returns</span>
                        <span className="font-medium">
                          {subProject.returns || "Contact for details"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <button className="w-full bg-[#FDB913] hover:bg-[#C69C21] text-black py-3 rounded-lg font-medium transition-colors">
                        Request More Information
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-black">
                      Parent Project
                    </h3>
                    <Link
                      href={`/projects/${slug}`}
                      className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-lg transition"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                        {mainProject.mainImage && (
                          <Image
                            src={urlFor(mainProject.mainImage)
                              .width(64)
                              .height(64)
                              .url()}
                            alt={mainProject.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-black">
                          {mainProject.title}
                        </h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
            <CostSheet />
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading project</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/projects"
            className="mt-4 inline-block text-[#C69C21] hover:text-[#FDB913]"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }
}
