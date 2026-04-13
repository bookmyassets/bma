import React from "react";
import Navbar from "./components/Navbar";
import './globals.css';
import Form from "./components/Form";

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
          </div>
        </div>
      </body>
    </html>
  );
}