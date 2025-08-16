"use client";
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts preconnect and load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Raleway:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <style jsx global>{`
          body {
            font-family: 'Lato', sans-serif !important;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Lato', sans-serif !important;
          }
          button, input, textarea, select {
            font-family: 'Lato', sans-serif !important;
          }
          .inter-font {
            font-family: 'Lato', sans-serif !important;
          }
        `}</style>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}