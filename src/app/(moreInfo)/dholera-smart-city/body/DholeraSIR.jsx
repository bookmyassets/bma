import React from "react";
import ProjectsSection from "./MajorProjects";
import abcd from "@/assests/dholera-smart-city-bookmyassets.webp";
import Image from "next/image";

export default function DholeraLandingPage() {
  return (
    <div className="bg-white text-slate-900" id="dholera">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div className="grid items-center gap-5 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-bold leading-tight text-slate-900 md:text-3xl lg:text-4xl">
                Dholera Smart City
              </h1>
              <div className="space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                <p>
                  Dholera Smart City is India's first greenfield smart city,
                  strategically positioned under the Delhi–Mumbai Industrial
                  Corridor (DMIC). Located about 100 km from Ahmedabad, Dholera
                  City is designed as a future-ready industrial and urban hub with
                  world-class infrastructure, positioning it among the most
                  ambitious examples of a smart city in Gujarat.
                </p>
                <p>
                  Spanning 920 sq km, Dholera features planned industrial zones,
                  100m-wide roads, underground utilities, renewable energy
                  integration, and IoT-enabled smart governance. With major
                  projects such as Dholera International Airport, Asia's largest
                  Solar Park, and multiple industrial activation areas underway,
                  this Dholera Smart City update highlights why the region is
                  viewed as India's most promising emerging city for sustainable
                  growth and industrial development.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
            <Image
              src={abcd}
              alt="Dholera Smart City"
              className="aspect-[2/1] w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
