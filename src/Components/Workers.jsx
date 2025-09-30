import React, { useState } from "react";
import HeadWord from "./ui/HeadWord";
import Underline from "./ui/Underline";
import { motion } from "framer-motion";
import DB from '../assets/images/Db.json'

// Get workers data from JSON and add roles (since JSON doesn't have roles)
const workersFromJSON = DB.images.worker.map(worker => ({
  name: worker.name,
  role: "Team Member", // Default role since JSON doesn't specify roles
  imageUrl: worker.src,
  year: worker.year,
  alt: worker.alt
}));

// You can also create a role mapping if you want specific roles for each person
const roleMapping = {
  "ziad salah": "Vice-President",
  "abdelrahman ehab": "Mentor",
  "ali mostafa": "Mentor", 
  "ebram youssef": "Vice-President",
  "ibrahim negm": "Mentor",
  "mazen wael": "Mentor",
  "mahmoud emad": "Vice-President",
  "yassin ahmed": "Co-Web Developer",
  "omar mohamed": "Vice-President",
  "omar sabry": "President",
  "amro salah": "Illustrator Mentor",
  "kozman ashraf": "Photoshop Mentor",
  "islam abdelsalam": "President",
  "shahd": "Mentor",
  "seif": "Mentor",
  "nada": "Mentor",
  "tareq khalil": "Animation Mentor\n Co-Web Developer",
  "mohamed salah": "Social Media Director\nVideo Editing Mentor",
  "tareq ismail": "3D Mentor"
};

// Apply specific roles if available, otherwise use default
const workers = workersFromJSON.map(worker => ({
  ...worker,
  role: roleMapping[worker.name.toLowerCase()] || "Team Member"
}));

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    y: -100, 
    opacity: 0,
    rotate: 5
  },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { 
      type: "spring", 
      damping: 20, 
      stiffness: 100,
      duration: 0.8 
    },
  },
};

const WorkerCard = ({ name, role, imageUrl, alt, className = "" }) => {
  return (
    <motion.div
      variants={cardVariants}
      className={`flex flex-col w-80 h-80 items-center align-items-center p-3 text-center transition-all duration-300 transform bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:scale-105 hover:shadow-pink-500/30 ${className}`}
    >
      <img
        src={imageUrl}
        alt={alt || `Photo of ${name}`}
        className="object-cover w-50 h-50 mb-6 rounded-full border-4 border-[#ec1a63] shadow-lg"
        onError={(e) => {
          // Fallback image if the image fails to load
          e.target.src = `https://placehold.co/400x400/53be97/white?text=${name.charAt(0).toUpperCase()}`;
        }}
      />
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white capitalize">
          {name}
        </h3>
        <p className="text-gray-300 font-medium text-sm tracking-wide whitespace-pre-line">
          {role}
        </p>
      </div>
    </motion.div>
  );
};

const Workers = () => {
  // Get all unique years from JSON data
  const allYears = [...new Set(workers.map((w) => w.year))].sort(
    (a, b) => b - a
  );
  const [selectedYear, setSelectedYear] = useState(allYears[0]);

  const filteredWorkers = workers.filter(
    (worker) => worker.year === selectedYear
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center bg-black overflow-x-hidden">
      <HeadWord HeadWord="Meet Our Team" color="var(--main-color-2)" />
      <Underline color="var(--main-color-2)" />
      
      {/* Year Filter Buttons */}
      <div className="flex justify-center gap-4 my-8">
        {allYears.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`transform px-6 py-2 font-semibold rounded-full transition-all duration-300 ease-in-out hover:scale-105 ${
              selectedYear === year
                ? "bg-[var(--main-color-2)] text-black shadow-lg shadow-[var(--main-color-2)]/30"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Team Members Grid - 3 per row */}
      <motion.div
        className="grid w-full max-w-screen-lg grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        key={selectedYear} // Force re-render when year changes
      >
        {filteredWorkers.map((worker, index) => (
          <WorkerCard 
            key={`${worker.name}-${selectedYear}`}
            name={worker.name}
            role={worker.role}
            imageUrl={worker.imageUrl}
            alt={worker.alt}
          />
        ))}
      </motion.div>

      {/* Show message if no workers found for selected year */}
      {filteredWorkers.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No team members found for {selectedYear}
        </div>
      )}
    </div>
  );
};

export default Workers;