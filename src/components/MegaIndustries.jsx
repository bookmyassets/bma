"use client";

import Image from "next/image";

import Avaada from "@/assests/ad-page/crousel/Avaada.webp";
import Chiripal from "@/assests/ad-page/crousel/Chiripal.webp";
import Cubic from "@/assests/ad-page/crousel/Cubic.webp";
import Dawat from "@/assests/ad-page/crousel/Dawat.webp";
import Fujifilm from "@/assests/ad-page/crousel/Fujifilm.webp";
import HP from "@/assests/ad-page/crousel/HP.webp";
import Inox from "@/assests/ad-page/crousel/Inox.webp";
import Jabil from "@/assests/ad-page/crousel/Jabil.webp";
import Mahindra from "@/assests/ad-page/crousel/mahindra.webp";
import Polycab from "@/assests/ad-page/crousel/Polyacab.webp";
import Renew from "@/assests/ad-page/crousel/Renew.webp";
import TATA from "@/assests/ad-page/crousel/TATA chemical.webp";
import Torrent from "@/assests/ad-page/crousel/Torrent.webp";
import Tsingshan from "@/assests/ad-page/crousel/Tsingshan.webp";
import Vedanta from "@/assests/ad-page/crousel/Vedanta.webp";
import Vyoma from "@/assests/ad-page/crousel/Vyoma.webp";

const companies = [
  { name: "Avaada", image: Avaada },
  { name: "Chiripal", image: Chiripal },
  { name: "Cubic", image: Cubic },
  { name: "Daawat", image: Dawat },
  { name: "Fujifilm", image: Fujifilm },
  { name: "HP", image: HP },
  { name: "INOX", image: Inox },
  { name: "Jabil", image: Jabil },
  { name: "Mahindra", image: Mahindra },
  { name: "Polycab", image: Polycab },
  { name: "ReNew", image: Renew },
  { name: "TATA Chemicals", image: TATA },
  { name: "Torrent", image: Torrent },
  { name: "Tsingshan", image: Tsingshan },
  { name: "Vedanta", image: Vedanta },
  { name: "Vyoma", image: Vyoma },
];

const themeStyles = {
  light: {
    section: "bg-white text-[#151f28]",
    title: "text-[#151f28]",
    description: "bg-gray-50 text-slate-700",
    card: "border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]",
    imagePanel: "bg-[#f7f7f5]",
    caption: "text-slate-700",
    edgeLeft: "from-white",
    edgeRight: "to-white",
  },
  dark: {
    section: "bg-[#161616] text-[#f5f1e8]",
    title: "text-[#ddbc69]",
    description: "text-[#f5f1e8]/70",
    card: "border-white/[0.08] bg-[#101010] shadow-[0_18px_45px_rgba(0,0,0,0.18)]",
    imagePanel: "bg-[#f4f3ef]",
    caption: "text-[#f5f1e8]",
    edgeLeft: "from-[#161616]",
    edgeRight: "to-[#161616]",
  },
};

export default function MegaIndustries({ variant = "light" }) {
  const theme = themeStyles[variant] || themeStyles.light;
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className={`relative overflow-hidden ${theme.section}`}>
      <style jsx>{`
        @keyframes megaIndustriesMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .mega-industries-marquee {
          animation: megaIndustriesMarquee 42s linear infinite;
          width: max-content;
        }

        .mega-industries-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .mega-industries-marquee {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <header className="text-center">
          <h2 className={`text-lg font-bold md:text-2xl ${theme.title}`}>
            Global Giants Building in Dholera
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-20 bg-[#ddbc69]" />
          <p
            className={`mx-auto mt-3 max-w-3xl rounded-lg px-3 py-2 text-left text-xs leading-relaxed md:text-base ${theme.description}`}
          >
            Dholera is attracting major industrial, energy, and technology
            companies, strengthening its position as an emerging manufacturing
            and innovation hub.
          </p>
        </header>

        <div className="relative mt-3 overflow-hidden py-1.5 sm:mt-4">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r ${theme.edgeLeft} to-transparent sm:w-16 lg:w-24`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l ${theme.edgeRight} to-transparent sm:w-16 lg:w-24`}
          />

          <div className="mega-industries-marquee flex items-stretch gap-4 px-2 sm:gap-5 sm:px-4 lg:gap-6">
            {duplicatedCompanies.map((company, index) => (
              <article
                key={`${company.name}-${index}`}
                className={`flex w-[125px] shrink-0 flex-col overflow-hidden rounded-xl border sm:w-[155px] lg:w-[180px] ${theme.card}`}
              >
                <div className={`relative aspect-[4/3] w-full p-1.5 ${theme.imagePanel}`}>
                  <Image
                    src={company.image}
                    alt={`${company.name} project tile in Dholera`}
                    fill
                    sizes="(max-width: 639px) 125px, (max-width: 1023px) 155px, 180px"
                    className="object-contain"
                  />
                </div>
                <p className={`px-2 py-1.5 text-center text-[11px] font-semibold sm:text-xs ${theme.caption}`}>
                  {company.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
