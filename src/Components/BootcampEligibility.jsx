  import React from 'react'
  import HeadWord from './ui/HeadWord'
  import Underline from './ui/Underline'
  import EligabilityCard from './ui/L_EligabilityCard'
  import R_EligabilityCard from './ui/R_EligabilityCard'
  import { motion } from 'framer-motion'
  import { LuSchool, LuLanguages } from 'react-icons/lu'
  import { TbWorld } from "react-icons/tb";
  import { FaBrain } from "react-icons/fa6";
  import { GiGraduateCap } from "react-icons/gi";

  const BootcampEligibility = () => {
    const MotionDiv = motion.div
    
    const animationTransition = {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 0.6
    }

    // Function to get responsive animation values
    const getAnimationVariants = (direction) => {
      return {
        hidden: { 
          opacity: 0, 
          x: direction === 'left' ? -30 : 30 // Reduced movement for better mobile experience
        },
        visible: { opacity: 1, x: 0 }
      }
    }

    return (
      <div className="w-full">
        {/* Header Section - Fully responsive */}
        <div className='flex flex-col items-center justify-center my-6 sm:my-8 md:my-12 lg:my-16 xl:my-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12'>
          <div className="flex flex-col items-center text-center w-full max-w-4xl">
            <HeadWord HeadWord="Program Eligibility" color='#eeeb76' />  
            <div className="flex justify-center w-full">
              <Underline color='#eeeb76' />
            </div>
          </div>
        </div>
        
        {/* Cards Container - Enhanced responsive layout */}
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            
            {/* First Card - Responsive alignment */}
            <MotionDiv
              className="flex justify-center md:justify-start w-full"
              variants={getAnimationVariants('left')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={animationTransition}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <EligabilityCard
                  title="Arabic Language Proficiency"
                  description="All the content will be explained in Egyptian Arabic."
                  borderColor='#ec1a63'
                  gradient="radial-gradient(120% 140% at 15% 50%, rgba(236,26,99,0.35) 0%, rgba(236,26,99,0.15) 40%, rgba(236,26,99,0) 70%)"
                  textAlign="left"
                  Icon={<LuLanguages className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-black" />}
                  titleClassName="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight"
                  descriptionClassName="text-xs sm:text-sm md:text-base lg:text-lg leading-snug"
                />
              </div>
            </MotionDiv>
            
            {/* Second Card - Responsive alignment */}
            <MotionDiv
              className="flex justify-center md:justify-end w-full"
              variants={getAnimationVariants('right')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={animationTransition}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <R_EligabilityCard
                  title="High School Student"
                  description="Applicants must be between grade 9 and grade 12."
                  borderColor='var(--main-color-2)'
                  gradient="radial-gradient(120% 140% at 85% 50%, rgba(255,214,0,0.35) 0%, rgba(255,214,0,0.15) 40%, rgba(255,214,0,0) 70%)"
                  textAlign="right"
                  Icon={<LuSchool className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-black" />}
                  titleClassName="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight"
                  descriptionClassName="text-xs sm:text-sm md:text-base lg:text-lg leading-snug"
                />
              </div>
            </MotionDiv>
            
            {/* Third Card - Responsive alignment */}
            <MotionDiv
              className="flex justify-center md:justify-start w-full"
              variants={getAnimationVariants('left')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={animationTransition}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <EligabilityCard
                  title="Stable Internet Connection"
                  description="The program will be held through online meetings."
                  borderColor='var(--main-color-3)'
                  gradient="radial-gradient(120% 140% at 15% 50%, rgba(83,190,151,0.35) 0%, rgba(83,190,151,0.15) 40%, rgba(83,190,151,0) 70%)"
                  textAlign="left"
                  Icon={<TbWorld className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-black" />}
                  titleClassName="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight"
                  descriptionClassName="text-xs sm:text-sm md:text-base lg:text-lg leading-snug"
                />
              </div>
            </MotionDiv>
            
            {/* Fourth Card - Responsive alignment */}
            <MotionDiv
              className="flex justify-center md:justify-end w-full"
              variants={getAnimationVariants('right')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={animationTransition}
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <R_EligabilityCard
                  title={
                    <span>
                      Previous Knowledge <span className="text-[var(--main-color-2)] font-bold">IS NOT</span> Required!
                    </span>
                  }
                  description="You can have your first experience with us."
                  borderColor='#ec1a63'
                  gradient="radial-gradient(120% 140% at 85% 50%, rgba(236,26,99,0.35) 0%, rgba(236,26,99,0.15) 40%, rgba(236,26,99,0) 70%)"
                  textAlign="right"
                  Icon={<FaBrain className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-black" />}
                  descriptionClassName="text-xs sm:text-sm md:text-base lg:text-lg leading-snug"
                />
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    )
  }

  export default BootcampEligibility
