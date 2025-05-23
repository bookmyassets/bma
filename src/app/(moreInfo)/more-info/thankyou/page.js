'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense } from "react";

function ThankYouContent() {
  const router = useRouter();
  const returnUrl = new URLSearchParams(window.location.search).get('return') || '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(returnUrl);
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [router, returnUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-green-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white p-8 max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-6">
          Your request has been submitted successfully. We'll contact you shortly.
        </p>
        <p className="text-sm opacity-80">
          You'll be redirected back in a moment...
        </p>
      </motion.div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}