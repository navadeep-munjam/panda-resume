
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiCalendar, FiCode } from "react-icons/fi";

const NumberAnimation = ({ value, size = 48, duration = 1.5 }) => {
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
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span
      className="text-white font-bold inline-block"
      style={{
        fontSize: `${size}px`,
        lineHeight: `${size * 1.2}px`,
        minWidth: `${size * 1.5}px`,
        textAlign: 'center'
      }}
    >
      {currentValue}
    </span>
  );
};

const achievementsList = [
  {
    metric: "Projects",
    value: "5",
    icon: <FiCode className="text-primary-400" />,
    description: "Completed projects with modern technologies"
  },
  {
    metric: "Users",
    value: "9",
    icon: <FiUsers className="text-primary-400" />,
    description: "Users impacted by my solutions"
  },
  {
    metric: "Awards",
    value: "5",
    icon: <FiAward className="text-primary-400" />,
    description: "Recognitions for excellence"
  },
  {
    metric: "Years",
    value: "2",
    icon: <FiCalendar className="text-primary-400" />,
    description: "Of professional experience"
  },
];

const AchievementsSection = () => {
  return (
    <section className="relative py-12 px-4 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#121212] to-[#181818]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-primary-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-secondary-600/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">Achievements</span>
          </h2>
          <p className="text-[#ADB7BE] text-base sm:text-lg max-w-2xl mx-auto">
            Quantifying my journey through measurable milestones
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="bg-[#181818] border border-[#33353F] rounded-xl p-6 sm:p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
            {achievementsList.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-[#202020] hover:bg-[#252525] transition-all duration-300 group"
              >
                {/* Icon */}
                <motion.div
                  className="mb-3 sm:mb-4 p-3 rounded-full bg-[#1E1E1E] group-hover:bg-primary-500/10 group-hover:shadow-primary-500/20 group-hover:shadow-sm transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  {React.cloneElement(achievement.icon, {
                    className: "text-primary-400 text-2xl sm:text-3xl md:text-4xl"
                  })}
                </motion.div>

                {/* Animated Number */}
                <div className="flex items-center justify-center h-20 sm:h-24 md:h-32">
                  <NumberAnimation
                    value={achievement.value}
                    size={48} // Base size for mobile
                    className="text-5xl sm:text-6xl"
                  />
                </div>

                {/* Text Content */}
                <div className="mt-2 sm:mt-4">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">
                    {achievement.metric}
                  </h3>
                  <p className="text-[#ADB7BE] text-xs sm:text-sm md:text-base">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
