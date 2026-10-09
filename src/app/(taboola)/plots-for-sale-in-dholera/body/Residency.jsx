"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, MapPin, Route, Train, Clock3, Factory, Plane, LandPlot, House, Ruler, BadgeIndianRupee } from "lucide-react";
import westwynProjectImages from "@/assests/westwynProjectImages";
import crownImage from "@/assests/residential/crown/westwyn-crown-dholera-entry-gate-desktop.webp";
import GetinTouch from "../components/GetinTouch";


const connectivity = [
  { icon: Route, text: "Direct Entry from Major District Road (MDR)" },
  { icon: Train, text: "2 Min – DFC" },
  { icon: Clock3, text: "5 Min – Dholera SIR boundary" },
  { icon: Route, text: "12 Min – Ahmedabad-Dholera Expressway" },
  { icon: Factory, text: "22 Min – Tata Semiconductor facility" },
  { icon: Plane, text: "30 Min – Dholera International Airport" },
];

const specs = [
  { icon: House, label: "Possession", value: "Immediate" },
  { icon: Ruler, label: "Documentation", value: "Clear Title | NA/NOC | Plan Pass" },
  { icon: MapPin, label: "Location", value: "Pipariya, 5 mins from Dholera SIR" },
];

const tabs = [
  { id: "residency", name: "WestWyn Residency", status: "Newly Launched" },
  { id: "crown", name: "Westwyn Crown", status: "Coming Soon" },
];

export default function Residency() {
  const [activeProject, setActiveProject] = useState("residency");
  const [expanded, setExpanded] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    const selectFromHash = () => {
      if (window.location.hash === "#westwyn-crown") setActiveProject("crown");
      if (window.location.hash === "#westwyn-residency") setActiveProject("residency");
    };
    const selectProject = (event) => {
      if (["residency", "crown"].includes(event.detail)) setActiveProject(event.detail);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    window.addEventListener("westwyn-project-select", selectProject);
    return () => {
      window.removeEventListener("hashchange", selectFromHash);
      window.removeEventListener("westwyn-project-select", selectProject);
    };
  }, []);

  const switchProject = (id) => {
    setActiveProject(id);
    setExpanded(false);
  };

  return (
    <section id="westwyn-residency" aria-labelledby="westwyn-section-heading" className="text-[13px] md:text-[17px] scroll-mt-24 bg-[#f8f7f4] py-6 text-[#1c1c1c] sm:py-7 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 max-w-2xl text-center sm:mb-4">
          <h2 id="westwyn-section-heading" className="font-playfair-display text-[26px] font-bold leading-tight tracking-tight text-[#ddbc69] sm:text-[32px] lg:text-[38px]">{tabs.find((tab) => tab.id === activeProject)?.name}</h2>
        </div>

        <div role="tablist" aria-label="Westwyn projects" className="mx-auto mb-4 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:mb-4">
          {tabs.map((tab) => (
            <button key={tab.id} id={`project-tab-${tab.id}`} role="tab" type="button"
              aria-selected={activeProject === tab.id} aria-controls={`project-panel-${tab.id}`}
              tabIndex={activeProject === tab.id ? 0 : -1}
              onClick={() => switchProject(tab.id)}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
                e.preventDefault();
                const next = e.key === "Home" ? "residency" : e.key === "End" ? "crown" : tab.id === "residency" ? "crown" : "residency";
                switchProject(next);
                document.getElementById(`project-tab-${next}`)?.focus();
              }}
              className={`flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddbc69] sm:px-5 ${activeProject === tab.id ? "border-[#c9a454] bg-white shadow-[0_8px_28px_rgba(94,70,22,0.08)]" : "border-[#e5dfd2] bg-white/65 hover:border-[#d5c39b]"}`}>
              <span className="font-semibold">{tab.name}</span>
              <span className={`shrink-0 rounded-full px-2.5 py-1  font-semibold ${tab.id === "residency" ? "bg-[#f9edce] text-[#936d21]" : "bg-[#eaf1fb] text-[#45658f]"}`}>{tab.status}</span>
            </button>
          ))}
        </div>

        <div id="project-panel-residency" role="tabpanel" aria-labelledby="project-tab-residency" hidden={activeProject !== "residency"}>
          {activeProject === "residency" && (
            <div className="overflow-hidden rounded-[24px] border border-[#e9e1d3] bg-white shadow-[0_20px_65px_rgba(30,25,15,0.045)] sm:rounded-[30px]">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[260px] bg-[#eee8dd] sm:min-h-[340px] lg:min-h-[440px]">
                  <Image src={westwynProjectImages["westwyn-residency"]} alt="Westwyn Residency residential plots in Dholera" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent px-4 pb-4 pt-10 sm:px-5">
                  </div>
                </div>

                <div className="flex flex-col p-4 sm:p-5 lg:p-5">
                  <p className="font-semibold uppercase tracking-[0.2em] text-[#a78337]">WestWyn Residency</p>
                  <p className="mt-2 leading-relaxed text-black">Residential Plots near DFC</p>
                  <div className="my-4 h-px bg-[#eee9e0]" />
                <h4 className="mb-2 font-semibold">Project Highlights</h4>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-2">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className={`grid grid-cols-[28px_minmax(0,1fr)] content-start gap-x-2 gap-y-1 rounded-xl border border-[#eee7d9] bg-[#faf9f6] p-2.5 ${["Possession", "Documentation", "Location"].includes(label) ? "col-span-2" : ""}`}>
                      <span className="row-span-2 flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8d9b5] bg-gradient-to-br from-[#fffdf7] to-[#f1e5c9] text-[#98742e]"><Icon aria-hidden="true" size={16} strokeWidth={1.5} /></span>
                      <p className="text-[12px] leading-snug text-[#7a7a7a] sm:text-[13px]">{label}</p>
                      <p className="col-start-2 text-[13px] font-semibold leading-snug text-[#252525] sm:text-[14px]">{value}</p>
                    </div>
                  ))}
                </div>
                </div>
              </div>

              <div className="border-t border-[#eee9e0] px-3 py-3 sm:px-5 sm:py-4 lg:px-5">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-semibold">Key Location Benefits</h4>
                    <span className="text-[#9c824f]">Dholera, Gujarat</span>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {connectivity.slice(0, 3).map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 rounded-xl bg-[#faf9f6] px-3 py-3 sm:px-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e8d9b5] bg-gradient-to-br from-[#fffdf7] to-[#f1e5c9] text-[#98742e]"><Icon aria-hidden="true" size={20} strokeWidth={1.5} /></span>
                        <p className="font-medium leading-snug text-[#363636]">{text}</p>
                      </div>
                    ))}
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div id="additional-connectivity" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="space-y-2.5 pt-2.5">
                            {connectivity.slice(3).map(({ icon: Icon, text }) => (
                              <div key={text} className="flex items-center gap-3 rounded-xl bg-[#faf9f6] px-3 py-3 sm:px-4">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e8d9b5] bg-gradient-to-br from-[#fffdf7] to-[#f1e5c9] text-[#98742e]"><Icon aria-hidden="true" size={20} strokeWidth={1.5} /></span>
                                <p className="font-medium leading-snug text-[#363636]">{text}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button type="button" aria-expanded={expanded} aria-controls="additional-connectivity" onClick={() => setExpanded((v) => !v)} className="mt-4 inline-flex w-fit items-center gap-2 font-semibold text-[#98742c] transition-colors hover:text-[#6f5119]">
                    {expanded ? "Show Less" : "View All Connectivity"}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                  </button>
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-[#ead6a6] bg-[#f9f0db] p-2.5 sm:mt-4 sm:gap-4 sm:rounded-2xl sm:p-4 lg:justify-center lg:gap-8">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#866b35] sm:gap-2 sm:text-[14px]"><BadgeIndianRupee size={16} className="shrink-0" /> Project Price</p>
                    <p className="mt-1 whitespace-nowrap font-playfair-display text-[20px] font-bold leading-tight text-[#272013] sm:text-[17px]">₹8,000 <span className="text-[11px] font-medium sm:text-[17px]">/ Sq. Yd</span></p>
                  </div>
                  <button type="button" onClick={() => setIsContactFormOpen(true)} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-[#ddbc69] px-2 py-2 text-[12px] font-semibold text-black transition-shadow hover:shadow-md sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 sm:text-[14px]">
                    Get Plot Details <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="project-panel-crown" role="tabpanel" aria-labelledby="project-tab-crown" hidden={activeProject !== "crown"}>
          {activeProject === "crown" && (
            <div id="westwyn-crown" className="grid scroll-mt-24 overflow-hidden rounded-[24px] border border-[#e9e1d3] bg-white shadow-sm lg:grid-cols-2 sm:rounded-[30px]">
              <div className="relative min-h-[300px] sm:min-h-[340px]">
                <Image src={crownImage} alt="Westwyn Crown project entrance visual" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-4 sm:p-5 lg:p-5">
                <span className="w-fit rounded-full bg-[#eaf1fb] px-3 py-1.5 font-semibold text-[#45658f]">Coming Soon</span>
                <h3 className="mt-3 font-playfair-display font-semibold">Westwyn Crown</h3>
                <p className="mt-5 max-w-md leading-7 text-[#666]">An upcoming residential plotted development by BookMyAssets in Dholera. Project details will be announced soon.</p>
                <button type="button" onClick={() => setIsContactFormOpen(true)} className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-[#ddbc69] px-4 py-3 font-semibold text-black transition-shadow hover:shadow-md">Get Launch Updates <ArrowUpRight size={17} /></button>
              </div>
            </div>
          )}
        </div>
      </div>


      {isContactFormOpen && (
        <GetinTouch title={activeProject === "crown" ? "Discover Westwyn Crown" : "Discover Westwyn Residency"} subtitle={activeProject === "crown" ? "Connect with our team for launch updates and availability." : "Get project pricing, brochure and site visit assistance."} buttonName="Get A Call Back" onClose={() => setIsContactFormOpen(false)} />
      )}
    </section>
  );
}
