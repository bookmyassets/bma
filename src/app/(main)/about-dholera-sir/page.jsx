import { projectInfo } from "@/sanity/lib/api";
import React, { Suspense } from "react";
import { unstable_cache } from "next/cache";
import banner from "@/assests/about-dholera-sir-desktop-banner.webp";
import semiconductorHubImage from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";
// import BlogSlider from "./BlogSlider";
// import InlineLeadForm from "../components/InlineLeadForm";
import Link from "next/link";
import Image from "next/image";
// import FAQSection from "./FAQs";
// import MegaIndustries from "./MegaIndustries";

import dynamicImport from "next/dynamic";

const BlogSlider = dynamicImport(() => import("./BlogSlider"), {
  loading: () => <div className="min-h-[300px]" />,
});

const InlineLeadForm = dynamicImport(
  () => import("../components/InlineLeadForm"),
  {
    loading: () => <div className="min-h-[200px]" />,
  },
);

const MegaIndustries = dynamicImport(() => import("./MegaIndustries"), {
  loading: () => <div className="min-h-[200px]" />,
});

const FAQSection = dynamicImport(() => import("./FAQs"), {
  loading: () => <div className="min-h-[200px]" />,
});

export const runtime = "nodejs";
export const revalidate = 3600;

const getCachedProjectInfo = unstable_cache(
  async () => projectInfo(),
  ["about-dholera-sir-project-info"],
  { revalidate: 3600 },
);

export const metadata = {
  title: "What is Dholera SIR? Smart City Guide, Map & Investment 2026",
  description:
    "Complete guide to Dholera SIR, India's first greenfield smart city. Location, DMIC role, airport, expressway, semiconductor hub and investment outlook.",
  alternates: {
    canonical: "https://www.bookmyassets.com/about-dholera-sir",
  },
};

const MAJOR_INFRASTRUCTURE_PROJECTS = [
  "Ahmedabad-Dholera Expressway",
  "Dholera International Airport",
  "Ahmedabad-Dholera Semi-High-Speed Rail",
  "Tata Semiconductor Plant (₹91,000 crore)",
  "Dholera Solar Park (planned in phases)",
  "Proposed Dedicated Seaport by Adani Group",
  "Proposed Monorail Connectivity",
  "ABCD Building for City Administration",
  "ReNew Solar Cell Manufacturing",
];

const UPCOMING_DHOLERA_PROJECTS = [
  "Multi-Speciality Hospital",
  "Integrated School by DICDL",
  "Accommodation Facility for Investors",
  "Fire Station",
  "Multi-Cuisine Food Court",
  "Corporate Hotel",
  "International Tent City",
  "Residential & Commercial Complex",
];

async function BlogSliderSection() {
  let posts = [];

  try {
    const postsData = await getCachedProjectInfo();

    posts = Array.isArray(postsData) ? postsData : [];
  } catch (error) {
    console.error("Error fetching project info:", error);
  }

  const safePosts = posts.map((post) => ({
    ...post,

    author: post.author || "BookMyAssets",

    mainImage: post.mainImage || null,

    slug: post.slug?.current
      ? {
          current: post.slug.current,
        }
      : {
          current: "#",
        },
  }));

  return <BlogSlider posts={safePosts} />;
}

export default async function page() {
  // let posts = [];
  // try {
  //   const postsData = await projectInfo();
  //   posts = Array.isArray(postsData) ? postsData : [];
  //   console.log("Posts data fetched:", posts.length);
  // } catch (error) {
  //   console.error("Error fetching project info:", error);
  // }

  // const safePosts = posts.map((post) => ({
  //   ...post,
  //   author: post.author || "BookMyAssets",
  //   mainImage: post.mainImage || null,
  //   slug: post.slug?.current
  //     ? { current: post.slug.current }
  //     : { current: "#" },
  // }));

  return (
    <>
      {/* Schema Markups */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.bookmyassets.com/about-dholera-sir",
            },
            headline:
              "About Dholera SIR | India's Largest Smart City & Investment Hub",
            description:
              "Discover Dholera SIR - India's largest planned industrial and residential hub. Part of Delhi-Mumbai Industrial Corridor with world-class infrastructure, Tata semiconductor plant, and premium investment opportunities with BookMyAssets.",
            image: "",
            author: {
              "@type": "Organization",
              name: "BooKMyAssets",
              url: "https://www.bookmyassets.com",
            },
            publisher: {
              "@type": "Organization",
              name: "BookMyAssets",
              logo: {
                "@type": "ImageObject",
                url: "https://www.bookmyassets.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbma-logo.7459937c.png&w=96&q=75&dpl=dpl_9ULDZsFrNy1s6zRNGySswsNpWE3n",
              },
            },
            datePublished: "",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "1",
                item: "https://www.bookmyassets.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "2",
                item: "https://www.bookmyassets.com/about-dholera-sir",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "3",
                item: "https://www.bookmyassets.com/dholera-sir-blogs",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Dholera SIR?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera SIR, or Dholera Special Investment Region, is India’s first and largest greenfield smart city. It is being developed in Gujarat as a large-scale industrial and urban hub under the Delhi-Mumbai Industrial Corridor.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Dholera SIR located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera SIR is located in Gujarat, around 100 km from Ahmedabad. Its location gives it strong strategic importance for industrial, infrastructure, and long-term urban development.",
                },
              },
              {
                "@type": "Question",
                name: "Is Dholera SIR government approved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Dholera SIR is a government-backed development. It is being developed with support from the Government of Gujarat and the Government of India under a planned policy and infrastructure framework.",
                },
              },
              {
                "@type": "Question",
                name: "Why is Dholera called a smart city?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is called a smart city because it is being planned with modern infrastructure and integrated systems such as underground utilities, digital governance, smart mobility planning, sustainable zoning, and future-ready urban design.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Dholera different from other developing cities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is being built as a greenfield smart city from the ground up. Its planned development, industrial vision, infrastructure-first model, and policy support make it different from conventional city expansion or unplanned real estate growth.",
                },
              },
              {
                "@type": "Question",
                name: "What major infrastructure projects are planned in Dholera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Major infrastructure linked to Dholera includes the Ahmedabad-Dholera Expressway, Dholera International Airport, activation area development, industrial zones, and large-scale power and connectivity infrastructure.",
                },
              },
              {
                "@type": "Question",
                name: "What is Dholera’s role in India’s semiconductor ecosystem?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is emerging as an important destination in India’s semiconductor and advanced manufacturing ecosystem. This strengthens its long-term industrial relevance and increases investor interest in the region.",
                },
              },
              {
                "@type": "Question",
                name: "What is the Activation Area in Dholera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Activation Area is the early operational zone of Dholera where core infrastructure and ready residential and commercial areas are being developed first. It plays an important role in the city’s phased development model.",
                },
              },
              {
                "@type": "Question",
                name: "Is Dholera suitable for long-term investment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera is generally seen as a long-term growth destination because its value is linked to phased infrastructure, industrial expansion, and planned urban development rather than short-term speculation.",
                },
              },
              {
                "@type": "Question",
                name: "Who governs and plans Dholera SIR?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dholera SIR is administered by the Dholera Special Investment Region Development Authority, which oversees planning, infrastructure, and development implementation for the region.",
                },
              },
            ],
          }),
        }}
      />

      {/* <title>What is Dholera SIR? Smart City Guide, Map & Investment 2026</title>
      <meta
        name="description"
        content="Complete guide to Dholera SIR, India's first greenfield smart city. Location, DMIC role, airport, expressway, semiconductor hub and investment outlook."
      />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/about-dholera-sir"
      /> */}

      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="pt-[clamp(3rem,5vw,4rem)] md:pt-0">
          <div className="md:relative md:h-[70vh] overflow-hidden shadow-lg bg-black">
            <Image
              src={banner}
              alt="Dholera Special Investment Region"
              className="w-full md:h-full h-auto object-contain md:object-cover"
              quality={55}
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,3rem)] py-[clamp(1.5rem,3vw,2.5rem)]">
          {/* Introduction Section */}
          <section className="mb-[clamp(2rem,4vw,3rem)]">
            <div className="text-center mb-[clamp(1.25rem,2.5vw,2rem)]">
              <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white mb-3">
                What is Dholera SIR?
              </h1>
              <div className="w-[clamp(4rem,10vw,6rem)] h-1 bg-[#ddbc69] mx-auto"></div>
            </div>

            <div className="mx-auto">
              <div className="flex flex-col lg:flex-row gap-[clamp(1rem,2vw,2rem)] items-center">
                <div className="lg:w-[40%] w-full" style={{ contain: "layout style paint" }}>
                  <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] shadow-lg border border-white/10">
                    <Image
                      src={semiconductorHubImage}
                      alt="Dholera Smart City"
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      quality={65}
                      loading="lazy"
                      placeholder="blur"
                      width={1000}
                      height={667}
                    />
                  </div>
                </div>
                <div className="lg:w-[60%] text-white/90">
                  <p className="text-white/90 text-fluid-base leading-[1.8] mb-4">
                    <strong>
                      <Link
                        href="/dholera-sir-blogs/dholera-2025-development-infrastructure-progress"
                        prefetch={false}
                        className="text-[#ddbc69] hover:underline"
                      >
                        Dholera Special Investment Region (Dholera SIR)
                      </Link>
                    </strong>{" "}
                    also known as Dholera SIR, is a planned smart city in
                    Gujarat located about 100 km from Ahmedabad. Spread across
                    approximately 920 sq. km and 22 villages, Dholera SIR is
                    being developed under the Delhi-Mumbai Industrial Corridor
                    with industrial zones, residential areas, commercial spaces,
                    wide roads, underground utilities and smart city
                    infrastructure. Dholera is also gaining attention because of
                    major projects such as the Ahmedabad-Dholera Expressway,
                    Dholera International Airport and Tata’s semiconductor
                    manufacturing plant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dholera SIR Act and Master Plan Section */}
          <section
            id="dholera-sir-act"
            aria-labelledby="dholera-sir-act-title"
            className="mb-[clamp(2.5rem,5vw,4.5rem)] border-y border-[#ddbc69]/30 py-fluid-lg"
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
          >
            <div className="mx-auto max-w-7xl">
              <header className="mb-[clamp(1.5rem,3vw,2.25rem)]">
                <h2
                  id="dholera-sir-act-title"
                  className="max-w-3xl text-[clamp(1.25rem,3.5vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
                >
                  What is the{" "}
                  <span className="text-[#ddbc69]">Dholera SIR Act?</span>
                </h2>
              </header>

              <div className="space-y-5 text-fluid-base leading-[1.85] text-white/85">
                <p>
                  The Dholera SIR Act refers to the{" "}
                  <strong className="font-semibold text-white">
                    Gujarat Special Investment Region Act, 2009
                  </strong>
                  . It was introduced by the Government of Gujarat to support
                  the planned development of large investment regions such as
                  Dholera SIR.
                </p>
                <p>
                  The Act provides a structured framework for planning
                  industrial zones, residential areas, roads, public facilities
                  and modern infrastructure. It also led to the formation of the{" "}
                  <strong className="font-semibold text-[#ddbc69]">
                    Dholera Special Investment Region Development Authority
                  </strong>
                  , which manages the planning and development of Dholera SIR.
                </p>
              </div>

              <div
                aria-hidden="true"
                className="my-[clamp(2.5rem,5vw,4rem)] h-px bg-gradient-to-r from-[#ddbc69] via-[#ddbc69]/35 to-transparent"
              />

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ddbc69] sm:text-sm">
                  Planned development
                </p>
                <h2 className="text-fluid-lg font-bold leading-tight tracking-[-0.025em] text-white">
                  Dholera SIR Master Plan
                </h2>
                <p className="mt-5 text-fluid-base leading-[1.85] text-white/85">
                  The Dholera SIR Master Plan has been designed to develop the
                  city in planned phases. Spread across approximately 920 sq.
                  km, the project includes six town-planning schemes with
                  dedicated areas for industry, housing, business and public
                  infrastructure.
                </p>

                <p className="mb-2 mt-8 text-sm font-bold uppercase tracking-[0.18em] text-white">
                  The master plan includes
                </p>
                <ul className="divide-y divide-white/15 border-y border-white/15">
                  {[
                    "Residential Zone",
                    "High Access Corridor",
                    "City Centre",
                    "Knowledge and IT Zones",
                    "Industrial Zones",
                    "Recreation, Sports & Entertainment",
                    "Other Planned Zones",
                  ].map((zone, index) => (
                    <li
                      key={zone}
                      className="flex items-center gap-4 py-3.5 text-fluid-base text-white/90 sm:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        className="w-7 shrink-0 font-mono text-xs font-bold tracking-wider text-[#ddbc69]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{zone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Major and Upcoming Infrastructure Projects */}
          <section
            id="dholera-infrastructure-projects"
            aria-label="Major and upcoming infrastructure projects in Dholera"
            className="mb-[clamp(2.5rem,5vw,4.5rem)]"
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 900px" }}
          >
            <div className="mb-[clamp(1.75rem,4vw,3rem)] flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ddbc69]/55"
              />
              <p className="shrink-0 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#ddbc69] sm:text-sm">
                Infrastructure roadmap
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ddbc69]/55"
              />
            </div>

            <div className="grid gap-[clamp(3rem,7vw,6rem)] lg:grid-cols-2 lg:gap-0">
              <article className="lg:pr-[clamp(2.5rem,5vw,5rem)]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  Major developments
                </p>
                <h2 className="max-w-xl text-[clamp(1.35rem,2.2vw,1.9rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                  Major Infrastructure{" "}
                  <span className="text-[#ddbc69]">Projects in Dholera</span>
                </h2>

                <ul className="mt-7 divide-y divide-white/15 border-y border-white/15">
                  {MAJOR_INFRASTRUCTURE_PROJECTS.map((project) => (
                    <li
                      key={project}
                      className="flex items-start gap-4 py-3.5 text-fluid-sm leading-relaxed text-white/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-2 shrink-0 rotate-45 bg-[#ddbc69]"
                      />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="border-t border-[#ddbc69]/30 pt-[clamp(2.5rem,5vw,4rem)] lg:border-l lg:border-t-0 lg:py-0 lg:pl-[clamp(2.5rem,5vw,5rem)]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  Next phase
                </p>
                <h2 className="max-w-xl text-[clamp(1.35rem,2.2vw,1.9rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                  Upcoming Projects{" "}
                  <span className="text-[#ddbc69]">in Dholera</span>
                </h2>

                <ul className="mt-7 divide-y divide-white/15 border-y border-white/15">
                  {UPCOMING_DHOLERA_PROJECTS.map((project) => (
                    <li
                      key={project}
                      className="flex items-start gap-4 py-3.5 text-[clamp(0.95rem,1.3vw,1.075rem)] leading-relaxed text-white/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-2 shrink-0 rotate-45 bg-[#ddbc69]"
                      />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-[clamp(1.25rem,2.5vw,2rem)]" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 300px" }}>
            <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] border border-white/10 bg-[linear-gradient(135deg,rgba(222,174,60,0.16),rgba(255,255,255,0.03),rgba(17,17,17,0.96))] p-[clamp(1rem,2vw,1.5rem)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(222,174,60,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(222,174,60,0.12),transparent_25%)]"></div>
              <div className="relative z-10 flex flex-col gap-[clamp(0.75rem,1.5vw,1rem)]">
                <div className="space-y-[clamp(0.5rem,1vw,0.75rem)]">
                  <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] text-center font-bold text-white">
                    Speak with our investment advisor today
                  </h2>
                  <p className=" text-[clamp(1rem,1.4vw,1.125rem)] text-center leading-[1.7] text-white/85">
                    Get clear guidance on the semiconductor hub, infrastructure
                    roadmap, and the best investment options in Dholera.
                  </p>
                </div>

                <div className="flex items-center justify-center  flex-row gap-[clamp(0.6rem,1.2vw,0.85rem)]">
                  <Link
                    href="tel:+918130371647"
                    className="inline-flex items-center justify-center gap-2 rounded-[clamp(0.75rem,1.5vw,1rem)] bg-[#ddbc69] px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.8rem,1.4vw,1rem)] text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.01]"
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </Link>
                  <Link
                    href="https://wa.me/918130371647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[clamp(0.75rem,1.5vw,1rem)] border border-[#ddbc69] bg-black px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.8rem,1.4vw,1rem)] text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.01]"
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
                    </svg>
                    WhatsApp Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure & Connectivity */}

          {/* Blog Slider */}
          {/* <div className="mb-8">
            <p className="text-3xl font-bold text-white text-center py-4">
              Mega Projects in Dholera
            </p>
            <BlogSlider posts={safePosts} />
          </div> */}
          <div
            className="mb-8"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "500px",
            }}
          >
            <p className="text-3xl font-bold text-white text-center py-4">
              Mega Projects in Dholera
            </p>

            <Suspense
              fallback={
                <div
                  aria-hidden="true"
                  style={{
                    minHeight: "300px",
                  }}
                />
              }
            >
              <BlogSliderSection />
            </Suspense>
          </div>

          {/* Lead Form */}
          <div
            className="mb-8"
            id="contact"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "420px",
            }}
          >
            <InlineLeadForm
              variant="lead"
              title="Registry Ready Plots in Dholera"
              button="Talk to an Expert"
            />
          </div>

          <div
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "900px",
            }}
          >
            <MegaIndustries />
          </div>

          <section
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "700px",
            }}
          >
            <FAQSection />
          </section>

          {/* Final Statement Section */}
          <section
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "700px",
            }}
          >
            <div className="bg-black text-white rounded-xl p-6 md:p-8 text-center">
              <h5 className="text-2xl md:text-3xl font-bold mb-4">
                Dholera Is Not a Project - It's India's Long-Term Industrial
                Strategy
              </h5>
              <div className="w-24 h-1 bg-[#ddbc69] mx-auto mb-4"></div>
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                Dholera Smart City is not just about infrastructure-it is about
                India's industrial future, smart governance, and globally
                competitive manufacturing. For investors and decision-makers
                seeking stability, scale, and strategic growth,{" "}
                <strong className="text-[#ddbc69]">Dholera SIR</strong>{" "}
                represents a once-in-a-generation urban vision.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
