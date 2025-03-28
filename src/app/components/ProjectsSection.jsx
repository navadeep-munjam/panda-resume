"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Multimodal emotion cause pair extraction",
    description: " A system that extracts emotion-cause pairs from text and images using deep learning.",
    image: "/multimodal_image.webp",  
    tag: ["All", "Web"],
    gitUrl: "https://github.com/nagajas/NVDL",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Centre-for-Career-Planning-and-Services-Portal",
    description: "A sleek and modern career services portal with job listings, internships, and resume-building tools",
    image: "/ccps.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/navadeep-munjam/Centre-for-Career-Planning-and-Services-Portal",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Linux Shell",
    description: "A custom Linux shell that supports basic command execution, scripting, and process management",
    image: "/linuxshell.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/navadeep-munjam/LINUX_SHELL",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "GO Compiler Design",
    description: "A web-based Go language compiler that allows users to write, compile, and execute Go code online.",
  // image: "/go_compiler.webp",  // Corrected path
    image:"/go_compiler.webp",
    tag: ["All", "Operating System"],
    gitUrl: "https://github.com/navadeep-munjam/GO_COMPILER_DESIGN",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Online Chess",
    description: "A real-time multiplayer chess platform with matchmaking and game analysis.",
    image: "/onlinechess.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/navadeep-munjam/Online_Chess",
    previewUrl: "/",
  },
  // {
  //   id: 6,
  //   title: "Full-stack Roadmap",
  //   description: "Project 5 description",
  //   image: "/images/projects/6.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
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

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Machine Learning"
          isSelected={tag === "Macine Learning"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
