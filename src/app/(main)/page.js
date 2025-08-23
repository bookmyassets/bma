"use client"
import React, { useState } from 'react'
import Hero from './homeComponents/Hero'
import Dholera from './homeComponents/Dholera'
import BMA from './homeComponents/BMA'
import ShortsSection from './homeComponents/YouTube'
import FAQSection from './homeComponents/FAQs'
import WestWyn from './homeComponents/WestWyn'
import PopupForm from './components/PopUpForm'

export default function page() {

  const [showpopForm, setpopShowForm] = useState(false);


  return (
    <>
    <title>Discover Investment-Ready Plots in Dholera Smart City | BookMyAssets</title>
    <meta
        name="description"
        content="Secure your future with BookMyAssets! Hassle-free residential property investment with clear titles and N.A. NOC. Start your journey today!"
      />
    <div>
       <Hero openForm={() => setpopShowForm(true)} />
       <Dholera/>
       <BMA/>
       <ShortsSection/>
       <WestWyn/>
       <FAQSection/>
    </div>
    {/* {showpopForm && (
        <PopupForm
          onClose={() => setpopShowForm(false)}
          title={`Dholera – India’s Safest Investment`}
          buttonName="Limited Plots – Booking Closing Soon"
          className="font-medium"
        />
        )} */}
        <PopupForm/>
    </>
  )
}