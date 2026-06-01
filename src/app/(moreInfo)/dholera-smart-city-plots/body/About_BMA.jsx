import Image from "next/image";
import img1 from "@/assests/taboola/icons/bookmyassets-365-days-assistance-icon.svg";
import img2 from "@/assests/taboola/icons/bookmyassets-buy-back-assistance-icon.svg";
import img3 from "@/assests/taboola/icons/bookmyassets-due-diligence-team-icon.svg";
import img4 from "@/assests/taboola/icons/bookmyassets-immediate-sale-deed-icon.svg";
import img5 from "@/assests/taboola/icons/bookmyassets-resale-support-icon.svg";

const icons = [
  { id: 1, icon: img3, label: "Due Diligence Team" },
  { id: 2, icon: img4, label: "Immediate Sale Deed" },
  { id: 3, icon: img1, label: "365 Days Site Visit" },
  { id: 4, icon: img5, label: "Resale Support" },
  { id: 5, icon: img2, label: "Buyback Assistance" },
];

const COUNTERS = [
  { value: "7+ Projects", label: "Successfully Sold Out" },
  { value: "2 Lakh+ Sq. Yd", label: "Dholera Land Sold" },
  { value: "957+ Plots", label: "Registry Delivered" },
  { value: "561+ Clients", label: "Investor Client Base" },
];

export default function AboutBMA() {
  return (
    <>
      <div className="pt-8 py-4 bg-gray-50" id="why-bma">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="flex flex-col items-center text-center mb-[clamp(1rem,4vw,2rem)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#ddbc69]" />
              <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
                BookMyAssets: Trusted Developers in Dholera{" "}
              </h2>
              <div className="h-px w-[clamp(3rem,4vw,4rem)] bg-[#ddbc69]" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[clamp(1rem,1.5vw,1.2rem)] space-y-6">
              With BookMyAssets, you invest in Dholera with confidence. We
              provide location transparency, expert guidance, and access to
              high-potential land opportunities. We ensure every investment is
              backed by trust, verification, and future growth potential.
            </p>

            <div className="px-[calc(0.5rem+1vw)] max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-[calc(0.75rem+0.5vw)]">
                {COUNTERS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="
                    flex flex-col justify-center items-center
                    p-[calc(0.75rem+0.2vw)]
                    bg-white rounded-2xl shadow-md
                    hover:shadow-xl transition-shadow
                  "
                  >
                    <div className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#ddbc69] mb-2">
                      {value}
                    </div>
                    <p className="text-[clamp(0.75rem,1.2vw,0.875rem)] text-gray-700 font-medium text-center">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-4">
              {/* CTA Buttons */}
              <div className="flex flex-col max-sm:grid max-sm:grid-cols-2 md:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="tel:+918130371647"
                  className="flex items-center gap-2 bg-[#ddbc69] hover:bg-[#c99a2e] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center text-[clamp(0.875rem,1.5vw,1rem)]"
                  onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: "click_to_call",
                      lead_type: "phone",
                      device: "mobile",
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  Call Us Now
                </a>

                <a
                  href="https://wa.me/918130371647?text=Hi%2C%20I%27m%20interested%20in%20Dholera%20plots.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center text-[clamp(0.875rem,1.5vw,1rem)]"
                  onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: "whatsapp_click",
                      lead_type: "whatsapp",
                      device: "mobile",
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="pt-4">
              <div className="max-w-7xl mx-auto text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-gray-900 leading-tight text-center">
                <p>Why Invest with BookMyAssets</p>
              </div>
              <div className="pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {icons.map((item, index) => {
                    const isLastOdd =
                      index === icons.length - 1 && icons.length % 2 !== 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col items-center gap-3 p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow
                              ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`}
                      >
                        <div className="relative w-[clamp(7rem,8vw,9rem)] h-[clamp(7rem,8vw,9rem)]">
                          <Image
                            src={item.icon}
                            alt={item.label}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-center text-[clamp(0.75rem,1.5vw,0.95rem)] font-medium text-gray-700">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

