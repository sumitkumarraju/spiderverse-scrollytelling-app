"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import type { Character } from "@/data/characters";

interface HeroSequenceScrollProps {
  character: Character;
}

export default function HeroSequenceScroll({ character }: HeroSequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameIndexRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const totalFrames = 240; // We have 240 frames in the folder

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalFrames - 1]
  );

  // Preload all frame images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `${character.folderPath}/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setImages([...loadedImages]);
        }
      };

      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
      };

      loadedImages[i - 1] = img;
    }

    return () => {
      loadedImages.length = 0;
    };
  }, [character.folderPath]);

  // Draw frame on canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[Math.round(index)];
      if (!img || !img.complete) return;

      // Set canvas to its display dimension
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Contain fit
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (imgAspect > canvasAspect) {
        // Image wider than canvas → cover vertically, bound horizontally
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgAspect;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image taller than canvas
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images]
  );

  // Update canvas on scroll
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      frameIndexRef.current = latest;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(() => {
        drawFrame(Math.round(latest));
      });
    });

    return () => {
      unsubscribe();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [frameIndex, drawFrame]);

  // Draw first frame when images load
  useEffect(() => {
    if (images.length > 0) {
      drawFrame(0);
    }
  }, [images, drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(frameIndexRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Sticky viewport */}
      <div className="canvas-container">
        {/* Loading overlay */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
          >
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: character.themeColor,
                  borderRightColor: character.themeColor,
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                style={{ color: character.themeColor }}
              >
                {loadProgress}%
              </div>
            </div>
            <p className="text-white/40 text-sm font-display tracking-[0.3em] uppercase glitch-text">
              Establishing Neural Link...
            </p>

            {/* Progress bar */}
            <div className="mt-6 w-48 h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  width: `${loadProgress}%`,
                  background: character.themeColor,
                }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover mix-blend-screen"
          style={{
            opacity: images.length > 0 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(10, 10, 15, 0.9) 100%)`,
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(10, 10, 15, 1) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
