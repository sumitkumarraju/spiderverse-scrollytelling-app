"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import type { Character } from "@/data/characters";

interface TextOverlaysProps {
  character: Character;
}

export default function TextOverlays({ character }: TextOverlaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Four text sections, each visible in a window of the scroll
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.18, 0.23], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.05, 0.18, 0.23], [60, 0, 0, -60]);

  const opacity2 = useTransform(scrollYProgress, [0.23, 0.28, 0.43, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.23, 0.28, 0.43, 0.48], [60, 0, 0, -60]);

  const opacity3 = useTransform(scrollYProgress, [0.48, 0.53, 0.68, 0.73], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.53, 0.68, 0.73], [60, 0, 0, -60]);

  const opacity4 = useTransform(scrollYProgress, [0.73, 0.78, 0.93, 0.98], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.73, 0.78, 0.93, 0.98], [60, 0, 0, -60]);

  const sections = [
    { data: character.section1, opacity: opacity1, y: y1 },
    { data: character.section2, opacity: opacity2, y: y2 },
    { data: character.section3, opacity: opacity3, y: y3 },
    { data: character.section4, opacity: opacity4, y: y4 },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-[500vh] pointer-events-none"
      style={{ top: 0 }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            style={{ opacity: section.opacity, y: section.y }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center"
          >
            {/* Phase indicator (Comic Panel style) */}
            <div
              className="mb-8 px-5 py-2 comic-panel text-[12px] font-bold tracking-[0.3em] uppercase backdrop-blur-md"
              style={{ color: character.themeColor }}
            >
              Sequence 0{i + 1}
            </div>

            {/* Oversized Bold Typography & Glitch */}
            <h2
              className="font-display font-black text-6xl md:text-8xl lg:text-[10rem] leading-[0.8] tracking-tighter mb-8 max-w-[90vw] uppercase glitch-text"
              style={{
                textShadow: `0 0 60px ${character.themeColor}aa`,
                color: "white"
              }}
              data-text={section.data.title}
            >
              {section.data.title}
            </h2>

            {/* Subtitle */}
            <div className="relative">
               {/* Webline separator */}
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
               <p className="text-white text-lg md:text-3xl max-w-3xl leading-relaxed font-medium mt-4 mix-blend-plus-lighter backdrop-blur-sm p-6 rounded-2xl bg-black/40 border border-white/10 shadow-2xl">
                 {section.data.subtitle}
               </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
