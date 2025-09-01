"use client";
import { useState } from "react";
import ChannelPartnerForm from "./channelPartnerForm";

import Image from "next/image";

export default function ChannelPartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div className="absolute inset-0 ">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "black" }}
          ></div>
        </div>
        <div className="container mx-auto px-6 pt-10 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Become a{" "}
                <span style={{ color: "#deae3c" }}>Channel Partner</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Join BookMyAssets and unlock premium opportunities in Dholera
                Smart City with guaranteed commissions and full support.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Guaranteed Commissions
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Registry Ready Inventory
                  </span>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold text-white">
                    ✓ Full Support
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className="rounded-2xl p-8 text-center shadow-2xl"
              style={{ backgroundColor: "#deae3c" }}
            >
              <div className="text-6xl mb-4">🤝</div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "#0d0d0d" }}
              >
                Channel Partner
              </h3>
              <p style={{ color: "#0d0d0d" }} className="opacity-80">
                Premium Partnership Program
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Why Partner Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "#0d0d0d" }}
                >
                  Why Partner with BookMyAssets?
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Selling plots in Dholera Smart City has often been a challenge
                  for brokers due to unreliable developers, delayed commissions
                  and unclear paperwork, resulting in clients losing trust. At
                  BookMyAssets, we are changing that. We bring a broker first
                  culture with transparent processes, verified inventory, and
                  on time commissions. So you can focus on closing sales without
                  the setbacks.
                </p>
              </div>

              {/* What We Offer Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2
                  className="text-3xl font-bold mb-8"
                  style={{ color: "#0d0d0d" }}
                >
                  What We Offer Our Partners
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#deae3c", opacity: 1 }}
                    >
                      <div className="w-6 h-6" style={{ color: "#0d0d0d" }}>
                        📋
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#0d0d0d" }}
                      >
                        White Labeled Sales Kit
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Ready-to-use brochures, videos, pitch decks, and site
                        tours customized for your brand.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#deae3c", opacity: 1 }}
                    >
                      <div className="w-6 h-6" style={{ color: "#0d0d0d" }}>
                        ✅
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#0d0d0d" }}
                      >
                        Registry Ready Inventory
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Verified titles, AUDA approvals, NA/NOC clearance, and
                        clean paperwork.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#deae3c", opacity: 1 }}
                    >
                      <div className="w-6 h-6" style={{ color: "#0d0d0d" }}>
                        🎧
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#0d0d0d" }}
                      >
                        Dedicated Support Team
                      </h3>
                      <p className="text-gray-600 text-sm">
                        From legal assistance to site visits, we handle the
                        backend so you can focus on clients.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#deae3c", opacity: 1 }}
                    >
                      <div className="w-6 h-6" style={{ color: "#0d0d0d" }}>
                        💰
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#0d0d0d" }}
                      >
                        Broker First Culture
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Zero favoritism, no politics, and guaranteed commissions
                        paid on time, every time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 md:col-span-2">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#deae3c", opacity: 1 }}
                    >
                      <div className="w-6 h-6" style={{ color: "#0d0d0d" }}>
                        🎓
                      </div>
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2"
                        style={{ color: "#0d0d0d" }}
                      >
                        Training and Onboarding
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Regular updates, sales training, and  insider knowledge <br/>
                        to help you close faster.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About WestWyn County Section */}
              <div
                className="bg-white p-8 rounded-xl shadow-lg border"
                style={{ borderColor: "#deae3c", borderWidth: "1px" }}
              >
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "#0d0d0d" }}
                >
                  About WestWyn County – Your Premium Offering
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Our flagship project, WestWyn County is a premium AUDA
                  approved plotted development in Dholera SIR, strategically
                  located on the Fedra to Pipli Highway (100 ft Road).
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#deae3c" }}
                    ></div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#0d0d0d" }}
                      >
                        Prime Location
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Direct entry from State Highway, minutes from Expressway
                        and International Airport.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#deae3c" }}
                    ></div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#0d0d0d" }}
                      >
                        Secure Gated Community
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Boundary wall, clear plot demarcation, and internal
                        infrastructure.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#deae3c" }}
                    ></div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#0d0d0d" }}
                      >
                        Exclusive Inventory
                      </h4>
                      <p className="text-gray-600 text-sm">
                        130 premium plots ranging from 150 to 325 sq. yards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: "#deae3c" }}
                    ></div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: "#0d0d0d" }}
                      >
                        Legal Assurance
                      </h4>
                      <p className="text-gray-600 text-sm">
                        AUDA Approved, NA/NOC obtained, 100% title clear.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who Can Join Section */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "#0d0d0d" }}
                >
                  Who Can Join Us?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Our Channel Partner Program is designed for professionals and
                  businesses who want to grow with BookMyAssets while offering
                  clients transparent and profitable investments in Dholera
                  Smart City.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#0d0d0d" }}
                    >
                      1
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#0d0d0d" }}
                      >
                        Real Estate Brokers & Agents
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Independent brokers looking for reliable projects and
                        timely commissions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#deae3c", color: "#0d0d0d" }}
                    >
                      2
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#0d0d0d" }}
                      >
                        Wealth Advisors & Financial Consultants
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Professionals who guide clients in safe, high-growth
                        investment options.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#0d0d0d" }}
                    >
                      3
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#0d0d0d" }}
                      >
                        NRIs & Overseas Consultants
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Those who want to connect international buyers to
                        legally approved plots in Dholera SIR.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#deae3c", color: "#0d0d0d" }}
                    >
                      4
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#0d0d0d" }}
                      >
                        Property Developers & Firms
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Businesses interested in expanding into Dholera
                        residential plots and premium projects.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div
                      className="text-white p-2 rounded-lg text-sm font-bold"
                      style={{ backgroundColor: "#0d0d0d" }}
                    >
                      5
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#0d0d0d" }}
                      >
                        Influencers & Business Networks
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Anyone with a strong client base who can recommend
                        trusted real estate opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-1">
              <ChannelPartnerForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
