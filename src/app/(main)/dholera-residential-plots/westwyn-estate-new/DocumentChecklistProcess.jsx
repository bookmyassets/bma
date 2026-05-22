import React from "react";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Landmark,
  MapPinned,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

const documents = [
  { title: "Sale Deed", icon: ScrollText },
  { title: "Title Certificate", icon: ShieldCheck },
  { title: "7/12 Extract", icon: FileText },
  { title: "NA / NOC", icon: FileCheck2 },
  { title: "RERA Certificate", icon: BadgeCheck },
  { title: "Site Plan Approval", icon: MapPinned },
];

const buyingSteps = [
  "Select Your Plot",
  "Book Your Plot",
  "Complete Documentation",
  "Make Payment",
  "Registration & Mutation",
  "Take Possession",
];

const DocumentChecklistProcess = ({ onDocumentChecklistClick }) => {
  return (
    <section className="bg-black px-4 py-[clamp(2rem,4vw,3.5rem)]">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#050505] p-[clamp(1rem,2.5vw,2rem)] text-white shadow-2xl ring-1 ring-[#deae3c]/20">
        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[#deae3c]">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.18em]">
                Document Checklist
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(6,minmax(0,1fr))]">
              {documents.map(({ title, icon: Icon }) => (
                <div
                  key={title}
                  className="group min-h-[6.5rem] rounded-xl border border-[#deae3c]/20 bg-white/[0.035] p-4 transition-colors hover:border-[#deae3c]/45 hover:bg-[#deae3c]/10"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#deae3c]/30 bg-black text-[#deae3c]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-[0.9rem] font-semibold leading-[1.35] text-white/90">
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={onDocumentChecklistClick}
                className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-md bg-[#deae3c] px-5 text-[0.9rem] font-semibold text-black transition-colors hover:bg-[#f0c65a] focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
              >
                Get Document Checklist
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="border-t border-white/10 pt-[clamp(1.25rem,2.5vw,2rem)]">
            <div className="mb-5 flex items-center gap-2 text-[#deae3c]">
              <Landmark className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.18em]">
                Easy 6 Step Buying Process
              </h2>
            </div>

            <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
              {buyingSteps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex min-h-[5.5rem] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 xl:flex-col xl:items-start"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#deae3c]/40 bg-[#deae3c]/10 text-[0.85rem] font-bold text-[#deae3c]">
                    {index + 1}
                  </span>
                  <span className="text-[0.9rem] font-semibold leading-[1.35] text-white/90">
                    {step}
                  </span>
                  {index < buyingSteps.length - 1 && (
                    <ArrowRight
                      className="absolute right-[-0.85rem] top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-[#deae3c] xl:block"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentChecklistProcess;
