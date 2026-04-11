import Image from "next/image";
import React from "react";
import img1 from "@/assests/taboola/hero/dholera-sir-residential-plots-bookmyassets-desktop-banner.webp";
import img2 from "@/assests/taboola/hero/dholera-sir-residential-plots-bookmyassets-mobile-banner.webp";

const points = [
  {
    title: "Registry ready with Immediate Possession",
    desc: "Suitable for buyers exploring high-growth land opportunities in India's first greenfield smart city.",
  },
  {
    title: "Plots in Dholera’s fastest-growing corridors",
    desc: "Focused on long-term planning — we guide you through timelines, returns, and exit strategies.",
  },
  {
    title: "High ROI Potential in Next 5 Years",
    desc: "Access maps, master plans, and plot layout walkthroughs before making any decision.",
  },
];

const FormCard = () => (
  <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] bg-[#fafafa] border border-yellow-600/20 rounded-xl backdrop-blur-md p-4 md:p-[clamp(2rem,3.5vw,2.75rem)] w-full md:w-[clamp(500px,22vw,660px)]">
    <div>
      <h3 className="text-black font-semibold text-center text-lg md:text-[clamp(1.25rem,1.85vw,1.7rem)] leading-tight">
        Invest in India's First Smart City
      </h3>
    </div>

    <input
      placeholder="Full Name*"
      className="w-full h-10 md:h-[clamp(2.25rem,3.45vw,2.85rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
    />
    <input
      placeholder="Phone Number*"
      type="tel"
      className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
    />
    <input
      placeholder="Email (Optional)"
      type="email"
      className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
    />
    <input
      placeholder="City*"
      type="text"
      className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black placeholder:text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
    />
    <select
      className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-white border border-yellow-600/25 focus:border-yellow-500 rounded-md px-3 md:px-[clamp(0.6rem,1vw,0.875rem)] text-black text-sm md:text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
      defaultValue=""
    >
      <option value="" disabled>
        Budget*
      </option>
      <option value="8-15">8 lakh - 15 lakhs</option>
      <option value="15-25">15 lakhs - 25 lakhs</option>
      <option value="25+">25 lakhs +</option>
    </select>

    <button className="w-full h-10 md:h-[clamp(2rem,3.2vw,2.6rem)] bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-[#deae3c] hover:to-yellow-500 text-black font-medium text-xs md:text-[clamp(0.7rem,0.9vw,0.82rem)] uppercase tracking-widest rounded-md transition-all hover:-translate-y-px">
      Get A Call Back
    </button>
  </div>
);

const PointsList = () => (
  <div className="flex flex-col gap-[clamp(1rem,1.75vw,1.5rem)] w-[clamp(500px,45vw,700px)]">
    <h1 className="text-white font-bold text-[clamp(1.5rem,2.7vw,2.45rem)] leading-tight mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Govt. Approved Plots in Dholera
      <br />
      <span className="text-[#deae3c]">Starting from ₹8 Lakh</span>
    </h1>

    <p className="text-white text-[clamp(0.75rem,1.5vw,1.2rem)] mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Explore premium plotted investment opportunities in Dholera Smart City.
      <br />
      Get brochure, price list, location details, and expert guidance from
      BookMyAssets.
    </p>

    {points.map((point, i) => (
      <div
        key={i}
        className="flex gap-[clamp(0.5rem,1vw,0.875rem)] items-center"
      >
        <div className="shrink-0 w-[clamp(1.5rem,2.15vw,1.8rem)] h-[clamp(1.5rem,2.15vw,1.8rem)] rounded-full border border-yellow-500/60 flex items-center justify-center">
          <span className="text-[#deae3c] text-[clamp(0.8rem,1.2vw,1rem)] font-semibold">
            ➤
          </span>
        </div>
        <p className="text-white font-medium text-[clamp(0.35rem,1.35vw,1.5rem)] leading-snug">
          {point.title}
        </p>
      </div>
    ))}
  </div>
);

export default function Hero() {
  return (
    <div>
      {/* Desktop */}
      <div className="relative w-full h-screen aspect-[3/1] hidden md:block">
        <Image
          src={img1}
          alt="WestWyn Estate"
          fill
          className="object-cover w-full h-screen"
          priority
        />

        {/* Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-black/75" />

        {/* Left: Points | Right: Form */}
        <div className="absolute inset-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-[clamp(.7rem,3.2vw,3.2rem)]">
          <PointsList />
          <FormCard />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative w-full min-h-screen">
          <Image
            src={img2}
            alt="WestWyn Estate"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* All content overlaid on image */}
          <div className="absolute inset-0 z-20 flex flex-col px-4 py-6 justify-center gap-4 overflow-y-auto">
            <h1 className="text-white font-bold text-[clamp(1.5rem,6vw,2rem)] leading-tight mb-2">
              Govt Approved Plots in Dholera
              <br />
              <span className="text-[#deae3c]">Starting from ₹8 Lakh</span>
            </h1>

            {points.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full border border-yellow-500/60 flex items-center justify-center">
                  <span className="text-[#deae3c] text-[0.6rem] font-semibold">
                    ➤
                  </span>
                </div>
                <div>
                  <p className="mt-1 text-white font-medium text-sm leading-snug flex items-center justify-center">
                    {point.title}
                  </p>
                </div>
              </div>
            ))}

            {/* Form also on image */}
            <div className="mt-2 border-t border-yellow-600/20 pt-4">
              <FormCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}