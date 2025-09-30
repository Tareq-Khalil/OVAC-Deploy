import React from 'react'

const ProgramContentCard = ({
    borderColor = "var(--main-color)",
    gradient = `radial-gradient(120% 140% at 15% 50%, color-mix(in srgb, ${borderColor} 35%, transparent) 0%, color-mix(in srgb, ${borderColor} 15%, transparent) 40%, transparent 70%)`,
        title = "Photoshop Manipulation",
        sessions = "2 Sessions",
        workshops = "1 Workshop",
        description = "In-depth exploration of AdobePhotoshop tools to create manipulated photographs.Participants will work different Photoshop tasks under the guidance of their mentors.",
}) => {
  return (
      <div className="flex flex-col items-center justify-center border-4  rounded-3xl p-6 max-w-md w-full text-center mt-24"
      style={{
          borderColor: borderColor,
          background: gradient ?? `radial-gradient(120% 140% at 15% 50%, color-mix(in srgb, ${borderColor} 35%, transparent) 0%, color-mix(in srgb, ${borderColor} 15%, transparent) 40%, transparent 70%)`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 w-full flex flex-col items-center justify-center text-center">
          <span className="text-white leading-tight">{title}</span>
        </h2>
          <div className="flex ">
          <p className="text-black text-xl mb-2 font-medium text-center mr-4 bg-yellow-400 p-2 rounded-full">
          {sessions}
          </p>
          <p className="text-black text-xl mb-2 font-medium text-center mr-4 bg-green-400 p-2 rounded-full">
            {workshops}
          </p>
          </div>
        <p className="text-white text-lg mb-6">
          {description}
  </p> 
      </div>
  )
}

export default ProgramContentCard