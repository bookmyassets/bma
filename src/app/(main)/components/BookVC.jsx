// BookVC.jsx
"use client";

import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

export default function BookButton({ className }) {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    setRoot(document.body);
  }, []);

  if (!root) return null;

  return (
    <PopupButton
      url="https://calendly.com/dholeratimes/30min"
      rootElement={root}
      text="Book Video Call"
      className={className}
    />
  );
}