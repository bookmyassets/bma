import Image, { getImageProps } from "next/image";
import img1 from "@/assests/ad-page/hero/residential-plots-in-dholera-bookmyassets-desktop-banner.webp";
import img2 from "@/assests/ad-page/hero/residential-plots-in-dholera-bookmyassets-mobile-banner.webp";
import HeroForm from "./HeroForm";
import Link from "next/link";

const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({
  src: img1,
  alt: "",
  fill: true,
  sizes: "100vw",
});

const {
  props: { srcSet: mobileSrcSet },
} = getImageProps({
  src: img2,
  alt: "",
  fill: true,
  sizes: "100vw",
});

const ArrowRight = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 448 512"
    className="ml-1 inline-block h-[1em] w-[1em] fill-current"
  >
    <path d="M438.6 278.6l-160 160a32 32 0 0 1-45.3-45.3L338.8 288H32a32 32 0 0 1 0-64h306.8L233.4 118.6a32 32 0 0 1 45.3-45.3l160 160a32 32 0 0 1-.1 45.3z" />
  </svg>
);

const PointsList = () => (
  <div className="flex w-full max-w-[42.5rem] flex-col">
    {/* Heading */}
    <h1
      id="hero-title-desktop"
      className=" text-[clamp(3rem,6vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.035em]"
    >
      <span className="block text-white">Dedicated to</span>
      <span className="mt-2 block text-[#ddbc69]">
        Dholera
      </span>
    </h1>

    <div className="mt-5 h-[2px] w-36 bg-gradient-to-r from-[#f3d57d] via-[#ddbc69] to-transparent shadow-[0_2px_10px_rgba(221,188,105,0.55)]" />

    {/* Description */}
    <p
      className="mt-5 max-w-[32.5rem] text-[clamp(1.05rem,1.6vw,1.5rem)] font-normal leading-[1.6] text-white"
    >
      Invest in Dholera Residential Plots
    </p>

    {/* CTA */}
    <Link
      href="/about-dholera-sir"
      className="group mt-7 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f1d27a] via-[#ddbc69] to-[#c79e3b] px-6 text-[0.95rem] font-semibold text-[#101010] shadow-[0_12px_26px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_16px_32px_rgba(0,0,0,0.42),0_0_20px_rgba(221,188,105,0.32)] focus:outline-none focus:ring-2 focus:ring-[#f0d68f]"
    >
      About Dholera
      <ArrowRight />
    </Link>
  </div>
);

export default function Hero() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        media="(min-width: 768px)"
        imageSrcSet={desktopSrcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />

      <link
        rel="preload"
        as="image"
        media="(max-width: 767px)"
        imageSrcSet={mobileSrcSet}
        imageSizes="100vw"
        fetchPriority="high"
      />

      <section
        id="hero"
        aria-labelledby="hero-title-desktop hero-title-mobile"
        className="relative isolate min-h-screen overflow-hidden bg-[#071018] text-white"
      >
        {/* =====================================================
            HERO BACKGROUND
        ===================================================== */}
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={desktopSrcSet}
            sizes="100vw"
          />

          <Image
            src={img2}
            alt="Dholera Smart City"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-r from-black/35 via-black/10 to-black/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-b from-black/5 via-transparent to-black/15"
        />

        {/* =====================================================
            DESKTOP
        ===================================================== */}
        <div className="relative z-10 hidden min-h-screen w-full md:block">
          <div
            className="
              mx-auto
              grid
              min-h-screen
              w-full
              max-w-[1400px]

              grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)]

              items-center

              gap-[clamp(3rem,6vw,6rem)]

              px-[clamp(2rem,5vw,5rem)]
              pt-[clamp(7rem,10vh,9rem)]
              pb-[clamp(3rem,5vh,5rem)]
            "
          >
            {/* =================================================
                LEFT HERO CONTENT
            ================================================= */}
            <div
              className="
                flex
                min-w-0
                items-center
              "
            >
              <div className="w-full">
                <PointsList />
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================= */}
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
              "
            >
              <div
                className="
                  w-full
                  max-w-[496px]
                "
              >
                <HeroForm />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE
        ===================================================== */}
        <div className="relative z-10 min-h-screen md:hidden">
          <div
            className="
              relative
              z-20
              flex
              min-h-screen
              w-full
              flex-col

              px-5
              pb-10

              pt-[clamp(6.5rem,20vw,8rem)]
            "
          >
            {/* =================================================
                MOBILE TEXT
            ================================================= */}
            <div className="max-w-[23rem]">
              <h1
                id="hero-title-mobile"
                className="font-serif text-[clamp(2.75rem,11vw,4rem)] font-semibold leading-[0.92] tracking-[-0.025em]"
              >
                <span className="block text-white">Dedicated to</span>
                <span className="mt-2 block text-[#ddbc69]">
                  Dholera
                </span>
              </h1>

              <p
                className="
                  mt-4
                  text-[1.05rem]
                  font-normal
                  leading-[1.55]
                  text-white

                "
              >
                Invest in Dholera Residential Plots
              </p>

              <Link
                href="/about-dholera-sir"
                className="
                  mt-6
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2

                  rounded-lg
                  bg-gradient-to-r from-[#f1d27a] via-[#ddbc69] to-[#c79e3b]

                  px-6

                  text-[0.95rem]
                  font-semibold
                  text-[#101010]

                  shadow-[0_12px_26px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.45)]

                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:brightness-105
                "
              >
                About Dholera
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>

            {/* =================================================
                MOBILE FORM
            ================================================= */}
            <div
              className="
                mt-auto
                flex
                w-full
                justify-center

                pt-[clamp(3rem,13vw,5rem)]
              "
            >
              <HeroForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
