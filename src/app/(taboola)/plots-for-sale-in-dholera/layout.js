import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import Form from "./components/Form";
import FloatingButtons from "./components/Whatsapp";
import Script from "next/script";
import Whatsapp from "@/app/(moreInfo)/more-info/components/WhatsAppCirle";

export default function layout({ children }) {
  return (
    <html>
      <head>
        <title> Premium Residential Plots in Dholera | BookMyAssets </title>
        <meta
          name="description"
          content="Explore premium plotted opportunities in Dholera Smart City. Get brochure, price list, site visit support, and expert guidance from BookMyAssets."
        />
        <meta
          name="keywords"
          content="premium plots in dholera, residential plots in dholera, dholera smart city plots, bookmyassets plots, dholera investment plots, govt approved dholera plots"
        />

         <Script
          id="taboola-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window._tfa = window._tfa || [];
              window._tfa.push({notify: 'event', name: 'page_view', id: 292018249});
              !function (t, f, a, x) {
                if (!document.getElementById(x)) {
                  t.async = 1;
                  t.src = a;
                  t.id = x;
                  f.parentNode.insertBefore(t, f);
                }
              }(document.createElement('script'),
              document.getElementsByTagName('script')[0],
              '//cdn.taboola.com/libtrc/unip/2018249/tfa.js',
              'tb_tfa_script');
            `,
          }}
        />

        <Script
          id="ms-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wbi9ww24ro");`,
          }}
        />
      </head>
      <body>
        <div>
          <div>
            <Navbar />
            {children}
            <FloatingButtons />
            <Whatsapp/>
          </div>
        </div>
      </body>
    </html>
  );
}
