import React from 'react';
import { Target, Lightbulb, Users } from 'lucide-react';

export default function DholeraEventSection() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Why Attend */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Why Attend
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Expert insights on Dholera’s infrastructure, policy and industrial roadmap.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Clear guidance on documentation and due-diligence essentials for secure purchases.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Access to verified, government-approved, title-cleared inventory.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Exclusive Chandigarh-only on-spot booking window with special offers.
                </p>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Key Takeaways
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Understand how Dholera's growth momentum can create long-term value
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Explore upcoming infrastructure developments and policy initiatives
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Network with leading professionals, channel partners, and advisors
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Learn from on-ground experts and industry speakers
                </p>
              </div>
            </div>
          </div>

          {/* Who Should Attend */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Who Should Attend
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Individual investors exploring secure land opportunities
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Channel partners and real estate advisors seeking verified projects
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">
                  Professionals looking to understand India's next growth corridor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}