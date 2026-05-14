import Link from "next/link";

const cards = [
  {
    title: "Cost Sheet",
    description: "View and manage property cost breakdowns",
    href: "/after-sales/costsheet",
    icon: "📊",
  },
  {
    title: "CRM Portal",
    description: "Access payment receipts and schedules",
    href: "/after-sales/crm",
    icon: "🏢",
  },
];

export default function AfterSalesPage() {
  return (
    <div className="min-h-screen bg-[#151f28] px-6 pt-40 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-[#debe6b] text-xs uppercase tracking-widest mb-2">
          Dashboard
        </p>
        <h1 className="text-[#fbfbfb] text-4xl font-bold">After Sales</h1>
        <div className="mt-3 h-px w-16 bg-[#debe6b]" />
      </div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link href={card.href} key={card.title}>
            <div className="group bg-[#1a2733] border border-[#ffffff10] hover:border-[#debe6b] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#debe6b20]">
              <div className="text-3xl mb-4">{card.icon}</div>
              <h2 className="text-[#fbfbfb] text-lg font-semibold group-hover:text-[#debe6b] transition-colors duration-200">
                {card.title}
              </h2>
              <p className="text-[#fbfbfb80] text-sm mt-1">{card.description}</p>
              <div className="mt-6 text-[#debe6b] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}