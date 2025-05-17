import img1 from "@/assests/img1.webp"
import Image from "next/image";
import img2 from "@/assests/logo-1.png"
import img3 from "@/assests/logo2.png"
import img4 from "@/assests/logo-3.png"

const ParallaxSection = () => {
  return (
    <div className="relative h-[500px] overflow-hidden"> {/* Set a fixed height */}
      {/* Background image - now relative to this container */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src={img1}
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover brightness-50"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto px-4">
          {/* Customer Satisfaction Box */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
              <Image src={img2} alt="icon" width={60} height={60} />
            </div>
            <h3 className="text-xl font-bold">Customer Satisfaction</h3>
          </div>
          
          {/* Team Excellence Box */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
              <Image src={img3} alt="icon" width={60} height={60} />
            </div>
            <h3 className="text-xl font-bold">Team Excellence</h3>
          </div>
          
          {/* Quality Construction Box */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
              <Image src={img4} alt="icon" width={60} height={60} />
            </div>
            <h3 className="text-xl font-bold">Quality Construction</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;