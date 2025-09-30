import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeadWord from "./ui/HeadWord";
import Underline from "./ui/Underline";
import Card from "./ui/Card";
import DB from "../assets/images/Db.json";

function getImageUrl(path) {
  // Handle both local and external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const imageName = path.replace("./", "");
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
}

const images = DB.images.whoWeAre.map((imageData) => ({
  src: getImageUrl(imageData.src),
  alt: imageData.alt,
}));

// Independent school video - using external URL
const SchoolVideoSrc = "https://hc-cdn.hel1.your-objectstorage.com/s/v3/285761236fbe783788e03e21ec3ec33adce49137_gojovssukuna.mp4";
const SchoolVideoAlt = "School promotional video";

const WhoweAre = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Cycle every 3.5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    center: { x: "0%", y: "0%", scale: 1.1, zIndex: 3, rotate: 0 },
    right: { x: "50%", y: "-10%", scale: 1, zIndex: 2, rotate: 15 },
    left: { x: "-50%", y: "10%", scale: 0.9, zIndex: 1, rotate: -15 },
    hidden: { opacity: 0, scale: 0.5, zIndex: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const fromLeftVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  const fromRightVariant = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-32 text-center overflow-x-hidden">
      <HeadWord HeadWord="About Us" color="var(--main-color-3)" />
      <Underline color="var(--main-color-3)" />
      <motion.div
        className="grid w-full max-w-6xl grid-cols-1 items-center gap-16 mx-auto mt-12 md:grid-cols-2 md:gap-8 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div variants={fromLeftVariant}>
          <Card
            borderColor="#ec1a63"
            className="bg-gradient-to-br from-yellow-400/20 to-red-500/20"
            description={
              <div className="text-left">
                <p className="mb-4">
                  We are a group of high school students brought together by our
                  shared passion for art in its visual or digital form. Due to
                  being equipped with the necessary skills besides the inspiring
                  passion, in 2024, we founded this club for the purpose of
                  promoting the artistic community not only in our school but in
                  our whole country, Egypt.
                </p>
              </div>
            }
          />
        </motion.div>
        <motion.div
          variants={fromRightVariant}
          className="relative flex items-center justify-center w-full min-h-[20rem] sm:min-h-[24rem]"
        >
          {images.map((image, i) => {
            let variant;
            const position = (i - activeIndex + images.length) % images.length;

            if (position === 0) {
              variant = "center";
            } else if (position === 1) {
              variant = "right";
            } else if (position === images.length - 1) {
              variant = "left";
            } else {
              variant = "hidden";
            }

            return (
              <motion.img
                key={image.src}
                src={image.src}
                alt={image.alt}
                variants={imageVariants}
                initial={false}
                animate={variant}
                whileHover={{ scale: 2, zIndex: 4 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className="absolute object-cover w-40 h-40 border-4 border-[var(--main-color-3)] shadow-lg sm:w-48 sm:h-48 md:w-56 md:h-56"
              />
            );
          })}
        </motion.div>
      </motion.div>
      
      <motion.div
        className="mt-16 w-full max-w-6xl"
        variants={fromLeftVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <Card
          borderColor="var(--main-color-3)"
          className="bg-gradient-to-br from-yellow-400/20 to-green-500/20"
          description={
            <p className="text-center">
              Our community is devoted to providing a welcoming environment for
              those who hold an interest in various forms of visual expression,
              including graphic design, video production, 3D design, and
              animation. The club is committed to nurturing the growth of its
              members as artists by hosting regular lectures, in addition to
              monitoring this growth through weekly assignments.
            </p>
          }
        />
      </motion.div>
    </div>
  );
};

export default WhoweAre;