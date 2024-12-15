"use client";

import { useEffect, useRef } from "react";
import "./globals.css";

interface SnowCanvasProps {
  options: {
    speed?: number;
    interaction?: boolean;
    size?: number;
    count?: number;
    opacity?: number;
    color?: string;
    windPower?: number;
    image?: string | boolean;
  };
  className?: string;
}

const SnowCanvas = ({ options, className }: SnowCanvasProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      letItSnow(canvas, options);
    }
  }, [options]);

  return <canvas ref={canvasRef} className={className}></canvas>;
};

const letItSnow = (
  canvas: HTMLCanvasElement,
  options: SnowCanvasProps["options"]
) => {
  const defaults = {
    speed: 0,
    interaction: true,
    size: 2,
    count: 200,
    opacity: 0,
    color: "#ffffff",
    windPower: 0,
    image: false,
  };
  const settings = { ...defaults, ...options };

  const flakes: {
    x: number;
    y: number;
    size: number;
    speed: number;
    velY: number;
    velX: number;
    opacity: number;
    stepSize: number;
    step: number;
  }[] = [];
  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const flakeImage = settings.image ? new Image() : null;
  if (flakeImage && typeof settings.image === "string")
    flakeImage.src = settings.image;

  const createFlake = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + settings.size,
    speed: Math.random() * 1 + settings.speed,
    velY: Math.random() * 1 + settings.speed,
    velX: 0,
    opacity: Math.random() * 0.5 + settings.opacity,
    stepSize: Math.random() / 30,
    step: 0,
  });

  const resetFlake = (flake: {
    x: number;
    y: number;
    size: number;
    speed: number;
    velY: number;
    velX: number;
    opacity: number;
    stepSize: number;
    step: number;
  }) => {
    flake.x = Math.random() * width;
    flake.y = 0;
    flake.size = Math.random() * 3 + settings.size;
    flake.speed = Math.random() * 1 + settings.speed;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = Math.random() * 0.5 + settings.opacity;
  };

  const updateFlakes = () => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
    }

    flakes.forEach((flake) => {
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= height || flake.x >= width || flake.x <= 0) {
        resetFlake(flake);
      }

      if (flakeImage && flakeImage.complete && ctx) {
        ctx.drawImage(
          flakeImage,
          flake.x,
          flake.y,
          flake.size * 2,
          flake.size * 2
        );
      } else if (ctx) {
        ctx.fillStyle = `rgba(${hexToRgb(settings.color)}, ${flake.opacity})`;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(updateFlakes);
  };

  const hexToRgb = (hex: string) => {
    const match = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    if (!match) return "255,255,255";
    return `${parseInt(match[1], 16)},${parseInt(match[2], 16)},${parseInt(
      match[3],
      16
    )}`;
  };

  for (let i = 0; i < settings.count; i++) {
    flakes.push(createFlake());
  }

  if (!flakeImage || flakeImage.complete) {
    updateFlakes();
  } else {
    flakeImage.onload = updateFlakes;
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="page">
        {children}
        <SnowCanvas
          className="canvas-snow snow1"
          options={{
            speed: 0,
            interaction: true,
            size: 2,
            count: 200,
            opacity: 0,
            color: "#ffffff",
            windPower: 1,
            image: false,
          }}
        />
        <SnowCanvas
          className="canvas-snow snow2"
          options={{
            speed: 0,
            interaction: true,
            size: 6,
            count: 50,
            opacity: 0,
            color: "#ffffff",
            windPower: 0,
            image:
              "https://3.bp.blogspot.com/-LWSCSuSZ9qw/VLkSYiICCUI/AAAAAAADaAs/Exw-xb0znkg/s1600/hf_shimmer_flake20.png",
          }}
        />
      </body>
    </html>
  );
}
