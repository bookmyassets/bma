import Image from "next/image";
import {
  Check,
  MapPin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import residentialImage from "@/assests/bulkLand/residential-bulk-land.webp";
import highAccessImage from "@/assests/bulkLand/hac.webp";
import cityCentreImage from "@/assests/bulkLand/city-centre.webp";
import recreationImage from "@/assests/bulkLand/recreation-sports-entertainment-Zone-hero.webp";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import InlineLeadForm from "../components/InlineLeadForm";
import SchemaMarkup from "../components/SchemaMarkup";

export const metadata = {
  title: "Bulk Land in Dholera | Commercial Land Deals",
  description:
    "Buy bulk land in Dholera Smart City for township, residential or industrial development. Clear titles, NA approvals and end-to-end legal support.",
  alternates: {
    canonical: "https://www.bookmyassets.com/bulk-land",
  },
  openGraph: {
    title: "Bulk Land in Dholera SIR | BookMyAssets",
    description:
      "Buy bulk land in Dholera Smart City for township, residential or industrial development. Clear titles, NA approvals and end-to-end legal support.",
    url: "https://www.bookmyassets.com/bulk-land",
    siteName: "BookMyAssets",
    type: "website",
  },
};

const landOpportunities = [
  {
    title: "Residential Bulk Land in Dholera SIR",
    description:
      "Explore a large residential land parcel in Dholera for housing, plotted development and long-term real estate planning.",
    landUse: "Residential development",
    image: residentialImage,
    imageAlt: "Residential bulk land in Dholera SIR",
    benefitsTitle: "Benefits of Buying Bulk Residential Land",
    benefits: [
      "Large Development Opportunity",
      "Planned Urban Growth",
      "Future Housing Demand",
      "Infrastructure-Led Location",
      "Multiple Residential Formats",
    ],
  },
  {
    title: "High Access Corridor Land in Dholera SIR",
    description:
      "Explore bulk land in Dholera’s High Access Corridor for residential, commercial and mixed-use development.",
    landUse: "Residential and commercial development",
    image: highAccessImage,
    imageAlt: "High Access Corridor land in Dholera SIR",
    benefitsTitle: "Benefits of Buying High Access Corridor Land",
    benefits: [
      "Better road access",
      "High project visibility",
      "Mixed-use development options",
      "Future commercial demand",
      "Planned urban infrastructure",
      "Suitable for residential and business projects",
      "Strong connectivity to major development zones",
    ],
  },
  {
    title: "City Centre Land in Dholera SIR",
    description:
      "Explore bulk land in Dholera City Centre for commercial, hospitality, residential and mixed-use development.",
    landUse: "Commercial, hospitality and mixed-use development",
    image: cityCentreImage,
    imageAlt: "City Centre land in Dholera SIR",
    benefitsTitle: "Benefits of Buying City Centre Land",
    benefits: [
      "Prime Central Location",
      "Better Visibility and Access",
      "Future Business and Customer Footfall",
      "Multiple Commercial Uses",
      "Residential and Mixed-Use Options",
      "Planned Smart City Infrastructure",
    ],
  },
  {
    title: "Recreation, Sports & Entertainment Land in Dholera SIR",
    description:
      "Explore bulk land in Dholera’s Recreation, Sports and Entertainment Zone for sports, tourism, hospitality, wellness and leisure projects.",
    landUse: "Recreation, sports, entertainment and commercial development",
    image: recreationImage,
    imageAlt: "Recreation, Sports and Entertainment land in Dholera SIR",
    benefitsTitle: "Benefits of Buying Recreation and Sports Land",
    benefits: [
      "Sports Development Opportunities",
      "Tourism and Hospitality Potential",
      "High Visitor and Event Footfall",
      "Entertainment and Leisure Projects",
      "Wellness and Community Facilities",
      "Planned Smart City Infrastructure",
    ],
  },
];

const supportItems = [
  "Understanding the land location",
  "Reviewing available documents",
  "Explaining the current land use",
  "Sharing parcel and pricing details",
  "Arranging site visits",
  "Coordinating meetings with the landowner",
  "Supporting price discussions",
  "Assisting with transaction coordination",
];

const faqs = [
  {
    question: "What types of bulk land are available in Dholera SIR?",
    answer:
      "Available options may include residential land, High Access Corridor land, City Centre land, and Recreation, Sports and Entertainment land.",
  },
  {
    question: "What can be developed on bulk land in Dholera?",
    answer:
      "Depending on the land-use zone, buyers may develop residential, commercial, hospitality, mixed-use, sports, tourism or entertainment projects, subject to approvals.",
  },
  {
    question: "What is the starting price of bulk land in Dholera SIR?",
    answer:
      "Bulk land prices depend on the location, land size, zoning and current availability. Contact the BookMyAssets relationship manager for updated pricing.",
  },
  {
    question: "Does BookMyAssets provide land documents?",
    answer:
      "Yes. BookMyAssets shares available title, zoning, location and approval documents for review. Buyers should also complete independent legal verification.",
  },
  {
    question: "Can I schedule a site visit for bulk land?",
    answer:
      "Yes. BookMyAssets can arrange a site visit and help you understand the land location, permitted use, documents and transaction process.",
  },
];

function ActionButtons() {
  return (
    <div className="flex">
      <a
        href="https://wa.me/918130371647"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#ddbc69] px-5 py-3 text-sm font-bold text-[#101010] transition-colors hover:bg-[#ebcb7a] focus:outline-none focus:ring-2 focus:ring-[#ddbc69] focus:ring-offset-2 focus:ring-offset-[#101010]"
      >
        <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
        Get Land Details
      </a>
    </div>
  );
}

function LandOpportunity({ opportunity, index }) {
  const isReversed = index % 2 === 1;

  return (
    <section className="border-b border-white/10 py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div
            className={`relative order-2 min-h-[29rem] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[29rem] ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <Image
              src={opportunity.image}
              alt={opportunity.imageAlt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className=""
            />
          </div>

          <div className={`order-1 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
            <div className="mb-5 flex items-center gap-3 text-[#ddbc69]">
              <span className="h-px w-9 bg-[#ddbc69]" />
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </div>

            {index === 0 ? (
              <h1 className="max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#f5f1e8]">
                {opportunity.title}
              </h1>
            ) : (
              <h2 className="max-w-2xl text-[clamp(1.75rem,3.2vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-[#f5f1e8]">
                {opportunity.title}
              </h2>
            )}

            <p className="mt-5 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-7 text-[#f5f1e8]/70">
              {opportunity.description}
            </p>

            <dl className="my-7 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.025] px-5">
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-sm text-[#f5f1e8]/50">Land use:</dt>
                <dd className="text-sm font-semibold text-[#f5f1e8]">
                  {opportunity.landUse}
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-sm text-[#f5f1e8]/50">Starting price:</dt>
                <dd className="text-sm font-semibold text-[#f5f1e8]">
                  Connect with RM
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-sm text-[#f5f1e8]/50">Availability:</dt>
                <dd className="text-sm font-semibold text-[#f5f1e8]">
                  Subject to current inventory and final verification
                </dd>
              </div>
            </dl>

            <ActionButtons />
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#ddbc69]/20 bg-[#ddbc69]/[0.045] p-5 sm:p-7 lg:mt-14">
          <h3 className="text-lg font-semibold text-[#ddbc69] sm:text-xl">
            {opportunity.benefitsTitle}
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {opportunity.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex min-h-11 items-start gap-3 rounded-lg border border-white/[0.07] bg-[#101010]/70 px-4 py-3 text-sm leading-6 text-[#f5f1e8]/80"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ddbc69]/15 text-[#ddbc69]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function BulkLandPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Bulk Land", path: "/bulk-land" },
        ])}
      />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <main className="overflow-hidden bg-[#101010] pt-20 text-[#f5f1e8]">
        {landOpportunities.map((opportunity, index) => (
          <LandOpportunity
            key={opportunity.title}
            opportunity={opportunity}
            index={index}
          />
        ))}

        <section
          id="bulk-land-form"
          className="scroll-mt-24 border-b border-white/10 py-[clamp(3.5rem,7vw,6rem)]"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <InlineLeadForm
              variant="bulkLand"
              title="Explore Bulk Land in Dholera SIR"
              buttonText="Get Land Details"
              pageName="Bulk Land"
              theme="dark"
              showSubtitle
            />
            <div className="mt-4 flex justify-center">
              <a
                href="tel:+918130371647"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#ddbc69]/60 px-6 py-3 text-sm font-bold text-[#f5f1e8] transition-colors hover:bg-[#ddbc69]/10 focus:outline-none focus:ring-2 focus:ring-[#ddbc69]"
              >
                <Phone className="h-4 w-4 text-[#ddbc69]" aria-hidden="true" />
                Speak to RM
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-[clamp(3.5rem,7vw,6rem)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <h2 className="text-[clamp(1.75rem,3.3vw,2.6rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-[#f5f1e8]">
                Why Choose BookMyAssets for Bulk Land in Dholera?
              </h2>
              <p className="mt-5 text-base leading-7 text-[#f5f1e8]/70">
                BookMyAssets helps developers, businesses and investors explore selected bulk land opportunities in and around Dholera.
              </p>
              <p className="mt-5 font-semibold text-[#f5f1e8]">
                Our team can assist with:
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {supportItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-[#f5f1e8]/80"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#ddbc69]/30 bg-[#ddbc69]/10 text-sm font-bold text-[#ddbc69]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-[clamp(3.5rem,7vw,6rem)]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#ddbc69]" />
              <h2 className="text-[clamp(1.75rem,3vw,2.4rem)] font-semibold text-[#f5f1e8]">
                FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-white/[0.025] open:border-[#ddbc69]/35 open:bg-[#ddbc69]/[0.035]"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4 text-left text-sm font-semibold leading-6 text-[#f5f1e8] marker:hidden sm:px-6 sm:text-base [&::-webkit-details-marker]:hidden">
                    <span className="text-[#ddbc69]">{index + 1}.</span>
                    <span className="flex-1">{faq.question}</span>
                    <span className="relative h-5 w-5 shrink-0 text-[#ddbc69]">
                      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <div className="border-t border-white/10 px-5 py-5 pl-[3.25rem] text-sm leading-7 text-[#f5f1e8]/70 sm:px-6 sm:pl-[4.25rem] sm:text-base">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
