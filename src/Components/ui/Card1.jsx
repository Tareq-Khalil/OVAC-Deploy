import React from "react";
import { motion } from "framer-motion";

const Card = ({
  title,
  description,
  style,
  icon,
  borderColor = "#2caa7c", // Default border color
  className = "",
}) => {
  return (
    <motion.div
      style={{
        ...style,
        borderColor: borderColor,
        boxShadow: `0 0 20px ${borderColor}33`, // Subtle glow effect
      }}
      className={`relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl border-4 bg-gray-900/50 p-6 text-white backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_${borderColor}55] ${className}`}
    >
      <div className="flex items-center gap-3 text-3xl font-bold capitalize">
        {icon}
        {title}
      </div>
      <div className="text-lg font-medium text-gray-300">{description}</div>
    </motion.div>
  );
};

export default Card;
