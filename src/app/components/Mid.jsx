import Image from "next/image";
import React from "react";
import img from "@/assests/BmaInvest.webp";
import Link from "next/link";

export default function Mid() {
  return (
    <div className="bg-black">
        
    <div className="m-10 py-10 md:flex justify-center items-center gap-20 md:flex-row-reverse">
      {/* Image Section */}
      <div>
        <Image src={img} alt="mid section" className="w-[490px] h-[290px]" />
      </div>

      {/* Text Content Section */}
      <div className="text-center md:text-left">
        <p className="md:text-6xl max-sm:mt-7 text-2xl text-white font-bold">Looking For Investments</p>

        {/* First Golden Line with Star */}
        <div className="relative mt-2 flex items-center justify-center ">
          <div className="h-[2px] w-56 bg-[#FDB913]"></div>
          <span className="mx-2 text-[#FDB913] text-xl">★</span>
          <div className="h-[2px] w-56 bg-[#FDB913]"></div>
        </div>

        {/* Second Golden Line (Extra One) */}
        <div className="relative mt-2 flex items-center justify-center ">
          <div className="h-[2px] w-40 bg-[#FDB913]"></div>
          
          <div className="h-[2px] w-40 bg-[#FDB913]"></div>
        </div>

        {/* Description Text */}
        <p className="text-white text-center mt-5 text-xl">
          Finding the most profitable, secure, and luxurious real estate
          investment can be <br className="hidden md:block" /> challenging, but with us, it’s seamless and rewarding.
        </p>

        {/* Enquire Now Button */}
        <div className="flex justify-center items-center mt-10">
          <button className="text-white bg-[#FDB913] p-5 text-2xl pr-12 pl-12 rounded-md hover:bg-yellow-500 transition-all duration-300">
            <Link href="/pages/properties">
            Explore More
            </Link>
          </button>
        </div>
    </div>
      </div>
    </div>
  );
}
