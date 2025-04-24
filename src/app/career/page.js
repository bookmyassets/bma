import Link from 'next/link';
import React from 'react';
import Posting from './job-opening/page';

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
  const canonicalUrl = `https://www.bookmyassets.com/career`
  return (
    <>
    <link rel="canonical" href={canonicalUrl}/>
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <header className="bg-black text-white py-6 border-b-4" style={{borderColor: '#d9b244'}}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Book <span style={{color: '#d9b244'}}>My Assets</span>
          </h1>
          <p className="text-lg italic">Your gateway to a smarter future in real estate</p>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-black text-white py-20">
        <div className="absolute inset-0 opacity-50 bg-black">
          {/* Background image placeholder */}
          <div className="w-full h-full bg-gray-800"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Careers at Book My Assets</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Your gateway to a smarter future in real estate. Join one of the fastest-growing
            groups within the real estate market specializing in Dholera Smart City investments.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Why Work With Us Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-6 pb-2 inline-block relative">
            Why Work with Book My Assets?
            <span className="absolute bottom-0 left-0 w-20 h-1" style={{backgroundColor: '#d9b244'}}></span>
          </h3>
          <p className="mb-8 text-lg">
            <strong>Book My Assets</strong> is not simply an estate portal - we're a brand built upon trust,
            creativity, and potential. Our team is focused on helping investors identify the finest plots 
            available in Dholera while offering unmatched services and market information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300" 
                 style={{borderColor: '#d9b244'}}>
              <div className="text-4xl mb-4" style={{color: '#d9b244'}}>
                <i className="fas fa-users"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Expert Collaboration</h4>
              <p>Work with highly experienced professionals in real estate and digital marketing</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                 style={{borderColor: '#d9b244'}}>
              <div className="text-4xl mb-4" style={{color: '#d9b244'}}>
                <i className="fas fa-city"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Leading Development</h4>
              <p>At Dholera Smart City Development, we pride ourselves on leading its development</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                 style={{borderColor: '#d9b244'}}>
              <div className="text-4xl mb-4" style={{color: '#d9b244'}}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Skill Development</h4>
              <p>Build and expand your skillset in an atmosphere conducive to learning in performance-driven environments</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md border-b-4 hover:translate-y-[-8px] transition-transform duration-300"
                 style={{borderColor: '#d9b244'}}>
              <div className="text-4xl mb-4" style={{color: '#d9b244'}}>
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4 className="text-xl font-bold mb-3">Shape the Future</h4>
              <p>Contribute directly to shaping the future of real estate investment</p>
            </div>
          </div>
        </section>

        {/* Who Are We Looking For Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-6 pb-2 inline-block relative">
            Who Are We Looking For?
            <span className="absolute bottom-0 left-0 w-20 h-1" style={{backgroundColor: '#d9b244'}}></span>
          </h3>
          <p className="mb-6 text-lg">
            At <strong>Book My Assets</strong>, we're always on the lookout for dynamic, passionate, and innovative 
            individuals who want to change the world. No matter if your expertise lies in real estate sales, 
            content writing, digital marketing, customer support, or back office operations, 
            <strong> Book My Assets</strong> can give you the chance to build a career!
          </p>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-6 pb-2 inline-block relative">
            What Sets Us Apart?
            <span className="absolute bottom-0 left-0 w-20 h-1" style={{backgroundColor: '#d9b244'}}></span>
          </h3>
          <p className="text-lg">
            <strong>Book My Assets</strong> isn't your average real estate agency - our expertise lies in 
            providing clean titles approved by the government, plots with lasting value for our clients. 
            Joining our staff means representing an organization dedicated to ethical business practices, 
            a growth-minded mindset, and a strong online presence.
          </p>
          <p className="text-lg mt-4">
            We believe in building communities, so our primary objective is to help our users meet their 
            goals and realize their dreams.
          </p>
        </section>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h3>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Be part of a company that's redefining the future of real estate investment in India's 
            premier smart cities.
          </p>
          <Link
          href="/career/job-opening"
          className="px-8 py-3 rounded text-lg font-bold text-black hover:bg-black hover:text-gold border-2 transition-colors duration-300"
                  style={{backgroundColor: '#d9b244', borderColor: '#d9b244'}}>
            Apply Today
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default CareersPage;