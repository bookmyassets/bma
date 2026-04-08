"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronRight, ChevronLeft } from "lucide-react";

import img1 from "@/assests/homepage/hero2/westwyn-estate-dholera-residential-plots-desktop.webp";
import img2 from "@/assests/homepage/hero2/dholera-international-airport-desktop.webp";
import img3 from "@/assests/homepage/hero2/silk-route-park-dholera-desktop.webp";
import img4 from "@/assests/homepage/hero2/expressway_hero.webp";
import img5 from "@/assests/homepage/hero2/river_front_hero.webp";
import img6 from "@/assests/homepage/hero2/tata_gate_hero.webp";
import img7 from "@/assests/homepage/hero2/abcd-building-dholera-sir-bookmyassets.webp";

import HeroForm from "./HeroForm";

const Running = dynamic(() => import("./Running"), {
  ssr: false,
  loading: () => <div className="h-12" />,
});

const SLIDES = [
  { src: img7, alt: "ABCD Building Dholera" },
  {
    src: img1,
    alt: "Westwyn Estate Dholera Residential Plots - Premium Investment Opportunity",
  },
  {
    src: img2,
    alt: "Dholera International Airport - Smart City Infrastructure Development",
  },
  { src: img3, alt: "Silk Route Park Dholera - Modern Urban Development" },
  { src: img4, alt: "Dholera Ahmedabad Expressway" },
  { src: img5, alt: "River Front Dholera" },
  { src: img6, alt: "Tata Semiconductor Plant Dholera" },
];

const AUTOPLAY_INTERVAL = 5000;

const NavButton = memo(({ onClick, direction, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    type="button"
    className={`
      absolute flex justify-center items-center
      ${direction === "left" ? "left-[calc(0.5rem+0.5vw)]" : "right-[calc(0.5rem+0.5vw)]"}
      top-1/2 z-10
      bg-black/50 hover:bg-black/75 text-white
      p-2 rounded-full transition-colors touch-manipulation
    `}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-6 h-6" aria-hidden="true" />
    ) : (
      <ChevronRight className="w-6 h-6" aria-hidden="true" />
    )}
  </button>
));
NavButton.displayName = "NavButton";

const SlideDots = memo(({ total, current, onSelect }) => (
  <div
    className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex gap-2"
    role="group"
    aria-label="Slide navigation"
  >
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        aria-label={`Go to slide ${i + 1} of ${total}`}
        aria-current={i === current ? "true" : undefined}
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

// ─── KEY CHANGE: No JS-based isMobile. One component, CSS handles layout. ───
const SlideImage = memo(({ slide, index, currentSlide }) => {
  const isActive = index === currentSlide;
  const isNext = index === (currentSlide + 1) % SLIDES.length;
  const isPrev = index === (currentSlide - 1 + SLIDES.length) % SLIDES.length;

  // On MOBILE: only render active slide (saves 2 image downloads per transition)
  // On DESKTOP: render prev+active+next for smooth crossfade
  // We use a CSS trick — the slide is always in DOM on desktop via opacity,
  // but on mobile we truly unmount non-active slides.
  //
  // Since we can't use JS isMobile without hydration mismatch,
  // we render both and hide with CSS:
  //   - Mobile wrapper: hidden on lg+, only shows active
  //   - Desktop wrapper: hidden below lg, shows prev/active/next

  return (
    <>
      {/* MOBILE: only active slide rendered */}
      <div
        className={`absolute inset-0 lg:hidden transition-opacity duration-700 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isActive}
        inert={!isActive}
      >
        {isActive && (
          <div className="h-full flex items-center justify-center px-1 pt-16 pb-4">
            <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "low"}
                quality={65}
              />
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP: prev+active+next pre-rendered */}
      {(isActive || isNext || isPrev) && (
        <div
          className={`absolute inset-0 hidden lg:block transition-opacity duration-1000 ease-in-out ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!isActive}
         inert={!isActive}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="60vw"
            className="object-contain pt-8"
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
            quality={index === 0 ? 75 : 60}
          />
        </div>
      )}
    </>
  );
});
SlideImage.displayName = "SlideImage";

export default function HeroSlider({ openForm }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const intervalRef = useRef(null);

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

  const goTo = useCallback(
    (index) => {
      setCurrentSlide(index);
      if (!isPaused) startAutoplay();
    },
    [isPaused, startAutoplay],
  );

  const next = useCallback(
    () => goTo((currentSlide + 1) % SLIDES.length),
    [currentSlide, goTo],
  );
  const prev = useCallback(
    () => goTo((currentSlide - 1 + SLIDES.length) % SLIDES.length),
    [currentSlide, goTo],
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    },
    [next, prev],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    },
    [next, prev],
  );

  return (
    <div
      id="hero"
      className="relative min-h-[87dvh] bg-white md:overflow-hidden"
    >
      <div className="h-[100dvh] max-sm:h-[80dvh] flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row md:min-h-0">
          <section
            className="w-full lg:w-[60%] relative flex-1 min-h-[clamp(40dvh,50dvh,60dvh)]"
            aria-roledescription="carousel"
            aria-label="Dholera Smart City project highlights"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {SLIDES.map((slide, index) => (
                <SlideImage
                  key={index}
                  slide={slide}
                  index={index}
                  currentSlide={currentSlide}
                />
              ))}

              <NavButton
                onClick={prev}
                direction="left"
                ariaLabel="Previous slide"
              />
              <NavButton
                onClick={next}
                direction="right"
                ariaLabel="Next slide"
              />
              <SlideDots
                total={SLIDES.length}
                current={currentSlide}
                onSelect={goTo}
              />

              {/* Running ticker — desktop only via CSS */}
              <div className="absolute bottom-0 left-0 right-0 z-20 hidden lg:block">
                <Running />
              </div>
            </div>
          </section>

          <div className="w-full lg:w-[40%] bg-white flex md:items-center md:justify-center p-[calc(1rem+1vw)]">
            <HeroForm />
          </div>
        </div>
      </div>
    </div>
  );
}
