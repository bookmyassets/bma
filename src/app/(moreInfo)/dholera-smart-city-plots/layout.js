"use client";

import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./body/Footer";
import Script from "next/script";

const NEW_GTM_ID = "GTM-KRZDV85J";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* =========================================
            EXISTING GOOGLE TAG 
        ========================================== */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-ND5WPPD5"
        />

        <Script />

        {/* =========================================
            EXISTING GTM 
        ========================================== */}
        <Script id="existing-google-tag-manager" type="text/javascript">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-ND5WPPD5');
          `}
        </Script>


        {/* =========================================
            NEW GOOGLE TAG MANAGER
        ========================================== */}
        <Script id="new-google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${NEW_GTM_ID}');
          `}
        </Script>


        {/* =========================================
            MICROSOFT CLARITY - EXISTING
        ========================================== */}
        <Script id="microsoft-clarity" type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };

              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;

              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
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


        {/* =========================================
            EXISTING GTM NOSCRIPT
        ========================================== */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-ND5WPPD5"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>


        {/* =========================================
            NEW GTM NOSCRIPT
        ========================================== */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${NEW_GTM_ID}`}
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>


        <Navbar />

        {children}

        <Footer />

      </body>
    </html>
  );
}