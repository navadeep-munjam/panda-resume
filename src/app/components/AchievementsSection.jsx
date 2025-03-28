"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiCalendar, FiCode } from "react-icons/fi";

const AnimatedNumbers = dynamic(
  () => import("react-animated-numbers"),
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Projects",
    value: "5",
    postfix: "+",
    icon: <FiCode className="text-primary-400 text-3xl mb-2" />,
    description: "Completed projects with modern technologies"
  },
  {
    prefix: "~",
    metric: "Users",
    value: "9",
    unit: "K",
    icon: <FiUsers className="text-primary-400 text-3xl mb-2" />,
    description: "Users impacted by my solutions"
  },
  {
    metric: "Awards",
    value: "5",
    icon: <FiAward className="text-primary-400 text-3xl mb-2" />,
    description: "Recognitions for excellence in development"
  },
  {
    metric: "Years",
    value: "2",
    postfix: "+",
    icon: <FiCalendar className="text-primary-400 text-3xl mb-2" />,
    description: "Of professional experience"
  },
];

const AchievementsSection = () => {
  return (
    <section className="relative py-12 px-4 sm:py-16 lg:py-20 xl:px-0 bg-gradient-to-b from-[#121212] to-[#181818]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Achievements</span>
          </h2>
          <p className="text-[#ADB7BE] max-w-2xl mx-auto">
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
                className="flex flex-col items-center text-center p-6 rounded-lg bg-[#202020] hover:bg-[#252525] transition-all duration-300 group"
              >
                <div className="mb-4">
                  {achievement.icon}
                </div>
                <div className="flex items-center justify-center">
                  {achievement.prefix && (
                    <span className="text-white text-3xl font-bold mr-1">
                      {achievement.prefix}
                    </span>
                  )}
                  <AnimatedNumbers
                    includeComma
                    animateToNumber={parseInt(achievement.value)}
                    locale="en-US"
                    className="text-white text-3xl font-bold"
                    configs={(_, i) => ({
                      mass: 1,
                      friction: 100,
                      tension: 140 * (i + 1),
                    })}
                  />
                  {achievement.unit && (
                    <span className="text-white text-3xl font-bold ml-1">
                      {achievement.unit}
                    </span>
                  )}
                  {achievement.postfix && (
                    <span className="text-white text-3xl font-bold">
                      {achievement.postfix}
                    </span>
                  )}
                </div>
                <h3 className="text-white text-xl font-semibold mt-2 mb-1">
                  {achievement.metric}
                </h3>
                <p className="text-[#ADB7BE] text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-secondary-600/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
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
