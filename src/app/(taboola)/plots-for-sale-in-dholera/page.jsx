import React from 'react'
import Hero from './body/Hero'
import WhyDholera from './body/WhyDholera'
import Residency from './body/Residency'
import Form from './components/Form'
import CTAsection from './body/CTAsection'

export default function page() {
  return (
    <>
        <div>
            <Hero/>
            <WhyDholera/>
            <Residency/>
            <CTAsection/>
        </div>

        <Form  title="Registry Ready Plots Under ₹10 Lakh in Dholera"/>
    </>
  )
}
