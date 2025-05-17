import React from 'react'
import logo from "@/assests/Bmalogo.png"

export default function Navbar() {
  return (
    <>
        <div>
            <div className='max-w-7xl'>
                <Link href="/">
                  <Image src={logo} height={80} width={80} alt="logo" />
                </Link>
            </div>    
        </div>   
    </>
  )
}