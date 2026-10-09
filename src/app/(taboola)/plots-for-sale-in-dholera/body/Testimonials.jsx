"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Pause, Play } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "The process was simple and transparent. The team explained the project, documents and plot details clearly. I was comfortable making my investment decision.",
    name: "Rajiv Sharma",
    location: "Delhi",
    avatar: "/assets/testimonials/portrait-1.webp",
  },
  {
    quote:
      "Project ki location mujhe kaafi achhi lagi. Site visit ke baad mujhe plot aur location ko better samajhne ka confidence mila.",
    name: "Amit Kumar",
    location: "Gurgaon",
    avatar: "/assets/testimonials/portrait-2.webp",
  },
  {
    quote:
      "Dholera ke baare mein kaafi suna tha, lekin investment se pehle clarity chahiye thi. Team ne pricing, documents aur project details properly explain ki.",
    name: "Sanjay Mathur",
    location: "Noida",
    avatar: "/assets/testimonials/portrait-3.webp",
  },
  {
    quote: "Main India mein regularly nahi aa pata, isliye remote investment mere liye important tha. BookMyAssets team ne process ko kaafi easy bana diya.",
    name: "NRI Investor",
    location: "UAE",
    avatar: "/assets/testimonials/portrait-4.webp",
  },
  {
    quote: "Mera focus long-term investment par tha. BookMyAssets ke saath mujhe plot, documentation aur future construction options ke baare mein clear information mili.",
    name: "Vikas Rowdy",
    location: "Delhi NCR",
    avatar: "/assets/testimonials/portrait-5.webp",
  },
];

export default function TestimonialPagination() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const interactionRef = useRef({ hovered: false, focused: false, pointerDown: false });
  const resumeAfterRef = useRef(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const positionsRef = useRef([0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      const cards = Array.from(track.children);
      if (!cards.length) return;
      const firstOffset = cards[0].offsetLeft;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const positions = cards.reduce((stops, card) => {
        const position = Math.min(card.offsetLeft - firstOffset, maxScroll);
        if (!stops.length || position - stops[stops.length - 1] > 1) stops.push(position);
        return stops;
      }, []);
      positionsRef.current = positions;
      setPageCount(positions.length);
      setCanGoBack(track.scrollLeft > 2);
      setCanGoNext(track.scrollLeft < maxScroll - 2);
      const nearest = positions.reduce((best, position, index) =>
        Math.abs(position - track.scrollLeft) < Math.abs(positions[best] - track.scrollLeft) ? index : best, 0);
      setActiveIndex(nearest);
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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      const interaction = interactionRef.current;
      const track = trackRef.current;
      const section = sectionRef.current;
      const positions = positionsRef.current;
      if (!track || !section || positions.length < 2 || document.hidden) return;
      if (interaction.hovered || interaction.focused || interaction.pointerDown) return;
      if (Date.now() < resumeAfterRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

      const current = positions.reduce((best, position, index) =>
        Math.abs(position - track.scrollLeft) < Math.abs(positions[best] - track.scrollLeft) ? index : best, 0);
      track.scrollTo({ left: positions[(current + 1) % positions.length], behavior: "smooth" });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    resumeAfterRef.current = Date.now() + 5000;
    const track = trackRef.current;
    const positions = positionsRef.current;
    const targetIndex = Math.max(0, Math.min(index, positions.length - 1));
    track.scrollTo({ left: positions[targetIndex], behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => { interactionRef.current.hovered = true; }}
      onMouseLeave={() => { interactionRef.current.hovered = false; }}
      onFocusCapture={() => { interactionRef.current.focused = true; }}
      onBlurCapture={(event) => {
        interactionRef.current.focused = event.currentTarget.contains(event.relatedTarget);
      }}
      onPointerDown={() => { interactionRef.current.pointerDown = true; }}
      onPointerUp={() => {
        interactionRef.current.pointerDown = false;
        resumeAfterRef.current = Date.now() + 5000;
      }}
      onPointerCancel={() => { interactionRef.current.pointerDown = false; }}
      className="relative scroll-mt-24 overflow-hidden bg-[#172b26] px-4 py-10 text-[14px] md:text-[16px] sm:px-6 sm:py-14 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#ddbc69]/10" />
      <div className="relative mx-auto max-w-7xl">
        <header className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <h2 id="testimonials-heading" className="text-[28px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[34px] lg:text-[38px]">What Our Investors Say</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-white/65">Hear from the people who chose BookMyAssets for their Dholera journey.</p>
        </header>

        <div id="testimonials-track" ref={trackRef} tabIndex={0} aria-label="Investor testimonials; swipe to explore" className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-2xl pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69] md:gap-4">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.name} aria-label={`Testimonial ${index + 1} of ${testimonials.length}`} className="flex w-full shrink-0 snap-start flex-col rounded-2xl border border-[#e8dfcc] bg-[#fffdf7] p-3 sm:p-5 md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]">
              <blockquote className="flex-1 leading-relaxed text-black">{testimonial.quote}</blockquote>
              <footer className="mt-3 flex items-center gap-3 border-t border-[#eae3d5] pt-2 sm:mt-5 sm:pt-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#ddbc69]/60 sm:h-14 sm:w-14">
                  <Image src={testimonial.avatar} alt="Representative portrait; not the testimonial author" fill sizes="(max-width: 639px) 48px, 56px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#23382d]">{testimonial.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-[12px] text-[#8b7950] sm:text-[13px]"><MapPin aria-hidden="true" size={13} />{testimonial.location}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button type="button" aria-label="Previous testimonials" aria-controls="testimonials-track" disabled={!canGoBack} onClick={() => goTo(activeIndex - 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69] text-black transition-opacity disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ChevronLeft size={20} /></button>
          <div className="flex items-center gap-1">
            {Array.from({ length: pageCount }, (_, index) => (
              <button key={index} type="button" aria-label={`Show testimonials page ${index + 1} of ${pageCount}`} aria-current={activeIndex === index ? "true" : undefined} aria-controls="testimonials-track" onClick={() => goTo(index)} className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]">
                <span className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-5 bg-[#ddbc69]" : "w-1.5 bg-white/30"}`} />
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next testimonials" aria-controls="testimonials-track" disabled={!canGoNext} onClick={() => goTo(activeIndex + 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69] text-black transition-opacity disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ChevronRight size={20} /></button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setIsAutoPlaying((playing) => !playing)} aria-pressed={!isAutoPlaying} aria-controls="testimonials-track" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[12px] text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]">
            {isAutoPlaying ? <Pause aria-hidden="true" size={14} /> : <Play aria-hidden="true" size={14} />}
            {isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          </button>
        </div>
      </div>
    </section>
  );
}
