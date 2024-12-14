import { useEffect, useRef } from "react";

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
    canvas.width = 800;
    canvas.height = 800;

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
    backgroundImage.src = "/santa.webp"; // Replace with the path to your image
    backgroundImage.onload = () => {
      // Draw background image
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Add second text
      ctx.font = "50px System-ui";
      ctx.fillStyle = "black";
      drawText(
        ctx,
        name === ""
          ? "¡A Juan le traeré un pedazo de carbon!"
          : `¡A ${name} le traeré ${gift}!`,
        390,
        65,
        360,
        50
      );
    };
  }, [gift]);

  return (
    <>
      <canvas
        className="rounded- mb-5"
        ref={canvasRef}
        style={{ width: "50%" }}
      ></canvas>
      {gift && <button className="w-1/2 bg-white rounded-md">Compartir</button>}
    </>
  );
}
