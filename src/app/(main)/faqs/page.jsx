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
    "id": "general",
    "label": "General",
    "shortLabel": "General",
    "description": "Learn about BookMyAssets, its Dholera projects and the support available before and after purchase.",
    "items": [
      {
        "question": "What is BookMyAssets?",
        "answer": "BookMyAssets (BMA) is a real estate developer specializing in Dholera Smart City. We offer NA-approved, registry-ready residential plots, along with in-house villa construction through BookMyAssets Construction."
      },
      {
        "question": "Where is BookMyAssets located?",
        "answer": "BookMyAssets' office is located in JMD Megapolis, Sector 48, Gurugram, Haryana. The company primarily operates and develops projects in Dholera, Gujarat."
      },
      {
        "question": "Is BookMyAssets a developer or a channel partner?",
        "answer": "BookMyAssets develops its own residential projects while also offering complete property solutions through its group companies and allied services."
      },
      {
        "question": "Which projects are developed by BookMyAssets?",
        "answer": "BookMyAssets has Developed 3 residential projects WestWyn County, WestWyn Estates, and WestWyn Residency in Dholera."
      },
      {
        "question": "How can I contact BookMyAssets?",
        "answer": "You can call +91 81 30 37 1647, email info@bookmyassets.com, or fill out the enquiry form on bookmyassets.com to request a callback or price sheet."
      },
      {
        "question": "Does BookMyAssets offer site visits?",
        "answer": "Yes. BookMyAssets arranges guided, planned site visits for investors to view plot locations, layouts, and ongoing development work after paying the token amount."
      },
      {
        "question": "What makes BookMyAssets different from other Dholera developers?",
        "answer": "BookMyAssets offers an end-to-end journey plot selection, NA/NOC plan pass approved plots, immediate registry, in-house villa construction, and resale/rental support all under one team, rather than requiring investors to coordinate multiple vendors."
      },
      {
        "question": "Does BookMyAssets provide resale assistance?",
        "answer": "Yes. BookMyAssets offers resale support to help buyers when they decide to sell their property."
      },
      {
        "question": "Does BookMyAssets offer buyback assistance?",
        "answer": "Yes. Buyback assistance is available as per the applicable terms and conditions."
      },
      {
        "question": "Will I receive support after buying the plot?",
        "answer": "Yes. BookMyAssets continues to assist with documentation, construction planning, resale guidance, and other post-purchase services."
      },
      {
        "question": "What is NOC clearance, and why does it matter?",
        "answer": "A No Objection Certificate (NOC) confirms that a plot has cleared the required regulatory checks (such as land use, environment, or utility clearances) before sale or construction, adding legal safety for the buyer."
      },
      {
        "question": "Does BookMyAssets provide an immediate registry after purchase?",
        "answer": "Yes, BookMyAssets offers immediate sale deeds and registry-ready documentation for its projects."
      },
      {
        "question": "Does BookMyAssets have a dedicated due diligence team?",
        "answer": "Yes, BookMyAssets maintains a dedicated due diligence team to verify project documentation, titles, and approvals before sale."
      }
    ]
  },
  {
    "id": "dholera-investment",
    "label": "Dholera SIR & Investment",
    "shortLabel": "Dholera SIR",
    "description": "Understand Dholera SIR, its major infrastructure and the checks buyers should complete before investing.",
    "items": [
      {
        "question": "What is Dholera SIR?",
        "answer": "Dholera Special Investment Region (SIR) is India's first greenfield smart city, developed under the Delhi-Mumbai Industrial Corridor (DMIC). It is being built from scratch with planned infrastructure across residential, commercial, and industrial zones."
      },
      {
        "question": "Why is Dholera considered a good investment?",
        "answer": "Dholera's growth is backed by major infrastructure, including the Ahmedabad-Dholera Expressway, Dholera International Airport, and industrial investments such as the Tata Semiconductor plant. These developments may support long-term demand and future potential, subject to location, approvals, market demand, and holding period."
      },
      {
        "question": "Is the Ahmedabad-Dholera Expressway complete?",
        "answer": "Yes, the Ahmedabad-Dholera Expressway is complete and operational, inaugurated by PM Modi on 31 March 2026."
      },
      {
        "question": "What is the current status of Dholera International Airport?",
        "answer": "The First Phase is Completed and the runway of Dholera International Airport is also successfully Tested."
      },
      {
        "question": "What is the Tata Semiconductor plant's significance for Dholera?",
        "answer": "Tata's semiconductor fabrication plant in Dholera is expected to roll out its first chip in late 2026, with full completion by 2028. It is a key driver of industrial and housing demand in the region."
      },
      {
        "question": "What is NA (Non-Agricultural) land, and why does it matter?",
        "answer": "NA conversion is the legal process of converting agricultural land into land approved for residential or commercial use. NA-approved plots reduce legal risk and are essential before construction or registry."
      },
      {
        "question": "What should I check before buying a plot in Dholera?",
        "answer": "Buyers should evaluate project location, documentation status (NA/NOC/title), layout planning, road access, pricing structure, and the registry process before booking."
      },
      {
        "question": "Is Dholera better for long-term or short-term investment?",
        "answer": "Most investors treat Dholera as a long-term land-holding opportunity rather than a short-term investment,"
      },
      {
        "question": "What is DSIRDA?",
        "answer": "DSIRDA (Dholera Special Investment Region Development Authority) is the government body responsible for planning, approvals, and development oversight of Dholera SIR."
      }
    ]
  },
  {
    "id": "projects",
    "label": "Projects",
    "shortLabel": "Projects",
    "description": "Compare locations, plot sizes, prices, amenities and development details across BookMyAssets projects.",
    "items": [
      {
        "question": "What is WestWyn County?",
        "answer": "WestWyn County is a premium residential plotted development by BookMyAssets in Dholera Smart City. The project is located on the Fedra-Pipli State Highway and offers legally verified residential plots with modern infrastructure and lifestyle amenities."
      },
      {
        "question": "Where is WestWyn County located?",
        "answer": "WestWyn County is located on the Fedra–Pipli State Highway in Dholera, offering direct highway connectivity."
      },
      {
        "question": "Who is the developer of WestWyn County?",
        "answer": "WestWyn County is developed by BookMyAssets, a real estate developer focused on residential communities and investment opportunities in Dholera Smart City."
      },
      {
        "question": "What are the plot sizes in WestWyn County?",
        "answer": "The plot size available in WestWyn County is 150 square yards."
      },
      {
        "question": "What is the price of the WestWyn County project?",
        "answer": "WestWyn County is a successfully sold-out project. The resale price is ₹12000 Price per sq. yard."
      },
      {
        "question": "What amenities are available in WestWyn County?",
        "answer": "The project offers a clubhouse, co-working space, swimming pool, gym, jogging track, yoga deck, children's play area, senior citizen zone, CCTV security, EV charging station, landscaped green areas, internal roads, and app-based society management."
      },
      {
        "question": "What makes WestWyn County a good investment?",
        "answer": "WestWyn County offers a strategic location, legally verified plots, modern infrastructure, premium amenities, and long-term growth potential in Dholera. Future performance depends on development, approvals, demand, and holding period."
      },
      {
        "question": "What is WestWyn Estates?",
        "answer": "WestWyn Estate is a premium residential plot developed by BookMyAssets located in Polarpur, Dholera. The project offers legally verified residential plots with immediate possession, modern amenities, and excellent connectivity to major infrastructure projects."
      },
      {
        "question": "Where is WestWyn Estates located?",
        "answer": "WestWyn Estate is located in Polarpur, Dholera, Gujarat, with direct entry from State Highway 117 (150-foot road). The project enjoys excellent connectivity to the Dholera SIR boundary, Bhimnath Railway Junction, Ahmedabad Dholera Expressway, and Dholera International Airport."
      },
      {
        "question": "What plot sizes are available in WestWyn Estates?",
        "answer": "WestWyn Estate offers residential plots ranging from approximately 147 to 250 square yards."
      },
      {
        "question": "What is the price of plots in WestWyn Estates?",
        "answer": "The plot price is ₹7000/sq. yard in WestWyn Estates"
      },
      {
        "question": "What amenities will WestWyn Estates offer?",
        "answer": "The project includes a gated community, project boundary, CCTV security, kids' play area, app-based management, power and water supply, yoga deck, jogging track, senior citizen zone, EV charging station, wide internal roads, and drainage system."
      },
      {
        "question": "What site development work is underway at WestWyn Estates?",
        "answer": "Ongoing work includes land cleaning and leveling, boundary development, soil testing, internal road development, a 1.75 lakh litre water tank (providing 1,000 litres free water per resident), drainage systems, MEP work, plot demarcation, and landscaping."
      },
      {
        "question": "Can I buy a plot and build a villa at WestWyn Estates through BookMyAssets?",
        "answer": "Yes. Since WestWyn Estates plots are sold by BookMyAssets and construction is handled by BookMyAssets Construction, investors can complete the entire plot-to-villa journey with one team."
      },
      {
        "question": "What is WestWyn Residency?",
        "answer": "WestWyn Residency is a government-approved residential plotted development by BookMyAssets located in Pipariya, Dholera. The project offers legally verified residential plots with immediate possession, modern amenities, and excellent connectivity to major infrastructure projects."
      },
      {
        "question": "Where is WestWyn Residency located?",
        "answer": "WestWyn Residency is located in Pipariya, Dholera, with direct entry from the Major District Road (MDR). The project is close to the Dholera SIR boundary, Bhimnath Railway Junction, Ahmedabad Dholera Expressway, and Dholera International Airport."
      },
      {
        "question": "What amenities are planned at WestWyn Residency?",
        "answer": "Planned features include a gated community with 24/7 security and CCTV, wide internal roads, a proper drainage system, planned power and water supply, a kids' play area, senior citizen zone, jogging track, yoga deck, EV charging station, and app-based community management."
      },
      {
        "question": "Why should I invest in WestWyn Residency?",
        "answer": "WestWyn Residency offers a strategic location, legally verified plots, modern amenities, immediate registry, and connectivity to Dholera's major infrastructure projects. Its long-term potential depends on development, approvals, demand, and holding period."
      }
    ]
  },
  {
    "id": "nri-corner",
    "label": "NRI Corner",
    "shortLabel": "NRI Corner",
    "description": "Answers for overseas buyers managing plot purchases, villa construction, taxation and resale support.",
    "items": [
      {
        "question": "Can NRIs buy residential plots in Dholera through BookMyAssets?",
        "answer": "Yes. NRIs can purchase residential plots in Dholera, without any limit on the number of properties, under FEMA and RBI guidelines."
      },
      {
        "question": "Can NRIs manage plot purchase and villa construction remotely?",
        "answer": "Yes. BookMyAssets is built to support NRI investors with remote coordination, dedicated relationship managers, and one point of contact for both plot purchase and villa construction."
      },
      {
        "question": "Is income from a resold or rented Dholera plot taxable for NRIs?",
        "answer": "Yes. While purchasing property isn't taxed, any income from rent or capital gains on resale is taxable in India. NRIs should consult a tax advisor for their specific liability, including any applicable Double Taxation Avoidance Agreement (DTAA) benefits."
      },
      {
        "question": "Does BookMyAssets assist with resale for NRI investors?",
        "answer": "Yes, BookMyAssets offers resale and buyback assistance to help NRI and overseas investors exit or liquidate their investment when needed."
      }
    ]
  },
  {
    "id": "channel-partner",
    "label": "Channel Partner",
    "shortLabel": "Channel Partner",
    "description": "Learn who can join the Channel Partner Program and what sales, legal and marketing support is available.",
    "items": [
      {
        "question": "Can I become a channel partner with BookMyAssets?",
        "answer": "Yes. BookMyAssets runs a Channel Partner Program for brokers and professionals who want to sell verified Dholera plots with guaranteed, on-time commissions."
      },
      {
        "question": "What support do channel partners get?",
        "answer": "Partners receive ready-to-use brochures, videos, and pitch decks, verified inventory, legal assistance, site visit support, regular sales training, and market updates."
      },
      {
        "question": "Who can join the Channel Partner Program?",
        "answer": "The program suits independent brokers, real estate professionals, international buyer connectors, and businesses looking to expand into Dholera plot sales."
      },
      {
        "question": "Are commissions guaranteed and paid on time?",
        "answer": "Yes, BookMyAssets states it follows a broker-first culture with transparent processes and guaranteed, on-time commission payments."
      }
    ]
  }
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
                  <dd className="mt-1 text-xl font-bold text-white">05</dd>
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
