import React from "react";
import Navbar from "./components/Navbar";
import './globals.css';

export default function layout({ children }) {

  return (
    <html>
      <head></head>
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