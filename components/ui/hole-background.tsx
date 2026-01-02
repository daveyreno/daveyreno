"use client";

import { useEffect, useRef } from "react";

interface HoleBackgroundProps {
  strokeColor?: string;
  numberOfLines?: number;
  numberOfDiscs?: number;
  particleRGBColor?: [number, number, number];
  className?: string;
}

export function HoleBackground({
  strokeColor = "#737373",
  numberOfLines = 50,
  numberOfDiscs = 50,
  particleRGBColor = [115, 115, 115],
  className = "",
  ...props
}: HoleBackgroundProps & React.ComponentProps<"canvas">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let resizeObserver: ResizeObserver | null = null;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      // Reset transform before scaling
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      return { width: displayWidth, height: displayHeight };
    };

    // Create discs (particles)
    const discs: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const initDiscs = () => {
      const rect = canvas.getBoundingClientRect();
      discs.length = 0;
      for (let i = 0; i < numberOfDiscs; i++) {
        discs.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update disc positions
      discs.forEach((disc) => {
        disc.x += disc.vx;
        disc.y += disc.vy;

        // Bounce off edges
        if (disc.x < 0 || disc.x > rect.width) disc.vx *= -1;
        if (disc.y < 0 || disc.y > rect.height) disc.vy *= -1;

        disc.x = Math.max(0, Math.min(rect.width, disc.x));
        disc.y = Math.max(0, Math.min(rect.height, disc.y));
      });

      // Draw lines connecting nearby discs
      discs.forEach((disc1, i) => {
        discs.slice(i + 1).forEach((disc2) => {
          const dx = disc1.x - disc2.x;
          const dy = disc1.y - disc2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.4;
            ctx.beginPath();
            ctx.moveTo(disc1.x, disc1.y);
            ctx.lineTo(disc2.x, disc2.y);
            ctx.strokeStyle = strokeColor;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      // Draw discs (particles)
      discs.forEach((disc) => {
        ctx.beginPath();
        ctx.arc(disc.x, disc.y, disc.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRGBColor[0]}, ${particleRGBColor[1]}, ${particleRGBColor[2]}, 0.7)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize - wait for next frame to ensure layout
    const init = () => {
      const result = resizeCanvas();
      if (result) {
        initDiscs();
        animate();
      } else {
        // Retry if canvas not ready
        requestAnimationFrame(init);
      }
    };

    // Start initialization
    requestAnimationFrame(init);

    // Use ResizeObserver for better performance
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      initDiscs();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", () => {
      resizeCanvas();
      initDiscs();
    });

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [strokeColor, numberOfLines, numberOfDiscs, particleRGBColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
      {...props}
    />
  );
}
