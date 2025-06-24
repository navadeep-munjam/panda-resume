"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        setFormData({ email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Message failed:", error);

    } finally {
      setIsLoading(false);
    }
  };

  const ContactIllustration = () => (
    <motion.svg
      viewBox="0 0 500 500"
      className="w-full h-auto max-w-xs md:max-w-sm mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d="M250,100 C350,50 450,150 400,250 C350,350 250,400 150,350 C50,300 100,200 150,150 C200,100 250,100 250,100 Z"
        fill="url(#gradient)"
        opacity="0.2"
        animate={{
          d: [
            "M250,100 C350,50 450,150 400,250 C350,350 250,400 150,350 C50,300 100,200 150,150 C200,100 250,100 250,100 Z",
            "M250,110 C340,60 440,140 390,240 C340,340 250,390 160,340 C60,290 110,190 160,140 C210,110 250,110 250,110 Z",
            "M250,100 C350,50 450,150 400,250 C350,350 250,400 150,350 C50,300 100,200 150,150 C200,100 250,100 250,100 Z"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.path
        d="M150,200 L150,300 L250,350 L350,300 L350,200 L250,150 L150,200 Z"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      <motion.path
        d="M150,200 L250,250 L350,200 M150,250 L250,300 L350,250"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      <motion.circle
        cx="250"
        cy="250"
        r="50"
        fill="none"
        stroke="#6366f1"
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      />

      <motion.path
        d="M230,240 L250,260 L280,230"
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 2 }}
      />
    </motion.svg>
  );

  return (
    <section id="contact" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-primary-500/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-secondary-600/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-500/5 to-secondary-600/5" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-500 to-primary-600 animate-pulse">Touch</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            "I'm currently looking for new opportunities. My inbox is always open."
          </motion.p>
        </motion.div>

        {/* Enhanced Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Enhanced Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 order-2 md:order-1"
          >
            <div className="flex justify-center md:justify-start">
              <ContactIllustration />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center md:text-left">
                Let's Connect
              </h3>
              <p className="text-gray-400 text-sm sm:text-base text-center md:text-left">
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="flex space-x-3 sm:space-x-4 justify-center md:justify-start">
              <motion.a
                href="https://github.com/navadeep-munjam"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1E1E1E] p-2 sm:p-3 rounded-lg hover:bg-[#2E2E2E] transition-colors"
                aria-label="GitHub profile"
              >
                <Image
                  src={GithubIcon}
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/munjam-navadeep/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1E1E1E] p-2 sm:p-3 rounded-lg hover:bg-[#2E2E2E] transition-colors"
                aria-label="LinkedIn profile"
              >
                <Image
                  src={LinkedinIcon}
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#181818] rounded-xl p-6 sm:p-8 shadow-lg border border-[#33353F] order-1 md:order-2"
          >
            {emailSubmitted ? (
              <div className="text-center py-6 sm:py-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 sm:h-8 sm:w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <motion.button
                  onClick={() => setEmailSubmitted(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 sm:mt-6 px-5 py-2 sm:px-6 sm:py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition-colors text-sm sm:text-base"
                >
                  Send Another Message
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1E1E1E] border border-[#33353F] rounded-lg text-sm sm:text-base text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your-email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1E1E1E] border border-[#33353F] rounded-lg text-sm sm:text-base text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1E1E1E] border border-[#33353F] rounded-lg text-sm sm:text-base text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Hello Navadeep, I'd like to talk about..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors text-sm sm:text-base ${isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white"
                    }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;