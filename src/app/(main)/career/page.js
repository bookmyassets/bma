import Link from "next/link";
import React from "react";
import Posting from "./job-opening/page";

export async function generateMetadata() {
  return {
    title: "Careers at BookMyAssets | Join Our Innovative Real Estate Team",
    description:
      "Request your exclusive Info Pack from BookMyAssets to explore premium residential and commercial investment opportunities in Dholera Smart City. Get expert guidance and insights today.",
    keywords:
      "BookMyAssets careers, real estate jobs, Dholera Smart City careers, property investment jobs, real estate career opportunities, BookMyAssets recruitment.",
  };
}

const CareersPage = () => {
  const canonicalUrl = `https://www.bookmyassets.com/career`;
  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <div className="bg-white min-h-screen pt-20 font-sans">
        {/* Header */}

        {/* Hero Section */}
        <div className="relative bg-black text-white py-20">
          <div className="absolute inset-0 opacity-50 bg-black">
            {/* Background image placeholder */}
            <div className="w-full h-full bg-gray-800"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center space-y-8">
            <h2 className="text-4xl font-bold">Careers at Book My Assets</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Career Opportunities at Book My Assets: Grow with India’s Leading Real Estate Innovators

            </p>
            <div className="mt-8">
              <Link
                href="/career/job-opening"
                className="px-8 py-3 rounded text-lg font-bold text-black hover:bg-black hover:text-gold border-2 transition-colors duration-300"
                style={{ backgroundColor: "#d9b244", borderColor: "#d9b244" }}
              >
                Apply Today
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Why Work With Us Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold mb-6 pb-2 inline-block relative">
             Why Build Your Career at Book My Assets?

              <span
                className="absolute bottom-0 left-0 w-20 h-1"
                style={{ backgroundColor: "#d9b244" }}
              ></span>
            </h3>
            <p className="mb-8 text-lg">
              We are more than a real estate platform – we are visionaries
              creating India's smart investment future. At Book My Assets, we
              combine industry expertise with innovative thinking to deliver
              exceptional value in Dholera's booming property market.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                style={{ borderColor: "#d9b244" }}
              >
                <div className="text-4xl mb-4" style={{ color: "#d9b244" }}>
                  <i className="fas fa-users"></i>
                </div>
                <h4 className="text-xl font-bold mb-3">Expert Collaboration</h4>
                <p>
                  Work with highly experienced professionals in real estate and
                  digital marketing
                </p>
              </div>

              <div
                className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                style={{ borderColor: "#d9b244" }}
              >
                <div className="text-4xl mb-4" style={{ color: "#d9b244" }}>
                  <i className="fas fa-city"></i>
                </div>
                <h4 className="text-xl font-bold mb-3">Leading Development</h4>
                <p>
                  At Dholera Smart City Development, we pride ourselves on
                  leading its development
                </p>
              </div>

              <div
                className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                style={{ borderColor: "#d9b244" }}
              >
                <div className="text-4xl mb-4" style={{ color: "#d9b244" }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4 className="text-xl font-bold mb-3">Skill Development</h4>
                <p>
                  Build and expand your skillset in an atmosphere conducive to
                  learning in performance-driven environments
                </p>
              </div>

              <div
                className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                style={{ borderColor: "#d9b244" }}
              >
                <div className="text-4xl mb-4" style={{ color: "#d9b244" }}>
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h4 className="text-xl font-bold mb-3">Shape the Future</h4>
                <p>
                  Contribute directly to shaping the future of real estate
                  investment
                </p>
              </div>
            </div>
          </section>

          {/* Who Are We Looking For Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold mb-6 pb-2 inline-block relative">
              Who Are We Looking For?
              <span
                className="absolute bottom-0 left-0 w-20 h-1"
                style={{ backgroundColor: "#d9b244" }}
              ></span>
            </h3>
            <p className="mb-6 text-lg">
              At Book My Assets, we are always looking for dynamic, passionate,
              and forward-thinking professionals who are ready to make a real
              impact. Whether your skills are in real estate sales, content
              creation, digital marketing, customer support, or back-office
              operations, we offer you the platform to grow, learn, and succeed.
              Join India’s fastest-growing real estate brand specializing in
              Dholera Smart City investments and build a rewarding career with
              endless opportunities.
            </p>
          </section>

          {/* What Sets Us Apart Section */}
          <section className="mb-16">
            <h3 className="text-3xl font-bold mb-6 pb-2 inline-block relative">
              What Makes Us Different

              <span
                className="absolute bottom-0 left-0 w-20 h-1"
                style={{ backgroundColor: "#d9b244" }}
              ></span>
            </h3>
            <p className="text-lg">
              At Book My Assets, we redefine real estate by offering more than
              just plots. We provide government-approved titles and lasting
              value with complete transparency. Unlike traditional agencies, we
              mix ethical business practices with a growth-focused approach.
              <br/>
              This ensures end-to-end assistance to every client with their
              investment. But we are not only about transactions; we focus on
              building communities and making dreams come true. When you join
              our team, you become part of a progressive movement that
              prioritizes trust, innovation, and real impact.
            </p>
          </section>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h3>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Be part of a company that's redefining the future of real estate
              investment in India's premier smart cities.
            </p>
            <Link
              href="/career/job-opening"
              className="px-8 py-3 rounded text-lg font-bold text-black hover:bg-black hover:text-gold border-2 transition-colors duration-300"
              style={{ backgroundColor: "#d9b244", borderColor: "#d9b244" }}
            >
              Apply Today
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;
