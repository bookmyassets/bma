import React from "react";

export default function DholeraLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: About Dholera */}
      <section className="grid md:grid-cols-2">
        <div className="bg-black text-white p-8 md:p-12 lg:p-16 flex items-center">
          <div className="max-w-2xl mx-auto">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#deae3c" }}
            >
              About Dholera
            </h1>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Dholera Smart City is India's first Greenfield Smart City,
                planned under the Delhi–Mumbai Industrial Corridor (DMIC) in
                Gujarat. Located about 100 km from Ahmedabad, Dholera is
                designed as a future-ready industrial and urban hub with
                world-class infrastructure.
              </p>
              <p>
                The city features planned zones, wide roads, underground
                utilities, renewable energy integration, and smart governance
                systems. With major projects like Dholera International Airport,
                Dholera Solar Park, and industrial activation areas underway,
                Dholera Smart City India is positioned as one of the most
                promising upcoming cities in India for long-term growth and
                development.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-100 p-8">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop"
            alt="Dholera Smart City"
            className="w-full max-w-md h-auto object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* Section 2: Major Companies & Projects */}
      <section className="grid md:grid-cols-2">
        <div className="flex items-center justify-center bg-gray-100 p-8 order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=800&fit=crop"
            alt="Industrial Development in Dholera"
            className="w-full max-w-md h-auto object-cover shadow-2xl"
          />
        </div>
        <div className="bg-black text-white p-8 md:p-12 lg:p-16 flex items-center order-1 md:order-2">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#deae3c" }}
            >
              Major Companies & Projects in Dholera
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Dholera is rapidly emerging as a strategic industrial
                destination, attracting large-scale national and global
                projects. The Tata Semiconductor fab is one of the most
                significant developments, strengthening India's semiconductor
                manufacturing ecosystem. Renewable energy leaders like ReNew
                Power are part of the massive Dholera Solar Park, one of the
                largest in the world.
              </p>
              <p>
                Infrastructure development is supported by Tata Power and
                Torrent Power, ensuring reliable energy supply for industries
                and urban zones. The Dholera International Airport, currently
                under development, will enhance global connectivity and support
                industrial cargo movement. Additionally, the Activation Area
                within Dholera SIR is witnessing early-stage industrial and
                commercial development, setting the foundation for a fully
                operational smart city. Together, these projects position
                Dholera as a key node in Gujarat's industrial and economic
                expansion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Invest with BMA */}
      <section className="grid md:grid-cols-2">
        <div className="bg-black text-white p-8 md:p-12 lg:p-16 flex items-center">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#deae3c" }}
            >
              Why Invest in Dholera with BMA
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                BookMyAssets (BMA) makes buying plots in Dholera simple and
                transparent. BMA offers verified, legally clear, and
                registry-ready plots in planned areas around Dholera SIR. With
                strong local expertise, BMA helps buyers understand location
                benefits, development phases, and infrastructure progress.
              </p>
              <p>
                As Dholera Smart City develops into an industrial and logistics
                hub, early land purchase aligns with long-term growth. BMA
                supports buyers throughout the process from plot selection to
                documentation, making it easier to participate in one of India's
                key upcoming smart cities.
              </p>
              <div className="mt-8">
                <button
                  className="px-8 py-4 text-black font-bold text-xl rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#deae3c" }}
                >
                  Contact Us Today
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-100 p-8">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop"
            alt="Investment Opportunity in Dholera"
            className="w-full max-w-md h-auto object-cover shadow-2xl"
          />
        </div>
      </section>
    </div>
  );
}
