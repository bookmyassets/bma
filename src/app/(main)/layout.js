"use client";
import { useState, useRef, useEffect } from "react";
import logo from "@/assests/Bmalogo.png";
import { Geist, Geist_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import "./globals.css";
import Image from "next/image";
import { getPosts, projectInfo } from "@/sanity/lib/api";
import ContactForm from "./components/Contactform";
import Script from "next/script";
import Footer from "./components/Footer";
import ContactNow from "./components/Callus";
import FloatingButtons from "./components/whatsapp";
import { usePathname } from "next/navigation";
import { initFacebookPixel, trackPageView } from "@/lib/fbpixel";

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
  const [isGetInTouchDropdownOpen, setIsGetInTouchDropdownOpen] =
    useState(false);
  const [isDholeraDropdownOpen, setIsDholeraDropdownOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [info, setInfo] = useState([]);

  const projectsRef = useRef(null);
  const getInTouchRef = useRef(null);
  const dholeraRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuToggleRef = useRef(null);
  const galleryRef = useRef(null);

  const pathname = usePathname();

  const FACEBOOK_PIXEL_ID = "1147887730461644";

  useEffect(() => {
    initFacebookPixel(FACEBOOK_PIXEL_ID);
    trackPageView();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [pathname]);

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsProjectsDropdownOpen(false);
    setIsGetInTouchDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  // Toggle menu and close other interactions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    closeAllDropdowns();
  };

  // Open contact form
  const openContactForm = () => {
    setIsContactFormOpen(true);
    setIsMenuOpen(false);
    setIsGetInTouchDropdownOpen(false);
    setIsProjectsDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  const toggleProjectsDropdown = () => {
    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
    setIsGetInTouchDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  const toggleGalleryDropdown = () => {
    setIsGalleryOpen(!isGalleryOpen);
    setIsGetInTouchDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  const toggleGetInTouchDropdown = () => {
    setIsGetInTouchDropdownOpen(!isGetInTouchDropdownOpen);
    setIsProjectsDropdownOpen(false);
    setIsDholeraDropdownOpen(false);
  };

  const toggleDholeraDropdown = () => {
    setIsDholeraDropdownOpen(!isDholeraDropdownOpen);
    setIsProjectsDropdownOpen(false);
    setIsGetInTouchDropdownOpen(false);
  };

  // Handle clicks outside dropdowns and mobile menu
  useEffect(() => {
    function handleClickOutside(event) {
      // Handle dropdown clicks
      if (
        projectsRef.current &&
        !projectsRef.current.contains(event.target) &&
        getInTouchRef.current &&
        !getInTouchRef.current.contains(event.target) &&
        dholeraRef.current &&
        !dholeraRef.current.contains(event.target)
      ) {
        closeAllDropdowns();
      }

      // Handle mobile menu clicks
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Fetch projects
  useEffect(() => {
    async function fetchData() {
      const projectsData = await getPosts();
      setProjects(projectsData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const infoData = await projectInfo();
      setInfo(infoData);
    }
    fetchData();
  }, []);

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const isActiveLink = (pathname, linkPath) => {
    // Special case for home page
    if (linkPath === "/") {
      return pathname === linkPath;
    }
    return pathname.startsWith(linkPath);
  };

  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-M6ZWDM9CGE"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || []; 
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-M6ZWDM9CGE'); 
            `,
          }}
        />
        <Script type="text/javascript">
          {`
               (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rivub95ldd");
        `}
        </Script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="robots" content="index, follow"></meta>
        <link rel="canonical"></link>

        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://www.bookmyassets.com/"></meta>
        <meta property="og:image"></meta>
        <meta property="og:site_name" content="Book My Assets"></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="fixed w-full text-[#FDB913] backdrop-blur-xl backdrop-brightness-50 bg-black/60 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24  items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image src={logo} height={80} width={80} alt="logo" />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden text-xl lg:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className={`px-3 py-2 ${
                      isActiveLink(pathname, "/")
                        ? "text-white font-semibold"
                        : "text-[#FDB913] hover:text-white"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className={`px-3 py-2 ${
                      isActiveLink(pathname, "/about")
                        ? "text-white font-semibold"
                        : "text-[#FDB913] hover:text-white"
                    }`}
                  >
                    About
                  </Link>

                  {/* Projects Dropdown */}
                  <div ref={projectsRef} className="relative group">
                    <Link
                      href="/projects/dholera/westwyn-county-wc"
                      className={`flex items-center gap-1 px-3 py-2 ${
                        isActiveLink(pathname, "/projects")
                          ? "text-white font-semibold"
                          : "text-[#FDB913] hover:text-white"
                      } cursor-pointer`}
                      /* onClick={toggleProjectsDropdown}
                      onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                      onMouseLeave={() => setIsProjectsDropdownOpen(false)} */
                    >
                      Projects
                      {/* <svg
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
                      </svg> */}
                    </Link>

                    <AnimatePresence>
                      {isProjectsDropdownOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50"
                          onMouseEnter={() => setIsProjectsDropdownOpen(true)}
                          onMouseLeave={() => setIsProjectsDropdownOpen(false)}
                        >
                          <div className="w-48 py-2">
                            {projects.map((project) => (
                              <Link
                                key={project._id}
                                href={`/projects/${project.slug.current}`}
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

                  <div ref={dholeraRef} className="relative group">
                    <Link
                      href="/dholera-sir"
                      className={`flex items-center gap-1 px-3 py-2 ${
                        isActiveLink(pathname, "/dholera-sir")
                          ? "text-white font-semibold"
                          : "text-[#FDB913] hover:text-white"
                      } cursor-pointer`}
                      onClick={toggleDholeraDropdown}
                      onMouseEnter={() => setIsDholeraDropdownOpen(true)}
                      onMouseLeave={() => setIsDholeraDropdownOpen(false)}
                    >
                      Dholera SIR
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
                    </Link>

                    <AnimatePresence>
                      {isDholeraDropdownOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50"
                          onMouseEnter={() => setIsDholeraDropdownOpen(true)}
                          onMouseLeave={() => setIsDholeraDropdownOpen(false)}
                        >
                          <div className="w-48 py-2">
                            {info.map((proj) => (
                              <Link
                                key={proj._id}
                                href={`/dholera-sir/${proj.slug.current}`}
                                className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                                onClick={() => setIsDholeraDropdownOpen(false)}
                              >
                                {proj.title}
                              </Link>
                            ))}
                            <Link
                              href="/dholera-sir/latest-updates"
                              className="block px-4 py-2 text-[#FDB913] hover:bg-gray-200 transition-colors"
                            >
                              Latest Updates
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Other Desktop Menu Items */}
                  <Link
                    href="/blogs"
                    className={`px-3 py-2 ${
                      isActiveLink(pathname, "/blogs")
                        ? "text-white font-semibold"
                        : "text-[#FDB913] hover:text-white"
                    }`}
                  >
                    Blogs
                  </Link>
                  {/* <Link
                    href="/events"
                    className="text-[#FDB913] hover:text-white px-3 py-2"
                  >
                    Events
                  </Link> */}

                  {/* Get in Touch Dropdown */}
                  <div ref={getInTouchRef} className="relative group">
                    <Link href="/contact">
                      <button
                        className="text-[#FDB913] hover:text-white px-3 py-2 cursor-pointer flex items-center gap-1"
                        onClick={toggleGetInTouchDropdown}
                        onMouseEnter={() => setIsGetInTouchDropdownOpen(true)}
                        onMouseLeave={() => setIsGetInTouchDropdownOpen(false)}
                      >
                        Get in Touch
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-[#FDB913] transition-transform duration-300 ${
                            isGetInTouchDropdownOpen ? "rotate-180" : ""
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
                    </Link>

                    <AnimatePresence>
                      {isGetInTouchDropdownOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50 w-48"
                          onMouseEnter={() => setIsGetInTouchDropdownOpen(true)}
                          onMouseLeave={() =>
                            setIsGetInTouchDropdownOpen(false)
                          }
                        >
                          <div className="py-2">
                            <button
                              onClick={openContactForm}
                              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                            >
                              Book A Free Site Visit
                            </button>
                            <a
                              href="tel:+918130371647"
                              className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                            >
                              Call Now
                            </a>
                            <a
                              href="https://wa.me/918130371647"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                            >
                              WhatsApp Us
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative group" ref={galleryRef}>
                    <button
                      onClick={toggleGalleryDropdown}
                      className={`flex items-center gap-1 px-3 py-2 ${
                        isActiveLink(pathname, "/gallery")
                          ? "text-white font-semibold"
                          : "text-[#FDB913] hover:text-white"
                      } cursor-pointer`}
                      onMouseEnter={() => setIsGalleryOpen(true)}
                      onMouseLeave={() => setIsGalleryOpen(false)}
                    >
                      Gallery
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${
                          isActiveLink(pathname, "/gallery")
                            ? "text-white"
                            : "text-[#FDB913]"
                        } transition-transform duration-300 ${
                          isGalleryOpen ? "rotate-180" : ""
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
                      {isGalleryOpen && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                            hidden: { opacity: 0, y: -10 },
                            visible: { opacity: 1, y: 0 },
                            exit: { opacity: 0, y: -10 },
                          }}
                          className="absolute left-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50"
                          onMouseEnter={() => setIsGalleryOpen(true)}
                          onMouseLeave={() => setIsGalleryOpen(false)}
                        >
                          <div className="w-48 py-2">
                            {[
                              {
                                title: "Images",
                                path: "/gallery/images",
                              },
                              {
                                title: "Videos",
                                path: "/gallery/videos",
                              },
                            ].map((item) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                className={`block px-4 py-2 ${
                                  isActiveLink(pathname, item.path)
                                    ? "bg-gray-200 font-medium"
                                    : "text-black hover:bg-gray-200"
                                } transition-colors`}
                                onClick={() => setIsGalleryOpen(false)}
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Link
                    href="/career"
                    className={`px-3 py-2 ${
                      isActiveLink(pathname, "/career")
                        ? "text-white font-semibold"
                        : "text-[#FDB913] hover:text-white"
                    }`}
                  >
                    Career
                  </Link>

                  <Link
                    href="/infopack"
                    className="text-white hidden hover:text-orange-200 px-3 py-2"
                  >
                    Info Pack
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden flex items-center gap-4">
                <div className="relative">
                  <button
                    className="text-white text-xl font-semibold px-3 py-2 cursor-pointer flex items-center gap-1"
                    onClick={toggleGetInTouchDropdown}
                  >
                    Get in Touch
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-white  font-semibold transition-transform duration-300 ${
                        isGetInTouchDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isGetInTouchDropdownOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute right-0 top-12 bg-white rounded-md shadow-lg overflow-hidden z-50 w-48"
                      >
                        <div className="py-2">
                          <button
                            onClick={openContactForm}
                            className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                          >
                            Enquire Now
                          </button>
                          <a
                            href="tel:+918130371647"
                            className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                          >
                            Call Now
                          </a>
                          <a
                            href="https://wa.me/918130371647"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                          >
                            WhatsApp Us
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button onClick={toggleMenu} ref={menuToggleRef}>
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-[#FDB913]" />
                  ) : (
                    <Menu className="h-6 w-6 text-[#FDB913]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="fixed inset-0 bg-black bg-opacity-90 pt-96 flex justify-center items-center z-50"
              >
                <div
                  ref={mobileMenuRef}
                  className="bg-[#1A0D00] p-5 w-4/5 max-w-md rounded-lg shadow-lg"
                >
                  <div className="flex justify-end">
                    <button onClick={() => setIsMenuOpen(false)}>
                      <X className="h-6 w-6 text-[#FDB913]" />
                    </button>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                      href="/"
                      className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>

                    {/* Mobile Projects Dropdown */}
                    <div>
                      <Link
                        href="/projects/dholera/westwyn-county-wc"
                        /* onClick={toggleProjectsDropdown} */
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[#FDB913] flex items-center justify-between w-full px-3 py-2 hover:bg-[#420703] rounded-md"
                      >
                        <span>Projects</span>
                        {/* <svg
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
                        </svg> */}
                      </Link>
                      <AnimatePresence>
                        {isProjectsDropdownOpen && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="ml-4 mt-1 space-y-1"
                          >
                            {projects.map((project) => (
                              <Link
                                key={project._id}
                                href={`/projects/${project.slug.current}`}
                                className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md pl-6"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsProjectsDropdownOpen(false);
                                }}
                              >
                                {project.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mobile Dholera SIR Dropdown */}

                    <div>
                      <Link
                        href="/dholera-sir"
                        onClick={toggleDholeraDropdown}
                        className="text-[#FDB913] flex items-center justify-between w-full px-3 py-2 hover:bg-[#420703] rounded-md"
                      >
                        <span>Dholera SIR</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-[#FDB913] transition-transform duration-300 ${
                            isDholeraDropdownOpen ? "rotate-180" : ""
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
                      </Link>
                      <AnimatePresence>
                        {isDholeraDropdownOpen && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="ml-4 mt-1 space-y-1"
                          >
                            {info.map((project) => (
                              <Link
                                key={project._id}
                                href={`/dholera-sir/${project.slug.current}`}
                                className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md pl-6"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsDholeraDropdownOpen(false);
                                }}
                              >
                                {project.title}
                              </Link>
                            ))}
                            <Link
                              href="/dholera-sir/latest-updates"
                              className="block px-4 py-2 text-black hover:bg-gray-200 transition-colors"
                            >
                              Latest Updates
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Link
                      href="/blogs"
                      className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blogs
                    </Link>
                    {/*  <Link
                      href="/events"
                      className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Events
                    </Link> */}

                    <div>
                      <Link
                        href="/gallery/images"
                        onClick={toggleGalleryDropdown}
                        className="text-[#FDB913] flex items-center justify-between w-full px-3 py-2 hover:bg-[#420703] rounded-md"
                      >
                        <span>Gallery</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 text-[#FDB913] transition-transform duration-300 ${
                            isGalleryOpen ? "rotate-180" : ""
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
                      </Link>
                      <AnimatePresence>
                        {isGalleryOpen && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                              hidden: { opacity: 0, height: 0 },
                              visible: { opacity: 1, height: "auto" },
                              exit: { opacity: 0, height: 0 },
                            }}
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {[
                              {
                                title: "Images",
                                path: "/gallery/images",
                              },
                              {
                                title: "Videos",
                                path: "/gallery/videos",
                              },
                            ].map((item) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md pl-6"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsGalleryOpen(false);
                                }}
                              >
                                {item.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Link
                      href="/career"
                      className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Career
                    </Link>
                    <Link
                      href="/contact"
                      className="text-[#FDB913] block px-3 py-2 hover:bg-[#420703] rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {isContactFormOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
              <ContactForm onClose={() => setIsContactFormOpen(false)} />
            </div>
          )}
        </AnimatePresence>

        {children}
        <ContactNow />
        <FloatingButtons />
        <Footer />
      </body>
    </html>
  );
}
