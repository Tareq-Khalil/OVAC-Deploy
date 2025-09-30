//Save this for Later

import React, { useEffect, useRef } from "react";

const CloudsCount = 3;
const cloudColors = ["red", "green", "yellow"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

const Clouds = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate clouds
    const clouds = Array.from({ length: CloudsCount }, (_, i) => ({
      x: randomBetween(0, width),
      y: randomBetween(height * 0.1, height * 0.5),
      radius: randomBetween(60, 100),
      speed: randomBetween(0.2, 0.6),
      color: cloudColors[i % cloudColors.length],
    }));
function drawCloud(cloud) {
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = cloud.color;

  // Draw three overlapping circles for a cloud
  ctx.beginPath();
  ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2); // center
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cloud.x - cloud.radius * 0.6, cloud.y + cloud.radius * 0.3, cloud.radius * 0.7, 0, Math.PI * 2); // left
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cloud.x + cloud.radius * 0.6, cloud.y + cloud.radius * 0.3, cloud.radius * 0.7, 0, Math.PI * 2); // right
  ctx.fill();

  ctx.restore();
}

    function animate() {
      ctx.clearRect(0, 0, width, height);
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.radius > width) {
          cloud.x = -cloud.radius;
          cloud.y = randomBetween(height * 0.1, height * 0.5);
        }
        drawCloud(cloud);
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
        zIndex: 20,
        pointerEvents: "none",
        background: "transparent",
        display: "block",
      }}
    />
  );
};

export default Clouds;