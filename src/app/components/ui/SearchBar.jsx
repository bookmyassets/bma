"use client";

import { FiSearch } from "react-icons/fi";
import { useRouter } from "@/i18n/routing";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

const SearchBar = ({ filters, setFilters }) => {
  const searchRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    const value = searchRef.current.value;

    if (e.key === "Enter") {
      setFilters((prev) => ({ ...prev, query: value }));
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set("query", value);
      router.replace(`?${currentParams.toString()}`);
    }
  };

  return (
    <div className="border relative items-center border-slate-500 flex rounded-full overflow-hidden">
      <input
        type="text"
        ref={searchRef}
        onKeyDown={handleSearch}
        className="rounded-s-full w-full h-full ps-4 py-3"
      />
      <button className="px-5 py-3 h-full bg-[#530904]">
        <FiSearch className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
