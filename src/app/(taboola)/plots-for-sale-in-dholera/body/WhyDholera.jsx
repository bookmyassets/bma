import { Building2, Route, Factory, MapPinned } from "lucide-react";

const highlights = [
  { icon: Building2, title: "Planned from the ground up", body: "A greenfield industrial city under the Delhi-Mumbai Industrial Corridor, with an integrated approach to land use and infrastructure." },
  { icon: Route, title: "Infrastructure at its core", body: "Expressway, airport and rail projects form part of the region's long-term connectivity plans." },
  { icon: Factory, title: "An industrial ecosystem", body: "Semiconductors, renewable energy and manufacturing are among the sectors shaping Dholera's development." },
  { icon: MapPinned, title: "Space for long-term growth", body: "Explore planned development, project locations and infrastructure progress before choosing your plot." },
];

const iconColors = [
  "border-blue-200 bg-blue-50 text-blue-600",
  "border-emerald-200 bg-emerald-50 text-emerald-600",
  "border-violet-200 bg-violet-50 text-violet-600",
  "border-rose-200 bg-rose-50 text-rose-600",
];

export default function WhyDholera() {
  return (
    <section id="dholera" aria-labelledby="dholera-overview-heading" className="bg-white px-4 py-7 text-[14px] md:text-[16px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
          <div>
            <h2 id="dholera-overview-heading" className="mb-3 text-[26px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[32px] lg:text-[38px]">Discover Dholera</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-black">Dholera brings planned infrastructure, industrial development and room to grow together in one region. Understand the vision behind the city before making your next investment.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#e8dcc0] bg-[#fbf7ed] px-3 py-2 font-medium text-[#88703b]"><span className="h-1.5 w-1.5 rounded-full bg-[#ddbc69]" />Gujarat's planned greenfield industrial city</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, body }, index) => (
              <article key={title} className="rounded-2xl border border-[#e9e3d7] bg-[#faf9f5] p-3 transition-colors hover:border-[#ddbc69] sm:p-4">
                <span className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border sm:mb-3 ${iconColors[index]}`}><Icon aria-hidden="true" size={21} strokeWidth={1.7} /></span>
                <h3 className="font-semibold leading-snug text-[#ddbc69]">{title}</h3>
                <p className="mt-2 leading-relaxed text-black">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
