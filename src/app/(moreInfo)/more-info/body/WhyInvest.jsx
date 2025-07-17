import React, { useState, useEffect } from 'react';
import { ChevronRight, Plane, Building, Factory, Zap, TrendingUp } from 'lucide-react';

const InvestmentTimeline = () => {
  const [animatedItems, setAnimatedItems] = useState([]);

  const milestones = [
    {
      year: "2025",
      multiplier: "Current",
      price: "₹9,250/sq.ft",
      title: "Investment Entry Point",
      description: "Prime opportunity to invest in India's first smart city with world-class infrastructure under development",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      year: "2027-2029",
      multiplier: "5x Returns",
      price: "₹46,250/sq.ft",
      title: "Dholera-Ahmedabad Expressway & Airport Launch",
      description: "Direct connectivity to Ahmedabad via expressway and inaugural commercial flights at Dholera Airport",
      icon: <Plane className="w-6 h-6" />,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      year: "2030-2032",
      multiplier: "7x Returns",
      price: "₹64,750/sq.ft",
      title: "Tata Semiconductor Operations",
      description: "Tata's semiconductor manufacturing facility becomes fully operational, creating massive employment and industrial growth",
      icon: <Factory className="w-6 h-6" />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      year: "2033-2035",
      multiplier: "10x Returns",
      price: "₹92,500/sq.ft",
      title: "Complete Smart City Ecosystem",
      description: "All TP zones operational with full smart city infrastructure, making Dholera Gujarat's prime investment destination",
      icon: <Building className="w-6 h-6" />,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedItems(prev => {
        if (prev.length < milestones.length) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

const InvestmentCard = ({ milestone, index, isAnimated }) => (
    <div 
      className={`relative transition-all duration-700 transform ${
        isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Timeline connector */}
      {index < milestones.length - 1 && (
        <div className="absolute top-16 left-1/2 w-full h-1 bg-gray-300 transform -translate-x-1/2 z-0">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
            <div className="w-0 h-0 border-l-[6px] border-l-gray-400 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
          </div>
        </div>
      )}
      
      {/* Timeline dot */}
      {/* <div className={`absolute top-14 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${milestone.color} z-20 flex items-center justify-center shadow-lg border-2 border-white`}>
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
 */}
      {/* Card */}
      <div className={`${milestone.bgColor} ${milestone.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8 relative z-10`}>
        <div className="text-center mb-4">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${milestone.color} text-white mb-3`}>
            {milestone.icon}
          </div>
          <div className="text-lg font-bold text-gray-800">{milestone.year}</div>
          {<div className={`text-2xl font-bold ${milestone.color === 'bg-blue-500' ? 'text-blue-600' : 
                                                 milestone.color === 'bg-green-500' ? 'text-green-600' : 
                                                 milestone.color === 'bg-purple-500' ? 'text-purple-600' : 
                                                 'text-yellow-600'}`}>
            {milestone.multiplier}
          </div>}
          <div className="text-xl font-semibold text-gray-900 mt-1">{milestone.price}</div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{milestone.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Investment Growth Timeline
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Watch your investment multiply as Dholera Smart City reaches key development milestones
        </p>
      </div>

      <div className="relative">
        {/* Background timeline line for desktop */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gray-300 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {milestones.map((milestone, index) => (
            <InvestmentCard 
              key={index}
              milestone={milestone}
              index={index}
              isAnimated={animatedItems.includes(index)}
            />
          ))}
        </div>
      </div>

      {/* Investment Summary */}
      <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">₹13.8L</div>
            <div className="text-gray-600">Initial Investment</div>
            <div className="text-sm text-gray-500 mt-1">(150 sq.ft plot)</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">₹1.38Cr</div>
            <div className="text-gray-600">Projected Value by 2035</div>
            <div className="text-sm text-gray-500 mt-1">(10x returns)</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹1.24Cr</div>
            <div className="text-gray-600">Potential Profit</div>
            <div className="text-sm text-gray-500 mt-1">(900% growth)</div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg mb-4">
            <strong>Why Dholera?</strong> India's first smart city with government backing, strategic location, and world-class infrastructure
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Your Investment Journey
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
  *Projections are estimates based on current development plans. Past performance is not indicative of future results.
</p>
      </div>
    </div>
  );
};

export default InvestmentTimeline;