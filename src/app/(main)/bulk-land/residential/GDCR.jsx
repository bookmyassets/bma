"use client";
import React, { useState, useEffect, useRef } from "react";

export default function GDCR() {
  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-gray-100 py-4 px-4 sm:px-6 lg:px-8 space-y-4">
      <div>
        <section style={{ margin: "40px 0" }}>
          <div className="w-full  space-y-3 max-md:flex flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-center text-2xl mb-4">
              General Development Control Regulations - Full Document
            </p>
            <p className="text-center text-sm mb-8 animate-fadeIn">
              Official regulations as published by the Government of Gujarat for
              Dholera SIR.
            </p>
          </div>

          <iframe
            src={`https://docs.google.com/viewer?url=https://cdn.sanity.io/files/c3e1h345/projects/66dcad140036ee16f4c1d0d40cb3f56d39841639.pdf&embedded=true`}
            width="100%"
            height="500"
            style={{ border: "1px solid #ddd", borderRadius: "8px" }}
            title="General Development Control Regulations - Dholera SIR"
          />

          <a
            href="https://cdn.sanity.io/files/c3e1h345/projects/66dcad140036ee16f4c1d0d40cb3f56d39841639.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "10px 20px",
              background: "#deae4e",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            ⬇ Download Full DCR Document
          </a>
        </section>
      </div>
    </div>
  );
}
