"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useState } from "react";

import westwyn1 from "@/assests/residential/Orchid-dholera-plan-layout.webp";
import banner from "@/assests/residential/orchid-hero-desktopview.webp";
import bannerMob from "@/assests/residential/orchid-hero-mob.view-webp.webp";

const CommonForm = dynamic(() => import("../../components/CommonForm"), {
  loading: () => <div className="min-h-[220px]" />,
});

const ContactForm = dynamic(() => import("../../components/Contactform"), {
  loading: () => <div className="min-h-[320px]" />,
});

const CostSheet = dynamic(() => import("../costsheet2"), {
  loading: () => <div className="min-h-[240px]" />,
});

const ActiveProjectsSection = dynamic(() => import("../ActiveProject"), {
  loading: () => <div className="min-h-[240px]" />,
});

const BrochureDownload = dynamic(
  () => import("../../components/BrochureDownload"),
  {
    loading: () => <div className="min-h-[320px]" />,
  },
);

const PROJECT_NAME = "Orchid";
const BROCHURE_LINK =
  "https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf";

const BENEFITS = [
  {
    title: "Prime Location",
    icon: "📍",
    content:
      "Located in Gamph village, Dholera, Ahmedabad, Orchid benefits from planned connectivity through the Ahmedabad Dholera Expressway, Dholera International Airport, and the broader DMIC corridor.",
  },
  {
    title: "Flexible and Investor Friendly",
    icon: "📈",
    content:
      "Plots begin at 100 sq. yards priced around ₹6,700 per sq. yard, with investor friendly payment terms and convenient installments.",
  },
  {
    title: "Fully Approved and Legal",
    icon: "✅",
    content:
      "All plots are NA NOC approved, have clear titles, and are registry ready with plan pass certification for immediate registry and sale deed execution.",
  },
  {
    title: "Future Growth Potential",
    icon: "🌿",
    content:
      "Being in the early stage of development within Dholera creates long term growth potential as infrastructure develops over time.",
  },
  {
    title: "Premium Infrastructure",
    icon: "🏆",
    content:
      "Orchid includes gated entry, internal roads, street lighting, electricity, water connectivity, CCTV security, and landscaped greenery.",
  },
];

export default function OrchidPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [modalState, setModalState] = useState({
    open: false,
    type: "contact",
    title: "",
    headline: "",
    buttonName: "",
  });

  const openModal = useCallback(
    ({ type = "contact", title, headline, buttonName }) => {
      setModalState({
        open: true,
        type,
        title,
        headline,
        buttonName,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, open: false }));
  }, []);

  const handleAfterSubmit = useCallback(() => {
    window.open(BROCHURE_LINK, "_blank", "noopener,noreferrer");
  }, []);

  const toggleFAQ = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <>
      <div className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh] md:h-[100vh]">
        <div className="absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet={bannerMob.src} />
            <img
              src={banner.src}
              alt="Orchid Township Dholera"
              className="h-full w-full object-cover"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white sm:mb-4 sm:text-5xl md:text-6xl">
            Orchid
          </h1>

          <div className="w-full max-w-md rounded-lg bg-white/20 p-4 backdrop-blur-sm sm:p-6">
            <div className="text-white">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold sm:text-3xl">167</span>
                <span className="text-sm sm:text-base">plots sold</span>
              </div>
            </div>

            <button
              onClick={() =>
                openModal({
                  title: "Missed Orchid? Explore plots under ₹10 lakh",
                  headline:
                    "Please fill out the form to get project details. Fields marked with * are mandatory.",
                  buttonName: "Get A Call Back",
                  type: "contact",
                })
              }
              className="mt-4 w-full rounded-full bg-yellow-500 px-6 py-2 font-semibold text-black transition-colors duration-300 hover:bg-yellow-600"
            >
              Book Your Plot In Dholera under ₹10 Lakh
            </button>
          </div>
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:flex-row md:gap-12 md:px-8 md:py-20">
          <div className="w-full px-2 md:w-2/5">
            <h2 className="text-[32px] font-semibold text-black">
              About
              <span className="hidden sm:inline">
                <br />
              </span>{" "}
              Orchid
            </h2>
          </div>

          <div className="w-full space-y-6 px-2 md:w-3/5">
            <p className="text-base font-light leading-relaxed text-gray-600 md:text-lg">
              Orchid is a premium residential plotting project located in Gamph
              village within the rapidly evolving Dholera Smart City. It offers
              legally secure, developer backed plots with modern infrastructure
              and digital convenience.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() =>
                  openModal({
                    title: "Get the Orchid brochure",
                    headline:
                      "Please fill out the form to download the brochure. Fields marked with * are mandatory.",
                    buttonName: "Download Brochure",
                    type: "brochure",
                  })
                }
                className="rounded-md bg-[#deae3c] px-6 py-3 font-medium text-black shadow-md transition duration-300 hover:bg-[#f3bb39]"
              >
                Download Brochure
              </button>

              <a
                href="https://wa.me/918130371647"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#deae3c] bg-white px-6 py-3 font-medium text-[#deae3c] transition-colors hover:bg-[#f8f5e6]"
              >
                WhatsApp Site Visit
              </a>
            </div>
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
              <div className="relative">
                <Image
                  src={westwyn1}
                  alt="Orchid Township layout"
                  className="h-auto w-full rounded-2xl shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="space-y-4">
                {BENEFITS.map((benefit, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={benefit.title}
                      className="rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
                    >
                      <button
                        className="flex w-full items-center justify-between text-left"
                        onClick={() => toggleFAQ(index)}
                        aria-expanded={isOpen}
                        aria-controls={`benefit-${index}`}
                      >
                        <span className="flex items-center space-x-4">
                          <span className="text-2xl">{benefit.icon}</span>
                          <span className="text-lg font-semibold text-gray-800 md:text-xl">
                            {benefit.title}
                          </span>
                        </span>

                        <span className="ml-4 text-2xl text-[#deae3c]">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <div
                        id={`benefit-${index}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-10">
                          <p className="leading-relaxed text-black">
                            {benefit.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-4 pt-4">
        <CostSheet projectSlug="orchid" showProjectSelector={false} />
      </div>

      <CommonForm
        title="Orchid is Sold Out. Want to Explore Similar Projects?"
        button="Talk to our Team"
      />

      <ActiveProjectsSection />

      {modalState.open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md">
            {modalState.type === "brochure" ? (
              <BrochureDownload
                onClose={closeModal}
                title={modalState.title}
                headline={modalState.headline}
                buttonName={modalState.buttonName}
                onAfterSubmit={handleAfterSubmit}
                link={BROCHURE_LINK}
              />
            ) : (
              <ContactForm
                onClose={closeModal}
                title={modalState.title}
                headline={modalState.headline}
                buttonName={modalState.buttonName}
                project={PROJECT_NAME}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}