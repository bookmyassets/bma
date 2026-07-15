import { generateMetadata as buildMeta } from "@/lib/seo";
import CalendlyEmbed from "./CalendlyEmbed";

export const metadata = buildMeta({
  title: "Book a Video Call with BookMyAssets",
  description:
    "Choose a convenient time to speak with the BookMyAssets team about Dholera projects, documentation, location, and site visits.",
  slug: "book-video-call",
  type: "website",
});

export default function BookVideoCallPage() {
  return (
    <main className="bg-stone-50 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#9a7622]">
            Speak with our team
          </p>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Book a Video Call
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Select a suitable date and time for a clear discussion about Dholera,
            project documents, location, or planning a site visit.
          </p>
        </header>

        <CalendlyEmbed />
      </div>
    </main>
  );
}
