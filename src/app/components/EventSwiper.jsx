'use client';
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { urlFor } from "@/sanity/lib/image";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function EventSwiper({ events }) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-full pt-20"
    >
      {events.map((event) => {
        const imageUrl = event.mainImage ? 
          urlFor(event.mainImage).width(1920).height(1080).url() : 
          null;
        
        return (
          <SwiperSlide key={event._id} className="relative top-28">
            <div className="absolute inset-0 bg-gray-200">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={event.title || "Event image"}
                  fill
                  className=""
                  priority
                />
              )}
            </div>
            <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
              <div className="max-w-3xl px-4">
        {/*         <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
                <p className="text-xl mb-6">{event.description}</p> */}
                <Link 
                  href={`/events/${event.slug?.current}`} 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  View Event Details
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}