import { CalendarDays, MessageSquare, User } from "lucide-react";

export default async function BlogPage() {
  // Agar YouTube video links Sanity ya kisi aur source se fetch karne hain, to yahan fetch karo
  const videos = [
    "hNbWaEU1d_A?si=c5c7r-9oUr-CB8QD",
    "TwsGjPP-wPg?si=9zL4ChmD54Iun750",
    "Ac0wGh72S2g?si=pzZvS9Y3bKx2mOnL",
    "hNbWaEU1d_A?si=c5c7r-9oUr-CB8QD",
  ]; // YouTube video IDs

  return (
    <div className="container mx-auto px- mt-10 py-10 pl-2 pr-2 space-y-4">
      {/* <h1 className="text-center md:text-5xl text-gray-500 text-4xl font-bold mb-10">
        Videos
      </h1> */}
      <p className="text-center md:text-xl pl-2 pr-2 md:font-medium font-semibold ">
        Watch expert insights on why investing in Dholera is a smart financial
        decision.
      </p>

      <div className="grid md:grid-cols-3 pt-5 max-sm:p-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {videos.map((videoId, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-2xl">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`YouTube Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
