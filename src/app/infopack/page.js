import React from 'react'
import Info from './new'
import Head from 'next/head';

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
      <meta name="robots" content="noindex, follow"></meta>
      <Info/>
    </div>
  )
}
