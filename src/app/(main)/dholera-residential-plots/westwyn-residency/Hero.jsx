import heroImage from "@/assests/residential/residency/hero-test-1.webp";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CircleDollarSign,
  FileCheck2,
  MapPin,
  Ruler,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

const projectFacts = [
  {
    label: "Starting price",
    value: "₹8 Lakh",
    Icon: CircleDollarSign,
  },
  {
    label: "Plot sizes",
    value: "124–187 sq. yd.",
    Icon: Ruler,
  },
  {
    label: "Documentation",
    value: "Registry Ready",
    Icon: FileCheck2,
  },
  {
    label: "Connectivity",
    value: "1.5 km from DFC",
    Icon: MapPin,
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="westwyn-residency-title"
      className="relative isolate min-h-[740px] overflow-hidden bg-[#071018] text-white sm:min-h-[790px] lg:min-h-[calc(100svh+96px)]"
    >
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Entrance gate of WestWyn Residency in Dholera"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-[60%_center] sm:object-[58%_center] lg:object-center"
      />

      {/* ========================================= */}
      {/* MOBILE / TABLET OVERLAY */}
      {/* ========================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,0.55) 52%, rgba(3,10,15,0.72) 76%, rgba(7,16,24,0.96) 100%)",
        }}
      />

      {/* Additional mobile dark layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] bg-black/20 lg:hidden"
      />

      {/* ========================================= */}
      {/* DESKTOP OVERLAY */}
      {/* ========================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,16,24,0.98) 0%, rgba(7,16,24,0.96) 22%, rgba(7,16,24,0.82) 42%, rgba(5,12,17,0.55) 60%, rgba(0,0,0,0.30) 78%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      {/* Desktop overall tint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] hidden bg-black/10 lg:block"
      />

      {/* Top Shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[3] h-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent lg:h-40 lg:from-black/50"
      />

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[740px]
          w-full
          max-w-[1700px]
          items-center
          px-5
          pb-12
          pt-[116px]

          sm:min-h-[790px]
          sm:px-7
          sm:pb-14
          sm:pt-28

          lg:min-h-[calc(100svh+96px)]
          lg:px-12
          lg:pb-28
          lg:pt-36
          lg:translate-y-6

          xl:px-20
          2xl:px-24
        "
      >
        <div className="w-full max-w-[720px] lg:w-[58%] xl:w-[54%]">
          {/* ========================================= */}
          {/* TAGS */}
          {/* ========================================= */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="
                inline-flex
                min-h-8
                items-center
                gap-2
                rounded-full
                border
                border-yellow-300/30
                bg-yellow-950/65
                px-3
                text-[11px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-yellow-200
                shadow-[0_6px_20px_rgba(0,0,0,0.2)]
                backdrop-blur-md

                sm:px-4
                sm:text-xs
              "
            >
              <span className="size-2 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]" />

              Newly Launched
            </span>

            <span
              className="
                inline-flex
                min-h-8
                items-center
                gap-1.5
                rounded-full
                border
                border-white/15
                bg-black/50
                px-3
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-white/80
                backdrop-blur-md

                sm:text-xs
              "
            >
              <MapPin
                className="size-3.5 text-[#ddbc69]"
                aria-hidden="true"
              />

              Pipariya, Dholera SIR
            </span>
          </div>

          {/* ========================================= */}
          {/* HEADING */}
          {/* ========================================= */}
          <h1
            id="westwyn-residency-title"
            className="
              mt-7
              font-serif
              uppercase
              leading-[0.9]
              tracking-[0.015em]
              drop-shadow-[0_5px_24px_rgba(0,0,0,0.7)]

              sm:mt-6
            "
          >
            <span
              className="
                block
                text-[clamp(3rem,14vw,4.5rem)]
                text-[#fbbf24]

                lg:text-[clamp(4.5rem,5.5vw,6.2rem)]
              "
            >
              WestWyn
            </span>

            <span
              className="
                mt-2.5
                block
                text-[clamp(1.3rem,6vw,2rem)]
                font-medium
                tracking-[0.28em]
                text-white
                drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]

                sm:mt-3

                lg:text-[clamp(1.6rem,2vw,2.25rem)]
              "
            >
              Residency
            </span>
          </h1>

          {/* Divider */}
          <div
            className="
              mt-7
              h-px
              w-28
              bg-gradient-to-r
              from-[#ddbc69]
              via-[#ddbc69]/65
              to-transparent

              sm:w-36

                lg:mt-8
            "
          />

          {/* ========================================= */}
          {/* DESCRIPTION - DESKTOP ONLY */}
          {/* ========================================= */}
          <p
            className="
              hidden
              max-w-xl
              font-medium
              text-white
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]

              lg:mt-7
              lg:block
              lg:text-lg
              lg:leading-8
            "
          >
            Registry ready residential plots in Pipariya, Dholera.
          </p>

          {/* ========================================= */}
          {/* PROJECT FACTS */}
          {/* ========================================= */}
          <div
            className="
              mt-10
              grid
              max-w-[470px]
              grid-cols-2
              gap-x-3
              gap-y-4

              sm:gap-x-4
              sm:gap-y-4

              lg:mt-8
              lg:max-w-none
              lg:grid-cols-4
              lg:gap-0
              lg:overflow-hidden
              lg:rounded-2xl
              lg:border
              lg:border-white/15
              lg:bg-black/45
              lg:shadow-[0_18px_45px_rgba(0,0,0,0.3)]
              lg:backdrop-blur-md
            "
          >
            {projectFacts.map(({ label, value, Icon }, index) => (
              <div
                key={label}
                className={`
                  group
                  relative
                  flex
                  min-h-[50px]
                  cursor-default
                  items-center
                  gap-2.5

                  transition-all
                  duration-300
                  ease-out

                  sm:min-h-[54px]
                  sm:gap-3

                  lg:min-h-[110px]
                  lg:flex-col
                  lg:items-start
                  lg:justify-center
                  lg:gap-3
                  lg:p-4

                  lg:bg-transparent
                  lg:shadow-none

                  lg:hover:z-10
                  lg:hover:-translate-y-1
                  lg:hover:bg-[#ddbc69]/10
                  lg:hover:shadow-[0_10px_35px_rgba(221,188,105,0.12)]

                  ${index > 0 ? "lg:border-l lg:border-white/10" : ""}
                `}
              >
                {/* Desktop Hover Accent */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    hidden
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-transparent
                    via-[#ddbc69]
                    to-transparent
                    opacity-60
                    transition-transform
                    duration-300

                    lg:block
                    lg:group-hover:scale-x-100
                  "
                />

                {/* Icon */}
                <span
                  className="
                    flex
                    size-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full

                    border
                    border-[#ddbc69]/45

                    bg-black/35
                    text-[#f0cf75]

                    shadow-[0_0_18px_rgba(221,188,105,0.12)]

                    backdrop-blur-sm

                    transition-all
                    duration-300

                    lg:size-12
                    lg:bg-[#ddbc69]/15

                    lg:group-hover:scale-105
                    lg:group-hover:bg-[#ddbc69]
                    lg:group-hover:text-[#101010]
                    lg:group-hover:shadow-[0_0_24px_rgba(221,188,105,0.25)]
                  "
                >
                  <Icon
                    className="size-4 sm:size-[18px] lg:size-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                {/* Mobile divider */}
                <span
                  aria-hidden="true"
                  className="h-9 w-px shrink-0 bg-[#ddbc69]/55 lg:hidden"
                />

                {/* Text */}
                <div className="min-w-0">
                  <p
                    className="
                      text-xs
                      font-medium
                      leading-4
                      text-white
                      drop-shadow-[0_2px_7px_rgba(0,0,0,0.9)]

                      lg:text-sm
                      lg:leading-5
                    "
                  >
                    {label}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[13px]
                      font-bold
                      leading-4
                      text-white
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]

                      lg:text-[15px]
                      lg:leading-5
                    "
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================= */}
          {/* CTA BUTTONS */}
          {/* ========================================= */}
          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-2

              min-[360px]:grid-cols-2

              sm:mt-8
              sm:gap-2.5

              lg:mt-7
              lg:gap-3
            "
          >
            {/* Price CTA */}
            <Link
              href="https://wa.me/918130371647?text=Hi%2C%20I%27d%20like%20the%20latest%20WestWyn%20Residency%20details"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                gap-1.5

                rounded-lg

                bg-gradient-to-r
                from-[#d5aa4e]
                via-[#efd170]
                to-[#d7ae55]

                px-2.5

                text-[13px]
                font-bold
                text-[#101010]

                shadow-[0_10px_24px_rgba(0,0,0,0.3)]

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:brightness-110

                focus:outline-none
                focus:ring-2
                focus:ring-[#f0d68f]

                sm:min-h-[50px]
                sm:text-sm

                lg:min-h-[58px]
                lg:gap-2
                lg:rounded-xl
                lg:px-3
                lg:text-base
              "
            >
              <FaWhatsapp
                className="size-[18px] shrink-0 text-[#176b3a] lg:size-5"
                aria-hidden="true"
              />

              Price

              <ArrowRight
                className="
                  size-3.5
                  shrink-0
                  transition-transform
                  duration-300
                  group-hover:translate-x-1

                  lg:size-4
                "
                aria-hidden="true"
              />
            </Link>

            {/* Legal Documents */}
            <Link
              href="#document-vault-slider"
              className="
                group
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                gap-1.5

                rounded-lg

                border
                border-[#ddbc69]/65

                bg-black/65

                px-2.5

                text-[13px]
                font-bold
                text-white

                shadow-[0_10px_24px_rgba(0,0,0,0.25)]
                backdrop-blur-md

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-[#ddbc69]
                hover:bg-[#ddbc69]
                hover:text-[#101010]

                focus:outline-none
                focus:ring-2
                focus:ring-[#ddbc69]

                sm:min-h-[50px]
                sm:text-sm

                lg:min-h-[58px]
                lg:gap-2
                lg:rounded-xl
                lg:px-3
                lg:text-base
              "
            >
              <FileCheck2
                className="
                  size-[18px]
                  shrink-0
                  text-[#ddbc69]

                  transition-all
                  duration-300

                  group-hover:scale-110
                  group-hover:text-[#101010]

                  lg:size-5
                "
                strokeWidth={1.8}
                aria-hidden="true"
              />

              Legal Documents
            </Link>
          </div>

          {/* ========================================= */}
          {/* INVENTORY NOTE */}
          {/* ========================================= */}
          <p
            className="
              mt-4
              text-center
              text-[12px]
              font-medium
              leading-5
              text-white
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]

              min-[360px]:text-left

              sm:text-[12px]

              lg:mt-3
              lg:text-[17px]
            "
          >
            Price and plot availability are subject to current inventory.
          </p>
        </div>
      </div>
    </section>
  );
}
