import React from 'react'
import Info from './Info'

// For App Router, metadata should be exported like this
export const metadata = {
  robots: {
    index: false,
    follow: true
  }
};

export default function Page() {
  return (
    <div>
      <Info/>
    </div>
  )
}