"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Multimodal Emotion Cause Pair Extraction",
    description: "A system that extracts emotion-cause pairs from text and images using deep learning.",
    image: "/multimodal_image.webp",
    tag: ["All", "Machine Learning"],
    gitUrl: "https://github.com/nagajas/NVDL",
    previewUrl: "/",
    technologies: ["Python", "PyTorch", "Transformers", "OpenCV"]
  },
  {
    id: 2,
    title: "Career Services Portal",
    description: "A sleek and modern career services portal with job listings, internships, and resume-building tools",
    image: "/ccps.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/navadeep-munjam/Centre-for-Career-Planning-and-Services-Portal",
    previewUrl: "/",
    technologies: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: 3,
    title: "Linux Shell",
    description: "A custom Linux shell that supports basic command execution, scripting, and process management",
    image: "/linuxshell.webp",
    tag: ["All", "Systems"],
    gitUrl: "https://github.com/navadeep-munjam/LINUX_SHELL",
    previewUrl: "/",
    technologies: ["C", "Linux", "Bash"]
  },
  {
    id: 4,
    title: "GO Compiler Design",
    description: "A web-based Go language compiler that allows users to write, compile, and execute Go code online",
    image: "/go_compiler.webp",
    tag: ["All", "Systems"],
    gitUrl: "https://github.com/navadeep-munjam/GO_COMPILER_DESIGN",
    previewUrl: "/",
    technologies: ["Go", "Lex/Yacc", "Compiler Design"]
  },
  {
    id: 5,
    title: "Online Chess",
    description: "A real-time multiplayer chess platform with matchmaking and game analysis",
    image: "/onlinechess.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/navadeep-munjam/Online_Chess",
    previewUrl: "/",
    technologies: ["JavaScript", "WebSockets", "Chess.js"]
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my work showcasing different technologies and problem-solving approaches
          </p>
        </motion.div>

        {/* Tags Filter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["All", "Web", "Machine Learning", "Systems"].map((tagName) => (
            <ProjectTag
              key={tagName}
              onClick={handleTagChange}
              name={tagName}
              isSelected={tag === tagName}
            />
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.ul
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
                tags={project.technologies}
              />
            </motion.li>
          ))}
        </motion.ul>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No projects found for this category. Check back later!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;