import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import FAQExplorer from "./FAQExplorer";

export const metadata = {
  title: "Dholera SIR FAQs: Plots, Documents & Site Visits | BookMyAssets",
  description:
    "Find clear answers about Dholera SIR, plot documentation, registry, approvals, due diligence, pricing and site visits with BookMyAssets.",
  keywords: [
    "Dholera SIR FAQs",
    "Dholera plot questions",
    "Dholera property documents",
    "Dholera site visit",
    "BookMyAssets FAQs",
  ],
  alternates: {
    canonical: "https://www.bookmyassets.com/faqs",
  },
  openGraph: {
    title: "Dholera SIR FAQs | BookMyAssets",
    description:
      "Practical answers for buyers researching Dholera plots, documents, approvals and site visits.",
    url: "https://www.bookmyassets.com/faqs",
    siteName: "BookMyAssets",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dholera SIR FAQs | BookMyAssets",
    description:
      "Clear answers about Dholera plots, documentation, due diligence and site visits.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const faqGroups = [
  {
    id: "dholera-basics",
    label: "Dholera SIR Basics",
    shortLabel: "Dholera basics",
    description:
      "Understand the region, its planning framework and the infrastructure that shapes its long-term potential.",
    items: [
      {
        question: "What is Dholera SIR?",
        answer:
          "Dholera Special Investment Region (Dholera SIR) is a planned industrial and urban development region in Gujarat. It is part of the Delhi–Mumbai Industrial Corridor and is being developed in phases with dedicated residential, industrial, commercial and public-use zones.",
      },
      {
        question: "Where is Dholera SIR located?",
        answer:
          "Dholera SIR is in Ahmedabad district, Gujarat, to the south-west of Ahmedabad. Its location is planned around future industrial activity and regional links such as the Ahmedabad–Dholera Expressway and Dholera International Airport.",
      },
      {
        question: "Is Dholera Smart City a government-planned project?",
        answer:
          "Yes. Dholera SIR is being developed through a government-led planning framework. However, a plot sold near or around Dholera is not automatically government owned or approved. Buyers should verify the exact survey number, title, land use and permissions for the specific property.",
      },
      {
        question: "What is the Dholera Activation Area?",
        answer:
          "The Activation Area is the initial development zone where trunk infrastructure and city-level services have been prioritised. A property's distance from this area can be useful context, but it should not replace title, zoning, access-road and approval checks.",
      },
      {
        question: "What are Town Planning schemes in Dholera?",
        answer:
          "Town Planning schemes organise land into planned roads, public spaces, utilities and developable plots. If a property is described using a TP scheme or final plot number, confirm the details in the relevant records and approved plans before making a decision.",
      },
    ],
  },
  {
    id: "buying-due-diligence",
    label: "Buying & Due Diligence",
    shortLabel: "Due diligence",
    description:
      "Know what to verify before you pay a token, sign an agreement or schedule registration.",
    items: [
      {
        question: "What should I check before buying a plot in Dholera?",
        answer:
          "Start with the ownership chain, title search, survey details, land-use status, approved layout, access road, encumbrances and the seller's authority to sell. Ask an independent property lawyer to review the documents before paying a non-refundable amount.",
      },
      {
        question: "What does ‘government approved plot’ mean?",
        answer:
          "The phrase can refer to different permissions and is often used too broadly. Ask the seller to identify the exact approval, issuing authority and document number. Government planning of the wider region does not by itself approve every private plotting project.",
      },
      {
        question: "What does registry-ready mean?",
        answer:
          "Registry-ready generally means the seller says the plot can be transferred through a registered sale deed. You should still confirm ownership, registration eligibility, applicable stamp duty, outstanding dues and whether the plot shown on site matches the legal records.",
      },
      {
        question: "Are all plotted projects in Dholera RERA registered?",
        answer:
          "No assumption should be made. RERA applicability depends on the project and applicable rules. Ask for the registration number when RERA is claimed, verify it on the official portal and review the approved project information.",
      },
      {
        question: "Should I use an independent lawyer for verification?",
        answer:
          "Yes. Independent legal review adds an important layer of protection because the lawyer works for you, not the seller. They can review title, permissions, agreements, payment terms and registration documents before you proceed.",
      },
    ],
  },
  {
    id: "plots-documents",
    label: "Plots & Documentation",
    shortLabel: "Documents",
    description:
      "Practical answers about plot sizes, pricing, paperwork and ownership-related costs.",
    items: [
      {
        question: "Which documents should a buyer request?",
        answer:
          "The exact list varies, but commonly requested records include the title chain, latest land record, sale deed or development agreement, approved layout, land-use permission, encumbrance details, tax or dues receipts and the seller's identity and authority documents.",
      },
      {
        question: "Are Dholera plot prices fixed?",
        answer:
          "No. Pricing varies by legal status, location, access, plot size, development level, project amenities and payment terms. Compare the total payable amount and documentsnot only the advertised per-square-yard price.",
      },
      {
        question: "What additional costs apply when buying a plot?",
        answer:
          "Possible costs include stamp duty, registration charges, legal review, maintenance, development charges, taxes and other project-specific fees. Ask for a written cost sheet so you can understand the complete amount before booking.",
      },
      {
        question: "Can NRIs buy plots in Dholera?",
        answer:
          "Eligibility depends on the buyer's status and the land category under Indian law and RBI rules. NRIs should take advice from a qualified legal and tax professional before paying, particularly where agricultural land or special ownership conditions may be involved.",
      },
    ],
  },
  {
    id: "bookmyassets-support",
    label: "Site Visits & Support",
    shortLabel: "Buyer support",
    description:
      "See how BookMyAssets can help you compare options and plan an informed next step.",
    items: [
      {
        question: "How can BookMyAssets help me evaluate Dholera plots?",
        answer:
          "BookMyAssets can help you shortlist suitable options, understand project information, compare key details and coordinate discussions or site visits. Final legal and financial due diligence should still be completed by your independent advisers.",
      },
      {
        question: "Can I schedule a Dholera site visit?",
        answer:
          "Yes. Share your preferred date, city and the type of plot you are considering. The team can confirm availability and help plan a visit so you can review the location, access and project surroundings in person.",
      },
      {
        question: "What should I carry or check during a site visit?",
        answer:
          "Carry the shared layout and plot details. Check the approach road, plot identification, surrounding development, drainage or utilities where visible, nearby landmarks and the distance claims made in marketing material. Take notes and request documents for anything that needs verification.",
      },
      {
        question: "How do I request current prices or a project brochure?",
        answer:
          "Use the contact page or enquiry option and mention your preferred plot size and budget range. Since availability and prices can change, the team should confirm the latest details directly rather than relying on an older brochure or advertisement.",
      },
    ],
  },
];

const allFaqs = faqGroups.flatMap((group) => group.items);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.bookmyassets.com/faqs#webpage",
      url: "https://www.bookmyassets.com/faqs",
      name: "Dholera SIR Frequently Asked Questions",
      description:
        "Answers about Dholera SIR, plot documentation, due diligence, approvals and site visits.",
      breadcrumb: {
        "@id": "https://www.bookmyassets.com/faqs#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.bookmyassets.com/faqs#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.bookmyassets.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQs",
          item: "https://www.bookmyassets.com/faqs",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.bookmyassets.com/faqs#faq",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function FAQsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080a0d] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative border-b border-white/10 px-4 pb-14 pt-36 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8 lg:pt-44">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 78% 15%, rgba(221,188,105,0.16), transparent 26%), radial-gradient(circle at 8% 90%, rgba(58,92,112,0.18), transparent 28%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ddbc69]/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm text-white/50"
          >
            <Link href="/" className="transition-colors hover:text-[#ddbc69]">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">FAQs</span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#ddbc69] sm:text-sm">
                <span className="h-px w-10 bg-[#ddbc69]" />
                Knowledge centre
              </div>
              <h1 className="max-w-4xl text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
                Dholera questions,
                <span className="block text-[#ddbc69]">answered with clarity.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.2rem)] leading-8 text-white/65">
                Straightforward guidance on Dholera SIR, plot documents,
                approvals, due diligence and site visitswritten for buyers who
                prefer facts before decisions.
              </p>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ddbc69] text-black">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-white">A buyer-first resource</p>
                  <p className="mt-1 text-sm leading-6 text-white/55">
                    Useful starting points, without guaranteed-return claims or
                    unnecessary hype.
                  </p>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-3 border-t border-white/10 pt-5">
                <div>
                  <dt className="text-xs text-white/45">Topics</dt>
                  <dd className="mt-1 text-xl font-bold text-white">04</dd>
                </div>
                <div className="border-l border-white/10 pl-5">
                  <dt className="text-xs text-white/45">Answers</dt>
                  <dd className="mt-1 text-xl font-bold text-white">
                    {allFaqs.length}
                  </dd>
                </div>
                <div className="border-l border-white/10 pl-5">
                  <dt className="text-xs text-white/45">Focus</dt>
                  <dd className="mt-1 text-sm font-bold text-[#ddbc69]">Clarity</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <FAQExplorer groups={faqGroups} />

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#ddbc69]/25 bg-[#111419] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div
            className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-[#ddbc69]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#ddbc69]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Need an answer about a specific plot?
              </div>
              <h2 className="text-[clamp(1.8rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.03em]">
                Bring your questions. We’ll help you organise the next checks.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/60">
                Speak with the BookMyAssets team to discuss your preferred plot
                size, documentation questions or a Dholera site visit.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ddbc69] px-6 py-3 font-bold text-black transition-colors hover:bg-[#edcb78] focus:outline-none focus:ring-2 focus:ring-[#ddbc69] focus:ring-offset-2 focus:ring-offset-[#111419]"
              >
                Ask a property question
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about-dholera-sir"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Learn about Dholera SIR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-7xl px-4 pb-12 text-xs leading-5 text-white/35 sm:px-6 lg:px-8">
        General information only. Project details, availability, approvals and
        prices may change. Complete independent legal and financial due diligence
        before purchasing property.
      </p>
    </main>
  );
}
