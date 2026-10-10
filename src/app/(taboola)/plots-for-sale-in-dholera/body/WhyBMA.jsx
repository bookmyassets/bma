import Image from "next/image";
import { Building2, Users, ShieldCheck, MapPin, House, KeyRound, CalendarDays } from "lucide-react";
import awardImage from "@/assests/taboola/section/champions-of-dholera-real-estate-bookmyassets.webp";

const benefits = [
  { title: "5+ Years of Experience", body: "Focused experience in Dholera real estate.", icon: CalendarDays },
  { title: "3+ Active Projects", body: "Residential projects in and around Dholera.", icon: Building2 },
  { title: "Site Visit Assistance", body: "Visit the project before making your investment.", icon: MapPin },
  { title: "Villa Construction Assistance", body: "Build your home on your plot with construction support.", icon: House },
  { title: "Rental Assistance", body: "Explore rental opportunities after developing your property.", icon: KeyRound },
  { title: "500+ Investors", body: "Trusted by investors looking at Dholera for the long term.", icon: Users },
];

export default function WhyBMA() {
  return (
    <section id="Why-BMA" aria-labelledby="why-bma-heading" className="scroll-mt-24 bg-white px-4 py-5 text-[14px] md:text-[16px] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 sm:gap-4">
        <div className="min-w-0">
          <h2 id="why-bma-heading" className="text-[26px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[32px] lg:text-[36px]">Why Invest With BookMyAssets in Dholera?</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-black">Invest with a Dholera-focused real estate company built on experience, transparency and long-term value.</p>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 lg:gap-3">
            {benefits.map(({ title, icon: Icon }) => (
              <li key={title} className="flex min-h-[62px] items-center gap-2.5 rounded-xl border border-[#e9e3d7] bg-[#faf9f6] px-3 py-2.5 transition-colors hover:border-[#ddbc69] sm:min-h-[68px] sm:px-3.5 lg:px-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#e8d9b5] bg-[#f6f0e1] text-[#98742e]"><Icon aria-hidden="true" size={16} strokeWidth={1.6} /></span>
                <h3 className="text-[13.5px] font-semibold leading-snug text-[#202b27] sm:text-[16px]">{title}</h3>
              </li>
            ))}
          </ul>
        </div>

        <figure className="w-full lg:mx-auto lg:max-w-[680px]">
          <div className="flex items-center gap-3 overflow-hidden rounded-xl border border-[#e8deca] bg-[#172b26] p-2 sm:gap-4">
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-[#f6f0e1] sm:w-24 lg:aspect-[5/4] lg:w-[200px]">
              <Image src={awardImage} alt="BookMyAssets trophy and certificate at the Asia Excellence Awards 2025" fill sizes="(max-width: 639px) 80px, (max-width: 1023px) 96px, 200px" className="object-cover" />
            </div>
            <figcaption className="flex min-w-0 items-center gap-3 py-1 pr-2 text-white">
              <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ddbc69]/40 text-[#ddbc69] sm:flex"><ShieldCheck aria-hidden="true" size={19} strokeWidth={1.6} /></span>
              <div><p className="text-[15px] font-semibold leading-snug text-[#ddbc69] sm:text-[14px] md:text-[16px]">Recognition that inspires us</p><p className="mt-1 text-[13px] leading-snug text-white sm:mt-0.5 sm:text-[13px]">BookMyAssets | Asia Excellence Awards 2025</p></div>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
