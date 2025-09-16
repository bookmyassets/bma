import LeadForm from '../components/LeadForm'
import React from 'react'
import { Building2, Shield, TrendingUp, BadgeCheck } from 'lucide-react'

export default function AboutBMA() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" id='about-us'>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left section - 40% */}
        <div className="w-full lg:w-2/5">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#deae3c]"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                About Us
              </h2>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At BookMyAssets, we specialize in AUDA & government-approved projects in Dholera Smart City. 
              With transparent processes, legal security, and a high ROI focus, we make investing in 
              Dholera, Gujarat, simple, secure, and rewarding.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#deae3c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Government Approved:</span> All projects are AUDA & government-approved
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#deae3c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Legal Security:</span> Complete documentation and clear titles
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#deae3c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">High ROI:</span> Focus on maximum returns with strategic investments
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#deae3c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Dholera Expertise:</span> Specialized knowledge of Dholera Smart City developments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section - 60% */}
        <div className="w-full lg:w-3/5">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
            
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  )
}