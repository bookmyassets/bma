import Image from "next/image";
import img1 from "@/assests/img1.webp";
import img2 from "@/assests/logo-1.png";
import img3 from "@/assests/logo2.png";
import img4 from "@/assests/logo-3.png";

const Parallax = () => {
  return (
    <div className="h-screen overflow-auto">
      {/* Section 1 */}
      <div
        className="h-screen flex justify-center items-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/img1.webp')" }}
      >
        <Image src={img1} alt="img1" width={400} height={600} />
        <h1 className="text-white text-4xl font-bold">Welcome to Parallax Effect</h1>
      </div>

      {/* Section 2 */}
      <div
        className="h-screen flex justify-center items-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/logo-1.png')" }}
      >
        <Image src={img2} alt="img2" width={400} height={600} />
        <h1 className="text-white text-4xl font-bold">Customer Satisfaction</h1>
      </div>

      {/* Section 3 */}
      <div
        className="h-screen flex justify-center items-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/logo2.png')" }}
      >
        <Image src={img3} alt="img3" width={400} height={600} />
        <h1 className="text-white text-4xl font-bold">Team Excellence</h1>
      </div>

      {/* Section 4 */}
      <div
        className="h-screen flex justify-center items-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/logo-3.png')" }}
      >
        <Image src={img4} alt="img4" width={400} height={600} />
        <h1 className="text-white text-4xl font-bold">Quality Construction</h1>
      </div>
    </div>
  );
};

export default Parallax;
