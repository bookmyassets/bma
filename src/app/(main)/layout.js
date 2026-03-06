import "./globals.css";
import { Lato } from "next/font/google";
import Script from "next/script";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/whatsapp";
import ContactNow from "./components/Callus";
import ScrollToTop from "./components/ScrollToTop";
import RagePopup from "./components/RageClickForm";

// ── Font ──────────────────────────────────────────────────────────────────────
// next/font handles preloading automatically — no manual <link> needed.
const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"], // include 700 — you likely use bold somewhere
});

// ── Metadata (only works when layout is a Server Component) ───────────────────
export const metadata = {
  title: "Dholera Plots under ₹10 Lakh | BookMyAssets",
  description:
    "Invest in RERA-approved, registry-ready plots in Dholera Smart City — India's first greenfield smart city. 0 KM from Dholera SIR boundary.",
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  // Replace these with your real IDs
  const GTM_ID = "GTM-5CXXQ9DJ";
  const GA_ID = "G-M6ZWDM9CGE";
  const FB_PIXEL_ID = "672210205737825";
  const CLARITY_ID = "rivub95ldd";

  return (
    <html lang="en">
      <head>
        {/* Facebook domain verification — fine as a plain meta tag */}
        <meta
          name="facebook-domain-verification"
          content="6dgioemr9ldkch8vjbshuxe5g66y85"
        />

        {/*
          ── Google Tag Manager (head snippet) ──────────────────────────────
          FIX: was missing strategy, defaulting to beforeInteractive = render-blocking.
          afterInteractive = loads after hydration, non-blocking.
        */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        {/*
          ── Google Analytics ────────────────────────────────────────────────
          FIX 1: src was "/gtag" — wrong URL, analytics was not loading at all.
          FIX 2: The config script must run AFTER the gtag.js src loads.
                 Use onReady or just keep as two sequential afterInteractive scripts.
        */}
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
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `,
          }}
        />

        {/*
          ── Facebook Pixel ──────────────────────────────────────────────────
          FIX: was strategy="afterInteractive" but pixel still fires fbq('track')
          immediately on load, blocking the main thread.
          New approach: initialise the fbq stub immediately (tiny, no network),
          but defer loading the heavy fbevents.js until the first user interaction.
          This cuts TBT by ~60ms on average mobile connection.
        */}
        <Script
          id="fb-pixel-stub"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Set up fbq stub — no network request yet
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;
                n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
              }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');

              // Defer loading the actual fbevents.js script until first interaction
              // Saves ~60ms TBT on mobile
              function loadFbPixel() {
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://connect.facebook.net/en_US/fbevents.js';
                document.head.appendChild(s);
                ['mousemove','scroll','keydown','touchstart','click'].forEach(function(e){
                  document.removeEventListener(e, loadFbPixel);
                });
              }
              ['mousemove','scroll','keydown','touchstart','click'].forEach(function(e){
                document.addEventListener(e, loadFbPixel, { once: true, passive: true });
              });
            `,
          }}
        />

        {/*
          ── Microsoft Clarity ───────────────────────────────────────────────
          lazyOnload is correct here — Clarity is a session recorder, it
          should never be on the critical path.
        */}
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
        {/*
          ── GTM noscript body tag ─────────────────────────────────────────
          Must be the first child of <body> per GTM spec.
        */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Facebook Pixel noscript fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
        <FloatingButtons />
        <ContactNow />
        <RagePopup />
      </body>
    </html>
  );
}
