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
      color: "text-[#34D399]",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Plan Pass Approved",
      icon: FaFileCircleCheck,
      color: "text-[#60A5FA]",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Registry Ready",
      icon: FaCircleCheck,
      color: "text-[#A78BFA]",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      title: "Resale Support",
      icon: FaArrowRotateLeft,
      color: "text-[#FB7185]",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      title: "Rental Support",
      icon: FaHouse,
      color: "text-[#FBBF24]",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Site Visit Assistance",
      icon: FaLocationDot,
      color: "text-[#FB923C]",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  return (
    <section
      aria-labelledby="our-commitments-title"
      className="w-full bg-[#F7F3EB] px-3 py-5 sm:px-5 sm:py-6 lg:px-7 lg:py-8"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* Section Header */}
        <div className="mb-3 text-center sm:mb-4 lg:mb-5">

          <h2
            id="our-commitments-title"
            className="font-serif text-[1.5rem] font-medium leading-[1.1] tracking-[-0.025em] text-[#202020] sm:text-[1.75rem] lg:text-[1.95rem] xl:text-[2.1rem]"
          >
            Our Commitments
          </h2>
        </div>

        {/* Commitment Cards */}
        <div
          id="counters-section"
          className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-3 lg:gap-3"
        >
          {items.map(({ title, icon: Icon, color, bg, border }) => (
            <article
              key={title}
              className="
                group
                flex
                min-h-[120px]
                flex-col
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-[#DED4C4]
                bg-[#FCFAF6]
                px-2
                py-2.5
                text-center
                shadow-[0_6px_20px_rgba(32,32,32,0.045)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#B8924F]/50
                hover:shadow-[0_12px_28px_rgba(32,32,32,0.08)]
                sm:min-h-[140px]
                sm:px-3
                sm:py-3
                lg:min-h-[155px]
                lg:px-4
                lg:py-4
              "
            >

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    ${border}
                    ${bg}
                    ${color}
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    sm:h-12
                    sm:w-12
                    lg:h-14
                    lg:w-14
                  `}
                >
                  <Icon
                    aria-hidden="true"
                    className="
                      h-5
                      w-5
                      sm:h-6
                      sm:w-6
                      lg:h-7
                      lg:w-7
                    "
                  />
                </div>

              {/* Card Content */}
              <div>
                <h3
                  className="
                    mx-auto
                    max-w-[190px]
                    text-[15px]
                    font-semibold
                    leading-[1.15]
                    tracking-[-0.02em]
                    text-[#202020]
                    sm:text-base
                    lg:text-lg
                  "
                >
                  {title}
                </h3>

                {/* Small gold accent */}
                <div
                  aria-hidden="true"
                  className="
                    mx-auto
                    mt-2
                    h-px
                    w-8
                    bg-[#B8924F]/60
                    transition-all
                    duration-300
                    group-hover:w-12
                  "
                />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
