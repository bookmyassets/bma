"use client";

import { useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

const DOCUMENTS = [
  "NA/NOC Certificate",
  "Title Clear",
  "Encumbrance Certificate",
  "Plan Pass",
  "Immediate Registry Possession",
];

function DocumentCard({ docName }) {
  return (
    <article
      aria-label={`Verified sale deed document: ${docName}`}
      className="relative isolate h-[250px] w-[250px] overflow-hidden bg-transparent"
    >
      <div
        aria-hidden="true"
        className="absolute left-[35px] top-[26px] h-[198px] w-[184px] rotate-[4deg] rounded-[18px] border border-[#ddbc69]/45 bg-[#ddbc69]/25"
      />
      <div
        aria-hidden="true"
        className="absolute left-[27px] top-[20px] h-[204px] w-[190px] rotate-[2deg] rounded-[18px] border border-[#ddbc69]/55 bg-[#f7f3e8]"
      />

      <div className="absolute left-[17px] top-[13px] flex h-[210px] w-[194px] flex-col rounded-[18px] border border-[#ddbc69]/70 bg-[#f7f3e8] px-6 pb-5 pt-6 shadow-[0_15px_34px_rgba(0,0,0,0.24),inset_0_0_22px_rgba(221,188,105,0.18)]">
        <div className="mb-3 flex h-[58px] shrink-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-black text-[#ddbc69]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3 5.5 6v5.3c0 4.2 2.7 7.9 6.5 9.2 3.8-1.3 6.5-5 6.5-9.2V6L12 3Z" />
              <path d="m9.2 11.8 1.8 1.8 3.8-4" />
            </svg>
          </span>

          <h3 className="text-[18px] font-bold leading-[1.05] tracking-[-0.03em] text-black">
            {docName}
          </h3>
        </div>

        <div aria-hidden="true" className="space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-black/15" />
          <span className="block h-1.5 w-[88%] rounded-full bg-black/15" />
          <span className="block h-1.5 w-[94%] rounded-full bg-black/15" />
          <span className="block h-1.5 w-[68%] rounded-full bg-black/15" />
        </div>

        <div className="absolute inset-x-6 bottom-5 rounded-xl border border-[#ddbc69]/50 bg-black px-4 shadow-[0_7px_16px_rgba(0,0,0,0.22)]">
          <Link
            href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20to%20see%20the%20legal%20documents"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2  "
          >
            <FaWhatsapp className="w-6 h-6 text-green-400" />

            <span className="text-sm font-bold tracking-[0.12em] text-[#f7f3e8]">
              VERIFIED
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function WhatsAppCTA() {
  return (
    <Link
      href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20to%20see%20the%20legal%20documents"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(37,211,102,0.35)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
    >
      <FaWhatsapp className="w-6 h-6" />
      WhatsApp for Documents
    </Link>
  );
}

export default function DocumentVault() {
  const sliderRef = useRef(null);

  const scrollDocuments = (direction) => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector("[data-document-card]");

    if (!slider || !firstCard) return;

    slider.scrollBy({
      left: direction * (firstCard.offsetWidth + 16),
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black">

    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#ddbc69] sm:text-3xl">
          Legal Document Vault
        </h2>
        <WhatsAppCTA />
      </div>

      <div className="mb-3 flex items-center justify-between md:hidden">
        <p className="text-sm font-medium text-[#f7f3e8]/70">
          Swipe to view all documents
        </p>

        <div className="flex items-center gap-2" aria-label="Document slider controls">
          <button
            type="button"
            onClick={() => scrollDocuments(-1)}
            aria-label="View previous document"
            aria-controls="document-vault-slider"
            className="grid size-11 place-items-center rounded-full border border-[#ddbc69]/50 bg-black text-[#ddbc69] transition-colors hover:bg-[#ddbc69] hover:text-black active:scale-95"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollDocuments(1)}
            aria-label="View next document"
            aria-controls="document-vault-slider"
            className="grid size-11 place-items-center rounded-full border border-[#ddbc69] bg-[#ddbc69] text-black shadow-[0_6px_16px_rgba(221,188,105,0.22)] transition-colors hover:bg-[#f7f3e8] active:scale-95"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards: full-size swipeable cards on mobile, full row on desktop */}
      <div
        ref={sliderRef}
        id="document-vault-slider"
        className="flex scroll-smooth gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {DOCUMENTS.map((docName) => (
          <div
            key={docName}
            data-document-card
            className="w-[250px] shrink-0 snap-start md:w-auto md:shrink"
          >
            <div className="h-[250px] w-[250px] overflow-hidden">
              <DocumentCard docName={docName} />
            </div>
          </div>
        ))}
      </div>
    </section>
        </div>
  );
}
