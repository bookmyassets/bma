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
  { title: "NA / NOC", icon: FileCheck2 },
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
    <section className="bg-black px-4 py-[clamp(1.75rem,3vw,3rem)]">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#050505] p-[clamp(0.875rem,2vw,1.5rem)] text-white shadow-2xl ring-1 ring-[#ddbc69]/20">
        <div className="flex flex-col gap-[clamp(1.25rem,2.5vw,2rem)]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[#ddbc69]">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              <h2 className="text-[clamp(0.95rem,1.2vw,1.05rem)] font-semibold uppercase tracking-[0.12em]">
                Document Checklist
              </h2>
            </div>

            <div className="grid gap-3 grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
              {documents.map(({ title, icon: Icon }) => (
                <div
                  key={title}
                  className="group min-h-[5.75rem] rounded-xl border border-[#ddbc69]/20 bg-white/[0.035] p-3 transition-colors hover:border-[#ddbc69]/45 hover:bg-[#ddbc69]/10"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[#ddbc69]/30 bg-black text-[#ddbc69]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="flex items-start gap-2 text-[clamp(0.95rem,1.2vw,1.05rem)] font-semibold leading-[1.35] text-white/90">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                      aria-hidden="true"
                    />
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-center lg:justify-end">
              <button
                type="button"
                onClick={onDocumentChecklistClick}
                className="inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-md bg-[#ddbc69] px-5 text-[0.95rem] font-semibold text-black transition-colors hover:bg-[#f0c65a] focus:outline-none focus:ring-2 focus:ring-[#ddbc69] focus:ring-offset-2 focus:ring-offset-black sm:w-auto"
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

