import Link from "next/link";

import {
  ArrowUpRight,
  Check,
  Clock3,
} from "lucide-react";

const developmentItems = [
  "Land Cleaning",
  "Land Filling & Leveling",
  "Soil Testing",
  "Project Boundary Development",
  "Internal Road Development",
  "Plot Demarcation",
  "Drainage System",
  "Mechanical, Electrical & Plumbing (MEP) Work",
  "1.75 Lakh Litre Water Tank",
  "Tree Plantation & Landscape Preparation",
];

const nextPhaseItems = [
  "Villa Construction",
  "Power & Water Infrastructure",
  "Landscaped Parks",
  "EV Charging Stations",
  "Other Planned Community Amenities",
];

const developmentUpdateUrl =
  "https://www.bookmyassets.com/dholera-sir-blogs/westwyn-estates-dholera-bookmyassets-construction";

export default function DevelopmentProgress() {
  return (
    <section
      aria-labelledby="development-progress-heading"
      className="
        relative
        overflow-hidden

        bg-[#0B0B0B]

        px-4
        py-8

        text-white

        sm:px-6
        sm:py-10

        lg:px-8
        lg:py-14
      "
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-44
          top-12

          h-[420px]
          w-[420px]

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
          -bottom-48
          -right-44

          h-[460px]
          w-[460px]

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
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>

            <h2
              id="development-progress-heading"
              className="
                mt-2

                max-w-3xl

                font-playfair-display

                text-[30px]
                font-semibold

                leading-[1.08]

                tracking-[-0.035em]

                text-[#DDBC69]

                sm:text-[34px]

                lg:text-[40px]
                lg:leading-[1]
              "
            >
              Current Development at WestWyn Estates
            </h2>

            <p
              className="
                mt-3

                max-w-2xl

                text-[15px]
                leading-6

                text-white

                sm:text-[16px]
                sm:leading-7
              "
            >
              A clear view of the development work completed across the
              project and the infrastructure planned for the next phase.
            </p>
          </div>

          <Link
            href={developmentUpdateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              min-h-11
              w-fit

              items-center
              justify-center
              gap-2

              rounded-lg

              border
              border-[#DDBC69]/50

              bg-[#DDBC69]/10

              px-4
              py-2.5

              text-sm
              font-semibold

              text-[#DDBC69]

              sm:text-[15px]
            "
          >
            View Development Update

            <ArrowUpRight
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
          </Link>
        </div>

        {/* =====================================================
            CURRENT DEVELOPMENT
        ====================================================== */}

        <div className="mt-8 lg:mt-10">
          <div
            className="
              mb-4

              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                size-9

                shrink-0

                items-center
                justify-center

                rounded-full

                border
                border-emerald-400/20

                bg-emerald-500/10

                text-emerald-400
              "
            >
              <Check
                className="size-4"
                strokeWidth={2.5}
              />
            </div>

            <div>
              <h3
                className="
                  text-lg
                  font-semibold

                  text-white

                  sm:text-xl
                "
              >
                Development Progress
              </h3>

              <p
                className="
                  mt-0.5

                  text-[13px]

                  text-white/50

                  sm:text-sm
                "
              >
                Key works completed across the project
              </p>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-1

              gap-2.5

              sm:grid-cols-2
              sm:gap-3

              lg:grid-cols-5
              lg:gap-3
            "
          >
            {developmentItems.map((item, index) => (
              <article
                key={item}
                className="
                  flex

                  min-h-[72px]

                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-white/10

                  bg-[#11100E]

                  px-3.5
                  py-3.5

                  sm:min-h-[80px]

                  lg:min-h-[112px]
                  lg:flex-col
                  lg:items-start
                  lg:justify-between
                  lg:px-4
                  lg:py-4
                "
              >
                <div
                  className="
                    flex
                    size-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-emerald-400/20

                    bg-emerald-500/10

                    text-emerald-400

                    lg:size-9
                  "
                >
                  <Check
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={2.5}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="
                      text-[14px]
                      font-semibold

                      leading-[1.4]

                      text-white

                      sm:text-[15px]

                      lg:text-[15px]
                    "
                  >
                    {item}
                  </p>
                </div>

                <span
                  className="
                    hidden

                    text-[10px]
                    font-semibold
                    uppercase

                    tracking-[0.13em]

                    text-emerald-400/70

                    lg:block
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            NEXT PHASE
        ====================================================== */}

        <div
          className="
            relative

            mt-7

            overflow-hidden

            rounded-[20px]

            border
            border-[#DDBC69]/25

            bg-[#17150F]

            p-4

            sm:mt-8
            sm:p-5

            lg:mt-10
            lg:p-6
          "
        >
          {/* Gold accent */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              top-0

              w-[3px]

              bg-[#DDBC69]
            "
          />

          <div
            className="
              flex
              flex-col
              gap-2

              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2.5
                "
              >
                <div
                  className="
                    flex
                    size-9

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#DDBC69]/25

                    bg-[#DDBC69]/10

                    text-[#DDBC69]
                  "
                >
                  <Clock3
                    className="size-4"
                    strokeWidth={1.8}
                  />
                </div>

                <h3
                  className="
                    font-playfair-display

                    text-[24px]
                    font-semibold

                    text-[#DDBC69]

                    sm:text-[27px]
                  "
                >
                  What&apos;s Next?
                </h3>
              </div>

              <p
                className="
                  mt-2

                  text-[14px]
                  leading-6

                  text-white/55

                  sm:pl-[46px]
                  sm:text-[15px]
                "
              >
                Planned development for the next phase
              </p>
            </div>
          </div>

          {/* Planned items */}

          <div
            className="
              mt-5

              grid
              grid-cols-1

              gap-2.5

              sm:grid-cols-2
              sm:gap-3

              lg:grid-cols-5
            "
          >
            {nextPhaseItems.map((item, index) => (
              <article
                key={item}
                className="
                  flex
                  min-h-[68px]

                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-[#DDBC69]/15

                  bg-[#0F0E0B]

                  px-3.5
                  py-3.5

                  lg:min-h-[105px]
                  lg:flex-col
                  lg:items-start
                  lg:justify-between
                  lg:p-4
                "
              >
                <div
                  className="
                    flex
                    size-8
                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#DDBC69]/25

                    bg-[#DDBC69]/10

                    text-[#DDBC69]

                    lg:size-9
                  "
                >
                  <Clock3
                    aria-hidden="true"
                    className="size-[15px]"
                    strokeWidth={1.8}
                  />
                </div>

                <p
                  className="
                    flex-1

                    text-[14px]
                    font-semibold

                    leading-[1.4]

                    text-white/90

                    sm:text-[15px]
                  "
                >
                  {item}
                </p>

              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}