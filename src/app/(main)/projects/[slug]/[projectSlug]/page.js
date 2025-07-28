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
import ProjectsModalWithButton from "../ProjectModal";
import Projectinformation from "@/app/(main)/components/Projectinformation";
import Reviews from "@/app/(main)/components/Reviews";
import {
  ExternalLink,
  MapPin,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  ArrowRight,
} from "lucide-react";
import PopupForm from "@/app/(main)/components/PopupForm";
import ProjectDocuments from "../ProjectDocuments";

const site = "bookmyassets";

// ProjectCard Component
const ProjectCard = ({
  project,
  isSoldOut = false,
  isParent = false,
  slug,
}) => {
  const projectSlugStr =
    typeof project.slug === "object" ? project.slug.current : project.slug;

  return (
    <Link
      href={
        isParent ? `/projects/${slug}` : `/projects/${slug}/${projectSlugStr}`
      }
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden block"
    >
      <div className="flex gap-4 p-4">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
            {project.mainImage && (
              <Image
                src={urlFor(project.mainImage).width(80).height(80).url()}
                alt={project.title}
                width={80}
                height={80}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
          {isSoldOut && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
              SOLD
            </div>
          )}
        </div>

        <div className="flex min-w-0">
          <h4 className="font-semibold flex items-center  text-gray-900 text-lg md:text-xl mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h4>
          {isParent && (
            <span className="inline-flex items-center text-sm md:text-3xl bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200 mt-2">
              <Eye className="w-3 h-3 mr-1" />
              PARENT PROJECT
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "text-green-600 bg-green-50 border-green-200";
    case "coming soon":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "inactive":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-blue-600 bg-blue-50 border-blue-200";
  }
};

export default async function SubProjectDetail({ params }) {
  const { slug, projectSlug } = await params;
  const site = "bookmyassets";

  if (!slug || !projectSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  try {
    const [mainProject, subProject, soldOutProjects] = await Promise.all([
      getPostBySlug(slug, site),
      getProjectBySlug(projectSlug, site),
      getProjectSOBySlug(slug, site),
    ]);

    if (!mainProject || !subProject) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Project not found
        </div>
      );
    }

    // Determine project status
    const status = subProject.categories?.find((c) => c.title === "Sold Out")
      ? "Inactive"
      : subProject.categories?.find((c) =>
          ["Active", "coming soon"].includes(c.title)
        )?.title || "Active";

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

            <div className="flex flex-col gap-10">
              <article className="">
                <ProjectsModalWithButton currentSlug={slug} />
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

                <div className="mt-12 mb-12">
                  {subProject.projectDocuments &&
                    subProject.projectDocuments.length > 0 && (
                      <ProjectDocuments
                        documents={subProject.projectDocuments}
                      />
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

              <div className="space-y-8 max-md:flex max-md:flex-col max-md:space-y-52">
                {/* Parent Project Section */}
                <div className="bg-gradient-to-br from-white via-white to-purple-50/30 rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-current" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      Parent Project
                    </h3>
                  </div>
                  <ProjectCard project={mainProject} slug={slug} className="" />
                </div>
                <div className="grid lg:grid-cols-2 gap-6 max-md:space-y-48">
                  <div className=" rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 backdrop-blur-sm">
                    <PopupForm
                      title={`Book Your ${subProject.title} Now`}
                      buttonName="Schedule Visit"
                    />
                  </div>

                  {soldOutProjects?.relatedProjects?.length > 0 && (
                    <div className="bg-gradient-to-br from-white via-white to-red-50/30 rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Our Sold Out Projects
                        </h3>
                      </div>
                      <div className="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {soldOutProjects.relatedProjects.map((project) => (
                          <ProjectCard
                            key={project.slug.current}
                            project={project}
                            isSoldOut={true}
                            slug={slug}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CostSheet />
          </main>
          <Reviews />
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
