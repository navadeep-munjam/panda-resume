"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, isOpen }) => {
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-sm"
        >
          <motion.ul
            className="flex flex-col items-center justify-center h-full space-y-8"
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {links.map((link, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full max-w-xs"
              >
                <NavLink 
                  href={link.path} 
                  title={link.title}
                  className="block text-2xl font-medium text-center py-4 px-8 text-white hover:text-primary-400 transition-colors border-b border-transparent hover:border-primary-400"
                />
              </motion.li>
            ))}
          </motion.ul>

          {/* Social links or additional menu items can be added here */}
          <motion.div 
            className="absolute bottom-10 left-0 right-0 flex justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Add your social icons here if needed */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;