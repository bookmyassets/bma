"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import residencyImage from "@/assests/residential/residency/westwyn-residency-dholera-entry-gate.webp";
import crownImage from "@/assests/residential/crown/westwyn-crown-dholera-entry-gate-desktop.webp";
import { getWestwynSectionSurface } from "./WestwynTheme";

const RESIDENTIAL_PROJECTS_URL =
  "/data/Residential.json?v=20260803-project-images";

/* =========================================================
   FEATURED PROJECTS
========================================================= */

const FEATURED_PROJECTS = [
  {
    projectName: "WestWyn Crown",
    location: "Dholera, Gujarat",
    link: "westwyn-crown",
    image: crownImage,
    displayStatus: "Upcoming",
    statusType: "upcoming",
  },
  {
    projectName: "WestWyn Residency",
    location: "1.5 KM from DFC",
    link: "westwyn-residency",
    image: residencyImage,
    displayStatus: "Newly Launched",
    statusType: "newly-launched",
  },
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ statusType, label }) {
  const badgeStyles = {
    upcoming:
      "border border-[#295C9D] bg-[#102847] text-[#7DB4FF]",
    "newly-launched":
      "border border-[#6E5711] bg-[#3E3108] text-[#F1CF56]",
    resale:
      "border border-[#6A2C2C] bg-[#341616] text-[#F09898]",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1
        text-[11px] font-semibold uppercase tracking-[0.08em]
        ${badgeStyles[statusType] || badgeStyles.resale}
      `}
    >
      {label}
    </span>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ project }) {
  return (
    <Link
      href={`/dholera-residential-plots/${project.link}`}
      className="group block"
    >
      <article
        className="
          relative flex items-center gap-4 rounded-[20px]
          border border-white/[0.08]
          bg-[#0D0D0D]
          p-3 sm:p-4
          shadow-[0_18px_45px_rgba(0,0,0,0.28)]
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#DDBC69]/25
          hover:bg-[#111111]
        "
      >
        {/* Image */}
        <div
          className="
            relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-[14px]
            bg-[#161616] sm:h-[84px] sm:w-[112px]
          "
        >
          <Image
            src={project.image}
            alt={project.projectName}
            fill
            sizes="160px"
            className="
              object-cover transition-transform duration-500
              group-hover:scale-[1.05]
            "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <StatusBadge
              statusType={project.statusType}
              label={project.displayStatus}
            />
          </div>

          <h3
            className="
              truncate text-[1.15rem] font-semibold leading-tight text-white
              transition-colors duration-300 group-hover:text-[#F0D58B]
              sm:text-[1.3rem] 
            "
          >
            {project.projectName}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-md text-white">
            <MapPin className="h-4 w-4 shrink-0 text-white" />
            <p className="truncate">{project.location}</p>
          </div>
        </div>

        {/* Arrow */}
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center rounded-full
            border border-white/[0.08]
            bg-[#121212]
            text-[#727272]
            transition-all duration-300
            group-hover:border-[#DDBC69]/30
            group-hover:bg-[#181818]
            group-hover:text-[#DDBC69]
          "
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </article>
    </Link>
  );
}

/* =========================================================
   ACTIVE PROJECTS SECTION
========================================================= */

const ActiveProjectsSection = ({ surface = "alt" }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(RESIDENTIAL_PROJECTS_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        const filtered = data.filter((project) => {
          const slug = project.link || "";

          return ![
            "westwyn-residency",
            "westwyn-crown",
          ].includes(slug);
        });

        const normalized = filtered.map((project) => {
          let location = project.location;
          let statusType = "resale";
          let displayStatus = "Resale";

          if (project.link === "westwyn-estate") {
            location = "State Highway 117";
          }

          if (project.link === "westwyn-county") {
            location = "Fedra-Pipli State Highway";
          }

          return {
            ...project,
            location,
            statusType,
            displayStatus,
          };
        });

        setProjects([...FEATURED_PROJECTS, ...normalized]);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(FEATURED_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section
      className={`
        ${getWestwynSectionSurface(surface)}
        relative overflow-hidden py-16 text-white
        sm:py-15 lg:py-18
      `}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-[-160px]
          h-[320px] w-[680px] -translate-x-1/2 rounded-full
          bg-[#DDBC69]/[0.035] blur-[110px]
        "
      />

      <div
        className="
          relative z-10 mx-auto w-full max-w-6xl
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12">

          <h2
            className="
              text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1]
              text-[#DDBC69] font-playfair-display
            "
          >
            Explore Our Projects
          </h2>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  flex items-center gap-4 rounded-[20px]
                  border border-white/[0.08]
                  bg-[#0D0D0D] p-4
                "
              >
                <div className="h-[76px] w-[100px] animate-pulse rounded-[14px] bg-white/[0.06]" />
                <div className="flex-1">
                  <div className="mb-3 h-6 w-28 animate-pulse rounded-full bg-white/[0.06]" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.08]" />
                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.link}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveProjectsSection;