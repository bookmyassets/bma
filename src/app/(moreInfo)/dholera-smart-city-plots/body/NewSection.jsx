"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import img2 from "@/assests/residential/residency/Residency.webp";
import img from "@/assests/residency.webp";

import WestwynContactForm from "../components/WestwynContactForm";

import {
  FaRoad,
  FaTrain,
  FaIndustry,
  FaPlane,
  FaClock,
  FaLocationArrow,
} from "react-icons/fa";

import { MapPin } from "lucide-react";

const carouselImages = [
  {
    src: img,
    alt: "WestWyn Residency location map in Dholera",
  },
  {
    src: img2,
    alt: "WestWyn Residency residential plots in Dholera",
  },
];

const locationPoints = [
  {
    icon: MapPin,
    title: "Location",
    subtitle: "Pipariya, Dholera",
  },
  {
    icon: FaLocationArrow,
    title: "Direct entry from",
    subtitle: "Major District Road (MDR)",
  },
  {
    icon: FaTrain,
    title: "2 mins from Railway Connectivity",
    subtitle: "Dholera Railway Connectivity",
  },
  {
    icon: FaClock,
    title: "5 mins from Dholera SIR Boundary",
    subtitle: "Special Investment Region",
  },
  {
    icon: FaRoad,
    title: "12 mins from Ahmedabad–Dholera Expressway",
    subtitle: "Regional connectivity",
  },
  {
    icon: FaIndustry,
    title: "22 mins from Tata Semiconductor Plant",
    subtitle: "Industrial & employment corridor",
  },
  {
    icon: FaPlane,
    title: "30 mins from Dholera International Airport",
    subtitle: "Future air connectivity",
  },
];

const projectFeatures = [
  {
    title: "Project Type",
    value: "Residential",
  },
  {
    title: "Land Parcel",
    value: "40,000 Sq.Yd",
  },
  {
    title: "Total Units",
    value: "290 Plots",
  },
  {
    title: "Plot Sizes",
    value: "124 Sq.Yd Onwards",
  },
  {
    title: "Price",
    value: "₹6,500*/Sq.Yd",
  },
];

const FeatureCard = ({ title, value }) => {
  return (
    <div
      className="
        group
        relative
        h-full
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        py-4
        text-center
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#ddbc69]
        hover:shadow-md
      "
    >
      <p
        className="
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-gray-500
          sm:text-xs
          lg:text-[13px]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1.5
          text-sm
          font-bold
          leading-snug
          text-[#151f28]
          sm:text-[15px]
          lg:text-base
        "
      >
        {value}
      </p>
    </div>
  );
};

export default function Residency() {
  const [current, setCurrent] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const sectionRef = useRef(null);
  const hasOpenedAutomatically = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    let popupTimer;

    if (!section || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(popupTimer);

        if (entry.isIntersecting && !hasOpenedAutomatically.current) {
          popupTimer = window.setTimeout(() => {
            if (
              hasOpenedAutomatically.current ||
              document.getElementById("contact-form-container")
            ) {
              return;
            }

            hasOpenedAutomatically.current = true;
            setIsContactFormOpen(true);
          }, 5000);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => {
      window.clearTimeout(popupTimer);
      observer.disconnect();
    };
  }, []);

  const prev = () => {
    setCurrent(
      (currentIndex) =>
        (currentIndex - 1 + carouselImages.length) %
        carouselImages.length
    );
  };

  const next = () => {
    setCurrent(
      (currentIndex) =>
        (currentIndex + 1) % carouselImages.length
    );
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="westwyn-residency"
        className="scroll-mt-[100px] bg-white"
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-3
            py-7
            sm:px-4
            sm:py-8
            md:py-10
          "
        >
          {/* ===================================================== */}
          {/* TOP CONTENT */}
          {/* ===================================================== */}

          <div className="mb-5 md:mb-6">
            <h2
              className="
                text-[22px]
                font-bold
                leading-tight
                tracking-[-0.02em]
                text-[#ddbc69]
                sm:text-2xl
                md:text-[28px]
                lg:text-[30px]
              "
            >
              WestWyn Residency
            </h2>

            <p
              className="
                mt-2.5
                max-w-4xl
                text-[15px]
                leading-6
                text-black
                sm:text-base
                md:text-[17px]
                md:leading-7
              "
            >
              WestWyn Residency is located in Pipariya, Dholera with direct
              entry from the Major District Road (MDR) and close proximity
              to key infrastructure and the Dholera SIR boundary.
            </p>
          </div>

          {/* ===================================================== */}
          {/* MAIN GRID */}
          {/* ===================================================== */}

          <div
            className="
              grid
              gap-4
              lg:grid-cols-[1.2fr_0.95fr]
              lg:items-start
              lg:gap-5
            "
          >
            {/* ================================================= */}
            {/* LEFT IMAGE */}
            {/* ================================================= */}

            <div
              className="
                group
                relative
                h-[290px]
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-sm
                ring-1
                ring-slate-200

                sm:h-[350px]
                md:h-[400px]

                lg:h-[470px]
                xl:h-[500px]
              "
            >
              <Image
                src={carouselImages[current].src}
                alt={carouselImages[current].alt}
                fill
                priority={current === 0}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.01]
                "
              />

              {/* NEW LAUNCH BADGE */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  z-20
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/80
                  bg-white/95
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-gray-800
                  shadow-sm
                  backdrop-blur-md
                  sm:text-[13px]
                "
              >
                <MapPin className="h-4 w-4 text-[#c4993f]" />

                Newly Launched
              </div>

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  shadow-md
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-white

                  md:opacity-0
                  md:group-hover:opacity-100
                "
              >
                <svg
                  className="h-[18px] w-[18px] text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  shadow-md
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-white

                  md:opacity-0
                  md:group-hover:opacity-100
                "
              >
                <svg
                  className="h-[18px] w-[18px] text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* DOT INDICATORS */}

              <div
                className="
                  absolute
                  bottom-4
                  right-4
                  z-30
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-black/35
                  px-2.5
                  py-2
                  backdrop-blur-md
                "
              >
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      h-2
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        current === index
                          ? "w-6 bg-[#ddbc69]"
                          : "w-2 bg-white/75 hover:bg-white"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT LOCATION CARDS */}
            {/* ================================================= */}

            <div
              className="
                relative
                min-w-0

                lg:h-[470px]
                xl:h-[500px]
              "
            >
              {/* MOBILE HEADING */}

              <div className="mb-4 lg:hidden">
                <div className="mb-2 flex items-center gap-3">
                  <span className="h-px w-9 bg-[#ddbc69]" />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-gray-500
                    "
                  >
                    A Growth Corridor
                  </span>
                </div>

                <h3
                  className="
                    text-xl
                    font-bold
                    leading-tight
                    text-[#171717]
                    sm:text-[22px]
                  "
                >
                  Close to What Matters Most
                </h3>

                <p
                  className="
                    mt-1.5
                    text-sm
                    leading-5
                    text-gray-500
                    sm:text-[15px]
                  "
                >
                  Live closer to opportunities, infrastructure and a stronger
                  tomorrow.
                </p>
              </div>

              {/* ================================================= */}
              {/* SCROLLABLE CARDS */}
              {/* ================================================= */}

              <div
                className="
                  grid
                  gap-3

                  lg:h-full
                  lg:overflow-y-auto
                  lg:overscroll-contain
                  lg:pr-2

                  [scrollbar-width:thin]
                  [scrollbar-color:#ddbc69_#f2f2f2]

                  [&::-webkit-scrollbar]:w-[6px]

                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-track]:bg-gray-100

                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-[#ddbc69]

                  [&::-webkit-scrollbar-thumb:hover]:bg-[#c7a34d]
                "
              >
                {locationPoints.map((point, index) => {
                  const Icon = point.icon;

                  return (
                    <div
                      key={index}
                      className="
                        group
                        flex
                        min-h-[74px]
                        items-center
                        gap-3.5
                        rounded-[15px]
                        border
                        border-gray-200
                        bg-white
                        px-3.5
                        py-3
                        shadow-[0_3px_12px_rgba(15,23,42,0.035)]
                        transition-all
                        duration-300

                        hover:-translate-y-[1px]
                        hover:border-[#ddbc69]/70
                        hover:shadow-[0_8px_20px_rgba(15,23,42,0.07)]

                        sm:min-h-[78px]
                        sm:px-4
                        sm:py-3.5

                        lg:min-h-[82px]
                      "
                    >
                      {/* ICON */}

                      <span
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#ddbc69]/10
                          transition-all
                          duration-300

                          group-hover:bg-[#ddbc69]/15

                          sm:h-12
                          sm:w-12
                        "
                      >
                        <Icon
                          className="
                            h-[18px]
                            w-[18px]
                            text-[#c3993e]
                            sm:h-5
                            sm:w-5
                          "
                        />
                      </span>

                      {/* TEXT */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-[17px]
                            font-bold
                            leading-5
                            text-[#17202b]

                            sm:text-[17px]
                            sm:leading-5

                            lg:text-base
                          "
                        >
                          {point.title}
                        </p>

                        <p
                          className="
                            mt-1
                            text-md
                            leading-4
                            text-black

                            sm:text-[17px]
                            sm:leading-5
                          "
                        >
                          {point.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scroll fade indicator */}
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  right-3
                  hidden
                  h-12
                  bg-gradient-to-t
                  from-white
                  to-transparent
                  lg:block
                "
              />
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* PROJECT FEATURES */}
        {/* ===================================================== */}

        <div className="border-y border-gray-200 bg-gray-50">
          <div
            className="
              mx-auto
              max-w-7xl
              px-3
              py-4
              sm:px-4
              sm:py-5
            "
          >
            <div
              className="
                grid
                grid-cols-2
                gap-2.5

                sm:grid-cols-3
                sm:gap-3

                md:grid-cols-5
              "
            >
              {projectFeatures.map((item, index) => {
                const isLastOdd =
                  index === projectFeatures.length - 1 &&
                  projectFeatures.length % 2 !== 0;

                return (
                  <div
                    key={index}
                    className={
                      isLastOdd
                        ? "col-span-2 sm:col-span-1"
                        : ""
                    }
                  >
                    <FeatureCard
                      title={item.title}
                      value={item.value}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {isContactFormOpen && (
        <WestwynContactForm
          onClose={() => setIsContactFormOpen(false)}
        />
      )}
    </>
  );
}