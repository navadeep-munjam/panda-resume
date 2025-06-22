"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react"; // Lucide icons

const socialLinks = [
  {
    href: "https://github.com/navadeep-m",
    icon: <Github size={24} />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/navadeep-m",
    icon: <Linkedin size={24} />,
    label: "LinkedIn",
  },
  {
    href: "mailto:munjamnavadeep@gmail.com",
    icon: <Mail size={24} />,
    label: "Email",
  },
];

const neumorph =
  "bg-[#23272f] shadow-[8px_8px_24px_#181a20,-8px_-8px_24px_#2c313a]";

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-500 to-secondary-600 drop-shadow-lg">
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
            Crafting seamless digital experiences with clean code and innovative
            design. Passionate about building efficient systems that users love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/#contact"
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 text-white text-center ${neumorph} hover:scale-105 hover:shadow-[0_0_32px_#a78bfa55]`}
            >
              Get In Touch
            </Link>
            <Link
              href="/NAVADEEP_SDE.pdf"
              className={`px-8 py-3 rounded-full border border-primary-500 text-primary-100 font-medium transition-all duration-300 text-center ${neumorph} hover:scale-105 hover:shadow-[0_0_32px_#38bdf855]`}
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
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-3 rounded-full ${neumorph} hover:bg-primary-500/20 transition-all duration-200 hover:scale-110`}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-4 hidden sm:block"
        >
          <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden">
            <Image
              src="/nava.jpg"
              alt="Hero Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;