import Link from "next/link";
import { Inventory } from "@/sanity/lib/api";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Download, Eye, MapPin, Info } from "lucide-react";
import bg from "@/assests/bg-image.webp";


export default async function InventoryPage() {
  let posts = [];
  let isLoading = true;

  try {
    posts = await Inventory();
    isLoading = false;
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    isLoading = false;
  }

  // Separate available and sold-out plots
  const availablePlots = posts.filter(post => !post.isSoldOut);
  const soldOutPlots = posts.filter(post => post.isSoldOut);

  // Combine with sold-out plots at the end
  const sortedPosts = [...availablePlots, ...soldOutPlots];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8" style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        {/* Loading state remains the same */}
      </div>
    );
  }

  if (!sortedPosts || sortedPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center px-4 py-16">
        {/* No plots available state remains the same */}
      </div>
    );
  }

  return (
    <div className="min-h-[87vh] bg-gradient-to-b from-blue-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="max-w-7xl pt-12 mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our collection of premium residential plots in Dholera Smart City. Find your perfect investment opportunity!
          </p>
        </div>

        {/* List View Container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-gray-100">
          {sortedPosts.map((post, index) => (
            <div
              key={post._id}
              className={`border-b last:border-b-0 border-gray-200 ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"} ${post.isSoldOut ? "opacity-90" : ""}`}
            >
              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="relative h-64 md:h-48 w-full md:w-1/3 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                  {post.isSoldOut && (
                    <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                        Sold Out
                      </span>
                    </div>
                  )}
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(600).url() || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <MapPin className="text-gray-400 h-12 w-12" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {post.title}
                  </h2>

                  {/* Display categories */}
                  

                  {post.pdfUrl && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Link
                        href={post.pdfUrl}
                        download
                        className={`inline-flex items-center justify-center px-4 py-3 rounded-lg shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex-1 text-center ${
                          post.isSoldOut
                            ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                            : "bg-gradient-to-r from-[#bc9849] to-[#d8b66d] text-white"
                        }`}
                      >
                        <Download className="mr-2" size={20} />
                        {post.isSoldOut ? "Download (Sold Out)" : "Download"}
                      </Link>

                      <Link
                        href={post.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex-1 text-center"
                      >
                        <Eye className="mr-2" size={20} />
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="mt-4 text-sm text-gray-500">
            Contact our team for more information about these plots
          </p>
        </div>
      </div>
    </div>
  );
}