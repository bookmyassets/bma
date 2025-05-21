import React from 'react'
import Navbar from './components/Navbar'
import "./globals.css";
import Footer from './body/Footer';

export default function RootLayout({ children }) {
  return (
   <html lang="en">
    <head>

    </head>
    <body>
        <Navbar/>
        {children}
        <Footer/>
    </body>
   </html>
  )
}