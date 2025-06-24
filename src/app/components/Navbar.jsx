"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { motion, AnimatePresence } from "framer-motion";

// Nav links without Pricing, Login, or Get Started
const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#181C23] shadow-xl"
          : "bg-[#181C23]/80 backdrop-blur-lg"
      }`}
      style={{
        borderBottom: scrolled
          ? "1.5px solid rgba(255,255,255,0.08)"
          : "1.5px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-600 shadow-lg group-hover:scale-105 transition-transform duration-200">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="url(#logo-gradient)" />
                  <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7F5AF0" />
                      <stop offset="1" stopColor="#2CB67D" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary-400 to-secondary-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                NAVADEEP
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <ul className="flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 * index }}
                >
                  <NavLink
                    href={link.path}
                    title={link.title}
                    className="relative group px-4 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-white transition-colors duration-200"
                  >
                    <span className="relative z-10">
                      {link.title}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-primary-400 to-secondary-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200"
              aria-expanded={navbarOpen}
            >
              <span className="sr-only">Open main menu</span>
              {navbarOpen ? (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <MenuOverlay links={navLinks} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;