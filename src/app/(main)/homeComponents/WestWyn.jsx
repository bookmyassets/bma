import Image from "next/image";
import Link from "next/link";
import img from "@/assests/we_cover.webp";
import img2 from "@/assests/residency.webp";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const PROJECTS = [
  {
    image: img2,
    name: "WestWyn Residency",
    subtext: "Registry-ready Plots Under ₹8 Lakh*",
    tag: "Premium Plots",
    href: "/dholera-residential-plots/westwyn-residency",
    description:
      "WestWyn Residency is a gated plotting society offering residential plots in Pipariya, Dholera. The Dholera project provides immediate possession with long term appreciation potential.",
    points: [
      "Prime Location: 5 Minutes from SIR boundary, 30 Minutes from Dholera International Airport",
      "Basic Selling Price: ₹6500*/sq. yard",
      "Documentation: NA/NOC/Title clear plots, Registry-ready",
      "Premium Amenities: Clubhouse Lite, EV Charging Station and more",
    ],
  },
  {
    image: img,
    name: "WestWyn Estates",
    subtext: "State Highway Plots in Dholera Starting from ₹10 Lakh*",
    tag: "Plotted Residential",
    href: "/dholera-residential-plots/westwyn-estates",
    description:
      "WestWyn Estates, by BookMyAssets, is a plotted residential society on State Highway-117, Polarpur, Dholera. Buy plots in Dholera that are registry-ready with all documentation ready.",
    points: [
      "Prime Location: 5 Minutes from Bhimnath Railway Junction, 30 Minutes from TATA Semiconductor Plant",
      "Basic Selling Price: ₹6700*/sq. yard",
      "Documentation: NA/NOC/Title clear plots, Registry-ready",
      "Premium Amenities: Clubhouse Lite, EV Charging Station and more",
    ],
  },
];

export default function WestWyn() {
  return (
    <section className="bg-white py-[clamp(2rem,5vw,3.5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)]">
        {/* ── Section Header ── */}
        <div className="mb-[clamp(1rem,2vw,2.5rem)] text-center">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
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
                <h3 className="text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-black mb-1">
                  {project.name}
                </h3>
                <p className="text-[clamp(1rem,2vw,1.125rem)] font-semibold text-[#deae3c] mb-3">
                  {project.subtext}
                </p>
                <p className="text-[clamp(0.8rem,2vw,1.5rem)] text-black leading-relaxed mb-4">
                  {project.description}
                </p>
                <ul className="space-y-1 mb-3">
                  {project.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-[clamp(0.8rem,2vw,1.5rem)] text-black leading-snug"
                    >
                      <FaCheckCircle className="text-[#deae3c] mt-[2px] flex-shrink-0 text-[clamp(0.8rem,2vw,1.5rem)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={project.href}
                  className="inline-flex items-center gap-2 text-[clamp(0.75rem,1vw,0.825rem)] font-semibold text-[#deae3c] border border-[#deae3c] px-4 py-2 rounded-full hover:bg-[#deae3c] hover:text-white transition-colors duration-200"
                >
                  View Project Details <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
