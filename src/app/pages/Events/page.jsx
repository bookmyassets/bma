// app/pages/Events/page.jsx
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getblogs } from "@/sanity/lib/api";
import EventSwiper from '@/app/components/EventSwiper';

export default async function EventsPage() {
  const events = await getblogs();

  // Hero Carousel Events (first 3 events)
  const heroEvents = events.slice(0, 3);
  
  // Remaining Events Grid
  const gridEvents = events.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <div className="w-full h-[600px] relative">
        <EventSwiper events={heroEvents} />
      </div>

      {/* Events Grid Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {gridEvents.map((event) => (
            <div 
              key={event._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="relative h-56">
                <Image
                  src={urlFor(event.mainImage).width(500).height(300).url() || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.categories && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                      {event.categories[0]?.title || 'Event'}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                <Link 
                  href={`/events/${event.slug?.current}`} 
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}