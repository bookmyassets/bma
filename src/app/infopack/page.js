import React from 'react'
import Info from './Info'

export const metadata = {
  robots: {
    index: false,
    follow: true
  }
};

export default function page() {
  return (
    <div>
      <Info/>
    </div>
  )
}
