"use client";

import Image from "next/image";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import dynamic from "next/dynamic";
import westwyn1 from "@/assests/residential/Orchid-dholera-plan-layout.webp";
import banner from "@/assests/residential/orchid-hero-desktopview.webp";
import bannerMob from "@/assests/residential/orchid-hero-mob.view-webp.webp";
import { Plus, Minus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

// ─── Dynamic imports: heavy components load only when needed ───────────────────
const CommonForm = dynamic(() => import("../../components/CommonForm"), {
  ssr: false,
});
const ContactForm = dynamic(() => import("../../components/Contactform"), {
  ssr: false,
});
const CostSheet = dynamic(() => import("../costsheet2"), { ssr: false });
const ActiveProjectsSection = dynamic(() => import("../ActiveProject"), {
  ssr: false,
});
const BrochureDownload = dynamic(
  () => import("../../components/BrochureDownload"),
  { ssr: false },
);
// AnimatePresence only needed when modal is open — import dynamically
const AnimatePresence = dynamic(
  () => import("framer-motion").then((m) => ({ default: m.AnimatePresence })),
  { ssr: false },
);

// ─── FAQ data (static — outside component to avoid re-creation) ───────────────
const BENEFITS = [
  {
    title: "Prime Location",
    icon: "📍",
    body: "Located in village: Gamph, tehsil: Dholera, Dist: Ahmedabad, Orchid benefits from planned connectivity through the Ahmedabad–Dholera Expressway, Dholera International Airport, and the broader DMIC corridor.",
  },
  {
    title: "Flexible and Investor Friendly",
    icon: "📈",
    body: "Plots begin at 100 sq. yards (900 sq. ft.) priced around ₹6,700 per sq. yard (₹744 per sq. ft.), with investor friendly terms such as a 25% down payment and convenient installments.",
  },
  {
    title: "Fully Approved and Legal",
    icon: "🌿",
    body: "All plots are NA/NOC approved, have clear titles, and are registry ready plots with plan pass certification ready for immediate registry and sale deed execution.",
  },
  {
    title: "High ROI Potential",
    icon: "✅",
    body: "Being at an early stage of development in a major smart city like Dholera opens the potential for significant appreciation as infrastructure matures.",
  },
  {
    title: "Premium Infrastructure and Digital Convenience",
    icon: "🏆",
    body: "Orchid includes gated entry, internal roads, street lighting, electricity, full water connectivity, CCTV security, and landscaped greenery. An integrated digital system streamlines booking with instant offer letters, auto-calculated payments, and downloadable PDFs.",
  },
];

const PROJECT = "Orchid";

export default function OrchidPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Counter states
  const [sqYards, setSqYards] = useState(0);
  const [plots, setPlots] = useState(0);
  const [amenities, setAmenities] = useState(0);

  // Form config
  const [formConfig, setFormConfig] = useState({
    title: "",
    headline: "",
    buttonName: "",
    formType: "",
  });

  // ─── Open / close handlers (stable references) ──────────────────────────────
  const openContactForm = useCallback((title, headline, btnName, type) => {
    setFormConfig({ title, headline, buttonName: btnName, formType: type });
    setIsContactFormOpen(true);
  }, []);

  const closeContactForm = useCallback(() => setIsContactFormOpen(false), []);

  const handleAfterSubmit = useCallback(() => {
    if (formConfig.formType === "brochure") {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "https://shorturl.at/Dv00M";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.download = "brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 300);
    }
  }, [formConfig.formType]);

  const toggleFAQ = useCallback(
    (index) => setOpenIndex((prev) => (prev === index ? null : index)),
    [],
  );

  // ─── Counter animation using rAF (no main-thread blocking) ──────────────────
  const countersRef = useRef(null);

  useEffect(() => {
    const el = countersRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const animateCounter = (setter, target, duration) => {
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setter(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };

        animateCounter(setSqYards, 150, 1500);
        animateCounter(setPlots, 9250, 2000);
        animateCounter(setAmenities, 15, 1200);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <title>Orchid Township Dholera | Exclusive Residential Plots</title>
      <meta
        name="description"
        content="Explore Orchid Township in Dholera SIR! Find your ideal plot amidst innovative urban planning and smart infrastructure designed for future growth."
      />
      <link
        rel="canonical"
        href="https://www.bookmyassets.com/dholera-residential-plots/orchid"
      />

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[100vh] overflow-hidden">
        {/* Desktop banner */}
        <Image
          src={banner}
          alt="Orchid Township Dholera"
          fill
          priority
          sizes="100vw"
          className="object-cover max-sm:hidden"
        />
        {/* Mobile banner */}
        <Image
          src={bannerMob}
          alt="Orchid Township Dholera"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4">
            Orchid
          </h1>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-md w-full">
            <div className="flex flex-col items-center text-white">
              <span className="text-2xl sm:text-3xl font-bold">167</span>
              <span className="text-sm sm:text-base">plots sold</span>
            </div>

            <button
              onClick={() =>
                openContactForm(
                  "Missed Orchid? Explore plots under ₹10 lakh at Westwyn Estate",
                  "Please fill out the form to get exclusive details of Orchid. Fields marked with * are mandatory.",
                  "Get A Call Back",
                  "",
                )
              }
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full transition-colors duration-300 w-full"
            >
              Book Your Plot In Dholera under ₹10 Lakh
            </button>
          </div>
        </div>
      </div>

      {/* ── About Section ─────────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className="flex flex-col md:flex-row px-4 md:px-8 py-12 md:py-20 gap-6 md:gap-12 max-w-7xl mx-auto">
          <div className="w-full md:w-2/5 pl-2 pr-2">
            <h2 className="text-[32px] font-semibold text-black mb-4">
              About{" "}
              <span className="max-sm:hidden">
                <br />
              </span>{" "}
              Orchid
            </h2>
          </div>

          <div className="w-full md:w-3/5 pl-2 pr-2 space-y-6">
            <p className="text-base md:text-lg font-light leading-relaxed text-gray-600">
              Orchid is a premium residential plotting project located in Gamph
              village within the rapidly evolving Dholera Smart City (Dholera
              SIR). Positioned within the DMIC corridor, Orchid offers legally
              secure, developer backed plots with modern infrastructure and
              digitized convenience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  openContactForm(
                    "Get details on WestWyn Estate",
                    "Please fill out the form to download our brochure. Fields marked with * are mandatory.",
                    "Download Brochure",
                    "brochure",
                  )
                }
                className="bg-[#deae3c] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
              >
                Download Brochure
              </button>

              <a
                href="https://wa.me/918130371647"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#deae3c] text-[#deae3c] px-6 py-3 rounded-xl font-medium hover:bg-[#f8f5e6] transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp />
                Book Site Visit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Invest Section ────────────────────────────────────────────────── */}
      <div className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-[#deae3c] mb-12 md:mb-16">
            Why Invest in Orchid?
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <Image
                src={westwyn1}
                alt="Orchid Dholera Plot Layout"
                className="w-full h-auto rounded-2xl shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>

            {/* Accordion */}
            <div className="w-full lg:w-1/2 space-y-4">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="group border border-gray-200 rounded-xl p-6 bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`benefit-${index}`}
                  >
                    <span className="flex items-center space-x-4">
                      <span className="text-2xl" aria-hidden="true">
                        {benefit.icon}
                      </span>
                      <span className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-[#deae3c]">
                        {benefit.title}
                      </span>
                    </span>
                    <span className="flex-shrink-0 transition-transform duration-200">
                      {openIndex === index ? (
                        <Minus className="w-6 h-6 text-[#deae3c]" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#deae3c]" />
                      )}
                    </span>
                  </button>

                  <div
                    id={`benefit-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-96 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="pl-10 text-black leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cost Sheet ────────────────────────────────────────────────────────── */}
      <div className="pt-4 pb-4">
        <Suspense
          fallback={
            <div className="h-48 animate-pulse bg-gray-100 rounded-xl mx-4" />
          }
        >
          <CostSheet projectSlug="orchid" showProjectSelector={false} />
        </Suspense>
      </div>

      {/* ── Lead Form ─────────────────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <CommonForm
          title="Orchid is Sold Out. Want to Invest in More Projects Like This?"
          button="Talk to our Team"
        />
      </Suspense>

      {/* ── Active Projects ───────────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <ActiveProjectsSection />
      </Suspense>

      {/* ── Modal ─────────────────────────────────────────────────────────────── */}
      {isContactFormOpen && (
        <Suspense fallback={null}>
          <AnimatePresence>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] p-4">
              <div className="w-full max-w-md">
                {/* Show BrochureDownload for brochure type, ContactForm for everything else */}
                {formConfig.formType === "brochure" ? (
                  <BrochureDownload
                    onClose={closeContactForm}
                    title={formConfig.title}
                    headline={formConfig.headline}
                    buttonName={formConfig.buttonName}
                    onAfterSubmit={handleAfterSubmit}
                    link="https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf"
                  />
                ) : (
                  <ContactForm
                    onClose={closeContactForm}
                    title={formConfig.title}
                    headline={formConfig.headline}
                    buttonName={formConfig.buttonName}
                    project={PROJECT}
                  />
                )}
              </div>
            </div>
          </AnimatePresence>
        </Suspense>
      )}
    </>
  );
}
