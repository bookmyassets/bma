"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BMAimage from "@/assests/BMA.webp";
import LeadForm from "../components/LeadForm";

export default function BMA() {
  // Counter states for new section 3
  const [partners, setPartners] = useState(0);
  const [plots, setPlots] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const partnersInterval = setInterval(() => {
              setPartners((prev) => {
                if (prev >= 50) {
                  clearInterval(partnersInterval);
                  return 50;
                }
                return prev + 1;
              });
            }, 3);

            const plotsInterval = setInterval(() => {
              setPlots((prev) => {
                if (prev >= 1000) {
                  clearInterval(plotsInterval);
                  return 1000;
                }
                return prev + 10;
              });
            }, 2);

            const customersInterval = setInterval(() => {
              setCustomers((prev) => {
                if (prev >= 400) {
                  clearInterval(customersInterval);
                  return 400;
                }
                return prev + 5;
              });
            }, 3);

            const projects = setInterval(() => {
              setProjects((prev) => {
                if (prev >= 5) {
                  clearInterval(projects);
                  return 5;
                }
                return prev + 1;
              });
            }, 25);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const countersSection = document.getElementById("counters-section");
    if (countersSection) {
      observer.observe(countersSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f9f9f9] ">
      <div className="flex flex-col pt-8 md:pt-20 md:flex-row px-4 md:px-8 py-12 gap-6 md:gap-12 max-w-7xl mx-auto overflow-hidden">
        {/* Left Section (40%) */}
        <div className="w-full md:w-2/5 pl-2 pr-2">
          <h1 className="text-xl font-semibold text-black ">Why Invest With</h1>
          <h2 className="text-[32px] font-semibold text-[#deae3c]">
            BookMyAssets
          </h2>
          <Image src={BMAimage} alt="BMA" className="pt-8" />
        </div>

        {/* Right Section (50%) */}
        <div className="w-full md:w-3/5 pl-2 pr-2 space-y-2">
          <div className="">
            <p className="text-lg mb-2 "></p>
            <p className="text-gray-600 ">
              BookMyAssets offers unmatched expertise and legally verified
              opportunities in the Dholera smart city, India’s most ambitious
              smart city development. With prime plots in the rapidly growing
              Dholera city, we provide secure investments backed by government
              support, world class infrastructure, and high future appreciation
              potential. We are proud to be part of Dholera’s growth story with
              over 6 successful project units delivered. At BookMyAssets, our
              focus is on building trust driven investments and establishing
              ourselves as the most reliable brand in real estate through our
              strong ecosystem — Truliyo Digital, BMA Developers, BMA Allied
              Services, and our extensive BMA Channel Partners network.
            </p>
          </div>

          <div id="counters-section" className="py-4">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      
      {/* Counter Item */}
      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        <div className="text-[24px] font-bold text-[#deae3c] mb-2">
          1 Lakh
        </div>
        <p className="text-sm md:text-base text-gray-700 font-medium text-center">
          sq. yards Sold
        </p>
      </div>

      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        <div className="text-[24px] font-bold text-[#deae3c] mb-2">
          1000
        </div>
        <p className="text-sm md:text-base text-gray-700 font-medium text-center">
          Plots Sold
        </p>
      </div>

      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        <div className="text-[24px] font-bold text-[#deae3c] mb-2">
          400
        </div>
        <p className="text-sm md:text-base text-gray-700 font-medium text-center">
          Happy Customers
        </p>
      </div>

      <div className="flex flex-col justify-center items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        <div className="text-[24px] font-bold text-[#deae3c] mb-2">
          7
        </div>
        <p className="text-sm md:text-base text-gray-700 font-medium text-center">
          Total Residential Projects
        </p>
      </div>
    </div>
    </div>
  </div>
</div>


          <div className="pt-4 max-sm:flex max-sm:justify-center max-sm:items-center">
            <Link
              href="/about"
              className="bg-[#deae3c] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f3bb39] transition duration-300 shadow-md"
            >
              About BMA
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="space-y-4">
        <p className="text-3xl text-center font-semibold"><span className="text-[#deae3c]">Dholera</span> in Motion See India's Smart City Revolution Live</p>
        <p className="text-center text-lg">Witness real-time progress in the dholera smart city project, where infrastructure like the ABCD Building Dholera and industrial zones are developing rapidly. </p>
      </div> */}
      <LeadForm/>
    </div>
  );
}
