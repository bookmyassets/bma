import Image from "next/image";
import {
  Building,
  CheckCircle,
  Globe,
  Heart,
  MapPin,
  Phone,
  Settings,
  Shield,
  Target,
} from "lucide-react";
import img1 from "@/assests/taboola/icons/bookmyassets-365-days-assistance-icon.svg";
import img2 from "@/assests/taboola/icons/bookmyassets-buy-back-assistance-icon.svg";
import img3 from "@/assests/taboola/icons/bookmyassets-due-diligence-team-icon.svg";
import img4 from "@/assests/taboola/icons/bookmyassets-immediate-sale-deed-icon.svg";
import img5 from "@/assests/taboola/icons/bookmyassets-resale-support-icon.svg";

const supportIcons = [
  { id: 1, icon: img3, label: "Due Diligence Team" },
  { id: 2, icon: img4, label: "Immediate Sale Deed" },
  { id: 3, icon: img1, label: "365 Days Site Visit" },
  { id: 4, icon: img5, label: "Resale Support" },
  { id: 5, icon: img2, label: "Buyback Assistance" },
];

const counters = [
  { value: "7+ Projects", label: "Successfully Sold Out" },
  { value: "2 Lakh+ Sq. Yd", label: "Dholera Land Sold" },
  { value: "957+ Plots", label: "Registry Delivered" },
  { value: "561+ Clients", label: "Investor Client Base" },
];

const whyChooseFeatures = [
  {
    icon: MapPin,
    title: "Dholera-Focused Developer",
    description:
      "Focused real estate development and property support in and around Dholera.",
  },
  {
    icon: Building,
    title: "Plots and Bulk Land",
    description:
      "Residential plot options and bulk land support for different requirements.",
  },
  {
    icon: Shield,
    title: "Project and Legal Documents",
    description:
      "Available project information and legal documents for buyer review.",
  },
  {
    icon: Target,
    title: "Transparent Process",
    description:
      "Clear pricing, project information and a straightforward buying process.",
  },
  {
    icon: Settings,
    title: "In-House Services",
    description:
      "Construction and fabrication support coordinated within the BMA Group.",
  },
  {
    icon: Phone,
    title: "Site Visit and Registry Support",
    description:
      "Assistance with site visits, documentation and registry coordination.",
  },
  {
    icon: Heart,
    title: "Property Support",
    description:
      "Rental, resale and maintenance assistance after property purchase.",
  },
  {
    icon: Globe,
    title: "Indian and NRI Buyers",
    description:
      "Practical guidance for buyers based in India and overseas.",
  },
  {
    icon: CheckCircle,
    title: "Liveable, Future-Ready Development",
    description:
      "A long-term focus on planned communities, habitation and buyer support.",
  },
];

export default function AboutBMA() {
  return (
    <section id="why-bma">
      {/* <div className="bg-gray-50 py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="mb-3 flex flex-col items-center text-center sm:mb-4">
            <div className="mb-2 flex items-center gap-2 sm:gap-3">
              <div className="h-px w-8 bg-[#ddbc69] sm:w-12" />
              <h2 className="mx-auto max-w-5xl text-[clamp(1.25rem,2.5vw,1.85rem)] font-bold leading-tight text-gray-900">
                BookMyAssets: Trusted Developers in Dholera
              </h2>
              <div className="h-px w-8 bg-[#ddbc69] sm:w-12" />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm leading-6 text-gray-700 sm:text-base">
              With BookMyAssets, you invest in Dholera with confidence. We
              provide location transparency, expert guidance, and access to
              high-potential land opportunities. We ensure every investment is
              backed by trust, verification, and future growth potential.
            </p>

            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                {counters.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center rounded-xl bg-white p-2 shadow-sm transition-shadow hover:shadow-md sm:p-3"
                  >
                    <div className="mb-0.5 text-[clamp(1rem,2vw,1.3rem)] font-bold text-[#ddbc69] sm:mb-1">
                      {value}
                    </div>
                    <p className="text-center text-[clamp(0.7rem,1.1vw,0.8rem)] font-medium leading-4 text-gray-700">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 sm:pt-3">
              <h3 className="mx-auto max-w-7xl text-center text-[clamp(1.2rem,2.3vw,1.7rem)] font-bold leading-tight text-gray-900">
                Why Invest with BookMyAssets
              </h3>
              <div className="pt-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
                  {supportIcons.map((item, index) => {
                    const isLastOdd =
                      index === supportIcons.length - 1 &&
                      supportIcons.length % 2 !== 0;

                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 p-2 shadow-sm transition-shadow hover:shadow-md sm:gap-2 ${
                          isLastOdd ? "col-span-2 sm:col-span-1" : ""
                        }`}
                      >
                        <div className="relative h-[clamp(4.5rem,6vw,6rem)] w-[clamp(4.5rem,6vw,6rem)]">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-center text-[clamp(0.7rem,1.1vw,0.82rem)] font-medium leading-4 text-gray-700">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-black py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Why Choose BookMyAssets?
            </h2>
            <div className="my-3 flex items-center justify-center sm:my-4">
              <div className="h-0.5 w-12 rounded bg-[#ddbc69] sm:w-16" />
              <span className="mx-3 size-2 rotate-45 bg-[#ddbc69]" />
              <div className="h-0.5 w-12 rounded bg-[#ddbc69] sm:w-16" />
            </div>
            <p className="mx-auto max-w-4xl text-sm leading-6 text-gray-300 sm:text-base">
              BookMyAssets provides complete property support in Dholera under
              one group.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {whyChooseFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="border-t border-white/20 py-4 sm:py-5"
                >
                  <Icon
                    className="mb-3 h-7 w-7 text-[#ddbc69]"
                    aria-hidden="true"
                  />
                  <h3 className="mb-1.5 text-base font-bold text-white sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6 text-gray-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
