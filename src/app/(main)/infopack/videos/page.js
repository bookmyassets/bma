import { Play, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import bg from "@/assests/bg-image.webp";
import { FaMapMarkerAlt, FaVideo, FaBuilding } from "react-icons/fa";

export default async function VideosPage() {
  
 const videos = [
  {
    id: "6_BYJo1_HFU",
    title: "[2025] PROGRESS: TATA Semiconductor Plant in Dholera",
    duration: "4:55"
  },
  {
    id: "QS6W_4hCn2g",
    title: "Dholera's Heart: Man-Made River Front in Activation Area",
    duration: "6:30"
  },
  {
    id: "3iiF6Oix5Fc",
    title: "ReNew's Massive Solar Cell Manufacturing Plant",
    duration: "unknown"
  },
  {
    id: "RITjLu6hRxc",
    title: "CURRENT UPDATE: Dholera International Airport to be Functional in 2026",
    duration: "unknown"
  },
  {
    id: "5DaF8tljkkU",
    title: "Ahmedabad-Dholera Expressway connectivity",
    duration: "unknown"
  },
  {
    id: "5we0e_XlTjA",
    title: "100% Water Recycling at Dholera's Water Treatment Plant",
    duration: "unknown"
  },
  {
    id: "Ql4EVnwIne4",
    title: "WestWyn County - Premium Plots on Fedra-Pipli Highway, Dholera",
    duration: "unknown"
  },
  {
    id: "3u8yJ5XYNns",
    title: "Dholera Activation Area Heart of India's Billion-Dollar Future City (ABCD Building)",
    duration: "unknown"
  },
  {
    id: "1LdHVJR_yBQ",
    title: "WestWyn Estate",
    duration: "unknown"
  }
];


  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center bg-white p-10 rounded-xl shadow-xl">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Videos Available
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find any videos at the moment. Please check back later.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#bc9849] to-[#d8b66d] text-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[87vh] bg-gradient-to-b from-blue-50 to-gray-100 py-16 pt-32 px-4 sm:px-6 lg:px-8"
      style={{
       
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <meta name="robots" content="noindex, dofollow"/>
<link rel="canonical" href="https://www.bookmyassets.com/infopack/videos" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

          <p className=" text-lg font-semibold max-w-2xl mx-auto leading-relaxed">
            Watch expert insights on why investing in Dholera is a smart
            financial decision and learn about the city's development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title || `YouTube Video ${index + 1}`}
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Duration badge */}
                {/*  {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                )} */}
              </div>

              <div className="p-5">
                {video.title && (
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#deae3c] transition-colors">
                    {video.title}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Video playlist CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">
            Subscribe to our channel for more videos about Dholera Smart City
          </p>
        </div>
      </div>
    </div>
  );
}
