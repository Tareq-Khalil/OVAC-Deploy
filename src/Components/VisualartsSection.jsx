import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "./ui/Card";
import DB from "../assets/images/Db.json";

const VisualartsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Get visual arts apps from database
  const visualArtsApps = DB.apps.filter(app => app.category === "visual-arts");

  // Animations for titles
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], ["20px", "0px"]);
  const lineScaleX = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  // Animations for row 1 (first 3 cards)
  const cardOpacity1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const cardScale1 = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const cardY1 = useTransform(scrollYProgress, [0.1, 0.4], ["50px", "0px"]);

  // Animations for row 2 (last 3 cards)
  const cardOpacity2 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const cardScale2 = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  const cardY2 = useTransform(scrollYProgress, [0.3, 0.6], ["50px", "0px"]);

  const getCardAnimation = (index) => {
    if (index < 3) {
      return {
        opacity: cardOpacity1,
        scale: cardScale1,
        y: cardY1,
      };
    } else {
      return {
        opacity: cardOpacity2,
        scale: cardScale2,
        y: cardY2,
      };
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center overflow-hidden"
    >
      {/* Title */}
      <motion.h2
        style={{ opacity: titleOpacity, y: titleY }}
        className="text-4xl font-extrabold text-[#ec1a63] mb-4"
      >
        Explore the World of Visual Arts
      </motion.h2>
            {/* Decorative line */}
      <motion.div
        style={{ scaleX: lineScaleX, transformOrigin: "left" }}
        className="w-24 h-1 bg-[#ec1a63] rounded mb-8"
      ></motion.div>
      {/* Subtitle */}
      <motion.p
        style={{ opacity: titleOpacity, y: titleY }}
        className="text-lg mb-5 text-white"
      >
        A visual art is art work that has visual characteristics. It includes but not limited to: Graphic design, Photo
        <br />Manipulation, Video Editing, Animation, Drawing, and Painting.
        <br />In our club, we focus on digital arts.
      </motion.p>
      


      {/* Cards Grid - 3 cards per row */}
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 lg:gap-12">
        {visualArtsApps.map((app, index) => (
          <Card
            key={app.id}
            title={app.name}
            icon={
              <img 
                src={app.iconImage} 
                alt={`${app.name} icon`} 
                className="w-30 h-30 object-contain p-0 m-0"
              />
            }
            description={app.description}
            borderColor="#2caa7c"
            style={getCardAnimation(index)}
            className="bg-gradient-to-br from-red-100/30 to-green-100/20 hover:from-red-200/60 hover:to-green-200/60"
            titleClassName="text-[#ec1a63] font-bold text-xl"
            descriptionClassName="text-white font-medium text-sm"
          />
        ))}
      </div>
    </div>
  );
};

export default VisualartsSection;