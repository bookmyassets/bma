"use client";
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { initFacebookPixel, trackPageView } from "@/lib/fbpixel";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

export default function RootLayout({ children }) {

  const pathname = usePathname();

  const FACEBOOK_PIXEL_ID = "1147887730461644";
  useEffect(() => {
    initFacebookPixel(FACEBOOK_PIXEL_ID);
    trackPageView();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-M6ZWDM9CGE"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || []; 
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-M6ZWDM9CGE'); 
            `,
          }}
        />
        <Script type="text/javascript">
          {`
               (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rivub95ldd");
        `}
        </Script>
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