"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const DOCUMENTS = [
  {
    name: "NA/NOC Certificate",
    description:
      "Government-approved documentation confirming the required NOC and project approvals.",
  },
  {
    name: "Title Clear",
    description: "Clear ownership documentation with verified title records.",
  },
  {
    name: "Encumbrance Certificate",
    description:
      "Documentation confirming that the property has no registered encumbrances.",
  },
  {
    name: "Plan Pass",
    description: "Approved project planning and layout documentation.",
  },
  {
    name: "Immediate Registry Possession",
    description: "Documentation supporting immediate registry and possession.",
  },
];

function DocumentCard({ document, whatsappHref }) {
  return (
    <article className="relative h-[252px] shrink-0 overflow-visible lg:h-[252px]">
      {/* Layered document edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 rotate-[2deg] rounded-[22px] border border-[#9B874D] bg-[#E8D9B2]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-1 translate-y-1 rotate-[1deg] rounded-[22px] border border-[#C7B47B] bg-[#F0E6C9]"
      />

      <div className="relative z-10 flex h-full flex-col rounded-[22px] border border-[#E1C878] bg-[#F8F1E3] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[#25D366]">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
          </div>

          <h3 className="document-vault-card-title pt-1 text-xl font-semibold leading-[1.15] text-black">
            {document.name}
          </h3>
        </div>

        <div className="mt-6 space-y-2" aria-hidden="true">
          <div className="h-1.5 w-full rounded-full bg-[#D0CEC6]" />
          <div className="h-1.5 w-[88%] rounded-full bg-[#D0CEC6]" />
          <div className="h-1.5 w-[94%] rounded-full bg-[#D0CEC6]" />
          <div className="h-1.5 w-[62%] rounded-full bg-[#D0CEC6]" />
        </div>

        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify ${document.name} on WhatsApp`}
          className="mt-auto flex min-h-14 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-base font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_16px_rgba(0,0,0,0.24)] transition-colors hover:bg-[#151515]"
        >
          <FaWhatsapp className="h-6 w-6 text-[#25D366]" aria-hidden="true" />
          Verified
        </Link>
      </div>
    </article>
  );
}

export default function DocumentVault({
  projectName = "WestWyn Residency",
  documents = DOCUMENTS,
  sectionId = "document-vault",
}) {
  const sliderRef = useRef(null);

  const whatsappHref = `https://wa.me/918130371647?text=${encodeURIComponent(
    `Hi, I'd like to review the available legal documents for ${projectName}`,
  )}`;

  const scrollDocuments = (direction) => {
    sliderRef.current?.scrollBy({
      left: direction * (sliderRef.current.clientWidth * 0.78),
      behavior: "smooth",
    });
  };

  return (
    <>
      <style jsx global>{`
        .westwyn-residency-dark .document-vault-heading {
          color: #ddbc69 !important;
        }

        .westwyn-residency-dark h3.document-vault-card-title {
          color: #000 !important;
        }

        .document-vault-slider {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .document-vault-slider::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <section
        id={sectionId}
        className="w-full bg-black px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8 lg:py-12"
      >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-6 sm:mb-7 lg:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
            {projectName}
          </p>
          <h2 className="document-vault-heading mt-2 font-serif text-[2rem] font-medium leading-[1.1] tracking-[-0.025em] text-[#ddbc69] sm:text-[2.35rem] lg:text-[2.75rem]">
            Legal Document Vault
          </h2>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4 lg:hidden">
          <p className="text-base text-white sm:text-lg">
            Swipe to view all documents
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollDocuments(-1)}
              aria-label="Previous document"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E4C56F] text-[#E4C56F] transition-colors hover:bg-[#E4C56F] hover:text-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollDocuments(1)}
              aria-label="Next document"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E4C56F] text-black shadow-[0_8px_20px_rgba(228,197,111,0.2)] transition-colors hover:bg-[#F0D47F]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="document-vault-slider flex snap-x snap-mandatory gap-8 overflow-x-auto pb-3 scrollbar-hide lg:grid lg:grid-cols-5 lg:gap-12 lg:overflow-visible lg:pb-0"
          aria-label="Legal documents"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {documents.map((document) => (
            <div
              key={document.name}
              className="w-[68vw] max-w-[280px] snap-start lg:w-auto lg:max-w-none"
            >
              <DocumentCard
                document={document}
                whatsappHref={whatsappHref}
              />
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}
