"use client";

import { useId, useState } from "react";
import Image from "next/image";

import westwynProjectImages from "@/assests/westwynProjectImages";
import GetinTouch from "../components/GetinTouch";

import {
  Baby,
  Building2,
  Car,
  Cctv,
  Clock,
  Factory,
  Fence,
  Leaf,
  MapPin,
  PersonStanding,
  Plane,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { FaRoad, FaWhatsapp } from "react-icons/fa6";
import { GiRailway, GiRoad } from "react-icons/gi";

const iconColors = [
  "text-blue-600",
  "text-emerald-600",
  "text-amber-500",
  "text-rose-600",
  "text-violet-600",
  "text-cyan-600",
];

const essentials = [
  { label: "Project Boundary", icon: Fence },
  { label: "Gated Community", icon: Building2 },
  { label: "Internal Roads", icon: FaRoad },
  { label: "24/7 Security & CCTV", icon: Cctv },
  { label: "Kids Play Area", icon: Baby },
  { label: "EV Charging Station", icon: Car },
  { label: "App-Based Society Management", icon: Users },
  { label: "Power & Water Supply", icon: Zap },
  { label: "Yoga Deck", icon: Leaf },
  { label: "Senior Citizen Zone", icon: PersonStanding },
];

const residencyLocation = [
  {
    label: "Located on Major District Road (MDR) in Pipariya, Dholera",
    icon: MapPin,
  },
  { label: "2 minutes from Railway Station", icon: GiRailway },
  { label: "5 minutes from Dholera SIR boundary", icon: Clock },
  { label: "12 minutes from Ahmedabad Dholera Expressway", icon: GiRoad },
  { label: "22 minutes from Tata Semiconductor Plant", icon: Factory },
  { label: "30 minutes from Dholera International Airport", icon: Plane },
];

const projects = [
  {
    name: "WestWyn Crown",
    slug: "westwyn-crown",
    tag: "Coming soon",
    image: westwynProjectImages["westwyn-crown"],
    imageAlt: "WestWyn Crown project banner in Dholera",
    comingSoon: true,
  },
  {
    name: "WestWyn Residency",
    slug: "westwyn-residency",
    tag: "Newly launched",
    place: "Pipariya, Dholera",
    description:
      "WestWyn Residency is a well-planned residential plot project in Pipariya, Dholera by BookMyAssets. It offers Direct entry from Major District Road (MDR) and just 5 min from SIR Boundary. The project is designed as a gated community, giving you a peaceful and secure environment. It is a good option for buyers who want a clear, simple, and practical investment.",
    image: westwynProjectImages["westwyn-residency"],
    imageAlt: "WestWyn Residency project banner in Dholera",
    amenities: essentials,
    location: residencyLocation,
  },
];

const views = [
  { label: "Overview", icon: Building2, color: "text-amber-500" },
  { label: "Amenities", icon: Leaf, color: "text-emerald-600" },
  { label: "Location Advantage", icon: MapPin, color: "text-blue-600" },
];

function ProjectCard({ project }) {
  const cardId = useId();
  const [activeSection, setActiveSection] = useState(0);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const activeItems =
    activeSection === 1 ? project.amenities : project.location;

  return (
    <article
      id={project.slug}
      aria-labelledby={`${cardId}-title`}
      className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_38px_rgba(15,23,42,0.13)] sm:p-4"
    >
      <h3
        id={`${cardId}-title`}
        className="mb-3 text-center text-[20px] font-semibold text-black lg:text-[22px]"
      >
        {project.name}
      </h3>

      <div className="relative aspect-[16/9] overflow-hidden rounded-[5px] bg-[#EEE9DE] shadow-[0_10px_20px_rgba(15,23,42,0.12)]">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

        <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-[#DDBC69]/75 bg-white/95 px-3 py-2 text-sm font-semibold text-black shadow-[0_8px_20px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:right-4 sm:top-4 lg:text-base">
          {project.comingSoon ? (
            <Clock className="h-4 w-4 text-violet-600" aria-hidden="true" />
          ) : (
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
          )}
          <span>{project.tag}</span>
        </div>
      </div>

      {project.comingSoon ? (
        <div className="mx-auto mt-4 flex min-h-24 max-w-2xl items-center justify-center rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-4 text-center text-base text-black lg:text-lg">
          <div>
            <p className="font-semibold">WestWyn Crown is coming soon.</p>
            <p className="mt-1 text-base text-black lg:text-lg">
              Project details will be announced after the official launch update.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto mt-3 max-w-3xl border-b border-slate-200 px-1 sm:px-2 lg:px-4">
            <div
              role="tablist"
              aria-label={`${project.name} information`}
              className="grid grid-cols-3"
            >
              {views.map(({ label, icon: Icon, color }, index) => {
                const isActive = activeSection === index;

                return (
                  <button
                    key={label}
                    id={`${cardId}-control-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${cardId}-content`}
                    onClick={() => setActiveSection(index)}
                    className={`relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 text-center text-[11px] font-medium leading-tight text-black transition sm:min-h-11 sm:flex-row sm:gap-1.5 sm:text-sm ${
                      isActive
                        ? "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#DDBC69]"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${color}`}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id={`${cardId}-content`}
            role="tabpanel"
            aria-labelledby={`${cardId}-control-${activeSection}`}
            className="mx-auto max-w-3xl px-1 pt-5 sm:px-2 lg:px-4"
          >
            {activeSection === 0 ? (
              <p className="mx-auto max-w-2xl text-center text-[16px] leading-[1.65] text-black lg:text-[18px]">
                {project.description}
              </p>
            ) : (
              <ul
                className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
              >
                {activeItems.map(({ label, icon: Icon }, index) => (
                  <li
                    key={label}
                    className="flex min-w-0 items-start justify-start gap-3 text-left"
                  >
                    <Icon
                      className={`mt-1 h-5 w-5 shrink-0 ${iconColors[index % iconColors.length]}`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words text-[16px] leading-[1.45] text-black lg:text-[18px]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === activeSection
                    ? "w-9 bg-slate-900"
                    : "w-5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowDetailsForm(true)}
            className="mx-auto mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#DDBC69] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_5px_12px_rgba(91,67,20,0.16)] transition hover:bg-[#CFAE5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A88A45] focus-visible:ring-offset-2 lg:text-base"
          >
            <FaWhatsapp className="h-4 w-4 text-[#166534]" aria-hidden="true" />
            <span>Get Details On Whatsapp</span>
          </button>
        </>
      )}

      {showDetailsForm && (
        <GetinTouch
          onClose={() => setShowDetailsForm(false)}
          title="Get Project Details"
          subtitle={project.name}
          buttonName="Book Your Plot"
          thankYouMessage="We will contact you shortly on WhatsApp."
        />
      )}
    </article>
  );
}

export default function WestWyn() {
  return (
    <section
      id="westwyn-estates"
      aria-labelledby="westwyn-projects-heading"
      className="relative w-full bg-white py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 text-center sm:mb-8 lg:mb-9">
          <h2
            id="westwyn-projects-heading"
            className="text-[30px] font-semibold leading-tight tracking-[-0.03em] text-black lg:text-[40px]"
          >
            Our Projects
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#DDBC69]"
          />
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
