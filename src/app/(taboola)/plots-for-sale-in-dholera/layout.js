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