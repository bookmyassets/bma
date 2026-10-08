import Image from "next/image";
import dholeraSirGraphic from "@/assests/taboola/section/dholera-sir-landing-page.webp";
import { Route, Plane, TrainFront, TramFront, Ship, Landmark, Globe2, Building2, MapPinned, Blocks, LandPlot } from "lucide-react";

const comparisons = [
  { name: "Gurgaon", area: 675, icon: Building2, color: "border-cyan-200 bg-cyan-50 text-cyan-600", source: "https://onemapdepts.gmda.gov.in/" },
  { name: "Singapore", area: 744.3, icon: Globe2, color: "border-violet-200 bg-violet-50 text-violet-600", source: "https://www.moh.gov.sg/others/resources-and-statistics/population-and-vital-statistics/" },
  { name: "Mumbai", area: 603, icon: Building2, color: "border-rose-200 bg-rose-50 text-rose-600", source: "https://gazetteers.maharashtra.gov.in/cultural.maharashtra.gov.in/english/gazetteer/greater_bombay/general.html" },
  { name: "Ahmedabad (AMC)", area: 464.16, icon: MapPinned, color: "border-amber-200 bg-amber-50 text-amber-600", source: "https://ahmedabadcity.gov.in/Home/AboutTheCorporation" },
];

const iconColors = [
  "border-blue-200 bg-blue-50 text-blue-600",
  "border-violet-200 bg-violet-50 text-violet-600",
  "border-emerald-200 bg-emerald-50 text-emerald-600",
  "border-rose-200 bg-rose-50 text-rose-600",
  "border-cyan-200 bg-cyan-50 text-cyan-600",
];

const connections = [
  { title: "Expressway", image: "expressway", icon: Route, description: "Ahmedabad–Dholera corridor" },
  { title: "Airport", image: "airport", icon: Plane, description: "Dholera International Airport" },
  { title: "Freight Corridor", image: "freight", icon: TrainFront, description: "Regional logistics network" },
  { title: "Monorail", image: "monorail", icon: TramFront, description: "Planned urban mobility" },
  { title: "Seaport", image: "seaport", icon: Ship, description: "Regional maritime access" },
];

export default function DholeraScaleConnectivity() {
  return (
    <section aria-labelledby="dholera-scale-heading" className="bg-[#f8f7f3] px-4 py-6 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 text-center">
          <p className="font-semibold uppercase tracking-[0.15em] text-[#a78337]">The scale of the vision</p>
          <h2 id="dholera-scale-heading" className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-[#202b27] sm:text-[34px]">A city planned at a different scale</h2>
        </header>

        <div className="mx-auto grid items-stretch gap-4 overflow-hidden rounded-3xl border border-[#e6dfd1] bg-white p-3 sm:p-4 lg:max-w-5xl lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-5 lg:p-3">
          <figure className="flex items-center justify-center overflow-hidden rounded-2xl">
            <Image src={dholeraSirGraphic} alt="Dholera SIR regional footprint covering 920 square kilometres" sizes="(max-width: 1024px) 100vw, 340px" className="h-auto w-full max-w-[550px] rounded-2xl object-contain lg:max-w-[340px]" />
          </figure>

          <div className="flex flex-col justify-center px-1 py-2 sm:px-3">
            <div className="mt-4 space-y-4 lg:mt-0 lg:space-y-2">
              {comparisons.map(({ icon: Icon, ...city }) => (
                <div key={city.name} className="border-b border-[#f0ece3] pb-3 last:border-0 last:pb-0 lg:pb-2">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <a href={city.source} target="_blank" rel="noopener noreferrer" className="inline-flex min-w-0 items-center gap-2.5 font-medium text-[#36423b] hover:underline">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${city.color}`}><Icon aria-hidden="true" size={20} strokeWidth={1.6} /></span>
                      <span>{city.name}{city.boundary && <span className="mt-0.5 block text-[11px] font-normal text-[#858b86] sm:text-[12px]">{city.boundary}</span>}</span>
                    </a>
                    <span className="whitespace-nowrap font-semibold text-[#36423b]">{city.area.toLocaleString("en-IN")} <span className="font-normal text-black">km²</span></span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f1eee6]"><div className="h-full rounded-full bg-[#ddbc69]" style={{ width: `${city.area / 1483 * 100}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-[#e9d5a2] bg-[#faf3e1] p-3 lg:mt-3 lg:p-2.5">
              <div className="mb-2 flex items-center justify-between gap-3 font-semibold text-[#8c6a27]"><span className="inline-flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"><LandPlot aria-hidden="true" size={20} strokeWidth={1.6} /></span>Dholera SIR</span><span className="whitespace-nowrap">920 km²</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-[#eee3c8]"><div className="h-full w-[62.04%] rounded-full bg-[#ba913b]" /></div>
            </div>
          </div>
        </div>

        <section aria-labelledby="connectivity-heading" className="mt-7">
          <header className="mb-4 text-center">
            <h2 id="connectivity-heading" className="text-[28px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[34px] lg:text-[38px]">Connectivity</h2>
          </header>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-5">
            {connections.map(({ title, image, icon: Icon, description }, index) => (
              <article key={title} className="group w-[75%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#e6dfd1] bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(47,38,19,0.07)] sm:w-auto">
                <div className="bg-[#f8f5ed] px-2 pt-2">
                  <Image src={`/graphics/dholera/${image}.svg`} alt={`${title} conceptual illustration`} width={800} height={600} sizes="(max-width: 640px) 75vw, (max-width: 1024px) 33vw, 250px" className="aspect-[4/3] w-full object-contain" />
                </div>
                <div className="border-t border-[#ece4d3] p-3">
                  <span className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${iconColors[index]}`}><Icon aria-hidden="true" size={20} strokeWidth={1.6} /></span>
                  <h3 className="font-semibold leading-snug text-[#283b32]">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#7b827d] md:text-[14px]">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
