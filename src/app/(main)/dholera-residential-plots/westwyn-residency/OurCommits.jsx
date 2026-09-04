import React from "react";

import {
  FaShieldHalved,
  FaFileCircleCheck,
  FaCircleCheck,
  FaArrowRotateLeft,
  FaHouse,
  FaLocationDot,
} from "react-icons/fa6";

export default function OurCommits() {
  const items = [
    {
      title: "NA/NOC/Title Clear",
      icon: FaShieldHalved,
    },
    {
      title: "Plan Pass Approved",
      icon: FaFileCircleCheck,
    },
    {
      title: "Registry Ready",
      icon: FaCircleCheck,
    },
    {
      title: "Resale Support",
      icon: FaArrowRotateLeft,
    },
    {
      title: "Rental Support",
      icon: FaHouse,
    },
    {
      title: "Site Visit Assistance",
      icon: FaLocationDot,
    },
  ];

  return (
    <section className="bg-white px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-7xl">
        <div
          id="counters-section"
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-[#ddbc69]/25
            bg-[#0b0b0b]
            px-3
            py-5
            shadow-[0_10px_30px_rgba(0,0,0,0.14)]

            sm:px-5
            sm:py-7

            md:px-7
            md:py-8
          "
        >
          {/* Subtle top glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-28
              bg-[radial-gradient(ellipse_at_top,rgba(221,188,105,0.055),transparent_70%)]
            "
          />

          {/* Heading */}
          <div className="relative z-10 text-center">
            <h2
              className="
                text-[clamp(1.55rem,4vw,2.15rem)]
                font-semibold
                leading-tight
                text-white
              "
            >
              Our Commitments
            </h2>

            {/* Gold line */}
            <div
              aria-hidden="true"
              className="
                mx-auto
                mt-2.5
                h-[2px]
                w-12
                rounded-full
                bg-[#ddbc69]

                sm:w-14
              "
            />
          </div>

          {/* Cards */}
          <div
            className="
              relative
              z-10
              mt-5
              grid
              grid-cols-2
              gap-2.5

              sm:mt-6
              sm:gap-3

              md:grid-cols-3
              md:gap-4
            "
          >
            {items.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="
                  group

                  flex
                  min-h-[7.5rem]
                  flex-col
                  items-center
                  justify-center
                  gap-3

                  rounded-xl
                  border
                  border-white/[0.10]
                  bg-white/[0.035]

                  px-2.5
                  py-3

                  text-center

                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:border-[#ddbc69]/40
                  hover:bg-white/[0.05]

                  sm:min-h-[8rem]
                  sm:px-3
                  sm:py-4

                  md:min-h-[8.5rem]
                  md:gap-3.5
                  md:px-5
                  md:py-4
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    size-12
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg
                    border
                    border-[#ddbc69]/25

                    bg-[#ddbc69]/[0.08]
                    text-[#ddbc69]

                    transition-all
                    duration-300

                    group-hover:border-[#ddbc69]/45
                    group-hover:bg-[#ddbc69]/[0.12]

                    sm:size-[3.25rem]

                    md:size-14
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="
                      size-[1.4rem]
                      sm:size-[1.55rem]
                      md:size-[1.75rem]
                    "
                  />
                </div>

                {/* Text */}
                <p
                  className="
                    max-w-[10rem]
                    text-sm
                    font-semibold
                    leading-[1.3]
                    text-[#f5f1e8]

                    sm:max-w-[11rem]
                    sm:text-base

                    md:max-w-none
                    md:text-[1.05rem]

                    lg:text-lg
                  "
                >
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
