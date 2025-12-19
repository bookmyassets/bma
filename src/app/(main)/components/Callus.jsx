import Link from 'next/link'
import React from 'react'
import { Phone } from "lucide-react";

export default function ContactNow() {
  return (
    <div>
        <div className="fixed bottom-8 right-8 z-50 max-md:hidden">
          <button className="bg-[#B3000C] hover:bg-[#99000a] text-white p-4 rounded-full shadow-lg flex items-center">
            <Phone className="mr-2" />{" "}
            <Link href="https://wa.me/918130371647" className="hidden md:inline">Contact Now</Link>
          </button>
        </div>
    </div>
  )
}