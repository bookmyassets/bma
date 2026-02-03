import { projectInfo } from "@/sanity/lib/api";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import banner from "@/assests/about-dholera-sir-desktop-banner.webp";
import bannerMob from "@/assests/about-dholera-sir-mobile-banner.webp";
import BlogSlider from "./BlogSlider";
import BulkLandCard from "./BulkLandCard";
import LeadForm from "../components/LeadForm";
import Link from "next/link";
import Image from "next/image";

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
      <title>
        Dholera SIR | India's Largest Smart City & Investment Hub - BookMyAssets
      </title>
      <meta
        name="description"
        content="Discover Dholera SIR - India's largest planned industrial and residential hub. Part of Delhi-Mumbai Industrial Corridor with world-class infrastructure, Tata semiconductor plant, and premium investment opportunities with BookMyAssets."
      />
      <div className="bg-white">
        {/* Hero Section */}
        <div className=" pt-16">
          <div className="md:relative md:h-[65vh] overflow-hidden shadow-lg">
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
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Introduction Section */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-3">
                What is Dholera SIR?
              </h1>
              <div className="w-24 h-1 bg-[#deae3c] mx-auto"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-black rounded-xl p-6 md:p-8 shadow-xl">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
                  <strong>
                    <Link
                      href="dholera-sir-blogs/dholera-2025-development-infrastructure-progress"
                      className="text-[#deae3c] hover:underline"
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
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                  Spread across nearly{" "}
                  <strong className="text-[#deae3c]">920 sq. km</strong>,
                  Dholera Smart City is designed to integrate industry,
                  infrastructure, sustainability, and modern living, creating a
                  long-term ecosystem rather than short-term real estate growth.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Governance Section */}
          <section className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black text-white rounded-xl p-6 md:p-7">
                <div className="inline-block bg-[#deae3c] text-black px-4 py-2 rounded-lg text-sm font-bold mb-4">
                  VISION
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Vision of Dholera Smart City
                </h3>
                <p className="text-white/90 text-base leading-relaxed mb-4">
                  The vision of{" "}
                  <Link
                    href="/dholera-sir-blogs/invest-in-dholera-sir-projects"
                    className="text-[#deae3c] hover:underline font-semibold"
                  >
                    Dholera Smart City
                  </Link>{" "}
                  was conceptualized during the tenure of Prime Minister
                  Narendra Modi and is jointly driven by the Government of India
                  and the Government of Gujarat.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-sm">
                      Single-window clearances for industries
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-sm">
                      Transparent e-governance systems
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-sm">
                      Policy-led and time-bound development
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-sm">
                      Investor-friendly regulatory framework
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#deae3c] text-black rounded-xl p-6 md:p-7">
                <div className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                  GOVERNANCE
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Strong Administration
                </h3>
                <p className="text-black/90 text-base leading-relaxed mb-4">
                  The city is administered by the Dholera Special Investment
                  Region Development Authority (DSIRDA) , ensuring smooth
                  planning and investor-friendly governance.
                </p>
                <div className="bg-black/10 rounded-lg p-4">
                  <p className="text-black font-semibold text-lg italic">
                    "This strong governance structure distinguishes Dholera from
                    conventional urban developments."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Smart City Features */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-black mb-3">
                What Makes Dholera a Smart City?
              </h2>
              <div className="w-24 h-1 bg-[#deae3c] mx-auto mb-3"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Structure, Strategy & Global Expertise
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-black rounded-lg p-5 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#deae3c] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
                  <span className="text-2xl font-bold text-black">🔌</span>
                </div>
                <Link
                  href="/dholera-sir-blogs/plug-and-play-infrastructure-in-dholera"
                  className="hover:underline"
                >
                  <h4 className="text-lg font-bold mb-2">
                    Plug-and-Play Infrastructure
                  </h4>
                </Link>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Ready-to-use infrastructure for immediate industrial
                  operations
                </p>
              </div>

              <div className="border-2 border-black rounded-lg p-5 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#deae3c] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
                  <span className="text-2xl font-bold text-black">🌐</span>
                </div>
                <h4 className="text-lg font-bold mb-2">
                  Underground Utilities
                </h4>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Water, power, gas, and ICT placed underground for seamless
                  connectivity
                </p>
              </div>

              <div className="border-2 border-black rounded-lg p-5 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#deae3c] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
                  <span className="text-2xl font-bold text-black">📱</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Digital Governance</h4>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Command-control systems and smart city management
                </p>
              </div>

              <div className="border-2 border-black rounded-lg p-5 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#deae3c] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
                  <span className="text-2xl font-bold text-black">🌱</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Sustainable Zoning</h4>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Green buffers and environmentally conscious planning
                </p>
              </div>

              <div className="border-2 border-black rounded-lg p-5 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#deae3c] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
                  <span className="text-2xl font-bold text-black">🛡️</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Disaster Resilient</h4>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Climate-responsive and disaster-resistant infrastructure
                </p>
              </div>

              <div className="border-2 border-black rounded-lg p-5 hover:bg-black hover:text-white transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#deae3c] rounded-full flex items-center justify-center mb-3 group-hover:bg-white">
                  <span className="text-2xl font-bold text-black">🏢</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Live-Work-Play</h4>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Integrated urban philosophy for balanced living
                </p>
              </div>
            </div>
          </section>

          {/* Semiconductor Hub Section */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#deae3c]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#deae3c]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-block bg-[#deae3c] text-black px-4 py-2 rounded-lg text-sm font-bold mb-4">
                  SEMICONDUCTOR HUB
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                  India's Semiconductor Manufacturing Ecosystem
                </h2>
                <p className="text-white/90 text-base mb-6 leading-relaxed">
                  Dholera is emerging as the core of India's semiconductor
                  manufacturing ecosystem, positioning itself as a strategic
                  alternative to East Asian manufacturing hubs.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-[#deae3c]/30">
                    <Link
                      href="/dholera-sir-blogs/tata-semiconductor-dholera-timeline-2024-2028"
                      className="hover:underline"
                    >
                      <h4 className="text-lg font-bold text-[#deae3c] mb-3">
                        Tata Electronics
                      </h4>
                    </Link>
                    <p className="text-white/90 text-sm">
                      Semiconductor fab ecosystem - India's first major
                      semiconductor manufacturing facility
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-[#deae3c]/30">
                    <h4 className="text-lg font-bold text-[#deae3c] mb-3">
                      Supporting Ecosystem
                    </h4>
                    <p className="text-white/90 text-sm">
                      Specialty gases, cleanroom materials, logistics &
                      precision engineering clusters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Global Dream Team Section */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                The Global Dream Team Behind Dholera
              </h2>
              <div className="w-24 h-1 bg-[#deae3c] mx-auto"></div>
            </div>

            <div className="space-y-6">
              {/* Halcrow */}
              <div className="border-2 border-black rounded-xl overflow-hidden">
                <div className="bg-[#deae3c] p-5">
                  <h3 className="text-xl md:text-2xl font-bold text-black">
                    Halcrow - The Urban Visionaries
                  </h3>
                  <p className="text-black/80 mt-1 text-sm">
                    Master Planning Excellence
                  </p>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold mb-3 text-black">
                        Why Halcrow Matters
                      </h4>
                      <p className="text-gray-700 mb-3 ">
                        Halcrow, now part of CH2M Hill / Jacobs, is the master
                        planner of Dholera Smart City. They bring experience
                        from 70+ countries, delivering complex infrastructure
                        worldwide. Their work on Palm Jumeirah, Dubai, reflects
                        expertise in iconic, large-scale engineering projects.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-3 text-black">
                        What Halcrow Designed
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                          <p className="text-gray-700">
                            920 sq. km integrated land-use planning
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                          <Link href="/dholera-sir-blogs/dholera-appreciation-reality">
                            <p className="text-gray-700">
                              Town Planning Schemes TP 1 to TP 6
                            </p>
                          </Link>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                          <p className="text-gray-700">
                            Zone-wise classification: Industrial, Residential,
                            Commercial, IT/ITeS
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                          <p className="text-gray-700">
                            "Live-Work-Play" urban philosophy
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AECOM */}
              <div className="border-2 border-black rounded-xl overflow-hidden">
                <div className="bg-black p-5">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    AECOM - Infrastructure Design & Program Management
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                        <p className="text-gray-700">
                          72 km internal road network (18 m to 70 m wide)
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                        <p className="text-gray-700">
                          Complete trunk infrastructure (roads, drainage, water
                          & STPs)
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                        <p className="text-gray-700">
                          India's first city-scale underground utility corridor
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-1.5"></div>
                        <p className="text-gray-700">
                          BIM and GIS-based planning systems
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 bg-[#deae3c]/10 border-l-4 border-[#deae3c] p-4 rounded-r-lg">
                    <p className="text-gray-800 italic font-semibold text-base">
                      "Dholera is becoming the role model for future Indian
                      cities."
                    </p>
                    <p className="text-gray-600 mt-1">
                      — Jagdish Salgaonkar, Senior VP, AECOM
                    </p>
                  </div>
                </div>
              </div>

              {/* Digital Partners */}
              <div className="border-2 border-[#deae3c] rounded-xl overflow-hidden">
                <div className="bg-[#deae3c] p-5">
                  <h3 className="text-xl md:text-2xl font-bold text-black">
                    Wipro, IBM & Cisco - The Digital Brain of Dholera
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group">
                      <h4 className="text-lg font-bold mb-2 text-[#deae3c] group-hover:text-[#deae3c]">
                        Wipro
                      </h4>
                      <p className="text-gray-700 group-hover:text-white/90">
                        ICT consulting & smart platform integration
                      </p>
                    </div>
                    <div className="text-center p-4 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group">
                      <h4 className="text-lg font-bold mb-2 text-[#deae3c] group-hover:text-[#deae3c]">
                        Cisco
                      </h4>
                      <p className="text-gray-700 group-hover:text-white/90">
                        ICT master plan, IoT & smart networking
                      </p>
                    </div>
                    <div className="text-center p-4 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group">
                      <h4 className="text-lg font-bold mb-2 text-[#deae3c] group-hover:text-[#deae3c]">
                        IBM
                      </h4>
                      <p className="text-gray-700 group-hover:text-white/90">
                        Data analytics, AI-driven governance & city operations
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-center mt-4 text-base">
                    Together, they power Dholera's command & control center,
                    smart governance, and digital infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure & Connectivity */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Landmark Infrastructure & Connectivity
              </h2>
              <div className="w-24 h-1 bg-[#deae3c] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🏢</div>
                <h4 className="text-lg font-bold mb-2">
                  <Link
                    href="/about-dholera-sir/abcd-building-dholera"
                    className="hover:text-[#deae3c]"
                  >
                    ABCD Building Dholera
                  </Link>
                </h4>
                <p className="text-gray-700 text-sm">
                  Administrative & Business Centre of Dholera
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🏘️</div>
                <h4 className="text-lg font-bold mb-2">Activation Area</h4>
                <p className="text-gray-700 text-sm">
                  Ready residential & commercial zones
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🛣️</div>
                <h4 className="text-lg font-bold mb-2">
                  <Link
                    href="/dholera-sir-blogs/dholera-ahmedabad-expressway"
                    className="hover:text-[#deae3c]"
                  >
                    Ahmedabad-Dholera Expressway
                  </Link>
                </h4>
                <p className="text-gray-700 text-sm">
                  High-speed road connectivity
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">✈️</div>
                <h4 className="text-lg font-bold mb-2">
                  <Link
                    href="/dholera-sir-blogs/dholera-international-airport"
                    className="hover:text-[#deae3c]"
                  >
                    Dholera International Airport
                  </Link>
                </h4>
                <p className="text-gray-700 text-sm">
                  India's second-largest planned airport
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🚇</div>
                <h4 className="text-lg font-bold mb-2">
                  <Link
                    href="/dholera-sir-blogs/ahmedabad-dholera-monorail-project-2025"
                    className="hover:text-[#deae3c]"
                  >
                    Metro & Railway
                  </Link>
                </h4>
                <p className="text-gray-700 text-sm">
                  Advanced connectivity under development
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">☀️</div>
                <h4 className="text-lg font-bold mb-2">
                  <Link
                    href="/dholera-sir-blogs/dholera-solar-power-project"
                    className="hover:text-[#deae3c]"
                  >
                    Dholera Solar Park
                  </Link>
                </h4>
                <p className="text-gray-700 text-sm">
                  World's largest single-location solar park
                </p>
              </div>
            </div>
          </section>

          {/* Blog Slider */}
          <div className="mb-8">
            <BlogSlider posts={safePosts} />
          </div>

          {/* Investment Landscape Section - WHITE CARDS WITH BRAND COLOR HOVER */}
          <section id="investment" className="mb-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-[#deae3c] text-black px-4 py-2 rounded-full text-sm md:text-lg font-bold mb-3 uppercase tracking-wider">
                2025-2026 GROWTH PHASE
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-black mb-3">
                Major Investments in Dholera Smart City
              </h2>
              <div className="w-24 h-1 bg-[#deae3c] mx-auto mb-3"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Dholera Smart City is entering a major growth phase with
                large-scale industrial investments and{" "}
                <Link href="/dholera-sir-blogs/dholera-second-wave-real-estate-growth">
                  strategic developments in 2025-2026.
                </Link>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tata-Intel Collaboration - Purple/Tech (#6B46C1) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#6B46C1] hover:to-[#553C9A] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#6B46C1] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">
                    Tata-Intel Collaboration
                  </h4>
                  <span className="bg-[#deae3c] text-black px-3 py-1 rounded-full text-xs font-bold">
                    $14 billion
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Semiconductor ecosystem (India-wide push)
                </p>
              </div>

              {/* Jabil - Green (#00A651) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#00A651] hover:to-[#008542] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#00A651] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Jabil</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹1,000 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Silicon Photonics Plant
                </p>
              </div>

              {/* INOX - Red/Maroon (#8B0000) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#8B0000] hover:to-[#5C0000] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#8B0000] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">INOX Air Products</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹500 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Specialty Gas Hub
                </p>
              </div>

              {/* NextGen Group - Navy Blue (#003366) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#003366] hover:to-[#001F3F] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#003366] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">NextGen Group</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹8,800 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Industrial ecosystem expansion
                </p>
              </div>

              {/* ReNew Power - Green Energy (#22C55E) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#22C55E] hover:to-[#16A34A] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#22C55E] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">ReNew Power</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹1,200 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Renewable Energy Manufacturing Campus
                </p>
              </div>

              {/* Tata Power - Tata Blue (#1F4E79) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#1F4E79] hover:to-[#0D2B4A] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#1F4E79] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Tata Power</h4>
                  <span className="bg-[#deae3c] text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹4,000 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Dholera Solar Park & renewable infrastructure
                </p>
              </div>

              {/* Grew Energy - Orange (#FF6B35) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#E55A2B] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#FF6B35] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Grew Energy</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹3,800 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Solar components & module manufacturing
                </p>
              </div>

              {/* Mahindra - Red (#C1272D) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#C1272D] hover:to-[#9A1F24] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#C1272D] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Mahindra Lifespaces</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹2,000 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Integrated smart city development
                </p>
              </div>

              {/* Tsingshan - Steel Grey (#4A5568) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#4A5568] hover:to-[#2D3748] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#4A5568] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Tsingshan Holding Group</h4>
                  <span className="bg-[#deae3c] text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹21,000 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Steel & EV battery manufacturing plant
                </p>
              </div>

              {/* Gujarat Government - Orange/Government (#FF9800) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#FF9800] hover:to-[#F57C00] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#FF9800] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Gujarat Government</h4>
                  <span className="bg-[#deae3c] group-hover:bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                    ₹15 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Security infrastructure and advanced grid
                </p>
              </div>

              {/* India-UAE Trade Alliance - Blue/Gold (#0052A5 & Gold accents) */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-[#0052A5] hover:to-[#003A75] text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-[#0052A5] transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">
                    India-UAE Trade Alliance
                  </h4>
                  <span className="bg-[#deae3c] text-black px-3 py-1 rounded-full text-xs font-bold">
                    $200 billion
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Trade corridor impact
                </p>
              </div>
            </div>
          </section>

          {/* Lead Form */}
          <div className="mb-8" id="contact">
            <LeadForm
              title="Want to invest in Dholera but don't know how?"
              button="Talk to an Expert"
            />
          </div>

          {/* BookMyAssets Section */}
          <section className="mb-8">
            <div className="bg-gradient-to-br from-[#deae3c] via-[#d4a435] to-[#c89a2e] rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                  Why Invest in Dholera with BookMyAssets
                </h2>
                <div className="w-32 h-1.5 bg-white/90 mx-auto rounded-full shadow-md"></div>
              </div>

              {/* Introduction Text */}
              <p className="text-lg md:text-xl text-center mb-10 max-w-4xl mx-auto text-white leading-relaxed">
                <Link
                  className="font-bold underline hover:text-black transition-colors"
                  href="/contact"
                >
                  BookMyAssets
                </Link>{" "}
                connects you to premium residential projects in{" "}
                <strong>Dholera, Gujarat,</strong> with exceptional long-term
                growth potential.
              </p>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {[
                  {
                    title: "100% Legal & Transparent",
                    description:
                      "All transactions are fully legal and transparent",
                    icon: "✓",
                  },
                  {
                    title: "Hassle-Free Process",
                    description: "Smooth and easy payment procedures",
                    icon: "✓",
                  },
                  {
                    title: "Government Approved",
                    description:
                      "Projects with clear documentation and approvals",
                    icon: "✓",
                  },
                  {
                    title: "Expert Support",
                    description:
                      "Dedicated support for investors and channel partners",
                    icon: "✓",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#deae3c] to-[#c89a2e] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-white text-2xl font-bold">
                          {feature.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-gray-900">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call-to-Action Box */}
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-8 text-center shadow-2xl border-2 border-white/10">
                <div className="inline-block bg-[#deae3c] text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
                  EXCLUSIVE OPPORTUNITY
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Early Mover Advantage
                </h3>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  Secure your position in India's first and largest{" "}
                  <strong className="text-[#deae3c]">
                    Smart City in Gujarat
                  </strong>{" "}
                  — where innovation meets opportunity
                </p>
              </div>
            </div>
          </section>

          {/* Final Statement Section */}
          <section>
            <div className="bg-black text-white rounded-xl p-6 md:p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Dholera Is Not a Project—It's India's Long-Term Industrial
                Strategy
              </h2>
              <div className="w-24 h-1 bg-[#deae3c] mx-auto mb-4"></div>
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                Dholera is not just about infrastructure—it is about India's
                industrial future, smart governance, and globally competitive
                manufacturing. For investors and decision-makers seeking
                stability, scale, and strategic growth,{" "}
                <strong className="text-[#deae3c]">
                  Dholera SIR Smart City
                </strong>{" "}
                represents a once-in-a-generation urban vision.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
