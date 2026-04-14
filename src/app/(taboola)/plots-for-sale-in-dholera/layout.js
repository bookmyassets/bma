import React from "react";
import Navbar from "./components/Navbar";
import './globals.css';
import Form from "./components/Form";
import FloatingButtons from "./components/Whatsapp";
import Script from "next/script";

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

        <Script type="text/javascript">
 {`(         
  window._tfa = window._tfa || [];
  window._tfa.push({notify: 'event', name: 'page_view', id: 2018249});
  !function (t, f, a, x) {
         if (!document.getElementById(x)) {
            t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
         }
  }(document.createElement('script'),
  document.getElementsByTagName('script')[0],
  '//cdn.taboola.com/libtrc/unip/2018249/tfa.js',
  'tb_tfa_script');)`}


        </Script>
      </head>
      <body>
        <div>
          <div>
            <Navbar />
            {children}
            <FloatingButtons/>
          </div>
        </div>
      </body>
    </html>
  );
}