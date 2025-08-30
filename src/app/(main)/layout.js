"use client";
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { initFacebookPixel, trackPageView } from "@/lib/fbpixel";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';
import FloatingButtons from './components/whatsapp';
import ContactNow from './components/Callus';

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
     </head>
      <body>
        <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700;800&display=swap");
        
                body {
                  font-family: "Inter", sans-serif;
                }
              `}</style>
        <Navbar />
        {children}
        <Footer />
        <FloatingButtons/>
        <ContactNow/>
      </body>
    </html>
  );
}