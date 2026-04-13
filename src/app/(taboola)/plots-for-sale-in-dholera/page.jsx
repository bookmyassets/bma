import React from 'react'
import Hero from './body/Hero'
import WhyDholera from './body/WhyDholera'
import Residency from './body/Residency'
import Form from './components/Form'
import CTAsection from './body/CTAsection'
import WhyBMA from './body/WhyBMA'
import TestimonialPagination from './body/Testimonials'
import Footer from './body/Footer'
import FAQSection from './body/FAQs'

export default function page() {
  return (
    <>
        <div>
            <Hero/>
            <WhyDholera/>
            <Residency/>
            <CTAsection/>
            <WhyBMA/>
            <TestimonialPagination/>
            <FAQSection/>
            <Footer/>
        </div>

        <Form  title="Registry Ready Plots Under ₹10 Lakh in Dholera"/>
    </>
  )
}
