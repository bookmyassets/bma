"use client";

import { usePathname } from "next/navigation";

import PopupLeadForm from "./PopupLeadForm";

export default function GlobalPopupLeadForm() {
  const pathname = usePathname();
  const isAfterSalesRoute =
    pathname === "/after-sales" || pathname?.startsWith("/after-sales/");

  if (isAfterSalesRoute) return null;

  return <PopupLeadForm type="rage" />;
}
