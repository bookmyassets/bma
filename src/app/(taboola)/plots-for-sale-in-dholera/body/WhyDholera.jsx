import { Building2, Route, Factory, MapPinned, House } from "lucide-react";

const highlights = [
  { icon: Building2, title: "India’s First Smart City", body: "Dholera SIR is being developed as a planned greenfield smart city." },
  { icon: Factory, title: "Major Industrial Projects", body: "Semiconductor and other large-scale industries are creating future employment and demand." },
  { icon: Route, title: "Excellent Connectivity", body: "Ahmedabad-Dholera Expressway, upcoming Dholera Airport and planned rail connectivity are strengthening access." },
  { icon: MapPinned, title: "Long Term Growth Potential", body: "Growing infrastructure and business activity can support future land value appreciation." },
  { icon: House, title: "Residential & Rental Opportunity", body: "Developing employment hubs can create demand for homes, rentals and residential plots." },
];

const iconColors = [
  "border-blue-200 bg-blue-50 text-blue-600",
  "border-emerald-200 bg-emerald-50 text-emerald-600",
  "border-violet-200 bg-violet-50 text-violet-600",
  "border-rose-200 bg-rose-50 text-rose-600",
];

export default function WhyDholera() {
  return (
    <section id="dholera" aria-labelledby="dholera-overview-heading" className="scroll-mt-24 bg-white px-4 py-6 text-[14px] md:text-[16px] sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4">
          <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {highlights.map(({ icon: Icon, title }, index) => (
              <article key={title} className={`flex min-h-16 items-center gap-3 rounded-2xl border border-[#e9e3d7] bg-[#faf9f5] px-4 py-3 transition-colors hover:border-[#ddbc69] ${index === highlights.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${iconColors[index % iconColors.length]}`}><Icon aria-hidden="true" size={18} strokeWidth={1.7} /></span>
                <h3 className="font-semibold leading-snug text-[#a78337]">{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
