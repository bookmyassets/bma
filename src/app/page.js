import FloatingButtons from "./components/whatsapp";
import HomeSlider from "./components/HeroSlider";
import img1 from "@/assests/img1.webp"
import img2 from "@/assests/img2.webp"
import img3 from "@/assests/img3.webp"
import ShortsSection from "./components/YouTube";
import ParallaxSection from "./components/Parallex";
import Footer from "./components/Footer";
import FAQSection from "./components/Faq";
import BrowseBlogsSection from "./components/BrowseBlogs";

export default async function Home() {
  return (
    <>
    <div className="">

      <section >
        <HomeSlider img1={img1} img2={img2} img3={img3}/>
      </section>
      <section className=''>
        <FAQSection/>
        <ShortsSection/>
        <ParallaxSection/>
        <BrowseBlogsSection/>
        <FloatingButtons />
        <Footer/>
      </section>
    </div>
    </>
  );
}