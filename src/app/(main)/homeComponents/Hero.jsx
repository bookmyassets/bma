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
  <>
    <div className="flex flex-col gap-[clamp(0.4rem,1vw,0.75rem)] w-[clamp(480px,44vw,680px)]">
      {/* H1 */}
      <h2 className="text-white text-[clamp(1.5rem,5vw,3.75rem)] font-bold leading-[1.1] mb-[clamp(0.5rem,1.25vw,1rem)]">
        Dedicated to Dholera
        <br />
      </h2>

      {/* Body */}
      <p className="text-white text-[clamp(1rem,1.6vw,1.5rem)] font-normal leading-[1.7] mb-[clamp(0.4rem,1vw,0.75rem)]">
        Invest in Dholera Residential Plots
      </p>

      <Link href="/about-dholera-sir">
        <p className="bg-[#ddbc69] text-black text-center p-2 w-48 rounded-lg">
          About Dholera <ArrowRight />
        </p>
      </Link>
    </div>
  </>
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

      <div id="hero" className="relative">
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
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        <div className="relative w-full h-screen hidden md:block">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/30 to-black/55" />

          <div className="absolute inset-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-[clamp(1rem,4vw,2.5rem)]">
            <PointsList />
            <HeroForm />
          </div>
        </div>

        <div className="md:hidden">
          <div className="relative w-full min-h-screen">
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute space-y-10 inset-0 z-20 flex flex-col px-[clamp(1rem,4vw,2rem)] py-[clamp(2.25rem,5.25vw,3.25rem)] justify-center gap-[clamp(0.4rem,1vw,0.75rem)] overflow-y-auto">
              {/* Visual heading Mobile */}
              <div className="text-white text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] mb-[clamp(0.5rem,1.25vw,1rem)]">
                Dedicated to Dholera
                <br />
              </div>

              <div className="flex-col py-6 transform -translate-y-16">
                <p className="mt-0.5 text-white text-[clamp(1.12rem,1.5vw,1.25rem)] mb-8 font-normal leading-[1.7]">
                  Invest in Dholera Residential Plots
                </p>

                <Link href="/about-dholera-sir">
                  <p className="bg-[#ddbc69] text-black text-center p-2 w-40 text-[1rem] md:text-[1rem] font-semibold leading-[1.4] rounded-lg">
                    About Dholera <ArrowRight />
                  </p>
                </Link>
              </div>

              <div className="mt-[clamp(0.5rem,1.75vw,1rem)] border-t border-[#ddbc69]/20 pt-[clamp(0.5rem,1.5vw,1rem)] -translate-y-8">
                <HeroForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
