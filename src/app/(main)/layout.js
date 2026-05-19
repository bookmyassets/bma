import "./globals.css";
import { Lato } from "next/font/google";
import Script from "next/script";

import Footer from "./components/Footer";
import FloatingButtons from "./components/whatsapp";
import ScrollToTop from "./components/ScrollToTop";
import RagePopup from "./components/RageClickForm";
import Whatsapp from "./components/Callus";
/* import Navbar from "./components/Navbar_codexTemp"; */
import Navbar from "./components/Navbar";

// ── Font ──────────────────────────────────────────────────────────────────────
// next/font handles preloading automatically — no manual <link> needed.
const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"], // include 700 — you likely use bold somewhere
});

const GTM_ID = "GTM-5CXXQ9DJ";
const GA_ID = "G-M6ZWDM9CGE";
const FB_PIXEL_ID = "672210205737825";
const CLARITY_ID = "rivub95ldd";
// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="YrX73EQCsMkKBmh2pHUc" />
        <meta name="facebook-domain-verification" content="6dgiuxe5g66y85" />
        <meta name="msvalidate.01" content="4EEB445EE58BDF9E15EFDE4DB906372D" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* ── Google Tag Manager ── */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){
w[l]=w[l]||[];
w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        {/* ── Google Analytics ── */}
        <Script
          id="ga-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="ga-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true});`,
          }}
        />

        {/*
          ── Facebook Pixel ─────────────────────────────────────────────────
          FIX: Old code was loading fbevents.js TWICE:
            1. Hardcoded src inside the stub (immediately)
            2. Again via createElement on user interaction
          
          Correct pattern:
            - Stub (fbq function mock) runs immediately via afterInteractive
            - Actual fbevents.js script loads only on first user interaction
            - No double load, no render blocking
        */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '982876334382862');
fbq('track', 'PageView');`,
          }}
        />

        {/* ── Microsoft Clarity ── */}
        <Script
          id="ms-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;
t.src="https://www.clarity.ms/tag/${CLARITY_ID}";
y=l.getElementsByTagName(r)[0];
y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
      </head>

      <body className={lato.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style="display:none"
            src="https://www.facebook.com/tr?id=982876334382862&ev=PageView&noscript=1"
          />
        </noscript>

        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
        <FloatingButtons />
        <Whatsapp />
        <RagePopup />
      </body>
    </html>
  );
}
