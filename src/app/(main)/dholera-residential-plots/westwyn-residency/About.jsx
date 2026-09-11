"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Download,
  Factory,
  Headphones,
  Hospital,
  MapPin,
  MapPinned,
  Milestone,
  Phone,
  Plane,
  Route,
  TrainFront,
  FileDown,
} from "lucide-react";

import BrochureDownload from "../../components/BrochureDownload";

import img from "@/assests/residential/residency/Residency.webp";

const brochureUrl =
  "https://cdn.sanity.io/files/c3e1h345/projects/ff6834296b06f1a58794fae05302be6507dca8a9.pdf";

const locations = [
  {
    id: "mdr",
    title: "Direct Entry from Major District Road (MDR)",
    value: "Direct Access",
    x: 18,
    y: 70,
    Icon: Route,
    description: "Direct access to the project from the Major District Road.",
  },
  {
    id: "dfc",
    title: "Dedicated Freight Corridor (DFC)",
    value: "2 Minutes",
    x: 39,
    y: 38,
    Icon: TrainFront,
    description:
      "A key freight and logistics corridor close to WestWyn Residency.",
  },
  {
    id: "railway",
    title: "Railway Connectivity",
    value: "2 Minutes",
    x: 32,
    y: 56,
    Icon: TrainFront,
    description:
      "Convenient access to nearby railway connectivity and Bhimnath Junction.",
  },
  {
    id: "boundary",
    title: "Dholera SIR Boundary",
    value: "5 Minutes",
    x: 58,
    y: 22,
    Icon: MapPinned,
    description: "The Dholera SIR boundary is a short drive from the project.",
  },
  {
    id: "expressway",
    title: "Ahmedabad Dholera Expressway",
    value: "12 Minutes",
    x: 75,
    y: 51,
    Icon: Milestone,
    description:
      "Fast access toward Ahmedabad through the Ahmedabad-Dholera Expressway.",
  },
  {
    id: "hospital",
    title: "RMS Multi-Specialty Hospital",
    value: "17 Minutes",
    x: 70,
    y: 76,
    Icon: Hospital,
    description:
      "RMS Multi-Specialty Hospital is accessible for everyday healthcare needs.",
  },
  {
    id: "semiconductor",
    title: "Tata Semiconductor Plant",
    value: "22 Minutes",
    x: 84,
    y: 28,
    Icon: Factory,
    description:
      "Close to the Tata Semiconductor Plant and the region's industrial growth.",
  },
  {
    id: "airport",
    title: "Dholera International Airport",
    value: "30 Minutes",
    x: 88,
    y: 87,
    Icon: Plane,
    description:
      "The upcoming airport corridor is accessible from the project location.",
  },
  {
    id: "facilities",
    title: "Nearby Public Facilities",
    subtitle:
      "Bus stand, school, hospital, shopping complex, park, food courts.",
    value: "Close By",
    x: 48,
    y: 76,
    Icon: Building2,
    description: "Daily essentials and public facilities are available nearby.",
  },
  {
    id: "industrial",
    title: "Industrial Proximity",
    subtitle: "Tata Semiconductor Plant & Hebatpur Industrial Area",
    value: "Just 25 Minutes",
    x: 65,
    y: 38,
    Icon: Factory,
    description: "Industrial areas remain within practical driving distance.",
  },
];

const locationToneClasses = {
  mdr: "bg-[#0EA5E9] text-white ring-[#38BDF8]",
  dfc: "bg-[#8B5CF6] text-white ring-[#A78BFA]",
  railway: "bg-[#3B82F6] text-white ring-[#60A5FA]",
  boundary: "bg-[#10B981] text-white ring-[#34D399]",
  expressway: "bg-[#F59E0B] text-white ring-[#FBBF24]",
  hospital: "bg-[#F43F5E] text-white ring-[#FB7185]",
  semiconductor: "bg-[#F97316] text-white ring-[#FB923C]",
  airport: "bg-[#06B6D4] text-white ring-[#22D3EE]",
  facilities: "bg-[#14B8A6] text-white ring-[#2DD4BF]",
  industrial: "bg-[#D946EF] text-white ring-[#E879F9]",
};

function getLocationTone(id) {
  return (
    locationToneClasses[id] || "bg-slate-100 text-slate-700 ring-slate-200/80"
  );
}

function MapMarker({ location, isActive, showLabel, onSelect }) {
  const Icon = location.Icon;
  const toneClass = getLocationTone(location.id);

  return (
    <button
      type="button"
      aria-label={`Show ${location.title}`}
      aria-pressed={isActive}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(location.id);
      }}
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all duration-300"
    >
      <span
        className={`relative flex size-9 items-center justify-center rounded-full border-2 opacity-100 shadow-[0_8px_18px_rgba(32,32,32,0.28)] ring-1 transition-all duration-300 sm:size-10 ${
          isActive
            ? `scale-110 border-white ${toneClass} ring-2`
            : `border-white ${toneClass}`
        }`}
      >
        <Icon className="size-4 sm:size-[18px]" strokeWidth={1.8} />
        <span
          className={`absolute inset-[-6px] rounded-full border border-current/45 transition-opacity ${
            isActive
              ? "opacity-100 motion-safe:animate-pulse"
              : "opacity-0"
          }`}
        />
      </span>
      <span
        className={`pointer-events-none absolute left-1/2 top-full mt-2 block w-max max-w-[150px] -translate-x-1/2 rounded-lg border border-[#DED4C4] bg-[#F7F3EB] px-2 py-1.5 text-left text-[10px] font-semibold leading-tight text-[#202020] shadow-[0_8px_20px_rgba(32,32,32,0.14)] transition-opacity duration-200 sm:max-w-[190px] sm:px-2.5 sm:py-2 sm:text-xs ${
          showLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        {location.title}
      </span>
    </button>
  );
}

function LocationDetailCard({ location, onClose, inline = false }) {
  const Icon = location.Icon;
  const toneClass = getLocationTone(location.id);

  return (
    <div
      className={`z-20 rounded-xl border border-[#DED4C4] bg-[#F7F3EB]/95 p-3 shadow-[0_12px_30px_rgba(32,32,32,0.16)] backdrop-blur-md ${
        inline
          ? "relative mt-2"
          : "absolute bottom-4 left-4 w-[min(320px,calc(100%-2rem))]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${toneClass}`}
        >
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight text-[#202020]">
            {location.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#6F6A62]">
            {location.description}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#9D6C20]">
            {location.value}
          </p>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close location details"
          className="text-lg leading-none text-[#6F6A62] hover:text-[#202020]"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function InteractiveMap({ activeLocation, onSelect }) {
  const selected = locations.find((location) => location.id === activeLocation);
  const visibleLocations = activeLocation
    ? locations.filter((location) => location.id === activeLocation)
    : [];

  return (
    <div className="group lg:h-full">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-[#F7F3EB] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[400px]"
      >
        <Image
          src={img}
          alt="WestWyn Residency location map near Pipariya, Dholera"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
          className="object-contain transition-transform duration-700 ease-out lg:object-cover motion-safe:group-hover:scale-[1.02]"
        />
        {visibleLocations.map((location) => (
          <MapMarker
            key={location.id}
            location={location}
            isActive={activeLocation === location.id}
            showLabel={activeLocation === location.id}
            onSelect={onSelect}
          />
        ))}
        {selected && (
          <div className="hidden sm:block">
            <LocationDetailCard
              location={selected}
              onClose={() => {
                onSelect(null);
              }}
            />
          </div>
        )}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl border border-[#DED4C4]/80 bg-[#F7F3EB]/95 px-3 py-2 shadow-[0_8px_25px_rgba(32,32,32,0.1)] backdrop-blur-md sm:left-4 sm:top-4 sm:px-4">
          <MapPin className="size-5 text-[#9D7839]" />
          <span className="text-sm font-semibold text-[#202020]">
            Strategic Location
          </span>
        </div>
      </div>

      {selected && (
        <div className="sm:hidden">
          <LocationDetailCard
            location={selected}
            onClose={() => {
              onSelect(null);
            }}
            inline
          />
        </div>
      )}
    </div>
  );
}

function ConnectivityRow({ location, isActive, onSelect }) {
  const Icon = location.Icon;
  const toneClass = getLocationTone(location.id);

  const handleSelect = () => {
    onSelect(location.id);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={`group grid min-h-[58px] w-full grid-cols-[36px_minmax(0,1fr)] items-center gap-x-2 gap-y-1 rounded-xl border px-2.5 py-1.5 text-left transition-all duration-300 sm:min-h-[66px] ${
        isActive
          ? "border-[#B8924F] bg-white shadow-[0_8px_20px_rgba(184,146,79,0.12)]"
          : "border-[#DED4C4] bg-[#FBF8F2]/95 hover:border-[#B8924F]/60 hover:bg-white"
      }`}
    >
      <span
        className={`row-span-2 flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 motion-safe:group-hover:scale-105 ${toneClass}`}
      >
        <Icon className="size-[18px]" strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block break-words text-sm font-semibold leading-[1.25] text-[#303030] sm:text-[15px]">
          {location.title}
        </span>
        {location.subtitle && (
          <span className="mt-0.5 block text-xs leading-[1.25] text-[#777067] sm:text-[13px]">
            {location.subtitle}
          </span>
        )}
      </span>
      <span className="col-start-2 flex items-center justify-between gap-2 text-left text-xs font-semibold leading-[1.2] text-[#9D6C20] sm:text-[13px]">
        {location.value}
        <ChevronRight className="size-5 shrink-0" />
      </span>
    </button>
  );
}

const WestWynAboutSection = () => {
  const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [showAllLocations, setShowAllLocations] = useState(false);

  const handleLocationSelect = (locationId) => {
    setActiveLocation(locationId);
  };

  const openBrochureForm = () => {
    setIsBrochureFormOpen(true);
  };

  const closeBrochureForm = () => {
    setIsBrochureFormOpen(false);
  };

  const handleAfterSubmit = () => {
    try {
      setTimeout(() => {
        const link = document.createElement("a");

        link.href = brochureUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 300);
    } catch (error) {
      console.error("Error opening brochure:", error);

      window.open(brochureUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* =========================================================
          PROJECT SNAPSHOT
      ========================================================== */}
      <section
        id="project-overview"
        className="
          relative
          overflow-hidden
          bg-[#F7F3EB]
          text-[#202020]
        "
      >
        {/* Very subtle background glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-white/40
            blur-[120px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl

            px-5
            py-7

            sm:px-8
            sm:py-9

            lg:px-12
            lg:py-11

            xl:px-16
          "
        >
          {/* Main Heading */}
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="
                text-[#202020]
                font-serif
                text-[2rem]
                font-medium
                leading-[1.12]
                tracking-[-0.025em]

                sm:text-[2.25rem]
                lg:text-[2.55rem]
                xl:text-[2.75rem]
              "
            >
              Your Plot Today
              <span
                className="
                  mt-0.5
                  block
                  text-[#ca8a04]
                  text-[1.6rem]
                  leading-[1.2]

                  sm:text-[1.75rem]
                  lg:text-[2rem]
                  xl:text-[2.15rem]
                "
              >
                A Brighter Tomorrow
              </span>
            </h2>
          </div>

          {/* Description */}
          <div
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-center
              flex
              items-center
              justify-center
              sm:mt-5
              lg:mt-6
            "
          >
            <p
              className="
                lg:text-[18px]
                leading-7
                text-black
                sm:text-[15px]
                sm:leading-7
                lg:leading-8
              "
            >
              WestWyn Residency is a{" "}
              <span className="font-medium text-black">
                40,000 sq. yard residential plot project
              </span>{" "}
              in Pipariya developed by BookMyAssets. Located on a Major District
              Road in Dholera, the project is just 1.5 km from the{" "}
              <Link
                href="https://www.bookmyassets.com/dholera-sir-blogs/dedicated-freight-corridor-dholera-delhi-mumbai-connectivity"
                className="
                  font-medium
                  text-[#ca8a04]
                  underline
                  decoration-[#B8924F]/35
                  underline-offset-4
                  transition-colors
                  hover:text-[#7D5B27]
                "
              >
                Dedicated Freight Corridor
              </Link>{" "}
              and close to Bhimnath Railway Junction, with convenient access to
              daily public facilities and transport.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
    PRIME LOCATION
========================================================== */}
      {/* =========================================================
    PRIME LOCATION
========================================================== */}
      <section
        id="prime-location"
        className="
    relative
    overflow-hidden
    border-t
    border-[#DED4C4]
    bg-[#F7F3EB]
    text-[#202020]
  "
      >
        <div
          className="
      relative
      z-10
      mx-auto
      max-w-7xl
      px-4
      py-7

      sm:px-7
      sm:py-9

      md:px-9

      lg:px-12
      lg:py-11

      xl:px-16
      xl:py-12
    "
        >
          {/* =====================================================
        HEADING
    ====================================================== */}
          <div className="relative mx-auto max-w-4xl text-center">
            <h2
              className="
          font-serif
          text-[2rem]
          font-medium
          leading-[1.12]
          tracking-[-0.025em]
          text-[#202020]

          sm:text-[2.25rem]
          lg:text-[2.55rem]
          xl:text-[2.75rem]
        "
            >
              Well Connected to Dholera&apos;s
              <span
                className="
            mt-0.5
            block
            text-[1.6rem]
            leading-[1.2]
            text-[#ca8a04]

            sm:text-[1.75rem]
            lg:text-[2rem]
            xl:text-[2.15rem]
          "
              >
                Key Growth Corridors
              </span>
            </h2>
          </div>

          {/* =====================================================
        LOCATION CONTENT
    ====================================================== */}
          <div
            className="
        mt-5
        grid
        items-stretch
        gap-5

        sm:mt-6

        lg:mt-7
        lg:grid-cols-[1fr_1.02fr]
        lg:gap-5
      "
          >
            {/* ===================================================
          LEFT MAP
      ==================================================== */}
            <div
              id="location-map"
              className="
          group
          relative
          overflow-hidden

          rounded-[22px]

          border
          border-[#DED4C4]

          bg-[#FBF8F2]

          p-1.5

          shadow-[0_18px_45px_rgba(74,59,33,0.07)]

          sm:p-2
        "
            >
              <InteractiveMap
                activeLocation={activeLocation}
                onSelect={handleLocationSelect}
              />
            </div>

            {/* ===================================================
          RIGHT CONNECTIVITY LIST
      ==================================================== */}
            <div
              className="
          flex
          flex-col

          rounded-[22px]

          border
          border-[#DED4C4]

          bg-[#F2EBDD]/55

          p-2

          shadow-[0_18px_45px_rgba(74,59,33,0.05)]

          sm:p-2.5

          lg:p-3
        "
            >
              {/* Mobile heading */}
              <p
                className="
            mb-2
            px-1
            text-xs
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[#8B6B35]

            sm:hidden
          "
              >
                {locations.length} nearby connections
              </p>

              {/* Desktop / Tablet */}
              <div className="hidden h-full grid-cols-2 gap-2 sm:grid">
                {locations.map((location) => (
                  <ConnectivityRow
                    key={location.id}
                    location={location}
                    isActive={activeLocation === location.id}
                    onSelect={handleLocationSelect}
                  />
                ))}
              </div>

              {/* Mobile */}
              <div className="grid grid-cols-1 gap-2 sm:hidden">
                {locations
                  .slice(0, showAllLocations ? locations.length : 5)
                  .map((location) => (
                    <ConnectivityRow
                      key={location.id}
                      location={location}
                      isActive={activeLocation === location.id}
                      onSelect={handleLocationSelect}
                    />
                  ))}
              </div>

              {/* View all - mobile */}
              <button
                type="button"
                onClick={() => setShowAllLocations((current) => !current)}
                aria-expanded={showAllLocations}
                className="
            mx-auto
            mt-3
            flex
            min-h-9
            items-center
            justify-center
            gap-2

            rounded-full

            border
            border-[#B8924F]/70

            px-3.5
            py-1.5

            text-xs
            font-semibold
            text-[#9D6C20]

            transition-all
            duration-300

            hover:bg-[#B8924F]/10

            sm:hidden
          "
              >
                {showAllLocations
                  ? "Show fewer connections"
                  : `View all ${locations.length} connections`}

                <ChevronRight
                  className={`size-4 transition-transform duration-300 ${
                    showAllLocations ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* ===================================================
            DOWNLOAD BROCHURE CTA
        ==================================================== */}
              <div
                className="
            mt-4
            border-t
            border-[#DED4C4]
            pt-4

            sm:mt-3
            sm:pt-3
          "
              >
                <button
                  type="button"
                  onClick={() => setIsBrochureFormOpen(true)}
                  className="
              group
              flex
              min-h-[46px]
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-[#B8924F]

              bg-[#B8924F]

              px-4
              py-2.5

              text-[13px]
              font-semibold
              text-white

              shadow-[0_8px_22px_rgba(184,146,79,0.18)]

              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-[#9D7839]
              hover:shadow-[0_12px_28px_rgba(184,146,79,0.24)]

              focus:outline-none
              focus:ring-2
              focus:ring-[#B8924F]/40

              sm:min-h-[48px]
              sm:text-sm
            "
                >
                  <FileDown
                    className="
                size-[17px]
                transition-transform
                duration-300
                group-hover:translate-y-0.5

                sm:size-[18px]
              "
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
    BROCHURE MODAL
========================================================== */}
      <AnimatePresence>
        {isBrochureFormOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Download the WestWyn Residency brochure"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
        fixed
        inset-0
        z-[1000]

        flex
        items-center
        justify-center

        bg-black/65

        p-4

        backdrop-blur-sm
      "
            onClick={closeBrochureForm}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 16,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="w-full max-w-md"
              onClick={(event) => event.stopPropagation()}
            >
              <BrochureDownload
                onClose={closeBrochureForm}
                title="Get Full Project Details"
                buttonName="Get Brochure"
                onAfterSubmit={handleAfterSubmit}
                link={brochureUrl}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WestWynAboutSection;
