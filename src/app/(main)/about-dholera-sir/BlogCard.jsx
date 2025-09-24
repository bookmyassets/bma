import Link from "next/link";
import Image from "next/image";
import residential from "@/assests/bulkLand/residential-hero-mob.-webp.webp";

const bulkLand = [
  {
    title: "Residential Land",
    link: "/bulk-land/residential",
    image: residential
  },
  {
    title: "High Access Corridor",
    link: "/bulk-land/high-access-corridor",
    image: "/src/assests/bulkLand/residential plot-hero.webp"
  },
  {
    title: "Industrial Land",
    link: "/bulk-land/industrial-land",
    image: "/src/assests/bulkLand/residential plot-hero.webp"
  },
  {
    title: "City Centre",
    link: "/bulk-land/city-centre-land",
    image: "/src/assests/bulkLand/residential plot-hero.webp"
  },
  {
    title: "Knowledge and IT Zone",
    link: "/bulk-land/knowledge-and-it-zone",
    image: "/src/assests/bulkLand/residential plot-hero.webp"
  },
  {
    title: "Recreation Sports and Entertainment",
    link: "/bulk-land/recreation-sports-land",
    image: "/src/assests/bulkLand/residential plot-hero.webp"
  }
];

export default function BulkLandCard({ landItem }) {
  return (
    <Link
      href={landItem.link}
      className="group"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Land Image */}
        <div className="relative h-52">
          {landItem.image ? (
            <Image
              src={landItem.image}
              alt={landItem.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#FDB913] to-[#C69C21]"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#C69C21] transition-colors">
            {landItem.title}
          </h2>

          {/* Footer with "Learn More" */}
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FDB913] mr-2"></span>
                <span className="text-black font-medium">
                  Learn More
                </span>
              </div>
              <span className="text-[#C69C21] font-medium">
                &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Usage example:
export function BulkLandGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bulkLand.map((item, index) => (
        <BulkLandCard key={index} landItem={item} />
      ))}
    </div>
  );
}