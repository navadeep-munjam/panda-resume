

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiCalendar, FiCode } from "react-icons/fi";

const NumberAnimation = ({ value, size = 72, duration = 1.5 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const target = parseInt(value);
    const increment = target / (duration * 60); // 60fps
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCurrentValue(Math.floor(current));
    }, 1000/60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <svg 
      width={size} 
      height={size * 1.2} 
      viewBox={`0 0 ${size} ${size * 1.2}`}
      className="inline-block"
    >
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize={size * 0.8}
      >
        {currentValue}
      </text>
    </svg>
  );
};

const achievementsList = [
  {
    metric: "Projects",
    value: "5",
    // postfix: "+",
    icon: <FiCode className="text-primary-400 text-4xl mb-4" />,
    description: "Completed projects with modern technologies"
  },
  {
    // prefix: "~",
    metric: "Users",
    value: "9",
    // unit: "K",
    icon: <FiUsers className="text-primary-400 text-4xl mb-4" />,
    description: "Users impacted by my solutions"
  },
  {
    metric: "Awards",
    value: "5",
    icon: <FiAward className="text-primary-400 text-4xl mb-4" />,
    description: "Recognitions for excellence in development"
  },
  {
    metric: "Years",
    value: "2",
    // postfix: "+",
    icon: <FiCalendar className="text-primary-400 text-4xl mb-4" />,
    description: "Of professional experience"
  },
];

const AchievementsSection = () => {
  return (
    <section className="relative py-16 px-4 sm:py-20 lg:py-24 xl:px-0 bg-gradient-to-b from-[#121212] to-[#181818]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Achievements</span>
          </h2>
          <p className="text-[#ADB7BE] text-lg max-w-2xl mx-auto">
            Quantifying my journey through measurable milestones and successful outcomes
          </p>
        </motion.div>

        <div className="bg-[#181818] border border-[#33353F] rounded-xl p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievementsList.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 rounded-xl bg-[#202020] hover:bg-[#252525] transition-all duration-300 group hover:shadow-lg hover:shadow-primary-500/10"
              >
                <div className="mb-6">
                  {achievement.icon}
                </div>
                <div className="flex items-center justify-center h-32">
                  {achievement.prefix && (
                    <span className="text-white text-5xl font-bold mr-1">
                      {achievement.prefix}
                    </span>
                  )}
                  <div className="relative">
                    <NumberAnimation 
                      value={achievement.value} 
                      size={80} // Adjust this to change number size
                    />
                  </div>
                  {achievement.unit && (
                    <span className="text-white text-5xl font-bold ml-1">
                      {achievement.unit}
                    </span>
                  )}
                  {achievement.postfix && (
                    <span className="text-white text-5xl font-bold">
                      {achievement.postfix}
                    </span>
                  )}
                </div>
                <h3 className="text-white text-2xl font-semibold mt-4 mb-2">
                  {achievement.metric}
                </h3>
                <p className="text-[#ADB7BE] text-base">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-secondary-600/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
// "use client";
// import React from "react";
// import dynamic from "next/dynamic";
// import { motion } from "framer-motion";
// import { FiAward, FiUsers, FiCalendar, FiCode } from "react-icons/fi";

// const AnimatedNumbers = dynamic(
//   () => import("react-animated-numbers"),
//   { ssr: false }
// );

// const achievementsList = [
//   {
//     metric: "Projects",
//     value: "5",
//     postfix: "+",
//     icon: <FiCode className="text-primary-400 text-4xl mb-4" />,
//     description: "Completed projects with modern technologies"
//   },
//   {
//     prefix: "~",
//     metric: "Users",
//     value: "9",
//     unit: "K",
//     icon: <FiUsers className="text-primary-400 text-4xl mb-4" />,
//     description: "Users impacted by my solutions"
//   },
//   {
//     metric: "Awards",
//     value: "5",
//     icon: <FiAward className="text-primary-400 text-4xl mb-4" />,
//     description: "Recognitions for excellence in development"
//   },
//   {
//     metric: "Years",
//     value: "2",
//     postfix: "+",
//     icon: <FiCalendar className="text-primary-400 text-4xl mb-4" />,
//     description: "Of professional experience"
//   },
// ];

// const AchievementsSection = () => {
//   return (
//     <section className="relative py-16 px-4 sm:py-20 lg:py-24 xl:px-0 bg-gradient-to-b from-[#121212] to-[#181818]">
//       <div className="max-w-7xl mx-auto">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
//             My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Achievements</span>
//           </h2>
//           <p className="text-[#ADB7BE] text-lg max-w-2xl mx-auto">
//             Quantifying my journey through measurable milestones and successful outcomes
//           </p>
//         </motion.div>

//         <div className="bg-[#181818] border border-[#33353F] rounded-xl p-8 sm:p-12 shadow-lg">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {achievementsList.map((achievement, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="flex flex-col items-center text-center p-8 rounded-xl bg-[#202020] hover:bg-[#252525] transition-all duration-300 group hover:shadow-lg hover:shadow-primary-500/10"
//               >
//                 <div className="mb-6">
//                   {achievement.icon}
//                 </div>
//                 <div className="flex items-baseline justify-center h-24">
//                   <div className="relative">
//                     {/* Large static number for sizing */}
//                     <span className="text-white text-7xl sm:text-8xl font-bold opacity-0">
//                       {achievement.value}
//                     </span>
//                     {/* Actual animated number positioned absolutely */}
//                     <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//                       {achievement.prefix && (
//                         <span className="text-white text-4xl font-bold mr-1">
//                           {achievement.prefix}
//                         </span>
//                       )}
//                       <AnimatedNumbers
//                         includeComma
//                         animateToNumber={parseInt(achievement.value)}
//                         locale="en-US"
//                         className="text-white text-4xl font-bold"
//                         configs={(_, i) => ({
//                           mass: 1,
//                           friction: 100,
//                           tension: 140 * (i + 1),
//                         })}
//                       />
//                       {achievement.unit && (
//                         <span className="text-white text-4xl font-bold ml-1">
//                           {achievement.unit}
//                         </span>
//                       )}
//                       {achievement.postfix && (
//                         <span className="text-white text-4xl font-bold">
//                           {achievement.postfix}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="text-white text-2xl font-semibold mt-4 mb-2">
//                   {achievement.metric}
//                 </h3>
//                 <p className="text-[#ADB7BE] text-base">
//                   {achievement.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Additional decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
//           <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl"></div>
//           <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-secondary-600/10 blur-3xl"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AchievementsSection;
// "use client";
// import React from "react";
// import dynamic from "next/dynamic";
// import { motion } from "framer-motion";
// import { FiAward, FiUsers, FiCalendar, FiCode } from "react-icons/fi";

// const AnimatedNumbers = dynamic(
//   () => import("react-animated-numbers"),
//   { ssr: false }
// );

// const achievementsList = [
//   {
//     metric: "Projects",
//     value: "5 ",
//     postfix: "+",
//     icon: <FiCode className="text-primary-400 text-4xl mb-4" />,
//     description: "Completed projects with modern technologies"
//   },
//   {
//     prefix: "~",
//     metric: "Users",
//     value: "9",
//     unit: "K",
//     icon: <FiUsers className="text-primary-400 text-4xl mb-4" />,
//     description: "Users impacted by my solutions"
//   },
//   {
//     metric: "Awards",
//     value: "5",
//     icon: <FiAward className="text-primary-400 text-4xl mb-4" />,
//     description: "Recognitions for excellence in development"
//   },
//   {
//     metric: "Years",
//     value: "2",
//     postfix: "+",
//     icon: <FiCalendar className="text-primary-400 text-4xl mb-4" />,
//     description: "Of professional experience"
//   },
// ];

// const AchievementsSection = () => {
//   return (
//     <section className="relative py-16 px-4 sm:py-20 lg:py-24 xl:px-0 bg-gradient-to-b from-[#121212] to-[#181818]">
//       <div className="max-w-7xl mx-auto">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
//             My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Achievements</span>
//           </h2>
//           <p className="text-[#ADB7BE] text-lg max-w-2xl mx-auto">
//             Quantifying my journey through measurable milestones and successful outcomes
//           </p>
//         </motion.div>

//         <div className="bg-[#181818] border border-[#33353F] rounded-xl p-8 sm:p-12 shadow-lg">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {achievementsList.map((achievement, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="flex flex-col items-center text-center p-8 rounded-xl bg-[#202020] hover:bg-[#252525] transition-all duration-300 group hover:shadow-lg hover:shadow-primary-500/10"
//               >
//                 <div className="mb-6">
//                   {achievement.icon}
//                 </div>
//                 <div className="flex items-baseline justify-center">
//                   {achievement.prefix && (
//                     <span className="text-white text-4xl font-bold mr-1">
//                       {achievement.prefix}
//                     </span>
//                   )}
//                   <AnimatedNumbers
//                     includeComma
//                     animateToNumber={parseInt(achievement.value)}
//                     locale="en-US"
//                     className="text-white text-5xl sm:text-6xl font-bold"
//                     configs={(_, i) => ({
//                       mass: 1,
//                       friction: 100,
//                       tension: 140 * (i + 1),
//                     })}
//                   />
//                   {achievement.unit && (
//                     <span className="text-white text-4xl font-bold ml-1">
//                       {achievement.unit}
//                     </span>
//                   )}
//                   {achievement.postfix && (
//                     <span className="text-white text-4xl font-bold">
//                       {achievement.postfix}
//                     </span>
//                   )}
//                 </div>
//                 <h3 className="text-white text-2xl font-semibold mt-4 mb-2">
//                   {achievement.metric}
//                 </h3>
//                 <p className="text-[#ADB7BE] text-base">
//                   {achievement.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Additional decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
//           <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 blur-3xl"></div>
//           <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-secondary-600/10 blur-3xl"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AchievementsSection;
// "use client";
// import React from "react";
// import dynamic from "next/dynamic";

// const AnimatedNumbers = dynamic(
//   () => {
//     return import("react-animated-numbers");
//   },
//   { ssr: false }
// );

// const achievementsList = [
//   {
//     metric: "Projects",
//     value: "5",
//     postfix: "+",
//   },
//   {
//     prefix: "~",
//     metric: "Users",
//     value: "9",
//   },
//   {
//     metric: "Awards",
//     value: "5",
//   },
//   {
//     metric: "Years",
//     value: "2",
//   },
// ];

// const AchievementsSection = () => {
//   return (
//     <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
//       <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
//         {achievementsList.map((achievement, index) => {
//           return (
//             <div
//               key={index}
//               className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
//             >
//               <h2 className="text-white text-4xl font-bold flex flex-row">
//                 {achievement.prefix}
//                 <AnimatedNumbers
//                   includeComma
//                   animateToNumber={parseInt(achievement.value)}
//                   locale="en-US"
//                   className="text-white text-4xl font-bold"
//                   configs={(_, index) => {
//                     return {
//                       mass: 1,
//                       friction: 100,
//                       tensions: 140 * (index + 1),
//                     };
//                   }}
//                 />
//                 {achievement.postfix}
//               </h2>
//               <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AchievementsSection;
