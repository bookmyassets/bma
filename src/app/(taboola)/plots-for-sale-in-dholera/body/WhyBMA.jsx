import Image from "next/image";
import { Building2, LandPlot, FileCheck2, Users, ShieldCheck, MapPin } from "lucide-react";
import awardImage from "@/assests/taboola/section/champions-of-dholera-real-estate-bookmyassets.webp";

const counters = [
  { value: "7+", unit: "Projects", label: "Successfully sold out", icon: Building2, color: "border-blue-200 bg-blue-50 text-blue-600" },
  { value: "2 Lakh+", unit: "Sq. Yd", label: "Dholera land sold", icon: LandPlot, color: "border-emerald-200 bg-emerald-50 text-emerald-600" },
  { value: "957+", unit: "Plots", label: "Registry delivered", icon: FileCheck2, color: "border-violet-200 bg-violet-50 text-violet-600" },
  { value: "561+", unit: "Clients", label: "Investor client base", icon: Users, color: "border-rose-200 bg-rose-50 text-rose-600" },
];

export default function WhyBMA() {
  return (
    <section id="Why-BMA" aria-labelledby="why-bma-heading" className="scroll-mt-24 bg-white px-4 py-7 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <figure className="relative mx-auto w-full max-w-[280px] sm:max-w-md lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl border border-[#ddbc69]/45 bg-[#f6f0e1]" />
          <div className="relative overflow-hidden rounded-3xl border border-[#e8deca] bg-[#172b26] p-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-[#f6f0e1]">
              <Image src={awardImage} alt="BookMyAssets trophy and certificate at the Asia Excellence Awards 2025" fill sizes="(max-width: 639px) 280px, (max-width: 1023px) 450px, 480px" className="object-cover" />
            </div>
            <figcaption className="flex items-center gap-3 px-3 py-3 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ddbc69]/40 text-[#ddbc69]"><ShieldCheck aria-hidden="true" size={19} strokeWidth={1.6} /></span>
              <div><p className="font-semibold text-[#ddbc69]">Recognition that inspires us</p><p className="mt-0.5 text-[12px] text-white/65 sm:text-[13px]">BookMyAssets | Asia Excellence Awards 2025</p></div>
            </figcaption>
          </div>
        </figure>

        <div className="min-w-0">
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#a78337] sm:text-[13px]">Your partner in Dholera</p>
          <h2 id="why-bma-heading" className="text-[28px] font-bold leading-tight tracking-tight text-[#202b27] sm:text-[34px] lg:text-[38px]">Why invest with <span className="text-[#ddbc69]">BookMyAssets</span></h2>
          <p className="mt-4 max-w-xl leading-relaxed text-black">Choose your Dholera plot with location clarity, expert guidance and a team that supports your investment journey. We help you understand the project, documentation and long-term development plans before you decide.</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-[#516057] sm:text-[14px]">
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {counters.map(({ value, unit, label, icon: Icon, color }) => (
              <div key={label} className="rounded-2xl border border-[#e9e3d7] bg-[#faf9f6] p-3 transition-colors hover:border-[#ddbc69] sm:p-4">
                <span className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl border ${color}`}><Icon aria-hidden="true" size={20} strokeWidth={1.6} /></span>
                <dd className="flex flex-wrap items-baseline gap-x-1.5 text-[#202b27]"><span className="text-[24px] font-bold leading-tight tracking-tight sm:text-[30px]">{value}</span><span className="text-[13px] font-medium text-[#9a7731] sm:text-[14px]">{unit}</span></dd>
                <dt className="mt-1 text-[13px] leading-snug text-black sm:text-[14px]">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
