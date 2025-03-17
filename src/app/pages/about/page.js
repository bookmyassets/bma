"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "@/assests/abtUs.jpg";
import Footer from "@/app/components/Footer";
import Link from "next/link";


const RealEstateLandingPage = () => {
  const [counts, setCounts] = useState({
    partners: 0,
    properties: 0,
    customers: 0,
  });

  const targets = {
    partners: 50,
    properties: 100,
    customers: 500,
  };

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 50; // Number of steps to reach the target
    const interval = duration / steps;

    const incrementCounter = (key, target, step) => {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [key]: Math.min(Math.ceil((target * step) / steps), target),
      }));
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      incrementCounter("partners", targets.partners, currentStep);
      incrementCounter("properties", targets.properties, currentStep);
      incrementCounter("customers", targets.customers, currentStep);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-black text-white">
        <div className="container  mx-auto py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full mt-28 md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Real Estate Properties
              </h1>
              <div className="flex items-center mb-8">
                <div className="w-24 h-1 bg-gray-500"></div>
                <div className="mx-2 text-yellow-500">★</div>
                <div className="w-24 h-1 bg-gray-500"></div>
              </div>

              <p className="mb-6 text-lg">
                BookMyassets endeavor to provides the best quality service for
                its customers to make maximum profits.
              </p>

              <p className="mb-6 text-lg">
                A team with a good understanding of the real estate market keeps
                on learning new trends & innovations in the field.
              </p>

              <p className="mb-6 text-lg">
                Our ultimate goal is to keep our customers happy by providing
                the best property in their budget.
              </p>

              <button className="bg-white text-black py-4 px-8 font-bold hover:bg-gray-200 transition-colors">
                <Link href="/pages/contact">
                  Contact Us
                </Link>
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="rounded-lg mt-28 overflow-hidden shadow-xl">
                <Image
                  src={img}
                  alt="Painted Ladies Victorian houses in San Francisco"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800">
                Our Milestones
              </h2>
              <div className="flex items-center justify-center mt-2">
                <div className="w-16 h-px bg-gray-300"></div>
                <div className="mx-2 text-yellow-500">★</div>
                <div className="w-16 h-px bg-gray-300"></div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-0">
              <div className="w-full md:w-1/3 text-center px-4">
                <div className="text-6xl font-bold text-gray-900">
                  {counts.partners}+
                </div>
                <div className="text-lg text-gray-600 mt-2">Partners</div>
              </div>

              <div className="w-full md:w-1/3 text-center px-4">
                <div className="text-6xl font-bold text-gray-900">
                  {counts.properties}+
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  Premium Properties
                </div>
              </div>

              <div className="w-full md:w-1/3 text-center px-4">
                <div className="text-6xl font-bold text-gray-900">
                  {counts.customers}+
                </div>
                <div className="text-lg text-gray-600 mt-2">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default RealEstateLandingPage;
