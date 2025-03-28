"use client";
import React, { useTransition, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#1E1E1E] p-4 rounded-lg border border-[#33353F] hover:border-primary-500 transition-all"
        >
          <h3 className="text-primary-400 font-medium mb-2">Languages</h3>
          <ul className="space-y-1">
            {["C", "C++", "Python", "JavaScript", "TypeScript", "Go"].map((lang, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-gray-300"
              >
                {lang}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#1E1E1E] p-4 rounded-lg border border-[#33353F] hover:border-secondary-500 transition-all"
        >
          <h3 className="text-secondary-400 font-medium mb-2">Web Development</h3>
          <ul className="space-y-1">
            {["HTML", "CSS", "Tailwind", "React", "Next.js", "Node.js", "Express"].map((tech, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-gray-300"
              >
                {tech}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#1E1E1E] p-4 rounded-lg border border-[#33353F] hover:border-primary-500 transition-all"
        >
          <h3 className="text-primary-400 font-medium mb-2">DevOps & Cloud</h3>
          <ul className="space-y-1">
            {["Docker", "Kubernetes", "CI/CD", "AWS", "GCP", "Terraform"].map((tool, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-gray-300"
              >
                {tool}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#1E1E1E] p-4 rounded-lg border border-[#33353F] hover:border-secondary-500 transition-all"
        >
          <h3 className="text-secondary-400 font-medium mb-2">Data Science</h3>
          <ul className="space-y-1">
            {["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "PyTorch"].map((lib, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-gray-300"
              >
                {lib}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1E1E1E] p-6 rounded-lg border border-[#33353F] hover:border-primary-500 transition-all"
        >
          <div className="flex items-start">
            <div className="bg-primary-500/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Indian Institute of Technology Bhilai</h3>
              <p className="text-gray-400 mt-1">Bachelor of Technology</p>
              <p className="text-gray-500 text-sm mt-2">2022 - Present</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1E1E1E] p-6 rounded-lg border border-[#33353F] hover:border-secondary-500 transition-all"
        >
          <div className="flex items-start">
            <div className="bg-secondary-500/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Sainik School & Junior College, Telangana</h3>
              <p className="text-gray-400 mt-1">High School</p>
              <p className="text-gray-500 text-sm mt-2">2020 - 2022</p>
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <div className="space-y-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-[#1E1E1E] p-6 rounded-lg border border-[#33353F] hover:border-primary-500 transition-all"
        >
          <div className="flex items-start">
            <div className="bg-primary-500/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Google Professional Cloud Developer</h3>
              <p className="text-gray-400 mt-1">Google Cloud</p>
              <a href="#" className="text-primary-400 hover:text-primary-300 text-sm mt-2 inline-block">View Credential</a>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-[#1E1E1E] p-6 rounded-lg border border-[#33353F] hover:border-secondary-500 transition-all"
        >
          <div className="flex items-start">
            <div className="bg-secondary-500/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">IIT Guwahati Web Developer</h3>
              <p className="text-gray-400 mt-1">Indian Institute of Technology Guwahati</p>
              <a href="#" className="text-secondary-400 hover:text-secondary-300 text-sm mt-2 inline-block">View Credential</a>
            </div>
          </div>
        </motion.div>
      </div>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-2xl opacity-20 blur-xl"></div>
            <div className="relative bg-[#181818] rounded-2xl overflow-hidden border border-[#33353F]">
              <Image 
                src="/images/about-image.png" 
                width={600} 
                height={600}
                alt="Navadeep's profile"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Me</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              I am a Full Stack Web Developer and DevOps Engineer with a passion for creating 
              interactive and responsive web applications. With expertise in modern web 
              technologies and cloud infrastructure, I build scalable solutions that deliver 
              exceptional user experiences.
            </p>

            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {TAB_DATA.map((item) => (
                  <TabButton
                    key={item.id}
                    selectTab={() => handleTabChange(item.id)}
                    active={tab === item.id}
                  >
                    {item.title}
                  </TabButton>
                ))}
              </div>
            </div>

            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {TAB_DATA.find((t) => t.id === tab).content}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
