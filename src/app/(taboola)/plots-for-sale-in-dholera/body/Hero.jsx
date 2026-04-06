import Image from "next/image";
import React from "react";
import img1 from "@/assests/residential/estate3a.webp";
import img2 from "@/assests/residential/estates-1M.webp";

const points = [
  {
    title: "Plotted Investment in Dholera",
    desc: "Suitable for buyers exploring high-growth land opportunities in India's first greenfield smart city.",
  },
  {
    title: "Consultation-First Approach",
    desc: "Focused on long-term planning — we guide you through timelines, returns, and exit strategies.",
  },
  {
    title: "Project Details & Layout Discussion",
    desc: "Access maps, master plans, and plot layout walkthroughs before making any decision.",
  },
  {
    title: "Serious Enquiries Only",
    desc: "Built for property investors who are ready to evaluate, not just browse.",
  },
];

const FormCard = () => (
  <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] bg-gradient-to-b from-black/90 to-black/95 border border-yellow-600/20 rounded-xl backdrop-blur-md p-[clamp(1rem,2.5vw,1.75rem)] w-[clamp(400px,22vw,560px)]">
    <div>
      <div className="w-8 h-0.5 bg-yellow-500 mb-2" />
      <h3 className="text-white font-semibold text-[clamp(1rem,1.6vw,1.35rem)] leading-tight">
        Government Approved Plots in Dholera for Long-Term Investors
      </h3>
      
    </div>

    <input
      placeholder="Full Name"
      className="w-full h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-[clamp(0.6rem,1vw,0.875rem)] text-white placeholder:text-white/35 text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
    />
    <input
      placeholder="Phone Number"
      type="tel"
      className="w-full h-[clamp(2rem,3.2vw,2.6rem)] bg-white/5 border border-yellow-600/25 focus:border-yellow-500 rounded-md px-[clamp(0.6rem,1vw,0.875rem)] text-white placeholder:text-white/35 text-[clamp(0.75rem,1vw,0.875rem)] outline-none transition-colors"
    />

    <button className="w-full h-[clamp(2rem,3.2vw,2.6rem)] bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-medium text-[clamp(0.7rem,0.9vw,0.82rem)] uppercase tracking-widest rounded-md transition-all hover:-translate-y-px">
      Get A Call Back
    </button>

    
  </div>
);

const PointsList = () => (
  <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.25rem)] w-[clamp(220px,28vw,400px)]">
    <h1 className="text-white font-bold text-[clamp(1.1rem,2.2vw,2rem)] leading-tight mb-[clamp(0.25rem,0.75vw,0.75rem)]">
      Dholera Residential Plots <br />
      <span className="text-yellow-400">for Long-Term Investors</span>
    </h1>

    {points.map((point, i) => (
      <div key={i} className="flex gap-[clamp(0.5rem,1vw,0.875rem)] items-center">
        <div className="shrink-0 w-[clamp(1.25rem,1.8vw,1.6rem)] h-[clamp(1.25rem,1.8vw,1.6rem)] rounded-full border border-yellow-500/60 flex items-center justify-center">
          <span className="text-yellow-400 text-[clamp(0.55rem,0.8vw,0.7rem)] font-semibold">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="text-white font-medium text-[clamp(0.1rem,1.1vw,1.25rem)] leading-snug">
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
      <div className="relative w-full aspect-[3/1] hidden lg:block">
        <Image src={img1} alt="WestWyn Estate" fill className="object-cover" priority />

        {/* Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/30 to-black/70" />

        {/* Left: Points | Right: Form */}
        <div className="absolute inset-0 z-20 flex items-center justify-between max-w-7xl mx-auto px-[clamp(1.5rem,5vw,5rem)]">
          <PointsList />
          <FormCard />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="relative w-full aspect-[5/4]">
          <Image src={img2} alt="WestWyn Estate" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Points */}
        <div className="bg-black px-4 py-6 flex flex-col gap-4 border-b border-yellow-600/20">
          {points.map((point, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full border border-yellow-500/60 flex items-center justify-center">
                <span className="text-yellow-400 text-[0.6rem] font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm leading-snug">{point.title}</p>
                <p className="text-white/45 text-xs leading-relaxed mt-0.5">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Form */}
        <div className="bg-black px-4 py-5">
          <FormCard />
        </div>
      </div>
    </div>
  );
}