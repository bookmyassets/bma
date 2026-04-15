import Image from "next/image";
import Link from "next/link";
import img1 from "@/assests/BMA.webp";
import img from "@/assests/we_cover.webp";
import img2 from "@/assests/residency.webp";
import { FaCheck, FaArrowRight } from "react-icons/fa";

const PROJECTS = [
  {
    image: img2,
    name: "WestWyn Residency",
    subtext: "State Highway Plots in Dholera Starting from ₹10 Lakh*",
    tag: "Premium Plots",
    href: "/dholera-residential-plots/westwyn-residency",
    description:
      "WestWyn Residency is a premium plotted residential society in Pipariya, Dholera. Buy plots in dholera that are government-approved plots with immediate possession. The Dholera Project is located just 5 minutes from SIR boundary, at Dholera’s developing corridor, with seamless connectivity to Railway Station, Ahmedabad-Dholera Expressway, TATA Semiconductor Plant and Dholera International Airport.",
  },
  {
    image: img,
    name: "WestWyn Estates",
    subtext: "Registry-ready Plots Under ₹8 Lakh*",
    tag: "Plotted Residential",
    href: "/dholera-residential-plots/westwyn-estates",
    description:
      "WestWyn Estates, by BookMyAssets, is a plotted residential society on State Highway-117, Polarpur, Dholera. Buy plots in dholera that are government-approved. The project is located just 5 minutes from Bhimnath Railway Station, in one of Dholera’s most active and fast developing corridors. with seamless connectivity to Bhimnath Railway Junction, Ahmedabad-Dholera Expressway, TATA Semiconductor Plant and Dholera International Airport.",
  },
];

export default function WestWyn() {
  return (
    <section className="bg-white py-[clamp(1rem,2vw,2rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)]">
        {/* ── Section Header ── */}
        <div className="mb-[clamp(1rem,2vw,2.5rem)] text-center">
          <h2 className="text-[clamp(1.75rem,2vw,2.5rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
            Our Premium{" "}
            <span className="text-[#deae3c]">Residential Projects</span>
          </h2>
        </div>

        {/* ── Project Cards ── */}
        <div className="grid md:grid-cols-2 gap-[clamp(1.25rem,3vw,2rem)] mb-[clamp(2.5rem,5vw,4rem)]">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-[clamp(1rem,2vw,1.5rem)]">
                <h3 className="text-[clamp(1rem,1.6vw,1.25rem)] font-bold text-black mb-1">
                  {project.name}
                </h3>
                <p className="text-[clamp(0.8rem,1vw,0.9rem)] font-semibold text-[#deae3c] mb-3">
                  {project.subtext}
                </p>
                <p className="text-[clamp(0.78rem,1.1vw,0.875rem)] text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 text-[clamp(0.75rem,1vw,0.825rem)] font-semibold text-[#deae3c] border border-[#deae3c] px-4 py-2 rounded-full hover:bg-[#deae3c] hover:text-white transition-colors duration-200"
                >
                  Explore More <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
