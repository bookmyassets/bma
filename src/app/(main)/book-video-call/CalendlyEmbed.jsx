"use client";

import { InlineWidget } from "react-calendly";

const CALENDLY_URL =
  "https://calendly.com/info-bookmyassets?primary_color=ddbc69";

export default function CalendlyEmbed() {
  return (
    <div className="-mx-4 overflow-hidden border-y border-[#ddbc69]/40 bg-white shadow-sm sm:mx-0 sm:rounded-2xl sm:border">
      <InlineWidget
        url={CALENDLY_URL}
        styles={{
          minWidth: "320px",
          height: "700px",
        }}
      />
    </div>
  );
}
