import FloatingButtons from "./components/whatsapp";
import HomeSlider from "./components/HeroSlider";
import img1 from "@/assests/banner.webp"
import img2 from "@/assests/banner2.webp"
import img3 from "@/assests/banner3.webp"
import img4 from "@/assests/banner4.webp"
import mimg1 from "@/assests/mb1.webp"
import mimg2 from "@/assests/mb2.webp"
import mimg3 from "@/assests/mb3.webp"
import mimg4 from "@/assests/mb4.webp"
import ShortsSection from "./components/YouTube";
import ParallaxSection from "./components/Parallex";
import Footer from "./components/Footer";
import FAQSection from "./components/Faq";
import BrowseBlogsSection from "./components/BrowseBlogs";
import TestimonialPagination from "./components/Testimonials";
import WhyChooseSection from "./components/Why";

export default async function Home() {
  return (
    <div className=" overflow-hidden">
      <section>
        <HomeSlider img1={img1} img2={img2} img3={img3} img4={img4} mimg1={mimg1} mimg2={mimg2} mimg3={mimg3} mimg4={mimg4}/>
      </section>
      
      <section>
        <FAQSection/>
      </section>
      
      <section>
        <ShortsSection/>
      </section>
      
      {/* Parallax section appears here, after ShortsSection */}
      <section className="my-12"> {/* Add margin as needed */}
        <ParallaxSection/>
      </section>
      <section className="my-12"> {/* Add margin as needed */}
        <WhyChooseSection/>
      </section>
      
      <section>
        <BrowseBlogsSection/>
      </section>
      <TestimonialPagination/>
      <FloatingButtons />

      <Footer />
    </div>
  );
}