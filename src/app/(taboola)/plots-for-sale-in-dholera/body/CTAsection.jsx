import { Headset, Phone, FileText, MapPin, BadgeIndianRupee } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const support = [
  { icon: FileText, label: "Project brochure" },
  { icon: BadgeIndianRupee, label: "Pricing guidance" },
  { icon: MapPin, label: "Location details" },
];

export default function CTAsection({ text1, text2, subTitle }) {
  return (
    <section aria-label="Expert guidance for Dholera plots" className="relative overflow-hidden border-y border-[#ddbc69]/15 bg-[#111c18] px-4 py-6 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full border border-[#ddbc69]/10" />
      <div className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div>
          <h2 className="max-w-2xl text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px] lg:text-[36px]">{text1} <span className="text-[#ddbc69]">{text2}</span></h2>
          <p className="mt-3 max-w-xl leading-relaxed text-white/65">{subTitle}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-3 text-[12px] text-white/75 sm:text-[13px]">
            {support.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2"><Icon aria-hidden="true" size={16} strokeWidth={1.6} className="text-[#ddbc69]" />{label}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a href="tel:+918130371647" className="flex min-h-12 items-center gap-3 rounded-xl bg-[#ddbc69] p-3 text-black transition-shadow hover:shadow-[0_4px_18px_rgba(221,188,105,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/20"><Phone aria-hidden="true" size={19} strokeWidth={1.7} /></span>
              <span className="block text-[14px] font-semibold sm:text-[15px]">Call Now</span>
            </a>
            <a href="https://wa.me/918130371647" target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 rounded-xl bg-[#ddbc69] p-3 text-black transition-shadow hover:shadow-[0_4px_18px_rgba(221,188,105,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/20"><FaWhatsapp aria-hidden="true" size={21} /></span>
              <span className="block text-[14px] font-semibold sm:text-[15px]">WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
