import Link from "next/link";
import { motion } from "framer-motion";

const NavLink = ({ href, title, isMobile = false }) => {
  return (
    <motion.div
      whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="relative group"
    >
      <Link
        href={href}
        className={`
          block 
          ${isMobile ? 'py-3 px-4 text-lg' : 'py-2 px-3 sm:px-4'} 
          text-[#ADB7BE] 
          rounded-lg 
          hover:text-white 
          transition-colors 
          duration-300
          font-medium
          relative
          overflow-hidden
        `}
      >
        {title}
        {/* Animated underline - desktop only */}
        {!isMobile && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500"
            initial={{ scaleX: 0, originX: 0 }}
            groupHover={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </Link>
      
      {/* Mobile active indicator */}
      {isMobile && (
        <motion.div
          className="absolute left-0 top-1/2 h-1 w-1 rounded-full bg-primary-500"
          initial={{ opacity: 0, x: -10 }}
          groupHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default NavLink;