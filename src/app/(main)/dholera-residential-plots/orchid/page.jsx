import dynamic from "next/dynamic";
import Image from "next/image";

import westwyn1 from "@/assests/residential/Orchid-dholera-plan-layout.webp";
import banner from "@/assests/residential/orchid-hero-desktopview.webp";
import bannerMob from "@/assests/residential/orchid-hero-mob.view-webp.webp";
import OrchidLeadActions from "./OrchidLeadActions";

const CostSheet = dynamic(() => import("../costsheet2"), {
  loading: () => (
    <div className="mx-4 h-48 animate-pulse rounded-xl bg-gray-100" />
  ),
});

const CommonForm = dynamic(() => import("../../components/CommonForm"), {
  loading: () => <div className="h-24" />,
});

const ActiveProjectsSection = dynamic(() => import("../ActiveProject"), {
  loading: () => <div className="h-24" />,
});

const BENEFITS = [
  {
    title: "Prime Location",
    icon: "📍",
    body: "Located in Gamph village, Dholera, Ahmedabad, Orchid benefits from planned connectivity through the Ahmedabad Dholera Expressway, Dholera International Airport, and the broader DMIC corridor.",
  },
  {
    title: "Flexible and Investor Friendly",
    icon: "📈",
    body: "Plots begin at 100 sq. yards priced around ₹6,700 per sq. yard, with investor friendly payment terms and convenient installments.",
  },
  {
    title: "Fully Approved and Legal",
    icon: "✅",
    body: "All plots are NA NOC approved, have clear titles, and are registry ready with plan pass certification for immediate registry and sale deed execution.",
  },
  {
    title: "Future Growth Potential",
    icon: "🌿",
    body: "Being in the early stage of development within Dholera creates long term growth potential as infrastructure develops over time.",
  },
  {
    title: "Premium Infrastructure and Digital Convenience",
    icon: "🏆",
    body: "Orchid includes gated entry, internal roads, street lighting, electricity, water connectivity, CCTV security, and landscaped greenery. An integrated digital system streamlines booking and document access.",
  },
];

export default function OrchidPage() {
  return (
    <>
    <title>Orchid Township Dholera | Exclusive Residential Plots</title>
    <meta name="description" content="Explore Orchid Township in Dholera SIR. Discover plotted opportunities with modern infrastructure and future growth potential." />
    <link rel="canonical" href="https://www.bookmyassets.com/dholera-residential-plots/orchid" />
      <main>
        <section className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh] md:h-[100vh]">
          <picture>
            <source media="(max-width: 767px)" srcSet={bannerMob.src} />
            <img
              src={banner.src}
              alt="Orchid Township Dholera"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center">
            <h1 className="mb-2 text-4xl font-bold text-white sm:mb-4 sm:text-5xl md:text-6xl">
              Orchid
            </h1>

            <div className="w-full max-w-md rounded-lg bg-white/20 p-4 backdrop-blur-sm sm:p-6">
              <div className="flex flex-col items-center text-white">
                <span className="text-2xl font-bold sm:text-3xl">167</span>
                <span className="text-sm sm:text-base">plots sold</span>
              </div>

              <div className="mt-4">
                <OrchidLeadActions variant="hero" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:flex-row md:gap-12 md:px-8 md:py-20">
            <div className="w-full px-2 md:w-2/5">
              <h2 className="mb-4 text-[32px] font-semibold text-black">
                About
                <span className="hidden sm:inline">
                  <br />
                </span>{" "}
                Orchid
              </h2>
            </div>

            <div className="w-full space-y-6 px-2 md:w-3/5">
              <p className="text-base font-light leading-relaxed text-gray-600 md:text-lg">
                Orchid is a premium residential plotting project located in
                Gamph village within the rapidly evolving Dholera Smart City. It
                offers legally secure, developer backed plots with modern
                infrastructure and digital convenience.
              </p>

              <OrchidLeadActions variant="about" />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-light text-[#deae3c] md:mb-16 md:text-4xl lg:text-5xl">
              Why Invest in Orchid?
            </h2>

            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
              <div className="w-full lg:w-1/2">
                <Image
                  src={westwyn1}
                  alt="Orchid Dholera plot layout"
                  className="h-auto w-full rounded-2xl shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="w-full space-y-4 lg:w-1/2">
                {BENEFITS.map((benefit) => (
                  <details
                    key={benefit.title}
                    className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between text-left">
                      <span className="flex items-center space-x-4">
                        <span className="text-2xl" aria-hidden="true">
                          {benefit.icon}
                        </span>
                        <span className="text-lg font-semibold text-gray-800 md:text-xl">
                          {benefit.title}
                        </span>
                      </span>

                      <span className="ml-4 text-2xl text-[#deae3c]">
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </summary>

                    <p className="pl-10 pt-4 leading-relaxed text-black">
                      {benefit.body}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="py-4">
          <CostSheet projectSlug="orchid" showProjectSelector={false} />
        </div>

        <CommonForm
          title="Orchid is Sold Out. Want to Invest in More Projects Like This?"
          button="Talk to our Team"
        />

        <ActiveProjectsSection />
      </main>
    </>
  );
}
