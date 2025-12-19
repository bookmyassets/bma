import { useEffect, useRef, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import image from "@/assests/homepage/formimage.png"
import Image from "next/image";

const ImageMapFormOverlay = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: ''
  });
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Store the image dimensions for coordinate calculation
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  // Calculate relative coordinates based on actual image size
  const getRelativePosition = (coords) => {
    if (!imageRef.current || !imageDimensions.width || !imageDimensions.height) {
      return { left: 0, top: 0, width: 0, height: 0 };
    }

    // Original image size is 450x350
    const originalWidth = 450;
    const originalHeight = 350;
    
    // Calculate scale factors
    const scaleX = imageDimensions.width / originalWidth;
    const scaleY = imageDimensions.height / originalHeight;
    
    const [x1, y1, x2, y2] = coords;
    
    return {
      left: Math.round(x1 * scaleX),
      top: Math.round(y1 * scaleY),
      width: Math.round((x2 - x1) * scaleX),
      height: Math.round((y2 - y1) * scaleY)
    };
  };

  // Map coordinates from your <area> tags
  const inputAreas = [
    {
      id: 'name',
      name: 'fullName',
      placeholder: 'Full Name *',
      coords: [51, 85, 210, 122],
      icon: <FaUser className="text-yellow-400" />
    },
    {
      id: 'phone',
      name: 'phone',
      placeholder: 'Phone Number *',
      coords: [236, 86, 412, 119],
      icon: <FaPhoneAlt className="text-yellow-400" />
    }
  ];

  const buttonArea = {
    id: 'button',
    coords: [156, 162, 312, 194],
    text: 'Get Plot Details'
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const { width, height } = imageRef.current.getBoundingClientRect();
        setImageDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleImageLoad = () => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageDimensions({ width, height });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowThankYou(true);
      
      setTimeout(() => {
        setShowFormPopup(false);
        setShowThankYou(false);
        setFormData({ fullName: '', phone: '' });
      }, 2000);
    }, 1500);
  };

  const handleAreaClick = (areaId) => {
    if (areaId === 'button') {
      if (formData.fullName && formData.phone) {
        handleSubmit({ preventDefault: () => {} });
      } else {
        setShowFormPopup(true);
      }
    } else {
      setShowFormPopup(true);
    }
  };

  const handleBackdropClick = () => {
    setShowFormPopup(false);
  };

  const handlePopupClose = () => {
    setShowFormPopup(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Image with map */}
      <div className="relative">
        <Image
          ref={imageRef}
          src={image}
          alt="Interactive form"
          className="w-full h-auto max-w-[450px] max-h-[350px]"
          useMap="#image-map"
          onLoad={handleImageLoad}
        />
        
        <map name="image-map">
          {inputAreas.map(area => (
            <area
              key={area.id}
              alt={area.id}
              title={area.id}
              coords={area.coords.join(',')}
              shape="rect"
              onClick={() => handleAreaClick(area.id)}
              style={{ cursor: 'pointer' }}
            />
          ))}
          <area
            alt={buttonArea.id}
            title={buttonArea.id}
            coords={buttonArea.coords.join(',')}
            shape="rect"
            onClick={() => handleAreaClick(buttonArea.id)}
            style={{ cursor: 'pointer' }}
          />
        </map>

        {/* Overlay inputs on image */}
        {imageDimensions.width > 0 && inputAreas.map(area => {
          const pos = getRelativePosition(area.coords);
          
          // Calculate input sizes based on area dimensions
          const inputWidth = pos.width - 20; // Padding adjustment
          const inputHeight = pos.height - 10; // Padding adjustment
          
          return (
            <div
              key={area.id}
              className="absolute"
              style={{
                left: `${pos.left}px`,
                top: `${pos.top}px`,
                width: `${pos.width}px`,
                height: `${pos.height}px`
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <input
                  type="text"
                  name={area.name}
                  placeholder={area.placeholder}
                  value={formData[area.name]}
                  onChange={handleChange}
                  className="absolute w-full h-full bg-transparent border-2 border-yellow-400 rounded-lg px-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm bg-black bg-opacity-50"
                  style={{
                    fontSize: `${Math.max(12, pos.height * 0.3)}px`,
                    paddingLeft: `${pos.width * 0.25}px`
                  }}
                  onClick={() => setShowFormPopup(true)}
                />
                <div 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{
                    fontSize: `${Math.max(14, pos.height * 0.35)}px`
                  }}
                >
                  {area.icon}
                </div>
              </div>
            </div>
          );
        })}

        {/* Overlay button on image */}
        {imageDimensions.width > 0 && (
          <div
            className="absolute"
            style={{
              left: `${getRelativePosition(buttonArea.coords).left}px`,
              top: `${getRelativePosition(buttonArea.coords).top}px`,
              width: `${getRelativePosition(buttonArea.coords).width}px`,
              height: `${getRelativePosition(buttonArea.coords).height}px`
            }}
          >
            <button
              onClick={() => handleAreaClick('button')}
              className="w-full h-full bg-[#deae3c] hover:bg-[#eab308] text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                fontSize: `${Math.max(12, getRelativePosition(buttonArea.coords).height * 0.4)}px`
              }}
            >
              {buttonArea.text}
            </button>
          </div>
        )}
      </div>

     

      {/* Popup Form */}
      <AnimatePresence>
        {showFormPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {showThankYou ? (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">We will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <button
                      onClick={handlePopupClose}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      Get More Details
                    </h1>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {errorMessage && (
                      <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm mb-4">
                        {errorMessage}
                      </div>
                    )}

                    <div className="space-y-4 mb-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                      >
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                        <input
                          name="fullName"
                          placeholder="Full Name *"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                      >
                        <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-400" />
                        <input
                          name="phone"
                          type="tel"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700 hover:border-yellow-400 transition-colors"
                        />
                      </motion.div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed text-gray-600"
                          : "bg-[#deae3c] hover:bg-[#eab308] text-white transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Get Plot Details"
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p className="text-xs text-gray-500">
                        We respect your privacy. Your details are safe with us.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageMapFormOverlay;