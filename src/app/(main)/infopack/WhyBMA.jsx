import React from "react";
import { FaCheck, FaCheckCircle, FaCheckDouble } from "react-icons/fa";

export default function () {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-4 md:space-y-8 h-full p-4">
        <div
          id="counters-section"
          className="bg-amber-100 rounded-2xl overflow-hidden shadow-lg h-full"
        >
          <p className="text-black text-center text-[32px] py-4 font-semibold">
            Why Choose BookMyAssets?
          </p>

          <div className="p-4 md:p-8">
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
                  className={`flex flex-col w-auto items-center justify-center text-center p-6 bg-white rounded-xl min-h-[100px]
      ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                >
                  <div className="text-xl flex justify-center items-center md:text-2xl font-bold text-black leading-tight mb-2">
                    
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
