"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Maximize2,
  RotateCcw,
  X,
} from "lucide-react";

import hero from "@/assests/gallery/bg-gallery-pc.png";

import abcd from "@/assests/gallery/sir/abcd.webp";
import activationZone from "@/assests/gallery/sir/Activation_zone.webp";
import airportCargo from "@/assests/gallery/sir/Airport_cargo.webp";
import dholeraBoard from "@/assests/gallery/sir/Dholera_board.webp";
import expressway from "@/assests/gallery/sir/expressway.webp";
import expresswayBoard from "@/assests/gallery/sir/expressway_board.webp";
import expresswayNight from "@/assests/gallery/sir/expressway_night_view.webp";
import renew from "@/assests/gallery/sir/Renew.webp";
import riverFront from "@/assests/gallery/sir/River_front.webp";
import runway from "@/assests/gallery/sir/Runway.webp";
import silkRoute from "@/assests/gallery/sir/Silk_route.webp";
import solar from "@/assests/gallery/sir/Solar.webp";
import solarBoard from "@/assests/gallery/sir/Solar_board.webp";
import tata from "@/assests/gallery/sir/TATA.webp";
import tataGate from "@/assests/gallery/sir/tata_gate.webp";
import tataNight from "@/assests/gallery/sir/TATA_night_view.webp";
import tataRenew from "@/assests/gallery/sir/tata_renew.webp";

/* =========================================================
   GALLERY DATA
========================================================= */

const galleryImages = [
  {
    id: 1,
    src: abcd,
    alt: "ABCD Building in Dholera SIR",
    caption: "Administrative hub of Dholera SIR",
    category: "Infrastructure",
  },
  {
    id: 2,
    src: activationZone,
    alt: "Dholera Activation Zone",
    caption: "First development phase of Dholera",
    category: "Infrastructure",
  },
  {
    id: 3,
    src: airportCargo,
    alt: "Dholera Airport Cargo Terminal",
    caption: "Cargo terminal at Dholera International Airport",
    category: "Airport",
  },
  {
    id: 4,
    src: dholeraBoard,
    alt: "Dholera Smart City Entry Board",
    caption: "Official Dholera Smart City signage",
    category: "Infrastructure",
  },
  {
    id: 5,
    src: expressway,
    alt: "Ahmedabad Dholera Expressway",
    caption: "High-speed Ahmedabad-Dholera Expressway",
    category: "Expressway",
  },
  {
    id: 6,
    src: riverFront,
    alt: "Riverfront Development Dholera",
    caption: "Riverfront development in Dholera",
    category: "Infrastructure",
  },
  {
    id: 7,
    src: expresswayNight,
    alt: "Dholera Expressway Night View",
    caption: "Night view of expressway infrastructure",
    category: "Expressway",
  },
  {
    id: 8,
    src: renew,
    alt: "ReNew Power Project Dholera",
    caption: "ReNew Power renewable energy project",
    category: "Renewable",
  },
  {
    id: 9,
    src: expresswayBoard,
    alt: "Dholera Expressway",
    caption: "109 KM Ahmedabad-Dholera Expressway",
    category: "Expressway",
  },
  {
    id: 10,
    src: runway,
    alt: "Dholera Airport Runway",
    caption: "Runway development at Dholera International Airport",
    category: "Airport",
  },
  {
    id: 11,
    src: silkRoute,
    alt: "Silk Route Park in Dholera",
    caption: "Strategic Silk Route industrial corridor",
    category: "Infrastructure",
  },
  {
    id: 12,
    src: solar,
    alt: "Solar Power Plant Dholera",
    caption: "Large-scale solar energy infrastructure",
    category: "Renewable",
  },
  {
    id: 13,
    src: solarBoard,
    alt: "Tata Solar Plant in Dholera",
    caption: "Tata Solar Park project in Dholera",
    category: "Renewable",
  },
  {
    id: 14,
    src: tata,
    alt: "TATA Semiconductor Plant Dholera",
    caption: "TATA semiconductor manufacturing facility",
    category: "Tata",
  },
  {
    id: 15,
    src: tataGate,
    alt: "TATA Semiconductor Hub Dholera",
    caption: "TATA semiconductor facility",
    category: "Tata",
  },
  {
    id: 16,
    src: tataNight,
    alt: "TATA Semiconductor Plant Night View",
    caption: "Night view of TATA semiconductor project",
    category: "Tata",
  },
  {
    id: 17,
    src: tataRenew,
    alt: "TATA & ReNew Power Plant",
    caption: "Renewable energy integration with TATA plant",
    category: "Tata",
  },
];

const categoryColors = {
  Infrastructure: {
    text: "text-violet-300",
    dot: "bg-violet-400",
  },

  Expressway: {
    text: "text-orange-300",
    dot: "bg-orange-400",
  },

  Airport: {
    text: "text-sky-300",
    dot: "bg-sky-400",
  },

  Renewable: {
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  },

  Tata: {
    text: "text-fuchsia-300",
    dot: "bg-fuchsia-400",
  },
};

/* =========================================================
   PAGE WRAPPER
   react-pageflip requires forwardRef pages
========================================================= */

const FlipPage = forwardRef(function FlipPage(
  {
    children,
    hard = false,
    className = "",
  },
  ref
) {
  return (
    <div
      ref={ref}
      data-density={hard ? "hard" : "soft"}
      className={`
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#eee5d5]
        ${className}
      `}
    >
      {children}
    </div>
  );
});

/* =========================================================
   MAIN PAGE
========================================================= */

export default function DholeraProgressPage() {
  const bookRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(
    galleryImages.length + 2
  );

  const [selectedImage, setSelectedImage] =
    useState(null);

  const getBook = () =>
    bookRef.current?.pageFlip?.();

  /* =======================================================
     NEXT
  ======================================================= */

  const goNext = useCallback(() => {
    const book = getBook();

    if (!book) return;

    const current =
      book.getCurrentPageIndex();

    const count =
      book.getPageCount();

    /*
      When user reaches the final page and presses
      next again, animate back to the cover.
    */
    if (current >= count - 1) {
      book.flip(0, "top");
      return;
    }

    book.flipNext("top");
  }, []);

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const goPrevious = useCallback(() => {
    const book = getBook();

    if (!book) return;

    book.flipPrev("top");
  }, []);

  /* =======================================================
     FLIP EVENT
  ======================================================= */

  const handleFlip = useCallback(
    (event) => {
      setCurrentPage(
        Number(event.data)
      );
    },
    []
  );

  const handleInit = useCallback(
    (event) => {
      setCurrentPage(
        Number(event.data.page ?? 0)
      );

      const book = getBook();

      if (book) {
        setPageCount(
          book.getPageCount()
        );
      }
    },
    []
  );

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImage) {
        if (
          event.key === "Escape"
        ) {
          setSelectedImage(null);
        }

        return;
      }

      if (
        event.key === "ArrowRight"
      ) {
        goNext();
      }

      if (
        event.key === "ArrowLeft"
      ) {
        goPrevious();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    goNext,
    goPrevious,
    selectedImage,
  ]);

  const isLastPage =
    currentPage >= pageCount - 1;

  return (
    <main className="min-h-screen overflow-hidden bg-[#090a0e] text-white">

      {/* =====================================================
          TOP INTRO
      ===================================================== */}

      <section
        className={`
          relative
          border-b
          border-white/[0.08]
          px-5
          pb-10
          pt-32

          sm:px-8
          sm:pb-12
          sm:pt-36

          lg:px-10
          lg:pt-40
        `}
      >
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            left-1/2
            top-[-420px]
            h-[800px]
            w-[1100px]
            -translate-x-1/2
            rounded-full
            bg-[#ddbc69]/[0.07]
            blur-[170px]
          `}
        />

        <div className="relative mx-auto max-w-7xl text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-8 bg-[#ddbc69]" />

            <span
              className={`
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#ddbc69]
              `}
            >
              Dholera / Visual Journal
            </span>

            <span className="h-px w-8 bg-[#ddbc69]" />

          </div>

          <h1
            className={`
              mx-auto
              mt-4
              max-w-4xl
              font-playfair-display
              text-[clamp(2.6rem,6vw,5rem)]
              font-medium
              leading-[0.98]
              tracking-[-0.045em]
              text-[#ddbc69]
            `}
          >
            Development

            <span className="block text-[#ddbc69]">
              in every frame.
            </span>
          </h1>

          <p
            className={`
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-white
              sm:text-base
            `}
          >
            Open the journal and explore Dholera&apos;s
            infrastructure, airport, expressway and industrial
            development.
          </p>

        </div>
      </section>

      {/* =====================================================
          FLIPBOOK
      ===================================================== */}

      <section
        className={`
          relative
          overflow-hidden
          py-12

          sm:py-16

          lg:py-20
        `}
      >

        {/* AMBIENT */}

        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[800px]
            w-[1100px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/[0.065]
            blur-[150px]
          `}
        />

        <div
          className={`
            relative
            mx-auto
            max-w-[1450px]
            px-2

            sm:px-6

            lg:px-10
          `}
        >

          {/* ===============================================
              BOOK WRAPPER
          =============================================== */}

          <div
            className={`
              mx-auto
              flex
              min-h-[500px]
              w-full
              items-center
              justify-center

              sm:min-h-[650px]

              lg:min-h-[720px]
            `}
          >

            <HTMLFlipBook
              ref={bookRef}

              /*
                Base page ratio.
                The library scales this because size="stretch".
              */
              width={420}
              height={590}

              size="stretch"

              minWidth={270}
              maxWidth={460}

              minHeight={380}
              maxHeight={650}

              /*
                Critical responsive prop.
                Landscape desktop -> two pages.
                Portrait/mobile -> one page.
              */
              usePortrait={true}

              /*
                First and last page behave like actual
                covers and display as single pages.
              */
              showCover={true}

              drawShadow={true}
              maxShadowOpacity={0.35}

              flippingTime={750}

              /*
                Touch / swipe support.
              */
              mobileScrollSupport={true}
              swipeDistance={25}
              useMouseEvents={true}

              showPageCorners={true}
              disableFlipByClick={false}

              clickEventForward={true}

              autoSize={true}

              startPage={0}

              onFlip={handleFlip}
              onInit={handleInit}

              className="bma-flipbook"
              style={{
                margin: "0 auto",
              }}
            >

              {/* =============================================
                  PAGE 01 — GALLERY BANNER / COVER
              ============================================= */}

              <FlipPage
                hard
                className="bg-[#101014]"
              >
                <GalleryCoverPage
                  onOpen={goNext}
                />
              </FlipPage>

              {/* =============================================
                  INTERIOR PHOTO PAGES
              ============================================= */}

              {galleryImages.map(
                (image, index) => (
                  <FlipPage
                    key={image.id}
                  >
                    <GalleryPhotoPage
                      image={image}
                      pageNumber={
                        index + 2
                      }
                      onImageClick={() =>
                        setSelectedImage(
                          image
                        )
                      }
                    />
                  </FlipPage>
                )
              )}

              {/* =============================================
                  FINAL PAGE
              ============================================= */}

              <FlipPage
                hard
                className="bg-[#151318]"
              >
                <GalleryEndPage
                  onRestart={() => {
                    const book =
                      getBook();

                    book?.flip(
                      0,
                      "top"
                    );
                  }}
                />
              </FlipPage>

            </HTMLFlipBook>

          </div>

          {/* ===============================================
              CONTROLS
          =============================================== */}

          <div
            className={`
              mx-auto
              mt-7
              flex
              max-w-md
              items-center
              justify-center
              gap-5
            `}
          >

            {/* PREVIOUS */}

            <button
              type="button"
              onClick={goPrevious}
              disabled={currentPage === 0}
              aria-label="Previous page"
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full

                border
                border-white/[0.12]

                bg-white/[0.04]

                text-white

                transition-all

                hover:border-[#ddbc69]/40
                hover:text-[#ddbc69]

                disabled:cursor-not-allowed
                disabled:opacity-25
              `}
            >
              <ArrowLeft size={18} />
            </button>

            {/* PAGE COUNT */}

            <div className="min-w-[110px] text-center">

              <span className="text-sm font-medium text-white">
                {String(
                  currentPage + 1
                ).padStart(
                  2,
                  "0"
                )}
              </span>

              <span className="mx-2 text-white/20">
                /
              </span>

              <span className="text-sm text-white/35">
                {String(
                  pageCount
                ).padStart(
                  2,
                  "0"
                )}
              </span>

            </div>

            {/* NEXT / RESTART */}

            <button
              type="button"
              onClick={goNext}
              aria-label={
                isLastPage
                  ? "Restart journal"
                  : "Next page"
              }
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full

                border
                border-[#ddbc69]/30

                bg-[#ddbc69]/10

                text-[#ddbc69]

                transition-all

                hover:bg-[#ddbc69]
                hover:text-black
              `}
            >
              {isLastPage ? (
                <RotateCcw size={18} />
              ) : (
                <ArrowRight size={18} />
              )}
            </button>

          </div>

          <p
            className={`
              mt-4
              text-center
              text-[15px]
              uppercase
              tracking-[0.17em]
              text-white
            `}
          >
            swipe on mobile • drag on desktop • use ← →
          </p>

        </div>
      </section>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() =>
            setSelectedImage(null)
          }
        />
      )}

      {/* =====================================================
          SMALL LIBRARY OVERRIDES
      ===================================================== */}

      <style jsx global>{`
        .bma-flipbook {
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .bma-flipbook .stf__parent {
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .bma-flipbook .stf__block {
          margin-left: auto !important;
          margin-right: auto !important;
        }

        @media (max-width: 767px) {
          .bma-flipbook {
            max-width: 92vw !important;
          }
        }
      `}</style>

    </main>
  );
}

/* =========================================================
   COVER PAGE
========================================================= */

function GalleryCoverPage({
  onOpen,
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        /*
          Because clickEventForward is enabled,
          stop this button from triggering an
          additional flip after calling onOpen.
        */
        event.stopPropagation();

        onOpen();
      }}
      className={`
        group
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#101014]
        text-left
        text-white
      `}
    >

      {/* GALLERY BANNER */}

      <Image
        src={hero}
        alt="Dholera SIR Progress Gallery"
        fill
        priority
        sizes="(max-width: 768px) 90vw, 460px"
        className={`
          object-cover
          transition-transform
          duration-[1200ms]

          group-hover:scale-[1.025]
        `}
      />

      {/* OVERLAY */}

      <div
        className={`
          absolute
          inset-0

          bg-gradient-to-t

          from-black/90
          via-black/35
          to-black/15
        `}
      />

      {/* TOP */}

      <div
        className={`
          absolute
          left-5
          right-5
          top-5

          flex
          items-center
          justify-between
        `}
      >

        <span
          className={`
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#ddbc69]
          `}
        >
          BookMyAssets
        </span>

        <span
          className={`
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/50
          `}
        >
          Gallery / 2026
        </span>

      </div>

      {/* CONTENT */}

      <div
        className={`
          absolute
          inset-x-0
          bottom-0
          p-6

          sm:p-8
        `}
      >

        <p
          className={`
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#ddbc69]
          `}
        >
          Dholera SIR
        </p>

        <h2
          className={`
            mt-3
            max-w-sm
            font-playfair-display
            text-[38px]
            font-medium
            leading-[0.95]
            tracking-[-0.04em]
            text-[#ddbc69]
            sm:text-[52px]
          `}
        >
          Development

          <span className="block text-[#ddbc69]">
            Journal.
          </span>
        </h2>

        <p
          className={`
            mt-4
            max-w-sm
            text-xs
            leading-5
            text-white/70

            sm:text-sm
          `}
        >
          Real development and infrastructure captured
          across Dholera SIR.
        </p>

        <div
          className={`
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/20
            pt-4
          `}
        >

          <span
            className={`
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/50
            `}
          >
            17 Frames
          </span>

          <span
            className={`
              flex
              items-center
              gap-2
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#ddbc69]
            `}
          >
            Open Journal

            <ArrowRight size={13} />
          </span>

        </div>

      </div>

    </button>
  );
}

/* =========================================================
   PHOTO PAGE
========================================================= */

function GalleryPhotoPage({
  image,
  pageNumber,
  onImageClick,
}) {
  const accent =
    categoryColors[
      image.category
    ] ||
    categoryColors.Infrastructure;

  return (
    <div
      className={`
        relative
        flex
        h-full
        flex-col

        bg-[#eee5d5]

        p-4

        text-[#181411]

        sm:p-5
      `}
    >

      {/* PAPER TEXTURE */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none

          absolute
          inset-0

          opacity-[0.15]

          bg-[radial-gradient(circle_at_25%_30%,rgba(89,66,39,0.17)_0.5px,transparent_0.5px)]

          bg-[size:8px_8px]
        `}
      />

      <div className="relative z-10 flex h-full flex-col">

        {/* META */}

        <div
          className={`
            flex
            items-center
            justify-between
            border-b
            border-black/10
            pb-3
          `}
        >

          <div className="flex items-center gap-2">

            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${accent.dot}
              `}
            />

            <span
              className={`
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.18em]
                ${accent.text}
              `}
            >
              {image.category}
            </span>

          </div>

          <span className="text-[8px] text-black/35">
            {String(
              pageNumber
            ).padStart(
              2,
              "0"
            )}
          </span>

        </div>

        {/* TITLE */}

        <h2
          className={`
            mt-5
            font-playfair-display
            text-[23px]
            font-medium
            leading-[1.04]
            tracking-[-0.035em]

            sm:text-[30px]
          `}
        >
          {image.alt}
        </h2>

        {/* IMAGE */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();

            onImageClick();
          }}
          className={`
            group
            relative
            mt-5
            min-h-0
            flex-1
            overflow-hidden

            bg-[#d8cdb9]

            shadow-[0_8px_24px_rgba(64,48,28,0.14)]
          `}
        >

          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 90vw, 460px"
            className={`
              object-cover

              transition-transform
              duration-700

              group-hover:scale-[1.025]
            `}
          />

          <div
            className={`
              absolute
              bottom-3
              right-3

              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-full

              bg-black/60

              text-white

              opacity-0

              backdrop-blur-md

              transition-opacity

              group-hover:opacity-100
            `}
          >
            <Maximize2 size={13} />
          </div>

        </button>

        {/* CAPTION */}

        <div
          className={`
            mt-4
            border-t
            border-black/10
            pt-3
          `}
        >

          <p
            className={`
              text-[10px]
              leading-5
              text-black/55

              sm:text-xs
            `}
          >
            {image.caption}
          </p>

          <div
            className={`
              mt-3
              flex
              items-center
              justify-between
            `}
          >

            <span
              className={`
                text-[7px]
                uppercase
                tracking-[0.18em]
                text-black/30
              `}
            >
              Dholera Development Journal
            </span>

            <span
              className={`
                text-[7px]
                uppercase
                tracking-[0.18em]
                text-[#9b7425]
              `}
            >
              BookMyAssets
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   END PAGE
========================================================= */

function GalleryEndPage({
  onRestart,
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();

        onRestart();
      }}
      className={`
        group
        relative

        flex
        h-full
        w-full

        flex-col

        justify-between

        overflow-hidden

        bg-[#151318]

        p-6

        text-left
        text-white

        sm:p-8
      `}
    >

      <div
        aria-hidden="true"
        className={`
          pointer-events-none

          absolute

          bottom-[-90px]
          right-[-90px]

          h-[260px]
          w-[260px]

          rounded-full

          bg-[#ddbc69]/10

          blur-[80px]
        `}
      />

      <span
        className={`
          relative

          text-[8px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-[#ddbc69]
        `}
      >
        BookMyAssets
      </span>

      <div className="relative">

        <BookOpen
          size={27}
          strokeWidth={1.4}
          className="text-[#ddbc69]"
        />

        <h2
          className={`
            mt-5

            font-playfair-display

            text-[34px]

            font-medium

            leading-[1]

            tracking-[-0.04em]

            sm:text-[44px]
          `}
        >
          End of the

          <span className="block text-[#ddbc69]">
            journal.
          </span>
        </h2>

        <p
          className={`
            mt-4
            max-w-xs
            text-xs
            leading-5
            text-white/55
          `}
        >
          Flip back to the beginning and explore the gallery again.
        </p>

      </div>

      <div
        className={`
          relative

          flex
          items-center
          justify-between

          border-t
          border-white/[0.1]

          pt-4
        `}
      >

        <span
          className={`
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/30
          `}
        >
          End
        </span>

        <span
          className={`
            flex
            items-center
            gap-2

            text-[8px]

            font-semibold

            uppercase

            tracking-[0.18em]

            text-[#ddbc69]
          `}
        >
          <RotateCcw size={12} />

          Start Again
        </span>

      </div>

    </button>
  );
}

/* =========================================================
   LIGHTBOX
========================================================= */

function ImageLightbox({
  image,
  onClose,
}) {
  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, []);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[200]

        flex
        items-center
        justify-center

        bg-black/95

        p-3

        backdrop-blur-xl

        sm:p-6
      `}
      onClick={onClose}
    >

      <div
        className={`
          relative

          flex

          h-full

          max-h-[92vh]

          w-full

          max-w-6xl

          flex-col
        `}
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div
          className={`
            flex
            h-14
            shrink-0
            items-center
            justify-between

            border-b
            border-white/[0.1]
          `}
        >

          <span
            className={`
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#ddbc69]
            `}
          >
            {image.category}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-full

              border
              border-white/[0.12]

              text-white

              transition-all

              hover:border-[#ddbc69]/40
              hover:text-[#ddbc69]
            `}
          >
            <X size={17} />
          </button>

        </div>

        <div className="relative min-h-0 flex-1">

          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />

        </div>

        <div
          className={`
            shrink-0

            border-t
            border-white/[0.1]

            py-4
          `}
        >

          <h3
            className={`
              font-playfair-display
              text-xl
              text-white

              sm:text-2xl
            `}
          >
            {image.alt}
          </h3>

          <p className="mt-1 text-sm text-white/45">
            {image.caption}
          </p>

        </div>

      </div>

    </div>
  );
}