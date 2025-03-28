const Footer = () => {
    return (
      <footer className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us Column */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">About Us</h3>
              <p className="text-gray-700">
                BookMyAssets™ is the preferred real estate IPA (Indian Property Associate) of Gurgaon for commercial and residential spaces
              </p>
            </div>
  
            {/* Links Column */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/pages/about" className="text-gray-700 hover:text-yellow-600 transition">About Us</a>
                </li>
                <li>
                  <a href="/pages/contact" className="text-gray-700 hover:text-yellow-600 transition">Contact Us</a>
                </li>
              </ul>
            </div>
  
            {/* Policies Column */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">Policies</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/policies/copyright" className="text-gray-700 hover:text-yellow-600 transition">Copyright Policy</a>
                </li>
                <li>
                  <a href="/policies/terms" className="text-gray-700 hover:text-yellow-600 transition">Terms of Use</a>
                </li>
                <li>
                  <a href="/policies/privacy" className="text-gray-700 hover:text-yellow-600 transition">Privacy Policy</a>
                </li>
              </ul>
            </div>
  
            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 text-yellow-500 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">620, JMD Megapolis, Sohna Rd, Sector 48, Gurugram, India 122018</span>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 text-yellow-500 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <a href="mailto:info@bookmyassets.com" className="text-gray-700 hover:text-yellow-600 transition">info@bookmyassets.com</a>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 text-yellow-500 mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <a href="tel:+919717671112" className="text-gray-700 hover:text-yellow-600 transition">+91 97 1767 1112</a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Copyright Bar - Optional */}
          <div className="mt-8 max-md:mb-10 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} BookMyAssets™. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;