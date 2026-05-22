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
  { title: "AUDA Certificate", icon: BadgeCheck },
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
    <section className="bg-black px-4 py-[clamp(1rem,2vw,1.75rem)]">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#050505] p-[clamp(0.875rem,2vw,1.5rem)] text-white shadow-2xl ring-1 ring-[#deae3c]/20">
        <div className="flex flex-col gap-[clamp(1.25rem,2.5vw,2rem)]">
          <div className="border-t border-white/10 pt-[clamp(1.25rem,2.5vw,2rem)]">
            <div className="mb-5 flex items-center gap-2 text-[#deae3c]">
              <Landmark className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-semibold uppercase tracking-[0.12em]">
                Easy 6 Step Buying Process
              </h2>
            </div>

            <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
              {buyingSteps.map((step, index) => (
                <li
                  key={step}
                  className="relative flex min-h-[5rem] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 xl:flex-col xl:items-start"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#deae3c]/40 bg-[#deae3c]/10 text-[1rem] font-bold text-[#deae3c]">
                    {index + 1}
                  </span>
                  <span className="text-[clamp(0.95rem,1.15vw,1.05rem)] font-semibold leading-[1.35] text-white/90">
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
            <div className="mt-5 flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={onDocumentChecklistClick}
                className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-md bg-[#deae3c] px-5 text-[0.95rem] font-semibold text-black transition-colors hover:bg-[#f0c65a] focus:outline-none focus:ring-2 focus:ring-[#deae3c] focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
              >
                Get Document Checklist
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentChecklistProcess;
