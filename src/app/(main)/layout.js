"use client";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Script from "next/script";
import FloatingButtons from "./components/whatsapp";
import ContactNow from "./components/Callus";
import ScrollToTop from "./components/ScrollToTop";
import { Lato } from "next/font/google";
import RagePopup from "./components/RageClickForm";

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="6dgioemr9ldkch8vjbshuxe5g66y85"
        />

        {/* Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-M6ZWDM9CGE"
        />

        <Script strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '672210205737825');
fbq('track', 'PageView');`}
          ;
        </Script>

        <Script type="text/javascript">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5CXXQ9DJ');
           `}
        </Script>

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
        <Script type="text/javascript" strategy="lazyOnload">
          {`
               (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rivub95ldd");
        `}
        </Script>
      </head>
      <body className={lato.className}>
        <ScrollToTop />
        {/* <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700;800&display=swap");

          body {
            font-family: "Lato", sans-serif;
          }
        `}</style> */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5CXXQ9DJ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=672210205737825&ev=PageView&noscript=1"
/>`,
          }}
        />

        <Navbar />
        {children}
        <Footer />
        <FloatingButtons />
        <ContactNow />
        <RagePopup/>
      </body>
    </html>
  );
}
