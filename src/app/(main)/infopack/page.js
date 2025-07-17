import React from 'react'
import Head from 'next/head';
import Info from './latest';

/* export const metadata = {
  robots: {
  index: false,   // noindex
  follow: true,   // follow
  googleBot: {
    index: false,
    follow: true,
  },
}
}; */

export default function page() {
  return (
    <div>
      <Info/>
    </div>
  )
}