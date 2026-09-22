import {
  FaArrowRotateLeft,
  FaCircleCheck,
  FaFileCircleCheck,
  FaHouse,
  FaLocationDot,
  FaShieldHalved,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { getWestwynSectionSurface } from "./WestwynTheme";

const defaultCommitments = [
  {
    id: "legal-clearance",
    title: "NA/NOC/Title Clear",
    Icon: FaShieldHalved,
    iconClass: "text-emerald-400",
    iconBgClass: "bg-emerald-500/10",
    iconBorderClass: "border-emerald-400/25",
  },
  {
    id: "plan-approved",
    title: "Plan Pass Approved",
    Icon: FaFileCircleCheck,
    iconClass: "text-sky-400",
    iconBgClass: "bg-sky-500/10",
    iconBorderClass: "border-sky-400/25",
  },
  {
    id: "registry-ready",
    title: "Registry Ready",
    Icon: FaCircleCheck,
    iconClass: "text-[#E4C56F]",
    iconBgClass: "bg-[#DDBC69]/10",
    iconBorderClass: "border-[#DDBC69]/25",
  },
  {
    id: "resale-support",
    title: "Resale Support",
    Icon: FaArrowRotateLeft,
    iconClass: "text-violet-400",
    iconBgClass: "bg-violet-500/10",
    iconBorderClass: "border-violet-400/25",
  },
  {
    id: "rental-support",
    title: "Rental Support",
    Icon: FaHouse,
    iconClass: "text-orange-400",
    iconBgClass: "bg-orange-500/10",
    iconBorderClass: "border-orange-400/25",
  },
  {
    id: "site-visit",
    title: "Site Visit Assistance",
    Icon: FaLocationDot,
    iconClass: "text-rose-400",
    iconBgClass: "bg-rose-500/10",
    iconBorderClass: "border-rose-400/25",
  },
];

export default function WestWynCommitments({
  heading = "Our Commitments",
  items = defaultCommitments,
  sectionId = "our-commitments",
  surface="alt"
}) {
  const commitments = Array.isArray(items)
    ? items.filter(Boolean)
    : defaultCommitments;

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
      className={cn(
        `relative
        overflow-hidden

        bg-[#0B0B0B]

        px-4
        py-8

        text-white

        sm:px-6
        sm:py-10

        lg:px-8
        lg:py-12`,
        getWestwynSectionSurface(surface)
      )}
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-40
          top-1/2

          h-[420px]
          w-[420px]

          -translate-y-1/2

          rounded-full

          bg-[#DDBC69]/[0.035]

          blur-[120px]
        "
      />


      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-48
          bottom-0

          h-[420px]
          w-[420px]

          rounded-full

          bg-[#DDBC69]/[0.025]

          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <h2
            id={`${sectionId}-title`}
            className="
              font-playfair-display

              text-[30px]
              font-semibold

              leading-[1.1]

              tracking-[-0.04em]

              text-[#DDBC69]

              lg:text-[40px]
              lg:leading-[0.98]
            "
          >
            {heading}
          </h2>

          <div
            aria-hidden="true"
            className="
              mx-auto
              mt-3

              h-[2px]
              w-12

              rounded-full

              bg-[#DDBC69]/70
            "
          />
        </div>

        {/* =========================================
            COMMITMENT CARDS
        ========================================== */}

        <div
          id="counters-section"
          className="
            mt-6

            grid
            grid-cols-2

            gap-3

            sm:mt-7
            sm:gap-4

            lg:mt-8
            lg:grid-cols-3
            lg:gap-5
          "
        >
          {commitments.map((item, index) => {
            const Icon = item.Icon || item.icon;

            const iconClass = item.iconClass || "text-[#DDBC69]";

            const iconBgClass = item.iconBgClass || "bg-[#DDBC69]/10";

            const iconBorderClass =
              item.iconBorderClass || "border-[#DDBC69]/25";

            return (
              <article
                key={item.id || `${item.title}-${index}`}
                className="
                  flex
                  min-h-[118px]

                  flex-col

                  items-center
                  justify-center

                  gap-3

                  rounded-xl

                  border
                  border-white/10

                  bg-[#11100E]

                  px-3
                  py-4

                  text-center

                  sm:min-h-[135px]
                  sm:px-4
                  sm:py-5

                  lg:min-h-[155px]
                  lg:px-5
                  lg:py-6
                "
              >
                {/* Icon */}

                {Icon ? (
                  <div
                    className={`
      flex
      size-11
      shrink-0

      items-center
      justify-center

      rounded-full

      border

      ${iconBorderClass}
      ${iconBgClass}

      sm:size-12

      lg:size-14
    `}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`
        size-5

        ${iconClass}

        sm:size-[22px]

        lg:size-6
      `}
                    />
                  </div>
                ) : null}

                {/* Content */}

                <div>
                  <h3
                    className="
                      mx-auto

                      max-w-[190px]

                      text-[14px]
                      font-semibold

                      leading-[1.3]

                      text-white

                      sm:text-base

                      lg:max-w-[230px]
                      lg:text-[18px]
                    "
                  >
                    {item.title}
                  </h3>

                  <div
                    aria-hidden="true"
                    className="
                      mx-auto
                      mt-2.5

                      h-px
                      w-8

                      bg-[#DDBC69]/50
                    "
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
