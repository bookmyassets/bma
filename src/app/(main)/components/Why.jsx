import Image from "next/image";
import img from "@/assests/BMAfaq.webp"

const WhyChooseSection = () => {
    return (
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Properties</h2>
            <div className="flex items-center justify-center">
              <div className="w-24 h-0.5 bg-gray-400"></div>
              <div className="mx-2">
                <svg className="w-6 h-6 text-[#d6b873] fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="w-24 h-0.5 bg-gray-400"></div>
            </div>
          </div>
  
          {/* Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Benefits List */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#d6b873] flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl max-sm:text-xl font-bold text-[#d6b873]">NA, NOC, TITLE CLEAR PROJECT</h3>
                  <div className="mt-2 h-0.5 w-full bg-[#d6b873]/30"></div>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#d6b873] flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl max-sm:text-xl font-bold text-[#d6b873]">PRIME & STRATEGIC LOCATION</h3>
                  <div className="mt-2 h-0.5 w-full bg-[#d6b873]/30"></div>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#d6b873] flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl max-sm:text-xl font-bold text-[#d6b873]">IMMEDIATE SALEDEED REGISTRATION</h3>
                  <div className="mt-2 h-0.5 w-full bg-[#d6b873]/30"></div>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#d6b873] flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl max-sm:text-xl font-bold text-[#d6b873]">WORKING IN MORE THAN ONE SECTOR</h3>
                  <div className="mt-2 h-0.5 w-full bg-[#d6b873]/30"></div>
                </div>
              </div>
            </div>
  
            {/* Right side - Illustration */}
            <div className="w-full md:w-1/2">
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-50"></div>
                <div className="absolute top-16 right-16 w-2 h-2 bg-white rounded-full opacity-50"></div>
                <div className="absolute bottom-16 left-4 w-2 h-2 bg-white rounded-full opacity-50"></div>
                
                {/* Decorative curved lines */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white rounded-tl-full opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white rounded-br-full opacity-20"></div>
                
                <div className="flex flex-col items-center justify-center">
                  {/* Illustration */}
                  <div className="mb-4">
                    <Image
                        src={img}
                        alt="faq"
                    />
                  </div>

                  
                  {/* Logo */}
                  <div className="mt-4">
                    <div className="w-12 h-12 text-[#d6b873]">
                      <svg viewBox="0 0 40 40" fill="currentColor">
                        <path d="M20 5L5 15V35H35V15L20 5Z" stroke="currentColor" fill="none" strokeWidth="2" />
                        <path d="M15 20H25V35H15V20Z" stroke="currentColor" fill="none" strokeWidth="2" />
                        <path d="M15 15H25V20H15V15Z" stroke="currentColor" fill="none" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default WhyChooseSection;