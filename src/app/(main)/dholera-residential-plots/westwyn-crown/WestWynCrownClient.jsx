import Image from "next/image";
import crownHero from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate.webp";

export default function WestWynCrownClient() {
  return (
    <main className="bg-[#101010]">
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

            object-[62%_center]
            sm:object-[60%_center]
            md:object-center
          "
        />

        {/* =====================================================
            DARK IMAGE OVERLAY
        ====================================================== */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0

            bg-[linear-gradient(
              180deg,
              rgba(10,10,10,0.20)_0%,
              rgba(10,10,10,0.28)_28%,
              rgba(10,10,10,0.68)_70%,
              rgba(10,10,10,0.88)_100%
            )]

            lg:bg-[linear-gradient(
              90deg,
              rgba(9,9,9,0.94)_0%,
              rgba(9,9,9,0.82)_25%,
              rgba(9,9,9,0.42)_52%,
              rgba(9,9,9,0.12)_78%,
              rgba(9,9,9,0.05)_100%
            )]
          "
        />

        {/* Top gradient for navbar visibility */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            top-0
            h-36

            bg-gradient-to-b
            from-black/55
            to-transparent
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
            pb-16
            pt-28

            sm:px-8
            sm:pb-20

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
              w-full
              max-w-[700px]

              text-center

              lg:w-[48%]
              lg:text-left
            "
          >
            {/* =================================================
                COMING SOON BADGE
            ================================================== */}
            <div
              className="
                mb-6

                inline-flex
                items-center
                gap-2.5

                rounded-full

                border
                border-[#ddbc69]/60

                bg-black/35

                px-4
                py-2.5

                backdrop-blur-md

                sm:px-5
              "
            >
              {/* Animated Dot */}
              <span className="relative flex size-2.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full

                    animate-ping

                    rounded-full

                    bg-[#ddbc69]

                    opacity-50
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    size-2.5

                    rounded-full

                    bg-[#ddbc69]
                  "
                />
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.26em]
                  text-[#e6c873]

                  sm:text-[11px]
                "
              >
                Coming Soon
              </span>
            </div>

            {/* =================================================
                MAIN HEADING
            ================================================== */}
            <h1
              id="westwyn-crown-title"
              className="
                uppercase

                font-serif

                text-[clamp(3.2rem,15vw,5rem)]
                font-medium
                leading-[0.88]
                tracking-[0.025em]

                text-[#f1dca7]

                sm:text-[5.2rem]

                lg:text-[clamp(4.4rem,5.2vw,6rem)]
              "
            >
              WestWyn

              <span
                className="
                  mt-4
                  block

                  [font-family:var(--font-manrope)]

                  text-[0.38em]
                  font-medium
                  leading-none
                  tracking-[0.38em]

                  text-white/90

                  sm:mt-5
                "
              >
                Crown
              </span>
            </h1>

            {/* Decorative Line */}
            <div
              className="
                mx-auto
                mt-7

                h-px
                w-20

                bg-[#ddbc69]/80

                lg:mx-0
              "
            />
          </div>
        </div>

        {/* =====================================================
            BOTTOM PROJECT MARK
        ====================================================== */}
        <div
          className="
            absolute
            bottom-5
            right-5
            z-10
            hidden
            text-right
            sm:block
            lg:bottom-8
            lg:right-10
            xl:right-16
          "
        >
          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-white/45

              sm:text-[10px]
            "
          >
            WestWyn Collection
          </p>

          <p
            className="
              mt-1

              font-serif
              text-sm
              text-[#ddbc69]/75
            "
          >
            By BookMyAssets
          </p>
        </div>
      </section>
    </main>
  );
}