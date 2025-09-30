import React, { useEffect, useRef } from "react";

const STAR_COUNT = 100;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      radius: randomBetween(0.5, 1.8),
      speed: randomBetween(0.1, 0.22),
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = randomBetween(0, width);
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.globalAlpha = randomBetween(0.7, 1);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 5,
        pointerEvents: "none",
        background: "transparent",
        display: "block",
      }}
    />
  );
};

export default StarField;
