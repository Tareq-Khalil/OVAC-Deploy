import React from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../assets/logo-OVAC-1.png";

const Hero = () => {
  const navigate = useNavigate();

  const bootcamp = () => {
    navigate('/bootcamp');
  };
  
  const gallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen px-4 pt-28 text-center">
      <img
        className="h-auto w-48 mb-6 transition-all duration-300 ease-in-out sm:w-64 md:w-80 lg:w-96 xl:w-[32rem] hover:scale-105"
        src={MainLogo}
        alt="Hero"
      />
      <p className="text-[var(--main-color-2)] text-xl sm:text-2xl md:text-3xl font-bold max-w-5xl">
        Growing artistic talent through student-to-student Visual Arts courses
      </p>
      <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-4 max-w-4xl">
        October Visual Arts Club (OVAC) is a student organization affiliated
        with STEM High School for Boys - 6th of October. We grow the artistic
        talent by providing student-to-student Visual Arts courses.
      </p>
      {/* buttons  */}
      <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <button
          onClick={bootcamp}
          className="transform rounded-full bg-[#ec1a63] px-8 py-4 font-bold text-white shadow-lg shadow-[#ec1a63]/30 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#ec1a63] hover:shadow-xl hover:shadow-[#ec1a63]/50"
        >
          Register for the Bootcamp
        </button>
        <button
          onClick={gallery}
          className="transform rounded-full border-2 border-[#2caa7c] bg-transparent px-8 py-4 font-bold text-[#2caa7c] transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#2caa7c] hover:bg-[#2caa7c] hover:text-white hover:shadow-lg hover:shadow-[#2caa7c]/40"
        >
          See Our Art
        </button>
      </div>
    </div>
  );
};

export default Hero;