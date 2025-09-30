import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Timeline Dot Component with scroll-triggered animation
const TimelineDot = ({ index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const dotRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, index * 100);
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (dotRef.current) {
            observer.observe(dotRef.current);
        }

        return () => {
            if (dotRef.current) {
                observer.unobserve(dotRef.current);
            }
        };
    }, [index]);

    return (
        <div
            ref={dotRef}
            className={`absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-[#eeeb76] z-10 left-1/2 -translate-x-1/2 transition-all duration-500 hover:scale-125 hidden sm:block ${
                isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            style={{
                boxShadow: isVisible 
                    ? "0 0 8px 2px #ec1a63, 0 0 16px 3px rgba(236, 26, 99, 0.3)" 
                    : "none",
            }}
        />
    );
};

const AnimatedProgramContentCard = ({
    borderColor = "#ec1a63",
    gradient,
    title = "Photoshop Manipulation",
    sessions = "",
    workshops = "",
    description = "In-depth exploration of Adobe Photoshop tools to create manipulated photographs. Participants will work different Photoshop tasks under the guidance of their mentors.",
    index = 0,
    align = "left"
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add a slight delay based on index for staggered effect
                    setTimeout(() => {
                        setIsVisible(true);
                    }, index * 150);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [index]);

    const cardGradient = gradient ?? `radial-gradient(120% 140% at 15% 50%, ${borderColor}35 0%, ${borderColor}25 40%, transparent 70%)`;

    return (
        <div 
            ref={cardRef}
            className={`flex flex-col items-center justify-center border-2 sm:border-3 lg:border-4 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center mt-8 sm:mt-12 md:mt-16 lg:mt-24 relative overflow-hidden cursor-pointer transition-all duration-1000 ease-out transform ${
                isVisible 
                    ? 'translate-x-0 translate-y-0 opacity-100 scale-100' 
                    : `${align === 'left' ? '-translate-x-10 sm:-translate-x-16 md:-translate-x-20' : 'translate-x-10 sm:translate-x-16 md:translate-x-20'} translate-y-6 sm:translate-y-8 md:translate-y-12 opacity-0 scale-90`
            } ${
                isHovered ? 'scale-105 -translate-y-1 sm:-translate-y-2' : ''
            }`}
            style={{
                borderColor: borderColor,
                background: cardGradient,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: isHovered 
                    ? `0 10px 30px -5px ${borderColor}40, 0 0 20px ${borderColor}30` 
                    : `0 5px 20px -3px ${borderColor}20`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background glow */}
            <div 
                className="absolute inset-0 opacity-0 transition-opacity duration-500 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                style={{
                    background: `radial-gradient(circle at center, ${borderColor}15 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                }}
            />
            
            {/* Floating particles animation - only show on larger screens */}
            {isHovered && (
                <>
                    <div 
                        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full animate-pulse hidden sm:block"
                        style={{
                            background: borderColor,
                            top: '20%',
                            left: '10%',
                            animation: 'float 3s ease-in-out infinite',
                        }}
                    />
                    <div 
                        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full animate-pulse hidden sm:block"
                        style={{
                            background: borderColor,
                            top: '60%',
                            right: '15%',
                            animation: 'float 3s ease-in-out infinite 1s',
                        }}
                    />
                    <div 
                        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse hidden sm:block"
                        style={{
                            background: borderColor,
                            bottom: '25%',
                            left: '20%',
                            animation: 'float 3s ease-in-out infinite 2s',
                        }}
                    />
                </>
            )}

            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 w-full flex flex-col items-center justify-center text-center transition-all duration-500 ${
                isHovered ? 'transform scale-110' : ''
            }`}>
                <span className="text-white leading-tight relative px-2">
                    {title}
                    {/* Animated underline */}
                    <div 
                        className="absolute bottom-0 left-1/2 h-0.5 transition-all duration-500 transform -translate-x-1/2"
                        style={{
                            background: borderColor,
                            width: isHovered ? '100%' : '0%',
                        }}
                    />
                </span>
            </h2>
            
            {/* Sessions and Workshops - Stack on small screens */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4 mb-3 sm:mb-4 w-full">
                {sessions && (
                    <div 
                        className={`text-black text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center bg-[#eeeb76] p-1.5 sm:p-2 rounded-full transition-all duration-300 flex-1 ${
                            isHovered ? 'transform rotate-1 sm:rotate-3 scale-105 sm:scale-110' : ''
                        }`}
                        style={{
                            animation: isVisible ? 'slideInLeft 0.6s ease-out 0.2s both' : 'none'
                        }}
                    >
                        {sessions}
                    </div>
                )}
                {workshops && (
                    <div 
                        className={`text-black text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center bg-[#53be97] p-1.5 sm:p-2 rounded-full transition-all duration-300 flex-1 ${
                            isHovered ? 'transform -rotate-1 sm:-rotate-3 scale-105 sm:scale-110' : ''
                        }`}
                        style={{
                            animation: isVisible ? 'slideInRight 0.6s ease-out 0.4s both' : 'none'
                        }}
                    >
                        {workshops}
                    </div>
                )}
            </div>
            
            <p 
                className={`text-white text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 transition-all duration-500 leading-relaxed px-1 ${
                    isHovered ? 'transform scale-105' : ''
                }`}
                style={{
                    animation: isVisible ? 'fadeInUp 0.6s ease-out 0.6s both' : 'none'
                }}
            >
                {description}
            </p>
        </div>
    );
};

const HeadWord = ({ HeadWord, color }) => (
    <h1 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 animate-pulse text-center px-4"
        style={{ color }}
    >
        {HeadWord}
    </h1>
);

const Underline = ({ color }) => (
    <div 
        className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 mb-4 sm:mb-6 md:mb-8 animate-bounce"
        style={{ backgroundColor: color }}
    />
);

const AnimatedBootcampProgramContent = () => {
    const [visibleTimeline, setVisibleTimeline] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timelineRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleTimeline(true);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }

        return () => {
            if (timelineRef.current) {
                observer.unobserve(timelineRef.current);
            }
        };
    }, []);

    const programData = [
        {
            title: "Photo Manipulation",
            sessions: "2 Sessions",
            workshops: "1 Workshop",
            description: "In-depth exploration of Adobe Photoshop tools to create manipulated photographs. Participants will work different Photoshop tasks under the guidance of their mentors.",
            align: "left",
            borderColor: "#ec1a63",
        },
        {
            title: "3D Design",
            sessions: "1 Session",
            workshops: "0 Workshop",
            description: "Basics of Blender interface and key tools for any project. Students will create 3D models with different materials and realistic elements.",
            align: "right",
            borderColor: "#fdef9d",
        },
        {
            title: "Video Editing",
            sessions: "1 Session",
            workshops: "0 Workshop",
            description: "In-depth exploration of editing and controlling videos with Adobe Premiere Pro. Students will use advanced video effects like key frames and animations.",
            align: "left",
            borderColor: "#2caa7c",
        },
        {
            title: "Animation",
            sessions: "2 Sessions",
            workshops: "1 Workshop",
            description: "Students will learn the basics of 2D animation with Adobe Animate and Adobe After Effects. They will animate simple characters and move different body parts with some aura and light effects.",
            align: "right",
            borderColor: "#ec1a63",
        },
        {
            title: "Final Project",
            description: "Each student will choose a visual art category (i.e. Photo Manipulation, 3D Design, Video Editing, Animation) and design a meaningful project.",
            align: "left",
            borderColor: "#fdef9d",
        },
        {
            title: "Certificates",
            description: "After completing the program, students will get certificates based on their commitment and performance",
            align: "right",
            borderColor: "#2caa7c",
        },
    ];

    return (
        <div className="bg-black min-h-screen p-2 sm:p-4 md:p-6">
            <div className="flex flex-col justify-center items-center text-center p-3 sm:p-4 md:p-5">
                <HeadWord HeadWord="Program Content" color="#10b981" />
                <Underline color="#10b981" />
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 leading-relaxed"
                >
                    The program consists of 6 specialized training sessions + two practical workshops. Students will hand practical tasks after each session to ensure comprehension. At the end, students will work on their final projects.
                </motion.p>
            </div>
            
            <div className="relative container mx-auto px-2 sm:px-4 md:px-6 flex flex-col space-y-4 sm:space-y-6 md:space-y-8" ref={timelineRef}>
                {/* Animated central line - responsive width and positioning */}
                <div 
                    className={`absolute z-0 w-1 sm:w-1.5 md:w-2 h-full inset-0 left-1/2 -translate-x-1/2 overflow-hidden transition-all duration-1000 ease-out hidden sm:block ${
                        visibleTimeline ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)',
                        boxShadow: '0 0 10px rgba(236, 26, 99, 0.3)',
                        transformOrigin: 'top center',
                    }}
                >
                    {/* Animated pulse running down the line */}
                    {visibleTimeline && (
                        <div 
                            className="absolute w-full h-10 sm:h-15 md:h-20 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"
                            style={{
                                animation: 'pulse-down 4s ease-in-out infinite',
                            }}
                        />
                    )}
                </div>

                {programData.map((item, index) => (
                    <div key={index} className="relative flex items-center">
                        {/* Mobile Layout: Center everything */}
                        {isMobile ? (
                            <div className="w-full px-4">
                                <AnimatedProgramContentCard {...item} index={index} align="center" />
                            </div>
                        ) : (
                            /* Desktop/Tablet Layout: Alternating sides */
                            <div
                                className={`w-1/2 ${
                                    item.align === "left" ? "pr-4 sm:pr-6 md:pr-8" : "pl-4 sm:pl-6 md:pl-8 ml-auto"
                                }`}
                            >
                                <AnimatedProgramContentCard {...item} index={index} />
                            </div>
                        )}
                        
                        {/* Animated timeline dot - only show on larger screens */}
                        {!isMobile && <TimelineDot index={index} />}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-5px) rotate(180deg); }
                }
                
                @keyframes slideInLeft {
                    from {
                        transform: translateX(-30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeInUp {
                    from {
                        transform: translateY(15px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes pulse-down {
                    0% { transform: translateY(-50px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(calc(100vh + 50px)); opacity: 0; }
                }

                @media (max-width: 640px) {
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-3px) rotate(90deg); }
                    }
                }
            `}</style>
        </div>
    );
};

export default AnimatedBootcampProgramContent;
