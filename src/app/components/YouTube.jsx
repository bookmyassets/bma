

export default function ShortsSection() {
    return (
    <div className="bg-black">

      <div className="max-w-7xl mx-auto  p-6">
        <h2 className="text-3xl text-white font-bold text-center mb-4">Latest Shorts</h2>
        <div className="flex justify-center">
          <iframe
            className="rounded-lg w-full max-w-3xl h-[500px]"
            src="https://www.youtube.com/embed/videoseries?list=PLBDR6zhX3b52gASidZ42Za-8ugr4Wv967"
            title="YouTube Shorts Playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        </div>
        <p className="text-[#dfb03c] font-light md:text-center mt-28 text-2xl md:text-6xl mr-8 ml-8 "> 
        ❝ <br /> Don't wait to buy real estate, buy real estate and wait.
        <br />
        <span className="md:text-4xl text-xl text-start">
            ~ Will Rogers 
        </span>
        </p>
       
      </div>
            </div>
    );
}
