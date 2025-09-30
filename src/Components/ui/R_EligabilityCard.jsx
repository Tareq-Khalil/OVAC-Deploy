// R_EligabilityCard.jsx
import React from 'react'
import { LuLanguages } from 'react-icons/lu'

const R_EligabilityCard = ({
    gradient,
    borderColor = "var(--main-color)",
    Icon = <LuLanguages className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white" />,
    title = "Arabic Language Proficiency",
    description = "All the content will be explained in Egyptian Arabic",
    textAlign = "right",
    className = ""
}) => {
    return (
        <div
          className={`flex justify-between items-center border-2 sm:border-3 md:border-4 rounded-full pr-2 sm:pr-3 md:pr-4 w-full text-center mt-6 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-white h-20 sm:h-24 md:h-28 lg:h-30 xl:h-32 ${className}`}
          style={{
            backgroundImage: gradient ?? `radial-gradient(120% 140% at 15% 50%, color-mix(in srgb, ${borderColor} 35%, transparent) 0%, color-mix(in srgb, ${borderColor} 15%, transparent) 40%, transparent 70%)`,
            backgroundColor: `color-mix(in srgb, ${borderColor} 10%, transparent)`,
            backgroundRepeat: 'no-repeat',
            borderColor: borderColor,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
            <div
              className="rounded-full p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex items-center justify-center"
              style={{
                background: borderColor,
              }}
            >
              {Icon}
            </div>
          <div
            className="flex flex-col items-end justify-center py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 flex-1"
            style={{
              background: "transparent",
            }}
          >
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold ml-2 sm:ml-3 md:ml-4 lg:ml-5 xl:ml-6 leading-tight text-right"> 
                {title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium ml-2 sm:ml-3 md:ml-4 lg:ml-5 xl:ml-6 mt-1 sm:mt-2 leading-tight text-right">
              {description}
            </p>
          </div>
        </div>
    )
}

export default R_EligabilityCard
