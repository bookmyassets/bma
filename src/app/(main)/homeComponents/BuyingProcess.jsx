"use client";

import { useState } from "react";
import Image from "next/image";
import ContactForm from "../components/Contactform";
import bookingIcon from "@/assests/icons/booking.svg";
import callIcon from "@/assests/icons/call.svg";
import constructionIcon from "@/assests/icons/construction.svg";
import registryIcon from "@/assests/icons/registry.svg";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Connect with our RM",
    icon: callIcon,
    iconAlt: "Relationship manager consultation",
    points: [
      "Understand the Dholera vision",
      "Get complete project and plot details",
      "How BookMyAssets provides after-sales support",
    ],
  },
  {
    number: "2",
    title: "Verify Legal Documents",
    icon: registryIcon,
    iconAlt: "Legal document verification",
    points: [
      "Review NA, NOC, Plan Pass and Title Documents",
      "Check Plot Availability and finalize your Plot",
    ],
  },
  {
    number: "3",
    title: "Book Your Plot",
    icon: bookingIcon,
    iconAlt: "Plot booking",
    points: [
      "Pay the ₹50,000 booking amount",
      "Complete the full payment within 15 days",
    ],
  },
  {
    number: "4",
    title: "Registry and Ownership Documents",
    icon: registryIcon,
    iconAlt: "Registry and ownership documents",
    points: ["Immediate registry and possession", "Get mutation after registry"],
  },
];

const supportItems = [
  {
    icon: constructionIcon,
    iconAlt: "Villa layout and design",
    text: "Choose a suitable villa layout and design",
  },
  {
    icon: callIcon,
    iconAlt: "In-house construction support",
    text: "Get construction support from our in-house team",
  },
  {
    icon: bookingIcon,
    iconAlt: "Rental and resale assistance",
    text: "Get rental and resale assistance",
  },
];

export default function HowToBuy() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <>
      <section
        className="bg-black px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-8"
        aria-labelledby="buying-process-title"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(221, 188, 105, 0.055), transparent 48%)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <header className="text-center">
            <h2
              id="buying-process-title"
              className="text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.03em] text-white"
            >
              Buying <span className="text-[#ddbc69]">Process</span>
            </h2>

            <div
              className="mx-auto mt-5 flex max-w-7xl items-center justify-center gap-2.5"
              aria-hidden="true"
            >
              <span className="h-px flex-1 bg-[#ddbc69]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ddbc69]" />
              <span className="h-px flex-1 bg-[#ddbc69]" />
            </div>

            <p className="mt-2 text-[clamp(1rem,2vw,1.25rem)] font-medium text-white">
              Simple. Transparent. Guided.
            </p>
          </header>

          <div className="mt-14 grid grid-cols-1 gap-x-7 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className="relative flex flex-col rounded-2xl border border-[#ddbc69] bg-black px-4 pb-4 pt-11 sm:px-5 sm:pb-5 sm:pt-12 lg:min-h-[325px] lg:pb-6 lg:pt-16"
              >
                <div className="absolute left-1/2 top-0 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ddbc69] shadow-[0_7px_16px_rgba(0,0,0,0.65)]">
                  <Image
                    src={step.icon}
                    alt={step.iconAlt}
                    width={54}
                    height={54}
                    className="h-[54px] w-[54px] object-contain"
                  />
                </div>

                <div className="text-center">
                  <span className="inline-flex rounded-md bg-[#ddbc69] px-3 py-1 text-sm font-extrabold uppercase leading-none text-black shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
                    Step {step.number}
                  </span>

                  <h3 className="mx-auto mt-2.5 flex max-w-[230px] items-center justify-center text-[clamp(1.15rem,1.7vw,1.38rem)] font-bold leading-[1.2] text-white lg:min-h-[54px]">
                    {step.title}
                  </h3>

                  <div className="mx-auto mt-2 h-px w-10 bg-[#ddbc69]" />
                </div>

                <ul className="mt-3 space-y-3 lg:mt-3.5 lg:space-y-3.5">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.95rem] leading-[1.42] text-white"
                    >
                      <span
                        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#ddbc69] text-[11px] font-black leading-none text-black"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {index < steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-[30px] top-[32%]  hidden -translate-y-1/2 text-[2rem] font-light leading-none text-[#ddbc69] lg:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </article>
            ))}
          </div>

          <div className="relative mt-16 rounded-2xl border border-[#ddbc69] bg-black px-5 pb-4 pt-10 sm:px-7 lg:px-5 lg:py-5">
            <span
              className="absolute -top-px left-5 min-w-[126px] -translate-y-1/2 bg-[#ddbc69] px-5 py-1.5 text-center text-base font-extrabold text-black sm:left-8"
              style={{
                clipPath: "polygon(7% 0, 93% 0, 100% 100%, 0 100%)",
              }}
            >
              ADD-ON
            </span>

            <div className="grid gap-5 lg:grid-cols-[1.35fr_repeat(3,1fr)] lg:gap-0">
              <div className="flex items-center justify-center gap-4 pb-1 lg:justify-start lg:px-4">
                <Image
                  src={constructionIcon}
                  alt="Construction support"
                  width={94}
                  height={94}
                  className="h-[82px] w-[82px] shrink-0 rounded-full bg-[#ddbc69] object-contain sm:h-[92px] sm:w-[92px]"
                />
                <div>
                  <p className="text-[clamp(1.2rem,2vw,1.75rem)] font-bold leading-tight text-[#ddbc69]">
                    BONUS
                  </p>
                  <p className="text-[clamp(1.25rem,2.2vw,1.7rem)] font-bold leading-[1.05] text-white">
                    Construction
                    <br />
                    Support
                  </p>
                </div>
              </div>

              {supportItems.map((item) => (
                <div
                  key={item.text}
                  className="flex flex-row items-center justify-start gap-4 border-t border-[#ddbc69]/40 px-2 pt-4 text-left md:flex-col md:justify-center md:gap-0 md:px-4 md:pt-5 md:text-center lg:border-l lg:border-t-0 lg:pt-0"
                >
                  <Image
                    src={item.icon}
                    alt={item.iconAlt}
                    width={58}
                    height={58}
                    className="h-12 w-12 shrink-0 rounded-full bg-[#ddbc69] object-contain md:h-[54px] md:w-[54px]"
                  />
                  <p className="max-w-none text-[0.95rem] leading-[1.35] text-white md:mt-2 md:max-w-[220px]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="https://wa.me/918130371647"
              onClick={openContactForm}
              className="flex min-h-14 w-full max-w-80 items-center justify-center rounded-lg bg-[#ddbc69] px-6 py-3 text-center text-[clamp(1rem,2vw,1.25rem)] font-extrabold text-black transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69]"
            >
              Connect with our RM
            </Link>
            <Link
              href="https://www.bookmyassets.com/book-video-call"
              className="flex min-h-14 w-full max-w-80 items-center justify-center rounded-lg border border-[#ddbc69] bg-black px-6 py-3 text-center text-[clamp(1rem,2vw,1.25rem)] font-extrabold text-[#ddbc69] transition-colors duration-200 hover:bg-[#ddbc69] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ddbc69]"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {isContactFormOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Connect with our relationship manager"
          onClick={closeContactForm}
        >
          <div className="w-full max-w-md" onClick={(event) => event.stopPropagation()}>
            <ContactForm
              onClose={closeContactForm}
              title="Connect with our RM"
              headline="Share your details and our relationship manager will contact you."
              buttonName="Get a Call Back"
            />
          </div>
        </div>
      )}
    </>
  );
}
