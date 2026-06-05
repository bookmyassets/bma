import { projectInfo } from "@/sanity/lib/api";
import React from "react";
import banner from "@/assests/about-dholera-sir-desktop-banner.webp";
import semiconductorHubImage from "@/assests/dholera-sir-india-first-semiconductor-hub-image.webp";
import BlogSlider from "./BlogSlider";
import InlineLeadForm from "../components/InlineLeadForm";
import Link from "next/link";
import Image from "next/image";
import FAQSection from "./FAQs";

export default async function page() {
  let posts = [];
  try {
    const postsData = await projectInfo();
    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching project info:", error);
  }

  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "BookMyAssets",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

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

      <title>
        About Dholera SIR - India’s First Smart City | BookMyAssets
      </title>
      <meta
        name="description"
        content="Dholera SIR, India’s first greenfield smart city Dholera. Know more about Dholera airport, expressway, activation area, infrastructure, industries & investment."
      />
      <meta
        name="keywords"
        content="Dholera SIR, Smart city Dholera"
      />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/about-dholera-sir"
      />
      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="pt-[clamp(3rem,5vw,4rem)] md:pt-0">
          <div className="md:relative md:h-[70vh] overflow-hidden shadow-lg">
            <Image
              src={banner}
              alt="banner"
              className="w-full md:h-full h-auto object-contain md:object-cover"
              quality={85}
              priority
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
                <div className="lg:w-[40%] w-full">
                  <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] shadow-lg border border-white/10">
                    <Image
                      src={semiconductorHubImage}
                      alt="Dholera SIR semiconductor hub"
                      className="w-full h-auto object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>
                <div className="lg:w-[60%] prose prose-lg text-white/90">
                  <p className="text-white/90 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.8] mb-4">
                    <strong>
                      <Link
                        href="dholera-sir-blogs/dholera-2025-development-infrastructure-progress"
                        className="text-[#ddbc69] hover:underline"
                      >
                        Dholera Special Investment Region (Dholera SIR)
                      </Link>
                    </strong>{" "}
                    is India's first and largest greenfield smart city,
                    strategically located about 100 km from Ahmedabad in Gujarat.
                    Planned as a global-scale industrial and urban hub, Dholera is
                    a key node of the{" "}
                    <strong>Delhi-Mumbai Industrial Corridor (DMIC)</strong> and
                    is being developed under the Gujarat Special Investment Region
                    Act.
                  </p>
                  <p className="text-white/90 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.8]">
                    Spread across nearly{" "}
                    <strong className="text-[#ddbc69]">920 sq. km</strong>,
                    Dholera Smart City is designed to integrate industry,
                    infrastructure, sustainability, and modern living, creating a
                    long-term ecosystem rather than short-term real estate growth.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-[clamp(1.25rem,2.5vw,2rem)]">
            <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] border border-white/10 bg-[linear-gradient(135deg,rgba(222,174,60,0.16),rgba(255,255,255,0.03),rgba(17,17,17,0.96))] p-[clamp(1rem,2vw,1.5rem)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(222,174,60,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(222,174,60,0.12),transparent_25%)]"></div>
              <div className="relative z-10 flex flex-col gap-[clamp(0.75rem,1.5vw,1rem)]">
                <div className="space-y-[clamp(0.5rem,1vw,0.75rem)]">
                  
                  <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] text-center font-bold text-white">
                    Speak with our investment advisor today
                  </h2>
                  <p className=" text-[clamp(1rem,1.4vw,1.125rem)] text-center leading-[1.7] text-white/85">
                    Get clear guidance on the semiconductor hub, infrastructure roadmap, and the best investment options in Dholera.
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
                    className="inline-flex items-center justify-center gap-2 rounded-[clamp(0.75rem,1.5vw,1rem)] border border-[#ddbc69] bg-black px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.8rem,1.4vw,1rem)] text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.01]">
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
          <div className="mb-8">
            <p className="text-3xl font-bold text-white text-center py-4">Mega Projects in Dholera</p>
            <BlogSlider posts={safePosts} />
          </div>

       
          {/* Lead Form */}
          <div className="mb-8" id="contact">
            <InlineLeadForm
              variant="lead"
              title="Want to invest in Dholera but don't know how?"
              button="Talk to an Expert"
            />
          </div>

          {/* BookMyAssets Section */}
          <section className="mb-[clamp(1.5rem,3vw,2.5rem)]">
            <div className="rounded-[clamp(0.875rem,1.5vw,1.25rem)] border border-white/10 bg-white p-[clamp(1rem,2vw,1.5rem)] shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
              <div className="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
                  <div className="space-y-[clamp(0.25rem,0.75vw,0.5rem)]">
                    <p className="inline-flex rounded-full bg-[#ddbc69]/15 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#ddbc69]">
                      Why invest with BookMyAssets
                    </p>
                    <h5 className="text-[clamp(1.35rem,2.5vw,1.9rem)] font-bold text-black">
                      Expert guidance, legal clarity, and transparent execution
                    </h5>
                  </div>

                  <p className="text-[clamp(0.95rem,1.3vw,1.05rem)] leading-[1.7] text-gray-700">
                    <Link
                      href="/contact"
                      className="font-semibold text-[#ddbc69] underline decoration-[#ddbc69]/60 underline-offset-2"
                    >
                      BookMyAssets
                    </Link>{" "}
                    helps investors and buyers navigate Dholera with end-to-end support,
                    from documentation to project selection and advisory.
                  </p>

                  <div className="space-y-2">
                    {[
                      "100% legal and transparent",
                      "Hassle-free support",
                      "Trusted investment advisory",
                      "Better long-term outcomes",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-[0.875rem] font-semibold text-black"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ddbc69] text-[0.75rem] font-bold text-black">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-[clamp(0.6rem,1.2vw,0.85rem)] pt-1">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-[clamp(0.65rem,1.2vw,0.9rem)] bg-[#ddbc69] px-[clamp(0.9rem,1.8vw,1.25rem)] py-[clamp(0.75rem,1.3vw,0.95rem)] text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.01]"
                    >
                      Talk to Our Expert
                    </Link>
                    <a
                      href="https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-[clamp(0.65rem,1.2vw,0.9rem)] border border-black px-[clamp(0.9rem,1.8vw,1.25rem)] py-[clamp(0.75rem,1.3vw,0.95rem)] text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.01]"
                    >
                      Download Brochure
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[clamp(0.875rem,1.5vw,1.25rem)] border border-black/10 bg-[#f8f4ea]">
                  <Image
                    src={semiconductorHubImage}
                    alt="Dholera SIR semiconductor hub"
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <FAQSection/>
          </section>

          {/* Final Statement Section */}
          <section>
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

