import React from 'react'
import Hero from './homeComponents/Hero'
import Dholera from './homeComponents/Dholera'
import BMA from './homeComponents/BMA'
import ShortsSection from './homeComponents/YouTube'
import FAQSection from './homeComponents/FAQs'
import WestWyn from './homeComponents/WestWyn'

export default function page() {
  return (
    <div>
       <Hero/>
       <Dholera/>
       <BMA/>
       <ShortsSection/>
       <WestWyn/>
       <FAQSection/>
    </div>
  )
}
