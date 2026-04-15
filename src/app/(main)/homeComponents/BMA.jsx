import Link from "next/link";
import React from "react";
import LeadForm from "../components/LeadForm";
import { FileCheck, MapPinned, FileSearch, Headset } from "lucide-react";

const COUNTERS = [
  { value: "7+ Projects", label: "Successfully Sold Out" },
  { value: "2 Lakh+ Sq. Yd", label: "Dholera Land Sold" },
  { value: "957+ Plots", label: "Registry Delivered" },
  { value: "561+ Clients", label: "Investor Client Base" },
];

const POINTS = [
  {
    icon: FileCheck,
    title: "Verified Project Options",
    body: "We shortlist plotted opportunities after document-level review and location evaluation.",
  },
  {
    icon: MapPinned,
    title: "Location Clarity",
    body: "We help buyers understand project distance from the Dholera SIR boundary, key road links, and surrounding development zones.",
  },
  {
    icon: FileSearch,
    title: "Documentation Support",
    body: "We guide buyers on layout review, title-related checks, registry steps, and the practical buying process.",
  },
  {
    icon: Headset,
    title: "Consultation Support",
    body: "Our team assists investors from Gurugram, Noida, Delhi NCR, and other cities who want to evaluate Dholera without guesswork.",
  },
];

export default function BMA() {
  return (
    <div className="bg-[#f9f9f9]">
      <div
        className="
          flex flex-col md:flex-row
          px-[calc(1rem+2vw)]
          py-[calc(2rem+2vw)]
          gap-6 md:gap-12
          max-w-7xl mx-auto overflow-hidden
        "
      >
        <div className="w-full space-y-2">
          <div className="space-y-2">
            <h2 className="text-[clamp(1rem,2vw,1.25rem)] md:text-[clamp(1.5rem,2vw,1.7rem)] font-semibold text-black">
              Why Invest With{" "}
              <span className="text-[clamp(1rem,2vw,1.25rem)] md:text-[clamp(1.5rem,2vw,1.7rem)] font-semibold text-[#deae3c]">
                BookMyAssets
              </span>
            </h2>
            <p className="text-sm">
              BookMyAssets helps you evaluate Dholera with clarity and
              confidence. We focus on verified plots, simple guidance, and clear
              project understanding before booking.
            </p>
          </div>

          {/* 4 Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POINTS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-3 bg-white rounded-xl p-[clamp(0.75rem,1.5vw,1rem)] shadow-sm border border-gray-100"
              >
                {/* Icon */}
                <Icon className="text-[#deae3c] text-[clamp(1.25rem,2vw,1.5rem)] shrink-0" />
                <div>
                  <p className="text-[clamp(0.875rem,1.4vw,1rem)] font-semibold text-black mb-0.5">
                    {title}
                  </p>
                  <p className="text-[clamp(0.8125rem,1.2vw,0.9375rem)] text-gray-500 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 max-sm:flex max-sm:justify-center max-sm:items-center">
            <Link
              href="/about"
              className="
                bg-[#deae3c] text-white
                px-[calc(1rem+1vw)] py-3
                rounded-md font-medium
                hover:bg-[#f3bb39] transition duration-300 shadow-md
                text-[clamp(0.875rem,1.5vw,1rem)]
              "
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-center max-w-4xl mx-auto font-semibold text-xl md:text-3xl">
          Dholera's Strongest Track Record
        </p>
        {/* Counters */}
        <div className="py-4">
          <div className="px-[calc(0.5rem+1vw)] max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[calc(0.75rem+0.5vw)]">
              {COUNTERS.map(({ value, label }) => (
                <div
                  key={label}
                  className="
                    flex flex-col justify-center items-center
                    p-[calc(0.75rem+0.2vw)]
                    bg-white rounded-2xl shadow-md
                    hover:shadow-xl transition-shadow
                  "
                >
                  <div className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#deae3c] mb-2">
                    {value}
                  </div>
                  <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-700 font-medium text-center">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LeadForm
        title="Want to Buy Plots in Dholera But Don't Know How?"
        button="Talk to an Expert"
      />
    </div>
  );
}