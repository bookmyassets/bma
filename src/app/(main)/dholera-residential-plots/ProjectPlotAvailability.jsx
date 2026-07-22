import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function ProjectPlotAvailability({
  projectName,
  minSize,
  maxSize,
  percentage,
  percentageLabel,
  statusText,
  inventoryLabel = "Plot sizes and availability vary by current inventory.",
}) {
  const safePercentage = Number.isFinite(percentage)
    ? Math.min(100, Math.max(0, percentage))
    : 0;
  const headingId = `${projectName.toLowerCase().replaceAll(" ", "-")}-plot-sizes`;
  const whatsappText = encodeURIComponent(
    `Hi, I'd like to check the current plot-size availability in ${projectName}`,
  );

  return (
    <section
      aria-labelledby={headingId}
      className="bg-black px-4 py-6 text-[#f5f1e8] sm:px-6 sm:py-8"
    >
      <div className="mx-auto max-w-4xl space-y-3">
        <div className="rounded-xl border border-[#ddbc69]/35 bg-[#080808] p-4 shadow-[0_0_24px_rgba(221,188,105,0.07)] sm:p-5">
          <h2
            id={headingId}
            className="text-center text-base font-semibold uppercase tracking-[0.08em] text-[#ddbc69] sm:text-lg"
          >
            Plot Sizes Available
          </h2>

          <div className="mx-auto mt-3 grid max-w-xl grid-cols-2 gap-2.5 sm:gap-3">
            {[
              { label: "Minimum", size: minSize },
              { label: "Maximum", size: maxSize },
            ].map((plotSize) => (
              <div
                key={plotSize.label}
                className="flex min-h-20 flex-col items-center justify-center rounded-lg border border-[#ddbc69]/40 bg-[#101010] px-2 py-3 text-center sm:min-h-24"
              >
                <span className="text-[clamp(1.5rem,4vw,2.1rem)] font-semibold leading-none text-[#f5f1e8]">
                  {plotSize.size}
                </span>
                <span className="mt-1.5 text-[0.7rem] font-medium text-[#f5f1e8]/65 sm:text-sm">
                  Sq. Yd. {plotSize.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-center text-xs leading-5 text-[#f5f1e8]/60 sm:text-sm">
            {inventoryLabel}
          </p>
        </div>

        <div className="rounded-xl border border-[#ddbc69]/35 bg-[#080808] p-4 shadow-[0_0_24px_rgba(221,188,105,0.07)] sm:p-5">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.08em] text-[#ddbc69] sm:text-base">
            Availability Status
          </p>

          <div className="mt-4 grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
            <div
              role="img"
              aria-label={`${safePercentage} percent ${percentageLabel}`}
              className="flex size-[5.5rem] items-center justify-center rounded-full p-1.5 sm:size-28 sm:p-2"
              style={{
                background: `conic-gradient(#ddbc69 0 ${safePercentage}%, rgba(221, 188, 105, 0.18) ${safePercentage}% 100%)`,
              }}
            >
              <div className="flex size-full items-center justify-center rounded-full bg-[#101010] text-center">
                <div>
                  <span className="block text-base font-semibold uppercase text-[#f5f1e8] sm:text-lg">
                    {safePercentage}%
                  </span>
                  <span className="block text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#ddbc69] sm:text-[0.65rem]">
                    {percentageLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-2 items-center gap-2 sm:gap-4">
              <p className="text-center text-sm font-semibold leading-5 text-[#f5f1e8] sm:text-lg">
                {statusText}
              </p>
              <Link
                href={`https://wa.me/918130371647?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-[#ddbc69] px-2 py-2 text-center text-[0.7rem] font-semibold leading-tight text-[#101010] transition-colors hover:bg-[#ebcb7a] focus:outline-none focus:ring-2 focus:ring-[#ddbc69] focus:ring-offset-2 focus:ring-offset-[#080808] sm:gap-2 sm:px-4 sm:text-sm"
              >
                <FaWhatsapp className="size-4 shrink-0" aria-hidden="true" />
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
