import React from "react";
import { FaCheck, FaCheckCircle, FaCheckDouble } from "react-icons/fa";

export default function () {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-3 h-full px-4 py-[clamp(1rem,2vw,1.75rem)]">
        <div
          id="counters-section"
          className="bg-black/90 rounded-2xl overflow-hidden shadow-lg h-full"
        >
          <p className="text-white text-center text-[clamp(1.5rem,3vw,2.25rem)] py-3 font-semibold leading-[1.15]">
            Our Commitments
          </p>

          <div className="p-4 md:p-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { value: "NA/NOC/Title Clearance", label: "Total Land Parcel" },
                { value: "Immediate Registry", label: "Total Units" },
                {
                  value: "365 Days Site Visit Assitance",
                  label: "Plot Sizes",
                },
                { value: <>ReSale <br /> Support</>, label: "Starting Price" },
                { value: "BuyBack Assistance", label: "Returns In 5 years" },
              ].map(({ value }, i) => (
                <div
                  key={i}
                  className={`flex flex-col w-auto items-center justify-center text-center p-4 bg-white/15 rounded-xl min-h-[5.5rem]
      ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <div className="text-[clamp(0.95rem,1.4vw,1.125rem)] flex justify-center items-center font-bold text-[#ddbc69] leading-tight mb-2">
                    
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

