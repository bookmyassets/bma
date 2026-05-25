import Image from "next/image";
import Link from "next/link";

import westwynCountyImage from "@/assests/westwyn-county/westwyn-county-mob2.webp";
import westwynEstatesImage from "@/assests/we_cover.webp";
import westwynResidencyImage from "@/assests/residency.webp";

const projects = [
  {
    name: "Westwyn Estates",
    price: "Rs. 6,700/per sq yd",
    location: "Polarpur",
    href: "/dholera-residential-plots/westwyn-estate",
    image: westwynEstatesImage,
  },
  {
    name: "Westwyn Residency",
    price: "Rs. 6,500/per sq yd",
    location: "Pipariya, Dholera",
    href: "/dholera-residential-plots/westwyn-residency",
    image: westwynResidencyImage,
  },
  {
    name: "Westwyn County",
    price: "Rs. 11,000/per sq yd",
    location: "Fedra-pipli state highway",
    href: "/dholera-residential-plots/westwyn-county",
    image: westwynCountyImage,
    status: "Sold Out",
  },
];

export default function ProjectsSection() {
  return (
    <section className="bg-[#080808] py-[clamp(2.5rem,6vw,5rem)] text-white">
      <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,3rem)]">
        <div className="mb-[clamp(1.5rem,3vw,3rem)] max-w-[42rem]">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#deae3c]">
            Featured Projects
          </span>
          <h2 className="mt-[0.75rem] text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-[1.15]">
            Explore Westwyn Projects in Dholera
          </h2>
        </div>

        <div className="mx-auto grid max-w-[68rem] grid-cols-1 gap-[clamp(0.875rem,1.8vw,1.5rem)] md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_1.5rem_3rem_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-[0.25rem] hover:border-[#deae3c]/40 hover:bg-white/[0.07]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                {project.status && (
                  <span className="absolute right-[1rem] top-[1rem] rounded-full bg-red-600 px-[0.75rem] py-[0.375rem] text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white shadow-lg">
                    {project.status}
                  </span>
                )}
              </div>

              <Link
                href={project.href}
                className="block space-y-[0.75rem] p-[clamp(1rem,2vw,1.375rem)] transition-opacity duration-300 hover:opacity-90"
              >
                <div>
                  <h3 className="text-[clamp(1rem,1.6vw,1.25rem)] font-semibold leading-[1.25]">
                    {project.name}
                  </h3>
                  <p className="mt-[0.375rem] text-[clamp(0.9375rem,1.2vw,1rem)] font-semibold text-[#deae3c]">
                    Starting from {project.price}
                  </p>
                </div>

                <div className="flex items-start gap-[0.625rem] text-[0.875rem] leading-[1.55] text-white/70">
                  <span className="mt-[0.45rem] h-[0.375rem] w-[0.375rem] shrink-0 rounded-full bg-[#deae3c]" />
                  <span>{project.location}</span>
                </div>

                <span className="inline-flex min-h-[2.5rem] items-center justify-center rounded-lg bg-[#deae3c] px-[1rem] text-[0.875rem] font-semibold text-black transition-colors duration-300 group-hover:bg-[#f3bb39]">
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
