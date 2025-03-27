"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-4">
    <li><strong>Languages:</strong> C, C++, Python, JavaScript, TypeScript</li>
    <li><strong>Markup/Styling:</strong> HTML, CSS, Tailwind CSS</li>
    <li><strong>Developer Tools:</strong> Git, GitHub, Docker, Kubernetes, Postman, VS Code</li>
    <li><strong>Frameworks & Libraries:</strong> Next.js, React, Node.js, Express, Sequelize</li>
    <li><strong>Databases:</strong> MongoDB (Mongoose), PostgreSQL</li>
    <li><strong>Data Analysis & Visualization:</strong> NumPy, Pandas, Seaborn, Matplotlib</li>
    <li><strong>Coursework:</strong> Web Development, Data Structures & Algorithms, Operating Systems, Compiler Design, Machine Learning, NLP</li>
    <li><strong>Areas of Interest:</strong> DevOps, Web Development, Machine Learning</li>
</ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Sainik School & Junior College, Telangana</li>
        <li>Indian institute of technology Bhilai</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>IIT guwahati web deveopler</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
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
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <Image 
  src="/images/about-image.png" 
  width={500} 
  height={500}
  alt="Navadeep's profile"
  className="rounded-lg"
/>       <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          I am a Full Stack Web Developer and DevOps Engineer with a passion
           for creating interactive and responsive web applications. I have
            experience working with JavaScript, React, Redux, Node.js, Express, 
            PostgreSQL, Sequelize, HTML, CSS, and Git. Additionally, I have expertise
             in DevOps technologies such as Docker, Kubernetes, CI/CD pipelines, 
             and cloud deployment. I am a quick learner, always looking to expand 
             my knowledge and skill set. As a team player, I thrive in collaborative 
             environments and am excited to work with others to build and deploy amazing applications efficiently.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
