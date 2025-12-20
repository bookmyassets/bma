import { projectInfo } from "@/sanity/lib/api";
import React from "react"; 
import hero from "@/assests/dholeraSIR.webp";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import banner from "@/assests/banner.webp";
import BlogCard from "./BlogCard";  // Keep this for any individual blog cards
import BlogSlider from "./BlogSlider";  // Add this for the slider
import BulkLandCard from "./BulkLandCard";  // Changed from "./BlogCard" to "./BulkLandCard";
import LeadForm from "../components/LeadForm";
import residential from "@/assests/bulkLand/residential-hero-mob.-webp.webp";
import hac from "@/assests/bulkLand/high-access-hero-mob-webp.webp";
import industrial from "@/assests/bulkLand/industrial-hero-mob-webp.webp";
import cityCentre from "@/assests/bulkLand/city-centre-cover.webp";
import knowledge from "@/assests/bulkLand/knowledgeIT-hero-mob-webp.webp"
import recreation from "@/assests/bulkLand/recreation-sports-entertainment-Zone-hero.webp"

const bulkLand = [
  {
    _id: "1",
    title: "Residential Land",
    link: "/bulk-land/residential",
    image: residential
  },
  {
    _id: "2",
    title: "High Access Corridor",
    link: "/bulk-land/high-access-corridor", 
    image: hac
  },
  {
    _id: "3",
    title: "Industrial Land",
    link: "/bulk-land/industrial-land",
    image: industrial
  },
  {
    _id: "4",
    title: "City Centre",
    link: "/bulk-land/city-centre-land",
    image: cityCentre
  },
  {
    _id: "5",
    title: "Knowledge and IT Zone",
    link: "/bulk-land/knowledge-and-it-zone",
    image: knowledge
  },
  {
    _id: "6",
    title: "Recreation Sports and Entertainment",
    link: "/bulk-land/recreation-sports-land",
    image: recreation
  }
];

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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div
          className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner.src})`,
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Hero Content */}
          <div className="relative flex flex-col justify-center items-center z-10 text-center px-4">
            <h1 className="text-6xl max-sm:pt-8 font-bold text-white mb-4 drop-shadow-lg">
              DHOLERA SIR
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 drop-shadow-md">
              India's Largest Planned Smart City
            </h2>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Introduction Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Introduction to Dholera SIR
                  </h2>

                  <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                      <strong>Dholera Special Investment Region (DSIR)</strong>{" "}
                      is India's largest planned industrial and residential hub.
                      Located about 100 km from <strong>Ahmedabad</strong>, it
                      forms a key part of the Delhi–Mumbai Industrial Corridor.
                      Declared under the Gujarat Special Investment Region Act,
                      the project is being implemented in phases to create a
                      balanced mix of industries, housing, and urban services.
                    </p>
                  </div>
                </div>

                {/* Vision Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Vision of Dholera Smart City
                  </h2>

                  <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                      The vision for <strong>Dholera Smart City</strong> is
                      driven by Prime Minister Narendra Modi, with coordinated
                      efforts from both the central and state governments.
                      Designed by Halcrow, internationally renowned for projects
                      such as the Palm Jumeirah in Dubai, Dholera is India's
                      first <strong>Greenfield Smart City</strong>.
                    </p>

                    <div className="bg-gradient-to-r from-[#deae3c]/5 via-white/50 to-[#138808]/5 p-6 rounded-xl border-l-4 border-[#deae3c]">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Smart Infrastructure Features
                      </h3>
                      <p className="text-gray-700">
                        The planning integrates plug-and-play infrastructure,
                        ensuring that utilities such as water, power, gas, and
                        ICT are placed underground for immediate connectivity.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Major Infrastructure Projects and Connectivity
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          <strong>ABCD Building</strong> (Administrative and
                          Business Centre of Dholera)
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          Activation Area with residential and commercial hubs
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          Water treatment and waste management facilities
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          World's largest single-location{" "}
                          <strong>Dholera Solar Park</strong>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          Four-lane <strong>Ahmedabad–Dholera Expressway</strong>
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          <strong>Dholera International Airport</strong>{" "}
                          (India's Second Largest)
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full mt-2"></div>
                        <p className="text-gray-700">
                          Metro rail and freight corridors for faster movement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* fetch blogs */}
                <div>
                     <BlogSlider posts={safePosts}/>  
                </div>

                {/* Industries Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Industries Investing Heavily in Dholera
                  </h2>

                  <p className="text-gray-700 mb-6">
                    Dholera has already attracted large investments from reputed
                    companies:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-[#deae3c]/10 to-[#138808]/10 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Tata Group
                        </h3>
                        <span className="bg-[#deae3c] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ₹91,000 CR
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Tata group is setting up India’s first semiconductor and
                        display fabrication plant
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#138808]/10 to-[#000080]/10 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-800">
                          ReNew Power
                        </h3>
                        <span className="bg-[#deae3c] text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ₹1,200 CR
                        </span>
                      </div>
                      <p className="text-gray-700">
                        ReNew Power and other global players are investing in
                        renewable energy projects
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-[#000080]/10 to-[#deae3c]/10 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Other Sectors
                      </h3>
                      <p className="text-gray-700">
                        IT, aerospace, defense, and manufacturing companies are
                        evaluating projects in the region
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <LeadForm title="Want to buy plots in Dholera but don’t know how?"  button="Talk to an Expert"/>
                </div>
                {/* Governance Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Strong Governance and Investor-Friendly Administration
                  </h2>

                  <p className="text-gray-700 mb-6">
                    The Dholera Special Investment Region Development Authority
                    (DSIRDA) ensures smooth planning and administration. The
                    governance model includes e-governance, single-window
                    clearances, and transparent systems designed to support
                    industries, investors, and residents.
                  </p>
                </div>

                {/* Progress Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Progress and Future Projects
                  </h2>

                  <div className=" gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-[#deae3c] rounded-full"></div>
                          <p className="text-gray-700">
                            Phase-wise development is already underway, with trunk infrastructure in place
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-[#deae3c] rounded-full"></div>
                          <p className="text-gray-700">
                           Dholera Expressway and Dholera International Airport construction progressing rapidly
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-[#deae3c] rounded-full"></div>
                          <p className="text-gray-700">
                            Activation area completed to showcase residential and commercial viability
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-[#deae3c] rounded-full"></div>
                          <p className="text-gray-700">
                            Upcoming projects include metro connectivity, expanded industrial clusters, and advanced township developments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BookMyAssets Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
                    Why Invest in Dholera with BookMyAssets
                  </h2>

                  <p className="text-gray-700 mb-6">
                    BookMyAssets connects you to premium residential projects in{" "}
                    <strong>Dholera, Gujarat,</strong> with long-term growth
                    potential.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full"></div>
                        <p className="text-gray-700">
                          100% legal and transparent transactions
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full"></div>
                        <p className="text-gray-700">
                          Hassle free payment process
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full"></div>
                        <p className="text-gray-700">
                          Government approved projects with clear documentation
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#deae3c] rounded-full"></div>
                        <p className="text-gray-700">
                          Expert support for investors and channel partners
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#deae3c]/5 via-white/50 to-[#138808]/5 p-6 rounded-xl border-l-4 border-[#deae3c] mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Early Mover Advantage
                    </h3>
                    <p className="text-gray-700">
                      Get the early mover advantage in India's first and largest{" "}
                      <strong>Smart City in Gujarat</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-[#deae3c] pb-4">
            Explore Bulk Land Options
          </h3>

          {bulkLand.length > 0 ? (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {bulkLand.map((landItem) => (
                <div
                  key={landItem._id}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <BulkLandCard landItem={landItem} compact={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#deae3c] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v6m0 0l-3-3m3 3l3-3"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                No Land Options Available
              </h4>
              <p className="text-gray-600 text-sm">
                Check back soon for the latest bulk land investment 
                opportunities in Dholera SIR.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="bg-[#deae3c] rounded-2xl p-4 mt-6 text-white">
          <h4 className="text-xl font-bold mb-3">Ready to Invest?</h4>
          <p className="text-sm mb-4 opacity-90">
            Get expert guidance on Dholera SIR bulk land investment
            opportunities and early mover advantage.
          </p>
          <a
            href="https://wa.me/918130371647"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex justify-center items-center gap-2 w-full bg-white text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <FaWhatsapp className="" /> Get Free Investment Advice
            </button>
          </a>
        </div>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF9933, #138808);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #e8851f, #0f6b06);
        }
      `}</style> */}
    </>
  );
}
