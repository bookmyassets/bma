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

        <div
          className="
    rounded-xl
    border
    border-[#ddbc69]/35
    bg-[#080808]
    p-4
    shadow-[0_0_24px_rgba(221,188,105,0.07)]
    sm:p-5
    md:p-6
  "
        >
          {/* Heading */}
          <p
            className="
      text-center
      text-sm
      font-semibold
      uppercase
      tracking-[0.08em]
      text-[#ddbc69]
      sm:text-base
    "
          >
            Availability Status
          </p>

          {/* Main content */}
          <div
            className="
      mx-auto
      mt-5
      flex
      max-w-2xl
      flex-col
      gap-5
      md:grid
      md:grid-cols-[1fr_auto]
      md:items-center
      md:gap-8
    "
          >
            {/* Availability information */}
            <div className="min-w-0">
              {/* Percentage */}
              <div className="text-center md:text-left">
                <div className="flex items-end justify-center gap-2 md:justify-start">
                  <span
                    className="
              text-[clamp(2rem,6vw,3rem)]
              font-semibold
              leading-none
              text-[#f5f1e8]
            "
                  >
                    {safePercentage}%
                  </span>

                  <span
                    className="
              pb-1
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#ddbc69]
              sm:text-sm
            "
                  >
                    {percentageLabel}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div
                  className="
            h-2
            w-full
            overflow-hidden
            rounded-full
            bg-[#ddbc69]/15
          "
                >
                  <div
                    className="
              h-full
              rounded-full
              bg-[#ddbc69]
              transition-all
              duration-500
            "
                    style={{
                      width: `${safePercentage}%`,
                    }}
                  />
                </div>

                <div
                  className="
            mt-2
            flex
            items-center
            justify-between
            gap-3
            text-[1rem]
            text-[#f5f1e8]/55
          "
                >
                  <span>Sold</span>
                  <span>Current Inventory</span>
                </div>
              </div>

              {/* Supporting copy */}
              <p
                className="
          mt-3
          text-center
          text-md
          leading-5
          text-[#f5f1e8]/60
          md:text-left
          sm:text-sm
        "
              >
                Check current plot availability with our team.
              </p>
            </div>

            {/* CTA */}
            <Link
              href={`https://wa.me/918130371647?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
  inline-flex
  min-h-10
  w-[88%]
  max-w-[19rem]
  items-center
  justify-center
  gap-1.5
  self-center
  rounded-lg
  bg-[#ddbc69]
  px-4
  py-2.5
  text-[0.78rem]
  font-semibold
  leading-tight
  text-[#101010]
  transition-all
  duration-300
  hover:bg-[#ebcb7a]
  focus:outline-none
  focus:ring-2
  focus:ring-[#ddbc69]
  focus:ring-offset-2
  focus:ring-offset-[#080808]

  sm:min-h-11
  sm:w-auto
  sm:min-w-[17rem]
  sm:max-w-none
  sm:px-5
  sm:py-3
  sm:text-sm

  md:min-h-12
  md:px-6
  md:text-base
"
            >
              <FaWhatsapp
                className="size-4 shrink-0 sm:size-5"
                aria-hidden="true"
              />

              <span>Check Availability</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
