"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dholeraSirGraphic from "@/assests/taboola/section/dholera-sir-landing-page.webp";
import expresswayGraphic from "@/assests/ad-page/taboola-connectivity/expressway.webp";
import airportGraphic from "@/assests/ad-page/taboola-connectivity/airport.webp";
import freightGraphic from "@/assests/ad-page/taboola-connectivity/freight-corridor.webp";
import monorailGraphic from "@/assests/ad-page/taboola-connectivity/monorail.webp";
import seaportGraphic from "@/assests/ad-page/taboola-connectivity/seaport.webp";
import { Globe2, Building2, MapPinned, LandPlot, ChevronLeft, ChevronRight } from "lucide-react";

const comparisons = [
  { name: "Gurgaon", area: 675, icon: Building2, color: "border-cyan-200 bg-cyan-50 text-cyan-600", source: "https://onemapdepts.gmda.gov.in/" },
  { name: "Bangalore", area: 741, icon: Globe2, color: "border-violet-200 bg-violet-50 text-violet-600", source: "https://www.moh.gov.sg/others/resources-and-statistics/population-and-vital-statistics/" },
  { name: "Mumbai", area: 603, icon: Building2, color: "border-rose-200 bg-rose-50 text-rose-600", source: "https://gazetteers.maharashtra.gov.in/cultural.maharashtra.gov.in/english/gazetteer/greater_bombay/general.html" },
  { name: "Ahmedabad (AMC)", area: 464.16, icon: MapPinned, color: "border-amber-200 bg-amber-50 text-amber-600", source: "https://ahmedabadcity.gov.in/Home/AboutTheCorporation" },
];

const connections = [
  { title: "Expressway", image: expresswayGraphic },
  { title: "Airport", image: airportGraphic },
  { title: "Freight Corridor", image: freightGraphic },
  { title: "Monorail", image: monorailGraphic },
  { title: "Seaport", image: seaportGraphic },
];

const AREA_SCALE = 1000;

export default function DholeraScaleConnectivity() {
  const trackRef = useRef(null);
  const comparisonRef = useRef(null);
  const [areaProgress, setAreaProgress] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  useEffect(() => {
    let animationFrame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setAreaProgress(1);
        return;
      }

      let startTime;
      const animate = (timestamp) => {
        startTime ??= timestamp;
        const elapsed = Math.min((timestamp - startTime) / 1400, 1);
        setAreaProgress(1 - (1 - elapsed) ** 3);
        if (elapsed < 1) animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }, { threshold: 0.15 });

    observer.observe(comparisonRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const formatArea = (area) => (area * areaProgress).toLocaleString("en-IN", {
    maximumFractionDigits: Number.isInteger(area) ? 0 : 2,
  });

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      setCanGoBack(track.scrollLeft > 2);
      setCanGoNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
    };
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    update();
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scroll = (direction) => {
    const track = trackRef.current;
    const cardWidth = track.firstElementChild.getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(track).columnGap);
    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section id="dholera-scale" aria-labelledby="dholera-scale-heading" className="scroll-mt-24 bg-[#f8f7f3] px-4 py-6 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 text-center">
          <p className="font-semibold uppercase tracking-[0.15em] text-[#a78337]">The scale of the vision</p>
          <h2 id="dholera-scale-heading" className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-[#202b27] sm:text-[34px]">A city planned at a different scale</h2>
        </header>

        <div className="mx-auto grid items-stretch gap-2 overflow-hidden rounded-3xl border border-[#e6dfd1] bg-white p-3 sm:p-4 lg:max-w-5xl lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-5 lg:p-3">
          <figure className="flex items-center justify-center overflow-hidden rounded-2xl">
            <Image src={dholeraSirGraphic} alt="Dholera SIR regional footprint covering 920 square kilometres" sizes="(max-width: 1024px) 100vw, 340px" className="h-auto w-full max-w-[550px] rounded-2xl object-contain lg:max-w-[340px]" />
          </figure>

          <div ref={comparisonRef} className="flex flex-col justify-center px-1 py-1 sm:px-3">
            <p className="mb-2 text-xs text-[#858b86]">Area comparison · Scale: 0–1,000 km²</p>
            <div className="space-y-4 lg:space-y-2">
              <div className="rounded-xl border border-[#e9d5a2] bg-[#faf3e1] p-3 lg:p-2.5">
              <div className="mb-2 flex items-center justify-between gap-3 font-semibold text-[#8c6a27]"><span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"><LandPlot aria-hidden="true" size={20} strokeWidth={1.6} /></span>Dholera SIR</span><span className="whitespace-nowrap">{formatArea(920)} km²</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-[#eee3c8]"><div className="h-full rounded-full bg-[#ba913b]" style={{ width: `${920 / AREA_SCALE * areaProgress * 100}%` }} /></div>
            </div>
              {comparisons.map(({ icon: Icon, ...city }) => (
                <div key={city.name} className="border-b border-[#f0ece3] pb-3 last:border-0 last:pb-0 lg:pb-2">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <a href={city.source} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-0 items-center gap-2.5 font-medium text-[#36423b] hover:underline">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${city.color}`}><Icon aria-hidden="true" size={20} strokeWidth={1.6} /></span>
                      <span>{city.name}{city.boundary && <span className="mt-0.5 block text-[11px] font-normal text-[#858b86] sm:text-[12px]">{city.boundary}</span>}</span>
                    </a>
                    <span className="whitespace-nowrap font-semibold text-[#36423b]">{formatArea(city.area)} <span className="font-normal text-black">km²</span></span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f1eee6]"><div className="h-full rounded-full bg-[#ddbc69]" style={{ width: `${city.area / AREA_SCALE * areaProgress * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section id="connectivity" aria-labelledby="connectivity-heading" className="mt-7 scroll-mt-24">
          <header className="mb-4 text-center">
            <h2 id="connectivity-heading" className="text-[28px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[34px] lg:text-[38px]">Connectivity</h2>
          </header>
          <div id="connectivity-track" ref={trackRef} tabIndex={0} aria-label="Connectivity graphics; swipe to explore" className="mx-auto flex w-fit max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69] lg:gap-4 lg:py-3">
            {connections.map(({ title, image }) => (
              <article key={title} className="flex h-[165px] w-[124px] shrink-0 snap-start items-center justify-center overflow-hidden rounded-xl bg-white lg:h-[260px] lg:w-[212px] lg:rounded-2xl lg:border lg:border-[#e6dfd1] lg:bg-gradient-to-b lg:from-white lg:to-[#f6f0e1] lg:shadow-[0_4px_12px_rgba(47,38,19,0.05)]">
                <Image src={image} alt={`${title} connectivity`} width={124} height={165} sizes="(min-width: 1024px) 148px, 124px" className="h-[165px] w-[124px] shrink-0 rounded-xl object-contain lg:h-[197px] lg:w-[148px]" />
              </article>
            ))}
          </div>
          {(canGoBack || canGoNext) && (
            <div className="mt-2 flex justify-center gap-3">
              <button type="button" aria-label="Previous connectivity graphic" aria-controls="connectivity-track" disabled={!canGoBack} onClick={() => scroll(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69] text-black disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337]"><ChevronLeft size={20} /></button>
              <button type="button" aria-label="Next connectivity graphic" aria-controls="connectivity-track" disabled={!canGoNext} onClick={() => scroll(1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69] text-black disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337]"><ChevronRight size={20} /></button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
