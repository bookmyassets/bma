import {
  BadgeIndianRupee,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  MapPinned,
  Megaphone,
  Users,
} from "lucide-react";
import ChannelPartnerForm from "./channelPartnerForm";
import SchemaMarkup from "../components/SchemaMarkup";
import { faqSchema } from "@/lib/schema";
import Link from "next/link";

export const metadata = {
  title: {
    absolute: "Become a Channel Partner with BookMyAssets",
  },
  description:
    "Join BookMyAssets as a channel partner. Get verified plot inventory, marketing material, training, site visit support and clear commission terms.",
  alternates: {
    canonical: "https://www.bookmyassets.com/channel-partner",
  },
};

const partnerBenefits = [
  {
    title: "Transparent and Timely Payout",
    description:
      "We follow a clear and simple payout process with no hidden charges. Commission terms are explained in advance, and eligible payouts are processed as agreed after the transaction is completed.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Exclusive Dholera Plot Inventory",
    description:
      "Get access to selected residential plots in Dholera that are planned for future-ready living, villa construction, long-term investment, rental potential and resale opportunities.",
    icon: ClipboardCheck,
  },
  {
    title: "Project Details and Legal Documents",
    description:
      "Receive complete project information and available legal documents, including NA, NOC, title papers, approved plans, location details and payment information.",
    icon: FileText,
  },
  {
    title: "Ready-to-Use Marketing Material",
    description:
      "Get professional brochures, images, videos, presentations, location maps and social media creatives to help you present projects clearly to clients.",
    icon: Megaphone,
  },
  {
    title: "Dedicated Sales Training",
    description:
      "Our expert trainers provide detailed training on Dholera SIR, projects, infrastructure, legal documents and common buyer questions, helping you sell with greater confidence.",
    icon: GraduationCap,
  },
  {
    title: "Site Visit Assistance",
    description:
      "Our team helps arrange and manage project site visits for Indian and NRI buyers, including scheduling, location guidance and on-site project support.",
    icon: MapPinned,
  },
  {
    title: "NRI Client Support",
    description:
      "We assist channel partners with online meetings, project presentations, digital documents, virtual walkthroughs and site visit coordination for NRI buyers.",
    icon: Globe2,
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

export default function ChannelPartnerPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <SchemaMarkup schema={faqSchema(channelPartnerFaqs)} />

      <section className="relative isolate overflow-hidden bg-[#0d0d0d] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(221,188,105,0.2),transparent_34%),linear-gradient(135deg,#0d0d0d_0%,#171717_100%)]"
        />
        <div className="mx-auto grid min-h-[72vh] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#ddbc69]">
              BMA Channel Partner Program
            </p>
            <h1 className="text-[clamp(2.5rem,3vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Become a Channel Partner with BookMyAssets
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Partner with BookMyAssets and offer verified residential plots in
              Dholera to your clients.
            </p>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-[#ddbc69] sm:text-2xl">
              Get Registry Ready Inventory. Grow Your Business. Build Long Term
              Partnerships.
            </p>
            <Link
                href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20Channel%20Partner"
                target="_blank"
                rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#ddbc69] px-6 py-3 font-semibold text-[#101010] transition-colors hover:bg-[#ebcb7a] focus:outline-none focus:ring-2 focus:ring-[#ddbc69] focus:ring-offset-2 focus:ring-offset-[#0d0d0d]"
            >
              Join the Partner Program
            </Link>
          </div>

          <div className="rounded-3xl border border-[#ddbc69]/30 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
            <Handshake className="size-12 text-[#ddbc69]" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold">
              A Partnership Built on Clarity
            </h2>
            <ul className="mt-6 space-y-4 text-white/80">
              {[
                "Selected Dholera plot inventory",
                "Clear commission terms",
                "Marketing and sales training",
                "Client meeting and site visit support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[#ddbc69]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7425]">
              Partner Support
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              What We Offer to Our Channel Partner
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partnerBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#ddbc69]/20 text-[#8a651d]">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7425]">
              Eligibility
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Who Can Become a Channel Partner?
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-gray-600">
              The program is open to professionals, organisations and
              individuals interested in introducing buyers to suitable Dholera
              property opportunities.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {eligiblePartners.map((partner) => (
              <li
                key={partner}
                className="flex min-h-16 items-center gap-3 rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 font-medium"
              >
                <CheckCircle2
                  className="size-5 shrink-0 text-[#9b7425]"
                  aria-hidden="true"
                />
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="channel-partner-registration"
        className="scroll-mt-24 bg-[#efeee9] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Users className="size-11 text-[#9b7425]" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Channel Partner Registration Form
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-gray-600">
              Share your details to begin the onboarding process. Our team will
              contact you to explain project access, support and commission
              terms.
            </p>
          </div>
          <ChannelPartnerForm />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b7425]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Channel Partner Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {channelPartnerFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm open:border-[#ddbc69] sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light text-[#9b7425] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 border-t border-black/10 pt-4 leading-relaxed text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
