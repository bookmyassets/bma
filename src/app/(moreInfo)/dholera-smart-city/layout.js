"use client";

import "./globals.css";

import React from "react";
import Script from "next/script";
import { Lato } from "next/font/google";

import Navbar from "./components/Navbar";
import Footer from "./body/Footer";
import FloatingButtons from "./components/whatsapp";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const GOOGLE_TAG_ID = "GT-PX4R9NV5";
const GTM_ID = "GTM-PX4R9NV5";
const TWITTER_PIXEL_ID = "oxi2l";
const CLARITY_ID = "wboi87kelu";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag */}
        <Script
          id="google-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
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

                j.src=
                  'https://www.googletagmanager.com/gtm.js?id='
                  + i + dl;

                f.parentNode.insertBefore(j,f);

              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Twitter Pixel */}
        <Script
          id="twitter-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(e,t,n,s,u,a){

                e.twq||(s=e.twq=function(){

                  s.exe
                    ? s.exe.apply(s,arguments)
                    : s.queue.push(arguments);

                },

                s.version='1.1',
                s.queue=[],

                u=t.createElement(n),
                u.async=!0,

                u.src=
                  'https://static.ads-twitter.com/uwt.js',

                a=t.getElementsByTagName(n)[0],

                a.parentNode.insertBefore(u,a))

              }(window,document,'script');

              twq('config','${TWITTER_PIXEL_ID}');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){

                c[a]=c[a]||function(){
                  (c[a].q=c[a].q||[]).push(arguments)
                };

                t=l.createElement(r);

                t.async=1;

                t.src=
                  "https://www.clarity.ms/tag/"+i;

                y=l.getElementsByTagName(r)[0];

                y.parentNode.insertBefore(t,y);

              })(
                window,
                document,
                "clarity",
                "script",
                "${CLARITY_ID}"
              );
            `,
          }}
        />
      </head>

      <body className={lato.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
            title="Google Tag Manager"
          />
        </noscript>

        <Navbar />

        {children}

        <Footer />

        <FloatingButtons />
      </body>
    </html>
  );
}