import React from 'react'
import { useNavigate } from 'react-router-dom'
import bootcampTitle from '../assets/bootcamptitle.png'

const BootcampHero = () => {
  const navigate = useNavigate()
  
  const handleApplyClick = () => {
    navigate('/bootcamp-registration')
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 relative z-1">
      <div className="flex flex-col items-center justify-center border-2 sm:border-4 border-[var(--main-color-3)] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl w-full text-center mt-16 sm:mt-20 lg:mt-24"
        style={{
          background: "linear-gradient(90deg, rgba(34,197,94,0.12) 0%, rgba(236,26,99,0.12) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Main Title */}
        <div className="mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-4 lg:px-6">
          <h1 className="font-bold leading-tight tracking-wide" style={{ fontFamily: 'Motoverse, sans-serif' }}>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span style={{ color: 'white' }}>O</span><span style={{ color: 'white' }}>ctober</span>
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 sm:mt-2">
              <span style={{ color: '#ec1a63' }}>V</span><span style={{ color: 'white', marginRight: '0.15em' }}>isual</span>
              <span style={{ color: '#fdef9d' }}>A</span><span style={{ color: 'white' }}>rts</span>
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 sm:mt-2">
              <span style={{ color: '#2caa7c' }}>B</span><span style={{ color: 'white' }}>ootcamp</span>
            </span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-[var(--main-color-2)] text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 font-medium text-center leading-relaxed px-2 sm:px-4">
          Acquire creative visual arts skills through our 5-week online program
        </p>
        
        {/* CTA Button */}
        <button 
          onClick={handleApplyClick}
          className="bg-[var(--main-color)] hover:bg-pink-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full inline-block mb-6 sm:mb-8 lg:mb-10 cursor-pointer transition-all duration-200 text-base sm:text-lg lg:text-xl xl:text-2xl font-bold transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          APPLY NOW
        </button>
        
        {/* Registration Deadline */}
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed">
          Registration Deadline: <span className="text-[var(--main-color-2)] font-semibold">October 10, 2025</span>
        </p>
      </div>
    </div>
  )
}

export default BootcampHero
