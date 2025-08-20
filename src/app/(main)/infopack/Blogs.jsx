import React from "react";
import Link from "next/link";
import NotFound from "../components/ui/NotFound";

const BrowseBlogs = () => {
  const b = [
    {
      id: 1,
      title: "Dholera International Airport – India’s Second Largest Airport and Its Impact on Growth",
      link: "https://www.bookmyassets.com/dholera-sir-blogs/dholera-international-airport",
    },
    {
      id: 2,
      title: "How TATA Semiconductor Fab Dholera Impact Plot Prices?",
      link: "https://www.bookmyassets.com/dholera-sir-blogs/how-tata-semiconductor-fab-dholera-impact-plot-prices",
    },
    {
      id: 3,
      title: "Factors That Will Affect Dholera Plot Prices in the Next 5 Years",
      link: "https://www.bookmyassets.com/dholera-sir-blogs/factors-affecting-dholera-plot-prices",
    },
  ];

  const themeColors = {
    black: "#000000",
    gold: "#FDB913",
    darkGold: "#C69C21",
    white: "#FFFFFF",
  };

  return (
    <section className="px-6 md:px-36 relative">
      <div className="container mx-auto relative">
        {b.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-4 px-2 gap-8">
            {b.map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden transition-all duration-300 transform hover:scale-105 relative flex flex-col shadow-lg"
                style={{
                  backgroundColor: `${themeColors.white}E6`,
                  border: `2px solid ${themeColors.gold}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: themeColors.black }}>
                    {blog.title}
                  </h3>
                  <Link href={blog.link} target="_blank">
                    <button
                      className="px-4 py-2 transition-all font-semibold border-white rounded-full hover:bg-[#FDB913] bg-black hover:text-black text-lg md:text-base text-[#FDB913] mt-auto"
                    >
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound/>
        )}

        {/* Browse More Blogs Button */}
        {b.length > 3 && (
          <div className="mt-10 py-8 flex justify-center">
            <Link href="/blogs">
              <button
                className="px-6 text-xl py-3 rounded-md transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: themeColors.gold,
                  color: themeColors.black,
                  boxShadow: `0 4px 0 ${themeColors.darkGold}`,
                }}
              >
                Browse More Blogs
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseBlogs;