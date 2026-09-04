"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
} from "lucide-react";

import karan from "@/assests/testimonials/vikas-patel.webp";
import amit from "@/assests/testimonials/amit-khurana.webp";
import priya from "@/assests/testimonials/anjali-mehta.webp";
import nidhi from "@/assests/testimonials/pooja-shah.webp";
import vikram from "@/assests/testimonials/vikram-singh.webp";
import rahul from "@/assests/testimonials/saransh-pal.webp";

const testimonials = [
  {
    quote:
      "BookMyAssets explained the plot documents, location, and buying process very clearly. Their team gave us proper time and guidance before we made our decision.",
    name: "Rahul Sharma",
    location: "Delhi",
    avatar: rahul,
  },
  {
    quote:
      "The site visit was well planned and professional. We understood the project location, nearby development, and future scope of Dholera in a clear way.",
    name: "Nidhi Patel",
    location: "Ahmedabad",
    avatar: nidhi,
  },
  {
    quote:
      "As a first-time investor in Dholera, I had many questions. BookMyAssets answered everything patiently and helped me understand each step without any pressure.",
    name: "Karan Mehta",
    location: "Mumbai",
    avatar: karan,
  },
  {
    quote:
      "Mujhe Dholera investment ko lekar kaafi doubts the, but BookMyAssets team ne documents, pricing aur location sab simple way mein explain kiya. Process kaafi transparent laga.",
    name: "Amit Verma",
    location: "Noida",
    avatar: amit,
  },
  {
    quote:
      "Main long-term investment ke liye Dholera mein plot dekh rahi thi. BookMyAssets ne mujhe realistic guidance di aur right project samajhne mein help ki.",
    name: "Priya Shah",
    location: "Surat",
    avatar: priya,
  },
  {
    quote:
      "From enquiry to plot registration, the BookMyAssets team supported us at every stage. The process felt smooth, clear, and professional.",
    name: "Vikram Singh",
    location: "Ludhiana",
    avatar: vikram,
  },
];

function getSeededIndex(seed, itemCount) {
  let mixedSeed = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  mixedSeed = Math.imul(mixedSeed ^ (mixedSeed >>> 13), 0xc2b2ae35);

  return (mixedSeed >>> 0) % itemCount;
}

export function getMonthlyFeaturedIndex(itemCount, date = new Date()) {
  if (itemCount <= 1) return 0;

  const targetMonth = date.getFullYear() * 12 + date.getMonth();
  const rotationStartMonth = 2000 * 12;

  if (targetMonth < rotationStartMonth) {
    return getSeededIndex(targetMonth, itemCount);
  }

  let featuredIndex = getSeededIndex(rotationStartMonth, itemCount);

  for (let month = rotationStartMonth + 1; month <= targetMonth; month += 1) {
    let nextIndex = getSeededIndex(month, itemCount);

    if (nextIndex === featuredIndex) {
      const alternateOffset =
        1 + (getSeededIndex(month + 97, itemCount - 1) % (itemCount - 1));
      nextIndex = (nextIndex + alternateOffset) % itemCount;
    }

    featuredIndex = nextIndex;
  }

  return featuredIndex;
}

function getMonthlyTestimonialOrder(items, date = new Date()) {
  const featuredIndex = getMonthlyFeaturedIndex(items.length, date);
  const featuredTestimonial = items[featuredIndex];

  return [
    featuredTestimonial,
    ...items.filter((_, index) => index !== featuredIndex),
  ];
}

function TestimonialCard({ testimonial }) {
  return (
    <article className="relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-[#ddbc69]/30 bg-[#fafafa] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)] sm:p-7">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-[#ddbc69]"
      />

      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#ddbc69]/20 text-[#8a6d24]">
        <Quote aria-hidden="true" className="h-5 w-5" />
      </span>

      <div className="flex flex-col items-center text-center">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#ddbc69] bg-white shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.name}, BookMyAssets client`}
            fill
            sizes="72px"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <h3 className="mt-4 text-xl font-bold leading-tight text-[#101010] sm:text-2xl">
          {testimonial.name}
        </h3>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 text-base font-semibold text-gray-600 sm:text-lg">
          <MapPin
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-[#9b7929] sm:h-6 sm:w-6"
          />
          {testimonial.location}
        </p>
      </div>

      <blockquote className="mt-4 flex flex-1 items-center border-l-2 border-[#ddbc69] pl-4">
        <p className="text-base font-medium leading-7 text-gray-700 sm:text-[1.05rem] sm:leading-8">
          “{testimonial.quote}”
        </p>
      </blockquote>
    </article>
  );
}

function ArrowButton({ direction, onClick, disabled = false, label }) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddbc69]/60 text-[#ddbc69] transition-colors hover:bg-[#ddbc69] hover:text-[#101010] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010] disabled:cursor-not-allowed disabled:border-white/15 disabled:text-white/30 disabled:hover:bg-transparent"
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}

function PaginationDot({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "true" : undefined}
      className="group inline-flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69]"
    >
      <span
        className={`block h-2.5 rounded-full transition-all ${
          active
            ? "w-7 bg-[#ddbc69]"
            : "w-2.5 bg-white/35 group-hover:bg-white/60"
        }`}
      />
    </button>
  );
}

export default function TestimonialPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [orderedTestimonials, setOrderedTestimonials] = useState(testimonials);

  useEffect(() => {
    setOrderedTestimonials(getMonthlyTestimonialOrder(testimonials));
  }, []);

  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(
    orderedTestimonials.length / testimonialsPerPage,
  );
  const firstTestimonialIndex = (currentPage - 1) * testimonialsPerPage;
  const currentTestimonials = orderedTestimonials.slice(
    firstTestimonialIndex,
    firstTestimonialIndex + testimonialsPerPage,
  );
  const activeMobileTestimonial =
    orderedTestimonials[currentMobileIndex] || orderedTestimonials[0];

  const prevMobileSlide = () => {
    setCurrentMobileIndex((currentIndex) =>
      currentIndex === 0
        ? orderedTestimonials.length - 1
        : currentIndex - 1,
    );
  };

  const nextMobileSlide = () => {
    setCurrentMobileIndex((currentIndex) =>
      currentIndex === orderedTestimonials.length - 1
        ? 0
        : currentIndex + 1,
    );
  };

  return (
    <section
      aria-labelledby="client-testimonials-heading"
      className="overflow-hidden bg-[#101010] py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ddbc69]">
            Client experiences
          </p>
          <h2
            id="client-testimonials-heading"
            className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-white"
          >
            What our clients say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Experiences shared by clients who explored Dholera projects with
            the BookMyAssets team.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md md:hidden">
          <motion.div
            key={`mobile-${activeMobileTestimonial.name}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCard testimonial={activeMobileTestimonial} />
          </motion.div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <ArrowButton
              direction="previous"
              onClick={prevMobileSlide}
              label="Show previous testimonial"
            />

            <div className="flex min-w-0 items-center justify-center">
              {orderedTestimonials.map((testimonial, index) => (
                <PaginationDot
                  key={testimonial.name}
                  active={currentMobileIndex === index}
                  onClick={() => setCurrentMobileIndex(index)}
                  label={`Show testimonial from ${testimonial.name}`}
                />
              ))}
            </div>

            <ArrowButton
              direction="next"
              onClick={nextMobileSlide}
              label="Show next testimonial"
            />
          </div>
        </div>

        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-3 gap-5 lg:gap-7">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <ArrowButton
              direction="previous"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              label="Show previous testimonial page"
            />

            <div className="flex items-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationDot
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  label={`Show testimonial page ${index + 1}`}
                />
              ))}
            </div>

            <ArrowButton
              direction="next"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              label="Show next testimonial page"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
