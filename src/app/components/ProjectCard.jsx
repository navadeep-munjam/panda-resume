"use client";
import { motion } from "framer-motion";
import { CodeBracketIcon, EyeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProjectCard({ imgUrl, title, description, gitUrl, previewUrl, tags = [] }) {
  // Determine which URL to use for the "View Project" button
  const viewProjectUrl = previewUrl && previewUrl !== '/' ? previewUrl : gitUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-[#181818] border border-[#33353F] hover:border-primary-500/30 w-full h-full flex flex-col"
    >
      {/* Image Container with Hover Overlay */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden flex-shrink-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imgUrl})` }}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        />
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-4 sm:p-6"
        >
          <motion.div
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
            className="w-full"
          >
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-primary-500/20 text-primary-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 sm:space-x-3">
                {gitUrl && (
                  <motion.a
                    href={gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#1E1E1E] border border-[#33353F] hover:border-primary-500 hover:bg-primary-500/10 transition-all"
                    aria-label="View code on GitHub"
                  >
                    <CodeBracketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ADB7BE] group-hover:text-primary-400" />
                  </motion.a>
                )}
                {previewUrl && previewUrl !== '/' && (
                  <motion.a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#1E1E1E] border border-[#33353F] hover:border-secondary-500 hover:bg-secondary-500/10 transition-all"
                    aria-label="View live preview"
                  >
                    <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ADB7BE] group-hover:text-secondary-400" />
                  </motion.a>
                )}
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="hidden sm:flex text-xs text-gray-400 items-center"
              >
                Click to view project
                <ArrowTopRightOnSquareIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <motion.h3 
          className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors"
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <p className="text-[#ADB7BE] text-sm sm:text-base mb-4 line-clamp-3">{description}</p>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-auto inline-block"
        >
          <a 
            href={viewProjectUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center"
            aria-label={`View ${title} project`}
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
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { CodeBracketIcon, EyeIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, tags = [] }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true, margin: "-50px" }}
//       whileHover={{ y: -5 }}
//       className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-[#181818] border border-[#33353F] hover:border-primary-500/30 w-full h-full flex flex-col"
//     >
//       {/* Image Container with Hover Overlay */}
//       <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden flex-shrink-0">
//         <motion.div
//           className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
//           style={{ backgroundImage: `url(${imgUrl})` }}
//           initial={{ scale: 1 }}
//           whileHover={{ scale: 1.05 }}
//         />
        
//         {/* Overlay */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 1 }}
//           className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-4 sm:p-6"
//         >
//           <motion.div
//             initial={{ y: 20 }}
//             whileHover={{ y: 0 }}
//             className="w-full"
//           >
//             {/* Tags */}
//             {tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
//                 {tags.map((tag, index) => (
//                   <motion.span
//                     key={index}
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     whileInView={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="px-2 py-1 text-xs font-medium rounded-full bg-primary-500/20 text-primary-300"
//                   >
//                     {tag}
//                   </motion.span>
//                 ))}
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-between items-center">
//               <div className="flex space-x-2 sm:space-x-3">
//                 {gitUrl && (
//                   <motion.a
//                     href={gitUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#1E1E1E] border border-[#33353F] hover:border-primary-500 hover:bg-primary-500/10 transition-all"
//                     aria-label="View code on GitHub"
//                   >
//                     <CodeBracketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ADB7BE] group-hover:text-primary-400" />
//                   </motion.a>
//                 )}
//                 {previewUrl && (
//                   <motion.a
//                     href={previewUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#1E1E1E] border border-[#33353F] hover:border-secondary-500 hover:bg-secondary-500/10 transition-all"
//                     aria-label="View live preview"
//                   >
//                     <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ADB7BE] group-hover:text-secondary-400" />
//                   </motion.a>
//                 )}
//               </div>
              
//               <motion.div
//                 initial={{ opacity: 0, x: 10 }}
//                 whileHover={{ opacity: 1, x: 0 }}
//                 className="hidden sm:flex text-xs text-gray-400 items-center"
//               >
//                 Click to view details
//                 <ArrowTopRightOnSquareIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Content */}
//       <div className="p-4 sm:p-6 flex-grow flex flex-col">
//         <motion.h3 
//           className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors"
//           whileHover={{ x: 5 }}
//         >
//           {title}
//         </motion.h3>
//         <p className="text-[#ADB7BE] text-sm sm:text-base mb-4 line-clamp-3">{description}</p>
        
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="mt-auto inline-block"
//         >
//           <Link 
//             href={previewUrl || gitUrl || "#"} 
//             className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center"
//             aria-label={`View ${title} project`}
//           >
//             View Project
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 ml-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               />
//             </svg>
//           </Link>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProjectCard;