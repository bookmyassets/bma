import { CreditCard } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function page() {
  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 pt-48">
        <div className="bg-[#ddbc69]/20 rounded-full w-10 h-10 flex justify-center items-center my-4">
          <CreditCard className="text-[#ddbc69]" />
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-semibold">Pay Online</p>
          <p className="text-lg text-gray-600">Make a secure payment for your booking</p>
        </div>
        
        <div className="pt-12">
          <div className="border border-gray-200 rounded-xl p-6 md:p-8 max-w-2xl">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Project</p>
                <p className="text-2xl font-semibold">WestWyn Residency</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 font-medium">Receiving Company</p>
                <p className="text-lg font-medium">WestWyn Partner LLP</p>
              </div>
              
              <div className="pt-2">
                <p className=" text-black">
                  Please verify the project and receiving company details before making the payment.
                </p>
                <p className=" text-black mt-1">
                  BookMyAssets is not responsible for payments made under the wrong project due to incorrect link usage.
                </p>
              </div>
              
              <div className="pt-4">
                <Link 
                  href="https://rzp.io/rzp/xQatjux"
                  className="inline-block bg-[#ddbc69] hover:bg-[#c9a85a] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Pay Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}