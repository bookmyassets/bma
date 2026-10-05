"use client";

import { InlineWidget } from "react-calendly";

const CALENDLY_URL =
  "https://calendly.com/info-bookmyassets?primary_color=ddbc69";

export default function CalendlyEmbed() {
  return (
    <div className="min-w-0 overflow-hidden bg-white">
      <InlineWidget
        url={CALENDLY_URL}
        styles={{
          minWidth: "100%",
          height: "clamp(760px, 88vh, 920px)",
        }}
      />
    </div>
  );
}
