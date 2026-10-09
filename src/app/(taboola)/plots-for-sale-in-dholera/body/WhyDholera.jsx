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
    <section id="dholera" aria-labelledby="dholera-overview-heading" className="scroll-mt-24 bg-white px-4 py-5 text-[14px] md:text-[16px] sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-6">
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
            {highlights.map(({ icon: Icon, title, body }, index) => (
              <article key={title} className={`grid grid-cols-[32px_minmax(0,1fr)] content-start gap-x-2.5 gap-y-1 rounded-xl border border-[#e9e3d7] bg-[#faf9f5] p-3 transition-colors hover:border-[#ddbc69] ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${index === highlights.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                <span className={`row-span-2 flex h-8 w-8 items-center justify-center rounded-full border ${iconColors[index % iconColors.length]}`}><Icon aria-hidden="true" size={18} strokeWidth={1.7} /></span>
                <h3 className="self-center font-semibold leading-snug text-[#a78337]">{title}</h3>
                <p className="col-start-2 text-[13px] leading-relaxed text-black sm:text-[14px]">{body}</p>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-start">
              <a href="#westwyn-residency" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#ddbc69] px-4 py-2 font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78337] focus-visible:ring-offset-2">Explore Plots in Dholera</a>
          </div>
        </div>
      </div>
    </section>
  );
}
