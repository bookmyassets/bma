import { projectInfo } from "@/sanity/lib/api";
import React, { Suspense } from "react";
import { unstable_cache } from "next/cache";
import banner from "@/assests/about-dholera-sir-desktop-banner.webp";
import semiconductorHubImage from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Building2, Landmark } from "lucide-react";

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

const MegaIndustries = dynamicImport(() => import("@/components/MegaIndustries"), {
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
  { revalidate: 3600, tags: ["dholera-projects"] },
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

export default function page() {
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


      <div className="bg-black text-white">
        {/* Hero Section - Lazy loaded to unblock LCP */}
        <div className="pt-[72px] lg:pt-[86px]">
          <div className="md:relative md:h-[70vh] overflow-hidden shadow-lg bg-black">
            <Image
              src={banner}
              alt="Dholera Special Investment Region"
              className="w-full md:h-full h-auto object-contain md:object-cover"
              quality={45}
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="mx-auto max-w-7xl space-y-12 px-5 py-12 sm:px-8 lg:space-y-16 lg:px-10 lg:py-16 [&_h1]:![font-family:var(--font-playfair-display),Georgia,serif] [&_h2]:![font-family:var(--font-playfair-display),Georgia,serif] [&_h3]:![font-family:var(--font-playfair-display),Georgia,serif] [&_h1]:!text-[#ddbc69] [&_h2]:!text-[#ddbc69] [&_h3]:!text-[#ddbc69]">
          {/* Introduction Section */}
          <section aria-labelledby="dholera-introduction-heading">
            <header className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
              <h1
                id="dholera-introduction-heading"
                className="font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]"
              >
                What is Dholera SIR?
              </h1>
              <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#ddbc69]/45" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#ddbc69]" />
                <span className="h-px w-12 bg-[#ddbc69]/45" />
              </div>
            </header>

            <div className="relative overflow-hidden rounded-[24px] border border-[#ddbc69]/20 bg-[linear-gradient(135deg,#171611,#10100e_55%,#0c0c0b)] p-5 sm:p-6 lg:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/60 to-transparent" />
              <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                <div className="order-2 min-w-0 lg:order-1">
                  <div className="overflow-hidden rounded-[18px] border border-[#ddbc69]/20 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                    <Image
                      src={semiconductorHubImage}
                      alt="Dholera Smart City"
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 1023px) 90vw, 40vw"
                      quality={55}
                      loading="lazy"
                      placeholder="blur"
                    />
                  </div>
                </div>

                <div className="order-1 min-w-0 lg:order-2">
                  <div className="space-y-5 text-[16px] leading-[1.75] text-white lg:text-[20px]">
                    <p>
                      <Link
                        href="/dholera-sir-blogs/dholera-2025-development-infrastructure-progress"
                        prefetch={false}
                        className="font-semibold text-[#ddbc69] underline-offset-4 hover:underline"
                      >
                        Dholera Special Investment Region (Dholera SIR)
                      </Link>{" "}
                      is a planned smart city in Gujarat, located about 100 km
                      from Ahmedabad. Spread across approximately 920 sq. km and
                      22 villages, it is being developed under the Delhi-Mumbai
                      Industrial Corridor.
                    </p>
                    <p>
                      Its master plan brings together industrial zones,
                      residential areas, commercial spaces, wide roads,
                      underground utilities and smart city infrastructure.
                    </p>
                    <p>
                      Dholera is also gaining attention because of major projects
                      such as the Ahmedabad-Dholera Expressway, Dholera
                      International Airport and Tata&apos;s semiconductor
                      manufacturing plant.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Dholera SIR Act and Master Plan Section */}
          <section
            id="dholera-sir-act"
            aria-labelledby="dholera-sir-act-title"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "auto 800px",
            }}
          >
            <div className="mx-auto max-w-7xl">
              <header className="mb-6 text-center lg:mb-8">
                <h2
                  id="dholera-sir-act-title"
                  className="mx-auto max-w-3xl font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.03em] text-[#ddbc69] lg:text-[40px]"
                >
                  What is the{" "}
                  <span className="text-[#ddbc69]">Dholera SIR Act?</span>
                </h2>
              </header>

              <div className="space-y-5 text-[18px] text-center leading-[1.65] text-white lg:text-[20px]">
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

              <div className="mt-10 lg:mt-12">
                <h2 className="text-center font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.025em] text-[#ddbc69] lg:text-[40px]">
                  Dholera SIR Master Plan
                </h2>
                <p className="mt-6 text-[18px] leading-[1.65] text-white lg:text-[20px]">
                  The Dholera SIR Master Plan has been designed to develop the
                  city in planned phases. Spread across approximately 920 sq.
                  km, the project includes six town-planning schemes with
                  dedicated areas for industry, housing, business and public
                  infrastructure.
                </p>

                <ul className="mt-6 space-y-4 lg:mt-8">
                  {[
                    "Residential Zone",
                    "High Access Corridor",
                    "City Centre",
                    "Knowledge and IT Zones",
                    "Industrial Zones",
                    "Recreation, Sports & Entertainment",
                    "Other Planned Zones",
                  ].map((zone) => (
                    <li
                      key={zone}
                      className="flex min-w-0 items-start gap-4 text-[18px] leading-[1.5] text-white lg:text-[20px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ddbc69] lg:mt-3"
                      />
                      <span>{zone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            aria-labelledby="dholera-rm-heading"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "auto 300px",
            }}
          >
            <div className="relative isolate overflow-hidden rounded-[20px] border border-[#ddbc69]/30 bg-[linear-gradient(115deg,#211d13_0%,#11110f_48%,#171912_100%)] px-4 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-[24px] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f3d994]/70 to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 size-[380px] rounded-full border border-[#ddbc69]/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 size-[280px] rounded-full border border-[#ddbc69]/[0.07]" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-[#ddbc69]/[0.06] blur-3xl" />

              <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:gap-7 lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
                <div className="max-w-xl">
                  <div className="mb-2 flex items-center justify-center gap-3 sm:mb-4 lg:justify-start">
                    <span aria-hidden="true" className="h-px w-8 bg-[#ddbc69]/60" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#e4d2a5] sm:text-xs">
                      Personalised guidance
                    </p>
                  </div>
                  <h2 id="dholera-rm-heading" className="font-playfair-display text-[26px] font-normal leading-[1.15] tracking-[-0.025em] text-[#ddbc69] sm:text-[30px] lg:text-[40px]">
                    Speak with Our RM
                  </h2>
                  <p className="mt-2 max-w-md text-[14px] leading-[1.5] text-white sm:mt-4 sm:text-[16px] sm:leading-[1.7]">
                    Connect with our relationship manager to explore your
                    Dholera investment options.
                  </p>
                </div>

                <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3 lg:shrink-0 [&>a]:min-h-11 [&>a]:gap-2 [&>a]:px-3 [&>a]:py-2.5 [&>a]:text-[14px] sm:[&>a]:min-h-14 sm:[&>a]:gap-3 sm:[&>a]:px-6 sm:[&>a]:py-3.5 sm:[&>a]:text-[16px] [&>a>svg:last-child]:hidden sm:[&>a>svg:last-child]:block">
                  <Link
                    href="tel:+918130371647"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#f3d994]/40 bg-gradient-to-br from-[#f0d68d] via-[#ddbc69] to-[#c5a04c] px-6 py-3.5 text-[16px] font-semibold text-[#17140c] shadow-[0_8px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69] motion-reduce:transform-none motion-reduce:transition-none"
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
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.7} />
                  </Link>
                  <Link
                    href="https://wa.me/918130371647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#ddbc69]/40 bg-white/[0.03] px-6 py-3.5 text-[16px] font-semibold text-[#f2ebdb] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-[#ddbc69]/70 hover:bg-[#ddbc69]/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <svg
                      className="h-4 w-4 shrink-0"
                      fill="#65c98b"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
                    </svg>
                    WhatsApp Now
                    <ArrowUpRight aria-hidden="true" className="size-4 text-[#ddbc69] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" strokeWidth={1.7} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Major and Upcoming Infrastructure Projects */}
          <section
            id="dholera-infrastructure-projects"
            aria-labelledby="dholera-infrastructure-heading"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "auto 850px",
            }}
          >
            <header className="mx-auto mb-6 max-w-3xl text-center lg:mb-8">
              <h2
                id="dholera-infrastructure-heading"
                className="font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]"
              >
                Infrastructure Roadmap
              </h2>
              <div aria-hidden="true" className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#ddbc69]/45" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#ddbc69]" />
                <span className="h-px w-12 bg-[#ddbc69]/45" />
              </div>
            </header>

            <div className="space-y-4 lg:space-y-5">
              {[
                {
                  id: "major-infrastructure",
                  title: "Major Infrastructure Projects in Dholera",
                  icon: Landmark,
                  projects: MAJOR_INFRASTRUCTURE_PROJECTS,
                  surface: "bg-[linear-gradient(135deg,#1a1811,#11110f_55%,#0d0d0c)]",
                },
                {
                  id: "upcoming-projects",
                  title: "Upcoming Projects in Dholera",
                  icon: Building2,
                  projects: UPCOMING_DHOLERA_PROJECTS,
                  surface: "bg-[linear-gradient(135deg,#111a1b,#101414_55%,#0c1010)]",
                },
              ].map(({ id, title, icon: Icon, projects, surface }) => (
                <section
                  key={id}
                  id={id}
                  aria-labelledby={`${id}-heading`}
                  className={`relative overflow-hidden rounded-[20px] border border-[#ddbc69]/20 p-4 sm:rounded-[24px] sm:p-5 lg:p-6 ${surface}`}
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/60 to-transparent" />

                  <header className="mb-4 flex items-start gap-3 border-b border-[#ddbc69]/15 pb-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#ddbc69]/25 bg-[#ddbc69]/[0.07] text-[#ddbc69] lg:size-12">
                      <Icon aria-hidden="true" className="size-5 lg:size-6" strokeWidth={1.4} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        id={`${id}-heading`}
                        className="max-w-2xl font-playfair-display text-[22px] font-normal leading-[1.2] tracking-[-0.025em] text-[#ddbc69] lg:text-[28px]"
                      >
                        {title}
                      </h3>
                    </div>
                    <span className="hidden shrink-0 rounded-full border border-[#ddbc69]/20 px-3 py-1.5 text-xs tracking-wide text-[#d2cdc2] sm:block">
                      {projects.length} projects
                    </span>
                  </header>

                  <ul className="grid gap-2 min-[400px]:grid-cols-2 lg:grid-cols-3 lg:gap-3">
                    {projects.map((project, index) => (
                      <li
                        key={project}
                        className="flex min-w-0 items-start gap-2 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-3 lg:gap-3 lg:px-4"
                      >
                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-[10px] font-medium leading-5 tracking-wider text-[#ddbc69]/65 lg:text-xs lg:leading-6">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 text-[14px] leading-[1.5] text-[#eee9dd] lg:text-[16px]">
                          {project}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>


          {/* Infrastructure & Connectivity */}

          <div
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "400px",
            }}
          >
            <h2 className="font-playfair-display mb-4 text-center text-[28px] font-normal leading-[1.15] text-[#ddbc69] lg:mb-5 lg:text-[34px]">
              Mega Projects in Dholera
            </h2>

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
            id="contact"
            className="[&>section]:!px-0 [&>section]:!py-0 [&_h2]:!text-[28px] [&_h2]:!font-normal [&_p]:!text-[16px] [&_label]:!text-[16px] [&_input]:!text-[16px] [&_button]:!text-[16px] lg:[&_h2]:!text-[35px] lg:[&_p]:!text-[17px] lg:[&_label]:!text-[17px] lg:[&_input]:!text-[17px] lg:[&_button]:!text-[16px]"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "420px",
            }}
          >
            <InlineLeadForm
              variant="lead"
              theme="dark"
              headingTag="h2"
              title="Registry Ready Plots in Dholera"
              button="Talk to an Expert"
            />
          </div>

          <div
            className="[&_h2]:!text-[27px] [&_h2]:!font-normal [&_p]:!text-[16px] lg:[&_h2]:!text-[35px] lg:[&_p]:!text-[18px]"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "900px",
            }}
          >
            <MegaIndustries variant="dark" />
          </div>

          <section
            className="[&>section>div]:!py-0"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "700px",
            }}
          >
            <FAQSection />
          </section>

          {/* Final Statement Section */}
          <section
            aria-labelledby="dholera-vision-heading"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "auto 380px",
            }}
          >
            <div className="relative isolate overflow-hidden rounded-[24px] border border-[#ddbc69]/25 bg-[linear-gradient(120deg,#122332,#193d42_55%,#12382f)] px-6 py-8 text-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:px-8 lg:px-12 lg:py-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#ddbc69]/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-[#77baa2]/10 blur-3xl"
              />
              <h2
                id="dholera-vision-heading"
                className="mx-auto max-w-5xl font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.025em] text-[#ddbc69] lg:text-[40px]"
              >
                Dholera Is Not a Project - It's India's Long-Term Industrial
                Strategy
              </h2>
              <p className="mx-auto mt-5 max-w-4xl text-[18px] leading-[1.65] text-white lg:mt-6 lg:text-[20px]">
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
