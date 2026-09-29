import Image from "next/image";

import {
  ArrowRight,
  Building2,
  Check,
  Globe2,
  Phone,
  Route,
  TrendingUp,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import residentialImage from "@/assests/bulkLand/residential-bulk-land.webp";
import highAccessImage from "@/assests/bulkLand/hac.webp";
import cityCentreImage from "@/assests/bulkLand/city-centre.webp";
import recreationImage from "@/assests/bulkLand/recreation-sports-entertainment-Zone-hero.webp";

import { breadcrumbSchema, faqSchema } from "@/lib/schema";

import InlineLeadForm from "../components/InlineLeadForm";
import SchemaMarkup from "../components/SchemaMarkup";

import { getWestwynSectionSurface } from "../dholera-residential-plots/components/westwyn/WestwynTheme";

/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                              LAND OPPORTUNITIES                            */
/* -------------------------------------------------------------------------- */

const landOpportunities = [
  {
    id: "residential",

    number: "01",

    category: "Residential",

    title: "Residential Bulk Land in Dholera SIR",

    image: residentialImage,

    imageAlt: "Residential bulk land in Dholera SIR",

    benefits: [
      "Large Development Opportunity",
      "Planned Urban Growth",
      "Future Housing Demand",
      "Infrastructure-Led Location",
      "Multiple Residential Formats",
    ],
  },

  {
    id: "high-access",

    number: "02",

    category: "High Access Corridor",

    title: "High Access Corridor Land in Dholera SIR",

    image: highAccessImage,

    imageAlt: "High Access Corridor land in Dholera SIR",

    benefits: [
      "Better Road Access",
      "High Project Visibility",
      "Mixed-Use Development Options",
      "Future Commercial Demand",
      "Planned Urban Infrastructure",
      "Suitable for Residential and Business Projects",
      "Strong Connectivity to Major Development Zones",
    ],
  },

  {
    id: "city-centre",

    number: "03",

    category: "City Centre",

    title: "City Centre Land in Dholera SIR",

    image: cityCentreImage,

    imageAlt: "City Centre land in Dholera SIR",

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
    id: "recreation",

    number: "04",

    category: "Recreation & Sports",

    title: "Recreation, Sports & Entertainment Land in Dholera SIR",

    image: recreationImage,

    imageAlt: "Recreation, Sports and Entertainment land in Dholera SIR",

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

/* -------------------------------------------------------------------------- */
/*                           DHOLERA ADVANTAGES                               */
/* -------------------------------------------------------------------------- */

const advantageItems = [
  {
    icon: Building2,
    title: "Planned Infrastructure",
    description:
      "Integrated infrastructure designed around long-term urban development.",
    iconClass: "text-[#60a5fa] border-[#60a5fa]/20 bg-[#60a5fa]/10",
  },

  {
    icon: Route,
    title: "Strategic Connectivity",
    description:
      "Connected to major transport corridors and emerging economic hubs.",
    iconClass: "text-[#f59e0b] border-[#f59e0b]/20 bg-[#f59e0b]/10",
  },

  {
    icon: Globe2,
    title: "Multiple Land Uses",
    description:
      "Opportunities across residential, commercial and mixed-use development.",
    iconClass: "text-[#34d399] border-[#34d399]/20 bg-[#34d399]/10",
  },

  {
    icon: TrendingUp,
    title: "Long-Term Potential",
    description:
      "Land opportunities within Dholera’s planned smart-city ecosystem.",
    iconClass: "text-[#c084fc] border-[#c084fc]/20 bg-[#c084fc]/10",
  },
];

/* -------------------------------------------------------------------------- */
/*                              ADVISORY ITEMS                                */
/* -------------------------------------------------------------------------- */

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

const mobileSupportItems = [
  {
    number: "01",
    title: "Location",
    text: "Understanding",
  },

  {
    number: "02",
    title: "Documents",
    text: "Review",
  },

  {
    number: "03",
    title: "Land Use",
    text: "Guidance",
  },

  {
    number: "04",
    title: "Parcel & Pricing",
    text: "Details",
  },

  {
    number: "05",
    title: "Site Visit",
    text: "Coordination",
  },

  {
    number: "06",
    title: "Landowner",
    text: "Meetings",
  },

  {
    number: "07",
    title: "Price",
    text: "Discussions",
  },

  {
    number: "08",
    title: "Transaction",
    text: "Coordination",
  },
];

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                     */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                            LAND OPPORTUNITY CARD                           */
/* -------------------------------------------------------------------------- */

function LandOpportunityCard({ opportunity, index }) {
  const visibleBenefits = opportunity.benefits.slice(0, 3);

  return (
    <article
      id={opportunity.id}
      className="
        group
        relative
        flex
        h-full
        min-w-[88vw]
        snap-center
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-white/[0.09]
        bg-[#141414]
        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#ddbc69]/45
        hover:shadow-[0_24px_60px_rgba(0,0,0,0.38)]

        sm:min-w-[400px]

        lg:min-w-0
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[1.55/1]
          w-full
          overflow-hidden
          bg-[#1a1a1a]

          lg:aspect-[1.65/1]
        "
      >
        <Image
          src={opportunity.image}
          alt={opportunity.imageAlt}
          fill
          priority={index === 0}
          sizes="
            (max-width: 639px) 88vw,
            (max-width: 1023px) 400px,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.04]
          "
        />

        {/* Image gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#141414]
            via-transparent
            to-transparent
          "
        />

        {/* Number */}
        <span
          className="
            absolute
            bottom-3
            left-4
            font-serif
            text-[38px]
            font-medium
            leading-none
            tracking-[-0.05em]
            text-[#ddbc69]

            lg:text-[44px]
          "
        >
          {opportunity.number}
        </span>

        {/* Category */}
        <span
          className="
            absolute
            bottom-3.5
            left-[74px]
            max-w-[calc(100%-92px)]
            truncate
            rounded-full
            border
            border-[#ddbc69]/40
            bg-black/70
            px-3
            py-1.5
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.11em]
            text-[#f0d789]
            backdrop-blur-md

            lg:left-[82px]
            lg:text-[12px]
          "
        >
          {opportunity.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        {/* TITLE */}
        <h2
          className="
            font-serif
            text-[22px]
            font-medium
            leading-[1.15]
            tracking-[-0.025em]
            text-[#f5f1e8]

            lg:text-[26px]
          "
        >
          {opportunity.title}
        </h2>

        {/* BENEFITS */}
        <ul
          className="
            mt-5
            space-y-3
            border-t
            border-white/[0.08]
            pt-5
          "
        >
          {visibleBenefits.map((benefit) => (
            <li
              key={benefit}
              className="
    flex
    items-start
    gap-3
    text-[16px]
    leading-[1.45]
    text-[#f5f1e8]/82

    lg:text-[18px]
  "
            >
              <span
                className="
      mt-[1px]
      flex
      h-6
      w-6
      shrink-0
      items-center
      justify-center
      rounded-full
      border
      border-emerald-400/25
      bg-emerald-400/[0.10]
      text-emerald-400
      shadow-[0_0_0_3px_rgba(52,211,153,0.03)]
    "
              >
                <Check
                  className="h-3.5 w-3.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>

              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#bulk-land-form"
          className="
            mt-6
            inline-flex
            min-h-12
            w-full
            items-center
            justify-between
            rounded-xl
            bg-[#ddbc69]
            px-5
            py-3
            text-[15px]
            font-bold
            text-[#101010]
            transition-all
            duration-300

            hover:bg-[#ebcb7a]

            focus:outline-none
            focus:ring-2
            focus:ring-[#ddbc69]
            focus:ring-offset-2
            focus:ring-offset-[#141414]

            lg:text-[16px]
          "
        >
          <span>Explore Opportunity</span>

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300

              group-hover:translate-x-1
            "
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                         OPPORTUNITIES SECTION                               */
/* -------------------------------------------------------------------------- */

function OpportunitiesSection() {
  return (
    <section
      className={`
        relative
        border-b
        border-white/[0.08]
        ${getWestwynSectionSurface("base")}
      `}
    >
      {/* Premium subtle background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[900px]
          -translate-x-1/2
          bg-[radial-gradient(circle,rgba(221,188,105,0.065)_0%,rgba(221,188,105,0)_68%)]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1440px]
          px-4
          py-10

          sm:px-6

          lg:px-8
          lg:py-14
        "
      >
        {/* INTRO */}
        <div
          className="
            mb-7
            flex
            flex-col
            gap-5

            lg:mb-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ddbc69]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-white
                "
              >
                Land Opportunities
              </span>
            </div>

            <h1
              className="
                max-w-3xl
                font-serif
                text-[30px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#ddbc69]

                lg:text-[40px]
              "
            >
              Bulk Land Opportunities{" "}
              <span className="text-[#ddbc69]">in Dholera SIR</span>
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                text-[16px]
                leading-[1.7]
                text-white
                lg:text-[18px]
              "
            >
              Explore strategic land parcels suited for residential, commercial,
              mixed-use and destination-led developments across Dholera SIR.
            </p>
          </div>

          <a
            href="#bulk-land-form"
            className="
              hidden
              shrink-0
              items-center
              gap-3
              text-sm
              font-semibold
              text-[#ddbc69]
              transition-colors

              hover:text-[#f2d98f]

              lg:inline-flex
            "
          >
            Discuss your requirement
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#ddbc69]/35
                bg-[#ddbc69]/[0.06]
              "
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* MOBILE CAROUSEL */}
        <div
          className="
            -mx-4
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            px-4
            pb-4

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:-mx-6
            sm:px-6

            lg:hidden
          "
        >
          {landOpportunities.map((opportunity, index) => (
            <LandOpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              index={index}
            />
          ))}

          <div className="w-px shrink-0" aria-hidden="true" />
        </div>

        <p
          className="
            mt-2
            text-center
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-white
            lg:hidden
          "
        >
          Swipe to explore
        </p>

        {/* DESKTOP GRID */}
        <div
          className="
            hidden
            gap-4

            lg:grid
            lg:grid-cols-4
          "
        >
          {landOpportunities.map((opportunity, index) => (
            <LandOpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           DHOLERA ADVANTAGE                                 */
/* -------------------------------------------------------------------------- */

function DholeraAdvantage() {
  return (
    <section
      className={`
        border-b
        border-white/[0.08]
        ${getWestwynSectionSurface("alt")}
      `}
    >
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-4
          py-10

          sm:px-6

          lg:px-8
          lg:py-14
        "
      >
        {/* MOBILE */}
        <div className="lg:hidden">
          <div className="mb-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ddbc69]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-white
                "
              >
                Why Dholera
              </span>
            </div>

            <h2
              className="
                font-serif
                text-[30px]
                font-medium
                leading-[1.1]
                tracking-[-0.03em]
                text-[#ddbc69]
              "
            >
              The Dholera Advantage
            </h2>

            <p
              className="
                mt-3
                max-w-md
                text-[16px]
                leading-[1.6]
                text-white
              "
            >
              A planned ecosystem built around connectivity, infrastructure and
              long-term development.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {advantageItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    grid
                    grid-cols-[48px_1fr]
                    gap-4
                    py-5
                  "
                >
                  <div
                    className={`
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-xl
    border
    ${item.iconClass}
  `}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      <h3
                        className="
                          text-[18px]
                          font-semibold
                          leading-[1.3]
                          text-[#ddbc69]
                        "
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="
                        mt-2
                        text-[16px]
                        leading-[1.6]
                        text-[#f5f1e8]/58
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP */}
        <div
          className="
            hidden

            lg:grid
            lg:grid-cols-[0.72fr_2.28fr]
            lg:items-center
            lg:gap-8
          "
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#ddbc69]" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#ddbc69]
                "
              >
                Why Dholera
              </span>
            </div>

            <h2
              className="
                max-w-sm
                font-serif
                text-[40px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#f5f1e8]
              "
            >
              The Dholera Advantage
            </h2>
          </div>

          <div className="grid grid-cols-4">
            {advantageItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    px-6

                    ${index !== 0 ? "border-l border-white/[0.09]" : ""}
                  `}
                >
                  <div
                    className={`
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-[14px]
    border
    ${item.iconClass}
  `}
                  >
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className="
                      mt-4
                      text-[18px]
                      font-semibold
                      leading-[1.4]
                      text-[#f5f1e8]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[18px]
                      leading-[1.55]
                      text-[#f5f1e8]/52
                    "
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         WHY CHOOSE BOOKMYASSETS                             */
/* -------------------------------------------------------------------------- */

function WhyChooseSection() {
  return (
    <section
      className={`
        border-b
        border-white/[0.08]
        py-10

        lg:py-14

        ${getWestwynSectionSurface("alt")}
      `}
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4

          sm:px-6

          lg:px-8
        "
      >
        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-16
          "
        >
          {/* COPY */}
          <div>
            <h2
              className="
                max-w-xl
                font-serif
                text-[30px]
                font-medium
                leading-[1.08]
                tracking-[-0.035em]
                text-[#ddbc69]

                lg:text-[40px]
              "
            >
              Why Choose BookMyAssets for Bulk Land?
            </h2>

            <p
              className="
                mt-4
                max-w-lg
                text-[16px]
                leading-[1.7]
                text-[#f5f1e8]/58

                lg:text-[18px]
              "
            >
              BookMyAssets helps developers, businesses and investors explore
              selected bulk land opportunities in and around Dholera.
            </p>

            <p
              className="
                mt-6
                hidden
                text-[13px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#ddbc69]

                lg:block
              "
            >
              How our team supports you
            </p>
          </div>

          {/* MOBILE SERVICE GRID */}
          <div
            className="
              grid
              grid-cols-2
              gap-3

              lg:hidden
            "
          >
            {mobileSupportItems.map((item) => (
              <div
                key={item.number}
                className="
                  group
                  relative
                  min-h-[138px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#101010]
                  p-4
                  transition-all
                "
              >
                <span
                  className="
                    text-[13px]
                    font-semibold
                    tracking-[0.08em]
                    text-[#ddbc69]
                  "
                >
                  {item.number}
                </span>

                <h3
                  className="
                    mt-5
                    text-[17px]
                    font-semibold
                    leading-[1.3]
                    text-[#f5f1e8]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-[15px]
                    leading-[1.45]
                    text-[#f5f1e8]/52
                  "
                >
                  {item.text}
                </p>

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-[#ddbc69]
                    transition-all
                    duration-300
                  "
                />
              </div>
            ))}
          </div>

          {/* DESKTOP ADVISORY LIST */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-x-10">
              {supportItems.map((item, index) => (
                <div
                  key={item}
                  className="
                    flex
                    items-start
                    gap-4
                    border-b
                    border-white/[0.08]
                    py-5
                  "
                >
                  <span
                    className="
                      shrink-0
                      font-serif
                      text-[18px]
                      text-[#ddbc69]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      text-[18px]
                      leading-[1.55]
                      text-[#f5f1e8]/72
                    "
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function BulkLandPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          {
            name: "Home",
            path: "/",
          },

          {
            name: "Bulk Land",
            path: "/bulk-land",
          },
        ])}
      />

      <SchemaMarkup schema={faqSchema(faqs)} />

      <main
        className="
          overflow-hidden
          bg-[#101010]
          pt-20
          text-[#f5f1e8]
        "
      >
        {/* LAND OPPORTUNITIES */}
        <OpportunitiesSection />

        {/* DHOLERA ADVANTAGE */}
        <DholeraAdvantage />

        {/* LEAD FORM */}
        <section
          id="bulk-land-form"
          className={`
            scroll-mt-24
            border-b
            border-white/[0.08]
            py-10

            lg:py-14

            ${getWestwynSectionSurface("base")}
          `}
        >
          <div
            className="
              mx-auto
              max-w-5xl
              px-4

              sm:px-6

              lg:px-8
            "
          >
            <InlineLeadForm
              variant="bulkLand"
              title="Explore Bulk Land in Dholera SIR"
              buttonText="Get Land Details"
              pageName="Bulk Land"
              theme="dark"
            />

            <div
              className="
                mt-5
                flex
                flex-col
                items-center
                justify-center
                gap-3

                sm:flex-row
              "
            >
              <a
                href="tel:+918130371647"
                className="
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#ddbc69]/40
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#f5f1e8]
                  transition-all

                  hover:border-[#ddbc69]/70
                  hover:bg-[#ddbc69]/[0.07]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#ddbc69]

                  sm:w-auto
                "
              >
                <Phone className="h-4 w-4 text-[#ddbc69]" aria-hidden="true" />
                Speak to RM
              </a>

              <a
                href="https://wa.me/918130371647"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#ddbc69]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-[#101010]
                  transition-all

                  hover:bg-[#ebcb7a]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#ddbc69]

                  sm:w-auto
                "
              >
                <FaWhatsapp
                  className="h-5 w-5 text-[#15803d]"
                  aria-hidden="true"
                />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* WHY BOOKMYASSETS */}
        <WhyChooseSection />

        {/* FAQ */}
        <section
          className={`
            py-10

            lg:py-14

            ${getWestwynSectionSurface("base")}
          `}
        >
          <div
            className="
              mx-auto
              max-w-4xl
              px-4

              sm:px-6

              lg:px-8
            "
          >
            <div className="mb-7 text-center">
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-white
                "
              >
                Need to know
              </span>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[30px]
                  font-medium
                  tracking-[-0.035em]
                  text-[#ddbc69]

                  lg:text-[40px]
                "
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.018]
                    transition-colors

                    open:border-[#ddbc69]/30
                    open:bg-[#ddbc69]/[0.035]
                  "
                >
                  <summary
                    className="
                      flex
                      min-h-16
                      cursor-pointer
                      list-none
                      items-center
                      gap-4
                      px-5
                      py-4
                      text-left
                      text-[16px]
                      font-semibold
                      leading-6
                      text-[#f5f1e8]
                      marker:hidden

                      sm:px-6

                      lg:text-[18px]

                      [&::-webkit-details-marker]:hidden
                    "
                  >
                    <span
                      className="
                        font-serif
                        text-base
                        font-medium
                        text-[#ddbc69]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1">{faq.question}</span>

                    <span
                      className="
                        relative
                        h-7
                        w-7
                        shrink-0
                        rounded-full
                        border
                        border-white/10
                        text-[#ddbc69]
                      "
                    >
                      <span
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          h-px
                          w-3
                          -translate-x-1/2
                          bg-current
                        "
                      />

                      <span
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          h-3
                          w-px
                          -translate-y-1/2
                          bg-current
                          transition-transform

                          group-open:rotate-90
                          group-open:opacity-0
                        "
                      />
                    </span>
                  </summary>

                  <div
                    className="
                      border-t
                      border-white/[0.08]
                      px-5
                      py-5
                      text-[16px]
                      leading-[1.7]
                      text-[#f5f1e8]/58

                      sm:px-6
                      sm:pl-[4.6rem]

                      lg:text-[18px]
                    "
                  >
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
