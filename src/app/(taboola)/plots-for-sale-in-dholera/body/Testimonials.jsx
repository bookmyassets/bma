"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, MapPin } from "lucide-react";
import Image from "next/image";
import vikas from "@/assests/testimonials/vikas-patel.webp";
import pooja from "@/assests/testimonials/pooja-shah.webp";
import saransh from "@/assests/testimonials/saransh-pal.webp";

const testimonials = [
  {
    quote:
      "Investing in Dholera Smart City through BookMyAssets was one of the a confident decisions I made. The team guided me through every step, ensuring a hassle-free purchase. The plot prices are affordable, and I am already seeing a promising developing area. Highly recommended.",
    name: "Saransh Pal",
    location: "Gurugram",
    avatar: saransh,
  },
  {
    quote:
      "I was initially skeptical about investing in Dholera, but BookMyAssets provided me with all the necessary details and market insights. Their transparency and professionalism gave me confidence, and now I own a prime plot in Gujarat's first smart city. Excited about the future.",
    name: "Pooja Shah",
    location: "Ahmedabad",
    avatar: pooja,
  },
  {
    quote:
      "Dholera Smart City is the future, and BookMyAssets helped me secure a future-focused plot opportunity. Their team is knowledgeable and responsive and ensures a smooth transaction. I am confident my investment will yield long-term investment option in the coming years.",
    name: "Vikas Patel",
    location: "Delhi",
    avatar: vikas,
  },
];

export default function TestimonialPagination() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      const cards = Array.from(track.children);
      const firstOffset = cards[0].offsetLeft;
      const nearest = cards.reduce((best, card, index) =>
        Math.abs(card.offsetLeft - firstOffset - track.scrollLeft) < Math.abs(cards[best].offsetLeft - firstOffset - track.scrollLeft) ? index : best, 0);
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

  const goTo = (index) => {
    const track = trackRef.current;
    const card = track.children[index];
    track.scrollTo({ left: card.offsetLeft - track.children[0].offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return (
    <section aria-labelledby="testimonials-heading" className="relative overflow-hidden bg-[#172b26] px-4 py-5 text-[14px] md:text-[16px] sm:px-6 sm:py-7 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#ddbc69]/10" />
      <div className="relative mx-auto max-w-7xl">
        <header className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <h2 id="testimonials-heading" className="text-[28px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[34px] lg:text-[38px]">What our clients say</h2>
          </div>
          <p className="max-w-sm leading-relaxed text-white/65">Hear from the people who chose BookMyAssets for their Dholera journey.</p>
        </header>

        <div id="testimonials-track" ref={trackRef} tabIndex={0} aria-label="Client testimonials; swipe to explore" className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-2xl pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69] md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.name} aria-label={`Testimonial ${index + 1} of ${testimonials.length}`} className="flex w-full shrink-0 snap-start flex-col rounded-2xl border border-[#e8dfcc] bg-[#fffdf7] p-3 sm:p-5 md:w-auto">
              <blockquote className="flex-1 leading-relaxed text-black">{testimonial.quote}</blockquote>
              <footer className="mt-3 flex items-center gap-3 border-t border-[#eae3d5] pt-2 sm:mt-5 sm:pt-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#ddbc69]/60">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#23382d]">{testimonial.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-[12px] text-[#8b7950] sm:text-[13px]"><MapPin aria-hidden="true" size={13} />{testimonial.location}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between md:hidden">
          <button type="button" aria-label="Previous testimonial" aria-controls="testimonials-track" disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69] text-black transition-opacity disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ChevronLeft size={20} /></button>
          <div className="flex items-center gap-1">
            {testimonials.map((testimonial, index) => (
              <button key={testimonial.name} type="button" aria-label={`Show testimonial from ${testimonial.name}`} aria-current={activeIndex === index ? "true" : undefined} aria-controls="testimonials-track" onClick={() => goTo(index)} className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]">
                <span className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-5 bg-[#ddbc69]" : "w-1.5 bg-white/30"}`} />
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" aria-controls="testimonials-track" disabled={activeIndex === testimonials.length - 1} onClick={() => goTo(activeIndex + 1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69] text-black transition-opacity disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
