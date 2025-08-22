import React from 'react'
import CommonForm from '../components/CommonForm'
import BulkLand from '../components/BulkLandForm'
import ContactForm from '../components/Contactform'

export default function page() {
  return (
    <>
    <div className='space-y-12'>
        <p>Common Form</p>
        <CommonForm/>
        <p>Bulk Land Form</p>
        <BulkLand/>
        <p>Contact Form</p>
        <ContactForm/>
    </div>
    </>
  )
}
