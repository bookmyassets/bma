import Image from "next/image";
import Link from "next/link";

import westwynCountyImage from "@/assests/westwyn-county/westwyn-county-mob1.webp";
import westwynEstatesImage from "@/assests/we_cover.webp";
import westwynResidencyImage from "@/assests/residency.webp";

const projects = [
  {
    name: "WestWyn Residency",
    price: "Starting from ₹8 Lakh",
    location: "1.5 km from DFC",
    href: "/dholera-residential-plots/westwyn-residency",
    image: westwynResidencyImage,
  },
  {
    name: "WestWyn Estates",
    price: "Starting from ₹11 Lakh",
    location: "State Highway 117",
    href: "/dholera-residential-plots/westwyn-estate",
    image: westwynEstatesImage,
  },
  {
    name: "WestWyn County",
    price: "Resale from ₹20 Lakh",
    location: "Fedra-Pipli state highway",
    href: "/dholera-residential-plots/westwyn-county",
    image: westwynCountyImage,
    status: "Resale",
  },
];

export default function ProjectsSection() {
  return (
    <section className="bg-[#080808] py-[clamp(2.5rem,6vw,5rem)] text-white">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
        <div className="mb-[clamp(1.5rem,3vw,3rem)] ">
          
          <h2 className="mt-[0.75rem] text-[#ddbc69] md:text-center max-sm:px-4 gap-[clamp(0.875rem,1.8vw,1.5rem)] text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2]">
            Explore Our Projects in Dholera
          </h2>
        </div>

        <div className="mx-auto grid max-w-[68rem] grid-cols-1 max-sm:px-4 gap-[clamp(0.875rem,1.8vw,1.5rem)] md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_1.5rem_3rem_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-[0.25rem] hover:border-[#ddbc69]/40 hover:bg-white/[0.07]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {project.status && (
                  <span className="absolute right-[1rem] top-[1rem] rounded-full bg-red-600 px-[0.75rem] py-[0.375rem] text-[0.75rem] font-semibold tracking-[0.08em] text-white shadow-lg">
                    {project.status}
                  </span>
                )}
              </div>

              <Link
                href={project.href}
                className="flex flex-1 flex-col gap-[0.75rem] p-[clamp(1rem,2vw,1.375rem)] transition-opacity duration-300 hover:opacity-90"
              >
                <div>
                  <h3 className="text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-[1.35]">
                    {project.name}
                  </h3>
                  <p className="mt-[0.375rem] text-[clamp(0.95rem,1.4vw,1.125rem)] font-normal leading-[1.7] text-[#ddbc69]">
                     {project.price}
                  </p>
                </div>

                <div className="flex items-start gap-[0.625rem] text-[0.875rem] font-normal leading-[1.5] text-white/70">
                  <span className="mt-[0.45rem] h-[0.375rem] w-[0.375rem] shrink-0 rounded-full bg-[#ddbc69]" />
                  <span>{project.location}</span>
                </div>

                {/* mt-auto pushes button to bottom */}
                <span className="mt-auto inline-flex min-h-[2.5rem] items-center justify-center rounded-lg bg-[#ddbc69] px-[1rem] text-[0.875rem] md:text-[1rem] font-semibold leading-[1.4] text-black transition-colors duration-300 group-hover:bg-[#ddbc69]">
                  Explore
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
