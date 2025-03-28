"use client";
import React from "react";
import { motion } from "framer-motion";

const TabButton = ({ active, selectTab, children }) => {
  const variants = {
    default: { 
      width: 0,
      opacity: 0,
      x: -10
    },
    active: { 
      width: "100%",
      opacity: 1,
      x: 0
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.button
      onClick={selectTab}
      className="relative px-1 py-2 focus:outline-none"
      whileHover="hover"
      whileTap="tap"
      initial={false}
    >
      <motion.p 
        className={`text-lg font-medium ${
          active ? "text-white" : "text-[#ADB7BE] hover:text-white"
        }`}
        animate={{
          color: active ? "#ffffff" : "#ADB7BE"
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.p>
      
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-full"
        variants={variants}
        animate={active ? "active" : "default"}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      />
    </motion.button>
  );
};

export default TabButton;