import React from "react";
import { Check } from "lucide-react";

const developmentItems = [
  "Land Cleaning",
  "Land Filling & Leveling",
  "Soil Testing",
  "Project Boundary Development",
  "Internal Road Development",
  "Plot Demarcation",
  "Drainage System",
  "Mechanical, Electrical & Plumbing (MEP) Work",
  "1.75 Lakh Litre Water Tank",
  "Tree Plantation & Landscape Preparation",
];

const nextPhaseItems = [
  "Villa Construction",
  "Power & Water Infrastructure",
  "Landscaped Parks",
  "EV Charging Stations",
  "Other Planned Community Amenities",
];

export default function DevelopmentProgress() {
  return (
    <section
      className="bg-[#fafafa] px-4 py-8 sm:px-6 sm:py-10"
      aria-labelledby="development-progress-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="gap-3  md:gap-8">
          <div>
            
            <h2
              id="development-progress-heading"
              className="text-2xl font-bold leading-tight text-slate-950 sm:text-3xl"
            >
              Current Development at WestWyn Estates
            </h2>
          </div>
          
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-x-5 border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-5">
          {developmentItems.map((item) => (
            <li
              key={item}
              className="flex min-h-16 items-center gap-2.5 border-b border-slate-200 py-3 text-base font-semibold leading-snug text-slate-700 last:border-b-0 lg:[&:nth-last-child(-n+5)]:border-b-0"
            >
              <Check
                className="h-5 w-5 shrink-0 text-[#b58f32]"
                strokeWidth={3}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 border-l-4 border-[#ddbc69] bg-[#f8f1df] px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <h3 className="text-xl font-bold text-slate-950 sm:text-2xl">
              What&apos;s Next?
            </h3>
            <p className="text-sm font-medium text-slate-600 sm:text-base">
              Planned next phase
            </p>
          </div>

          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
            {nextPhaseItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-base font-semibold leading-snug text-slate-800"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ddbc69] text-slate-950">
                  <Check
                    className="h-4 w-4"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </span>
                <span className="pt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
