"use client";
import { useState, useRef, useEffect } from "react";
import logo from "@/assests/Bmalogo.png";
import { Geist, Geist_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import { getPosts } from "@/sanity/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isDholeraOpen, setIsDholeraOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  
  const projectsRef = useRef(null);
  const dholeraRef = useRef(null);

  const handleClose = () => {
    setIsMenuOpen(false);
  };
  
  const toggleProjectsDropdown = () => {
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
    setIsDholeraOpen(false);
  };

  const toggleDholeraDropdown = () => {
    setIsDholeraOpen(!isDholeraOpen);
    setIsProjectsDropdownOpen(false);
  };

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    function handleClickOutside(event) {
      if (projectsRef.current && !projectsRef.current.contains(event.target)) {
        setIsProjectsDropdownOpen(false);
      }
      if (dholeraRef.current && !dholeraRef.current.contains(event.target)) {
        setIsDholeraOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const projectsData = await getPosts();
      setProjects(projectsData);
    }
    fetchData();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed w-full bg-black text-[#FDB913] backdrop-blur-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-32 items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image src={logo} height={140} width={90} alt="logo" />
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden text-xl md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="/pages/Blogs"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/pages/Events"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    Events
                  </Link>
                  
                  {/* Projects Dropdown with Animation */}
                  <div 
                    ref={projectsRef}
                    onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                    onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                    className="relative group"
                  >
                    <div className="flex items-center gap-1 px-3 py-2 text-[#FDB913] hover:text-white cursor-pointer">
                      <Link href="/pages/properties">Locations</Link>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-[#FDB913] transition-transform duration-300 ${
                          isProjectsDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span
                        style={{
                          transform: isProjectsDropdownOpen ? "scaleX(1)" : "scaleX(0)",
                        }}
                        className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-orange-300 transition-transform duration-300 ease-out"
                      />
                    </div>
                    
                    {/* Projects Dropdown Content */}
                    <AnimatePresence>
                      {isProjectsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50"
                        >
                          <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                          <div className="w-48 py-2">
                            {projects.map((project) => (
                              <Link
                                key={project._id}
                                href={`/posts/${project.slug.current}`}
                                className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                                onClick={() => setIsProjectsDropdownOpen(false)}
                              >
                                {project.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Dholera SIR Dropdown with Animation */}
                  <div 
                    ref={dholeraRef}
                    onMouseEnter={() => setIsDholeraOpen(true)}
                    onMouseLeave={() => setIsDholeraOpen(false)}
                    className="relative group"
                  >
                    
                    
                    {/* Dholera Dropdown Content */}
                    <AnimatePresence>
                      {isDholeraOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50"
                        >
                          <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                          <div className="w-48 py-2">
                            <Link 
                              href="#item2"
                              className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                              onClick={() => setIsDholeraOpen(false)}
                            >
                              Investment Options
                            </Link>
                            <Link 
                              href="#item3"
                              className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                              onClick={() => setIsDholeraOpen(false)}
                            >
                              Infrastructure
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Link
                    href="/pages/contact"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/pages/about"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    About
                  </Link>
                  <Link
                    href="#testimonials"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    Gallery
                  </Link>
                </div>
              </div>
              
              {/* Mobile Menu Toggle Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-[#FDB913]" />
                  ) : (
                    <Menu className="h-6 w-6 text-[#FDB913]" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden bg-black overflow-hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    href="/"
                    className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                    onClick={handleClose}
                  >
                    Home
                  </Link>
                  <Link
                    href="/pages/Blogs"
                    className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                    onClick={handleClose}
                  >
                    Blogs
                  </Link>
                  
                  {/* Mobile Projects Dropdown */}
                  <div>
                    <button
                      onClick={toggleProjectsDropdown}
                      className="text-[#FDB913] flex items-center justify-between w-full px-3 py-2 hover:bg-[#420703] rounded-md"
                    >
                      <span>Locations</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-[#FDB913] transition-transform duration-300 ${
                          isProjectsDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {isProjectsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {projects.map((project) => (
                            <Link
                              key={project._id}
                              href={`/posts/${project.slug.current}`}
                              className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md pl-6"
                              onClick={handleClose}
                            >
                              {project.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  
                  <Link
                    href="/pages/Events"
                    className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                    onClick={handleClose}
                  >
                    Events
                  </Link>
                  <Link
                    href="/pages/about"
                    className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                    onClick={handleClose}
                  >
                    About
                  </Link>
                  <Link
                    href="#gallery"
                    className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                    onClick={handleClose}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/pages/contact"
                    className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                    onClick={handleClose}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        {children}
      </body>
    </html>
  );
}