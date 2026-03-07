"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react";

// Images
import img1 from "@/assests/homepage/hero2/westwyn-estate-dholera-residential-plots-desktop.webp";
import img2 from "@/assests/homepage/hero2/dholera-international-airport-desktop.webp";
import img3 from "@/assests/homepage/hero2/silk-route-park-dholera-desktop.webp";
import img4 from "@/assests/homepage/hero2/expressway_hero.webp";
import img5 from "@/assests/homepage/hero2/river_front_hero.webp";
import img6 from "@/assests/homepage/hero2/tata_gate_hero.webp";

import HeroForm from "./HeroForm";

// Lazy-load the running ticker — not needed for LCP
const Running = dynamic(() => import("./Running"), {
  ssr: false,
  loading: () => <div className="h-12" />,
});

// ── Slide data ────────────────────────────────────────────────────────────────

const SLIDES = [
  { src: img1, alt: "Westwyn Estate Dholera Residential Plots - Premium Investment Opportunity" },
  { src: img2, alt: "Dholera International Airport - Smart City Infrastructure Development" },
  { src: img3, alt: "Silk Route Park Dholera - Modern Urban Development" },
  { src: img4, alt: "Dholera Ahmedabad Expressway" },
  { src: img5, alt: "River Front Dholera" },
  { src: img6, alt: "Tata Semiconductor Plant Dholera" },
];

const AUTOPLAY_INTERVAL = 5000;

// ── FIX 1: useIsMobile hook — replaces CSS hidden/block double-render ─────────
// Previously, both desktop AND mobile image sets were mounted simultaneously.
// CSS `hidden` hides visually but Next.js <Image> still fires all network
// requests for both sets. This hook ensures only ONE set of images ever loads.

function useIsMobile(breakpoint = 1024) {
  // Default to false (desktop) for SSR — avoids hydration mismatch.
  // On the client, the effect immediately corrects the value.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

// ── Nav button (memoised) ─────────────────────────────────────────────────────

const NavButton = memo(({ onClick, direction, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    type="button"
    className={`
      absolute ${direction === "left" ? "left-3" : "right-3"}
      top-1/2 -translate-y-1/2 z-10
      bg-black/50 hover:bg-black/75 text-white
      p-2 rounded-full transition-colors touch-manipulation
    `}
  >
    {direction === "left"
      ? <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      : <ChevronRight className="w-6 h-6" aria-hidden="true" />}
  </button>
));
NavButton.displayName = "NavButton";

// ── Slide indicator dots ──────────────────────────────────────────────────────

const SlideDots = memo(({ total, current, onSelect }) => (
  <div
    className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex gap-2"
    role="tablist"
    aria-label="Slide navigation"
  >
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        role="tab"
        aria-selected={i === current}
        aria-label={`Go to slide ${i + 1} of ${total}`}
        onClick={() => onSelect(i)}
        type="button"
        className={`
          w-2 h-2 rounded-full transition-all duration-300 touch-manipulation
          ${i === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}
        `}
      />
    ))}
  </div>
));
SlideDots.displayName = "SlideDots";

const SlideImage = memo(({ slide, index, currentSlide, isMobile }) => {
  const isActive = index === currentSlide;
  const isNext   = index === (currentSlide + 1) % SLIDES.length;

  const isPrev   = index === (currentSlide - 1 + SLIDES.length) % SLIDES.length;
  const shouldRender = isActive || isNext || isPrev;

  if (!shouldRender) return null;

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
        }}
        aria-hidden={!isActive}
      >
        <div className="h-full flex items-center justify-center px-1 pt-16 pb-4">
          <Image
            src={slide.src}
            alt={slide.alt}
            width={800}
            height={534}
            sizes="(max-width: 768px) 100vw, 1px"
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
            quality={65}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!isActive}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        sizes="(min-width: 1024px) 60vw, (min-width: 768px) 80vw, 100vw"
        className="object-contain pt-8"
        priority={index === 0}
        fetchPriority={index === 0 ? "high" : "low"}
        quality={index === 0 ? 75 : 60}
      />
    </div>
  );
});
SlideImage.displayName = "SlideImage";

// ── Main component ────────────────────────────────────────────────────────────

export default function HeroSlider({ openForm }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const touchStartX                     = useRef(0);
  const intervalRef                     = useRef(null);

  const isMobile = useIsMobile(1024);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);
  }, []);

  useEffect(() => {
    if (!isPaused) startAutoplay();
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, startAutoplay]);

  const goTo = useCallback((index) => {
    setCurrentSlide(index);
    if (!isPaused) startAutoplay();
  }, [isPaused, startAutoplay]);

  const next = useCallback(
    () => goTo((currentSlide + 1) % SLIDES.length),
    [currentSlide, goTo]
  );
  const prev = useCallback(
    () => goTo((currentSlide - 1 + SLIDES.length) % SLIDES.length),
    [currentSlide, goTo]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  }, [next, prev]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft")  prev();
  }, [next, prev]);

  return (
    <div id="hero" className="relative min-h-screen bg-white">
      <div className="h-screen max-sm:h-[80vh] flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row md:min-h-0">
          <section
            className="w-full lg:w-[60%] relative flex-1 max-sm:min-h-[50vh]"
            aria-roledescription="carousel"
            aria-label="Dholera Smart City project highlights"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              onTouchStart={isMobile ? handleTouchStart : undefined}
              onTouchEnd={isMobile   ? handleTouchEnd   : undefined}
              role={isMobile ? "region" : undefined}
              aria-label={isMobile ? "Mobile image carousel" : undefined}
            >
              {SLIDES.map((slide, index) => (
                <SlideImage
                  key={index}
                  slide={slide}
                  index={index}
                  currentSlide={currentSlide}
                  isMobile={isMobile}
                />
              ))}

              <NavButton onClick={prev} direction="left"  ariaLabel="Previous slide" />
              <NavButton onClick={next} direction="right" ariaLabel="Next slide" />

              {!isMobile && (
                <button
                  onClick={() => setIsPaused((p) => !p)}
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                  type="button"
                  className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/75 text-white p-1.5 rounded-full transition-colors"
                >
                  {isPaused
                    ? <Play  className="w-4 h-4" aria-hidden="true" />
                    : <Pause className="w-4 h-4" aria-hidden="true" />}
                </button>
              )}

              <SlideDots
                total={SLIDES.length}
                current={currentSlide}
                onSelect={goTo}
              />

              {!isMobile && (
                <div className="absolute bottom-0 left-0 right-0 z-20">
                  <Running />
                </div>
              )}
            </div>
          </section>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[40%] bg-white flex md:items-center md:justify-center p-4 sm:p-6 lg:p-8">
            <HeroForm />
          </div>

        </div>
      </div>
    </div>
  );
}