import React from "react";
import Navbar from "./components/Navbar";
import './globals.css';
import Form from "./components/Form";

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