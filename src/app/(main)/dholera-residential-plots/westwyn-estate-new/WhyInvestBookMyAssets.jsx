import Image from "next/image";
import assistanceIcon from "@/assests/taboola/icons/bookmyassets-365-days-assistance-icon.svg";
import buyBackIcon from "@/assests/taboola/icons/bookmyassets-buy-back-assistance-icon.svg";
import dueDiligenceIcon from "@/assests/taboola/icons/bookmyassets-due-diligence-team-icon.svg";
import saleDeedIcon from "@/assests/taboola/icons/bookmyassets-immediate-sale-deed-icon.svg";
import resaleIcon from "@/assests/taboola/icons/bookmyassets-resale-support-icon.svg";

const benefits = [
  { id: 1, icon: dueDiligenceIcon, label: "Due Diligence Team" },
  { id: 2, icon: saleDeedIcon, label: "Immediate Sale Deed" },
  { id: 3, icon: assistanceIcon, label: "365 Days Site Visit" },
  { id: 4, icon: resaleIcon, label: "Resale Support" },
  { id: 5, icon: buyBackIcon, label: "Buyback Assistance" },
];

export default function WhyInvestBookMyAssets() {
  return (
    <section className="bg-black px-[clamp(1rem,4vw,3rem)] py-[clamp(2rem,4vw,3.5rem)] text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[clamp(1rem,2vw,1.5rem)]">
          <p className="text-[clamp(1.5rem,3vw,2rem)] text-center font-semibold uppercase tracking-[0.08em] text-[#deae3c]">
            Why Invest with BookMyAssets
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((item, index) => {
            const isLastOdd =
              index === benefits.length - 1 && benefits.length % 2 !== 0;

            return (
              <div
                key={item.id}
                className={`flex min-h-[8rem] flex-col items-center justify-center rounded-[0.5rem] border border-white/10 bg-white/[0.03] p-[clamp(1rem,2vw,1.5rem)] text-center shadow-[0_0_0_1px_rgba(222,174,60,0.08)] transition-colors hover:border-[#deae3c]/50 ${
                  isLastOdd ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="relative mb-3 h-[clamp(7rem,8vw,9rem)] w-[clamp(7rem,8vw,9rem)]">
                  <Image
                    src={item.icon}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="3rem"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[clamp(0.875rem,1.4vw,1rem)] font-semibold leading-[1.35] text-white">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
