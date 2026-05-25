import Image from "next/image";
import img1 from "@/assests/taboola/icons/bookmyassets-365-days-assistance-icon.svg";
import img2 from "@/assests/taboola/icons/bookmyassets-buy-back-assistance-icon.svg";
import img3 from "@/assests/taboola/icons/bookmyassets-due-diligence-team-icon.svg";
import img4 from "@/assests/taboola/icons/bookmyassets-immediate-sale-deed-icon.svg";
import img5 from "@/assests/taboola/icons/bookmyassets-resale-support-icon.svg";
import Link from "next/link";

const icons = [
  { id: 1, icon: img3, label: "Due Diligence Team" },
  { id: 2, icon: img4, label: "Immediate Sale Deed" },
  { id: 3, icon: img1, label: "365 Days Site Visit" },
  { id: 4, icon: img5, label: "Resale Support" },
  { id: 5, icon: img2, label: "Buyback Assistance" },
];

const COUNTERS = [
  { value: "7+ Projects", label: "Successfully Sold Out" },
  { value: "2 Lakh+ Sq. Yd", label: "Dholera Land Sold" },
  { value: "957+ Plots", label: "Registry Delivered" },
  { value: "561+ Clients", label: "Investor Client Base" },
];

export default function AboutBMA() {
  return (
    <>
      <div className="bg-gray-50 py-[clamp(2.5rem,5vw,3.5rem)]" id="why-bma">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)]">
          <div className="mb-[clamp(1rem,3vw,1.75rem)] flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
                <span className="text-[#deae3c]">BookMyAssets</span> : Trusted
                Developers in Dholera{" "}
              </h2>
            </div>
          </div>

          <div className="space-y-[clamp(1.25rem,3vw,2rem)]">
            <p className="mx-auto max-w-[56rem] text-center text-[clamp(0.875rem,2vw,1.125rem)] leading-[1.65] text-gray-700">
              BookMyAssets brings prime location residential plots in Dholera
              for sale with strong growth potential, registry ready
              documentation, clear guidance, and complete support before and
              after booking.
            </p>

            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1.25rem)] lg:grid-cols-4">
                {COUNTERS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="
                    flex flex-col justify-center items-center
                    p-[clamp(0.875rem,2vw,1.25rem)]
                    bg-white rounded-2xl shadow-md
                    hover:shadow-xl transition-shadow
                  "
                  >
                    <div className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#deae3c] mb-2">
                      {value}
                    </div>
                    <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-gray-700 font-medium text-center">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* CTA Buttons */}
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/about"
                  className="flex items-center gap-2 bg-[#deae3c] hover:bg-[#c99a2e] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center text-[clamp(0.875rem,1.5vw,1rem)]"
                  
                >
                  Know More About Us
                </Link>
              </div>
            </div>

            <div>
              <div className="max-w-7xl mx-auto text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-gray-900 leading-tight text-center">
                <p>Why Invest with BookMyAssets</p>
              </div>
              <div className="pt-[clamp(1rem,2vw,1.5rem)]">
                <div className="grid grid-cols-2 gap-[clamp(0.75rem,2vw,1rem)] sm:grid-cols-3 lg:grid-cols-5">
                  {icons.map((item, index) => {
                    const isLastOdd =
                      index === icons.length - 1 && icons.length % 2 !== 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center gap-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl border border-gray-100 bg-white p-[clamp(0.75rem,2vw,1rem)] shadow-sm transition-shadow hover:shadow-md
                              ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`}
                      >
                        <div className="relative w-[clamp(7rem,8vw,9rem)] h-[clamp(7rem,8vw,9rem)]">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-center text-[clamp(0.75rem,1.5vw,0.95rem)] font-medium text-gray-700">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
