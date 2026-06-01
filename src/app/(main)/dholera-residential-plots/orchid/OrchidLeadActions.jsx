"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

/*
  FIX: `ssr: false` added — ContactForm and BrochureDownload are modals that
  only render after a user click. SSR-ing them generates unused HTML on the
  initial response and adds to the JS bundle evaluated at hydration time.
  Skipping SSR keeps them completely out of the critical path.
*/
const ContactForm = dynamic(() => import("../../components/Contactform"), {
  ssr: false,
});
const BrochureDownload = dynamic(
  () => import("../../components/BrochureDownload"),
  { ssr: false },
);

const PROJECT = "Orchid";
const BROCHURE_LINK =
  "https://cdn.sanity.io/files/c3e1h345/projects/c9471499567c096befb9416aa99c7f0077900d11.pdf";

export default function OrchidLeadActions({ variant = "hero" }) {
  const [modal, setModal] = useState(null);

  const config = useMemo(() => {
    if (variant === "about") {
      return {
        contactTitle: "Get details on Orchid",
        contactHeadline:
          "Please fill out the form to get project details. Fields marked with * are mandatory.",
        contactButton: "Get A Call Back",
        brochureTitle: "Get the Orchid brochure",
        brochureHeadline:
          "Please fill out the form to download the brochure. Fields marked with * are mandatory.",
        brochureButton: "Download Brochure",
      };
    }

    return {
      contactTitle: "Missed Orchid? Explore plots from ₹8 lakh at Westwyn Residency",
      contactHeadline:
        "Please fill out the form to get exclusive details of Orchid. Fields marked with * are mandatory.",
      contactButton: "Get A Call Back",
      brochureTitle: "Get the Orchid brochure",
      brochureHeadline:
        "Please fill out the form to download the brochure. Fields marked with * are mandatory.",
      brochureButton: "Download Brochure",
    };
  }, [variant]);

  const closeModal = useCallback(() => setModal(null), []);

  const openContact = useCallback(() => {
    setModal({
      type: "contact",
      title: config.contactTitle,
      headline: config.contactHeadline,
      buttonName: config.contactButton,
    });
  }, [config]);

  const openBrochure = useCallback(() => {
    setModal({
      type: "brochure",
      title: config.brochureTitle,
      headline: config.brochureHeadline,
      buttonName: config.brochureButton,
    });
  }, [config]);

  const handleAfterSubmit = useCallback(() => {
    window.open(BROCHURE_LINK, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <>
      {variant === "hero" ? (
        <button
          onClick={openContact}
          className="w-full rounded-full bg-[#ddbc69] px-6 py-2 font-semibold text-black transition-colors duration-300 hover:bg-[#ddbc69]"
        >
          Book Your Plot In Dholera from ₹8 Lakh
        </button>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={openBrochure}
            className="rounded-md bg-[#ddbc69] px-6 py-3 font-medium text-black shadow-md transition duration-300 hover:bg-[#f3bb39]"
          >
            Download Brochure
          </button>

          <a
            href="https://wa.me/918130371647"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl border border-[#ddbc69] bg-white px-6 py-3 font-medium text-[#ddbc69] transition-colors hover:bg-[#f8f5e6]"
          >
            WhatsApp Site Visit
          </a>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md">
            {modal.type === "brochure" ? (
              <BrochureDownload
                onClose={closeModal}
                title={modal.title}
                headline={modal.headline}
                buttonName={modal.buttonName}
                onAfterSubmit={handleAfterSubmit}
                link={BROCHURE_LINK}
              />
            ) : (
              <ContactForm
                onClose={closeModal}
                title={modal.title}
                headline={modal.headline}
                buttonName={modal.buttonName}
                project={PROJECT}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
