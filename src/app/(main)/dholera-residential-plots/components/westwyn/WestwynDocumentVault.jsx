"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";

import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

import { FaWhatsapp } from "react-icons/fa6";

function DocumentCard({ document, whatsappHref }) {
  return (
    <article
      className="
        relative
        h-[252px]
        shrink-0
        overflow-visible
        lg:h-[252px]
      "
    >
      {/* Layered document edges */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          translate-x-2
          translate-y-2
          rotate-[2deg]
          rounded-[22px]
          border
          border-[#9B874D]
          bg-[#E8D9B2]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          translate-x-1
          translate-y-1
          rotate-[1deg]
          rounded-[22px]
          border
          border-[#C7B47B]
          bg-[#F0E6C9]
        "
      />

      {/* Main document */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          rounded-[22px]
          border
          border-[#E1C878]
          bg-[#F8F1E3]
          p-5
          shadow-[0_12px_24px_rgba(0,0,0,0.2)]
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-black
              text-[#25D366]
              lg:h-9
              lg:w-9
            "
          >
            <ShieldCheck
              className="h-4 w-4 lg:h-[18px] lg:w-[18px]"
              strokeWidth={1.8}
            />
          </div>

          <h3
            className="
              pt-0.5
              text-[22px]
              font-semibold
              leading-[1.12]
              !text-black
              sm:text-[23px]
              lg:text-[24px]
            "
          >
            {document.name}
          </h3>
        </div>

        {/* Decorative document lines */}
        <div className="mt-5 space-y-2" aria-hidden="true">
          <div className="h-1.5 w-full rounded-full bg-[#D0CEC6]" />
          <div className="h-1.5 w-[88%] rounded-full bg-[#D0CEC6]" />
          <div className="h-1.5 w-[94%] rounded-full bg-[#D0CEC6]" />
          <div className="h-1.5 w-[62%] rounded-full bg-[#D0CEC6]" />
        </div>

        {/* Verify CTA */}
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify ${document.name} on WhatsApp`}
          className="
            mt-auto
            flex
            min-h-11
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-black
            px-3
            py-2
            text-sm
            font-bold
            uppercase
            tracking-[0.12em]
            text-white
            shadow-[0_6px_14px_rgba(0,0,0,0.22)]
            lg:min-h-12
            lg:text-[15px]
          "
        >
          <FaWhatsapp
            className="h-5 w-5 text-[#25D366]"
            aria-hidden="true"
          />

          Verified
        </Link>
      </div>
    </article>
  );
}
export default function WestWynDocumentVault({
  projectName,
  documents = [],
  sectionId = "document-vault",
  heading = "Legal Document Verification",
  swipeText = "Swipe to view all documents",
  surface = "base",
}) {
  const sliderRef = useRef(null);

  const safeDocuments = Array.isArray(documents)
    ? documents.filter(
        (document) => document && typeof document.name === "string",
      )
    : [];

  const whatsappHref = `https://wa.me/918130371647?text=${encodeURIComponent(
    `Hi, I'd like to review the available legal documents for ${projectName}`,
  )}`;

  const scrollDocuments = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * (sliderRef.current.clientWidth * 0.78),

      behavior: "smooth",
    });
  };

  return (
    <section
      id={sectionId}
      className={cn(
        `
      w-full
      px-4
      pb-8
      pt-8
      text-white
      sm:px-6
      sm:pb-10
      sm:pt-10
      lg:px-8
      lg:pb-12
      lg:pt-12
    `,
        getWestwynSectionSurface(surface),
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* ================= HEADER ================= */}

        <div className="mb-6 sm:mb-7 lg:mb-8">
          <h2
            className="
              mt-2

              font-playfair-display

              text-[30px]
              font-semibold

              leading-[1.1]

              tracking-[-0.04em]

              text-[#DDBC69]

              lg:text-[40px]
              lg:leading-[0.98]
            "
          >
            {heading}
          </h2>
        </div>

        {/* ================= MOBILE CONTROLS ================= */}

        <div
          className="
            mb-5

            flex
            items-center
            justify-between
            gap-4

            lg:hidden
          "
        >
          <p className="text-[16px] text-white">{swipeText}</p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollDocuments(-1)}
              aria-label="Previous document"
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                border
                border-[#E4C56F]

                text-[#E4C56F]
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollDocuments(1)}
              aria-label="Next document"
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-[#E4C56F]

                text-black

                shadow-[0_8px_20px_rgba(228,197,111,0.2)]
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ================= DOCUMENTS ================= */}

        <div
          ref={sliderRef}
          aria-label={`${projectName} legal documents`}
          className="
            flex
            snap-x
            snap-mandatory

            gap-8

            overflow-x-auto

            pb-3

            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            lg:grid
            lg:grid-cols-5
            lg:gap-12
            lg:overflow-visible
            lg:pb-0
          "
        >
          {safeDocuments.map((document, index) => (
            <div
              key={document.id || `${document.name}-${index}`}
              className="
                  w-[68vw]
                  max-w-[280px]

                  snap-start

                  lg:w-auto
                  lg:max-w-none
                "
            >
              <DocumentCard document={document} whatsappHref={whatsappHref} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
