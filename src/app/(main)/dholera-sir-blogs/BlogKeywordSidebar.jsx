import Link from "next/link";

export default function BlogKeywordSidebar({ keywords = [] }) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[20px] border border-[#ddbc69]/20 bg-[#11110f] p-5 lg:p-6">
        <h2 className="font-playfair-display text-[30px] font-normal leading-[1.15] tracking-[-0.035em] text-[#f4eee2] lg:text-[40px]">
          People also search for
        </h2>

        {keywords.length > 0 && (
          <nav
            aria-label="Dholera blog keywords"
            className="mt-6 flex flex-wrap gap-3 lg:mt-8"
          >
            {keywords.map((keyword) => (
              <Link
                key={keyword._key || keyword.href}
                href={keyword.href}
                className="inline-flex min-h-11 max-w-full items-center rounded-full border border-[#ddbc69]/20 bg-[#ddbc69]/[0.05] px-4 py-2 text-[16px] leading-[1.5] text-[#d2cdc2] transition-colors duration-200 hover:border-[#ddbc69]/50 hover:bg-[#ddbc69]/10 hover:text-[#ddbc69] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ddbc69] motion-reduce:transition-none lg:text-[18px]"
              >
                <span className="break-words">{keyword.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
