"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        e.target.reset();
      }
    } catch (error) {
      console.error("Message failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // SVG illustration as a React component (no file needed)
  const ContactIllustration = () => (
    <svg 
      viewBox="0 0 500 500" 
      className="w-full h-auto max-w-md mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M250,100 C350,50 450,150 400,250 C350,350 250,400 150,350 C50,300 100,200 150,150 C200,100 250,100 250,100 Z"
        fill="url(#gradient)"
        opacity="0.2"
      />
      <path
        d="M150,200 L150,300 L250,350 L350,300 L350,200 L250,150 L150,200 Z"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
      />
      <path
        d="M150,200 L250,250 L350,200 M150,250 L250,300 L350,250"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
      />
      <circle cx="250" cy="250" r="50" fill="none" stroke="#6366f1" strokeWidth="2" />
      <path
        d="M230,240 L250,260 L280,230"
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex justify-center md:justify-start">
              <ContactIllustration />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Let's Connect</h3>
              <p className="text-gray-400">
                I'm currently looking for new opportunities. My inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="flex space-x-4 justify-center md:justify-start">
              <motion.a
                href="https://github.com/navadeep-munjam"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="bg-[#1E1E1E] p-3 rounded-lg hover:bg-[#2E2E2E] transition-colors"
              >
                <Image src={GithubIcon} alt="GitHub" width={24} height={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/munjam-navadeep/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="bg-[#1E1E1E] p-3 rounded-lg hover:bg-[#2E2E2E] transition-colors"
              >
                <Image src={LinkedinIcon} alt="LinkedIn" width={24} height={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#181818] rounded-xl p-8 shadow-lg border border-[#33353F]"
          >
            {emailSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
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
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setEmailSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#33353F] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your-email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#33353F] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#33353F] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Hello Navadeep, I'd like to talk about..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    isLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
// "use client";
// import React, { useState } from "react";
// import GithubIcon from "../../../public/github-icon.svg";
// import LinkedinIcon from "../../../public/linkedin-icon.svg";
// import Link from "next/link";
// import Image from "next/image";

// const EmailSection = () => {
//   const [emailSubmitted, setEmailSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       email: e.target.email.value,
//       subject: e.target.subject.value,
//       message: e.target.message.value,
//     };

//     const response = await fetch("/api/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       console.log("Message sent.");
//       setEmailSubmitted(true);
//       e.target.reset();
//     } else {
//       console.error("Message failed.");
//     }
//   };

//   return (
//     <section id="contact" className="grid md:grid-cols-2 my-12 py-24 gap-4 relative">
//       <div className="z-10">
//         <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
//         <p className="text-[#ADB7BE] mb-4 max-w-md">
//           I&apos;m currently looking for new opportunities. My inbox is always open.
//           Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
//         </p>
//         <div className="socials flex flex-row gap-2">
//           <Link href="https://github.com/navadeep-munjam">
//             <Image src={GithubIcon} alt="Github Icon" />
//           </Link>
//           <Link href="https://www.linkedin.com/in/munjam-navadeep/">
//             <Image src={LinkedinIcon} alt="Linkedin Icon" />
//           </Link>
//         </div>
//       </div>
//       <div>
//         {emailSubmitted ? (
//           <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
//         ) : (
//           <form className="flex flex-col" onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">Your email</label>
//               <input name="email" type="email" id="email" required
//                 className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
//                 placeholder="your-email@example.com" />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">Subject</label>
//               <input name="subject" type="text" id="subject" required
//                 className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
//                 placeholder="Just saying hi" />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">Message</label>
//               <textarea name="message" id="message" required
//                 className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
//                 placeholder="Let's talk about..." />
//             </div>
//             <button type="submit"
//               className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full">
//               Send Message
//             </button>
//           </form>
//         )}
//       </div>
//     </section>
//   );
// };

// export default EmailSection;
