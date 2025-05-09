import React from 'react'
import Info from './Info'
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
      <Head>
        <meta name="robots" content="noindex, follow" />
        <meta name="googlebot" content="noindex, follow" />
        <title>Do Not Index This Page</title>
      </Head>
      <Info/>
    </div>
  )
}
