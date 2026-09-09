import Image from "next/image";

import crownHero from "@/assests/residential/crown/westwyn-crown-dholera-entry-gate-desktop.webp";

export default function WestWynCrownHero() {
  return (
    <section
      id="westwyn-crown-hero"
      aria-labelledby="westwyn-crown-title"
      className="
        relative
        isolate
        min-h-[100svh]
        overflow-hidden
        bg-[#101010]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
      <Image
        src={crownHero}
        alt="WestWyn Crown residential project in Dholera"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="
          object-cover
          object-[60%_center]

          sm:object-[58%_center]

          lg:object-center
        "
      />

      {/* =====================================================
          MOBILE OVERLAY
          Lighter than previous version
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.18) 32%, rgba(3,10,15,0.28) 58%, rgba(5,12,17,0.56) 82%, rgba(7,16,24,0.78) 100%)",
        }}
      />

      {/* =====================================================
          DESKTOP OVERLAY
          Left remains readable without hiding the project
      ====================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,16,24,0.78) 0%, rgba(7,16,24,0.68) 22%, rgba(7,16,24,0.46) 42%, rgba(5,12,17,0.24) 62%, rgba(0,0,0,0.10) 82%, rgba(0,0,0,0.04) 100%)",
        }}
      />

      {/* =====================================================
          SUBTLE TOP GRADIENT
          Mainly for navbar readability
      ====================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          z-[2]

          h-28

          bg-gradient-to-b
          from-black/35
          via-black/15
          to-transparent

          sm:h-32

          lg:from-black/30
        "
      />

      {/* =====================================================
          MOBILE BOTTOM DEPTH
          Keeps title readable without darkening whole image
      ====================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          z-[2]

          h-[46%]

          bg-gradient-to-t
          from-[#071018]/75
          via-[#071018]/28
          to-transparent

          lg:hidden
        "
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}
      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1700px]

          items-end

          px-5
          pb-14
          pt-24

          sm:px-8
          sm:pb-16
          sm:pt-28

          lg:items-center
          lg:px-12
          lg:pb-0
          lg:pt-28

          xl:px-20

          2xl:px-24
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[560px]

            text-center

            sm:max-w-[620px]

            lg:mx-0
            lg:w-[48%]
            lg:max-w-[700px]
            lg:text-left
          "
        >
          {/* =================================================
              COMING SOON BADGE
          ================================================== */}
          <div
            className="
              mb-5

              inline-flex
              items-center
              justify-center
              gap-2

              rounded-full

              border
              border-[#ddbc69]/55

              bg-[#0B0D0E]/45

              px-3.5
              py-2

              shadow-[0_8px_28px_rgba(0,0,0,0.18)]

              backdrop-blur-md

              sm:mb-6
              sm:px-4
              sm:py-2

              lg:justify-start
            "
          >
            {/* Animated status dot */}
            <span className="relative flex size-2">
              <span
                className="
                  absolute
                  inline-flex
                  size-full
                  animate-ping
                  rounded-full
                  bg-[#ddbc69]
                  opacity-40
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  size-2
                  rounded-full
                  bg-[#e3c56f]
                  shadow-[0_0_10px_rgba(221,188,105,0.55)]
                "
              />
            </span>

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#ead07e]

                sm:text-[11px]

                lg:text-xs
              "
            >
              Coming Soon
            </span>
          </div>

          {/* =================================================
              PROJECT NAME
          ================================================== */}
          <h1
            id="westwyn-crown-title"
            className="
              font-serif
              uppercase

              text-[clamp(2.9rem,14vw,4.25rem)]
              font-medium
              leading-[0.88]
              tracking-[0.015em]

              text-[#fbbf24]

              drop-shadow-[0_5px_20px_rgba(0,0,0,0.42)]

              sm:text-[4.6rem]

              lg:text-[clamp(4.3rem,5.2vw,6rem)]
              lg:tracking-[0.025em]
            "
          >
            WestWyn

            <span
              className="
                mt-3
                block

                [font-family:var(--font-manrope)]

                text-[0.30em]
                font-medium
                leading-none
                tracking-[0.42em]

                text-white

                drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]

                sm:mt-4
                sm:text-[0.32em]

                lg:mt-5
                lg:text-[0.38em]
                lg:tracking-[0.38em]
              "
            >
              Crown
            </span>
          </h1>

          {/* Decorative Line */}
          <div
            className="
              mx-auto
              mt-6

              h-px
              w-16

              bg-gradient-to-r
              from-transparent
              via-[#ddbc69]
              to-transparent

              sm:w-20

              lg:mx-0
              lg:mt-7
              lg:bg-[#ddbc69]/80
            "
          />
        </div>
      </div>
    </section>
  );
}