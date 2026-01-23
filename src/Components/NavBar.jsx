import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-3 left-0 w-full bg-transparent shadow-md z-50">
        <div className="flex items-center justify-around px-6 py-3 relative">
          {/* Logo + Title */}
          <div className="flex gap-2 items-center">
            <img
              src={Logo}
              alt="OVAC Logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />

            <div className="text-base font-bold text-gray-100 md:text-lg lg:text-xl">
              {/* Motoverse applied ONLY here */}
              <span
                className="hidden sm:inline"
                style={{
                  fontFamily: "Motoverse, sans-serif",
                  letterSpacing: "0.08em",
                }}
              >
                October Visual Arts Club
              </span>

              <span className="inline sm:hidden" style={{
                  fontFamily: "Motoverse, sans-serif",
                }}>OVAC</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-100 text-lg font-medium hover:text-[var(--main-color)] transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-100 text-lg font-medium hover:text-[var(--main-color-2)] transition"
            >
              About us
            </Link>

            <Link
              to="/gallery"
              className="text-gray-100 text-lg font-medium hover:text-[var(--main-color-3)] transition"
            >
              Gallery
            </Link>

            <Link
              to="/Bootcamp"
              className="border-2 border-[#ec1a63] text-white text-lg font-medium px-3 py-1 rounded-lg hover:bg-[#ec1a63] hover:scale-105 transition shadow-lg"
            >
              Bootcamp
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden flex justify-center items-center w-10 h-10 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="36" height="36" viewBox="0 0 36 36">
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
              <div className="flex flex-col gap-1">
                <span className="block w-6 h-0.5 bg-[#ec1a63]" />
                <span className="block w-6 h-0.5 bg-[#ec1a63]" />
                <span className="block w-6 h-0.5 bg-[#ec1a63]" />
              </div>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden fixed inset-0 bg-[#1a1a2e]/95 backdrop-blur-lg flex flex-col items-center gap-6 py-12 z-40"
          >
            <h2 className="text-white text-4xl font-extrabold mb-8">
              Menu
            </h2>

            {[
              { to: "/", label: "Home", color: "#ec1a63", border: false },
              { to: "/about", label: "About us", color: "#fdef9d", border: false },
              { to: "/gallery", label: "Gallery", color: "#2caa7c", border: false },
              { to: "/Bootcamp", label: "Bootcamp", color: "#FFFFFF", border: "#ec1a63" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-bold hover:text-white transition ${
                  item.border ? "border-2 px-4 py-2 rounded-lg" : ""
                }`}
                style={{
                  color: item.color,
                  borderColor: item.border ? item.color : undefined,
                }}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-12 text-sm text-gray-400">© 2025 OVAC</div>
          </div>
        )}
      </nav>

      {/* Accent Line */}
      <div
        className="fixed left-1/2 -translate-x-1/2 w-[75%] h-1 bg-[#ec1a63]"
        style={{ top: "5rem", zIndex: 49 }}
      />
    </>
  );
}

export default NavBar;