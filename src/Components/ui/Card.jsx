import React from "react";
import { motion } from "framer-motion";

const Card = ({
  title,
  description,
  style,
  icon,
  borderColor = "#2caa7c", // Default border color
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}) => {
  return (
    <motion.div
      style={{
        ...style,
        borderColor: borderColor,
        boxShadow: `0 0 20px ${borderColor}33`, // Subtle glow effect
      }}
      className={`relative flex w-full flex-col gap-2 overflow-hidden rounded-2xl border-4 p-4 text-white backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      {/* Icon above title */}
      <div className="flex justify-center items-center text-4xl mb-1">
        {icon}
      </div>
      
      {/* Title below icon */}
      <div className={`text-xl font-bold capitalize text-center ${titleClassName}`}>
        {title}
      </div>
      
      {/* Description */}
      <div className={`text-lg font-medium text-center ${descriptionClassName || 'text-gray-300'}`}>
        {description}
      </div>
    </motion.div>
  );
};

export default Card;