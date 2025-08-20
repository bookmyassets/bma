import React from 'react'
import Hero from './homeComponents/Hero'
import Dholera from './homeComponents/Dholera'
import BMA from './homeComponents/BMA'
import ShortsSection from './homeComponents/YouTube'
import FAQSection from './homeComponents/FAQs'
import WestWyn from './homeComponents/WestWyn'

export default function page() {
  return (
    <>
    <title>Discover Investment-Ready Plots in Dholera Smart City | BookMyAssets</title>
    <meta
        name="description"
        content="Secure your future with BookMyAssets! Hassle-free residential property investment with clear titles and N.A. NOC. Start your journey today!"
      />
    <div>
       <Hero/>
       <Dholera/>
       <BMA/>
       <ShortsSection/>
       <WestWyn/>
       <FAQSection/>
    </div>
    </>
  )
}
