import Image from "next/image";
import img1 from "@/assests/taboola/icons/bookmyassets-365-days-assistance-icon.svg";
import img2 from "@/assests/taboola/icons/bookmyassets-buy-back-assistance-icon.svg";
import img3 from "@/assests/taboola/icons/bookmyassets-due-diligence-team-icon.svg";
import img4 from "@/assests/taboola/icons/bookmyassets-immediate-sale-deed-icon.svg";
import img5 from "@/assests/taboola/icons/bookmyassets-resale-support-icon.svg";

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
      <div className="pt-8 py-4 bg-gray-50" id="why-bma">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="flex flex-col items-center text-center mb-[clamp(1rem,4vw,2rem)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#ddbc69]" />
              <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
                BookMyAssets: Trusted Developers in Dholera{" "}
              </h2>
              <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#ddbc69]" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[clamp(1rem,1.5vw,1.2rem)] space-y-6">
              With BookMyAssets, you invest in Dholera with confidence. We
              provide location transparency, expert guidance, and access to
              high-potential land opportunities. We ensure every investment is
              backed by trust, verification, and future growth potential.
            </p>

            <div className="px-[calc(0.5rem+1vw)] max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-[calc(0.75rem+0.5vw)]">
                {COUNTERS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="
                    flex flex-col justify-center items-center
                    p-[calc(0.75rem+0.2vw)]
                    bg-white rounded-2xl shadow-md
                    hover:shadow-xl transition-shadow
                  "
                  >
                    <div className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#ddbc69] mb-2">
                      {value}
                    </div>
                    <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-700 font-medium text-center">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <div className="max-w-7xl mx-auto text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight text-center">
                <p>Why Invest with BookMyAssets</p>
              </div>
              <div className="pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {icons.map((item, index) => {
                    const isLastOdd =
                      index === icons.length - 1 && icons.length % 2 !== 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center gap-3 p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow
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

