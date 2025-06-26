"use client";
import React, { useState } from 'react';
import PopupForm from './PopupForm';
import { AnimatePresence } from 'framer-motion';

export default function Projectinformation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2"
      >
        Project Information
      </button>

      <AnimatePresence>
        {isOpen && (
          <PopupForm
            title="Get Expert Guidance"
            buttonName="Request Information"
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}