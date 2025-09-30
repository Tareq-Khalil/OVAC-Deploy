import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BootcampCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const ctaRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 200);
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (ctaRef.current) {
            observer.observe(ctaRef.current);
        }

        return () => {
            if (ctaRef.current) {
                observer.unobserve(ctaRef.current);
            }
        };
    }, []);

    const handleApplyNow = () => {
        navigate('/bootcamp-registration');
    };

    return (
        <div className="w-full px-4 py-8 md:py-12 lg:py-16 bg-black">
            <div className="container mx-auto max-w-5xl">
                <div 
                    ref={ctaRef}
                    className={`relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center transition-all duration-1000 ease-out transform ${
                        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                    } ${isHovered ? 'scale-105' : ''}`}
                    style={{
                        background: 'linear-gradient(135deg, rgba(236, 26, 99, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(59, 130, 246, 0.15) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '2px solid transparent',
                        backgroundClip: 'padding-box',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Animated gradient border */}
                    <div 
                        className="absolute inset-0 rounded-2xl md:rounded-3xl"
                        style={{
                            background: 'linear-gradient(45deg, #ec1a63, #10b981, #3b82f6, #ec1a63)',
                            backgroundSize: '300% 300%',
                            animation: isVisible ? 'gradient-shift 4s ease-in-out infinite' : 'none',
                            padding: '2px',
                        }}
                    >
                        <div 
                            className="w-full h-full rounded-2xl md:rounded-3xl"
                            style={{
                                background: 'rgba(0, 0, 0, 0.9)',
                            }}
                        />
                    </div>

                    {/* Floating particles */}
                    {isVisible && (
                        <>
                            <div 
                                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                                style={{
                                    top: '15%',
                                    left: '10%',
                                    animation: 'float-particle 6s ease-in-out infinite',
                                }}
                            />
                            <div 
                                className="absolute w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
                                style={{
                                    top: '25%',
                                    right: '15%',
                                    animation: 'float-particle 6s ease-in-out infinite 2s',
                                }}
                            />
                            <div 
                                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                                style={{
                                    bottom: '20%',
                                    left: '20%',
                                    animation: 'float-particle 6s ease-in-out infinite 4s',
                                }}
                            />
                        </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 space-y-6 md:space-y-8">
                        {/* Main Heading */}
                        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-green-400 mb-4">
                                Ready to become an artist?
                            </h2>
                        </div>

                        {/* Subtitle */}
                        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
                                Begin your artistic experience with October Visual Arts Bootcamp
                            </p>
                        </div>

                        {/* Info Section */}
                        <div className={`flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            {/* Program Start Date */}
                            <div className="text-center">
                                <p className="text-white text-sm md:text-base mb-2">Program Starts at</p>
                                <p className="text-[var(--main-color-2)] text-lg md:text-xl lg:text-2xl font-bold">
                                    13 October 2025
                                </p>
                            </div>

                            {/* Separator */}
                            <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>

                            {/* Apply Button */}
                            <div className="flex items-center">
                                <button
                                    onClick={handleApplyNow}
                                        className={`relative bg-[#ec1a63] text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-lg md:text-xl transition-all duration-300 transform ${                                        isHovered ? 'scale-110 shadow-2xl' : 'hover:scale-105'
                                    }`}
                                    style={{
                                        boxShadow: isHovered 
                                            ? '0 20px 40px rgba(236, 26, 99, 0.4), 0 0 30px rgba(236, 26, 99, 0.3)' 
                                            : '0 10px 25px rgba(236, 26, 99, 0.2)',
                                    }}
                                >
                                    {/* Button shine effect */}
                                    <div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-all duration-500 transform -skew-x-12"
                                        style={{
                                            animation: isHovered ? 'shine 1.5s ease-in-out infinite' : 'none',
                                        }}
                                    />
                                    <span className="relative z-10">APPLY NOW</span>
                                </button>
                            </div>

                            {/* Separator */}
                            <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>

                            {/* Registration Deadline */}
                            <div className="text-center">
                                <p className="text-white text-sm md:text-base mb-2">Registration Deadline</p>
                                <p className="text-[var(--main-color-2)] text-lg md:text-xl lg:text-2xl font-bold">
                                    10 October 2025
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CSS Animations */}
                    <style jsx>{`
                        @keyframes gradient-shift {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                        
                        @keyframes float-particle {
                            0%, 100% { 
                                transform: translateY(0px) rotate(0deg);
                                opacity: 0.7;
                            }
                            50% { 
                                transform: translateY(-15px) rotate(180deg);
                                opacity: 1;
                            }
                        }
                        
                        @keyframes shine {
                            0% { transform: translateX(-100%) skewX(-12deg); }
                            100% { transform: translateX(200%) skewX(-12deg); }
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
};

export default BootcampCTA;
