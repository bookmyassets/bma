"use client"
import React from "react";

const DholeraInvestment = () => {
  // Custom color scheme
  const colors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21",
    white: "#FFFFFF",
    lightGold: "#FFF9E6",
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Why Choose <span className="text-[#FDB913]">Book My Assets</span> for Investment in Dholera Smart City?
          </h1>
          <div className="w-32 h-1.5 mx-auto mb-8 bg-gradient-to-r from-[#C69C21] to-[#FDB913] rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Discover unparalleled opportunities in India's largest Greenfield smart city project, 
            spanning 900 sq. km of transformative development in Gujarat.
          </p>
        </div>

        {/* Introduction Section */}
        <section className="mb-16 bg-white rounded-xl shadow-md p-8 md:p-10">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              We are here to tell you why to choose Book My Assets for your
              investment in Dholera Smart City and what we are offering you. So,
              before we move forward to tell you the reason and benefit of choosing
              us, let's first of all know what this project is about.
            </p>
            <p>
              The Dholera Smart City is going to be one of the largest Greenfield
              smart cities in India, covering 900 sq. km. It is all set to be the
              next prime location and global manufacturing hub of Gujarat. It
              delivers many things, including smart infrastructure, sustainable
              development, retail area zones, and green spaces.
            </p>
          </div>
        </section>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "An Introduction To Book My Assets",
              content: "We understand that the business of India has just been initiated. Therefore, we spend noticeable time and energy considering the needs and demands of the future. It means we deliver land with a vision of what tomorrow needs today."
            },
            {
              title: "Re-sale Support Team",
              content: "If you want to invest in Dholera Smart City with Book My Assets, we assure you of our assistance at every stage. Our support team will not only help you at the time of purchase but also support you in re-selling your plot at the best price whenever you wish to."
            },
            {
              title: "Best Price Plots in Prime Locations",
              content: "We will make sure your investment in Dholera Smart City is beneficial by providing you with plots at the best price in prime locations. We ensure that our buyers get everything they expect, from suitable locations to competitive pricing."
            },
            {
              title: "Expert Team with Updated Insights",
              content: "Investing can be stressful due to many questions like where and how to invest. Investing in Dholera Smart City with us will lower your stress as our expert team provides complete updates about Dholera and its status, along with guidance."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#FDB913]"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#C69C21]">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-gradient-to-r from-[#C69C21] to-[#FDB913] rounded-xl shadow-lg mb-16 overflow-hidden">
          <div className="p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Timely Project Deliveries with Proven Success</h2>
            <p className="text-lg mb-8 max-w-3xl">
              Investing with us in the Dholera project will not disappoint you, as
              we have delivered projects timely with guaranteed success. Our track
              record includes successfully sold-out projects like:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Paradise 1 & 2", "Pride 1, 2, & 3", "Marina", "Maple", "Orchid", "WestWyn County"].map((project, i) => (
                <div 
                  key={i}
                  className="bg-white/90 p-4 rounded-lg text-center font-bold text-[#C69C21] transition-transform hover:scale-105"
                >
                  {project}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl shadow-md p-10 mb-16 border-l-4 border-[#FDB913]">
          <h2 className="text-3xl font-bold mb-6 text-[#C69C21]">Register-Ready Plots for a Secure Investment</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We provide register-ready plots, ensuring a secure investment. Our
            variety of investment options includes residential plots and more. We
            follow the policy of N.A. NOC, allowing you to receive title clearance
            before moving to your property.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#C69C21] to-[#FDB913] rounded-xl shadow-xl overflow-hidden">
          <div className="p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Your Gateway to Smart City Investment</h2>
            <div className="prose prose-lg text-white/90 mb-8">
              <p>
                These factors explain why you should invest in Dholera Smart City with
                us. We provide premium residential plots in prime locations at great
                prices, following the N.A. NOC Title Clearance policy. The Dholera
                project delivers smart infrastructure, sustainable growth, commercial
                area zones, green spaces, and government support. Your satisfaction is
                our ultimate aim.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
              <div className="text-xl font-medium">
                Ready to explore your investment opportunities?
              </div>
              <a
                href="tel:+918130371647"
                className="bg-white text-[#C69C21] font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap"
              >
                Call +91 81 3037 1647
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DholeraInvestment;