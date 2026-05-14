'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CORRECT_PIN = '1234' // change this

export default function CrmLock() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  function handleSubmit() {
    if (pin === CORRECT_PIN) {
      document.cookie = 'crm_auth=granted; path=/'
      router.push('/after-sales/crm')
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#151f28]">
      <h2 className="text-[#debe6b] text-2xl font-bold mb-6">Enter CRM PIN</h2>
      <input
        type="password"
        value={pin}
        onChange={(e) => { setPin(e.target.value); setError(false) }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Enter PIN"
        className="text-center text-xl tracking-widest px-4 py-3 rounded-lg bg-[#1e2d3d] text-[#fbfbfb] border border-[#debe6b] outline-none w-48"
      />
      {error && <p className="text-red-400 mt-3 text-sm">Incorrect PIN</p>}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-[#debe6b] text-[#151f28] font-semibold px-8 py-2 rounded-lg"
      >
        Enter
      </button>
    </div>
  )
}