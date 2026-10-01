import {
  ArrowDown,
  BadgeIndianRupee,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  MapPinned,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa6";

import ChannelPartnerForm from "./channelPartnerForm";
import SchemaMarkup from "../components/SchemaMarkup";
import { faqSchema } from "@/lib/schema";
import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Become a Channel Partner | Dholera Real Estate Partnership",
  },
  description:
    "Partner with BookMyAssets to sell Dholera residential plots. Attractive commissions, marketing support, verified inventory and dedicated RM assistance.",
  alternates: {
    canonical: "https://www.bookmyassets.com/channel-partner",
  },
};

/* =========================================================
   DATA
========================================================= */

const partnerBenefits = [
  {
    title: "Transparent and Timely Payout",
    description:
      "We follow a clear and simple payout process with no hidden charges. Commission terms are explained in advance, and eligible payouts are processed as agreed after the transaction is completed.",
    icon: BadgeIndianRupee,
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-400/10",
    iconBorder: "border-emerald-400/20",
    glow: "bg-emerald-400/10",
  },
  {
    title: "Exclusive Dholera Plot Inventory",
    description:
      "Get access to selected residential plots in Dholera that are planned for future-ready living, villa construction, long-term investment, rental potential and resale opportunities.",
    icon: ClipboardCheck,
    iconColor: "text-sky-300",
    iconBg: "bg-sky-400/10",
    iconBorder: "border-sky-400/20",
    glow: "bg-sky-400/10",
  },
  {
    title: "Project Details and Legal Documents",
    description:
      "Receive complete project information and available legal documents, including NA, NOC, title papers, approved plans, location details and payment information.",
    icon: FileText,
    iconColor: "text-violet-300",
    iconBg: "bg-violet-400/10",
    iconBorder: "border-violet-400/20",
    glow: "bg-violet-400/10",
  },
  {
    title: "Ready-to-Use Marketing Material",
    description:
      "Get professional brochures, images, videos, presentations, location maps and social media creatives to help you present projects clearly to clients.",
    icon: Megaphone,
    iconColor: "text-pink-300",
    iconBg: "bg-pink-400/10",
    iconBorder: "border-pink-400/20",
    glow: "bg-pink-400/10",
  },
  {
    title: "Dedicated Sales Training",
    description:
      "Our expert trainers provide detailed training on Dholera SIR, projects, infrastructure, legal documents and common buyer questions, helping you sell with greater confidence.",
    icon: GraduationCap,
    iconColor: "text-amber-300",
    iconBg: "bg-amber-400/10",
    iconBorder: "border-amber-400/20",
    glow: "bg-amber-400/10",
  },
  {
    title: "Site Visit Assistance",
    description:
      "Our team helps arrange and manage project site visits for Indian and NRI buyers, including scheduling, location guidance and on-site project support.",
    icon: MapPinned,
    iconColor: "text-orange-300",
    iconBg: "bg-orange-400/10",
    iconBorder: "border-orange-400/20",
    glow: "bg-orange-400/10",
  },
  {
    title: "NRI Client Support",
    description:
      "We assist channel partners with online meetings, project presentations, digital documents, virtual walkthroughs and site visit coordination for NRI buyers.",
    icon: Globe2,
    iconColor: "text-cyan-300",
    iconBg: "bg-cyan-400/10",
    iconBorder: "border-cyan-400/20",
    glow: "bg-cyan-400/10",
  },
];

const eligiblePartners = [
  "Real Estate Brokers and Agents",
  "Property Consultants",
  "Wealth and Financial Consultants",
  "NRI and Overseas Consultants",
  "Real Estate Companies",
  "Referral Partners",
  "Women Entrepreneurs",
  "Individuals Interested in Real Estate",
];

const channelPartnerFaqs = [
  {
    question: "What is a Dholera channel partner?",
    answer:
      "A Dholera channel partner is a broker, agent or consultant who introduces buyers to Dholera property projects and earns commission on eligible completed sales.",
  },
  {
    question: "How is channel partner commission paid?",
    answer:
      "The commission rate, eligibility and payment conditions are explained during onboarding. Payment is processed according to the written agreement after an eligible sale is completed.",
  },
  {
    question: "What support does BookMyAssets provide to Channel Partner?",
    answer:
      "BookMyAssets provides project information, marketing material, training, lead-registration support, client meetings, site visits and booking assistance.",
  },
  {
    question: "Can channel partners work with NRI buyers?",
    answer:
      "Yes. Channel partners can introduce NRI buyers and receive support for online presentations, document sharing and site visit coordination.",
  },
];

const partnerProcess = [
  {
    number: "01",
    title: "Apply",
    description:
      "Share your details through the channel partner registration form.",
    icon: Users,
    color: "text-sky-300",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
  },
  {
    number: "02",
    title: "Get Onboarded",
    description:
      "Understand projects, inventory, documentation and commission terms.",
    icon: GraduationCap,
    color: "text-violet-300",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    number: "03",
    title: "Introduce Buyers",
    description:
      "Present suitable opportunities and register your interested clients.",
    icon: Handshake,
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    number: "04",
    title: "Close & Earn",
    description:
      "Receive support through the transaction and earn on eligible sales.",
    icon: BadgeIndianRupee,
    color: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ChannelPartnerPage() {
  return (
    <main className="overflow-hidden bg-[#070707] text-base text-white lg:text-lg">
      <SchemaMarkup schema={faqSchema(channelPartnerFaqs)} />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
        {/* background */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 -z-20
            bg-[radial-gradient(circle_at_78%_34%,rgba(71,111,255,0.11),transparent_24%),radial-gradient(circle_at_68%_55%,rgba(221,188,105,0.12),transparent_30%),radial-gradient(circle_at_90%_72%,rgba(83,215,179,0.08),transparent_22%),linear-gradient(135deg,#070707_0%,#0b0b0d_55%,#11100c_100%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]
            bg-[size:72px_72px]
            opacity-35
            [mask-image:linear-gradient(to_bottom,black,transparent_92%)]
          "
        />

        <div
          className="
            mx-auto flex min-h-[92vh] max-w-7xl
            items-center justify-center
            px-5 pb-14 pt-36

            sm:px-8 sm:pb-20 sm:pt-40

            lg:px-10
            lg:min-h-[82vh]
            lg:pb-16
            lg:pt-32
          "
        >
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <div className="relative isolate mx-auto w-full max-w-[720px] py-3">
              <div
                aria-hidden="true"
                className="
      pointer-events-none absolute left-1/2 top-1/2 -z-10
      h-24 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full
      bg-[#ddbc69]/10 blur-3xl
    "
              />

              <div
                aria-hidden="true"
                className="mx-auto mb-5 flex w-full items-center justify-center gap-3"
              >
                <span className="h-px w-20 bg-gradient-to-l from-[#ddbc69]/60 to-transparent" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#ddbc69]" />
                <span className="h-px w-20 bg-gradient-to-r from-[#ddbc69]/60 to-transparent" />
              </div>

              <h1
                className="
      mx-auto max-w-[720px] text-center
      text-[38px]
      lg:text-[56px]
      font-medium
      leading-[1.08]
      tracking-[-0.055em]
      text-[#ddbc69]
      font-playfair-display
    "
              >
                Grow with BookMyAssets
              </h1>

              <div
                aria-hidden="true"
                className="mx-auto mt-5 flex w-full items-center justify-center gap-3"
              >
                <span className="h-px w-20 bg-gradient-to-l from-[#ddbc69]/50 to-transparent" />
                <span className="h-[3px] w-10 rounded-full bg-[#ddbc69]" />
                <span className="h-px w-20 bg-gradient-to-r from-[#ddbc69]/50 to-transparent" />
              </div>
            </div>

            <p className="mt-7 max-w-xl leading-7 text-white lg:leading-8">
              Partner with BookMyAssets and offer verified residential plots in
              Dholera to your clients.
            </p>

            <p className="mt-4 max-w-2xl font-medium leading-7 text-[#ead79d] lg:leading-8">
              Get Registry Ready Inventory. Grow Your Business. Build Long Term
              Partnerships.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#channel-partner-registration"
                className="
                  group inline-flex min-h-13 items-center justify-center gap-3
                  bg-[#ddbc69]
                  px-6 py-3.5
                  text-sm font-semibold text-black
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#ecd17e]
                  sm:w-fit
                "
              >
                Join the Partner Program
                <ArrowDown
                  size={20}
                  className="transition-transform group-hover:translate-y-1"
                />
              </Link>

              <Link
                href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20Channel%20Partner"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-flex min-h-13 items-center justify-center gap-3
                  border border-white/[0.14]
                  bg-white/[0.025]
                  px-6 py-3.5
                  text-sm font-medium text-white
                  transition-all duration-300
                  hover:border-[#ddbc69]/45
                  hover:bg-white/[0.05]
                  sm:w-fit
                "
              >
                Talk to RM
                <FaWhatsapp
                  size={20}
                  className="
                    text-[#15803d]
                    transition-transform
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>

            {/* trust strip */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 border-t border-white/[0.08] pt-6 text-left lg:max-w-5xl lg:grid-cols-4 lg:gap-10">
              <TrustItem
                icon={ClipboardCheck}
                label="Verified Inventory"
                color="text-sky-300"
                bg="bg-sky-400/10"
              />

              <TrustItem
                icon={GraduationCap}
                label="Sales Training"
                color="text-violet-300"
                bg="bg-violet-400/10"
              />

              <TrustItem
                icon={Handshake}
                label="Client Support"
                color="text-amber-300"
                bg="bg-amber-400/10"
              />

              <TrustItem
                icon={BadgeIndianRupee}
                label="Clear Payouts"
                color="text-emerald-300"
                bg="bg-emerald-400/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="border-b border-white/[0.08] bg-[#090909]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-13 lg:px-10 lg:py-15">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <h2 className="mt-3 text-[30px] font-playfair-display font-medium leading-[1.12] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]">
              What we offer our channel partners
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-12">
            {partnerBenefits.map((benefit, index) => {
              const Icon = benefit.icon;

              const layouts = [
                "lg:col-span-7 lg:row-span-2",
                "lg:col-span-5",
                "lg:col-span-5",
                "lg:col-span-4",
                "lg:col-span-4",
                "lg:col-span-4",
                "lg:col-span-12",
              ];

              return (
                <article
                  key={benefit.title}
                  className={`
                    group relative overflow-hidden
                    bg-[#0c0c0d]
                    p-4
                    transition-all duration-300
                    hover:bg-[#111113]
                    sm:p-5
                    ${layouts[index] || "lg:col-span-4"}
                  `}
                >
                  <div
                    aria-hidden="true"
                    className={`
                      absolute -right-14 -top-14
                      h-40 w-40 rounded-full blur-[60px]
                      opacity-0 transition-opacity duration-500
                      group-hover:opacity-100
                      ${benefit.glow}
                    `}
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`
                          flex h-12 w-12 items-center justify-center
                          rounded-xl border
                          ${benefit.iconBg}
                          ${benefit.iconBorder}
                        `}
                      >
                        <Icon
                          size={26}
                          strokeWidth={1.7}
                          className={benefit.iconColor}
                        />
                      </div>
                    </div>

                    <div className="mt-4 max-w-xl lg:mt-5">
                      <h3
                        className={`font-medium font-playfair-display tracking-[-0.025em] text-white ${
                          index === 0
                            ? "text-2xl lg:text-3xl"
                            : "text-xl lg:text-2xl"
                        }`}
                      >
                        {benefit.title}
                      </h3>

                      <p className="mt-2 leading-7 text-white/75 lg:leading-8">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ELIGIBILITY
      ===================================================== */}

      <section className="relative border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="mt-3 max-w-lg font-playfair-display text-[30px] font-medium leading-[1.05] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]">
                Who can become a channel partner?
              </h2>
            </div>

            <div className="border-t border-white/[0.1]">
              {eligiblePartners.map((partner, index) => {
                const colors = [
                  "bg-sky-400/10 text-sky-300 border-sky-400/20",
                  "bg-violet-400/10 text-violet-300 border-violet-400/20",
                  "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
                  "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
                  "bg-orange-400/10 text-orange-300 border-orange-400/20",
                  "bg-pink-400/10 text-pink-300 border-pink-400/20",
                  "bg-amber-400/10 text-amber-300 border-amber-400/20",
                  "bg-indigo-400/10 text-indigo-300 border-indigo-400/20",
                ];

                return (
                  <div
                    key={partner}
                    className="
                      group flex items-center justify-between gap-5
                      border-b border-white/[0.1]
                      py-4 sm:py-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`
                          flex h-9 w-9 shrink-0 items-center justify-center
                          rounded-xl border
                          ${colors[index]}
                        `}
                      >
                        <CheckCircle2 size={18} />
                      </div>

                      <span className="font-medium text-white transition-colors group-hover:text-[#ddbc69]">
                        {partner}
                      </span>
                    </div>

                    <ChevronRight
                      size={20}
                      className="shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-[#ddbc69]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          REGISTRATION
      ===================================================== */}

      <section
        id="channel-partner-registration"
        className="scroll-mt-24 border-b border-white/[0.08]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div
            className="
              overflow-hidden
              border border-white/[0.1]
              bg-[#0c0c0d]
              shadow-[0_40px_100px_rgba(0,0,0,0.35)]
              lg:grid
              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            {/* LEFT */}
            <div className="relative overflow-hidden border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/[0.09] blur-[100px]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-28 right-[-100px] h-72 w-72 rounded-full bg-sky-500/[0.07] blur-[100px]"
              />

              <div className="relative lg:sticky lg:top-28">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
                  <Users
                    size={26}
                    strokeWidth={1.6}
                    className="text-violet-300"
                  />
                </div>

                <h2 className="mt-3 max-w-md font-playfair-display text-[30px] font-medium leading-[1.1] tracking-[-0.035em] text-[#ddbc69] lg:text-[40px]">
                  Start your partnership with BookMyAssets.
                </h2>

                <div className="mt-8 hidden space-y-4 border-t border-white/[0.08] pt-6 sm:block">
                  <RegistrationPoint
                    icon={ShieldCheck}
                    text="Clear project and commission information"
                    color="text-emerald-300"
                    bg="bg-emerald-400/10"
                  />

                  <RegistrationPoint
                    icon={Sparkles}
                    text="Marketing and sales support"
                    color="text-violet-300"
                    bg="bg-violet-400/10"
                  />

                  <RegistrationPoint
                    icon={Handshake}
                    text="Dedicated partner assistance"
                    color="text-sky-300"
                    bg="bg-sky-400/10"
                  />
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-[#101011] p-4 sm:p-6 lg:p-8 xl:p-10">
              <ChannelPartnerForm />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10">
                <FileText size={24} className="text-sky-300" />
              </div>

              <h2 className="mt-3 text-[30px] font-medium font-playfair-display tracking-[-0.035em] leading-[1.12] text-[#ddbc69] lg:text-[40px]">
                FAQs
              </h2>
            </div>

            <div className="border-t border-white/[0.1]">
              {channelPartnerFaqs.map((faq, index) => {
                const numberColors = [
                  "text-sky-300",
                  "text-violet-300",
                  "text-emerald-300",
                  "text-amber-300",
                ];

                return (
                  <details
                    key={faq.question}
                    className="group border-b border-white/[0.1]"
                  >
                    <summary
                      className="
                        flex cursor-pointer list-none
                        items-center justify-between gap-5
                        py-5
                        marker:content-none
                        sm:py-6
                      "
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-1 text-[15px] font-semibold ${
                            numberColors[index]
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-md font-medium text-white sm:text-lg">
                          {faq.question}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="
                          shrink-0 text-2xl font-light
                          text-[#ddbc69]
                          transition-transform
                          group-open:rotate-45
                        "
                      >
                        +
                      </span>
                    </summary>

                    <div className="pb-6 pl-10 pr-4 sm:pl-11">
                      <p className="max-w-3xl leading-7 text-white lg:leading-8">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function TrustItem({ icon: Icon, label, color, bg }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center
          rounded-lg
          ${bg}
        `}
      >
        <Icon size={18} strokeWidth={1.7} className={color} />
      </div>

      <span className="text-base text-white/80 lg:whitespace-nowrap lg:text-lg">
        {label}
      </span>
    </div>
  );
}

function RegistrationPoint({ icon: Icon, text, color, bg }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl
          ${bg}
        `}
      >
        <Icon size={20} strokeWidth={1.7} className={color} />
      </div>

      <span className="leading-7 text-white/80 lg:leading-8">{text}</span>
    </div>
  );
}
