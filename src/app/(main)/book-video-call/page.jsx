import { generateMetadata as buildMeta } from "@/lib/seo";
import { CalendarCheck2, Clock3, FileText, MapPin, Video } from "lucide-react";
import CalendlyEmbed from "./CalendlyEmbed";

export const metadata = buildMeta({
  title: "Book a Video Call with BookMyAssets",
  description:
    "Choose a convenient time to speak with the BookMyAssets team about Dholera projects, documentation, location, and site visits.",
  slug: "book-video-call",
  type: "website",
});

export default function BookVideoCallPage() {
  const conversationTopics = [
    {
      icon: FileText,
      title: "Documents & clarity",
      description: "Ask questions about approvals, registry, and project documents.",
    },
    {
      icon: MapPin,
      title: "Location & connectivity",
      description: "Discuss the location, access, and the wider Dholera plan.",
    },
    {
      icon: CalendarCheck2,
      title: "Your next step",
      description: "Plan a site visit or decide on a comfortable follow-up.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[#f7f5ef] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#ddbc69]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ddbc69]/50 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8b691f] shadow-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#ddbc69]" />
            Speak with our team
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-[#102a43] sm:text-4xl lg:text-5xl">
            Book a video call with BookMyAssets
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Choose a convenient time for a calm, clear conversation about Dholera,
            project documents, location, or planning a site visit.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-sm font-semibold text-[#24476a]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/80">
              <Clock3 size={16} className="text-[#9a7622]" aria-hidden="true" />
              30-minute conversation
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200/80">
              <Video size={16} className="text-[#9a7622]" aria-hidden="true" />
              Online meeting
            </span>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <section
            aria-labelledby="conversation-heading"
            className="rounded-3xl border border-[#ddbc69]/35 bg-[#102a43] p-5 text-white shadow-[0_20px_55px_rgba(16,42,67,0.14)] sm:p-7 lg:sticky lg:top-24"
          >
            <div className="mb-7 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ddbc69] text-[#102a43]">
                <Video size={23} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f2d995]">A focused conversation</p>
                <h2 id="conversation-heading" className="mt-1 text-xl font-bold leading-tight sm:text-2xl">
                  Bring your questions. We'll bring clarity.
                </h2>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-200 sm:text-base">
              Use this call to understand the opportunity better before deciding your
              next step. There is no need to prepare a presentation or make a decision
              during the call.
            </p>

            <div className="mt-7 space-y-3">
              {conversationTopics.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5"
                >
                  <Icon className="mt-0.5 shrink-0 text-[#ddbc69]" size={19} aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-300">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-slate-300">
              Pick the time that works for you. The available times are displayed in
              your local timezone.
            </p>
          </section>

          <section
            aria-labelledby="booking-heading"
            className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.1)]"
          >
            <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7622]">
                    Schedule your call
                  </p>
                  <h2 id="booking-heading" className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-[#102a43] sm:text-2xl">
                    Choose a time that suits you
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f7f1df] px-3 py-1.5 text-xs font-bold text-[#765713]">
                  <Clock3 size={14} aria-hidden="true" />
                  30 min
                </span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Select a date, then choose an available time. You'll receive the meeting
                details after confirming your booking.
              </p>
            </div>

            <CalendlyEmbed />

            <div className="border-t border-slate-100 bg-slate-50 px-5 py-3.5 text-center text-xs leading-5 text-slate-500 sm:px-7">
              You can review the selected date and time before submitting.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
