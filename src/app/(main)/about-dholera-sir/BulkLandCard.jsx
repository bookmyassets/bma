import Link from "next/link";
import Image from "next/image";

export default function BulkLandCard({ landItem, compact = false }) {
  return (
    <Link href={landItem.link} className="group">
      <div
        className={`bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200 ${
          compact ? "hover:bg-gray-50" : ""
        }`}
      >
        <div className={`relative ${compact ? "h-32" : "h-48"} overflow-hidden`}>
          <Image
            src={landItem.image}
            alt={landItem.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className={`${compact ? "p-3" : "p-4"}`}>
          <h4
            className={`font-semibold text-gray-800 group-hover:text-[#deae3c] transition-colors ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            {landItem.title}
          </h4>
        </div>
      </div>
    </Link>
  );
}