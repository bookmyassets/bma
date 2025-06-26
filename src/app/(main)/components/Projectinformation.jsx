"use client"
import React, { useState } from 'react'
import PopupForm from './PopupForm'
import { AnimatePresence, motion } from 'framer-motion'

export default function Projectinformation() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const openContactForm = () => setIsContactFormOpen(true)
  const closeContactForm = () => setIsContactFormOpen(false)

  return (
    <>
      <button
        onClick={openContactForm}
        className="text-center"
      >
        Request More Information
      </button>

<AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactForm}
          >
            <motion.div
              className=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="">
                <div className="">

                  
                </div>
                <PopupForm
                title="Get Expert Guidance on Dholera Investment"
                buttonName="Book Consultation"
                onClose={closeContactForm}
              />
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

{/*       <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactForm}
          >
            <motion.div
              className=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PopupForm
                title="Get Expert Guidance on Dholera Investment"
                buttonName="Book Consultation"
                onClose={closeContactForm}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  )
}
