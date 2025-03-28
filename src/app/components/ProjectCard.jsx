"use client";
import React from "react";
import { motion } from "framer-motion";
import { CodeBracketIcon, EyeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, tags = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#181818] border border-[#33353F] hover:border-primary-500/30"
    >
      {/* Image Container with Hover Overlay */}
      <div className="relative h-60 md:h-72 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imgUrl})` }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        />
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent flex items-end p-6"
        >
          <motion.div
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
            className="w-full"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/20 text-primary-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                {gitUrl && (
                  <motion.a
                    href={gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-[#1E1E1E] border border-[#33353F] hover:border-primary-500 hover:bg-primary-500/10 transition-all"
                  >
                    <CodeBracketIcon className="h-6 w-6 text-[#ADB7BE] group-hover:text-primary-400" />
                  </motion.a>
                )}
                {previewUrl && (
                  <motion.a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-[#1E1E1E] border border-[#33353F] hover:border-secondary-500 hover:bg-secondary-500/10 transition-all"
                  >
                    <EyeIcon className="h-6 w-6 text-[#ADB7BE] group-hover:text-secondary-400" />
                  </motion.a>
                )}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-xs text-gray-400 flex items-center"
              >
                Click to view details
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-[#ADB7BE] mb-4">{description}</p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-block"
        >
          <Link 
            href={previewUrl || gitUrl || "#"} 
            className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center"
          >
            View Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
// import React from "react";
// import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
//   return (
//     <div>
//       <div
//         className="h-52 md:h-72 rounded-t-xl relative group"
//         style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
//       >
//         <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
//           <Link
//             href={gitUrl}
//             className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
//           >
//             <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
//           </Link>
//           <Link
//             href={previewUrl}
//             className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
//           >
//             <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white" />
//           </Link>
//         </div>
//       </div>
//       <div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
//         <h5 className="text-xl font-semibold mb-2">{title}</h5>
//         <p className="text-[#ADB7BE]">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;
