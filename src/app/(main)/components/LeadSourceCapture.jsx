"use client";

import { useEffect } from "react";
import { captureLeadSource } from "@/lib/leadSource";

export default function LeadSourceCapture() {
  useEffect(() => {
    captureLeadSource();
  }, []);

  return null;
}