"use client";

import { useEffect, useRef } from "react";
import { handleShareCard } from "@/lib/shareImage";

interface CardSantaProps {
  name: string;
  gift: string;
}

export function CardSanta({ name, gift }: CardSantaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 1200;
    canvas.height = 630;

    // Function to draw multiline text
    const drawText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) => {
      const words = text.split(" ");
      let line = "";
      let yPosition = y;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, x, yPosition);
          line = words[i] + " ";
          yPosition += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, yPosition);
    };

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = "/santa.webp";
    backgroundImage.onload = () => {
      // Draw background image
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Add text
      ctx.font = "50px System-ui";
      ctx.fillStyle = "black";
      drawText(
        ctx,
        name === ""
          ? "¡A Juan le traeré un pedazo de carbon!"
          : `¡A ${name} le traeré ${gift}!`,
        650,
        80,
        410,
        55
      );
    };
  }, [gift]);

  return (
    <>
      <canvas
        className="rounded-md mb-5"
        ref={canvasRef}
        style={{ width: "50%" }}
      ></canvas>
      {gift && (
        <button
          className="w-1/2 p-1 bg-white rounded-md"
          onClick={() =>
            handleShareCard(
              name,
              gift,
              canvasRef as React.RefObject<HTMLCanvasElement>
            )
          }
        >
          Compartir
        </button>
      )}
    </>
  );
}
