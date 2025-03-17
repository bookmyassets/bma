import FloatingButtons from "./components/whatsapp";
import HomeSlider from "./components/HeroSlider";
import img1 from "@/assests/img1.webp"
import img2 from "@/assests/img2.webp"
import img3 from "@/assests/img3.webp"
import Mid from "./components/Mid";
import ShortsSection from "./components/YouTube";
import ParallaxSection from "./components/Parallex";
import WhyChooseSection from "./components/Why";
import Footer from "./components/Footer";

export default async function Home() {
  return (
    <>
    <div className="">

      <section >
        <HomeSlider img1={img1} img2={img2} img3={img3}/>
      </section>
      <section className=''>
        <Mid/>
        <ShortsSection/>
        <ParallaxSection/>
        <WhyChooseSection/>
        <FloatingButtons />
        <Footer/>
      </section>
    </div>
    </>
  );
}