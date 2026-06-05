"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImg1 from "@/assests/dholera-sir-blogs/dholera-silk-route-park-desktop.webp";
import heroImg2 from "@/assests/dholera-sir-blogs/renew-solar-plant-in-dholera-desktop.webp";
import heroImg3 from "@/assests/dholera-sir-blogs/tata-solar-park-in-dholera-desktop.webp";
import heroImgMob1 from "@/assests/dholera-sir-blogs/dholera-silk-route-park-mobile.webp";
import heroImgMob2 from "@/assests/dholera-sir-blogs/renew-solar-plant-in-dholera-mobile.webp";
import heroImgMob3 from "@/assests/dholera-sir-blogs/tata-solar-park-in-dholera-mobile.webp";

const heroSlides = [
  {
    desktop: heroImg1,
    mobile: heroImgMob1,
    alt: "Dholera Silk Route Park",
  },
  {
    desktop: heroImg2,
    mobile: heroImgMob2,
    alt: "ReNew solar plant in Dholera",
  },
  {
    desktop: heroImg3,
    mobile: heroImgMob3,
    alt: "Tata solar park in Dholera",
  },
];

export default function BlogHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === heroSlides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="relative aspect-square md:aspect-[3/1] overflow-hidden shadow-lg">
      <Image
        key={`${activeSlide.alt}-desktop`}
        src={activeSlide.desktop}
        alt={activeSlide.alt}
        fill
        className="hidden md:block object-contain"
        quality={85}
        sizes="100vw"
      />
      <Image
        key={`${activeSlide.alt}-mobile`}
        src={activeSlide.mobile}
        alt={activeSlide.alt}
        fill
        className="md:hidden object-cover"
        quality={85}
        sizes="100vw"
      />

      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-[clamp(0.75rem,2vw,1.5rem)] top-1/2 z-10 flex h-[clamp(2.25rem,5vw,3rem)] w-[clamp(2.25rem,5vw,3rem)] -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[#ddbc69]"
        aria-label="Previous hero image"
      >
        <ChevronLeft className="h-[clamp(1.25rem,3vw,1.75rem)] w-[clamp(1.25rem,3vw,1.75rem)]" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-[clamp(0.75rem,2vw,1.5rem)] top-1/2 z-10 flex h-[clamp(2.25rem,5vw,3rem)] w-[clamp(2.25rem,5vw,3rem)] -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[#ddbc69]"
        aria-label="Next hero image"
      >
        <ChevronRight className="h-[clamp(1.25rem,3vw,1.75rem)] w-[clamp(1.25rem,3vw,1.75rem)]" />
      </button>
    </div>
  );
}
