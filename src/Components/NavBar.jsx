import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-3 left-0 w-full bg-transparent shadow-md z-50">
        <div className="flex items-center justify-around px-6 py-3 relative">
          <div className="flex gap-2 items-center">
            <img
              src={Logo}
              alt="OVAC Logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <div className="text-lg font-bold text-gray-100 md:text-xl lg:text-2xl">
              <span className="hidden sm:inline fonted" >October Visual Arts Club</span>
              <span className="inline sm:hidden">OVAC</span>
            </div>
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-100 text-lg font-medium hover:text-[var(--main-color)] transition duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-100 text-lg font-medium hover:text-[var(--main-color-2)] transition duration-300 ease-in-out"
            >
              About us
            </Link>
            <Link
              to="/gallery"
              className="text-gray-100 text-lg font-medium hover:text-[var(--main-color-3)] transition duration-300 ease-in-out"
            >
              Gallery
            </Link>
            <Link
              to="/Bootcamp"
              className="border-2 border-[#ec1a63] text-white text-lg font-medium px-3 py-1 rounded-lg hover:bg-[#ec1a63] hover:text-white hover:scale-105 transform transition duration-300 ease-in-out shadow-lg"
            >
              Bootcamp
            </Link>
          </div>
          {/* Hamburger button */}
          <button
            className="md:hidden flex justify-center items-center w-10 h-10 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ position: "relative" }}
          >
            {menuOpen ? (
              // Bigger X icon without circles
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                className="animate-xPop"
                style={{ transition: "transform 0.2s" }}
              >
                <rect
                  x="9"
                  y="17"
                  width="18"
                  height="3"
                  rx="1.5"
                  fill="#ec1a63"
                  transform="rotate(45 18 18)"
                />
                <rect
                  x="9"
                  y="17"
                  width="18"
                  height="3"
                  rx="1.5"
                  fill="#ec1a63"
                  transform="rotate(-45 18 18)"
                />
              </svg>
            ) : (
              // Hamburger icon
              <div className="flex flex-col justify-center items-center w-8 h-8">
                <span className="block w-6 h-0.5 bg-[#ec1a63] mb-1"></span>
                <span className="block w-6 h-0.5 bg-[#ec1a63] mb-1"></span>
                <span className="block w-6 h-0.5 bg-[#ec1a63]"></span>
              </div>
            )}
          </button>
        </div>
        {/* Modern Mobile menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden flex flex-col items-center gap-6 py-12 px-8 fixed top-0 left-0 w-full h-full bg-[#1a1a2e]/95 backdrop-blur-lg z-40 animate-slideDown"
            style={{
              borderRadius: "0 0 2rem 2rem",
              boxShadow: "0 8px 32px 0 rgba(236,26,99,0.15)",
            }}
          >
            <h2 className="text-white text-4xl font-extrabold mb-8 tracking-wide drop-shadow">
              Menu
            </h2>
            <Link
              to="/"
              className="w-full text-center text-[#ec1a63] text-2xl font-bold py-3 rounded-lg hover:bg-[#ec1a63] hover:text-white transition duration-200 shadow"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="w-full text-center text-[#fdef9d] text-2xl font-bold py-3 rounded-lg hover:bg-[#fdef9d]] hover:text-white transition duration-200 shadow"
              onClick={() => setMenuOpen(false)}
            >
              About us
            </Link>
            <Link
              to="/gallery"
              className="w-full text-center text-[#2caa7c] text-2xl font-bold py-3 rounded-lg hover:bg-[#2caa7c] hover:text-white transition duration-200 shadow"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/Bootcamp"
              className="w-full text-center border-2 border-[#ec1a63] fill-[#ec1a63] text-white text-2xl font-bold py-3 rounded-lg hover:bg-[#ec1a63] hover:text-white hover:scale-105 transform transition duration-200 shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              Bootcamp
            </Link>
            <div className="mt-12 text-sm text-gray-400">© 2025 OVAC</div>
          </div>
        )}
      </nav>
      <div
        className="fixed left-1/2 -translate-x-1/2 w-[75%] h-1 bg-[#ec1a63]"
        style={{ top: "5rem", zIndex: 49 }}
      />
      {/* Add slideDown and xPop animation */}
      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px) scale(0.95);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-slideDown {
            animation: slideDown 0.3s cubic-bezier(.4,0,.2,1);
          }
          @keyframes xPop {
            0% { transform: scale(0.7) rotate(-20deg); opacity: 0; }
            60% { transform: scale(1.1) rotate(10deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .animate-xPop {
            animation: xPop 0.25s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </>
  );
}

export default NavBar;
