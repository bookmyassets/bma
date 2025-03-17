import img1 from "@/assests/img1.webp"
import Image from "next/image";
import img2 from "@/assests/logo-1.png"
import img3 from "@/assests/logo2.png"
import img4 from "@/assests/logo-3.png"

const ParallaxSection = () => {
  return (
    <div className="h-screen overflow-auto">
      {/* Fixed background image */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Image
          src={img1}
          alt="Background"
          fill
          priority
          quality={100}
          objectFit="cover"
        />
      </div>
      {/* Scrolling content */}
      <div className="relative z-10 py-12 pt-44 px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto">
          {/* Customer Satisfaction Box */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
            <Image
                src={img2}
                alt="icon"
              />
            </div>
            <h3 className="text-xl font-bold">Customer Satisfaction</h3>
          </div>
          
          {/* Team Excellence Box */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
            <Image
                src={img3}
                alt="icon"
              />
            </div>
            <h3 className="text-xl font-bold">Team Excellence</h3>
          </div>
          
          {/* Quality Construction Box */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src={img4}
                alt="icon"
              />
            </div>
            <h3 className="text-xl font-bold">Quality Construction</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;