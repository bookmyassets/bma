'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function HomeSlider({ img1, img2, img3 }) {
  return (
    <div className="relative w-full h-screen">
      {/* Swiper for images */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {[img1, img2, img3].map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              <Image 
                src={img} 
                alt={`Slide ${index + 1}`} 
                fill 
                className="object-cover"
                priority={index === 0} // Optimize first image load
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Static Text and Button Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 bg-opacity-50 text-white text-center px-8 z-10">
        <h1 className="text-5xl font-bold mt-4">
          Your Perfect Investment Opportunity Awaits
        </h1>
        <p className="text-lg mt-8 max-w-4xl">
          BookMyAssets™ is the preferred real estate IPA (Indian Property Associate) 
          of Gurgaon for commercial and residential spaces with the perfect investment 
          opportunity and excellent service.
        </p>
        <button className="hover:bg-white hover:transition-transform hover:text-black animate-pulse bg-amber-400 hover:pl-8 hover:pr-8 text-white text-xl font-thin p-5 mt-10">
          <Link href="/pages/contact">
            Enquire Now
          </Link>
        </button>
      </div>
    </div>
  );
}
