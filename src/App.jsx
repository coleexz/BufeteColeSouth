import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Importing components
import Home from './components/Home/Home.jsx';
import AboutJuan from './components/AboutJuan/AboutJuan.jsx';
import Areas from './components/Areas/Areas.jsx';
import ContactUs from './components/ContactUs/ContactUs.jsx';
import AboutClaudia from './components/AboutClaudia/AboutClaudia.jsx';
import Email from './components/Email/Email.jsx';
import ScrollingImages from './components/ScrollingImages/Scrollingimages.jsx';
import TextForImages from './components/ScrollingImages/TextForImages.jsx';

import FloatingWhatsApp from './components/FloatingWhatsapp.jsx';



function App() {

  const headerButtons = ['Home', 'Services', 'About Us', 'Contact Us', 'Email'];
  const [menuOpen, setMenuOpen] = useState(false);

  const headerMapping = {
    "Home": "home",
    "About Us": "about",
    "Services": "services",
    "Contact Us": "contact",
    "Email": "email",
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (button) => {
    scrollToSection(headerMapping[button]);
    setMenuOpen(false);
  };

  const headerVariants = {
    collapsed: { height: "1rem" },
    expanded: { height: "6rem", transition: { duration: 0.3 } },
  };

  const contentVariants = {
    collapsed: { opacity: 0 },
    expanded: { opacity: 1, transition: { duration: 0.3 } },
  };

  const navItemVariants = {
    hover: {
      scale: 1.1,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < prevScrollY.current) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      prevScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      {/* Header */}
      <div>
        {/* Desktop Header (Large Screens) */}
        <div className="hidden lg:flex justify-center ">
            <motion.header
                variants={headerVariants}
                animate={isScrollingUp ? "expanded" : "collapsed"}
                whileHover="expanded"
                initial="collapsed"
                className="fixed top-2 flex items-center justify-between bg-black bg-opacity-90 backdrop-blur-md p-4 lg:p-6 text-white lg:w-[103rem] lg:rounded-full z-50 shadow-md overflow-hidden"
            >
                <motion.div
                    variants={contentVariants}
                    className="relative flex items-center justify-between w-full px-5 pt-2 "
                >
                    {/* Logo */}
                    <motion.img
                        src="/Logo Original.png"
                        alt="Logo"
                        className="w-[80px] h-[85px]"
                        whileHover={{ rotate: 360, transition: { duration: 1 } }}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex gap-6">
                        {headerButtons.map((button) => (
                            <motion.button
                                key={button}
                                onClick={() => handleNavClick(button)}
                                variants={navItemVariants}
                                whileTap={{ scale: 0.95 }} /* Tap effect instead of hover */
                                className="rounded-full hover:text-[#B69D74] hover:animate-pulse transition-colors duration-500 text-white text-xl active:text-[#B69D74] px-4"
                            >
                                {button}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </motion.header>
        </div>

        {/* Tablet and Mobile Header (Hamburger Menu for Both) */}
        <div className="md:block lg:hidden fixed top-0 w-screen z-50">
        <div className="flex items-center justify-between bg-black p-6 text-white shadow-md">
            {/* Logo */}
            <div className="px-5">
            <img src="/Logo Original.png" alt="Logo" className="w-20 h-20" />
            </div>

            {/* Hamburger Menu Button */}
            <div className="pr-5">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none text-white active:text-[#B69D74]"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>
        </div>

        {/* Tablet & Mobile Dropdown Menu */}
        <AnimatePresence>
        {menuOpen && (
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-0 w-full bg-black p-6 z-40 md:block lg:hidden"
            >
            <div className="flex flex-col justify-start items-start gap-4">
                {headerButtons.map((button) => (
                <button
                    key={button}
                    onClick={() => handleNavClick(button)}
                    className="text-white active:text-[#B69D74] text-lg"
                >
                    {button}
                </button>
                ))}
            </div>
            </motion.div>
        )}
        </AnimatePresence>
        </div>

      {/* Main Content */}
      <div>
        {/* Home Section */}
        <div id="home">
          <Home />
        </div>

        <TextForImages />
        <ScrollingImages />

        {/* Services Section (Areas) */}
        <div id="services">
          <Areas />
        </div>

        {/* About Section (AboutJuan and AboutClaudia) */}
        <div id="about">
          <AboutJuan />
          <AboutClaudia />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ContactUs />
        </div>

        {/* Additional Section */}
        <div id="email">
          <Email />
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div>
        <FloatingWhatsApp />
      </div>
    </div>
  );
}

export default App;
