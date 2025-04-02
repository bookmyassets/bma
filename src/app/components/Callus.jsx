import Link from 'next/link'
import React from 'react'
import { Phone } from "lucide-react";

export default function ContactNow() {
  return (
    <div>
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-full shadow-lg flex items-center">
            <Phone className="mr-2" />{" "}
            <Link href="https://wa.me/919717671112" className="hidden md:inline">Contact Now</Link>
          </button>
        </div>
    </div>
  )
}