"use client"
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/navadeep-munjam",
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/munjam-navadeep/",
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      url: "https://x.com/navadeep_munjam",
      icon: <FaTwitter className="w-5 h-5" />,
    },
    {
      name: "Email",
      url: "mailto:your.munjamn@iitbhilai.ac.in",
      icon: <FaEnvelope className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative z-10 bg-[#121212] border-t border-[#33353F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-20"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <Link href="/" className="text-2xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                NAVADEEP
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Creating digital experiences that matter. Let's build something amazing together.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-white font-medium mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end"
          >
            <h3 className="text-white font-medium mb-4 text-lg">Connect With Me</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors bg-[#1E1E1E] p-3 rounded-full hover:bg-[#2E2E2E]"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-[#33353F] text-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Navadeep. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with Next.js, Tailwind CSS, and ❤️
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
//       <div className="container p-12 flex justify-between">
//         <span>PANDA</span>
//         <p className="text-slate-600">All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
