"use client";

import {
  BatteryCharging,
  Cctv,
  Fence,
  Footprints,
  Gamepad2,
  PersonStanding,
  Route,
  ShieldCheck,
  Smartphone,
  UsersRound,
  UtilityPole,
  Waves,
} from "lucide-react";

import WestWynAmenities from "../components/westwyn/WestWynAmenities";

// import boundaryImage from "@/assests/residential/estates/Projectboundary.webp";
// import entryGateImage from "@/assests/residential/estates/westwyn-estates-dholera-entry-gate.webp";
// import kidsPlayImage from "@/assests/residential/estates/kidsplayarea.webp";
// import yogaImage from "@/assests/residential/estates/yogadeck.webp";
// import joggingImage from "@/assests/residential/estates/westwyn-estates-dholera-sir-jogging-track.webp";

const amenities = [
  {
    id: "boundary",
    title: "Project Boundary",
    subtitle: "Clearly defined project limits",

    Icon: Fence,

    iconColor: "text-amber-300",
    iconBackground: "bg-amber-400/10",
    iconBorder: "border-amber-300/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(252,211,77,0.18)]",
  },

  {
    id: "gated",
    title: "Gated Community",
    subtitle: "Controlled project access",

    Icon: ShieldCheck,

    iconColor: "text-emerald-400",
    iconBackground: "bg-emerald-400/10",
    iconBorder: "border-emerald-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(52,211,153,0.18)]",
  },

  {
    id: "security",
    title: "24/7 Security & CCTV",
    subtitle: "Round-the-clock surveillance",

    Icon: Cctv,

    iconColor: "text-sky-400",
    iconBackground: "bg-sky-400/10",
    iconBorder: "border-sky-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(56,189,248,0.18)]",
  },

  {
    id: "kids",
    title: "Kids Play Area",
    subtitle: "Dedicated recreational space",

    Icon: Gamepad2,

    iconColor: "text-pink-400",
    iconBackground: "bg-pink-400/10",
    iconBorder: "border-pink-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(244,114,182,0.18)]",
  },

  {
    id: "management",
    title: "App-Based Management",
    subtitle: "Convenient community management",

    Icon: Smartphone,

    iconColor: "text-violet-400",
    iconBackground: "bg-violet-400/10",
    iconBorder: "border-violet-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(167,139,250,0.18)]",
  },

  {
    id: "power",
    title: "Power & Water Supply",
    subtitle: "Essential infrastructure",

    Icon: UtilityPole,

    iconColor: "text-yellow-300",
    iconBackground: "bg-yellow-400/10",
    iconBorder: "border-yellow-300/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(253,224,71,0.18)]",
  },

  {
    id: "yoga",
    title: "Yoga Deck",
    subtitle: "Space for health and wellness",

    Icon: PersonStanding,

    iconColor: "text-purple-400",
    iconBackground: "bg-purple-400/10",
    iconBorder: "border-purple-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(192,132,252,0.18)]",
  },

  {
    id: "jogging",
    title: "Jogging Track",
    subtitle: "Dedicated outdoor activity space",

    Icon: Footprints,

    iconColor: "text-orange-400",
    iconBackground: "bg-orange-400/10",
    iconBorder: "border-orange-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(251,146,60,0.18)]",
  },

  {
    id: "senior",
    title: "Senior Citizen Zone",
    subtitle: "Comfort and community",

    Icon: UsersRound,

    iconColor: "text-rose-300",
    iconBackground: "bg-rose-400/10",
    iconBorder: "border-rose-300/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(253,164,175,0.18)]",
  },

  {
    id: "ev",
    title: "EV Charging Station",
    subtitle: "EV-ready infrastructure",

    Icon: BatteryCharging,

    iconColor: "text-lime-400",
    iconBackground: "bg-lime-400/10",
    iconBorder: "border-lime-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(163,230,53,0.18)]",
  },

  {
    id: "roads",
    title: "Wide Internal Roads",
    subtitle: "Planned internal circulation",

    Icon: Route,

    iconColor: "text-cyan-400",
    iconBackground: "bg-cyan-400/10",
    iconBorder: "border-cyan-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(34,211,238,0.18)]",
  },

  {
    id: "drainage",
    title: "Drainage System",
    subtitle: "Planned drainage infrastructure",

    Icon: Waves,

    iconColor: "text-blue-400",
    iconBackground: "bg-blue-400/10",
    iconBorder: "border-blue-400/30",
    iconGlow:
      "shadow-[0_8px_24px_rgba(96,165,250,0.18)]",
  },
];

export default function Amenities({surface="base"}) {
  return (
    <WestWynAmenities
     surface={surface}
      projectName="WestWyn Estates"
      amenities={amenities}
    />
  );
}