"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";

// Images
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

const galleryItems = [
  { id: 1, src: abcd, alt: "ABCD Building in Dholera SIR" },
  { id: 2, src: activationZone, alt: "Activation Zone Dholera SIR" },
  { id: 3, src: airportCargo, alt: "Dholera Airport Cargo Terminal" },
  { id: 4, src: dholeraBoard, alt: "Dholera Smart City Entry Board" },
  { id: 5, src: expressway, alt: "Ahmedabad Dholera Expressway" },
  { id: 6, src: expresswayBoard, alt: "Expressway Direction Board" },
  { id: 7, src: expresswayNight, alt: "Dholera Expressway Night View" },
  { id: 8, src: renew, alt: "ReNew Power Project Dholera" },
  { id: 9, src: riverFront, alt: "Riverfront Development Dholera" },
  { id: 10, src: runway, alt: "Dholera Airport Runway" },
  { id: 11, src: silkRoute, alt: "Silk Route Connectivity Dholera" },
  { id: 12, src: solar, alt: "Solar Power Plant Dholera" },
  { id: 13, src: solarBoard, alt: "Solar Project Information Board" },
  { id: 14, src: tata, alt: "TATA Semiconductor Plant Dholera" },
  { id: 15, src: tataGate, alt: "TATA Semiconductor Main Gate" },
  { id: 16, src: tataNight, alt: "TATA Plant Night View" },
  { id: 17, src: tataRenew, alt: "TATA & ReNew Power Collaboration" },
];

const formatNumber = (value) => String(value).padStart(2, "0");

const navigationClass = `
  inline-flex h-12 w-12 shrink-0 items-center justify-center
  rounded-full border border-[#B59A5B]/60
  bg-white/70 text-[#30271F]
  transition-colors hover:border-[#A88A45] hover:bg-[#EDE5D5]
  disabled:cursor-not-allowed disabled:opacity-30
  focus-visible:outline-none focus-visible:ring-2
  focus-visible:ring-[#A88A45] focus-visible:ring-offset-2
`;

function GalleryLightbox({ initialIndex, onClose }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(initialIndex);
  const item = galleryItems[index];

  const navigate = useCallback((direction) => {
    setIndex(
      (current) =>
        (current + direction + galleryItems.length) % galleryItems.length
    );
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1);
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby="gallery-lightbox-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={handleKeyDown}
      className="
        fixed inset-0 m-0 h-[100dvh] max-h-none
        w-screen max-w-none overflow-y-auto
        border-0 bg-[#F8F5EE] p-0 text-[#30271F]
        backdrop:bg-[#30271F]/60
      "
    >
      <div className="flex min-h-full flex-col">
        {/* Full-screen header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#B59A5B]/20 px-4 py-3 sm:px-8 sm:py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#94783E]">
              Dholera Gallery
            </p>

            <p className="mt-1 text-xs tabular-nums text-[#756B60]">
              {formatNumber(index + 1)} / {formatNumber(galleryItems.length)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className={navigationClass}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Uncropped image */}
        <div className="flex flex-1 items-center justify-center px-4 py-5 sm:px-8">
          <div className="relative h-[55dvh] w-full max-w-6xl sm:h-[65dvh]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Caption and controls */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-8 sm:pb-8">
          <div className="border-t border-[#B59A5B]/25 pt-5">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94783E]">
              Dholera
            </p>

            <h3
              id="gallery-lightbox-title"
              className="
                mt-2 text-center font-playfair-display
                text-xl font-medium leading-snug
                tracking-[-0.025em] sm:text-3xl
              "
            >
              {item.alt}
            </h3>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Previous photo"
                className={navigationClass}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <span
                aria-live="polite"
                aria-atomic="true"
                className="min-w-16 text-center text-xs tabular-nums text-[#756B60]"
              >
                {formatNumber(index + 1)} / {formatNumber(galleryItems.length)}
              </span>

              <button
                type="button"
                onClick={() => navigate(1)}
                aria-label="Next photo"
                className={navigationClass}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
}

export default function Gallery() {
  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const openerRef = useRef(null);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const updateSliderState = useCallback(() => {
    const slider = sliderRef.current;
    const firstCard = cardRefs.current[0];

    if (!slider || !firstCard) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const scrollLeft = Math.max(0, slider.scrollLeft);
    const firstOffset = firstCard.offsetLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const distance = Math.abs(
        card.offsetLeft - firstOffset - scrollLeft
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
    setScrollProgress(
      maxScroll > 0 ? Math.min(1, scrollLeft / maxScroll) : 1
    );
    setCanGoBack(scrollLeft > 2);
    setCanGoForward(maxScroll - scrollLeft > 2);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const resizeObserver = new ResizeObserver(updateSliderState);

    resizeObserver.observe(slider);
    cardRefs.current.forEach((card) => {
      if (card) resizeObserver.observe(card);
    });

    updateSliderState();

    return () => resizeObserver.disconnect();
  }, [updateSliderState]);

  const moveSlider = (direction) => {
    const slider = sliderRef.current;
    const firstCard = cardRefs.current[0];
    const secondCard = cardRefs.current[1];

    if (!slider || !firstCard || !secondCard) return;

    const step = secondCard.offsetLeft - firstCard.offsetLeft;
    const position = slider.scrollLeft / step;

    // Move to the next snap position even after a partial swipe.
    const nextPosition =
      direction > 0
        ? Math.floor(position + 0.01) + 1
        : Math.ceil(position - 0.01) - 1;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, nextPosition * step));

    slider.scrollTo({
      left: target,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const openLightbox = (index, event) => {
    openerRef.current = event.currentTarget;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);

    requestAnimationFrame(() => {
      openerRef.current?.focus({ preventScroll: true });
    });
  };

  // This progress bar represents the horizontal scroll position.
  const progressWidth = 12 + scrollProgress * 88;

  return (
    <section
      id="Gallery"
      aria-labelledby="dholera-gallery-heading"
      className="
        relative isolate overflow-hidden
        bg-[#F8F5EE] py-8 sm:py-10 lg:py-12
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent
          via-[#B59A5B]/25 to-transparent
        "
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <header className="mb-6 text-left sm:mb-8 sm:text-center lg:mb-9">
          <div className="mb-3 flex items-center gap-3 sm:justify-center sm:gap-5">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#B59A5B]/80 sm:w-14"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#94783E] sm:text-[11px] sm:tracking-[0.3em]">
              On-ground progress
            </p>

            <span
              aria-hidden="true"
              className="hidden h-px w-14 bg-[#B59A5B]/80 sm:block"
            />
          </div>

          <h2
            id="dholera-gallery-heading"
            className="
              font-playfair-display text-[30px] font-medium
              leading-[1.15] tracking-[-0.04em]
              text-black sm:text-[34px] lg:text-[40px]
            "
          >
            Dholera Gallery
          </h2>

        </header>

        {/* Equal cards with a partial next card */}
        <div
          ref={sliderRef}
          id="dholera-gallery-carousel"
          role="region"
          aria-label="Dholera photo carousel"
          onScroll={updateSliderState}
          className="
            relative flex snap-x snap-mandatory
            gap-4 overflow-x-auto overscroll-x-contain
            pb-3 [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-4 lg:gap-5
          "
        >
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              type="button"
              onClick={(event) => openLightbox(index, event)}
              aria-label={`Open full-screen photo: ${item.alt}`}
              aria-haspopup="dialog"
              className="
                group flex w-[86%] shrink-0 snap-start
                flex-col overflow-hidden rounded-[18px]
                border border-[#B59A5B]/30 bg-white text-left
                shadow-[0_5px_18px_rgba(45,35,22,0.04)]
                transition-colors hover:border-[#A88A45]/70
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-inset focus-visible:ring-[#A88A45]
                sm:w-[46%] lg:w-[31%]
              "
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE7DB]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="
                    (max-width: 639px) 86vw,
                    (max-width: 1023px) 46vw,
                    (max-width: 1280px) 31vw,
                    380px
                  "
                  className="
                    object-cover
                    motion-safe:transition-transform
                    motion-safe:duration-700
                    motion-safe:group-hover:scale-[1.035]
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute right-3 top-3 flex h-9 w-9
                    items-center justify-center rounded-full
                    border border-white/60 bg-[#30271F]/25
                    text-white backdrop-blur-sm
                    transition-colors group-hover:bg-[#30271F]/50
                    sm:right-4 sm:top-4
                  "
                >
                  <Expand className="h-4 w-4" strokeWidth={1.7} />
                </span>
              </div>

              <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                <span className="text-[16px] font-semibold leading-[1.4] text-black lg:text-[18px]">
                  Dholera
                </span>

                <h3
                  className="
                    mt-1 min-h-[2.8em] font-playfair-display
                    text-[16px] font-medium leading-[1.45]
                    tracking-[-0.01em] text-black
                    lg:text-[18px]
                  "
                >
                  {item.alt}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom-only navigation */}
        <div className="mt-2 flex items-center gap-3 sm:mt-3 sm:gap-5">
          <span
            aria-label={`First visible photo ${activeIndex + 1} of ${galleryItems.length}`}
            className="shrink-0 text-xs tabular-nums text-[#665D53] sm:text-sm"
          >
            {formatNumber(activeIndex + 1)}
            <span className="mx-1.5 text-[#A99D8D]">/</span>
            {formatNumber(galleryItems.length)}
          </span>

          <div
            aria-hidden="true"
            className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#E5DED1]"
          >
            <div
              className="h-full rounded-full bg-[#B59A5B]"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => moveSlider(-1)}
              disabled={!canGoBack}
              aria-label="Previous gallery card"
              aria-controls="dholera-gallery-carousel"
              className={navigationClass}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => moveSlider(1)}
              disabled={!canGoForward}
              aria-label="Next gallery card"
              aria-controls="dholera-gallery-carousel"
              className={navigationClass}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}
