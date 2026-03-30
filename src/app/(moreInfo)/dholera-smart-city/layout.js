"use client";
import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./body/Footer";
import FloatingButtons from "./components/whatsapp";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-ND5WPPD5"
        />
        <Script />
        <Script type="text/javascript">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ND5WPPD5');
           `}
        </Script>
        <Script>
          {` !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','oxi2l');`}
        </Script>
        {/* Clarity */}
        <Script type="text/javascript">
          {`
                      
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rph0ryri30");

                `}
        </Script>
      </head>
      <body>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700;800&display=swap");

          body {
            font-family: "Lato", sans-serif;
          }
        `}</style>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-ND5WPPD5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar />
        {children}
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
