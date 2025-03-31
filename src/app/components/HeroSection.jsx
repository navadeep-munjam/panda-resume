"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-20 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <div className="mb-6">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-primary-400 font-mono text-lg mb-2"
            >
  Hello, I&apos;m{" "}
  </motion.p>
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-500 to-secondary-600">
                Munjam Navadeep
              </span>
            </h1>
            <div className="min-h-[80px] sm:min-h-[100px] lg:min-h-[120px]">
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1500,
                  "DevOps Engineer",
                  1500,
                  "UI/UX Designer",
                  1500,
                  "Tech Enthusiast",
                  1500,
                ]}
                wrapper="span"
                speed={40}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300"
                repeat={Infinity}
              />
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[#ADB7BE] text-lg sm:text-xl mb-8 max-w-lg"
          >
            Crafting seamless digital experiences with clean code and innovative design. 
            Passionate about building efficient systems that users love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/#contact"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/30 text-center"
            >
              Get In Touch
            </Link>
            <Link
              href="/panda.pdf"
              className="px-8 py-3 rounded-full border border-primary-500 text-primary-100 hover:bg-primary-500/10 font-medium transition-all duration-300 text-center"
            >
  Download Resume 
             </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 flex gap-4 justify-center sm:justify-start"
          >
            {/* Add your social icons here */}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-4 place-self-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 blur-xl opacity-30 animate-pulse"></div>
            <div className="relative rounded-full bg-gradient-to-br from-[#181818] to-[#282828] p-1 w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] overflow-hidden shadow-2xl">
              <Image
                src="/nava.jpg"
                alt="Munjam Navadeep"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 35%" }}
                width={380}
                height={380}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;