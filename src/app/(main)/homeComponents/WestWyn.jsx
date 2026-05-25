import Image from "next/image";
import Link from "next/link";
import img from "@/assests/we_cover.webp";
import img2 from "@/assests/residency.webp";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const PROJECTS = [
  {
    image: img2,
    name: "WestWyn Residency",
    subtext: "Registry ready plots starting from ₹8 lakh*",
    tag: "Premium plots",
    href: "/dholera-residential-plots/westwyn-residency",
    description:
      "WestWyn Residency is a gated plotting society offering residential plots in Pipariya, Dholera. The project provides immediate possession with long term appreciation potential.",
    points: [
      "Prime location: 5 minutes from SIR boundary, 30 minutes from Dholera International Airport",
      "Basic selling price: ₹6500*/sq. yard",
      "Documentation: NA, NOC, title clear plots, registry ready",
      "Premium amenities: Clubhouse Lite, EV charging station and more",
    ],
  },
  {
    image: img,
    name: "WestWyn Estates",
    subtext: "State Highway plots in Dholera starting from ₹10 lakh*",
    tag: "Plotted residential",
    href: "/dholera-residential-plots/westwyn-estate",
    description:
      "WestWyn Estates by BookMyAssets is a plotted residential society on State Highway 117, Polarpur, Dholera. The project offers registry ready plots with documentation support.",
    points: [
      "Prime location: 5 minutes from Bhimnath Railway Junction, 30 minutes from TATA Semiconductor Plant",
      "Basic selling price: ₹6700*/sq. yard",
      "Documentation: NA, NOC, title clear plots, registry ready",
      "Premium amenities: Clubhouse Lite, EV charging station and more",
    ],
  },
];

export default function WestWyn() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[80rem] px-[clamp(1rem,4vw,2rem)] py-[clamp(2rem,5vw,3rem)]">
        <div className="mb-[clamp(1.25rem,3vw,2rem)] text-center">
          <h2 className="mx-auto max-w-[64rem] text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.15] text-gray-900">
            Premium{" "}
            <span className="text-[#deae3c]">Residential Plots in Dholera</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-[34rem] grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] md:max-w-[62rem] md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="group flex h-full flex-col overflow-hidden rounded-[1rem] border-[0.0625rem] border-gray-100 bg-white shadow-[0_0.0625rem_0.125rem_rgb(0_0_0_/_0.05)] transition-shadow duration-300 hover:shadow-[0_1.25rem_2.5rem_rgb(0_0_0_/_0.12)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 47.999rem) 100vw, 31rem"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-[clamp(0.5rem,1.25vw,0.875rem)]">
                <span className="mb-[0.75rem] inline-flex w-fit rounded-full border-[0.0625rem] border-[#deae3c]/40 bg-[#deae3c]/10 px-[0.875rem] py-[0.375rem] text-[0.75rem] font-semibold leading-none text-[#9a741d]">
                  {project.tag}
                </span>

                <h3 className="mb-[0.375rem] text-[clamp(1rem,2vw,1.5rem)] font-bold leading-[1.2] text-black">
                  {project.name}
                </h3>

                <p className="mb-[0.875rem] text-[clamp(0.9rem,1.25vw,1.0625rem)] font-semibold leading-[1.45] text-[#deae3c]">
                  {project.subtext}
                </p>

                <p className="mb-[1rem] text-[clamp(0.87rem,1.05vw,1rem)] leading-[1.65] text-black">
                  {project.description}
                </p>

                <ul className="mb-[1.25rem] space-y-[0.5rem]">
                  {project.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-[0.5rem] text-[clamp(0.875rem,1.3vw,1rem)] leading-[1.45] text-black"
                    >
                      <FaCheckCircle className="mt-[0.125rem] shrink-0 text-[1rem] text-[#deae3c]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={project.href}
                  className="mt-auto inline-flex w-fit items-center gap-[0.5rem] rounded-lg border-[0.0625rem] border-[#deae3c] px-[1rem] py-[0.5rem] text-[clamp(0.8125rem,1vw,0.9375rem)] font-semibold leading-none text-[#deae3c] transition-colors duration-200 hover:bg-[#deae3c] hover:text-white"
                >
                  View Project Details
                  <FaArrowRight className="text-[0.75rem]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
