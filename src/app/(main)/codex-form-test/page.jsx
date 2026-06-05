import LeadFormCodexTemp from "../components/LeadForm_codexTemp";

export const metadata = {
  title: "Codex Form Test",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CodexFormTestPage() {
  return (
    <main className="min-h-screen bg-neutral-950 py-10">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <LeadFormCodexTemp
          variant="common"
          title="Common Form Variant"
          source="BookMyAssets Website Test"
          tags={["Dholera Investment", "Website Lead", "Common Form Test"]}
          dataLayerEvent={null}
        />

        <LeadFormCodexTemp
          variant="bulkLand"
          title="Bulk Land Variant"
          source="BookMyAssets Website Test"
          tags={["Dholera Investment", "Website Lead", "Bulk Land Test"]}
          dataLayerEvent="codex_test_bulk_land_form"
        />

        <LeadFormCodexTemp
          variant="lead"
          title="Lead Form Variant"
          source="BookMyAssets Website Test"
          tags={["Dholera Investment", "Website Lead", "Lead Form Test"]}
          dataLayerEvent="codex_test_lead_form"
        />
      </div>
    </main>
  );
}
