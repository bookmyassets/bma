"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Images
import img1 from "@/assests/homepage/hero2/westwyn-estate-dholera-residential-plots-desktop.webp";
import img2 from "@/assests/homepage/hero2/dholera-international-airport-desktop.webp";
import img3 from "@/assests/homepage/hero2/silk-route-park-dholera-desktop.webp";
import img4 from "@/assests/homepage/hero2/expressway_hero.webp";
import img5 from "@/assests/homepage/hero2/river_front_hero.webp";
import img6 from "@/assests/homepage/hero2/tata_gate_hero.webp";

// Lazy-loaded components
const Running = dynamic(() => import("./Running"), {
  ssr: false,
  loading: () => <div className="h-12" />,
});

// Extracted form component (client component)
import HeroForm from "./HeroForm";

// ── Memoized navigation button ────────────────────────────────────────────────

const NavButton = memo(({ onClick, direction, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`absolute ${direction === "left" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors touch-manipulation`}
    type="button"
  >
    {direction === "left" ? (
      <ChevronLeft className="w-6 h-6" />
    ) : (
      <ChevronRight className="w-6 h-6" />
    )}
  </button>
));

NavButton.displayName = "NavButton";

// ── Slide data ────────────────────────────────────────────────────────────────

const desktopImages = [
  { src: img1, alt: "Westwyn Estate Dholera Residential Plots - Premium Investment Opportunity" },
  { src: img2, alt: "Dholera International Airport - Smart City Infrastructure Development" },
  { src: img3, alt: "Silk Route Park Dholera - Modern Urban Development" },
  { src: img4, alt: "Dholera Ahmedabad Expressway" },
  { src: img5, alt: "River Front" },
  { src: img6, alt: "Tata Semicon" },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function HeroSlider({ openForm }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const animationFrameRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const transitionSlide = useCallback((nextSlide) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => setCurrentSlide(nextSlide));
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      transitionSlide((prev) => (prev === desktopImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [transitionSlide, isClient]);

  const handleTouchStart = useCallback((e) => setTouchStart(e.targetTouches[0].clientX), []);
  const handleTouchMove = useCallback((e) => setTouchEnd(e.targetTouches[0].clientX), []);
  const handleTouchEnd = useCallback(() => {
    const swipeThreshold = 50;
    if (touchStart - touchEnd > swipeThreshold) {
      transitionSlide((prev) => (prev === desktopImages.length - 1 ? 0 : prev + 1));
    } else if (touchEnd - touchStart > swipeThreshold) {
      transitionSlide((prev) => (prev === 0 ? desktopImages.length - 1 : prev - 1));
    }
  }, [touchStart, touchEnd, transitionSlide]);

  const nextSlide = useCallback(
    () => transitionSlide((prev) => (prev === desktopImages.length - 1 ? 0 : prev + 1)),
    [transitionSlide],
  );
  const prevSlide = useCallback(
    () => transitionSlide((prev) => (prev === 0 ? desktopImages.length - 1 : prev - 1)),
    [transitionSlide],
  );

  return (
    <>
      <div id="hero" className="relative min-h-screen bg-white">
        <div className="h-screen max-sm:h-[80vh] flex flex-col">
          <div className="flex-1 flex flex-col lg:flex-row md:min-h-0">

            {/* ── Left – Slider ── */}
            <div className="w-full lg:w-[60%] relative flex-1 max-sm:min-h-[50vh]">

              {/* Desktop slider */}
              <div className="absolute inset-0 hidden lg:block">
                <div className="relative w-full h-full overflow-hidden">
                  {desktopImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="100vw"
                        className="md:object-contain md:pt-8"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        quality={60}
                      />
                    </div>
                  ))}

                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 z-20">
                    <Running />
                  </div>
                </div>
              </div>

              {/* Mobile slider */}
              <div
                className="absolute inset-0 block lg:hidden overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="region"
                aria-label="Mobile image carousel"
              >
                {desktopImages.map((image, index) => (
                  <div
                    key={`mobile-${index}`}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      pointerEvents: index === currentSlide ? "auto" : "none",
                    }}
                  >
                    <div className="h-full flex items-center justify-center px-1 pt-16 pb-4">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain rounded-lg shadow-lg"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        sizes="100vw"
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── Right – Form panel ── */}
            <div className="w-full lg:w-[40%] bg-white flex md:items-center md:justify-center p-4 sm:p-6 lg:p-8">
              <HeroForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}