import Image from "next/image";
import {
  ArrowUpRight,
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
      "Bulk land prices depend on the location, land size, zoning and current availability. Contact the BookMyAssets RM for updated pricing.",
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
    <div className="flex flex-wrap gap-3">
      <a
        href="https://wa.me/918130371647"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#f3d994]/40 bg-gradient-to-br from-[#ecd18a] via-[#ddbc69] to-[#c9a64f] px-5 py-3 text-[16px] font-semibold text-[#17140c] shadow-[0_8px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69] motion-reduce:transform-none motion-reduce:transition-none sm:w-auto lg:text-[18px]"
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
        Get Land Details
        <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
      </a>
    </div>
  );
}

function LandOpportunity({ opportunity, index }) {
  const isReversed = index % 2 === 1;
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <section aria-labelledby={`land-opportunity-${index}`} className="border-b border-white/10 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className={`relative order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 lg:aspect-auto lg:min-h-[440px] lg:self-stretch ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <Image
              src={opportunity.image}
              alt={opportunity.imageAlt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className={`order-1 min-w-0 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
            <div className="mb-4 flex items-center gap-2.5 text-[#ddbc69]">
              <MapPin className="size-4 shrink-0" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs">Dholera SIR · Bulk land</p>
            </div>

            <Heading id={`land-opportunity-${index}`} className="max-w-2xl text-[30px] font-medium leading-[1.15] tracking-[-0.025em] text-[#ddbc69] font-playfair-display lg:text-[40px]">
              {opportunity.title}
            </Heading>

            <p className="mt-4 max-w-xl text-[16px] leading-[1.7] text-white lg:text-[18px]">
              {opportunity.description}
            </p>

            <div className="relative my-6 overflow-hidden rounded-2xl border border-[#ddbc69]/20 bg-[linear-gradient(120deg,#1b1913,#141413_65%)] p-4 lg:p-5">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/40 to-transparent" />
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#ddbc69]">Land at a glance</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="min-w-0 border-r border-[#ddbc69]/15 pr-4">
                  <dt className="mb-1.5 text-[13px] text-[#c3bbaa]">Land use</dt>
                  <dd className="text-[16px] font-medium leading-[1.5] text-[#f5f1e8] lg:text-[18px]">
                    {opportunity.landUse}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="mb-1.5 text-[13px] text-[#c3bbaa]">Starting price</dt>
                  <dd className="text-[16px] font-medium leading-[1.5] text-[#f5f1e8] lg:text-[18px]">
                    Connect with RM
                  </dd>
                </div>
                <div className="col-span-2 border-t border-[#ddbc69]/15 pt-3">
                  <dt className="mb-1 text-[13px] text-[#c3bbaa]">Availability</dt>
                  <dd className="text-[14px] leading-[1.6] text-[#e0dcd2] lg:text-[15px]">
                    Subject to current inventory and final verification
                  </dd>
                </div>
              </dl>
            </div>

            <ActionButtons />
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#ddbc69]/20 bg-[linear-gradient(120deg,#191810,#131312_65%)] px-4 py-5 sm:px-5 lg:mt-8 lg:px-8 lg:py-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/50 to-transparent" />
          <h3 className="border-b border-[#ddbc69]/15 pb-3 text-[22px] font-medium leading-[1.25] tracking-[-0.025em] text-[#ddbc69] lg:pb-5 lg:text-[34px] font-playfair-display">
            {opportunity.benefitsTitle}
          </h3>
          <ul className="mt-2 grid gap-x-4 min-[400px]:grid-cols-2 lg:mt-3 lg:grid-cols-3 lg:gap-x-8">
            {opportunity.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex min-w-0 items-start gap-2 border-b border-white/[0.06] py-2.5 text-[14px] leading-[1.5] text-[#eee9dd] lg:gap-3 lg:py-4 lg:text-[18px] lg:leading-[1.6]"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#ddbc69]/10 text-[#ddbc69] lg:mt-1 lg:size-5">
                  <Check className="size-3 lg:size-3.5" aria-hidden="true" strokeWidth={1.8} />
                </span>
                <span className="min-w-0">{benefit}</span>
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

      <main className="overflow-hidden bg-[#101010] pt-[72px] text-[#f5f1e8] lg:pt-[86px]">
        {landOpportunities.map((opportunity, index) => (
          <LandOpportunity
            key={opportunity.title}
            opportunity={opportunity}
            index={index}
          />
        ))}

        <section
          id="bulk-land-form"
          className="scroll-mt-28 border-b border-white/10 py-12 lg:py-16"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
            <div className="[&>section]:!px-0 [&>section]:!py-0 [&_h2]:!text-[30px] [&_p]:!text-[16px] [&_label]:!text-[16px] [&_input]:!text-[16px] [&_button]:!text-[16px] lg:[&_h2]:!text-[40px] lg:[&_p]:!text-[18px] lg:[&_label]:!text-[18px] lg:[&_input]:!text-[18px] lg:[&_button]:!text-[18px]">
              <InlineLeadForm
                variant="bulkLand"
                title="Explore Bulk Land in Dholera SIR"
                buttonText="Get Land Details"
                pageName="Bulk Land"
                theme="dark"
                showSubtitle
              />
            </div>
            <div className="mt-6 flex justify-center lg:mt-8">
              <a
                href="tel:+918130371647"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#ddbc69]/60 px-6 py-3 text-[16px] font-bold text-[#f5f1e8] lg:text-[18px] transition-colors hover:bg-[#ddbc69]/10 focus:outline-none focus:ring-2 focus:ring-[#ddbc69]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#ddbc69]" aria-hidden="true" />
                Speak to RM
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 py-12 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-10">
            <div>
              <h2 className="text-[30px] font-playfair-display lg:text-[40px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#ddbc69]">
                Why Choose BookMyAssets for Bulk Land in Dholera?
              </h2>
              <p className="mt-5 text-[16px] leading-[1.75] lg:text-[18px] text-[#f5f1e8]">
                BookMyAssets helps developers, businesses and investors explore selected bulk land opportunities in and around Dholera.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {supportItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-[16px] leading-[1.75] text-[#f5f1e8] lg:text-[18px]"
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

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-white" />
              <h2 className="text-[30px] font-playfair-display lg:text-[40px] font-semibold text-[#ddbc69]">
                FAQs
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-white/[0.025] open:border-[#ddbc69]/35 open:bg-[#ddbc69]/[0.035]"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4 text-left text-[16px] font-semibold leading-[1.75] text-[#f5f1e8] marker:hidden sm:px-6 lg:text-[18px] [&::-webkit-details-marker]:hidden">
                    <span className="text-[#ddbc69]">{index + 1}.</span>
                    <span className="flex-1">{faq.question}</span>
                    <span className="relative h-5 w-5 shrink-0 text-[#ddbc69]">
                      <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <div className="border-t border-white/10 px-5 py-5 text-[16px] leading-[1.75] text-[#f5f1e8]/70 sm:px-6 lg:text-[18px]">
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
