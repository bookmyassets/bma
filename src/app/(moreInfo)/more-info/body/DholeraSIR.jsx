import React from "react";
import ProjectsSection from "./MajorProjects";
import abcd from "@/assests/ad-page/abcd-building-dholera-about-section.webp";
import bma_dholera from "@/assests/ad-page/bookmyassets-dholera.webp";
import Image from "next/image";

export default function DholeraLandingPage() {
  return (
    <div className="min-h-screen bg-white" id="dholera">
      {/* Section 1: About Dholera */}
      <section className="grid md:grid-cols-2">
        <div className="bg-black text-white p-8 md:p-12 lg:p-16 flex items-center">
          <div className="max-w-2xl mx-auto">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#deae3c" }}
            >
              Dholera Smart City
            </h1>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Dholera Smart City is India’s first greenfield smart city,
                strategically positioned under the Delhi–Mumbai Industrial
                Corridor (DMIC). Located about 100 km from Ahmedabad, Dholera
                City is designed as a future-ready industrial and urban hub with
                world-class infrastructure, positioning it among the most
                ambitious examples of a smart city in Gujarat.
              </p>
              <p>
                Spanning 922.5 sq km, Dholera features planned industrial zones,
                100m-wide roads, underground utilities, renewable energy
                integration, and IoT-enabled smart governance. With major
                projects such as Dholera International Airport, Asia’s largest
                Solar Park, and multiple industrial activation areas underway,
                this Dholera Smart City update highlights why the region is
                viewed as India’s most promising emerging city for sustainable
                growth and industrial development.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-100 p-8">
          <Image
            src={abcd}
            alt="Dholera Smart City"
            className="w-full max-w-md rounded-xl h-auto object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* Section 2: Major Companies & Projects */}
      <section>
        <ProjectsSection />
      </section>
    </div>
  );
}
